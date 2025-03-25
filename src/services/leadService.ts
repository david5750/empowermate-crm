
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
    
    return data || [];
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
    
    return data;
  } catch (error) {
    console.error("Failed to fetch lead:", error);
    return null;
  }
};

// Create a new lead
export const createLead = async (lead: Omit<Lead, "id" | "createdAt">): Promise<Lead | null> => {
  try {
    const { data, error } = await supabase
      .from("leads")
      .insert([lead])
      .select()
      .single();
    
    if (error) {
      console.error("Error creating lead:", error);
      throw error;
    }
    
    return data;
  } catch (error) {
    console.error("Failed to create lead:", error);
    return null;
  }
};

// Update an existing lead
export const updateLead = async (id: string, lead: Partial<Lead>): Promise<Lead | null> => {
  try {
    const { data, error } = await supabase
      .from("leads")
      .update(lead)
      .eq("id", id)
      .select()
      .single();
    
    if (error) {
      console.error("Error updating lead:", error);
      throw error;
    }
    
    return data;
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
