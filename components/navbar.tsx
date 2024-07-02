"use client";
import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@nextui-org/navbar";
import { Link } from "@nextui-org/link";
import { Image } from "@nextui-org/image";
import { link as linkStyles } from "@nextui-org/theme";
import NextLink from "next/link";
import clsx from "clsx";

import * as Modal from "@nextui-org/modal";
import { Checkbox } from "@nextui-org/checkbox";
import { Input } from "@nextui-org/input";

import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import {
  DiscordIcon,
} from "@/components/icons";
import React from "react";
import { Button } from "@nextui-org/button";
import { useDisclosure } from "@nextui-org/modal";

import axios from "axios";
import { Avatar } from "@nextui-org/avatar";
import { useAuth } from "./context/auth-context";

import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem
} from "@nextui-org/dropdown";

import { FormEvent } from "react";

export const Navbar = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { user, login, logout } = useAuth();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [rememberMe, setRememberMe] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const handleSubmit = async (event: FormEvent, onClose: () => void) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      await login(email, password, rememberMe);
      onClose();
    } catch (error) {
      console.error('Login error:', error);
    }
    setIsLoading(false);
  };

  return (
    <>
      <NextUINavbar onMenuOpenChange={setIsMenuOpen} maxWidth="xl">
        <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
          <NavbarBrand as="li" className="gap-3 max-w-fit">
            <NextLink className="flex justify-start items-center gap-1" href="/">
              <Image className="origin-center hover:rotate-[-360deg]" isBlurred src="https://screwltd.com/img/editor.png" width={28} height={28} />
              <p className="font-bold">SCREW: EDITOR</p>
            </NextLink>
          </NavbarBrand>
          <ul className="hidden lg:flex gap-4 justify-start ml-2">
            {siteConfig.navItems.map((item) => (
              <NavbarItem key={item.href}>
                <NextLink
                  className={clsx(
                    linkStyles({ color: "foreground" }),
                    "data-[active=true]:text-secondary data-[active=true]:font-medium",
                  )}
                  color="foreground"
                  href={item.href}
                >
                  {item.label}
                </NextLink>
              </NavbarItem>
            ))}
          </ul>
        </NavbarContent>

        <NavbarContent
          className="sm:flex basis-1/5 sm:basis-full"
          justify="end"
        >
          <NavbarItem>
            {user ? (
              <Dropdown backdrop="opaque">
                <DropdownTrigger>
                  <Avatar isBordered color="secondary" src={user.picture} className="w-8 h-8 text-tiny cursor-pointer" />
                </DropdownTrigger>
                <DropdownMenu variant="faded" color="secondary" aria-label="Static Actions">
                  <DropdownSection showDivider>
                    <DropdownItem href='/profile'>
                      Profile
                    </DropdownItem>
                    <DropdownItem isDisabled>
                      Payments
                    </DropdownItem>
                    <DropdownItem isDisabled>
                      My works
                    </DropdownItem>
                    <DropdownItem isDisabled>
                      Settings
                    </DropdownItem>
                  </DropdownSection>
                  <DropdownSection>
                    <DropdownItem color="danger" className="text-danger" onClick={() => logout()}>
                      Logout
                    </DropdownItem>
                  </DropdownSection>
                </DropdownMenu>
              </Dropdown>
            ) : (
              <Button onClick={onOpen} color="secondary" variant="flat">
                Connect
              </Button>
            )}
          </NavbarItem>
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="sm:hidden"
          />
          <NavbarItem className="hidden sm:flex gap-3">
            <Link isExternal aria-label="Discord" href={siteConfig.links.discord}>
              <DiscordIcon className="text-default-500 cursor-pointer" />
            </Link>
          </NavbarItem>
          <NavbarItem className="hidden sm:flex gap-3">
            <ThemeSwitch />
          </NavbarItem>
        </NavbarContent>

        <NavbarMenu>
          {siteConfig.navItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                color="foreground"
                className="w-full"
                href={item.href}
                size="lg"
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
      </NextUINavbar>

      <Modal.Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="bottom-center"
        backdrop="blur"
      >
        <Modal.ModalContent>
          {(onClose) => (
            <>
              <Modal.ModalHeader className="flex flex-col gap-1">Log in</Modal.ModalHeader>
              <form onSubmit={(event) => handleSubmit(event, onClose)}>
                <Modal.ModalBody>
                  <Input
                    label="Email"
                    variant="flat"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <Input
                    label="Password"
                    type="password"
                    variant="flat"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <div className="flex py-2 px-1 justify-between">
                    <Checkbox
                      color="secondary"
                      checked={rememberMe}
                      onChange={() => setRememberMe(!rememberMe)}
                      classNames={{
                        label: "text-small",
                      }}
                    >
                      Remember me
                    </Checkbox>
                    <Link color="secondary" href="#" size="sm">
                      Forgot password?
                    </Link>
                  </div>
                </Modal.ModalBody>
                <Modal.ModalFooter>
                  <Button color="danger" variant="flat" onPress={onClose}>
                    Close
                  </Button>
                  <Button isLoading={isLoading} color="secondary" type="submit">
                    Sign in
                  </Button>
                </Modal.ModalFooter>
              </form>
            </>
          )}
        </Modal.ModalContent>
      </Modal.Modal>
    </>
  );
};
