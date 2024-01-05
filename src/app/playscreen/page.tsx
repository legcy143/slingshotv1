"use client";
import React, { useEffect, useState } from "react";
import styles from "./style.module.css";
import ShootButton from "./ShootButton";
import BgImage from "@/component/BgImage";
import socket from "socket.io-client";

const io = socket("api.gokapturehub.com", {
  transports: ["websocket"],
});

const PlayScreen = () => {
  const [GyroscopeData, setGyroscopeData] = useState({})
  useEffect(() => {
    const handleOrientation = (event: any) => {
      setGyroscopeData({
        alpha: event.alpha,
        beta: event.beta,
        gamma: event.gamma,
      });
    };

    if (window.DeviceOrientationEvent) {
      window.addEventListener('deviceorientation', handleOrientation, true);
    } else {
      console.log('Device orientation not supported');
    }

    return () => {
      window.removeEventListener('deviceorientation', handleOrientation, true);
    };
  }, []);

  // shake 
  const [isShaking, setIsShaking] = useState(false);

  useEffect(()=>{
    if(isShaking){
      io.emit("message", "game", {
        x: acceleration.x,
        y: acceleration.y,
        shoot: true,
      })
      setTimeout(()=>{
        setIsShaking(false)
      },1000)
    }
  },[isShaking])

  useEffect(() => {
    let shakeThreshold = 10; // Adjust this value as needed for sensitivity
    let lastX: any = null;
    let lastY: any = null;
    let lastZ: any = null;

    const handleMotion = (event: any) => {
      let acceleration = event.accelerationIncludingGravity;
      if (acceleration) {
        let { x, y, z } = acceleration;

        if (lastX !== null) {
          let deltaX = Math.abs(lastX - x);
          let deltaY = Math.abs(lastY - y);
          let deltaZ = Math.abs(lastZ - z);

          if (deltaX > shakeThreshold || deltaY > shakeThreshold || deltaZ > shakeThreshold) {
            setIsShaking(true);
          }
        }

        lastX = x;
        lastY = y;
        lastZ = z;
      }
    };

    if (window.DeviceMotionEvent) {
      window.addEventListener('devicemotion', handleMotion, true);
    } else {
      console.log('Device motion not supported');
    }

    return () => {
      window.removeEventListener('devicemotion', handleMotion, true);
    };
  }, []);


  const [acceleration, setAcceleration] = useState({ x: 0, y: 0, z: 0 });
  useEffect(() => {
    console.log("joining game");
    io.emit("join", "game");
  }, []);

  useEffect(() => {
    if (window.DeviceMotionEvent) {
      window.addEventListener('deviceorientationabsolute', handleMotion);

      return () => {
        window.removeEventListener("deviceorientationabsolute", handleMotion);
      };
    } else {
      console.log("DeviceMotionEvent not supported");
    }
  }, []);

  const handleMotion = (event: any) => {
    // const { accelerationIncludingGravity } = event;
    const { alpha, beta, gamma } = event;
    setAcceleration({
      z: alpha,
      x: beta,
      y: gamma,
    });
    io.emit("message", "game", {
      x: beta,
      y: gamma,
    });
  };

  return (
    <div className="flex flex-col items-center justify-center h-full w-[90%] max-w-[50rem] m-auto">
      {/* <h2>Accelerometer Data:</h2>
      <p>X-axis: {acceleration.x}</p>
      <p>Y-axis: {acceleration.y}</p>
      <p>Z-axis: {acceleration.z}</p> */}
      <BgImage />
      <img src="/logo.png" className="max-h-[10rem]" alt="logo" />
      {/* <div className="p-5 my-10 font-semibold text-xl">
      <p>hay user ,</p>
      <p>shake your phone to shoot</p>
      </div> */}
      {/* {isShaking ? <p>Device is shaking!</p> : <p>No shake detected.</p>} */}
      <button
        className="px-4 py-2 rounded-xl bg-black text-white font-bold capitalize hidden"
        onClick={() =>
          io.emit("message", "game", {
            x: acceleration.x,
            y: acceleration.y,
            shoot: true,
          })
        }
      >
        shoot
      </button>
    </div>
  );
};

export default PlayScreen;
