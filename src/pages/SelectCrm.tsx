import React from "react";
import { Link } from "react-router-dom";
import { CircleDollarSign, Clock, FileText, Import } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

type CrmType = {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  color: string;
};

const SelectCrm = () => {
  const { setSelectedCrmType, user } = useAuth();
  const navigate = useNavigate();

  const crmTypes: CrmType[] = [
    {
      id: "export-import",
      name: "Export/Import CRM",
      description: "Manage international trade clients and leads",
      icon: <Import className="h-10 w-10" />,
      color: "bg-blue-100 text-blue-700",
    },
    {
      id: "gold-silver",
      name: "Gold/Silver CRM",
      description: "Track precious metal sales and client portfolio",
      icon: <CircleDollarSign className="h-10 w-10" />,
      color: "bg-amber-100 text-amber-700",
    },
    {
      id: "clock-stock",
      name: "Clock Stock CRM",
      description: "Inventory and client management for timepieces",
      icon: <Clock className="h-10 w-10" />,
      color: "bg-green-100 text-green-700",
    },
    {
      id: "visiting-book",
      name: "Visiting Book Sales",
      description: "Field sales tracking and client visit management",
      icon: <FileText className="h-10 w-10" />,
      color: "bg-purple-100 text-purple-700",
    },
  ];

  const handleSelectCrm = (crmId: string) => {
    setSelectedCrmType(crmId);
    
    if (user && user.crm_type === crmId) {
      navigate("/");
    } else {
      navigate("/auth");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <div className="w-full max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold tracking-tight mb-2">Sales CRM Portal</h1>
          <p className="text-muted-foreground">Select the CRM system you want to access</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {crmTypes.map((crm) => (
            <div key={crm.id} className="block transition-all hover:scale-105">
              <Card className="h-full border-2 hover:border-primary/50 hover:shadow-lg transition-all">
                <CardHeader>
                  <div className={`p-3 rounded-full w-fit ${crm.color} mb-4`}>
                    {crm.icon}
                  </div>
                  <CardTitle>{crm.name}</CardTitle>
                  <CardDescription>{crm.description}</CardDescription>
                </CardHeader>
                <CardFooter>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => handleSelectCrm(crm.id)}
                  >
                    Select
                  </Button>
                </CardFooter>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SelectCrm;
