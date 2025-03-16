import Image from "next/image";

export default function NavigationBar() {
  return (
    <header id="header" className="py-4 px-6 flex justify-between items-center">
      <div className="flex items-center gap-2">
        <Image src={"/cq-logo.svg"} alt="logo" width={200} height={200} />
      </div>
      <nav className="flex gap-6">
        <span className="text-gray-600 hover:text-gray-900 cursor-pointer">
          Help
        </span>
        <span className="text-gray-600 hover:text-gray-900 cursor-pointer">
          About
        </span>
      </nav>
    </header>
  );
}
