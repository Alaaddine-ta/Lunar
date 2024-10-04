export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      billboard: {
        Row: {
          createdAt: string
          id: string
          imageUrl: string
          label: string
          storeId: number
          updatedAt: string | null
        }
        Insert: {
          createdAt?: string
          id?: string
          imageUrl: string
          label: string
          storeId: number
          updatedAt?: string | null
        }
        Update: {
          createdAt?: string
          id?: string
          imageUrl?: string
          label?: string
          storeId?: number
          updatedAt?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "billboard_storeId_fkey"
            columns: ["storeId"]
            isOneToOne: false
            referencedRelation: "store"
            referencedColumns: ["id"]
          },
        ]
      }
      category: {
        Row: {
          billboardId: string | null
          createdAt: string
          id: number
          name: string
          storeId: number
          updatedAt: string | null
        }
        Insert: {
          billboardId?: string | null
          createdAt?: string
          id?: number
          name: string
          storeId: number
          updatedAt?: string | null
        }
        Update: {
          billboardId?: string | null
          createdAt?: string
          id?: number
          name?: string
          storeId?: number
          updatedAt?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "category_billboardId_fkey"
            columns: ["billboardId"]
            isOneToOne: false
            referencedRelation: "billboard"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "category_storeId_fkey"
            columns: ["storeId"]
            isOneToOne: false
            referencedRelation: "store"
            referencedColumns: ["id"]
          },
        ]
      }
      color: {
        Row: {
          createdAt: string
          id: string
          name: string
          storeId: number
          updatedAt: string | null
          value: string
        }
        Insert: {
          createdAt?: string
          id?: string
          name: string
          storeId: number
          updatedAt?: string | null
          value: string
        }
        Update: {
          createdAt?: string
          id?: string
          name?: string
          storeId?: number
          updatedAt?: string | null
          value?: string
        }
        Relationships: [
          {
            foreignKeyName: "color_storeId_fkey"
            columns: ["storeId"]
            isOneToOne: false
            referencedRelation: "store"
            referencedColumns: ["id"]
          },
        ]
      }
      image: {
        Row: {
          createdAt: string
          id: number
          productId: number
          updatedAt: string
          url: string
        }
        Insert: {
          createdAt?: string
          id?: number
          productId: number
          updatedAt: string
          url: string
        }
        Update: {
          createdAt?: string
          id?: number
          productId?: number
          updatedAt?: string
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "image_productId_fkey"
            columns: ["productId"]
            isOneToOne: false
            referencedRelation: "product"
            referencedColumns: ["id"]
          },
        ]
      }
      order: {
        Row: {
          address: string
          createdAt: string
          id: number
          isPaid: boolean
          phone: string
          storeId: number
          updatedAt: string
        }
        Insert: {
          address?: string
          createdAt?: string
          id?: number
          isPaid?: boolean
          phone?: string
          storeId: number
          updatedAt: string
        }
        Update: {
          address?: string
          createdAt?: string
          id?: number
          isPaid?: boolean
          phone?: string
          storeId?: number
          updatedAt?: string
        }
        Relationships: [
          {
            foreignKeyName: "order_storeId_fkey"
            columns: ["storeId"]
            isOneToOne: false
            referencedRelation: "store"
            referencedColumns: ["id"]
          },
        ]
      }
      orderItem: {
        Row: {
          id: string
          orderId: number
          productId: number
        }
        Insert: {
          id: string
          orderId: number
          productId: number
        }
        Update: {
          id?: string
          orderId?: number
          productId?: number
        }
        Relationships: [
          {
            foreignKeyName: "orderItem_orderId_fkey"
            columns: ["orderId"]
            isOneToOne: false
            referencedRelation: "order"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orderItem_productId_fkey"
            columns: ["productId"]
            isOneToOne: false
            referencedRelation: "product"
            referencedColumns: ["id"]
          },
        ]
      }
      product: {
        Row: {
          categoryId: number
          colorId: string
          createdAt: string
          id: number
          isArchived: boolean
          isFeatured: boolean
          name: string
          price: number
          sizeId: string
          storeId: number
          updatedAt: string | null
        }
        Insert: {
          categoryId: number
          colorId: string
          createdAt?: string
          id?: number
          isArchived?: boolean
          isFeatured?: boolean
          name: string
          price: number
          sizeId: string
          storeId: number
          updatedAt?: string | null
        }
        Update: {
          categoryId?: number
          colorId?: string
          createdAt?: string
          id?: number
          isArchived?: boolean
          isFeatured?: boolean
          name?: string
          price?: number
          sizeId?: string
          storeId?: number
          updatedAt?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "product_categoryId_fkey"
            columns: ["categoryId"]
            isOneToOne: false
            referencedRelation: "category"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "Product_colorId_fkey"
            columns: ["colorId"]
            isOneToOne: false
            referencedRelation: "color"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "Product_sizeId_fkey"
            columns: ["sizeId"]
            isOneToOne: false
            referencedRelation: "size"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "product_storeId_fkey"
            columns: ["storeId"]
            isOneToOne: false
            referencedRelation: "store"
            referencedColumns: ["id"]
          },
        ]
      }
      size: {
        Row: {
          createdAt: string
          id: string
          name: string
          storeId: number
          updatedAt: string | null
          value: string
        }
        Insert: {
          createdAt?: string
          id?: string
          name: string
          storeId: number
          updatedAt?: string | null
          value: string
        }
        Update: {
          createdAt?: string
          id?: string
          name?: string
          storeId?: number
          updatedAt?: string | null
          value?: string
        }
        Relationships: [
          {
            foreignKeyName: "size_storeId_fkey"
            columns: ["storeId"]
            isOneToOne: false
            referencedRelation: "store"
            referencedColumns: ["id"]
          },
        ]
      }
      store: {
        Row: {
          createdAt: string
          id: number
          name: string
          updatedAt: string | null
          userId: string
        }
        Insert: {
          createdAt?: string
          id?: number
          name: string
          updatedAt?: string | null
          userId: string
        }
        Update: {
          createdAt?: string
          id?: number
          name?: string
          updatedAt?: string | null
          userId?: string
        }
        Relationships: []
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

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
