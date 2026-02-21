import Link from "next/link";
import styles from "./Button.module.scss";

interface ButtonProps {
  text: string;
  href: string;
  variant?: "primary" | "secondary";
  className?: string;
  iconSrc?: string;
  iconAlt?: string;
  iconClassName?: string;
}

export default function Button({
  text,
  href,
  variant = "primary",
  className = "",
  iconSrc,
  iconAlt = "",
  iconClassName = "",
}: ButtonProps) {
  return (
    <Link
      href={href}
      className={`${
        variant === "primary" ? styles.primary : styles.secondary
      } ${className}`}
    >
      <span>{text}</span>
      {iconSrc && (
        <img
          src={iconSrc}
          alt={iconAlt}
          className={`${styles.icon} ${iconClassName}`}
        />
      )}
    </Link>
  );
}
