import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
    <>
      <div className="flex w-full flex-row-reverse mb-16 gap-4 sm:gap-12 ">
        <Link
          href="https://www.notion.so/movemateai/MoveMateAI-389134e39a634d2699c07fdc0be8a62b?pvs=4"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="flex-center text-black font-bold hover:bg-blue-500 bg-white pt-2 pb-2 pr-4 pl-4 rounded-full gap-3">
            <Image src="/images/notion.svg" width={37} height={37} alt="code" />
            <p className="sm:flex hidden">Documentation</p>
          </div>
        </Link>
        <Link
          href="https://github.com/poohmipun/push-up"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="flex-center text-black font-bold hover:bg-blue-500 bg-white pt-2 pb-2 pr-4 pl-4 rounded-full gap-3">
            <Image src="/images/github.svg" width={37} height={37} alt="code" />
            <p className="sm:flex hidden">Code</p>
          </div>
        </Link>
      </div>
    </>
  );
};

export default Footer;
