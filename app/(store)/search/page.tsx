import ProductGrid from "@/components/ProductGrid";
import { searchProductsByName } from "@/sanity/lib/products/searchProductsByName";
import React from "react";

async function SearchPage({
  searchParams,
}: {
  searchParams: { query: string };
}) {
  const { query } = await searchParams;
  const products = await searchProductsByName(query);

  if (!products.length) {
    return (
      <div className="flex flex-col  items-center justify-top min-h-screen  bg-gray-100 p-4 lg:shadow-2xl">
        <div className="bg-white rounded-lg p-8 shadow-md w-full max-w-4xl">
          <h1 className="text-3xl font-bold mb-6 text-center">
            No Products found for : " {query} "
            <br />
            <p className="text-gray-600 text-sm text-center ">
              Try Searching With Different Keywords
            </p>
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-top min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg  shadow-md  w-full max-w-4xl">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Search Results for {query}
        </h1>
        <ProductGrid products={products} />
      </div>
    </div>
  );
}

export default SearchPage;
