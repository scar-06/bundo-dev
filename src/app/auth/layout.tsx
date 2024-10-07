"use client";

import React from "react";

import useSignUpAnalytics from "@/hooks/useSignUpAnalytics";

import styles from "./_components/styles.module.css";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useSignUpAnalytics();

  return (
    <div className={styles.wrapper}>
      <main className=" w-full font-tv2SansDisplay">{children}</main>
    </div>
  );
}
