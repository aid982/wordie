import Image from "next/image";
import Link from "next/link";
import React from "react";
import { MenuIcon } from "lucide-react";
import UserButton from "./user-button";
import { auth } from "@/auth";

async function Navbar() {
  const session = await auth();
  const user = session?.user;

  return (
    <header
      className="fixed right-0 left-0 top-0 py-4 px-4 
    dark:bg-black/40 flex items-center border-b-[1px] border-neutral-900 justify-between 
    backdrop-blur-lg z-[100]"
    >
      <Link href={"/"}>
        <aside className="flex items-center gap-[2px]">
          <p className="md:text-3xl font-bold">Wor</p>
          <Image
            src="/fuzzieLogo.png"
            width={15}
            height={15}
            alt="logo"
            className="shadow-sm h-5 w-5"
          ></Image>
          <p className="md:text-3xl font-bold">die</p>
        </aside>
      </Link>
      <nav
        className="absolute left-[50%] top-[50%] transform
        translate-x-[-50%] translate-y-[-50%] hidden md:block
        "
      >
        <ul className="flex items-center gap-4 list-none">
          <li>
            <Link href="#"></Link>
          </li>
        </ul>
      </nav>
      <aside className="flex items-center gap-4">
        <Link
          href="/dashboard"
          className="relative inline-flex h-10 overflow-hidden rounded-full p-[2px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
        >
          <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
          <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
            {user ? "Dashboard" : "Get Started"}
          </span>
        </Link>
        <UserButton user={user} />
        <MenuIcon className="md:hidden" />
      </aside>
    </header>
  );
}

export default Navbar;
