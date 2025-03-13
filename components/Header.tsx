"use client";

import Link from "next/link";
import Form from "next/form";
import { PackageIcon, TrolleyIcon } from "@sanity/icons";
import { ClerkLoaded, SignedIn, SignInButton, UserButton } from "@clerk/nextjs";
import { userHasRole } from "sanity";
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
    <header className="shadow-lg shadow-gray-400 sm:flex flex-wrap justify-between items-center px-2 py-2">
      <div className="flex flex-wrap w-full justify-between items-center">
        <Link
          className="text-2xl font-bold text-blue-500 hover:opacity-50 cursor-pointer ml-4  "
          href="/"
        >
          Yurrp ™
        </Link>

        <Form
          action="/search"
          className="  sm:flex-1 sm:mx-4 mt-2 sm:mt-0 mx-4  w-80 "
        >
          <input
            type="text"
            name="query"
            placeholder="Search for Products"
            className="bg-gray-100 text-gray-800 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 border w-full lg:max-w-[80%] "
          />
        </Form>
        {/* <div className="flex items-center space-x-4 mt-4 sm:mt-0 flex-1 "> */}
        {/* sm:flex-none */}
        <div className="flex-1 relative flex justify-center sm:justify-start sm:flex-none mt:0 items-center space-x-4  text-white font-bold py-2 px-4 rounded ">
          <Link href="/basket">
            <span className="flex-1 relative flex justify-center sm:justify-start sm:flex-none items-center space-x-2 bg-blue-500 text-white font-semibold hover:bg-blue-400 rounded py-2 px-4">
              <TrolleyIcon className=" w-6 h-6 " />
              <span className="absolute -top-2 shadow-lg -right-2 w-5 h-5 bg-red-500 rounded-full items-center flex text-white justify-center text-xs">
                {itemCount}
              </span>
              &nbsp;Basket
            </span>
          </Link>
          <ClerkLoaded>
            <SignedIn>
              <Link
                href="/order"
                className="flex-1 relative flex justify-center sm:justify-start sm:flex-none items-center space-x-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                <PackageIcon className="w-5 h-6"></PackageIcon>
                <span> &nbsp; &nbsp;My Orders &nbsp;</span>
              </Link>
            </SignedIn>
            {user ? (
              <div className="flex  items-center space-x-2">
                <UserButton />
                <div className=" sm:block text-xs">
                  <p className="text-gray-400 mt-07">Welcome Back</p>
                  <p className="font-bold  text-gray-400">{user.fullName}</p>
                </div>
              </div>
            ) : (
              <SignInButton mode="modal" />
            )}

            {user?.passkeys.length === 0 && (
              <button
                onClick={createClerkPassKey}
                className="bg-white hover:bg-blue-700 hover:text-white animate-pulse text-blue-500 font-bold py-2 px-4 rounded border-blue-300 border"
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
