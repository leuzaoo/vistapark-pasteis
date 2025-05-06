"use client";
import { LoaderPinwheelIcon } from "lucide-react";
import React from "react";

export default function LoadingSpinner() {
  return (
    <LoaderPinwheelIcon size={40} className="text-primary-red animate-spin" />
  );
}
