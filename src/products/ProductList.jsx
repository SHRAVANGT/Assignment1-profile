"use client";
import Image from "next/image";
import { SLink } from "./../components/SLink";

export const ProductList = ({ products }) => {
  return (
    <>
      <ul className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product, idx) => {
          return (
            <li key={product.id} className="group">
              <SLink href={`store/product/${product.id}`}>
                <article className="overflow-hidden rounded border bg-white">
                  {product.image && (
                    <div className="aspect-square w-full overflow-hidden bg-neutral-100">
                      <Image
                        className="group-hover:rotate hover-perspective w-full bg-neutral-100 object-cover object-center transition-opacity group-hover:opacity-75"
                        src={product.image}
                        width={768}
                        height={768}
                        loading={idx < 3 ? "eager" : "lazy"}
                        priority={idx < 3}
                        sizes="(max-width: 1024x) 100vw, (max-width: 1280px) 50vw, 700px"
                        alt=""
                      />
                    </div>
                  )}
                  <div className="p-4">
                    <h2 className="text-lg font-semibold text-neutral-700">
                      {product.name}
                    </h2>
                    <footer className="text-sm font-medium text-neutral-900">
                      {product.price}
                    </footer>
                  </div>
                </article>
              </SLink>
            </li>
          );
        })}
      </ul>
    </>
  );
};
