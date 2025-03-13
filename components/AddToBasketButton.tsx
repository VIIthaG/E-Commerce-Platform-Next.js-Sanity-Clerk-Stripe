"use client";
import useBasketStore from "@/store/store";
import { Product } from "@sanity";
import { useEffect, useState } from "react";

interface AddToBasketButtonProps {
  product: Product;
  disabled: boolean;
}

function AddToBasketButton({ product, disabled }: AddToBasketButtonProps) {
  const { addItem, getItemCount, removeItem } = useBasketStore();

  const itemCount = getItemCount(product._id);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }
  return (
    <div className="flex items-center justify-center space-x-2">
      <button
        className={` w-8 h-8 bg-gray-200 transition-colors duration-200   rounded-full flex items-center justify-center ${itemCount === 0 ? "bg-gray-100 cursor-not-allowed" : "bg-gray-200 hover:bg-gray-300"}`}
        onClick={() => removeItem(product._id)}
        disabled={itemCount === 0 || disabled}
      >
        <span
          className={`text-xl font-bold  ${itemCount === 0 ? " text-gray-400" : "text-gray-600"}`}
        >
          -
        </span>
      </button>

      <span className="font-semibold w-8 text-center">{itemCount}</span>
      <button
        className={` w-8 h-8  transition-colors duration-200   rounded-full flex items-center justify-center ${disabled ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"}`}
        onClick={() => addItem(product)}
        disabled={disabled}
      >
        <span className={`text-xl font-bold text-white`}>+</span>
      </button>
    </div>
  );
}

export default AddToBasketButton;
