"use client"

import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type User = {
  id: number
  full_name: string
  surname: string
  email: string
  role: string
  createdAt: string
}



export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "full_name",
    header: "Nombres",
  },
  {
    accessorKey: "surname",
    header: "Apellidos",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "role",
    header: "Rol",
  },
  {
    accessorKey: "createdAt",
    header: "Fecha",
  },
]
