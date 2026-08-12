"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("");
}

/**
 * Square team photo that gracefully falls back to a solid initials avatar
 * when the image is missing or fails to load.
 */
export function TeamAvatar({
  name,
  image,
  accent = false,
  className,
}: {
  name: string;
  image?: string;
  accent?: boolean;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);
  const showImage = image && !failed;

  return (
    <span
      className={cn(
        "relative grid size-16 shrink-0 place-items-center overflow-hidden rounded-2xl text-lg font-bold text-white",
        accent ? "bg-accent-500" : "bg-primary-600",
        className
      )}
    >
      {showImage ? (
        <Image
          src={image}
          alt={name}
          fill
          sizes="64px"
          className="object-cover"
          onError={() => setFailed(true)}
        />
      ) : (
        initials(name)
      )}
    </span>
  );
}
