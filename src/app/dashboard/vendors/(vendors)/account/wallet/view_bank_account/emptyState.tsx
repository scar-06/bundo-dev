"use client";

import React from "react";

interface IEmptyStateProps {
  icon?: React.ReactNode;
  description?: string;
}

export function EmptyState({ icon, description }: IEmptyStateProps) {
  return (
    <div className="my-16 flex w-full flex-col items-center justify-center gap-5">
      <div className="flex h-[71px] w-[71px] items-center justify-center rounded-full bg-[#FAF8F3]">
        {icon}
      </div>
      <span className="w-full max-w-sm text-center text-sm">{description}</span>
    </div>
  );
}
