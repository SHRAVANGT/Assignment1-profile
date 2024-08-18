"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import {
  clearCartCookie,
  getCartCookieJson,
  setCartCookieJson,
} from "./../components/cart";

// Utility function to get cart from localStorage
function getCartFromLocalStorage() {
  if (typeof window !== "undefined") {
    const cartJson = localStorage.getItem("cart");
    return cartJson ? JSON.parse(cartJson) : null;
  }
  return null;
}

// Utility function to set cart in localStorage
function setCartInLocalStorage(cart) {
  if (typeof window !== "undefined") {
    localStorage.setItem("cart", JSON.stringify(cart));
  }
}

export async function getCartFromCookiesAction() {
  const cartJson = getCartCookieJson();
  if (!cartJson) {
    return null;
  }

  const cart = getCartFromLocalStorage();
  if (cart && cart.id === cartJson.id) {
    return cart;
  }
  return null;
}

export async function findOrCreateCartIdFromCookiesAction() {
  let cart = await getCartFromCookiesAction();
  if (cart) {
    return cart;
  }

  // Create a new cart object
  const newCart = {
    id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`, // Example cart ID generation
    linesCount: 0,
    items: [],
  };

  // Set the new cart in localStorage and cookies
  setCartInLocalStorage(newCart);
  setCartCookieJson({
    id: newCart.id,
    linesCount: newCart.linesCount,
  });

  revalidateTag(`cart-${newCart.id}`);
  revalidatePath("/cart");
  revalidatePath("/cart-overlay");

  return newCart.id;
}

export async function clearCartCookieAction() {
  const cookie = getCartCookieJson();
  if (!cookie) {
    return;
  }

  clearCartCookie();
  if (typeof window !== "undefined") {
    localStorage.removeItem("cart");
  }
  revalidateTag(`cart-${cookie.id}`);
  // FIXME not ideal, revalidate per domain instead (multi-tenant)
  revalidateTag(`admin-orders`);
  revalidatePath("/cart");
  revalidatePath("/cart-overlay");
}
