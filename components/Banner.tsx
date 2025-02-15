import { getActiveSaleByCouponCode } from "@/sanity/lib/sales/getActiveSaleByCouponCode";

async function Banner() {
  const sale = await getActiveSaleByCouponCode("VIIthaG");

  if (!sale?.isActive) {
    return null;
  }

  return (
    <div className="bg-gradient-to-r from-red-600 to-black text-white px-6 py-10 mt-2 m-4 rounded-lg shadow-lg">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex-1">
          <h1 className="text-4xl sm:text-5xl font-bold text-left mb-4">
            {sale.title}
          </h1>
          <p className="text-left text-2xl font-semibold mb-6">
            {sale.description}
          </p>
          <div className="flex">
            <div className=" bg-white text-black py-4 px-6 rounded-full shadow-md transform hover:scale-105 transition duration-300">
              <span className="ml-2 font-bold text-base sm:text-xl">
                Use Code:{" "}
                <span className="text-red-600">{sale.couponCode}</span>
              </span>
              <span className="ml-2 font-bold text-base sm:text-xl">
                &nbsp;for {sale.discountAmount}% OFF
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Banner;
