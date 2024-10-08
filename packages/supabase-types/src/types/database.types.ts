export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      expenses: {
        Row: {
          amount: number
          created_at: string | null
          created_by: string
          date: string
          description: string
          group_id: string
          id: string
          paid_for_by: string
          split_between: Json
        }
        Insert: {
          amount: number
          created_at?: string | null
          created_by: string
          date: string
          description: string
          group_id: string
          id?: string
          paid_for_by: string
          split_between?: Json
        }
        Update: {
          amount?: number
          created_at?: string | null
          created_by?: string
          date?: string
          description?: string
          group_id?: string
          id?: string
          paid_for_by?: string
          split_between?: Json
        }
        Relationships: [
          {
            foreignKeyName: "expenses_created_by_fkey"
            columns: ["created_by"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "expenses_group_id_fkey"
            columns: ["group_id"]
            referencedRelation: "groups"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "expenses_paid_for_by_fkey"
            columns: ["paid_for_by"]
            referencedRelation: "group_members"
            referencedColumns: ["id"]
          }
        ]
      }
      group_members: {
        Row: {
          created_at: string | null
          group_id: string
          id: string
          name: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          group_id: string
          id?: string
          name?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          group_id?: string
          id?: string
          name?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "group_members_group_id_fkey"
            columns: ["group_id"]
            referencedRelation: "groups"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "group_members_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      groups: {
        Row: {
          archived_at: string | null
          created_at: string | null
          currency: Database["public"]["Enums"]["currency"]
          id: string
          name: string
          owner_id: string
        }
        Insert: {
          archived_at?: string | null
          created_at?: string | null
          currency?: Database["public"]["Enums"]["currency"]
          id?: string
          name: string
          owner_id: string
        }
        Update: {
          archived_at?: string | null
          created_at?: string | null
          currency?: Database["public"]["Enums"]["currency"]
          id?: string
          name?: string
          owner_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "groups_owner_id_fkey"
            columns: ["owner_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      payments: {
        Row: {
          amount: number
          created_at: string | null
          created_by: string
          date: string
          description: string | null
          group_id: string
          id: string
          paid_from: string
          paid_to: string
        }
        Insert: {
          amount: number
          created_at?: string | null
          created_by: string
          date: string
          description?: string | null
          group_id: string
          id?: string
          paid_from: string
          paid_to: string
        }
        Update: {
          amount?: number
          created_at?: string | null
          created_by?: string
          date?: string
          description?: string | null
          group_id?: string
          id?: string
          paid_from?: string
          paid_to?: string
        }
        Relationships: [
          {
            foreignKeyName: "payments_created_by_fkey"
            columns: ["created_by"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payments_group_id_fkey"
            columns: ["group_id"]
            referencedRelation: "groups"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payments_paid_from_fkey"
            columns: ["paid_from"]
            referencedRelation: "group_members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payments_paid_to_fkey"
            columns: ["paid_to"]
            referencedRelation: "group_members"
            referencedColumns: ["id"]
          }
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          id: string
          updated_at: string | null
          user_id: string
          username: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          id: string
          updated_at?: string | null
          user_id: string
          username: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          id?: string
          updated_at?: string | null
          user_id?: string
          username?: string
        }
        Relationships: [
          {
            foreignKeyName: "profiles_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
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
      currency: "USD" | "EUR" | "GBP"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  storage: {
    Tables: {
      buckets: {
        Row: {
          allowed_mime_types: string[] | null
          avif_autodetection: boolean | null
          created_at: string | null
          file_size_limit: number | null
          id: string
          name: string
          owner: string | null
          public: boolean | null
          updated_at: string | null
        }
        Insert: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id: string
          name: string
          owner?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Update: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id?: string
          name?: string
          owner?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "buckets_owner_fkey"
            columns: ["owner"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      migrations: {
        Row: {
          executed_at: string | null
          hash: string
          id: number
          name: string
        }
        Insert: {
          executed_at?: string | null
          hash: string
          id: number
          name: string
        }
        Update: {
          executed_at?: string | null
          hash?: string
          id?: number
          name?: string
        }
        Relationships: []
      }
      objects: {
        Row: {
          bucket_id: string | null
          created_at: string | null
          id: string
          last_accessed_at: string | null
          metadata: Json | null
          name: string | null
          owner: string | null
          path_tokens: string[] | null
          updated_at: string | null
          version: string | null
        }
        Insert: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          version?: string | null
        }
        Update: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          version?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "objects_bucketId_fkey"
            columns: ["bucket_id"]
            referencedRelation: "buckets"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      can_insert_object: {
        Args: {
          bucketid: string
          name: string
          owner: string
          metadata: Json
        }
        Returns: undefined
      }
      extension: {
        Args: {
          name: string
        }
        Returns: string
      }
      filename: {
        Args: {
          name: string
        }
        Returns: string
      }
      foldername: {
        Args: {
          name: string
        }
        Returns: unknown
      }
      get_size_by_bucket: {
        Args: Record<PropertyKey, never>
        Returns: {
          size: number
          bucket_id: string
        }[]
      }
      search: {
        Args: {
          prefix: string
          bucketname: string
          limits?: number
          levels?: number
          offsets?: number
          search?: string
          sortcolumn?: string
          sortorder?: string
        }
        Returns: {
          name: string
          id: string
          updated_at: string
          created_at: string
          last_accessed_at: string
          metadata: Json
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

