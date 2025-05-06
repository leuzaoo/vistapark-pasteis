"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";

import LoadingSpinner from "./LoadingSpinner";

interface DelayedLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export default function DelayedLink({
  href,
  children,
  className,
}: DelayedLinkProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      router.push(href);
    }, 500);
  };

  return (
    <>
      <button onClick={handleClick} className={className} disabled={loading}>
        {children}
      </button>

      {loading && (
        <div className="bg-opacity-75 fixed inset-0 z-50 flex items-center justify-center bg-white">
          <LoadingSpinner />
        </div>
      )}
    </>
  );
}
