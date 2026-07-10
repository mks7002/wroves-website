import React from "react";
import { cn } from "@/lib/utils/cn";

interface FormFieldProps {
  label: string;
  error?: string;
  required?: boolean;
  className?: string;
  children: React.ReactElement;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  error,
  required,
  className,
  children,
}) => {
  // Clone element to inject styles
  const inputClass = cn(
    "w-full px-4 py-3 bg-zinc-900 border text-zinc-100 rounded-md focus:outline-none focus:ring-1 focus:ring-brand-red transition-all duration-150 placeholder:text-zinc-500",
    error ? "border-red-500 focus:ring-red-500" : "border-zinc-800 focus:border-zinc-700"
  );

  const child = children as React.ReactElement<any>;
  const clonedChild = React.cloneElement(child, {
    className: cn(inputClass, child.props.className),
    id: child.props.id || label.toLowerCase().replace(/\s+/g, "-"),
  });

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label
        htmlFor={clonedChild.props.id}
        className="text-sm font-semibold text-zinc-300 flex items-center justify-between"
      >
        <span>
          {label}
          {required && <span className="text-brand-red ml-1">*</span>}
        </span>
      </label>
      
      {clonedChild}
      
      {error && (
        <span className="text-sm font-medium text-red-500 animate-fadeIn">
          {error}
        </span>
      )}
    </div>
  );
};
