"use client"
import Link from 'next/link';
import { usePathname } from 'next/navigation'
import React from 'react'
import classes from "./nav-link.module.css"

function NavLink({href, children}) {

    const path = usePathname();   //will give path that is /meals etc
  return (
    <Link href={href} className={path.startsWith(href) ? `${classes.link} ${classes.active}` : classes.link}>{children}</Link>
  )
}

export default NavLink