
import React from "react";
import { Button } from "../shared/Button";
import { Filter, Download, Plus, Search } from "lucide-react";

interface LeadSearchProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  activeFilters: string[];
  toggleFilter: (filter: string) => void;
  clearFilters: () => void;
  onNewLeadClick: () => void;
}

export const LeadSearch = ({ 
  searchQuery, 
  setSearchQuery, 
  activeFilters, 
  toggleFilter,
  clearFilters,
  onNewLeadClick
}: LeadSearchProps) => {
  return (
    <>
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        {/* Search */}
        <div className="relative max-w-md w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search leads..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 py-2 pr-4 rounded-md border border-input"
          />
        </div>
        
        {/* Actions */}
        <div className="flex gap-2">
          <div className="relative">
            <Button variant="outline" size="sm" className="gap-1">
              <Filter className="h-4 w-4" />
              Filter
              {activeFilters.length > 0 && (
                <span className="ml-1 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                  {activeFilters.length}
                </span>
              )}
            </Button>
          </div>
          
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-1" />
            Export
          </Button>
          
          <Button size="sm" onClick={onNewLeadClick}>
            <Plus className="h-4 w-4 mr-1" />
            New Lead
          </Button>
        </div>
      </div>
      
      {/* Active filters */}
      {activeFilters.length > 0 && (
        <div className="flex flex-wrap gap-2 items-center text-sm">
          <span className="text-muted-foreground">Active filters:</span>
          {activeFilters.map((filter) => (
            <span
              key={filter}
              className="px-2 py-1 rounded-full bg-muted text-muted-foreground cursor-pointer hover:bg-muted/80"
              onClick={() => toggleFilter(filter)}
            >
              {filter.replace('-', ' ')}
              <span className="ml-1">×</span>
            </span>
          ))}
          <Button
            variant="link"
            size="sm"
            className="h-auto p-0 text-muted-foreground"
            onClick={clearFilters}
          >
            Clear all
          </Button>
        </div>
      )}
    </>
  );
};
