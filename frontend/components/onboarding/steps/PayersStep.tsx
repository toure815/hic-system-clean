import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Building } from "lucide-react";

interface PayersData {
  medicare: boolean;
  medicaid: boolean;
  commercialPayers: string[];
}

interface PayersStepProps {
  data?: PayersData;
  onChange: (data: PayersData) => void;
  onNext: () => void;
  onPrevious: () => void;
  canGoNext: boolean;
  canGoPrevious: boolean;
  isLoading: boolean;
}

const COMMERCIAL_PAYERS = [
  "Aetna",
  "Anthem",
  "Blue Cross Blue Shield",
  "Cigna", 
  "Humana",
  "Kaiser Permanente",
  "Molina Healthcare",
  "UnitedHealth Group",
  "Wellcare",
  "Other"
];

export function PayersStep({
  data,
  onChange,
  onNext,
  onPrevious,
  canGoNext,
  canGoPrevious,
  isLoading,
}: PayersStepProps) {
  const currentData = data || {
    medicare: false,
    medicaid: false,
    commercialPayers: [],
  };

  const handleMedicareChange = (checked: boolean) => {
    onChange({
      ...currentData,
      medicare: checked,
    });
  };

  const handleMedicaidChange = (checked: boolean) => {
    onChange({
      ...currentData,
      medicaid: checked,
    });
  };

  const handleCommercialPayerChange = (payer: string, checked: boolean) => {
    const updatedPayers = checked
      ? [...currentData.commercialPayers, payer]
      : currentData.commercialPayers.filter(p => p !== payer);
    
    onChange({
      ...currentData,
      commercialPayers: updatedPayers,
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Payer Information</CardTitle>
          <CardDescription>
            Select the payers you want to be credentialed with. Note that selecting Medicare or Medicaid will require you to upload bank information in the next step.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Government Payers */}
          <div className="space-y-4">
            <h4 className="font-medium flex items-center">
              <Building className="h-5 w-5 mr-2 text-blue-600" />
              Government Payers
            </h4>
            
            <div className="space-y-3 ml-7">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="medicare"
                  checked={currentData.medicare}
                  onCheckedChange={handleMedicareChange}
                />
                <Label htmlFor="medicare">Medicare</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="medicaid"
                  checked={currentData.medicaid}
                  onCheckedChange={handleMedicaidChange}
                />
                <Label htmlFor="medicaid">Medicaid</Label>
              </div>
            </div>
          </div>

          {/* Commercial Payers */}
          <div className="space-y-4">
            <h4 className="font-medium">Commercial Payers (Optional)</h4>
            <p className="text-sm text-gray-600">
              Select any commercial insurance plans you'd like to be credentialed with
            </p>
            
            <div className="grid grid-cols-2 gap-3">
              {COMMERCIAL_PAYERS.map((payer) => (
                <div key={payer} className="flex items-center space-x-2">
                  <Checkbox
                    id={`payer-${payer}`}
                    checked={currentData.commercialPayers.includes(payer)}
                    onCheckedChange={(checked) => handleCommercialPayerChange(payer, checked as boolean)}
                  />
                  <Label htmlFor={`payer-${payer}`} className="text-sm">
                    {payer}
                  </Label>
                </div>
              ))}
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
          disabled={!canGoNext || isLoading}
        >
          {isLoading ? "Saving..." : "Next"}
        </Button>
      </div>
    </div>
  );
}
