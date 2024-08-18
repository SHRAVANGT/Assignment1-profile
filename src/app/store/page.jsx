import Image from "next/image";
import { SLink } from "../../components/SLink.jsx";
import { ProductList } from "./../../products/ProductList.jsx";
import products from "./../../../public/products.json";

export default async function Home() {
  return (
    <main>
      <section className="rounded bg-neutral-100 py-8 sm:py-12">
        <div className="mx-auto grid grid-cols-1 items-center justify-items-center gap-8 px-8 sm:px-16 md:grid-cols-2">
          <div className="max-w-md space-y-4">
            <h2 className="text-balance text-3xl font-bold tracking-tight md:text-4xl">
              {"Discover our Curated Collection"}
            </h2>
            <p className="text-pretty text-neutral-600">
              {
                "Explore our carefully selected products for your home and lifestyle."
              }
            </p>
            <SLink className="inline-flex h-10 items-center justify-center rounded-full bg-neutral-900 px-6 font-medium text-neutral-50 transition-colors hover:bg-neutral-900/90 focus:outline-none focus:ring-1 focus:ring-neutral-950">
              {"Shop Now"}
            </SLink>
          </div>
          <Image
            alt="Cup of coffee"
            loading="eager"
            priority={true}
            className="rounded"
            height={450}
            width={450}
            src="https://files.stripe.com/links/MDB8YWNjdF8xT3BaeG5GSmNWbVh6bURsfGZsX3Rlc3RfaDVvWXowdU9ZbWlobUIyaHpNc1hCeDM200NBzvUjqP"
            style={{
              objectFit: "cover",
            }}
            sizes="(max-width: 640px) 70vw, 450px"
          />
        </div>
      </section>
      <ProductList products={products} />
    </main>
  );
}
