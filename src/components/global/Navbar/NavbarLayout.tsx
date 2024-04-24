"use client"

import Link from "next/link"
import * as React from "react"

import { Icons } from "@/components/icons"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils"

const components: { title: string; href: string; description: string | React.ReactElement }[] = [
  {
    title: "A propos de moi",
    href: "/a-propos",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "Ma boite à outils",
    href: "/outils",
    description:
      "Les logiciels, et technos que j'utilise quotidiennent !",
  },
  {
    title: "Organises un appel avec moi",
    href: "/agenda",
    description:
      "30 mins pour discuter ensemble de votre projet !",
  },
  {
    title: "Mes projets",
    href: "/projets",
    description: "Visually or semantically separates content.",
  },
]

export default function NavNavbarLayout({ data }: { data: any }) {
  return (
    <nav className="sticky top-0 flex justify-between items-center gap-x-5 px-4 py-4 backdrop-blur md:px-16 md:py-5 lg:px-32 max-w-full">
      <Link href="/" legacyBehavior>
        <Icons.logo className="h-12 w-12 cursor-pointer hover:bg-accent hover:text-accent-foreground rounded-md" />
      </Link>
      <div className="justify-end">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>WebBreizhDev</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-3 p-4 md:w-[400px] md:grid-cols-2 lg:w-[500px] ">
                  {components.map((component) => (
                    <ListItem
                      key={component.title}
                      title={component.title}
                      href={component.href}
                    >
                      {component.description}
                    </ListItem>
                  ))}
                  {/* <SocialsItems /> */}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger>Blog</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-3 p-6 justify-stretch md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                  <li className="row-span-4">
                    <NavigationMenuLink asChild>
                      <a
                        className="flex h-full w-full select-none flex-col justify-start rounded-md bg-gradient-to-b from-muted/50 to-muted px-6 no-underline outline-none focus:shadow-md"
                        href="/"
                      >
                        <div className="mb-2 mt-4 text-lg font-medium">
                          WebBreizh.dev
                        </div>
                        <p className="text-sm leading-tight text-muted-foreground">
                          Au-delà des Écrans: Les Secrets du Développement Web en 2024 !
                        </p>
                      </a>
                    </NavigationMenuLink>
                  </li>
                  <div className="row-span-2">
                    <ListItem href="/blog" title="Voir le blog">
                      Mon petit îlot de sable dans l&apos;océan du web.
                    </ListItem>
                  </div>
                  <div className="row-span-2">
                    <ListItem href="/blog/snippets" title="Code Snippets">
                      Mes astuces, et des bouts de code. Petits, mais Puissants !
                    </ListItem>
                  </div>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/docs" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Télécharger mon CV
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </nav>
  )
}

const ListItem = React.forwardRef<React.ElementRef<"a">, React.ComponentPropsWithoutRef<"a">>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"

const SocialsItems = () => {
  return (
    <div className="col-span-2 flex justify-end">
      <li className="w-full items-end">
        <div className="text-sm font-medium leading-none px-3">Mes réseaux</div>
        <div className="flex gap-x-3 text-red-600 p-3">
          <NavigationMenuLink asChild>
            <a
              className={cn(
                "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
              )}
            >
              <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                <Icons.gitHub className="h-5 w-5" />
              </p>
            </a>
          </NavigationMenuLink>
          <NavigationMenuLink asChild>
            <a
              className={cn(
                "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
              )}
            >
              <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                <Icons.apple className="h-5 w-5" />
              </p>
            </a>
          </NavigationMenuLink>
          <NavigationMenuLink asChild>
            <a
              className={cn(
                "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
              )}
            >
              <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                <Icons.twitter className="h-5 w-5" />
              </p>
            </a>
          </NavigationMenuLink>
        </div>
      </li>
    </div>
  )
}
SocialsItems.displayName = "SocialsItems"