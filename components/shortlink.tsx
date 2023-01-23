import Link from 'next/link';
import { post } from '../lib/requests';
import styles from '../styles/links.module.scss';
import { ShortlinkProps } from '../models';

export default function Shortlink({ id, link, hostname }: ShortlinkProps) {
  const removeShortlink = async () => {
    await post('/api/urls/remove', { id });
  };
  return (
    <div className={styles.shortlink__container}>
      <div>
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
      <div>
        <button
          className={styles.shortlink__button}
          onClick={() => removeShortlink()}
        >
          &#10006;
        </button>
      </div>
    </div>
  );
}
