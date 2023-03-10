import { useRouter } from "next/router";
import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import ActiveLink from "./active-link";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Crypto", href: "/crypto" },
  { name: "JSON/RPC", href: "/rpc" },
  { name: "EIP-1193", href: "/eip1193" },
  { name: "Ethers.js", href: "/ethers" },
  { name: "wagmi", href: "/wagmi" },
  { name: "Alchemy API", href: "/alchemy" },
];

const Nav = () => {
  const router = useRouter();

  return (
    <Disclosure as="nav" className="bg- hite">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-5xl pt-7 pb-3 px-4 sm:px-6 lg:px-8">
            <div className="flex h-9 justify-between">
              <div className="flex">
                {/* Menu items */}
                <div className="hidden sm:flex sm:space-x-8">
                  {navigation.map((item) => (
                    <ActiveLink
                      key={item.href}
                      activeClassName="text-gray-900 border-indigo-500"
                      inactiveClassName="text-gray-500 hover:text-gray-700 border-transparent hover:border-gray-200"
                      className="px-1 pt-1 border-b-2 text-sm font-semibold"
                      href={item.href}
                    >
                      {item.name}
                    </ActiveLink>
                  ))}
                </div>
              </div>
              {/* Mobile menu button */}
              <div className="flex items-center sm:hidden">
                <Disclosure.Button
                  type="button"
                  className="inline-flex p-2 rounded-md bg-white text-gray-500 hover:bg-gray-200 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>
          {/* Mobile menu */}
          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 pt-2 pb-3">
              {navigation.map((item) => (
                <ActiveLink
                  key={item.href}
                  activeClassName="bg-indigo-50 text-indigo-700 border-indigo-500"
                  inactiveClassName="hover:bg-gray-50 text-gray-500 hover:text-gray-700 border-transparent hover:border-gray-300"
                  className="block pl-3 py-2 border-l-4 font-semibold"
                  href={item.href}
                >
                  {item.name}
                </ActiveLink>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default Nav;
