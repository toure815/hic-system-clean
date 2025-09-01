import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Heart, Brain } from "lucide-react";

interface SpecialtyData {
  type: "primary-care" | "behavioral";
}

interface SpecialtyStepProps {
  data?: SpecialtyData;
  onChange: (data: SpecialtyData) => void;
  onNext: () => void;
  onPrevious: () => void;
  canGoNext: boolean;
  canGoPrevious: boolean;
  isLoading: boolean;
}

export function SpecialtyStep({
  data,
  onChange,
  onNext,
  onPrevious,
  canGoNext,
  canGoPrevious,
  isLoading,
}: SpecialtyStepProps) {
  const handleTypeChange = (type: "primary-care" | "behavioral") => {
    onChange({ type });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Specialty</CardTitle>
          <CardDescription>
            Select your primary medical specialty
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <RadioGroup
            value={data?.type || ""}
            onValueChange={(value) => handleTypeChange(value as "primary-care" | "behavioral")}
          >
            <div className="space-y-4">
              <Card className={`cursor-pointer transition-colors ${data?.type === "primary-care" ? "ring-2 ring-blue-500" : ""}`}>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value="primary-care" id="primary-care" />
                    <Heart className="h-5 w-5 text-red-600" />
                    <div>
                      <Label htmlFor="primary-care" className="text-base font-medium cursor-pointer">
                        Primary Care
                      </Label>
                      <p className="text-sm text-gray-600">
                        Family medicine, internal medicine, pediatrics, etc.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className={`cursor-pointer transition-colors ${data?.type === "behavioral" ? "ring-2 ring-blue-500" : ""}`}>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value="behavioral" id="behavioral" />
                    <Brain className="h-5 w-5 text-purple-600" />
                    <div>
                      <Label htmlFor="behavioral" className="text-base font-medium cursor-pointer">
                        Behavioral Health
                      </Label>
                      <p className="text-sm text-gray-600">
                        Mental health, substance abuse, therapy, psychiatry
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </RadioGroup>
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
          disabled={!canGoNext || !data?.type || isLoading}
        >
          {isLoading ? "Saving..." : "Next"}
        </Button>
      </div>
    </div>
  );
}
