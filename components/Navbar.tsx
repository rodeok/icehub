"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X } from "lucide-react";

export default function Navbar() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = (menu: string) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  // Do not show the navbar on dashboard, admin, or tutor routes
  if (pathname?.startsWith('/dashboard') || pathname?.startsWith('/admin') || pathname?.startsWith('/tutor')) {
    return null;
  }

  return (
    <header className={`w-full sticky top-0 z-[100] transition-all duration-300 ${isScrolled ? "bg-white/90 backdrop-blur-md shadow-md py-2" : "bg-white py-4"}`}>
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Link href="/" className="nav-link">
            <Image
              src="/images/icehub.png"
              alt="ICE HUB"
              width={51}
              height={51}
              priority
            />
          </Link>
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
                <DropdownItem href="/courses">
                  Digital Skills
                </DropdownItem>
                <DropdownItem href="/services/web-software">
                  Web & Software Solution
                </DropdownItem>
                <DropdownItem href="/services/startup-incubation">
                  Startup Incubation
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
          <li>
            <Link href="/sponsor" className="nav-link cursor-pointer">Sponsor a student</Link>
          </li>
        </ul>

        {/* CTA Button - Desktop */}
        <div className="hidden md:flex items-center gap-4">
          {/* <Link href="/login" className="text-sm font-semibold text-gray-700 hover:text-blue-600 transition">
            Login
          </Link> */}
          <Link
            href="/get-started"
            className="rounded-full bg-blue-600 px-6 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            Get Started
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-700"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-lg absolute w-full left-0 top-[83px] z-50 py-6 px-6 flex flex-col gap-6 h-screen overflow-y-auto pb-24">
          <ul className="flex flex-col gap-6 text-lg font-medium text-gray-800">
            <li>
              <Link href="/about" className="transition-colors hover:text-blue-600" onClick={() => setMobileMenuOpen(false)}>About Us</Link>
            </li>
            <li>
              <Link href="/courses" className="transition-colors hover:text-blue-600" onClick={() => setMobileMenuOpen(false)}>Courses</Link>
            </li>

            {/* Mobile Programmes Dropdown */}
            <li>
              <button
                onClick={() => toggleMenu("programmes")}
                className="flex items-center justify-between w-full transition-colors hover:text-blue-600"
              >
                Programmes <ChevronDown size={16} className={`transition-transform ${openMenu === "programmes" ? "rotate-180" : ""}`} />
              </button>
              {openMenu === "programmes" && (
                <ul className="mt-3 ml-4 flex flex-col gap-3 text-base text-gray-600">
                  <li><Link href="/programmes/next-gen" className="transition-colors hover:text-blue-600" onClick={() => setMobileMenuOpen(false)}>Next Gen Prep</Link></li>
                  <li><Link href="/programmes/skit" className="transition-colors hover:text-blue-600" onClick={() => setMobileMenuOpen(false)}>SKIT Program</Link></li>
                  <li><Link href="/programmes/digital-literacy" className="transition-colors hover:text-blue-600" onClick={() => setMobileMenuOpen(false)}>Digital Literacy</Link></li>
                </ul>
              )}
            </li>

            {/* Mobile Services Dropdown */}
            <li>
              <button
                onClick={() => toggleMenu("services")}
                className="flex items-center justify-between w-full transition-colors hover:text-blue-600"
              >
                Services <ChevronDown size={16} className={`transition-transform ${openMenu === "services" ? "rotate-180" : ""}`} />
              </button>
              {openMenu === "services" && (
                <ul className="mt-3 ml-4 flex flex-col gap-3 text-base text-gray-600">
                  <li><Link href="/courses" className="transition-colors hover:text-blue-600" onClick={() => setMobileMenuOpen(false)}>Digital Skills</Link></li>
                  <li><Link href="/services/web-software" className="transition-colors hover:text-blue-600" onClick={() => setMobileMenuOpen(false)}>Web & Software Solution</Link></li>
                  <li><Link href="/services/startup-incubation" className="transition-colors hover:text-blue-600" onClick={() => setMobileMenuOpen(false)}>Startup Incubation</Link></li>
                  <li><Link href="/services/workspace" className="transition-colors hover:text-blue-600" onClick={() => setMobileMenuOpen(false)}>Workspace</Link></li>
                </ul>
              )}
            </li>

            <li>
              <Link href="/projects" className="transition-colors hover:text-blue-600" onClick={() => setMobileMenuOpen(false)}>Projects</Link>
            </li>
            <li>
              <Link href="/blogs" className="transition-colors hover:text-blue-600" onClick={() => setMobileMenuOpen(false)}>Blogs & Activities</Link>
            </li>
            <li>
              <Link href="/services/start-incubation" className="transition-colors hover:text-blue-600" onClick={() => setMobileMenuOpen(false)}>Startup Incubation</Link>
            </li>
            <li>
              <Link href="https://www.figma.com/proto/vJOI8A3mrPRk0sMiRcHJw0/I.C.E-Website?node-id=59012-1517&starting-point-node-id=58811%3A4712" target="_blank" className="nav-link cursor-pointer" onClick={() => setMobileMenuOpen(false)}>Sponsor a student</Link>
            </li>
          </ul>

          <div className="flex flex-col gap-3">
            {/* <Link
              href="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center rounded-full border-2 border-blue-600 px-6 py-3 text-blue-600 font-semibold hover:bg-blue-50"
            >
              Login
            </Link> */}
            <Link
              href="/get-started"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center rounded-full bg-blue-600 px-6 py-3 text-white font-semibold hover:bg-blue-700"
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
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
        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-blue-600 transition-colors"
      >
        {children}
      </Link>
    </li>
  );
}
