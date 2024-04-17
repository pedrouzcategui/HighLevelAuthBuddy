'use client'
import React from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Company } from '@prisma/client'
import { Button } from '@/components/ui/button'
import { RefreshCcw, Copy } from 'lucide-react'
interface CompaniesTableProps {
    companies: Company[]
}

export default function CompaniesTable({ companies }: CompaniesTableProps) {
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
                {companies.map((company) => (
                    <TableRow key={company.id}>
                        <TableCell className="font-medium">{company.name}</TableCell>
                        {/* <TableCell>{location.issueDate.toDateString()}</TableCell> */}
                        <TableCell>IDK</TableCell>
                        <TableCell>IDK</TableCell>
                        <TableCell>
                            <span>
                                {company.access_token.slice(0, 30)}********
                            </span>
                            <Button variant={'ghost'}>
                                <Copy size={12} />
                            </Button>
                        </TableCell>
                        <TableCell className="text-right">
                            <form>
                                <Button variant={'outline'}> <RefreshCcw size={12} /> </Button>
                            </form>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}
