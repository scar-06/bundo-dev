// custom-elements.d.ts
declare namespace JSX {
  interface IntrinsicElements {
    "qoreid-button": React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement>,
      HTMLElement
    > & {
      clientId?: string;
      flowId?: string;
      productCode?: string;
      customerReference?: string;
      applicantData?: string;
      identityData?: string;
      addressData?: string;
      ocrAcceptedDocuments?: string;
      hideButton?: "yes" | "no";
      onQoreIDSdkSubmitted?: string;
      onQoreIDSdkError?: string;
      onQoreIDSdkClosed?: string;
      // Add other specific attributes you expect to use
    };
  }
}
