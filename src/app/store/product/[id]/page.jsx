import { notFound } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbSeparator,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
} from "./../../../../components/breadcrumb";
import Link from "next/link";
import productsData from "./../../../../../public/products.json";
import Image from "next/image";
import { AddToCartButton } from "./../../../../components/AddToCart";

export default async function ProductPage({ params }) {
  const { id } = params;
  const product = productsData.find((p) => p.id.toString() === id);

  if (!product) {
    return notFound();
  }

  return (
    <>
      <article className="pb-12">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink
                asChild
                className="inline-flex min-h-12 min-w-12 items-center justify-center"
              >
                <Link href="/">{" All products"}</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{product.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="mt-4 grid gap-4 lg:grid-cols-12">
          <div className="lg:col-span-5 lg:col-start-8">
            <h1 className="text-3xl font-bold leading-none tracking-tight text-foreground">
              {product.name}
            </h1>
            {product.price}
          </div>

          <div className="lg:col-span-7 lg:row-span-3 lg:row-start-1">
            <h2 className="sr-only">{"imagesTitle"}</h2>
            <Image
              key={product.image}
              className="w-full rounded-lg bg-neutral-100 object-cover object-center transition-opacity"
              src={product.image}
              width={700}
              height={700}
              sizes="(max-width: 1024x) 100vw, (max-width: 1280px) 50vw, 700px"
              loading="eager"
              priority
              alt=""
            />
          </div>
          <div className="grid gap-8 lg:col-span-5">
            <section>
              <h2 className="sr-only">{"description"}</h2>
              <div className="prose text-secondary-foreground">
                <p>{product.description} </p>
              </div>
            </section>
            <AddToCartButton productId={product.id} />
          </div>
        </div>
      </article>
    </>
  );
}
