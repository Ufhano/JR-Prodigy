import React, { useState } from "react";
import {
  Droplets,
  Bell,
  Settings,
  LayoutDashboard,
  Info,
  Mail,
  LogOut,
} from "lucide-react";
import { useAuth } from "./contexts/AuthContext";
import { Dashboard } from "./components/Dashboard";
import { About } from "./components/About";
import { ContactUs } from "./components/ContactUs";
import { Login } from "./components/Login";
import { Register } from "./components/Register";
import { Button } from "./components/ui/button";

type Page = "dashboard" | "about" | "contact";

function AuthScreen({
  mode,
  onSwitch,
}: {
  mode: "login" | "register";
  onSwitch: () => void;
}) {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      {mode === "login" ? <Login /> : <Register />}
      <p className="mt-4 text-sm text-muted-foreground">
        {mode === "login" ? (
          <>
            Don&apos;t have an account?{" "}
            <button
              type="button"
              onClick={onSwitch}
              className="text-primary font-medium hover:underline"
            >
              Register
            </button>
          </>
        ) : (
          <>
            Already have an account?{" "}
            <button
              type="button"
              onClick={onSwitch}
              className="text-primary font-medium hover:underline"
            >
              Sign in
            </button>
          </>
        )}
      </p>
    </div>
  );
}

function MainApp() {
  const { user, logout } = useAuth();
  const [currentPage, setCurrentPage] = useState<Page>("dashboard");

  const renderPage = () => {
    switch (currentPage) {
      case "dashboard":
        return <Dashboard />;
      case "about":
        return <About />;
      case "contact":
        return <ContactUs />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary rounded-lg">
                <Droplets className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1>JR Prodigy</h1>
                <p className="text-sm text-muted-foreground">
                  Smart Water Meter Solutions
                </p>
              </div>
            </div>

            <nav className="hidden md:flex items-center gap-2">
              <Button
                variant={currentPage === "dashboard" ? "default" : "ghost"}
                onClick={() => setCurrentPage("dashboard")}
              >
                <LayoutDashboard className="w-4 h-4 mr-2" />
                Dashboard
              </Button>
              <Button
                variant={currentPage === "about" ? "default" : "ghost"}
                onClick={() => setCurrentPage("about")}
              >
                <Info className="w-4 h-4 mr-2" />
                About
              </Button>
              <Button
                variant={currentPage === "contact" ? "default" : "ghost"}
                onClick={() => setCurrentPage("contact")}
              >
                <Mail className="w-4 h-4 mr-2" />
                Contact
              </Button>
            </nav>

            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground hidden sm:inline">
                {user?.email}
              </span>
              <Button variant="ghost" size="icon" onClick={() => logout()}>
                <LogOut className="w-5 h-5" />
              </Button>
            </div>
          </div>

          <nav className="md:hidden flex items-center gap-2 mt-4">
            <Button
              variant={currentPage === "dashboard" ? "default" : "ghost"}
              onClick={() => setCurrentPage("dashboard")}
              size="sm"
              className="flex-1"
            >
              <LayoutDashboard className="w-4 h-4 mr-1" />
              Dashboard
            </Button>
            <Button
              variant={currentPage === "about" ? "default" : "ghost"}
              onClick={() => setCurrentPage("about")}
              size="sm"
              className="flex-1"
            >
              <Info className="w-4 h-4 mr-1" />
              About
            </Button>
            <Button
              variant={currentPage === "contact" ? "default" : "ghost"}
              onClick={() => setCurrentPage("contact")}
              size="sm"
              className="flex-1"
            >
              <Mail className="w-4 h-4 mr-1" />
              Contact
            </Button>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">{renderPage()}</main>

      <footer className="border-t bg-card mt-16">
        <div className="container mx-auto px-6 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="p-2 bg-primary rounded-lg">
                  <Droplets className="w-5 h-5 text-primary-foreground" />
                </div>
                <h3>JR Prodigy</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Leading the future of water management with innovative smart
                meter technology.
              </p>
            </div>
            <div>
              <h4 className="mb-4">Quick Links</h4>
              <div className="space-y-2">
                <button
                  onClick={() => setCurrentPage("dashboard")}
                  className="block text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Dashboard
                </button>
                <button
                  onClick={() => setCurrentPage("about")}
                  className="block text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  About Us
                </button>
                <button
                  onClick={() => setCurrentPage("contact")}
                  className="block text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Contact
                </button>
              </div>
            </div>
            <div>
              <h4 className="mb-4">Contact Info</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>rodney@jrpv.co.za</p>
                <p>+27 (81) 487 3585</p>
                <p>9 Macon Gardens. Macon Road</p>
                <p>Port Elizabeth, Eastern Cape</p>
              </div>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2025 JR Prodigy. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  const { user, loading } = useAuth();
  const [authMode, setAuthMode] = useState<"login" | "register">("login");

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Loading…</p>
      </div>
    );
  }

  if (!user) {
    return (
      <AuthScreen mode={authMode} onSwitch={() => setAuthMode((m) => (m === "login" ? "register" : "login"))} />
    );
  }

  return <MainApp />;
}
