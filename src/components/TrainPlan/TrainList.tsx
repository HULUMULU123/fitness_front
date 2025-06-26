import React from "react";
import TrainItem from "./TrainItem";
import LoadingSpinner from "../LoadingSpinner";

export default function TrainList({ weekTraings }) {
  return (
    <ul style={{ width: "99%", padding: 0 }}>
      {weekTraings ? (
        weekTraings.map((item) => <TrainItem training={item} key={item.id} />)
      ) : (
        <LoadingSpinner />
      )}
      {/* <TrainItem number="1" />
      <TrainItem number="2" />
      <TrainItem number="3" />
      <TrainItem number="4" />
      <TrainItem number="5" />
      <TrainItem number="6" />
      <TrainItem number="7" />
      <TrainItem number="8" />
      <TrainItem number="9" />
      <TrainItem number="1" />
      <TrainItem number="2" />
      <TrainItem number="3" />
      <TrainItem number="4" />
      <TrainItem number="5" />
      <TrainItem number="6" />
      <TrainItem number="7" />
      <TrainItem number="8" />
      <TrainItem number="9" /> */}
    </ul>
  );
}
