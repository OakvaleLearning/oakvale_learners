"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDown, Menu, X, LayoutDashboard, LogOut, User } from "lucide-react";
import { NAV_LINKS } from "@/content/site";
import { cn } from "@/lib/utils";
import { Logo } from "./Logo";
import { ButtonLink } from "@/components/ui/Button";

interface SessionUser {
  name: string;
  role: "LEARNER" | "ADMIN";
}

export function Navbar({ user }: { user: SessionUser | null }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const pathname = usePathname();
  const [prevPathname, setPrevPathname] = useState(pathname);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Reset menus when the route changes (adjust state during render).
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setMobileOpen(false);
    setOpenDropdown(null);
  }

  // At the top of any page the navbar sits over a dark hero → use light text.
  const light = !scrolled;
  const linkClass = (active: boolean) =>
    cn(
      "rounded-full px-4 py-2 text-sm font-medium transition-colors",
      active
        ? light
          ? "text-white"
          : "text-primary-700"
        : light
          ? "text-white/80 hover:text-white"
          : "text-ink-600 hover:text-primary-700"
    );

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-ink-100/80 bg-white/85 backdrop-blur-xl shadow-sm"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-5 sm:px-8 lg:h-18">
        <Logo dark={light} scrolled={scrolled} />

        {/* Desktop nav */}
        <ul className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            if ("children" in link && link.children) {
              return (
                <li
                  key={link.href}
                  className="relative"
                  onMouseEnter={() => setOpenDropdown(link.href)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <Link
                    href={link.href}
                    className={cn("flex items-center gap-1", linkClass(active))}
                  >
                    {link.label}
                    <ChevronDown className="size-3.5" />
                  </Link>
                  <AnimatePresence>
                    {openDropdown === link.href && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.18 }}
                        className="absolute left-0 top-full w-64 pt-3"
                      >
                        <div className="overflow-hidden rounded-2xl border border-ink-100 bg-white p-2 shadow-xl shadow-ink-900/10">
                          {link.children.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              className="block rounded-xl px-4 py-3 text-sm font-medium text-ink-700 transition-colors hover:bg-primary-50 hover:text-primary-700"
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              );
            }
            return (
              <li key={link.href}>
                <Link href={link.href} className={linkClass(active)}>
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Desktop CTAs */}
        <div className="hidden items-center gap-2 lg:flex">
          {user ? (
            <>
              <ButtonLink
                href={user.role === "ADMIN" ? "/admin" : "/dashboard"}
                variant="ghost"
                size="sm"
                className={light ? "text-white hover:bg-white/10 hover:text-white" : ""}
              >
                <LayoutDashboard className="size-4" />
                {user.role === "ADMIN" ? "Admin" : "Dashboard"}
              </ButtonLink>
              <ButtonLink href="/programs" variant="accent" size="sm">
                Enroll Now
              </ButtonLink>
            </>
          ) : (
            <>
              <ButtonLink
                href="/login"
                variant="ghost"
                size="sm"
                className={light ? "text-white hover:bg-white/10 hover:text-white" : ""}
              >
                Log in
              </ButtonLink>
              <ButtonLink href="/programs" variant="accent" size="sm">
                Enroll Now
              </ButtonLink>
            </>
          )}
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen((v) => !v)}
          className={cn(
            "grid size-10 place-items-center rounded-xl lg:hidden",
            light ? "text-white hover:bg-white/10" : "text-ink-800 hover:bg-ink-100"
          )}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-t border-ink-100 bg-white lg:hidden"
          >
            <div className="space-y-1 px-5 py-4">
              {NAV_LINKS.map((link) => (
                <div key={link.href}>
                  <Link
                    href={link.href}
                    className="block rounded-xl px-4 py-3 text-base font-medium text-ink-800 hover:bg-primary-50 hover:text-primary-700"
                  >
                    {link.label}
                  </Link>
                  {"children" in link && link.children && (
                    <div className="ml-3 border-l border-ink-100 pl-3">
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block rounded-xl px-4 py-2.5 text-sm text-ink-600 hover:text-primary-700"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="grid grid-cols-2 gap-2 pt-3">
                {user ? (
                  <>
                    <ButtonLink
                      href={user.role === "ADMIN" ? "/admin" : "/dashboard"}
                      variant="outline"
                      size="sm"
                    >
                      <User className="size-4" />
                      {user.role === "ADMIN" ? "Admin" : "Dashboard"}
                    </ButtonLink>
                    <form action="/api/auth/logout" method="post" className="contents">
                      <button
                        type="submit"
                        className="inline-flex items-center justify-center gap-2 rounded-full border border-ink-300 px-4 py-2 text-sm font-medium text-ink-700"
                      >
                        <LogOut className="size-4" />
                        Log out
                      </button>
                    </form>
                  </>
                ) : (
                  <>
                    <ButtonLink href="/login" variant="outline" size="sm">
                      Log in
                    </ButtonLink>
                    <ButtonLink href="/programs" variant="primary" size="sm">
                      Enroll Now
                    </ButtonLink>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
