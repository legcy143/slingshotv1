"use client"
import React, { useEffect, useRef } from 'react'
import style from "./style.module.css"
import { gsap } from 'gsap';

export default function Scorecard() {
    let logoRef = useRef<any>()
    let syrupRef = useRef<any>()
    return (
        <main className='flex flex-col  h-[100vh]'>
            <p className={style.textT}>To Treat anemia <br /> without side effects</p>
            <div className={style.Tcontainer}>
                <img  className={style.img1} src="/logo.png" alt="logo" />
                <img className={style.img2} src="/medicine/syrup.png" alt="syrup" />
            </div>
        </main>
    )
}
