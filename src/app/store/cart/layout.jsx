import { getCartFromCookiesAction } from "../../../actions/cartActions";
import { CartSummaryTable } from "../../../cart-check/CartSummaryTable";
import { CartEmpty } from "../../../cart-check/CartEmpty";

export default async function CartLayout({ children }) {
  const cart = await getCartFromCookiesAction();
  if (!cart?.cart.client_secret || cart.lines.length === 0) {
    return <CartEmpty />;
  }
  return (
    <div className="min-h-[calc(100dvh-7rem)] xl:grid xl:grid-cols-12 xl:gap-x-8">
      <div className="my-8 xl:col-span-7">
        <div className="sticky top-1">
          <h1 className="mb-4 text-3xl font-bold leading-none tracking-tight">
            {"title"}
          </h1>
          <CartSummaryTable cart={structuredClone(cart)} />
        </div>
      </div>
      <div className="my-8 max-w-[65ch] xl:col-span-5">{children}</div>
    </div>
  );
}
