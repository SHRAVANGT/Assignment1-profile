"use server";

import { getCartFromCookiesAction } from "./cartActions";
import { setCartCookieJson } from "./../components/cart";

// Utility functions to get and set cart in localStorage
function getCartFromLocalStorage() {
  if (typeof window !== "undefined") {
    const cartJson = localStorage.getItem("cart");
    return cartJson ? JSON.parse(cartJson) : null;
  }
  return null;
}

function setCartInLocalStorage(cart) {
  if (typeof window !== "undefined") {
    localStorage.setItem("cart", JSON.stringify(cart));
  }
}

// Function to add a product to the cart
export async function addToCartAction(formData) {
  const productId = formData.get("productId");
  if (!productId || typeof productId !== "string") {
    throw new Error("Invalid product ID");
  }

  let cart = getCartFromLocalStorage() || (await getCartFromCookiesAction());

  if (!cart) {
    cart = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      items: [],
    };
  }

  // Check if the product is already in the cart
  const existingItem = cart.items.find((item) => item.productId === productId);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.items.push({ productId, quantity: 1 });
  }

  // Update cart in localStorage and cookie
  setCartInLocalStorage(cart);
  setCartCookieJson({
    id: cart.id,
    linesCount: cart.items.reduce((total, item) => total + item.quantity, 0),
  });
}

// Function to increase the quantity of a product in the cart
export async function increaseQuantity(productId) {
  const cart = getCartFromLocalStorage() || (await getCartFromCookiesAction());
  if (!cart) {
    throw new Error("Cart not found");
  }

  const item = cart.items.find((item) => item.productId === productId);
  if (item) {
    item.quantity += 1;
  }

  setCartInLocalStorage(cart);
}

// Function to decrease the quantity of a product in the cart
export async function decreaseQuantity(productId) {
  const cart = getCartFromLocalStorage() || (await getCartFromCookiesAction());
  if (!cart) {
    throw new Error("Cart not found");
  }

  const item = cart.items.find((item) => item.productId === productId);
  if (item) {
    item.quantity -= 1;
    if (item.quantity <= 0) {
      cart.items = cart.items.filter((item) => item.productId !== productId);
    }
  }

  setCartInLocalStorage(cart);
}

// Function to set the quantity of a specific product in the cart
export async function setQuantity({ productId, quantity }) {
  const cart = getCartFromLocalStorage() || (await getCartFromCookiesAction());
  if (!cart) {
    throw new Error("Cart not found");
  }

  const item = cart.items.find((item) => item.productId === productId);
  if (item) {
    item.quantity = quantity;
  }

  setCartInLocalStorage(cart);
}
