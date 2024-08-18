import Image from "next/image";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "./../components/table";
import { CartItemQuantity, CartItemLineTotal } from "./CartItems.client";
import { SLink } from "../components/SLink";

export const CartSummaryTable = ({ cart }) => {
  const [optimisticCart, dispatchOptimisticCartAction] = useOptimistic(
    cart,
    (prevCart, action) => {
      const modifier = action.action === "INCREASE" ? 1 : -1;

      return {
        ...prevCart,
        lines: prevCart.lines.map((line) => {
          if (line.product.id === action.productId) {
            return { ...line, quantity: line.quantity + modifier };
          }
          return line;
        }),
      };
    }
  );

  return (
    <form>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="hidden w-24 sm:table-cell">
              <span className="sr-only">{"imageCol"}</span>
            </TableHead>
            <TableHead className="">{"productCol"}</TableHead>
            <TableHead className="w-1/6 min-w-32">{"priceCol"}</TableHead>
            <TableHead className="w-1/6 min-w-32">{"quantityCol"}</TableHead>
            <TableHead className="w-1/6 min-w-32 text-right">
              {"totalCol"}
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {optimisticCart.lines.map((line) => {
            urn(
              <TableRow key={line.product.id}>
                <TableCell className="hidden sm:table-cell sm:w-24">
                  {line.product.images[0] && (
                    <Image
                      className="aspect-square rounded-md object-cover"
                      src={line.product.image}
                      width={96}
                      height={96}
                      alt=""
                    />
                  )}
                </TableCell>
                <TableCell className="font-medium">
                  <SLink
                    className="transition-colors hover:text-muted-foreground"
                    href={`/product/${line.product.id}`}
                  ></SLink>
                </TableCell>
                <TableCell>
                  <CartItemQuantity
                    cartId={cart.cart.id}
                    quantity={line.quantity}
                    productId={line.product.id}
                    onChange={dispatchOptimisticCartAction}
                  />
                </TableCell>
                <TableCell className="text-right">
                  <CartItemLineTotal
                    currency={line.product.default_price.currency}
                    quantity={line.quantity}
                    unitAmount={line.product.default_price.unit_amount ?? 0}
                    productId={line.product.id}
                  />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </form>
  );
};
