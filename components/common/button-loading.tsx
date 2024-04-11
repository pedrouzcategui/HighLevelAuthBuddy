import { type ComponentProps } from "react";
import { Button } from "../ui/button";
import { LoaderCircleIcon } from "lucide-react";

type ButtonLoadingProps = {
  isLoading: boolean;
  children: React.ReactNode;
} & ComponentProps<typeof Button>;

export function ButtonLoading({
  isLoading,
  children,
  ...buttonProps
}: ButtonLoadingProps) {
  return (
    <Button {...buttonProps} disabled={isLoading || buttonProps.disabled}>
      {isLoading ? (
        <LoaderCircleIcon className="h-6 w-6 animate-spin" />
      ) : (
        children
      )}
    </Button>
  );
}
