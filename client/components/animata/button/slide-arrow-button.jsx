"use client";
import React, { useState } from "react";
import { ArrowRight } from "lucide-react";
import { CreateCampaign } from "@/components/CreateCampaign";

export default function SlideArrowButton({
  text = "Get Started",
  primaryColor = "#6f3cff",
  className = "",
  ...props
}) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const openDialog = () => {
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  return (
    <>
      <button
        className={`group relative rounded-full border border-white bg-white p-2 text-xl font-semibold ${className}`}
        {...props}
        onClick={openDialog}
      >
        <div
          className="absolute bg-orange-600 left-0 top-0 flex h-full w-11 items-center justify-end rounded-full transition-all duration-200 ease-in-out group-hover:w-full"
          // style={{ backgroundColor: primaryColor }}
        >
          <span className="mr-3 text-white transition-all duration-200 b ease-in-out">
            <ArrowRight size={20} />
          </span>
        </div>
        <span className="relative left-4 whitespace-nowrap px-8 font-semibold text-black transition-all duration-200 ease-in-out group-hover:-left-3 group-hover:text-white">
          {text}
        </span>
      </button>
      {/* Pass state to CreateCampaign */}
      <CreateCampaign isDialogOpen={isDialogOpen} setIsDialogOpen={setIsDialogOpen} />
    </>
  );
}
