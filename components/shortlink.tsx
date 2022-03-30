import Link from "next/link";
import styles from "../styles/links.module.css";

interface ShortlinkProps {
  id: string;
  link: string;
  hostname: string;
}

export default function Shortlink({ id, link, hostname }: ShortlinkProps) {
  return (
    <div className={styles.shortlink__container}>
      <Link href={id} passHref>
        <a
          target="_blank"
          rel="noopener noreferrer"
          className={styles.shortlink__link}
        >
          {link}
        </a>
      </Link>
      <div className={styles.shortlink__hostname}>{hostname}</div>
    </div>
  );
}
