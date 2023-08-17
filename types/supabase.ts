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
      channels: {
        Row: {
          created_at: string
          id: number
          name: string | null
          position: number | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          name?: string | null
          position?: number | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          name?: string | null
          position?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "channels_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      messages: {
        Row: {
          channel_id: number | null
          created_at: string
          id: number
          text: string | null
        }
        Insert: {
          channel_id?: number | null
          created_at?: string
          id?: number
          text?: string | null
        }
        Update: {
          channel_id?: number | null
          created_at?: string
          id?: number
          text?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "messages_channel_id_fkey"
            columns: ["channel_id"]
            referencedRelation: "channels"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
