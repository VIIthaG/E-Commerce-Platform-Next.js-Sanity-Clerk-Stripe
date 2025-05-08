"use client";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import useBasketStore from "@/store/store";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get("orderNumber");
  const clearBasket = useBasketStore((state) => state.clearBasket);

  useEffect(() => {
    if (orderNumber) {
      clearBasket();
    }
  }, [orderNumber, clearBasket]);

  return (
    <div className="container mx-auto p-4  flex flex-col items-center justify-center min-h-[65vh] max-w-[70vh] bg-gray-100 rounded-lg shadow-lg mt-20">
      <svg
        className="w-10 h-10 text-green-500 mb-4"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        Thank You For Your Order!
      </h1>

      <p className="border-t border-b p-4 ">
        Your order has been placed successfully!
      </p>
      {orderNumber && <p>Order Number: {orderNumber}</p>}

      <div className="py-4 text-xs my-4 text-center text-gray-700">
        <p>
          A Confirmation Email Has Been Sent To Your Registered E-mail Address
        </p>
      </div>

      <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6 mt-4 w-full max-w-md mx-auto">
        <Link href="/orders" className="w-full sm:w-auto">
          <Button variant="outline" className="w-full sm:w-auto">
            View Order Details
          </Button>
        </Link>

        <Link href="/" className="w-full sm:w-auto">
          <Button variant="outline" className="w-full sm:w-auto">
            Continue Shopping
          </Button>
        </Link>
      </div>
    </div>
  );
}
