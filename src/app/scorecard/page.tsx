"use client"
import React, { useEffect, useRef } from 'react'
import style from "./style.module.css"
import { gsap } from 'gsap';
import { useRouter, useSearchParams } from 'next/navigation';
import BgImage from '@/component/BgImage';

export default function Scorecard() {

    const router = useRouter()
    const searchParams = useSearchParams()
    const mode = searchParams.get('mode')
    const score = searchParams.get('score')
    const time = searchParams.get('time')
    return (
        <main className='flex flex-col items-center justify-center h-[100vh]'>
            <BgImage />
            <p className={style.textT}>To Treat anemia <br /> without side effects</p>
            <div className={style.Tcontainer}>
                <img className={style.img1} src="/logo.png" alt="logo" />
                <img className={style.img2} src="/medicine/syrup.png" alt="syrup" />
            </div>
            <section className={style.cardBodyT}>
                <div className={style.scoreCardT}>
                    <h1 className='text-xl capitalize font-semibold'>your score</h1>
                    <h1 className='text-5xl capitalize font-semibold'>{score}</h1>
                    <img
                        src="/virus/shootIcon.png"
                        alt="shoot"
                    />
                    <div className={style.btns}>
                        <button className={style.retry} onClick={() => {
                            router.push("/");
                        }}
                        >Home</button>
                        {/* <button className={style.retry} onClick={() => {
                            router.back();
                        }}
                        >Retry</button> */}
                        {/* <button className={`${style.retry} px-5`}>home</button> */}
                    </div>
                </div>
            </section>
        </main>
    )
}
