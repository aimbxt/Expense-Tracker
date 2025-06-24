import { useState } from 'react'
import './SideBar.css'

export default function SideBar() {
    return (
        <>
            <div className="sidebar-main">
                <h1>Account</h1>
                <HomeButton />
                <HomeButton />
                <HomeButton />
                <HomeButton />
                <HomeButton />
                <HomeButton />
                hi
            </div>
        </>
    )
}

function HomeButton() {
    return (
        <button className="button">
            Home
        </button>
    )
}