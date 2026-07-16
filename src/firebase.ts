import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc, setDoc, deleteDoc } from "firebase/firestore";
import { WebsiteContent } from "./content-default";

// Firebase Config from environment variables (loaded via Vite)
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

const databaseId = import.meta.env.VITE_FIREBASE_DATABASE_ID;

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore with specific database ID
export const db = getFirestore(app, databaseId);

// Helper to hash password on client side with SHA-256
export async function hashPassword(password: string): Promise<string> {
  const msgUint8 = new TextEncoder().encode(password);
  const hashBuffer = await crypto.subtle.digest("SHA-256", msgUint8);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
  return hashHex;
}

// Check if admin is initialized. If not, auto-create the default password ("lore2026")
export async function ensureAdminInitialized() {
  try {
    const initRef = doc(db, "admin", "initialized");
    const initSnap = await getDoc(initRef);
    if (!initSnap.exists()) {
      // Default password "lore2026"
      const defaultHash = await hashPassword("lore2026");
      const defaultToken = "token_" + Math.random().toString(36).substring(2) + Date.now().toString(36);
      
      await setDoc(doc(db, "admin", defaultHash), {
        token: defaultToken,
        createdAt: Date.now()
      });
      
      await setDoc(initRef, {
        initialized: true,
        createdAt: Date.now()
      });
      console.log("[Firebase] Admin initialized with default password");
    }
  } catch (err) {
    console.error("Failed to check or initialize admin in Firebase:", err);
  }
}

// Fetch content from Firebase
export async function loadFirebaseContent(): Promise<WebsiteContent | null> {
  try {
    const contentRef = doc(db, "config", "website_content");
    const docSnap = await getDoc(contentRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      // Remove token if it was stored with the content
      const { authToken, ...contentData } = data;
      return contentData as WebsiteContent;
    }
  } catch (err) {
    console.error("Error loading content from Firebase:", err);
  }
  return null;
}

// Save content to Firebase
export async function saveFirebaseContent(
  newContent: WebsiteContent,
  token: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const contentRef = doc(db, "config", "website_content");
    await setDoc(contentRef, {
      ...newContent,
      authToken: token
    });
    return { success: true };
  } catch (err: any) {
    console.error("Error saving content to Firebase:", err);
    return { success: false, error: err.message || "Failed to save content" };
  }
}

// Verify Login using password
export async function verifyFirebaseLogin(password: string): Promise<{ success: boolean; token?: string; error?: string }> {
  try {
    await ensureAdminInitialized();
    const hash = await hashPassword(password);
    const adminRef = doc(db, "admin", hash);
    const adminSnap = await getDoc(adminRef);
    
    if (adminSnap.exists()) {
      const data = adminSnap.data();
      return { success: true, token: data.token || hash };
    } else {
      return { success: false, error: "Senha incorreta" };
    }
  } catch (err: any) {
    console.error("Error verifying login in Firebase:", err);
    return { success: false, error: "Erro de conexão com o banco de dados." };
  }
}

// Change password in Firebase
export async function changeFirebasePassword(
  oldPassword: string,
  newPassword: string
): Promise<{ success: boolean; token?: string; error?: string }> {
  try {
    const oldHash = await hashPassword(oldPassword);
    const adminRef = doc(db, "admin", oldHash);
    const adminSnap = await getDoc(adminRef);
    
    if (!adminSnap.exists()) {
      return { success: false, error: "Senha antiga incorreta." };
    }
    
    // Create new hash
    const newHash = await hashPassword(newPassword);
    const newToken = "token_" + Math.random().toString(36).substring(2) + Date.now().toString(36);
    
    // Save new password document
    await setDoc(doc(db, "admin", newHash), {
      token: newToken,
      createdAt: Date.now()
    });
    
    // Delete old password document
    await deleteDoc(adminRef);
    
    return { success: true, token: newToken };
  } catch (err: any) {
    console.error("Error changing password in Firebase:", err);
    return { success: false, error: "Erro de conexão ao alterar a senha." };
  }
}
