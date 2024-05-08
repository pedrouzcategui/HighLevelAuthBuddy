import React, { FormEvent } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Company, Location } from "@prisma/client";
import CopyButton from "./CopyButton";
import { LeadConnectorAPI } from "@/apis/LeadConnector/LeadConnectorAPI";
import RegenerationButton from "./RegenerationButton";

interface CompaniesTableProps {
  resources: Company[] | Location[];
  resources_type: "Company" | "Location";
}

const {
  AUTH_BUDDY_CLIENT_ID,
  AUTH_BUDDY_CLIENT_SECRET,
  AUTH_BUDDY_REDIRECT_URI,
} = process.env;

export default function KeysTable({
  resources,
  resources_type,
}: CompaniesTableProps) {
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
              <RegenerationButton
                client_id={AUTH_BUDDY_CLIENT_ID}
                client_secret={AUTH_BUDDY_CLIENT_SECRET}
                refresh_token={resource.refresh_token}
                redirect_uri={AUTH_BUDDY_REDIRECT_URI}
                user_type={resources_type}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
