"use client";

import { useEffect } from "react";
import { firebaseConfig } from "@/utils/firebase";
import { getAnalytics, logEvent } from "firebase/analytics";

const usePageViewAnalytics = () => {
  useEffect(() => {
    const firebase = firebaseConfig.init();
    const analytics = getAnalytics();
    // Initialize Analytics and log page view
    if (typeof window !== "undefined") {
      logEvent(analytics, "sign_up", {
        method: "signup/login auth",
      });
    }
  }, []);
};

export default usePageViewAnalytics;
