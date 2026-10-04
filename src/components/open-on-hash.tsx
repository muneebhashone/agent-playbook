"use client";

import { useEffect } from "react";

/** Links like #source-6 point into collapsed sections; open the section so the target is visible. */
export function OpenOnHash() {
  useEffect(() => {
    function open() {
      const id = decodeURIComponent(location.hash.slice(1));
      const target = id && document.getElementById(id);
      if (!target) return;
      const details = target.closest("details");
      if (details && !details.open) {
        details.open = true;
        target.scrollIntoView();
      }
    }
    open();
    window.addEventListener("hashchange", open);
    return () => window.removeEventListener("hashchange", open);
  }, []);
  return null;
}
