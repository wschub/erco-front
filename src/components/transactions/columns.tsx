"use client"

import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Transaction = {
  id: number
  offerId: number
  buyerId: number
  sellerId: number
  totalPrice: number
  createdAt: string
  //status: "pending" | "processing" | "success" | "failed"
  //email: string
}



export const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "offerId",
    header: "Oferta",
  },
  {
    accessorKey: "buyerId",
    header: "Comprador",
  },
  {
    accessorKey: "sellerId",
    header: "Vendedor",
  },
  {
    accessorKey: "totalPrice",
    header: "Total Compra",
  },
  {
    accessorKey: "createdAt",
    header: "Fecha",
  },
]
