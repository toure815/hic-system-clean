// SettingsPage.tsx
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export function SettingsPage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Account Settings</h1>
          <p className="text-gray-600 mt-1">Manage your account preferences</p>
        </div>
        <Button
          variant="outline"
          onClick={() => navigate("/portal")}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Portal
        </Button>
      </div>
      <div>
        <p>Email: {user?.email}</p>
      </div>
    </div>
  );
}
