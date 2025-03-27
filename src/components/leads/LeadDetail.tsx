
import React, { useState } from "react";
import { Lead, Comment, formatDate } from "@/utils/mockData";
import { Button } from "../shared/Button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "lucide-react";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { StatusBadge } from "../shared/StatusBadge";
import { cn } from "@/lib/utils";
import { updateLead, convertLeadToClient } from "@/services/leadService";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";

interface LeadDetailProps {
  lead: Lead;
  open: boolean;
  onClose: () => void;
  onUpdate: (updatedLead: Lead) => void;
  onConvert: () => void;
}

export const LeadDetail = ({ lead, open, onClose, onUpdate, onConvert }: LeadDetailProps) => {
  const [editMode, setEditMode] = useState(false);
  const [editedLead, setEditedLead] = useState({ ...lead });
  const [newComment, setNewComment] = useState("");
  const [followUpDate, setFollowUpDate] = useState<Date | undefined>(
    lead.followUp ? new Date(lead.followUp) : undefined
  );
  const { user } = useAuth();

  const handleSaveChanges = async () => {
    try {
      // In a real app, this would update the lead in the database
      const updatedLead = await updateLead(lead.id, { 
        ...editedLead,
        followUp: followUpDate ? followUpDate.toISOString() : null
      });
      
      if (updatedLead) {
        onUpdate(updatedLead);
        toast.success("Lead updated successfully");
        setEditMode(false);
      }
    } catch (error) {
      console.error("Failed to update lead:", error);
      toast.error("Failed to update lead");
    }
  };

  const handleAddComment = () => {
    if (!newComment.trim()) return;

    const newCommentObj: Comment = {
      id: `comment-${Date.now()}`,
      date: new Date().toISOString(),
      content: newComment.trim(),
      author: user?.first_name || "User"
    };

    const updatedLead = {
      ...editedLead,
      comments: [...(editedLead.comments || []), newCommentObj]
    };

    setEditedLead(updatedLead);
    onUpdate(updatedLead);
    setNewComment("");
    toast.success("Comment added successfully");
  };

  const handleConvertToClient = async () => {
    try {
      // In a real app, this would convert the lead to a client in the database
      const client = await convertLeadToClient(lead);
      
      if (client) {
        toast.success("Lead converted to client successfully");
        onConvert();
        onClose();
      }
    } catch (error) {
      console.error("Failed to convert lead:", error);
      toast.error("Failed to convert lead");
    }
  };

  return (
    <Sheet open={open} onOpenChange={(open) => !open && onClose()}>
      <SheetContent className="sm:max-w-[540px] overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Lead Details</SheetTitle>
        </SheetHeader>
        
        <div className="space-y-6 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold">{lead.name}</h2>
              <p className="text-muted-foreground">{lead.type} Lead</p>
            </div>
            
            <StatusBadge status={lead.status} />
          </div>
          
          {editMode ? (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={editedLead.name}
                    onChange={(e) => setEditedLead({ ...editedLead, name: e.target.value })}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="type">Type</Label>
                  <Select
                    value={editedLead.type}
                    onValueChange={(value) => setEditedLead({ ...editedLead, type: value as "individual" | "business" | "referral" })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="individual">Individual</SelectItem>
                      <SelectItem value="business">Business</SelectItem>
                      <SelectItem value="referral">Referral</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={editedLead.phone}
                  onChange={(e) => setEditedLead({ ...editedLead, phone: e.target.value })}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  value={editedLead.email}
                  onChange={(e) => setEditedLead({ ...editedLead, email: e.target.value })}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  value={editedLead.address}
                  onChange={(e) => setEditedLead({ ...editedLead, address: e.target.value })}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select
                    value={editedLead.status}
                    onValueChange={(value) => setEditedLead({ ...editedLead, status: value as Lead["status"] })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="answered">Answered</SelectItem>
                      <SelectItem value="busy">Busy</SelectItem>
                      <SelectItem value="not-interested">Not Interested</SelectItem>
                      <SelectItem value="call-later">Call Later</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="converted">Converted</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label>Follow-up Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !followUpDate && "text-muted-foreground"
                        )}
                      >
                        <Calendar className="mr-2 h-4 w-4" />
                        {followUpDate ? formatDate(followUpDate.toISOString()) : "No date selected"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <CalendarComponent
                        mode="single"
                        selected={followUpDate}
                        onSelect={setFollowUpDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              
              <div className="flex gap-2 pt-2">
                <Button variant="outline" onClick={() => setEditMode(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSaveChanges}>
                  Save Changes
                </Button>
              </div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Contact Information</h3>
                  <div className="mt-1 space-y-2">
                    <p className="text-sm"><span className="font-medium">Phone:</span> {lead.phone}</p>
                    <p className="text-sm"><span className="font-medium">Email:</span> {lead.email}</p>
                    <p className="text-sm"><span className="font-medium">Address:</span> {lead.address}</p>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Lead Details</h3>
                  <div className="mt-1 space-y-2">
                    <p className="text-sm"><span className="font-medium">Created:</span> {formatDate(lead.createdAt)}</p>
                    <p className="text-sm"><span className="font-medium">Last Contact:</span> {formatDate(lead.lastContact)}</p>
                    <p className="text-sm">
                      <span className="font-medium">Follow-up:</span> {lead.followUp ? formatDate(lead.followUp) : "None"}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setEditMode(true)}>
                  Edit Lead
                </Button>
                <Button onClick={handleConvertToClient}>
                  Convert to Client
                </Button>
              </div>
            </>
          )}
          
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Notes</h3>
            <ul className="space-y-2">
              {lead.notes && lead.notes.map((note, index) => (
                <li key={index} className="text-sm border-l-2 border-primary pl-3 py-1">{note}</li>
              ))}
            </ul>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Comments</h3>
            <div className="space-y-4">
              {lead.comments && lead.comments.length > 0 ? (
                <div className="max-h-[300px] overflow-y-auto space-y-4">
                  {lead.comments.map((comment) => (
                    <div key={comment.id} className="border rounded-md p-3">
                      <div className="flex justify-between items-center mb-2">
                        <div className="font-medium">{comment.author}</div>
                        <div className="text-xs text-muted-foreground">
                          {formatDate(comment.date)}
                        </div>
                      </div>
                      <p className="text-sm">{comment.content}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center text-muted-foreground">
                  No comments yet.
                </div>
              )}
              
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
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
