import React from "react";

import styles from "./styles.module.css";

export function Marquee() {
  return (
    <section
      className={` ${styles.container}  max-w-screen-[1500px] mx-auto flex items-center gap-x-10 py-0 pl-10`}
    >
      {[1, 2].map((number) => (
        <div
          key={number}
          className="[&>span]:text-bundo-dark-green [&>span]:mx-3  [&>span]:inline-block [&>span]:text-xs [&>span]:font-[500] [&>span]:underline  [&>span]:md:mx-5 [&>span]:md:text-base"
        >
          <span>#dobusinessthebundoway</span>
          <span>#10xyourbusinesswithbundo</span>
          <span>#dontbeleftout</span>
          <span>#findvendorsonbundo</span>
          <span>#neverbecaughtclueless</span>
          <span>#searchforvendorsinseconds</span>
          <span>#businessisbetterwithbundo</span>
        </div>
      ))}
    </section>
  );
}
