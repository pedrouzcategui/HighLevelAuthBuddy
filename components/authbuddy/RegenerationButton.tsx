"use client";
import { RefreshCcw } from "lucide-react";
import { Button } from "../ui/button";
import { FormEvent } from "react";
import { LeadConnectorAPI } from "@/apis/LeadConnector/LeadConnectorAPI";

interface RegenerationButtonProps {
  client_id: string;
  client_secret: string;
  refresh_token: string;
  user_type: "Company" | "Location";
  redirect_uri: string;
}

const GRANT_TYPE = "refresh_token";

export default function RegenerationButton({
  client_id,
  client_secret,
  refresh_token,
  user_type,
  redirect_uri,
}: RegenerationButtonProps) {
  const handleSubmit = async (e: FormEvent) => {
    const object = await LeadConnectorAPI.refreshToken(
      client_id,
      client_secret,
      GRANT_TYPE,
      refresh_token,
      user_type,
      redirect_uri,
    );
    console.log(object);
  };

  return (
    <Button type="button" variant={"outline"} onClick={handleSubmit}>
      {" "}
      <RefreshCcw size={12} />{" "}
    </Button>
  );
}
