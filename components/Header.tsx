"use client";

import Link from "next/link";
import Form from "next/form";
import { PackageIcon, TrolleyIcon } from "@sanity/icons";
import { ClerkLoaded, SignedIn, SignInButton, UserButton } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";
import useBasketStore from "@/store/store";

function Header() {
  const { user } = useUser();
  const itemCount = useBasketStore((state) =>
    state.items.reduce((total, item) => total + item.quantity, 0)
  );

  const createClerkPassKey = async () => {
    try {
      const response = await user?.createPasskey();
      console.log(response);
    } catch (err) {
      console.log("Error", JSON.stringify(err, null, 2));
    }
  };

  return (
    <header className="shadow-lg shadow-gray-400 px-4 py-3">
      <div className="flex justify-center items-center flex-wrap">
        {/* Logo */}
        <Link
          className="text-2xl font-bold text-blue-500 hover:opacity-50 cursor-pointer"
          href="/"
        >
          Yurrp ™
        </Link>

        {/* Search Bar */}
        <Form action="/search" className="flex-1 mx-4 max-w-lg">
          <input
            type="text"
            name="query"
            placeholder="Search for Products"
            className="w-full bg-gray-100 text-gray-800 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 border"
          />
        </Form>

        {/* Right Side Controls */}
        <div className="flex items-center space-x-3">
          {/* Basket */}
          <Link
            href="/basket"
            className="relative flex items-center  bg-blue-500 text-white font-semibold hover:bg-blue-400 rounded py-2 px-4"
          >
            <TrolleyIcon className="w-6 h-6" />
            <span className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white text-xs shadow-lg">
              {itemCount}
            </span>
            <span>Basket</span>
          </Link>

          {/* Auth / User Controls */}
          <ClerkLoaded>
            <SignedIn>
              <Link
                href="/order"
                className="flex items-center  bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                <PackageIcon className="w-5 h-6" />
                <span>My Orders</span>
              </Link>
            </SignedIn>

            {user ? (
              <div className="flex items-center space-x-3">
                <UserButton />
                <div className="hidden sm:block text-xs">
                  <p className="text-gray-400">Welcome Back</p>
                  <p className="font-bold text-gray-400">{user.fullName}</p>
                </div>
              </div>
            ) : (
              <div className="text-white bg-stone-600 p-2 rounded font-semibold hover:bg-stone-700 cursor-pointer">
                <SignInButton mode="modal" />
              </div>
            )}

            {/* Create Passkey Button */}
            {user?.passkeys.length === 0 && (
              <button
                onClick={createClerkPassKey}
                className="bg-white hover:bg-blue-700 hover:text-white animate-pulse text-blue-500 font-bold py-2 px-4 rounded border border-blue-300"
              >
                Create a Passkey
              </button>
            )}
          </ClerkLoaded>
        </div>
      </div>
    </header>
  );
}

export default Header;
