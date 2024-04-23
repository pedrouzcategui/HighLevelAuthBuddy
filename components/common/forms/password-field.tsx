import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import React, { useState } from "react";
import { type ControllerRenderProps, type FieldError } from "react-hook-form";

export type InputPasswordProps = {
  error?: FieldError;
} & ControllerRenderProps;

const InputPassword = React.forwardRef<HTMLInputElement, InputPasswordProps>(
  ({ error, ...fieldProps }, _) => {
    const [isShowingPassword, setIsShowingPassword] = useState(false);

    function togglePasswordVisibility() {
      setIsShowingPassword((prev) => !prev);
    }

    return (
      <div className="relative">
        <Input
          placeholder="******"
          type={isShowingPassword ? "text" : "password"}
          className={cn(error && "border-destructive")}
          {...fieldProps}
        />

        <Button
          asChild
          onClick={togglePasswordVisibility}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
          variant="ghost"
          size="icon"
        >
          {isShowingPassword ? (
            <EyeOffIcon className="h-5 w-5 stroke-muted-foreground" />
          ) : (
            <EyeIcon className="h-5 w-5 stroke-muted-foreground" />
          )}
        </Button>
      </div>
    );
  },
);

InputPassword.displayName = "InputPassword";

export { InputPassword };
