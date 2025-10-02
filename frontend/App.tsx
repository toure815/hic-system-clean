import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./contexts/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { Header } from "./components/Header";
import { LoginPage } from "./pages/LoginPage";
import { SignupPage } from "./pages/SignupPage";   // <-- NEW IMPORT
import { DashboardPage } from "./pages/DashboardPage";
import { PortalPage } from "./pages/PortalPage";
import { OnboardingStartPage } from "./pages/OnboardingStartPage";
import { Toaster } from "@/components/ui/toaster";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-gray-50">
            <Header />
            <main className="container mx-auto px-4 py-8">
              <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />  {/* <-- NEW ROUTE */}
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute allowedRoles={["admin"]}>
                      <DashboardPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/portal"
                  element={
                    <ProtectedRoute allowedRoles={["client"]}>
                      <PortalPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/onboarding/start"
                  element={
                    <ProtectedRoute allowedRoles={["client"]}>
                      <OnboardingStartPage />
                    </ProtectedRoute>
                  }
                />
                <Route path="/" element={<Navigate to="/login" replace />} />
              </Routes>
            </main>
            <Toaster />
          </div>
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  );
}

