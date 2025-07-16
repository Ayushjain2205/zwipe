import React from "react";

export default function CircleLoader({ size = 48 }: { size?: number }) {
  return (
    <div className="flex items-center justify-center h-full w-full">
      <div
        className="animate-spin rounded-full border-4 border-t-blue-400 border-b-blue-400 border-l-transparent border-r-transparent"
        style={{ width: size, height: size }}
        role="status"
        aria-label="Loading"
      />
    </div>
  );
}
