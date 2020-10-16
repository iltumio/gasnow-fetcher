import React from "react";
import "./styles.css";

import { format } from "date-fns";
import useSWR from "swr";
import { toGWei } from "./utils";

import { appName, fetcherConfig } from "./config";

const fetcher = (...args) =>
  fetch(...args)
    .then((res) => res.json())
    .then(({ data }) => data);

export default function App() {
  const { data, error } = useSWR(
    `https://www.gasnow.org/api/v3/gas/price?utm_source=${appName}`,
    fetcher,
    fetcherConfig
  );

  if (!data) {
    return <div>...loading</div>;
  }

  return (
    <div className="App">
      <h1>Gasprice from Gasnow.org</h1>

      {data && <GasPriceShowcase {...data} />}
    </div>
  );
}

const GasPriceShowcase = ({ rapid, fast, standard, slow, timestamp }) => (
  <>
    <h2>{`Fetched on ${format(timestamp, "yyyy-MM-dd HH:mm:ss")}`}</h2>

    <div className="data-container">
      <div className="data-box">
        <div className="data-box-label">Rapid</div>
        <div className="data-box-value">{toGWei(rapid)}</div>
      </div>
      <div className="data-box">
        <div className="data-box-label">Fast</div>
        <div className="data-box-value">{toGWei(fast)}</div>
      </div>
      <div className="data-box">
        <div className="data-box-label">Standard</div>
        <div className="data-box-value">{toGWei(standard)}</div>
      </div>
      <div className="data-box">
        <div className="data-box-label">Slow</div>
        <div className="data-box-value">{toGWei(slow)}</div>
      </div>
    </div>
  </>
);
