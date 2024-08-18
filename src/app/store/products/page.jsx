import { ProductList } from "./../../../products/ProductList";
import products from "./../../../../public/products.json";

export default async function AllProductsPage() {
  return (
    <main className="pb-8">
      <h1 className="text-3xl font-bold leading-none tracking-tight text-foreground"></h1>
      <ProductList products={products} />
    </main>
  );
}
