import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { FileSpreadsheet } from "lucide-react";

const Intro = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-background to-secondary/10">
      <div className="text-center space-y-8 p-8 animate-fade-in">
        <div className="flex justify-center">
          <FileSpreadsheet className="w-24 h-24 text-primary animate-scale-in" />
        </div>
        
        <div className="space-y-4">
          <h1 className="text-5xl font-bold tracking-tight">
            Employee Data Management
          </h1>
          <p className="text-xl text-muted-foreground max-w-md mx-auto">
            Manage your employee records with ease. Create, view, edit, and organize all your employee data in one place.
          </p>
        </div>

        <Button 
          size="lg" 
          onClick={() => navigate("/auth")}
          className="hover-scale"
        >
          Get Started
        </Button>
      </div>
    </div>
  );
};

export default Intro;
