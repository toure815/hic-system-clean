import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, MessageSquare, Settings, CheckCircle, Upload } from "lucide-react";

export function PortalPage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Mock data - replace with actual data when available
  const uploadedDocsCount = 0; // This should come from an API call

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Client Portal</h1>
        <p className="text-gray-600 mt-1">
          Welcome, {user?.email}! Access your account information and services.
        </p>
      </div>

      {/* Primary CTA Card */}
      <Card className="border-blue-200 bg-blue-50">
        <CardHeader>
          <div className="flex items-center space-x-3">
            <CheckCircle className="h-8 w-8 text-blue-600" />
            <div>
              <CardTitle className="text-xl text-blue-900">Start Your Credentialing Process</CardTitle>
              <CardDescription className="text-blue-700">
                Complete your provider credentialing in just a few simple steps
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-sm text-blue-800">
              Our streamlined onboarding process will guide you through providing all the necessary 
              information and documentation for credentialing with healthcare plans and networks.
            </p>
            <Button 
              onClick={() => navigate("/onboarding/start")}
              size="lg"
              className="bg-blue-600 hover:bg-blue-700"
            >
              Start Credentialing
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate("/documents")}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Documents</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{uploadedDocsCount}</div>
            <p className="text-xs text-muted-foreground mb-3">
              Uploaded documents
            </p>
            <Button 
              size="sm" 
              variant="outline"
              onClick={(e) => {
                e.stopPropagation();
                navigate("/documents");
              }}
              className="w-full"
            >
              <Upload className="h-3 w-3 mr-1" />
              Upload documents
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Messages</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">--</div>
            <p className="text-xs text-muted-foreground">
              Coming soon
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate("/settings")}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Settings</CardTitle>
            <Settings className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">--</div>
            <p className="text-xs text-muted-foreground">
              Account settings
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              Your latest account activity and updates
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-gray-600">
              No recent activity to display.
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Links</CardTitle>
            <CardDescription>
              Frequently accessed features and services
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div 
                className="text-sm text-blue-600 hover:text-blue-800 cursor-pointer"
                onClick={() => navigate("/onboarding/start")}
              >
                → Start Credentialing
              </div>
              <div 
                className="text-sm text-blue-600 hover:text-blue-800 cursor-pointer"
                onClick={() => navigate("/documents")}
              >
                → Upload Documents
              </div>
              <div 
                className="text-sm text-blue-600 hover:text-blue-800 cursor-pointer"
                onClick={() => navigate("/settings")}
              >
                → Update Profile
              </div>
              <div className="text-sm text-blue-600 hover:text-blue-800 cursor-pointer">
                → Contact Support
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
