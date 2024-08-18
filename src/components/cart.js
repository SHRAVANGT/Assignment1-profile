import { cookies } from "next/headers";
import { safeJsonParse } from "./utils";

export const CART_COOKIE = "yns_cart";

// Function to set cart data in cookies
export function setCartCookieJson(cartCookieJson) {
  try {
    cookies().set(CART_COOKIE, JSON.stringify(cartCookieJson));
  } catch (error) {
    console.error("Failed to set cart cookie", error);
  }
}

// Function to clear cart data from cookies
export function clearCartCookie() {
  try {
    cookies().set(CART_COOKIE, "", { maxAge: 0 });
  } catch (error) {
    console.error("Failed to clear cart cookie", error);
  }
}

// Function to get cart data from cookies
export function getCartCookieJson() {
  const cookieValue = cookies().get(CART_COOKIE)?.value;
  const cartCookieJson = safeJsonParse(cookieValue);

  if (
    !cartCookieJson ||
    typeof cartCookieJson !== "object" ||
    !("id" in cartCookieJson) ||
    !("linesCount" in cartCookieJson) ||
    typeof cartCookieJson.id !== "string" ||
    typeof cartCookieJson.linesCount !== "number"
  ) {
    return null;
  }
  return cartCookieJson;
}
