import Image from "next/image";
import { CartAsideContainer } from "./cartAside";
import { CartModalAddSideEffect } from "./cartSideEffect";
import { getCartFromCookiesAction } from "./../../../../actions/cartActions";
import { Button } from "./../../../../components/button";
import { SLink } from "./../../../../components/SLink";

export default async function CartModalPage({ searchParams }) {
  const originalCart = await getCartFromCookiesAction();
  const cart = originalCart;

  if (!cart || cart.lines.length === 0) {
    return null;
  }
  turn(
    <CartAsideContainer withAnimations={true}>
      <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-neutral-700">{"title"}</h2>
          <SLink
            replace
            href="/store/cart"
            className="text-sm text-muted-foreground underline"
          >
            {"open Full View"}
          </SLink>
        </div>
        <div className="mt-8">
          <ul role="list" className="-my-6 divide-y divide-neutral-200">
            {cart.lines.map((line) => (
              <li
                key={line.product.id}
                className="grid grid-cols-[4rem,1fr,max-content] grid-rows-[auto,auto] gap-x-4 gap-y-2 py-6"
              >
                {line.product.images[0] ? (
                  <div className="col-span-1 row-span-2 bg-neutral-100">
                    <Image
                      className="aspect-square rounded-md object-cover"
                      src={line.product.images[0]}
                      width={80}
                      height={80}
                      alt=""
                    />
                  </div>
                ) : (
                  <div className="col-span-1 row-span-2" />
                )}

                <p className="text-sm font-medium leading-none">
                  {line.product.price}
                </p>
                <p className="self-end text-sm font-medium text-muted-foreground">
                  {t("quantity", { quantity: line.quantity })}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-neutral-200 px-4 py-6 sm:px-6">
        <div
          id="cart-overlay-description"
          className="flex justify-between text-base font-medium text-neutral-900"
        ></div>

        <p className="mt-0.5 text-sm text-neutral-500">
          {"shippingAndTaxesInfo"}
        </p>
        <Button
          asChild={true}
          size={"lg"}
          className="mt-6 w-full rounded-full text-lg"
        >
          <SLink href="/cart">{"goToPaymentButton"}</SLink>
        </Button>
      </div>
      {searchParams.add && (
        <CartModalAddSideEffect productId={searchParams.add} />
      )}
    </CartAsideContainer>
  );
}
