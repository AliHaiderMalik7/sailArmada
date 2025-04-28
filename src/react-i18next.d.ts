// src/react-i18next.d.ts
import "react-i18next";

declare module "react-i18next" {
  interface CustomTypeOptions {
    // Define your default namespace if not using "translation"
    defaultNS: "translation";
    // Define your resource shape
    resources: {
      translation: {
        rent_title: string;
        subtitle: string;
        // Add more keys as needed
      };
    };
  }
}
