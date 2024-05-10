"use client";
import { RefreshCcw } from "lucide-react";
import { Button } from "../ui/button";
import { LeadConnectorAPI } from "@/apis/LeadConnector/LeadConnectorAPI";
import { useToast } from "../ui/use-toast";

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
  // TODO: Handle error more .. elegantly...
  const { toast } = useToast();
  const handleSubmit = async () => {
    const object = await LeadConnectorAPI.refreshToken(
      client_id,
      client_secret,
      GRANT_TYPE,
      refresh_token,
      user_type,
      redirect_uri,
    );
    console.log(object);
    toast({
      title: "API Key regenerated successfully!",
      variant: "success",
    });
  };

  return (
    <Button type="button" variant={"outline"} onClick={handleSubmit}>
      {" "}
      <RefreshCcw size={12} />{" "}
    </Button>
  );
}
