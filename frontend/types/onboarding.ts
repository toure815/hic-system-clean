export type OnboardingStep = 
  | "identify-provider"
  | "practice-type" 
  | "specialty"
  | "licenses"
  | "required-docs"
  | "payers"
  | "portal-logins";

export interface OnboardingStepData {
  identifyProvider?: {
    type: "new" | "existing";
    existingProviderId?: string;
  };
  practiceType?: {
    type: "facility" | "group";
  };
  specialty?: {
    type: "primary-care" | "behavioral";
  };
  licenses?: {
    licenses: Array<{
      state: string;
      licenseNumber: string;
      expirationDate: string;
    }>;
  };
  requiredDocs?: {
    uploadedDocs: Array<{
      type: string;
      filename: string;
      uploaded: boolean;
    }>;
  };
  payers?: {
    medicare: boolean;
    medicaid: boolean;
    bankAccountUploaded: boolean;
    commercialPayers: string[];
  };
  portalLogins?: {
    logins: Array<{
      platform: string;
      username: string;
      password: string;
    }>;
  };
}
