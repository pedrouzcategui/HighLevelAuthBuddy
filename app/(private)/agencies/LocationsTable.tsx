'use client'
import React from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Prisma, Location } from '@prisma/client'

interface LocationsTableProps {
    locations: Location[]
}

export default function LocationsTable({ locations }: LocationsTableProps) {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Location Name</TableHead>
                    <TableHead>Generation Date</TableHead>
                    <TableHead>Expiration Date</TableHead>
                    <TableHead>Access Token</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {locations.map((location) => (
                    <TableRow key={location.id}>
                        <TableCell className="font-medium">{location.name}</TableCell>
                        <TableCell>{location.issueDate.toDateString()}</TableCell>
                        <TableCell>IDK</TableCell>
                        <TableCell>{location.access_token.slice(0, 50)}...</TableCell>
                        <TableCell className="text-right">Regenerate</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}
