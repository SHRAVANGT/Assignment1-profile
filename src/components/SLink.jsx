"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export const SLink = (props) => {
  const router = useRouter();

  // Ensure href is valid, default to a safe value if undefined
  const strHref =
    props.href &&
    (typeof props.href === "string" || typeof props.href === "object")
      ? props.href
      : "/"; // Default fallback URL

  const conditionalPrefetch = () => {
    if (strHref) {
      void router.prefetch(
        typeof strHref === "string" ? strHref : strHref.href
      );
    }
  };

  return (
    <Link
      {...props}
      href={strHref} // Ensure href is always passed as a string or object
      prefetch={false}
      onMouseEnter={(e) => {
        conditionalPrefetch();
        return props.onMouseEnter?.(e);
      }}
      onPointerEnter={(e) => {
        conditionalPrefetch();
        return props.onPointerEnter?.(e);
      }}
      onTouchStart={(e) => {
        conditionalPrefetch();
        return props.onTouchStart?.(e);
      }}
      onFocus={(e) => {
        conditionalPrefetch();
        return props.onFocus?.(e);
      }}
    />
  );
};
