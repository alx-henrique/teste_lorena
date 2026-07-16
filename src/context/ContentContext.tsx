import React, { createContext, useContext, useState, useEffect } from "react";
import { WebsiteContent, DEFAULT_CONTENT } from "../content-default";

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
        const response = await fetch("/api/content");
        if (response.ok) {
          const data = await response.json();
          // Merge defaults with returned content to handle partial updates or new keys
          setContent({ ...DEFAULT_CONTENT, ...data });
        }
      } catch (error) {
        console.error("Failed to load dynamic content, using defaults:", error);
      } finally {
        setIsLoading(false);
      }
    }
    loadContent();
  }, []);

  const updateContent = async (newContent: WebsiteContent, token: string) => {
    try {
      const response = await fetch("/api/content", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(newContent)
      });

      if (response.ok) {
        setContent(newContent);
        return { success: true };
      } else {
        const errData = await response.json();
        return { success: false, error: errData.error || "Failed to save content" };
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
