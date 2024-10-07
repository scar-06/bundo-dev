import React from "react";
import Image from "next/image";
import { logo } from "@/assets";

import styles from "./pageLoader.module.css";

function PageLoader() {
  return (
    <div className={styles.page_loader_container}>
      <div className={styles.image_wrapper}>
        <div className={styles.main_logo}>
          <Image src={logo} alt="logo" className=" animate-pulse" />
        </div>
        <div className={styles.loader} />
      </div>
    </div>
  );
}

export default PageLoader;

// components/loading.tsx
