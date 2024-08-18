"use client";

import { useRouter } from "next/navigation";
import { Loader2Icon } from "lucide-react";
import { Button } from "./button";
import { useTransition } from "react";

export const AddToCartButton = ({ productId }) => {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  return (
    <Button
      size="lg"
      type="submit"
      className="w-full rounded-full text-lg"
      onClick={() => {
        startTransition(() =>
          router.push(`/store/cart-overlay?add=${productId}`)
        );
      }}
      aria-disabled={pending}
    >
      {pending ? (
        <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        "Add to cart"
      )}
    </Button>
  );
};
