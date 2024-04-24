'use client'
import Link from 'next/link'

import { Icons } from '@/components/icons'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { cn } from '@/lib/utils'
import type { SettingsPayload } from '@/types'

interface FooterProps {
  data: SettingsPayload
}
export default function Footer(props: FooterProps) {
  const { data } = props
  const footer = data?.footer
  return (

    <footer className="bg-primary-foreground text-primary py-6 font-sans">
      <div className="flex flex-col md:flex-row justify-between items-center gap-x-5 px-4 py-4 backdrop-blur md:px-16 md:py-5 lg:px-32 max-w-full">
        <Link href={'/'} className="flex items-center space-x-2 mb-4 md:mb-0 cursor-pointer hover:bg-accent hover:text-accent-foreground rounded-md p-2">
          <Icons.logo className='h-10 w-10 aspect-square' /><span className='font-semibold'>BreizhDev © 2024</span>
        </Link>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link href="/docs" legacyBehavior passHref>
                <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), 'bg-transparent')}>
                  Contact
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/docs" legacyBehavior passHref>
                <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), 'bg-transparent')}>
                  Privacy
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/docs" legacyBehavior passHref>
                <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), 'bg-transparent')}>
                  Terms & conditions
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </footer >
  )
}