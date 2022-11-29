import React from "react";
import Link from "next/link";
import styles from "../styles/AppShell.module.css";
import { Text, NavLink } from "@mantine/core";

export const NavLinkCustom = ({ href, Icon, label }) => {
  return (
    <Link href={href}>
      <div className={styles.nav__links}>
        <Icon color="white" size="3em" />
        <Text className={styles.nav__text}>{label}</Text>
      </div>
    </Link>
  );
};
