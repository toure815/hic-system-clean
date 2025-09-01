import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useBackend } from "../../../hooks/useBackend";
import { useToast } from "@/components/ui/use-toast";
import { Upload, Check, Building, CreditCard } from "lucide-react";

interface PayersData {
  medicare: boolean;
  medicaid: boolean;
  bankAccountUploaded: boolean;
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
  const backend = useBackend();
  const { toast } = useToast();
  const [isUploadingBank, setIsUploadingBank] = useState(false);

  const currentData = data || {
    medicare: false,
    medicaid: false,
    bankAccountUploaded: false,
    commercialPayers: [],
  };

  const uploadMutation = useMutation({
    mutationFn: async (file: File) => {
      const reader = new FileReader();
      return new Promise<string>((resolve, reject) => {
        reader.onload = () => {
          const base64 = reader.result as string;
          const base64Data = base64.split(',')[1];
          resolve(base64Data);
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
      }).then(base64Data => 
        backend.onboarding.uploadDocument({
          documentType: "bank-account",
          stepName: "payers",
          filename: file.name,
          fileData: base64Data,
        })
      );
    },
    onSuccess: (result, file) => {
      onChange({
        ...currentData,
        bankAccountUploaded: true,
      });
      
      toast({
        title: "Bank document uploaded",
        description: `${file.name} has been uploaded successfully.`,
      });
    },
    onError: (error: any) => {
      console.error("Upload error:", error);
      toast({
        title: "Upload failed",
        description: error.message || "Failed to upload bank document",
        variant: "destructive",
      });
    },
    onSettled: () => {
      setIsUploadingBank(false);
    },
  });

  const handleFileUpload = (file: File) => {
    setIsUploadingBank(true);
    uploadMutation.mutate(file);
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

  const needsBankAccount = currentData.medicare || currentData.medicaid;
  const canProceed = !needsBankAccount || currentData.bankAccountUploaded;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Payer Information</CardTitle>
          <CardDescription>
            Select the payers you want to be credentialed with
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

          {/* Bank Account Upload */}
          {needsBankAccount && (
            <div className="space-y-4 p-4 bg-blue-50 rounded-lg">
              <h4 className="font-medium flex items-center">
                <CreditCard className="h-5 w-5 mr-2 text-blue-600" />
                Bank Account Information
              </h4>
              <p className="text-sm text-gray-700">
                Medicare and Medicaid require bank account information for direct deposit. 
                Please upload a voided check or bank letter.
              </p>
              
              <div className="flex items-center space-x-4">
                <input
                  type="file"
                  id="bank-upload"
                  className="hidden"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      handleFileUpload(file);
                    }
                  }}
                  disabled={isUploadingBank}
                />
                <Button
                  variant={currentData.bankAccountUploaded ? "outline" : "default"}
                  size="sm"
                  disabled={isUploadingBank}
                  onClick={() => document.getElementById('bank-upload')?.click()}
                >
                  {isUploadingBank ? (
                    "Uploading..."
                  ) : currentData.bankAccountUploaded ? (
                    <>
                      <Check className="h-4 w-4 mr-2 text-green-500" />
                      Bank document uploaded
                    </>
                  ) : (
                    <>
                      <Upload className="h-4 w-4 mr-2" />
                      Upload bank document
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}

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
          disabled={!canGoNext || !canProceed || isLoading}
        >
          {isLoading ? "Saving..." : "Next"}
        </Button>
      </div>
    </div>
  );
}
