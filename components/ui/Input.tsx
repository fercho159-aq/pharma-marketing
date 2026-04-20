import { cn } from "@/lib/utils";
import type { InputHTMLAttributes, TextareaHTMLAttributes } from "react";
import { forwardRef } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  helperText?: string;
  error?: string;
};

const baseField =
  "w-full bg-transparent text-[color:var(--color-ohm-ink)] border-0 border-b border-[color:var(--color-ohm-line)] pb-2 pt-3 text-base placeholder:text-[color:var(--color-ohm-ink-soft)]/50 focus:outline-none focus:border-[color:var(--color-ohm-wine)] transition-colors duration-200";

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, helperText, error, id, className, ...props },
  ref,
) {
  const fieldId = id || props.name;
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label
          htmlFor={fieldId}
          className="text-[10px] uppercase tracking-[0.2em] font-medium text-[color:var(--color-ohm-wine)]"
        >
          {label}
        </label>
      )}
      <input
        ref={ref}
        id={fieldId}
        className={cn(baseField, error && "border-[color:var(--color-ohm-wine)]", className)}
        aria-invalid={error ? "true" : undefined}
        aria-describedby={error ? `${fieldId}-error` : helperText ? `${fieldId}-help` : undefined}
        {...props}
      />
      {error ? (
        <p id={`${fieldId}-error`} className="text-xs text-[color:var(--color-ohm-wine)] mt-1">
          {error}
        </p>
      ) : helperText ? (
        <p id={`${fieldId}-help`} className="text-xs text-[color:var(--color-ohm-ink-soft)] mt-1">
          {helperText}
        </p>
      ) : null}
    </div>
  );
});

type TextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
  helperText?: string;
  error?: string;
};

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(function TextArea(
  { label, helperText, error, id, className, ...props },
  ref,
) {
  const fieldId = id || props.name;
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label
          htmlFor={fieldId}
          className="text-[10px] uppercase tracking-[0.2em] font-medium text-[color:var(--color-ohm-wine)]"
        >
          {label}
        </label>
      )}
      <textarea
        ref={ref}
        id={fieldId}
        rows={4}
        className={cn(baseField, "resize-y", error && "border-[color:var(--color-ohm-wine)]", className)}
        aria-invalid={error ? "true" : undefined}
        {...props}
      />
      {helperText && !error && (
        <p className="text-xs text-[color:var(--color-ohm-ink-soft)] mt-1">{helperText}</p>
      )}
    </div>
  );
});
