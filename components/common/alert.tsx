import { type LucideIcon } from "lucide-react";

export type AlertProps = {
  title: string;
  description?: string;
  Icon?: LucideIcon;
};

// TODO: this can be a reusable and generic component like `Bootstrap Alert`
// should be nice to create variants for state colors like success, warning, and so on
// for now it has been only used with error state, so variants were not implemented
export function Alert({ title, description, Icon }: AlertProps) {
  return (
    <section className="flex gap-5 items-center bg-destructive-light border-2 border-destructive rounded-md px-5 py-3">
      {Icon && <Icon className="h-10 w-10 stroke-destructive" />}

      <div>
        <header className="text-destructive font-medium">{title}</header>
        {description && <p className="text-sm">{description}</p>}
      </div>
    </section>
  );
}
