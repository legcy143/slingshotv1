"use client";
import React, { useEffect, useRef, useState } from "react";
import styles from "./style.module.css";
import MovingDiv, { Posarr } from "./MovingDiv";
import Timer from "@/lib/Timer";
import BgImage from "@/component/BgImage";
import { useRouter, useSearchParams } from "next/navigation";
import io from "socket.io-client";
import { gsap } from "gsap";
const socket = io("api.gokapturehub.com", {
  transports: ["websocket"],
});
import { CountdownCircleTimer } from 'react-countdown-circle-timer'

export default function GameScreen() {
  useEffect(() => {
    console.log("joining game");
    socket.emit("join", "game");
  }, []);

  const [position, setPosition] = useState({ x: 0, y: 0 });

  const router = useRouter();
  const [width, setwidth] = useState(0);
  const [score, setscore] = useState(0);
  const [speed, setspeed] = useState(0)
  const [poppedElements, setpoppedElements] = useState<any>([]);
  const sectionRef = useRef<any>(null);
  const searchParams = useSearchParams();
  // const player = searchParams.get("player");
  const mode = searchParams.get("mode");
  const time = searchParams.get("time") || 0;

  useEffect(() => {
    // if (sectionRef.current) {
    //   const divWidth = sectionRef?.current?.offsetWidth;
    //   console.log("Width of the div:", divWidth);
    // }
    switch (mode) {
      case 'slow':
        setspeed(0)
        break;
      case 'medium':
        setspeed(0.5)
        break;
      case 'fast':
        setspeed(1)
        break;

      default:
        break;
    }
  }, []);
  useEffect(() => {
    if (score === 2000) {
      handleOnTimerEnd();
    }
  }, [score])
  // first useeffect done herer

  // function for timer end :: route to score card
  const handleOnTimerEnd = () => {
    router.push(`/scorecard?score=${score}&time=${time}&mode=${mode}`);
  };
  // shoot icon refrence
  let shootIcon = useRef<any>();

  // passing refrence to all div of image
  const refsArray: any = Posarr.map(() => useRef());

  // on shoot function
  const onShoot = () => {
    let shootIconRect = shootIcon.current.getBoundingClientRect();

    for (let i = 0; i < refsArray.length; i++) {
      console.log(Posarr[i].score)
      if (!refsArray[i]?.current) return;
      const elementRect = refsArray[i]?.current.getBoundingClientRect();
      if (
        shootIconRect.left < elementRect.right &&
        shootIconRect.right > elementRect.left &&
        shootIconRect.top < elementRect.bottom &&
        shootIconRect.bottom > elementRect.top
      ) {
        refsArray[i]?.current?.handleIsBrust();
        setpoppedElements((prev: any) => [...prev, i]);
        setscore((prevScore) => prevScore + Posarr[i].score);
        handleAnimate(Posarr[i].score, "green");
        // if all elements are popped

        break;
      } else {
        handleAnimate("missed", "red");
      }
    }
  };

  // shoot function end here

  // socket connection using useeffect 
  useEffect(() => {
    socket.on("message", (data) => {
      // console.log(data)
      if (!data.shoot) {
        setPosition({
          x: data.x,
          y: data.y,
        });
      } else {
        onShoot();
        setPosition({
          x: data.x,
          y: data.y,
        });
      }
    });
  }, []);

  // refrence of meessage that goes between the screen after each hit
  let messageRef = useRef<any>()
  const [message, setmessage] = useState("") // message 

  // handle animation of message ref
  const handleAnimate = (mess: any, colour: any) => {
    const animatedDiv = messageRef.current;
    setmessage(mess)
    gsap.to(shootIcon.current, {
      scale: 1.2,
      duration: 0.1,
      ease: 'power1.inOut',
      onComplete: () => {
        gsap.to(shootIcon.current, {
          scale: 1,
          duration: 0.1,
          ease: 'power1.inOut',
        });
      },
    });

    gsap.fromTo(
      animatedDiv,
      {
        opacity: 0,
        top: "40%",
        color: colour
      },
      {
        opacity: 1,
        duration: 0.2,
        ease: 'power1.inOut',
        onComplete: () => {
          gsap.to(animatedDiv, {
            top: "0%",
            opacity: 0,
            duration: 0.6,
            delay: 0.1, // add a delay to wait for the first animation to complete
            ease: 'power1.inOut',
          });
        },
      }
    );
  };


  return (
    <main className={styles.main_continer}>
      <BgImage />
      <nav className={styles.nav}>
        <img src="/logo.png" alt="logo" />
        <div>
          {/* <p>
            <Timer initialTime={+time} onTimerEnd={handleOnTimerEnd} />
          </p> */}
          <p>Your Score : {score}</p>
          <CountdownCircleTimer
            isPlaying
            strokeWidth={8}
            duration={+time-speed}
            size={55}
            colors={['#004777', '#F7B801', '#A30000', '#A30000']}
            colorsTime={[7, 5, 2, 0]}
            onComplete={handleOnTimerEnd}
          >
            {({ remainingTime }) => remainingTime}
          </CountdownCircleTimer>
        </div>
      </nav>
      {/* game screen section */}
      <section className={styles.games_section} ref={sectionRef}>
        {/* <button onClick={() => { setmessage("missed"); handleAnimate() }}>shoot</button> */}
        {Posarr?.map((e, i) => {
          if (poppedElements.includes(i)) return null;
          return (
            <MovingDiv
              key={i}
              duration={e.duration}
              imgSrc={e?.imgSrc}
              alt={e?.alt}
              ref={refsArray[i]}
              initx={e?.initX ?? 0}
              inity={e?.inity ?? 0}
              x1={e.x1}
              y1={e.y1}
              x2={e.x2}
              y2={e.y2}
              x3={e.x3}
              y3={e.y3}
              x4={e.x4}
              y4={e.y4}
            // isBrust={true}
            />
          );
        })}
        {/* <div className="bg-red-500 font-bold text-3xl font-serif text-center">
          missed
        </div> */}
        {/* <button className="start-btn" onClick={() => {
          handleAnimate("missed", "red")
        }}>shoot</button> */}
        <div className={styles.messageDiv}
          style={{
            opacity: 0
          }}
          ref={messageRef}>
          <i>
            {message}
          </i>
        </div>
        <img
          ref={shootIcon}
          className={styles.shootIcon}
          src="/virus/shootIcon.png"
          alt="shoot"
        // style={{
        //   position: "absolute",
        //   top: position.y + "px",
        //   left: position.x + "px",
        // }}
        />
      </section>
    </main>
  );
}
