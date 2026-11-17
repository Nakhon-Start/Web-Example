"use client";

import React from "react";

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  description?: string;
}

export default function Checkbox({
  label,
  description,
  className = "",
  id,
  ...props
}: CheckboxProps) {
  const checkboxId = id || label.toLowerCase().replace(/\s+/g, "-");

  return (
    <label
      htmlFor={checkboxId}
      className={`inline-flex items-start gap-3 cursor-pointer select-none group ${className}`}
    >
      <div className="flex items-center h-5 mt-0.5">
        <input
          id={checkboxId}
          type="checkbox"
          className="w-4 h-4 rounded border-slate-300 text-blue-600 accent-blue-600 focus:ring-2 focus:ring-blue-500/30 cursor-pointer"
          {...props}
        />
      </div>
      <div className="text-sm">
        <span className="font-medium text-slate-700 group-hover:text-slate-900 transition-colors">
          {label}
        </span>
        {description && (
          <p className="text-xs text-slate-500 mt-0.5">{description}</p>
        )}
      </div>
    </label>
  );
}