'use client'

import React from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Link, Button, Avatar, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/react";
import AcmeLogo from "@/public/hr-logo.jpg";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react"
import { usePathname } from 'next/navigation';

export default function App() {
  const { data: session, status } = useSession()
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const pathname = usePathname();

  const menuItems = [
    { name: "Home", path: "/" },
    { name: "Features", path: "/features" },
    { name: "Customers", path: "/customers" },
    { name: "Integrations", path: "/integrations" },
  ];

  return (
    <Navbar 
      onMenuOpenChange={setIsMenuOpen} 
      className="bg-black border-b border-gray-800"
      maxWidth="full"
    >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <Image src={AcmeLogo} height={40} width={40} alt="AcmeLogo" className="w-10 h-10" />
          <p className="font-bold text-inherit ml-2 text-white">
          {session?.user?.name || "Tech magic"}
          </p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {menuItems.map((item) => (
          <NavbarItem key={item.path} isActive={pathname === item.path}>
            <Link
              color={pathname === item.path ? "primary" : "foreground"}
              href={item.path}
              aria-current={pathname === item.path ? "page" : undefined}
              className="text-white hover:text-blue-400 transition-colors"
            >
              {item.name}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      {status === "authenticated" ? (
        <NavbarContent as="div" justify="end">
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                isBordered
                as="button"
                className="transition-transform"
                color="primary"
                name={session?.user?.name || "User"}
                size="sm"
                src={session?.user?.image || "https://i.pravatar.cc/150"}
              />
            </DropdownTrigger>
            <DropdownMenu 
              aria-label="Profile Actions" 
              variant="flat"
              className="bg-gray-900 text-white border border-gray-800"
            >
              <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-semibold">Signed in as {session?.user?.name}</p>
                <p className="font-semibold">{session?.user?.email}</p>
              </DropdownItem>
              <DropdownItem key="settings">My Settings</DropdownItem>
              <DropdownItem key="team_settings">Team Settings</DropdownItem>
              <DropdownItem key="analytics">Analytics</DropdownItem>
              <DropdownItem key="system">System</DropdownItem>
              <DropdownItem key="configurations">Configurations</DropdownItem>
              <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
              <DropdownItem key="logout" color="danger" onClick={() => signOut()}>
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarContent>
      ) : (
        <NavbarContent justify="end">
          <NavbarItem className="hidden lg:flex">
            <Link href="/api/auth/signin" className="text-white hover:text-blue-400 transition-colors">Login</Link>
          </NavbarItem>
          <NavbarItem>
            <Button as={Link} color="primary" href="/api/auth/signin" variant="flat">
              Sign Up
            </Button>
          </NavbarItem>
        </NavbarContent>
      )}

      <NavbarMenu className="bg-gray-900 bg-opacity-95 backdrop-blur-md">
        {menuItems.map((item) => (
          <NavbarMenuItem key={item.path}>
            <Link
              color={pathname === item.path ? "primary" : "foreground"}
              className="w-full text-white hover:text-blue-400 transition-colors"
              href={item.path}
              size="lg"
            >
              {item.name}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}

