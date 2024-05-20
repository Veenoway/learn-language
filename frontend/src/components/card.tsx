import { cn } from "@/utils/cn";
import { MotionValue, motion } from "framer-motion";
import { useState } from "react";
import Tilt from "react-parallax-tilt";

type CardProps = {
  translate: MotionValue;
  position: string;
  delay: number;
};

export const Card = ({ translate, position, delay }: CardProps) => {
  const [isFliped, setIsFliped] = useState(false);
  const [turned, setTurned] = useState(false);

  const options = {
    glareEnable: true,
    glareMaxOpacity: 0.4,
    glareColor: "#ccc4fc",
    glarePosition: "all",
    glareBorderRadius: "40px",
    perspective: 1200,
    scale: 1.1,
    gyroscope: false,
    transitionSpeed: 2000,
    flipHorizontally: isFliped,
    tiltReverse: false,
  };

  return (
    <motion.div style={{ [position]: translate }} transition={{ delay }}>
      <Tilt
        {...(options as any)}
        className={cn(
          "tiltcard bg-cover bg-[#FFB200] rounded-2xl relative parallax-effect-glare-scale h-[500px] w-[350px]"
        )}
      >
        <div
          onClick={() => {
            setIsFliped((prev) => !prev);
          }}
          className="w-full relative h-full flex justify-center items-center idd"
          // onClick={() => {
          //   setTurned(true);
          //   setIsFliped((prev) => !prev);
          //   setTimeout(() => setTurned(false), isFliped ? 1000 : 200);
          // }}
        >
          {isFliped ? (
            <div
              className="z-1 rounded-[10px] scale-x-[-1] bg-[url('/chinese-bg.jpeg')] bg-cover flex flex-col justify-center items-center"
              style={{
                width: "calc(100% - 20px)",
                height: "calc(100% - 20px)",
              }}
            >
              <h1 className="text-[80px] text-white">Jiù</h1>
              <div className="w-[40px] h-[2px] bg-white my-2.5" />
              <h1 className="text-[80px] text-white">Donc</h1>
            </div>
          ) : (
            <div
              className="z-1 rounded-[10px] bg-[url('/chinese-bg.jpeg')] bg-cover flex justify-center items-center"
              style={{
                width: "calc(100% - 20px)",
                height: "calc(100% - 20px)",
              }}
            >
              <h1 className="text-[180px] text-white">就</h1>
            </div>
          )}
        </div>
      </Tilt>
    </motion.div>
  );
};
