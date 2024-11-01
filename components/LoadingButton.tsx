"use client";
import { Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface LoadingButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  className?: string;
  href?: string;
}

export default function LoadingButton({
  loading,
  children,
  className,
  href,
  ...props
}: LoadingButtonProps) {
  const [pending, setPending] = useState(false);
  const router = useRouter();

  function handleClick() {
    if (href) {
      setPending(true);
      router.push(href);
    }
  }

  return (
    <button
      {...props}
      disabled={loading || props.disabled}
      onClick={handleClick}
    >
      <span
        className={cn(
          "flex items-center justify-center gap-1 overflow-hidden",
          className
        )}
      >
        {children}
        {(loading || pending) && <Loader2 size={16} className="animate-spin" />}
      </span>
    </button>
  );
}
