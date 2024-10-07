// @ts-nocheck

"use client";

import React, { useState } from "react";

interface ChatBotProps {
  widgetCode?: string;
  domain?: string;
}

function ChatBot({ widgetCode, domain }: ChatBotProps): JSX.Element | null {
  const [hasCode, setHasCode] = useState(!!widgetCode);

  if (!hasCode) {
    return <div style={{ color: "red" }}>Need to pass widget code</div>;
  }

  return (
    <>
      <script
        type="text/javascript"
        dangerouslySetInnerHTML={{
          __html: `
                  var $zoho=$zoho || {};$zoho.salesiq = $zoho.salesiq || {widgetcode:"${widgetCode}", values:{},ready:function(){}};var d=document;s=d.createElement("script");s.type="text/javascript";s.id="zsiqscript";s.defer=true;s.src="${domain}";t=d.getElementsByTagName("script")[0];t.parentNode.insertBefore(s,t);
                              `,
        }}
      />
    </>
  );
}

export default ChatBot;
