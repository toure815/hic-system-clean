import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, Trash2, Calendar as CalendarIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { CustomCalendarCaption } from "@/components/ui/CustomCalendarCaption";

interface BusinessProfileData {
  businessName: string;
  providerName: string;
  ssn: string;
  dateOfBirth: string;
  primaryAddress: string;
  additionalLocations: string[];
  einNumber: string;
  npiNumber: string;
  groupNpiNumber?: string;
  countyOfBusiness: string;
  businessPhoneNumber: string;
  businessEmail: string;
  businessFaxNumber?: string;
  caqh: string;
  hoursOfOperation: string;
  businessWebsite?: string;
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
    primaryAddress: "",
    additionalLocations: [],
    einNumber: "",
    npiNumber: "",
    groupNpiNumber: "",
    countyOfBusiness: "",
    businessPhoneNumber: "",
    businessEmail: "",
    businessFaxNumber: "",
    caqh: "",
    hoursOfOperation: "",
    businessWebsite: "",
  };

  const [showAdditionalLocations, setShowAdditionalLocations] = useState(
    (currentData.additionalLocations?.length || 0) > 0
  );

  const handleChange = (updates: Partial<BusinessProfileData>) => {
    onChange({ ...currentData, ...updates });
  };

  const handleAdditionalLocationChange = (index: number, value: string) => {
    const newLocations = [...currentData.additionalLocations];
    newLocations[index] = value;
    handleChange({ additionalLocations: newLocations });
  };

  const addAdditionalLocation = () => {
    handleChange({ additionalLocations: [...currentData.additionalLocations, ""] });
  };

  const removeAdditionalLocation = (index: number) => {
    const newLocations = currentData.additionalLocations.filter((_, i) => i !== index);
    handleChange({ additionalLocations: newLocations });
  };

  const isValid = 
    currentData.businessName &&
    currentData.providerName &&
    currentData.ssn &&
    currentData.dateOfBirth &&
    currentData.primaryAddress &&
    currentData.einNumber &&
    currentData.npiNumber &&
    currentData.countyOfBusiness &&
    currentData.businessPhoneNumber &&
    currentData.businessEmail &&
    currentData.caqh &&
    currentData.hoursOfOperation;

  const dateOfBirthAsDate = currentData.dateOfBirth ? new Date(currentData.dateOfBirth.replace(/-/g, '/')) : undefined;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Business Profile</CardTitle>
          <CardDescription>
            Please provide the following details about your business and the primary provider. Required fields are marked with an asterisk (*).
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="businessName">Business Name *</Label>
              <Input id="businessName" value={currentData.businessName} onChange={(e) => handleChange({ businessName: e.target.value })} placeholder="Your Company LLC" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="providerName">Provider Name (Full Legal Name) *</Label>
              <Input id="providerName" value={currentData.providerName} onChange={(e) => handleChange({ providerName: e.target.value })} placeholder="Dr. Jane Doe" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ssn">Social Security Number (SSN) *</Label>
              <Input id="ssn" value={currentData.ssn} onChange={(e) => handleChange({ ssn: e.target.value })} placeholder="XXX-XX-XXXX" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dateOfBirth">Date of Birth *</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !currentData.dateOfBirth && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateOfBirthAsDate ? format(dateOfBirthAsDate, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    components={{ Caption: CustomCalendarCaption }}
                    fromYear={1930}
                    toYear={new Date().getFullYear()}
                    selected={dateOfBirthAsDate}
                    onSelect={(date) =>
                      handleChange({ dateOfBirth: date ? format(date, "yyyy-MM-dd") : "" })
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="primaryAddress">Primary Business Address *</Label>
              <Textarea id="primaryAddress" value={currentData.primaryAddress} onChange={(e) => handleChange({ primaryAddress: e.target.value })} placeholder="123 Main St, Anytown, USA 12345" />
            </div>
            
            <div className="md:col-span-2 space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="hasAdditionalLocations"
                  checked={showAdditionalLocations}
                  onCheckedChange={(checked) => setShowAdditionalLocations(checked as boolean)}
                />
                <Label htmlFor="hasAdditionalLocations">I have additional business locations</Label>
              </div>

              {showAdditionalLocations && (
                <div className="space-y-4 pl-6 border-l-2">
                  {currentData.additionalLocations.map((loc, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <Label>Additional Location {index + 1}</Label>
                        <Button variant="ghost" size="icon" onClick={() => removeAdditionalLocation(index)} className="h-7 w-7">
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                      <Textarea
                        value={loc}
                        onChange={(e) => handleAdditionalLocationChange(index, e.target.value)}
                        placeholder={`Location ${index + 2} Address`}
                      />
                    </div>
                  ))}
                  <Button variant="outline" onClick={addAdditionalLocation} className="w-full border-dashed">
                    <Plus className="h-4 w-4 mr-2" />
                    Add another location
                  </Button>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="einNumber">EIN Number (Tax ID) *</Label>
              <Input id="einNumber" value={currentData.einNumber} onChange={(e) => handleChange({ einNumber: e.target.value })} placeholder="XX-XXXXXXX" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="npiNumber">Individual NPI Number *</Label>
              <Input id="npiNumber" value={currentData.npiNumber} onChange={(e) => handleChange({ npiNumber: e.target.value })} placeholder="1234567890" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="groupNpiNumber">Group NPI Number (if applicable)</Label>
              <Input id="groupNpiNumber" value={currentData.groupNpiNumber || ""} onChange={(e) => handleChange({ groupNpiNumber: e.target.value })} placeholder="10-digit number" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="countyOfBusiness">County of Business *</Label>
              <Input id="countyOfBusiness" value={currentData.countyOfBusiness} onChange={(e) => handleChange({ countyOfBusiness: e.target.value })} placeholder="Any County" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="businessPhoneNumber">Business Phone Number *</Label>
              <Input id="businessPhoneNumber" type="tel" value={currentData.businessPhoneNumber} onChange={(e) => handleChange({ businessPhoneNumber: e.target.value })} placeholder="(555) 555-5555" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="businessEmail">Business Email *</Label>
              <Input id="businessEmail" type="email" value={currentData.businessEmail} onChange={(e) => handleChange({ businessEmail: e.target.value })} placeholder="contact@yourcompany.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="businessFaxNumber">Business Fax Number (Optional)</Label>
              <Input id="businessFaxNumber" type="tel" value={currentData.businessFaxNumber || ""} onChange={(e) => handleChange({ businessFaxNumber: e.target.value })} placeholder="(555) 555-5556" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="caqh">CAQH ID *</Label>
              <Input id="caqh" value={currentData.caqh} onChange={(e) => handleChange({ caqh: e.target.value })} placeholder="Your CAQH ID" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="businessWebsite">Business Website (Optional)</Label>
              <Input id="businessWebsite" type="url" value={currentData.businessWebsite || ""} onChange={(e) => handleChange({ businessWebsite: e.target.value })} placeholder="https://yourcompany.com" />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="hoursOfOperation">Hours of Operation *</Label>
              <Textarea id="hoursOfOperation" value={currentData.hoursOfOperation} onChange={(e) => handleChange({ hoursOfOperation: e.target.value })} placeholder="e.g., Mon-Fri, 9am - 5pm" />
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
