"use client"
import BgImage from '@/component/BgImage'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

export default function Home() {


  return (
    <div className='flex flex-col gap-10 items-center justify-center h-full w-full max-w-[100rem]
     md:flex-row p-5'
    >
      <BgImage />
      <div className='absolute md:relative' >
        <img src="/logo.png" className='w-[90%] max-w-[40rem]' alt="img" />
      </div>
      <StartForm />

      {/* Home is
      <Link href="/gameboard">gameboard</Link>
      <Link href="/playscreen">playscreen</Link> */}

    </div>
  )
}


const StartForm = () => {
  const router = useRouter();
  const [player, setplayer] = useState("")
  const [time, setTime] = useState("")
  // let playerList = [
  //   { _id: 1, value: "prince" },
  //   { _id: 2, value: "sid" },
  //   { _id: 3, value: "falana dihmkana" }
  // ]
  return (
    <main className='z-10 w-full max-w-[28rem] p-4 py-10 md:p-10 bg-opacity-20 backdrop-blur-md rounded bg-black flex flex-col gap-8 items-center justify-center text-xl md:bg-white md:bg-opacity-100'
    >
      <p className='text-3xl font-semibold'>Start Game </p>
      {/* <select className="bg-gray-100 w-full text-gray-800 border-0 rounded-md p-5 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150 capitalize"
        id="product"
        onChange={(e) => {
          setplayer(e.target.value)
        }}
      >
        <option value="None" className='hidden'>Choose player</option>
        {playerList?.map(e => <option
        className='capitalize'
          key={e._id}
          value={e.value}>
          {e.value}
        </option>
        )}
      </select> */}
      <input placeholder="Player Name" className="bg-gray-100 text-gray-800 border-0 rounded-md p-5 w-full focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150" type="text" onChange={(e) => {
        setplayer(e.target.value)
      }} />
      <input placeholder="Time in second (s)" className="bg-gray-100 text-gray-800 border-0 rounded-md p-5 w-full focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150" type="number" onChange={(e) => {
        setTime(e.target.value)
      }} />
      <p className='text-red-500 w-[100%] p-2 capitalize bg-white rounded bg-opacity-90'>* All fields are required <br /> * time is must be in number <br />* time is in second</p>

      <button className="start-btn" onClick={() => {
        try {
          if (player.length > 0 && time.length > 0) {
            router.push(`/gameboard?player=${player}&time=${+time}`)
          }
        } catch (error) {
          window.location.reload()
        }
      }}>
        start
      </button>


    </main>
  )
}