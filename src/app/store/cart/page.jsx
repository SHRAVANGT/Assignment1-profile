import { getCartFromCookiesAction } from "../../../actions/cartActions";

export default async function CartPage() {
  const cart = await getCartFromCookiesAction();
  if (!cart) {
    return null;
  }

  return <h1>hi</h1>;
}
