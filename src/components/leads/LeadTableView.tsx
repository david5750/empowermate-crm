
import React from "react";
import { Lead } from "@/utils/mockData";
import { formatDate } from "@/utils/mockData";
import { ChevronLeft, ChevronRight, Phone, MessageCircle, Eye, UserCheck } from "lucide-react";
import { Button } from "../shared/Button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { STATUS_OPTIONS, SOURCE_OPTIONS } from "./leadConstants";

interface LeadTableViewProps {
  paginatedLeads: Lead[];
  selectedLead: Lead | null;
  setSelectedLead: (lead: Lead | null) => void;
  newComment: string;
  setNewComment: (comment: string) => void;
  handleAddComment: () => void;
  handleSourceChange: (leadId: string, source: string) => void;
  handleStatusChange: (leadId: string, status: string) => void;
  handleConvertToClient: (lead: Lead) => void;
  setShowDetailSheet: (show: boolean) => void;
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
  filteredLeadsCount: number;
  itemsPerPage: number;
}

export const LeadTableView = ({
  paginatedLeads,
  selectedLead,
  setSelectedLead,
  newComment,
  setNewComment,
  handleAddComment,
  handleSourceChange,
  handleStatusChange,
  handleConvertToClient,
  setShowDetailSheet,
  currentPage,
  totalPages,
  setCurrentPage,
  filteredLeadsCount,
  itemsPerPage
}: LeadTableViewProps) => {
  return (
    <div className="rounded-md border">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-muted/50">
              <th className="px-4 py-3 text-left font-medium">Name</th>
              <th className="px-4 py-3 text-left font-medium">Source</th>
              <th className="px-4 py-3 text-left font-medium">Status</th>
              <th className="px-4 py-3 text-left font-medium">Created</th>
              <th className="px-4 py-3 text-left font-medium">Follow-up</th>
              <th className="px-4 py-3 text-left font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedLeads.map((lead) => (
              <tr
                key={lead.id}
                className="border-b hover:bg-muted/50 transition-colors"
              >
                <td className="px-4 py-3">
                  <div className="font-medium">
                    <button 
                      onClick={() => {
                        setSelectedLead(lead);
                        setShowDetailSheet(true);
                      }}
                      className="hover:underline focus:outline-none text-left"
                    >
                      {lead.name}
                    </button>
                  </div>
                  <div className="text-xs text-muted-foreground">{lead.phone}</div>
                </td>
                <td className="px-4 py-3">
                  <Select
                    value={lead.type}
                    onValueChange={(value) => handleSourceChange(lead.id, value)}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select source" />
                    </SelectTrigger>
                    <SelectContent>
                      {SOURCE_OPTIONS.map(option => (
                        <SelectItem key={option} value={option}>{option}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </td>
                <td className="px-4 py-3">
                  <Select
                    value={lead.status}
                    onValueChange={(value) => handleStatusChange(lead.id, value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      {STATUS_OPTIONS.map(option => (
                        <SelectItem key={option} value={option}>{option}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </td>
                <td className="px-4 py-3">{formatDate(lead.createdAt)}</td>
                <td className="px-4 py-3">
                  {lead.followUp ? formatDate(lead.followUp) : "—"}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <Phone className="h-3.5 w-3.5 mr-1" />
                      Call
                    </Button>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setSelectedLead(lead)}
                        >
                          <MessageCircle className="h-3.5 w-3.5 mr-1" />
                          Comments
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[625px]">
                        <DialogHeader>
                          <DialogTitle>Lead Comments - {selectedLead?.name}</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                          <div className="max-h-[300px] overflow-y-auto space-y-4">
                            {selectedLead?.comments && selectedLead.comments.length > 0 ? (
                              selectedLead.comments.map((comment) => (
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
                    <div className="flex space-x-1">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => {
                          setSelectedLead(lead);
                          setShowDetailSheet(true);
                        }}
                      >
                        <Eye className="h-3.5 w-3.5 mr-1" />
                        Details
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleConvertToClient(lead)}
                      >
                        <UserCheck className="h-3.5 w-3.5 mr-1" />
                        Convert
                      </Button>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Pagination */}
      <LeadPagination 
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
        filteredLeadsCount={filteredLeadsCount}
        itemsPerPage={itemsPerPage}
      />
    </div>
  );
};

// Pagination component
interface LeadPaginationProps {
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
  filteredLeadsCount: number;
  itemsPerPage: number;
}

const LeadPagination = ({
  currentPage,
  totalPages,
  setCurrentPage,
  filteredLeadsCount,
  itemsPerPage
}: LeadPaginationProps) => {
  return (
    <div className="flex items-center justify-between px-4 py-3 border-t">
      <div className="text-sm text-muted-foreground">
        Showing <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span> to <span className="font-medium">{Math.min(currentPage * itemsPerPage, filteredLeadsCount)}</span> of <span className="font-medium">{filteredLeadsCount}</span> leads
      </div>
      <div className="flex gap-1">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
