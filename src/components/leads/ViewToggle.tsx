
import React from "react";
import { Button } from "../shared/Button";

interface ViewToggleProps {
  viewMode: "table" | "card";
  setViewMode: (mode: "table" | "card") => void;
}

export const ViewToggle = ({ viewMode, setViewMode }: ViewToggleProps) => {
  return (
    <div className="flex gap-2">
      <Button
        variant={viewMode === "table" ? "default" : "outline"}
        size="sm"
        onClick={() => setViewMode("table")}
      >
        Table View
      </Button>
      <Button
        variant={viewMode === "card" ? "default" : "outline"}
        size="sm"
        onClick={() => setViewMode("card")}
      >
        Card View
      </Button>
    </div>
  );
};
