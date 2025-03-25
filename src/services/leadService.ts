
import { supabase } from "@/integrations/supabase/client";
import { Lead } from "@/utils/mockData";

// Fetch leads for the current user's CRM type
export const fetchLeads = async (crmType: string): Promise<Lead[]> => {
  try {
    const { data, error } = await supabase
      .from("leads")
      .select("*")
      .eq("crm_type", crmType);
    
    if (error) {
      console.error("Error fetching leads:", error);
      throw error;
    }
    
    // Transform the database leads to match the Lead type
    const transformedLeads: Lead[] = data.map(lead => ({
      id: lead.id,
      name: lead.name,
      phone: lead.phone,
      email: lead.email,
      address: lead.address,
      type: lead.type as "individual" | "business" | "referral",
      status: lead.status as "answered" | "busy" | "not-interested" | "call-later" | "pending" | "converted",
      assignedTo: lead.assigned_to,
      createdAt: lead.created_at,
      lastContact: lead.last_contact,
      followUp: lead.follow_up,
      notes: lead.notes,
      crm_type: lead.crm_type
    }));
    
    return transformedLeads;
  } catch (error) {
    console.error("Failed to fetch leads:", error);
    return [];
  }
};

// Get a single lead by ID
export const fetchLeadById = async (id: string): Promise<Lead | null> => {
  try {
    const { data, error } = await supabase
      .from("leads")
      .select("*")
      .eq("id", id)
      .maybeSingle();
    
    if (error) {
      console.error("Error fetching lead:", error);
      throw error;
    }
    
    if (!data) return null;
    
    // Transform the database lead to match the Lead type
    const transformedLead: Lead = {
      id: data.id,
      name: data.name,
      phone: data.phone,
      email: data.email,
      address: data.address,
      type: data.type as "individual" | "business" | "referral",
      status: data.status as "answered" | "busy" | "not-interested" | "call-later" | "pending" | "converted",
      assignedTo: data.assigned_to,
      createdAt: data.created_at,
      lastContact: data.last_contact,
      followUp: data.follow_up,
      notes: data.notes,
      crm_type: data.crm_type
    };
    
    return transformedLead;
  } catch (error) {
    console.error("Failed to fetch lead:", error);
    return null;
  }
};

// Create a new lead
export const createLead = async (lead: Omit<Lead, "id" | "createdAt">): Promise<Lead | null> => {
  // Transform the Lead type to match the database schema
  const dbLead = {
    name: lead.name,
    phone: lead.phone,
    email: lead.email,
    address: lead.address,
    type: lead.type,
    status: lead.status,
    assigned_to: lead.assignedTo,
    last_contact: lead.lastContact,
    follow_up: lead.followUp,
    notes: lead.notes,
    crm_type: lead.crm_type
  };
  
  try {
    const { data, error } = await supabase
      .from("leads")
      .insert([dbLead])
      .select()
      .single();
    
    if (error) {
      console.error("Error creating lead:", error);
      throw error;
    }
    
    // Transform the database lead to match the Lead type
    const transformedLead: Lead = {
      id: data.id,
      name: data.name,
      phone: data.phone,
      email: data.email,
      address: data.address,
      type: data.type as "individual" | "business" | "referral",
      status: data.status as "answered" | "busy" | "not-interested" | "call-later" | "pending" | "converted",
      assignedTo: data.assigned_to,
      createdAt: data.created_at,
      lastContact: data.last_contact,
      followUp: data.follow_up,
      notes: data.notes,
      crm_type: data.crm_type
    };
    
    return transformedLead;
  } catch (error) {
    console.error("Failed to create lead:", error);
    return null;
  }
};

// Update an existing lead
export const updateLead = async (id: string, lead: Partial<Lead>): Promise<Lead | null> => {
  // Transform the Lead type to match the database schema
  const dbLead: any = {};
  if (lead.name) dbLead.name = lead.name;
  if (lead.phone) dbLead.phone = lead.phone;
  if (lead.email) dbLead.email = lead.email;
  if (lead.address) dbLead.address = lead.address;
  if (lead.type) dbLead.type = lead.type;
  if (lead.status) dbLead.status = lead.status;
  if (lead.assignedTo) dbLead.assigned_to = lead.assignedTo;
  if (lead.lastContact) dbLead.last_contact = lead.lastContact;
  if (lead.followUp) dbLead.follow_up = lead.followUp;
  if (lead.notes) dbLead.notes = lead.notes;
  if (lead.crm_type) dbLead.crm_type = lead.crm_type;
  
  try {
    const { data, error } = await supabase
      .from("leads")
      .update(dbLead)
      .eq("id", id)
      .select()
      .single();
    
    if (error) {
      console.error("Error updating lead:", error);
      throw error;
    }
    
    // Transform the database lead to match the Lead type
    const transformedLead: Lead = {
      id: data.id,
      name: data.name,
      phone: data.phone,
      email: data.email,
      address: data.address,
      type: data.type as "individual" | "business" | "referral",
      status: data.status as "answered" | "busy" | "not-interested" | "call-later" | "pending" | "converted",
      assignedTo: data.assigned_to,
      createdAt: data.created_at,
      lastContact: data.last_contact,
      followUp: data.follow_up,
      notes: data.notes,
      crm_type: data.crm_type
    };
    
    return transformedLead;
  } catch (error) {
    console.error("Failed to update lead:", error);
    return null;
  }
};

// Delete a lead
export const deleteLead = async (id: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from("leads")
      .delete()
      .eq("id", id);
    
    if (error) {
      console.error("Error deleting lead:", error);
      throw error;
    }
    
    return true;
  } catch (error) {
    console.error("Failed to delete lead:", error);
    return false;
  }
};
