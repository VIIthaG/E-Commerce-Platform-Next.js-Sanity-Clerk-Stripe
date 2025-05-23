import Image from "next/image";
import formatCurrency from "@/lib/formatCurrency";
import { imageUrl } from "@/lib/imageUrl";
import getMyOrders from "@/sanity/lib/orders/getMyOrders";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

async function Orders() {
  const { userId } = await auth();

  if (!userId) {
    return redirect("/");
  }

  const orders = await getMyOrders(userId);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-4 sm:p-8 rounded-xl shadow-lg w-full max-w-4xl">
        <h1 className="text-4xl font-bold mb-8 tracking-tight">Orders</h1>
        {orders.length === 0 ? (
          <div className="text-center text-gray-600">
            <p>You have not placed any orders yet.</p>
          </div>
        ) : (
          <div className="space-y-6 sm:space-y-4">
            {orders.map((order) => (
              <div
                key={order.orderNumber}
                className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden"
              >
                {/* Header Section */}
                <div className="p-4 sm:p-6 border-b border-gray-200">
                  <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center mb-4">
                    <div>
                      <p className="text-sm text-gray-600 font-bold">
                        Order Number
                      </p>
                      <h2 className="text-lg font-semibold">
                        {order.orderNumber}
                      </h2>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 font-bold">
                        Order Date
                      </p>
                      <p className="text-gray-500">
                        {order.orderDate
                          ? new Date(order.orderDate).toLocaleDateString()
                          : "N/A"}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center">
                    <div className="flex items-center">
                      <span className="text-sm mr-2">Status:</span>
                      <span
                        className={`px-3 py-1 rounded-full text-sm ${
                          order.status === "paid"
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {order.status}
                      </span>
                    </div>
                    <div className="sm:text-right">
                      <p className="text-sm text-gray-600 mb-1">Total Amount</p>
                      <p className="font-bold text-lg">
                        {formatCurrency(order.totalPrice ?? 0, order.currency)}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Discount Info */}
                {order.amountDiscount && (
                  <div className="mt-4 p-4 bg-stone-100 border-t border-gray-200">
                    <p className="text-sm text-gray-600 font-bold">
                      Discount Applied
                    </p>
                    <p className="text-gray-800">
                      {formatCurrency(order.amountDiscount, order.currency)}
                    </p>
                    <p className="text-sm text-gray-600">
                      Original Subtotal:{" "}
                      {formatCurrency(
                        (order.totalPrice ?? 0) + order.amountDiscount,
                        order.currency
                      )}
                    </p>
                  </div>
                )}

                {/* Order Items */}
                <div className="px-4 py-3 sm:px-6 sm:py-4">
                  <p className="text-sm text-gray-600 mb-3 sm:mb-4">
                    Order Items
                  </p>
                  <div className="space-y-3 sm:space-y-4">
                    {order.products?.map((product) => (
                      <div
                        key={product.product?._id}
                        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b last:border-b-0 py-2"
                      >
                        <div className="flex items-center gap-3 sm:gap-4">
                          {product.product?.image && (
                            <div className="relative h-14 w-14 sm:h-16 sm:w-16 flex-shrink-0 rounded-md overflow-hidden">
                              <Image
                                src={imageUrl(product.product.image).url()}
                                alt={product.product?.name ?? ""}
                                className="object-cover"
                                fill
                              />
                            </div>
                          )}
                          <div className="flex flex-col gap-1">
                            <p className="text-sm font-semibold">
                              {product.product?.name}
                            </p>
                            <p className="text-sm text-gray-500">
                              Quantity: {product?.quantity ?? "N/A"}
                            </p>
                          </div>
                        </div>

                        <p className="font-medium text-right sm:text-xs ">
                          {product.product?.price && product.quantity
                            ? formatCurrency(
                                product.product?.price * product.quantity,
                                order.currency
                              )
                            : "N/A"}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Orders;
