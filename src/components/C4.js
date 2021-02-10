import React from "react";
import withFetch from "../HOC/withFetch";

// each component wrapped in HOC to provide additional information in `props`

function C4(props) {
  const { data, errorMessage, spinner } = props
  return (
    <>
      {/* would be shown just on of value, all other are `null` */}
      { errorMessage}
      { spinner}
      {data ? <h3>A fox jumped {data}</h3> : null}
    </>
  );
}

export default withFetch(C4, 'c4');