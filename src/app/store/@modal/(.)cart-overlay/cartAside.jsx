import { CartAsideDrawer } from "./cartAsideDrawer";

export const CartAsideContainer = ({ children }) => {
  return (
    <CartAsideDrawer>
      <div className="flex h-full min-h-[80vh] flex-col">{children}</div>
    </CartAsideDrawer>
  );
};
