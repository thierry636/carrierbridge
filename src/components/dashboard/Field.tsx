"use client";

import { cn } from "@/lib/utils";
import {
  forwardRef,
  type InputHTMLAttributes,
  type SelectHTMLAttributes,
  type ReactNode,
} from "react";

const inputBase =
  "block w-full rounded-lg border border-ink-200 bg-white px-3.5 py-2.5 text-sm text-ink-900 placeholder:text-ink-400 shadow-sm transition-colors focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100 disabled:bg-ink-50 disabled:text-ink-500";

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input ref={ref} className={cn(inputBase, className)} {...props} />
  )
);
Input.displayName = "Input";

export const Select = forwardRef<
  HTMLSelectElement,
  SelectHTMLAttributes<HTMLSelectElement>
>(({ className, children, ...props }, ref) => (
  <div className="relative">
    <select
      ref={ref}
      className={cn(
        inputBase,
        "appearance-none pr-9 cursor-pointer",
        className
      )}
      {...props}
    >
      {children}
    </select>
    <svg
      aria-hidden
      className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-500"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
    </svg>
  </div>
));
Select.displayName = "Select";

export function FieldLabel({
  label,
  hint,
  htmlFor,
  suggestion,
  children,
}: {
  label: string;
  hint?: string;
  htmlFor?: string;
  suggestion?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between gap-2">
        <label htmlFor={htmlFor} className="text-sm font-medium text-ink-800">
          {label}
        </label>
        {suggestion}
      </div>
      {children}
      {hint && <p className="mt-1.5 text-xs text-ink-500">{hint}</p>}
    </div>
  );
}

export function Checkbox({
  label,
  description,
  icon,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  description?: string;
  icon?: ReactNode;
}) {
  return (
    <label className="flex cursor-pointer items-start gap-3 rounded-lg border border-ink-200 bg-white p-3.5 transition-colors hover:border-ink-300 has-[:checked]:border-brand-400 has-[:checked]:bg-brand-50/40">
      <input
        type="checkbox"
        className="mt-0.5 h-4 w-4 cursor-pointer rounded border-ink-300 text-brand-600 focus:ring-brand-500"
        {...props}
      />
      <span className="flex-1">
        <span className="flex items-center gap-2 text-sm font-medium text-ink-900">
          {icon}
          {label}
        </span>
        {description && (
          <span className="mt-0.5 block text-xs text-ink-500">{description}</span>
        )}
      </span>
    </label>
  );
}
