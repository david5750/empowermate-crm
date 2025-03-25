
import React from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../shared/Card";
import { StatusBadge } from "../shared/StatusBadge";
import { Lead, formatDate } from "@/utils/mockData";
import { Button } from "../shared/Button";
import { Calendar, Clock, Mail, MapPin, Phone } from "lucide-react";

interface LeadCardProps {
  lead: Lead;
}

export const LeadCard = ({ lead }: LeadCardProps) => {
  return (
    <Card hover className="animate-fade-in">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{lead.name}</CardTitle>
          <StatusBadge status={lead.status} />
        </div>
        <p className="text-sm text-muted-foreground mt-1 capitalize">
          {lead.type} Lead
        </p>
      </CardHeader>
      
      <CardContent className="pb-2">
        <div className="space-y-2">
          <div className="flex items-center text-sm">
            <Phone className="h-3.5 w-3.5 mr-2 text-muted-foreground" />
            <a href={`tel:${lead.phone}`} className="hover-underline">
              {lead.phone}
            </a>
          </div>
          
          <div className="flex items-center text-sm">
            <Mail className="h-3.5 w-3.5 mr-2 text-muted-foreground" />
            <a href={`mailto:${lead.email}`} className="hover-underline text-truncate">
              {lead.email}
            </a>
          </div>
          
          <div className="flex items-start text-sm">
            <MapPin className="h-3.5 w-3.5 mr-2 mt-0.5 text-muted-foreground" />
            <span className="text-truncate">{lead.address}</span>
          </div>
          
          <div className="flex items-center text-sm">
            <Calendar className="h-3.5 w-3.5 mr-2 text-muted-foreground" />
            <span>Created: {formatDate(lead.createdAt)}</span>
          </div>
          
          {lead.followUp && (
            <div className="flex items-center text-sm">
              <Clock className="h-3.5 w-3.5 mr-2 text-muted-foreground" />
              <span>Follow-up: {formatDate(lead.followUp)}</span>
            </div>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-between pt-2">
        <Button variant="outline" size="sm">
          <Phone className="h-3.5 w-3.5 mr-1" />
          Call
        </Button>
        <Button variant="outline" size="sm">
          <Mail className="h-3.5 w-3.5 mr-1" />
          Email
        </Button>
        <Button size="sm">View Details</Button>
      </CardFooter>
    </Card>
  );
};
