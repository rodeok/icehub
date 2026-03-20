"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { init } from "ragged-chat-sdk";

const HIDDEN_ROUTES = ["/dashboard", "/admin", "/tutor"] as const;

export default function RaggedChatBootstrap() {
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname) return;
    if (HIDDEN_ROUTES.some((prefix) => pathname.startsWith(prefix))) return;

    // Prevent duplicate widget instances (common in dev due to React Strict Mode).
    if (document.getElementById("ragged-chat-widget")) return;

    try {
      init({
        subdomain: "icehub",
        apiUrl: "https://ragflowdb.onrender.com/api",
      });
    } catch (err) {
      console.error("[RaggedChat] init failed:", err);
    }
  }, [pathname]);

  return null;
}

