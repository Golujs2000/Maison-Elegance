import React from "react";

export default function Loader({ message = "Loading handcrafted pieces..." }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 rounded-full border-2 border-gold-200"></div>
        <div className="absolute inset-0 rounded-full border-2 border-gold-dark border-t-transparent animate-spin"></div>
        <div className="absolute inset-3 rounded-full border border-sand animate-pulse"></div>
      </div>
      <p className="mt-5 font-serif italic text-charcoal-muted tracking-wider text-sm">
        {message}
      </p>
    </div>
  );
}
