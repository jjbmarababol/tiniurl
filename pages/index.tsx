import Head from "next/head";
import Layout, { name } from "../components/layout";
import { post } from "../lib/requests";
import utilStyles from "../styles/utils.module.scss";
import layoutStyles from "../styles/layout.module.css";

import { ShortlinkFormat } from "../lib/shortlinks";
import { useEffect, useState } from "react";
import Shortlink from "../components/shortlink";
import { shortlinkAPI } from "../hooks/use-shortlinks";

type Action = "encode" | "decode";

export default function Home() {
  const { useShortlinks } = shortlinkAPI;
  const { shortlinks } = useShortlinks();
  const [destination, setDestination] = useState<string>("");
  const [action, setAction] = useState<Action>("encode");
  const [shortlink, setShortlink] = useState<ShortlinkFormat>({
    id: "",
    link: "",
    hostname: "",
  });
  const createShortlink = async (type: Action) => {
    switch (type) {
      case "decode":
        const decodedLink = await post("/api/urls/encode", {
          destination,
        });
        setShortlink(decodedLink);
        break;
      case "encode":
      default:
        const encodedLink = await post("/api/urls/encode", {
          destination,
        });
        setShortlink(encodedLink);
        break;
    }
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
            onKeyUp={(e) => {
              setDestination(e.currentTarget.value);
            }}
          />
          <div className={utilStyles.line}></div>
        </div>
        <div className={utilStyles.buttons}>
          <button
            className={utilStyles.button}
            onClick={() => createShortlink(action)}
          >
            {action}
          </button>
        </div>
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
