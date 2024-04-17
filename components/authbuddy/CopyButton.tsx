"use client";
import { Copy } from "lucide-react";
import { Button } from "../ui/button";
import { useToast } from "@/components/ui/use-toast";

interface CopyButtonProps {
  valueToCopy: string;
}

export default function CopyButton({ valueToCopy }: CopyButtonProps) {
  const { toast } = useToast();

  function copyToCLipboard() {
    window.navigator.clipboard.writeText(valueToCopy);
    toast({
      title: "API Key Copied to the clipboard 🫡",
      variant: "success",
    });
  }

  return (
    <Button
      onClick={copyToCLipboard}
      variant={"ghost"}
      className="ml-2 hover:shadow-md transition-all"
    >
      <Copy size={12} />
    </Button>
  );
}
