import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface BusinessProfileData {
  businessName: string;
  providerName: string;
  ssn: string;
  dateOfBirth: string;
  businessAddress: string;
  einNumber: string;
  npiNumber: string;
  countyOfBusiness: string;
  businessPhoneNumber: string;
  businessEmail: string;
  businessFaxNumber: string;
  caqh: string;
  hoursOfOperation: string;
  businessWebsite: string;
}

interface BusinessProfileStepProps {
  data?: BusinessProfileData;
  onChange: (data: BusinessProfileData) => void;
  onNext: () => void;
  onPrevious: () => void;
  canGoNext: boolean;
  canGoPrevious: boolean;
  isLoading: boolean;
}

export function BusinessProfileStep({
  data,
  onChange,
  onNext,
  onPrevious,
  canGoPrevious,
  isLoading,
}: BusinessProfileStepProps) {
  const currentData = data || {
    businessName: "",
    providerName: "",
    ssn: "",
    dateOfBirth: "",
    businessAddress: "",
    einNumber: "",
    npiNumber: "",
    countyOfBusiness: "",
    businessPhoneNumber: "",
    businessEmail: "",
    businessFaxNumber: "",
    caqh: "",
    hoursOfOperation: "",
    businessWebsite: "",
  };

  const handleChange = (field: keyof BusinessProfileData, value: string) => {
    onChange({ ...currentData, [field]: value });
  };

  // Basic validation: check if required fields are filled.
  const isValid = 
    currentData.businessName &&
    currentData.providerName &&
    currentData.ssn &&
    currentData.dateOfBirth &&
    currentData.businessAddress &&
    currentData.einNumber &&
    currentData.npiNumber &&
    currentData.countyOfBusiness &&
    currentData.businessPhoneNumber &&
    currentData.businessEmail &&
    currentData.caqh &&
    currentData.hoursOfOperation;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Business Profile</CardTitle>
          <CardDescription>
            Please provide the following details about your business and the primary provider.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="businessName">Business Name</Label>
              <Input id="businessName" value={currentData.businessName} onChange={(e) => handleChange("businessName", e.target.value)} placeholder="Your Company LLC" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="providerName">Provider Name (Full Legal Name)</Label>
              <Input id="providerName" value={currentData.providerName} onChange={(e) => handleChange("providerName", e.target.value)} placeholder="Dr. Jane Doe" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ssn">Social Security Number (SSN)</Label>
              <Input id="ssn" value={currentData.ssn} onChange={(e) => handleChange("ssn", e.target.value)} placeholder="XXX-XX-XXXX" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dateOfBirth">Date of Birth</Label>
              <Input id="dateOfBirth" type="date" value={currentData.dateOfBirth} onChange={(e) => handleChange("dateOfBirth", e.target.value)} />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="businessAddress">Business Address</Label>
              <Textarea id="businessAddress" value={currentData.businessAddress} onChange={(e) => handleChange("businessAddress", e.target.value)} placeholder="123 Main St, Anytown, USA 12345" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="einNumber">EIN Number (Tax ID)</Label>
              <Input id="einNumber" value={currentData.einNumber} onChange={(e) => handleChange("einNumber", e.target.value)} placeholder="XX-XXXXXXX" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="npiNumber">NPI Number</Label>
              <Input id="npiNumber" value={currentData.npiNumber} onChange={(e) => handleChange("npiNumber", e.target.value)} placeholder="1234567890" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="countyOfBusiness">County of Business</Label>
              <Input id="countyOfBusiness" value={currentData.countyOfBusiness} onChange={(e) => handleChange("countyOfBusiness", e.target.value)} placeholder="Any County" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="businessPhoneNumber">Business Phone Number</Label>
              <Input id="businessPhoneNumber" type="tel" value={currentData.businessPhoneNumber} onChange={(e) => handleChange("businessPhoneNumber", e.target.value)} placeholder="(555) 555-5555" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="businessEmail">Business Email</Label>
              <Input id="businessEmail" type="email" value={currentData.businessEmail} onChange={(e) => handleChange("businessEmail", e.target.value)} placeholder="contact@yourcompany.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="businessFaxNumber">Business Fax Number (Optional)</Label>
              <Input id="businessFaxNumber" type="tel" value={currentData.businessFaxNumber} onChange={(e) => handleChange("businessFaxNumber", e.target.value)} placeholder="(555) 555-5556" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="caqh">CAQH ID</Label>
              <Input id="caqh" value={currentData.caqh} onChange={(e) => handleChange("caqh", e.target.value)} placeholder="Your CAQH ID" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="businessWebsite">Business Website (Optional)</Label>
              <Input id="businessWebsite" type="url" value={currentData.businessWebsite} onChange={(e) => handleChange("businessWebsite", e.target.value)} placeholder="https://yourcompany.com" />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="hoursOfOperation">Hours of Operation</Label>
              <Textarea id="hoursOfOperation" value={currentData.hoursOfOperation} onChange={(e) => handleChange("hoursOfOperation", e.target.value)} placeholder="e.g., Mon-Fri, 9am - 5pm" />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={onPrevious}
          disabled={!canGoPrevious || isLoading}
        >
          Previous
        </Button>
        <Button
          onClick={onNext}
          disabled={!isValid || isLoading}
        >
          {isLoading ? "Saving..." : "Next"}
        </Button>
      </div>
    </div>
  );
}
