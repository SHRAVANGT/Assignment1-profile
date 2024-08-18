"use client";
import { startTransition, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { addToCartAction } from "./../../../../actions/addToCartAction";

export const CartModalAddSideEffect = ({ productId }) => {
  const router = useRouter();
  const pendingRef = useRef(false);

  useEffect(() => {
    if (pendingRef.current || !productId) {
      return;
    }
    pendingRef.current = true;
    startTransition(async () => {
      const formData = new FormData();
      formData.append("productId", productId);
      await addToCartAction(formData);
      pendingRef.current = false;
      if (document.location.pathname === "/store/cart-overlay") {
        router.replace("/store/cart-overlay", { scroll: false });
        router.refresh();
      }
    });
  }, [productId, router]);

  return null;
};
