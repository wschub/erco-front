"use client"

import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Transaction = {
  id: number
  offerId: number
  buyerId: string
  sellerId: number
  qtykwh: number
  priceKwh: number
  totalPrice: number
  createdAt: string
  buyer: {
    full_name: string
    surname: string
  }
  seller: {
    full_name: string
    surname: string
  }
}



export const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "offerId",
    header: "Oferta",
  },
  {
    header: "Comprador",
    accessorKey: "buyer",
    cell: ({ row }) => {
    const buyer = row.original.buyer;
    return `${buyer?.full_name ?? ''} ${buyer?.surname ?? ''}`;
  },
   
  },
  {
    header: "Vendedor",
    accessorKey: "seller",
    cell: ({ row }) => {
    const seller = row.original.seller;
    return `${seller?.full_name ?? ''} ${seller?.surname ?? ''}`;
  },
    
  },
  {
    accessorKey: "qtykwh",
    header: "Cant. Kwh",
  },
  {
    header: "Precio Kwh",
    accessorKey: "priceKwh",
     cell: ({ row }) => {
    const value = row.original.priceKwh;
    return `$ ${value.toLocaleString("es-CO")}`;
  },
    
  },
  {
    header: "Total",
    accessorKey: "totalPrice",
    cell: ({ row }) => {
    const value = row.original.totalPrice;
    return `$ ${value.toLocaleString("es-CO")}`;
  },

  },
  {
    accessorKey: "createdAt",
    header: "Fecha",
  },
]
