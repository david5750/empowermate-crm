
import React, { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../shared/Card";
import { Button } from "../shared/Button";
import { X } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/contexts/AuthContext";
import { createLead } from "@/services/leadService";
import { toast } from "sonner";

interface NewLeadFormProps {
  onClose: () => void;
  onSuccess: () => void;
}

export const NewLeadForm = ({ onClose, onSuccess }: NewLeadFormProps) => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    type: "individual" as "individual" | "business" | "referral",
    status: "pending" as "answered" | "busy" | "not-interested" | "call-later" | "pending" | "converted",
    assignedTo: "E1001", // Default assigned user
    notes: [""] // Initial empty note
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const notes = e.target.value.split('\n').filter(note => note.trim() !== '');
    setFormData((prev) => ({ ...prev, notes }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.crm_type) {
      toast.error("CRM type not found");
      return;
    }

    setIsLoading(true);
    try {
      const newLead = await createLead({
        ...formData,
        crm_type: user.crm_type,
        lastContact: new Date().toISOString(),
        followUp: null
      });

      if (newLead) {
        toast.success("Lead created successfully");
        onSuccess();
      } else {
        toast.error("Failed to create lead");
      }
    } catch (error) {
      console.error("Error creating lead:", error);
      toast.error("An error occurred while creating the lead");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto animate-in fade-in">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle>Add New Lead</CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>

      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">
                Name*
              </label>
              <input
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="phone" className="text-sm font-medium">
                Phone*
              </label>
              <input
                id="phone"
                name="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email*
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="address" className="text-sm font-medium">
                Address*
              </label>
              <input
                id="address"
                name="address"
                required
                value={formData.address}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="type" className="text-sm font-medium">
                Type*
              </label>
              <select
                id="type"
                name="type"
                required
                value={formData.type}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
              >
                <option value="individual">Individual</option>
                <option value="business">Business</option>
                <option value="referral">Referral</option>
              </select>
            </div>

            <div className="space-y-2">
              <label htmlFor="status" className="text-sm font-medium">
                Status*
              </label>
              <select
                id="status"
                name="status"
                required
                value={formData.status}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
              >
                <option value="pending">Pending</option>
                <option value="answered">Answered</option>
                <option value="busy">Busy</option>
                <option value="not-interested">Not Interested</option>
                <option value="call-later">Call Later</option>
                <option value="converted">Converted</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="notes" className="text-sm font-medium">
              Notes (one per line)
            </label>
            <Textarea
              id="notes"
              name="notes"
              value={formData.notes.join('\n')}
              onChange={handleNotesChange}
              className="min-h-[100px]"
              placeholder="Enter notes about this lead..."
            />
          </div>
        </CardContent>

        <CardFooter className="flex justify-end space-x-2">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" isLoading={isLoading}>
            Create Lead
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};
