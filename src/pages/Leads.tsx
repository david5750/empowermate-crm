
import React from "react";
import { Layout } from "@/components/layout/Layout";
import { LeadTable } from "@/components/leads/LeadTable";

const Leads = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Lead Management</h1>
          <p className="text-muted-foreground">Create, view and manage leads</p>
        </div>
        
        <LeadTable />
      </div>
    </Layout>
  );
};

export default Leads;
