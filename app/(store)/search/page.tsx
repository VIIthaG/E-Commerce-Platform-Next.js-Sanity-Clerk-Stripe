import ProductGrid from "@/components/ProductGrid";
import { searchProductsByName } from "@/sanity/lib/products/searchProductsByName";

async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ query: string }>;
}) {
  const { query } = await searchParams; // Await the Promise here
  const products = await searchProductsByName(query);

  // Rest of the code remains the same

  if (!products.length) {
    return (
      <div className="flex flex-col items-center justify-top min-h-screen bg-gray-100 p-4 lg:shadow-2xl">
        <div className="bg-white rounded-lg p-8 shadow-md w-full max-w-4xl">
          <h1 className="text-3xl font-bold mb-6 text-center">
            No Products found for: &quot;{query}&quot;
            <br />
            <p className="text-gray-600 text-sm text-center">
              Try Searching With Different Keywords
            </p>
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-top min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Search Results for: &quot;{query}&quot;
        </h1>
        <ProductGrid products={products} />
      </div>
    </div>
  );
}

export default SearchPage;

// import ProductGrid from "@/components/ProductGrid";
// import { searchProductsByName } from "@/sanity/lib/products/searchProductsByName";

// const SearchPage = async ({
//   searchParams,
// }: {
//   searchParams: Promise<{ query: string }>;
// }) => {
//   const { query } = await searchParams;
//   const products = await searchProductsByName(query);

//   if (!products.length) {
//     return (
//       <div className="flex flex-col items-center justify-top min-h-screen bg-gray-100 p-4 lg:shadow-2xl">
//         <div className="bg-white rounded-lg p-8 shadow-md w-full max-w-4xl">
//           <h1 className="text-3xl font-bold mb-6 text-center">
//             No Products found for: &quot;{query}&quot;
//             <br />
//             <p className="text-gray-600 text-sm text-center">
//               Try Searching With Different Keywords
//             </p>
//           </h1>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="flex flex-col items-center justify-top min-h-screen bg-gray-100 p-4">
//       <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl">
//         <h1 className="text-3xl font-bold mb-6 text-center">
//           Search Results for: &quot;{query}&quot;
//         </h1>
//         <ProductGrid products={products} />
//       </div>
//     </div>
//   );
// };

// export default SearchPage;
