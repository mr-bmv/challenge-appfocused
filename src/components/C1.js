import React from "react";
import withFetch from "../HOC/withFetch";

// each component wrapped in HOC to provide additional information in `props`

function C1(props) {
  const { data, errorMessage, spinner } = props
  return (
    <>
      {/* would be shown just on of value, all others are `null` */}
      { errorMessage}
      { spinner}
      { data ? <h3>{`Hi ${data}`}</h3> : null}
    </>
  );
}

export default withFetch(C1, 'c1');