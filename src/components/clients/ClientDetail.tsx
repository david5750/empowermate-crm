
import React, { useState } from "react";
import { Client, Comment, formatDate } from "@/utils/mockData";
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
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";

interface ClientDetailProps {
  client: Client;
  open: boolean;
  onClose: () => void;
  onUpdate: (updatedClient: Client) => void;
}

export const ClientDetail = ({ client, open, onClose, onUpdate }: ClientDetailProps) => {
  const [editMode, setEditMode] = useState(false);
  const [editedClient, setEditedClient] = useState({ ...client });
  const [newComment, setNewComment] = useState("");
  const [followUpDate, setFollowUpDate] = useState<Date | undefined>(
    client.followUp ? new Date(client.followUp) : undefined
  );
  const { user } = useAuth();

  const handleSaveChanges = async () => {
    try {
      // In a real app, this would update the client in the database
      const updatedClient = {
        ...editedClient,
        followUp: followUpDate ? followUpDate.toISOString() : null
      };
      
      onUpdate(updatedClient);
      toast.success("Client updated successfully");
      setEditMode(false);
    } catch (error) {
      console.error("Failed to update client:", error);
      toast.error("Failed to update client");
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

    const updatedClient = {
      ...editedClient,
      comments: [...(editedClient.comments || []), newCommentObj]
    };

    setEditedClient(updatedClient);
    onUpdate(updatedClient);
    setNewComment("");
    toast.success("Comment added successfully");
  };

  return (
    <Sheet open={open} onOpenChange={(open) => !open && onClose()}>
      <SheetContent className="sm:max-w-[540px] overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Client Details</SheetTitle>
        </SheetHeader>
        
        <div className="space-y-6 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold">{client.name}</h2>
              <p className="text-muted-foreground">
                {client.company && <span>{client.company} - </span>}
                {client.type} Client
              </p>
            </div>
            
            <StatusBadge status={client.status} />
          </div>
          
          {editMode ? (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={editedClient.name}
                    onChange={(e) => setEditedClient({ ...editedClient, name: e.target.value })}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="type">Type</Label>
                  <Select
                    value={editedClient.type}
                    onValueChange={(value) => setEditedClient({ ...editedClient, type: value as "individual" | "business" | "referral" })}
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
                <Label htmlFor="company">Company</Label>
                <Input
                  id="company"
                  value={editedClient.company || ""}
                  onChange={(e) => setEditedClient({ ...editedClient, company: e.target.value || null })}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={editedClient.phone}
                  onChange={(e) => setEditedClient({ ...editedClient, phone: e.target.value })}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  value={editedClient.email}
                  onChange={(e) => setEditedClient({ ...editedClient, email: e.target.value })}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  value={editedClient.address}
                  onChange={(e) => setEditedClient({ ...editedClient, address: e.target.value })}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="value">Value ($)</Label>
                  <Input
                    id="value"
                    type="number"
                    value={editedClient.value}
                    onChange={(e) => setEditedClient({ ...editedClient, value: Number(e.target.value) })}
                  />
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
                    <p className="text-sm"><span className="font-medium">Phone:</span> {client.phone}</p>
                    <p className="text-sm"><span className="font-medium">Email:</span> {client.email}</p>
                    <p className="text-sm"><span className="font-medium">Address:</span> {client.address}</p>
                    {client.company && (
                      <p className="text-sm"><span className="font-medium">Company:</span> {client.company}</p>
                    )}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Client Details</h3>
                  <div className="mt-1 space-y-2">
                    <p className="text-sm"><span className="font-medium">Client Since:</span> {formatDate(client.createdAt)}</p>
                    <p className="text-sm"><span className="font-medium">Last Contact:</span> {formatDate(client.lastContact)}</p>
                    <p className="text-sm">
                      <span className="font-medium">Follow-up:</span> {client.followUp ? formatDate(client.followUp) : "None"}
                    </p>
                    <p className="text-sm"><span className="font-medium">Value:</span> ${client.value.toLocaleString()}</p>
                  </div>
                </div>
              </div>
              
              <div>
                <Button variant="outline" onClick={() => setEditMode(true)}>
                  Edit Client
                </Button>
              </div>
            </>
          )}
          
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Notes</h3>
            <ul className="space-y-2">
              {client.notes && client.notes.map((note, index) => (
                <li key={index} className="text-sm border-l-2 border-primary pl-3 py-1">{note}</li>
              ))}
            </ul>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Comments</h3>
            <div className="space-y-4">
              {client.comments && client.comments.length > 0 ? (
                <div className="max-h-[300px] overflow-y-auto space-y-4">
                  {client.comments.map((comment) => (
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
