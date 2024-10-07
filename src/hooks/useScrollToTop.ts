"use client";

import { useEffect } from "react";
import { useRouter } from "next/router";

function useScrollToTop(): void {
  const r = useRouter();
  const p = r.pathname;
  console.log(p);
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    console.log(p);
  }, [p]);
}

export default useScrollToTop;
