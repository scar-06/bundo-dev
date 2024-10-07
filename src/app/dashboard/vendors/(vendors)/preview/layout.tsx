import React from "react";

import PreviewWrapper from "./_components/previewWrapper";

function PreviewLayout({ children }: { children: React.ReactNode }) {
  return <PreviewWrapper>{children}</PreviewWrapper>;
}

export default PreviewLayout;
