import { type LucideIcon } from "lucide-react";

export type ErrorContainerProps = {
  title: string;
  description?: string;
  Icon?: LucideIcon;
};

// <ShieldOffIcon size={48} className="stroke-red-600" />
export function ErrorContainer({
  title,
  description,
  Icon,
}: ErrorContainerProps) {
  return (
    <section className="flex gap-5 items-center bg-red-200 border-2 border-red-600 rounded-md px-5 py-3">
      {Icon && <Icon className="h-10 w-10 stroke-red-600" />}

      <div>
        <header className="text-red-600 font-medium">{title}</header>
        {description && (
          <p className="text-sm text-secondary-foreground">{description}</p>
        )}
      </div>
    </section>
  );
}
