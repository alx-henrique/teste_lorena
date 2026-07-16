import React, { createContext, useContext, useState, useEffect } from "react";
import { WebsiteContent, DEFAULT_CONTENT } from "../content-default";
import { loadFirebaseContent, saveFirebaseContent } from "../firebase";

interface ContentContextType {
  content: WebsiteContent;
  isLoading: boolean;
  updateContent: (newContent: WebsiteContent, token: string) => Promise<{ success: boolean; error?: string }>;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export function ContentProvider({ children }: { children: React.ReactNode }) {
  const [content, setContent] = useState<WebsiteContent>(DEFAULT_CONTENT);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadContent() {
      try {
        const fbContent = await loadFirebaseContent();
        if (fbContent) {
          // If the stored content has the old About Me text, migrate it automatically to the new requested one
          if (fbContent.aboutMeBodyText1 && (
            fbContent.aboutMeBodyText1.includes("Como consultora CVM") || 
            fbContent.aboutMeBodyText1.includes("consultoria financeira individual") ||
            fbContent.aboutMeBodyText1.includes("CVM certificada") ||
            !fbContent.aboutMeBodyText1.includes("independente")
          )) {
            fbContent.aboutMeBodyText1 = DEFAULT_CONTENT.aboutMeBodyText1;
          }
          // Merge defaults with returned content to handle partial updates or new keys
          setContent({ ...DEFAULT_CONTENT, ...fbContent });
        } else {
          // If no content in Firebase, try to fetch from local API fallback
          try {
            const response = await fetch("/api/content");
            if (response.ok) {
              const data = await response.json();
              if (data.aboutMeBodyText1 && (
                data.aboutMeBodyText1.includes("Como consultora CVM") || 
                data.aboutMeBodyText1.includes("consultoria financeira individual") ||
                data.aboutMeBodyText1.includes("CVM certificada") ||
                !data.aboutMeBodyText1.includes("independente")
              )) {
                data.aboutMeBodyText1 = DEFAULT_CONTENT.aboutMeBodyText1;
              }
              setContent({ ...DEFAULT_CONTENT, ...data });
            }
          } catch (apiErr) {
            console.log("Local API fallback failed or not available, using defaults.");
          }
        }
      } catch (error) {
        console.error("Failed to load dynamic content:", error);
      } finally {
        setIsLoading(false);
      }
    }
    loadContent();
  }, []);

  const updateContent = async (newContent: WebsiteContent, token: string) => {
    try {
      // First try to save to Firebase
      const result = await saveFirebaseContent(newContent, token);
      if (result.success) {
        setContent(newContent);
        
        // Also try to sync with backend API if available (optional fallback)
        try {
          await fetch("/api/content", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(newContent)
          });
        } catch (apiErr) {
          // Silent catch since Firebase already succeeded
          console.log("API save failed, Firebase was used.");
        }
        
        return { success: true };
      } else {
        return { success: false, error: result.error || "Failed to save content" };
      }
    } catch (error: any) {
      return { success: false, error: error.message || "Network error" };
    }
  };

  return (
    <ContentContext.Provider value={{ content, isLoading, updateContent }}>
      {children}
    </ContentContext.Provider>
  );
}

export function useContent() {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error("useContent must be used within a ContentProvider");
  }
  return context;
}
