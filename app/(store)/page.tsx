import "@/app/globals.css";
import Banner from "@/components/Banner";
import ProductsView from "@/components/ProductsView";
import { getAllCategories } from "@/sanity/lib/products/getAllCategories";
import { getAllProducts } from "@/sanity/lib/products/getAllProducts";

export default async function Home() {
  const products = await getAllProducts();
  const categories = await getAllCategories();

  return (
    <div className="">
      <Banner />
      <div className="flex  min-h-screen  bg-gray-300 p-4">
        <ProductsView products={products} categories={categories} />
      </div>
    </div>
  );
}
