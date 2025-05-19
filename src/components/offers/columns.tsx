"use client"

import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Offer = {
  id: number
  qtykwh: string
  priceKwh: string
  startTime: string
  endTime: string
  sellerId: string
  status: "active" | "sold" | "expired" 

}


export const columns: ColumnDef<Offer>[] = [
  {
    accessorKey: "qtykwh",
    header: "Cant. Kwh",
  },
  {
    accessorKey: "priceKwh",
    header: "Precio Kwh",
  },
  {
    accessorKey: "startTime",
    header: "F. Inicio",
  },
  {
    accessorKey: "endTime",
    header: "F. Fin",
  },
  {
    accessorKey: "sellerId",
    header: "Vendedor",
  },
   {
    accessorKey: "status",
    header: "Estado",
  },
]
