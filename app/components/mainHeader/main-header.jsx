

import Link from 'next/link'
import logo from "@/assets/logo.png"
import classes from '@/app/components/mainHeader/main-header.module.css'
import React from 'react'
import Image from 'next/image'
import MainHeaderBackground from './main-header-background'
import NavLink from './nav-link'


function MainHeader() {

  return (
    <>
    <MainHeaderBackground />
    <header className={classes.header}>
        <Link className={classes.logo} href="/">
            <Image src={logo} alt='yoo'priority/>
            NEXTLEVEL FOOD
        </Link>

        <nav className={classes.nav}>
            <ul>
                <li>
                    <NavLink href="/meals">Browse Meals</NavLink>
                </li>
                <li>
                    <NavLink href='/community'>Browse Community</NavLink> {/* here we have used path === '/community' as we don't have nested page/path in community */}
                </li>
            </ul>
        </nav>
    </header>
    </>
  )
}

export default MainHeader