import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Company, Location } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { RefreshCcw } from "lucide-react";
import CopyButton from "./CopyButton";

interface CompaniesTableProps {
  resources: Company[] | Location[];
}

export default function KeysTable({ resources }: CompaniesTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Generation Date</TableHead>
          <TableHead>Expiration Date</TableHead>
          <TableHead>Access Token</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {resources.map((resource) => (
          <TableRow key={resource.id}>
            <TableCell className="font-medium">{resource.name}</TableCell>
            <TableCell>{resource.generationDate.getDate()}</TableCell>
            <TableCell>{resource.expires_in}</TableCell>
            <TableCell>
              <span>{resource.access_token.slice(0, 30)}********</span>
              <CopyButton valueToCopy={resource.access_token} />
            </TableCell>
            <TableCell className="text-right">
              <form>
                <Button variant={"outline"}>
                  {" "}
                  <RefreshCcw size={12} />{" "}
                </Button>
              </form>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
