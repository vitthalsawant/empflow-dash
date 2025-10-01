import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { FileSpreadsheet, BarChart3, Users, TrendingUp } from "lucide-react";

const Intro = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <FileSpreadsheet className="w-6 h-6 text-primary" />
            <span className="text-xl font-bold">EmployeeHub</span>
          </div>
          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              onClick={() => navigate("/auth")}
            >
              Sign in
            </Button>
            <Button 
              onClick={() => navigate("/auth")}
              className="hover-scale"
            >
              Sign up
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-bold tracking-tight">
                Employee data management made simple
              </h1>
              <p className="text-xl text-muted-foreground max-w-xl">
                A modern platform for managing your workforce from 1–5,000 employees, with powerful analytics, insights, and seamless organization.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Button 
                size="lg" 
                onClick={() => navigate("/auth")}
                className="hover-scale text-lg px-8"
              >
                Get started
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                onClick={() => navigate("/dashboard")}
                className="text-lg px-8"
              >
                View demo
              </Button>
            </div>

            {/* Feature highlights */}
            <div className="grid grid-cols-3 gap-6 pt-8">
              <div className="space-y-2">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold">Easy Management</h3>
                <p className="text-sm text-muted-foreground">Organize all employee data in one place</p>
              </div>
              <div className="space-y-2">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold">Analytics</h3>
                <p className="text-sm text-muted-foreground">Track metrics and insights</p>
              </div>
              <div className="space-y-2">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold">Growth</h3>
                <p className="text-sm text-muted-foreground">Scale with your team</p>
              </div>
            </div>
          </div>

          {/* Right Column - Visual */}
          <div className="relative animate-scale-in">
            <div className="relative rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 p-8 backdrop-blur-sm border shadow-2xl">
              <div className="space-y-4">
                {/* Mock dashboard cards */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-card/80 backdrop-blur-sm rounded-lg p-4 border shadow-sm">
                    <div className="flex items-center gap-2 mb-2">
                      <Users className="w-4 h-4 text-primary" />
                      <span className="text-xs font-medium text-muted-foreground">Total</span>
                    </div>
                    <div className="text-2xl font-bold">247</div>
                    <div className="text-xs text-muted-foreground">Employees</div>
                  </div>
                  <div className="bg-card/80 backdrop-blur-sm rounded-lg p-4 border shadow-sm">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="w-4 h-4 text-primary" />
                      <span className="text-xs font-medium text-muted-foreground">Growth</span>
                    </div>
                    <div className="text-2xl font-bold">+12%</div>
                    <div className="text-xs text-muted-foreground">This month</div>
                  </div>
                </div>
                
                {/* Mock chart */}
                <div className="bg-card/80 backdrop-blur-sm rounded-lg p-4 border shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-medium">Department Overview</span>
                    <BarChart3 className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <div className="flex items-end justify-between h-32 gap-2">
                    <div className="bg-primary/30 rounded-t w-full" style={{ height: '60%' }}></div>
                    <div className="bg-primary/50 rounded-t w-full" style={{ height: '85%' }}></div>
                    <div className="bg-primary/40 rounded-t w-full" style={{ height: '70%' }}></div>
                    <div className="bg-primary/60 rounded-t w-full" style={{ height: '95%' }}></div>
                    <div className="bg-primary/35 rounded-t w-full" style={{ height: '55%' }}></div>
                  </div>
                </div>

                {/* Mock employee cards */}
                <div className="space-y-2">
                  <div className="bg-card/80 backdrop-blur-sm rounded-lg p-3 border shadow-sm flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/20"></div>
                    <div className="flex-1">
                      <div className="h-3 bg-foreground/10 rounded w-24 mb-1"></div>
                      <div className="h-2 bg-foreground/5 rounded w-32"></div>
                    </div>
                  </div>
                  <div className="bg-card/80 backdrop-blur-sm rounded-lg p-3 border shadow-sm flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-secondary/20"></div>
                    <div className="flex-1">
                      <div className="h-3 bg-foreground/10 rounded w-28 mb-1"></div>
                      <div className="h-2 bg-foreground/5 rounded w-36"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Intro;
