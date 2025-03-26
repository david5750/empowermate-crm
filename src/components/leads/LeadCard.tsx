
import React, { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../shared/Card";
import { StatusBadge } from "../shared/StatusBadge";
import { Comment, Lead, formatDate } from "@/utils/mockData";
import { Button } from "../shared/Button";
import { Calendar, Clock, Mail, MapPin, Phone, MessageCircle } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

interface LeadCardProps {
  lead: Lead;
  onUpdateLead?: (updatedLead: Lead) => void;
}

export const LeadCard = ({ lead, onUpdateLead }: LeadCardProps) => {
  const [newComment, setNewComment] = useState("");
  const { user } = useAuth();

  const handleAddComment = () => {
    if (!newComment.trim()) return;

    const newCommentObj: Comment = {
      id: `comment-${Date.now()}`,
      date: new Date().toISOString(),
      content: newComment.trim(),
      author: user?.first_name || "User"
    };

    const updatedLead = {
      ...lead,
      comments: [...(lead.comments || []), newCommentObj]
    };

    if (onUpdateLead) {
      onUpdateLead(updatedLead);
    }

    setNewComment("");
    toast.success("Comment added successfully");
  };

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
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">
              <MessageCircle className="h-3.5 w-3.5 mr-1" />
              Comments
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[625px]">
            <DialogHeader>
              <DialogTitle>Lead Comments - {lead.name}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="max-h-[300px] overflow-y-auto space-y-4">
                {lead.comments && lead.comments.length > 0 ? (
                  lead.comments.map((comment) => (
                    <div key={comment.id} className="border rounded-md p-3">
                      <div className="flex justify-between items-center mb-2">
                        <div className="font-medium">{comment.author}</div>
                        <div className="text-xs text-muted-foreground">
                          {formatDate(comment.date)}
                        </div>
                      </div>
                      <p className="text-sm">{comment.content}</p>
                    </div>
                  ))
                ) : (
                  <div className="text-center text-muted-foreground">
                    No comments yet.
                  </div>
                )}
              </div>
              <div className="space-y-2">
                <Textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Add a new comment..."
                  className="min-h-[100px]"
                />
                <Button onClick={handleAddComment} disabled={!newComment.trim()}>
                  Add Comment
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
        <Button size="sm">View Details</Button>
      </CardFooter>
    </Card>
  );
};
