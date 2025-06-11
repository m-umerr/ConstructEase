export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      projects: {
        Row: {
          id: string
          name: string
          description: string
          client: string
          location: string
          start_date: string
          end_date: string
          budget: number
          status: 'Planning' | 'In Progress' | 'On Hold' | 'Completed'
          completion: number
          manager_id: string
          created_at: string
          resources_cost: number
        }
        Insert: {
          id?: string
          name: string
          description: string
          client: string
          location: string
          start_date: string
          end_date: string
          budget: number
          status?: 'Planning' | 'In Progress' | 'On Hold' | 'Completed'
          completion?: number
          manager_id: string
          created_at?: string
          resources_cost?: number
        }
        Update: {
          id?: string
          name?: string
          description?: string
          client?: string
          location?: string
          start_date?: string
          end_date?: string
          budget?: number
          status?: 'Planning' | 'In Progress' | 'On Hold' | 'Completed'
          completion?: number
          manager_id?: string
          created_at?: string
          resources_cost?: number
        }
      }
      profiles: {
        Row: {
          id: string
          first_name: string
          last_name: string
          role: string
          avatar_url?: string
          email?: string
          phone?: string
          position?: string
          department?: string
          created_at: string
        }
        Insert: {
          id: string
          first_name: string
          last_name: string
          role?: string
          avatar_url?: string
          email?: string
          phone?: string
          position?: string
          department?: string
          created_at?: string
        }
        Update: {
          id?: string
          first_name?: string
          last_name?: string
          role?: string
          avatar_url?: string
          email?: string
          phone?: string
          position?: string
          department?: string
          created_at?: string
        }
      }
      resources: {
        Row: {
          id: string
          name: string
          type: 'Material' | 'Equipment' | 'Labor'
          quantity: number
          unit: string
          cost: number
          status: 'Available' | 'Low Stock' | 'Out of Stock'
          created_at: string
          returnable: boolean
          hour_rate?: number
          day_rate?: number
        }
        Insert: {
          id?: string
          name: string
          type: 'Material' | 'Equipment' | 'Labor'
          quantity: number
          unit: string
          cost: number
          status?: 'Available' | 'Low Stock' | 'Out of Stock'
          created_at?: string
          returnable?: boolean
          hour_rate?: number
          day_rate?: number
        }
        Update: {
          id?: string
          name?: string
          type?: 'Material' | 'Equipment' | 'Labor'
          quantity?: number
          unit?: string
          cost?: number
          status?: 'Available' | 'Low Stock' | 'Out of Stock'
          created_at?: string
          returnable?: boolean
          hour_rate?: number
          day_rate?: number
        }
      }
      resource_allocations: {
        Row: {
          id: string
          resource_id: string
          project_id: string
          quantity: number
          created_at: string
          days?: number
          hours?: number
          consumed?: boolean
        }
        Insert: {
          id?: string
          resource_id: string
          project_id: string
          quantity: number
          created_at?: string
          days?: number
          hours?: number
          consumed?: boolean
        }
        Update: {
          id?: string
          resource_id?: string
          project_id?: string
          quantity?: number
          created_at?: string
          days?: number
          hours?: number
          consumed?: boolean
        }
      }
      team_members: {
        Row: {
          id: string
          project_id: string
          user_id: string
          role: string
          created_at: string
        }
        Insert: {
          id?: string
          project_id: string
          user_id: string
          role: string
          created_at?: string
        }
        Update: {
          id?: string
          project_id?: string
          user_id?: string
          role?: string
          created_at?: string
        }
      }
      task_resources: {
        Row: {
          id: string
          task_id: string
          resource_id: string
          hours?: number
          days?: number
          quantity?: number
          created_at: string
        }
        Insert: {
          id?: string
          task_id: string
          resource_id: string
          hours?: number
          days?: number
          quantity?: number
          created_at?: string
        }
        Update: {
          id?: string
          task_id?: string
          resource_id?: string
          hours?: number
          days?: number
          quantity?: number
          created_at?: string
        }
      }
      financial_transactions: {
        Row: {
          id: string
          project_id: string | null
          type: 'income' | 'expense'
          amount: number
          description: string | null
          category: string | null
          date: string
          created_at: string | null
          created_by: string | null
        }
        Insert: {
          id?: string
          project_id?: string | null
          type: 'income' | 'expense'
          amount: number
          description?: string | null
          category?: string | null
          date?: string
          created_at?: string | null
          created_by?: string | null
        }
        Update: {
          id?: string
          project_id?: string | null
          type?: 'income' | 'expense'
          amount?: number
          description?: string | null
          category?: string | null
          date?: string
          created_at?: string | null
          created_by?: string | null
        }
      }
      invoices: {
        Row: {
          id: string
          number: string
          project_id: string | null
          client: string
          amount: number
          issue_date: string
          due_date: string
          status: 'draft' | 'sent' | 'paid' | 'overdue'
          created_at: string | null
          created_by: string | null
          notes: string | null
        }
        Insert: {
          id?: string
          number: string
          project_id?: string | null
          client: string
          amount: number
          issue_date: string
          due_date: string
          status: 'draft' | 'sent' | 'paid' | 'overdue'
          created_at?: string | null
          created_by?: string | null
          notes?: string | null
        }
        Update: {
          id?: string
          number?: string
          project_id?: string | null
          client?: string
          amount?: number
          issue_date?: string
          due_date?: string
          status?: 'draft' | 'sent' | 'paid' | 'overdue'
          created_at?: string | null
          created_by?: string | null
          notes?: string | null
        }
      }
    }
  }
}
