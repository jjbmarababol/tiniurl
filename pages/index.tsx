import Head from 'next/head';
import Layout, { name } from '../components/layout';
import { isValidHttpUrl, post } from '../lib/requests';
import utilStyles from '../styles/utils.module.scss';
import layoutStyles from '../styles/layout.module.scss';
import { useMemo, useState } from 'react';
import Shortlink from '../components/shortlink';
import { shortlinkAPI } from '../hooks/use-shortlinks';

type Action = 'encode' | 'decode';
export default function Home() {
  const { useShortlinks } = shortlinkAPI;
  const { shortlinks } = useShortlinks();
  const [destination, setDestination] = useState<string>('');
  // const [action, setAction] = useState<Action>("encode");
  const [link, setLink] = useState<string>('');

  const encodeType: Action = useMemo(() => {
    return destination.includes(process.env.NEXT_PUBLIC_SHORTLINK_BASE_URL)
      ? 'decode'
      : 'encode';
  }, [destination]);

  const createShortlink = async () => {
    if (
      isValidHttpUrl(destination) ||
      destination.includes(process.env.NEXT_PUBLIC_SHORTLINK_BASE_URL)
    ) {
      const { link } = await post(`/api/urls/${encodeType}`, {
        destination,
      });
      setLink(link);
    }
  };

  const clearShortlinks = async () => {
    await fetch('/api/urls/clear');
    setLink('');
  };

  return (
    <Layout>
      <Head>
        <title>{name}</title>
      </Head>
      <div className={layoutStyles.section}>
        <h1 className={utilStyles.heading2Xl}>{name}</h1>
        <div className={utilStyles.field}>
          <input
            className={utilStyles.input}
            onKeyUp={e => {
              setDestination(e.currentTarget.value);
            }}
          />
          <div className={utilStyles.line}></div>
        </div>
        <div className={utilStyles.buttons}>
          <button
            className={utilStyles.button}
            onClick={() => createShortlink()}
          >
            {encodeType}
          </button>
          <button
            className={utilStyles.button}
            onClick={() => clearShortlinks()}
          >
            clear
          </button>
        </div>
        {link && <div className={utilStyles.result}>{link}</div>}
      </div>
      <div className={layoutStyles.section}>
        {shortlinks &&
          shortlinks.map(({ id, link, hostname }) => (
            <Shortlink
              key={id}
              id={id}
              hostname={hostname}
              link={link}
            ></Shortlink>
          ))}
      </div>
    </Layout>
  );
}
