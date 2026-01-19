"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown } from "lucide-react";

export default function Navbar() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const toggleMenu = (menu: string) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  return (
    <header className="w-full bg-white shadow-sm">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Image
            src="/images/icehub.png"
            alt="ICE HUB"
                width={51}
                height={51}
                priority
          />
        </div>

        {/* Desktop Menu */}
        <ul className="hidden items-center gap-8 md:flex">
          <li>
            <Link href="/about" className="nav-link">
              About Us
            </Link>
          </li>

          <li>
            <Link href="/courses" className="nav-link">
              Courses
            </Link>
          </li>

          {/* Programmes Dropdown */}
          <li className="relative">
            <button
              onClick={() => toggleMenu("programmes")}
              className="nav-link flex items-center gap-1"
            >
              Programmes <ChevronDown size={16} />
            </button>

            {openMenu === "programmes" && (
              <Dropdown>
                <DropdownItem href="/programmes/next-gen">
                  Next Gen Prep
                </DropdownItem>
                <DropdownItem href="/programmes/skit">
                  SKIT Program
                </DropdownItem>
                <DropdownItem href="/programmes/digital-literacy">
                  Digital Literacy
                </DropdownItem>
              </Dropdown>
            )}
          </li>

          {/* Services Dropdown */}
          <li className="relative">
            <button
              onClick={() => toggleMenu("services")}
              className="nav-link flex items-center gap-1"
            >
              Services <ChevronDown size={16} />
            </button>

            {openMenu === "services" && (
              <Dropdown>
                <DropdownItem href="/services/web-software">
                  Web & Software Solution
                </DropdownItem>
                <DropdownItem href="/services/workspace">
                  Workspace
                </DropdownItem>
              </Dropdown>
            )}
          </li>

          <li>
            <Link href="/projects" className="nav-link">
              Projects
            </Link>
          </li>

          <li>
            <Link href="/blogs" className="nav-link">
              Blogs & Activities
            </Link>
          </li>
        </ul>

        {/* CTA Button */}
        <Link
          href="/get-started"
          className="rounded-full bg-blue-600 px-6 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
        >
          Get Started
        </Link>
      </nav>
    </header>
  );
}

/* ---------------- Dropdown Components ---------------- */

function Dropdown({ children }: { children: React.ReactNode }) {
  return (
    <div className="absolute left-0 top-full mt-3 w-56 rounded-lg border bg-white shadow-lg">
      <ul className="py-2">{children}</ul>
    </div>
  );
}

function DropdownItem({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <li>
      <Link
        href={href}
        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
      >
        {children}
      </Link>
    </li>
  );
}
