import React from "react";
import withFetch from "../HOC/withFetch";

// each component wrapped in HOC to provide additional information in `props`

function C3(props) {
  const { data, errorMessage, spinner } = props
  return (
    <>
      {/* would be shown just on of value, all other are `null` */}
      { errorMessage}
      { spinner}
      {data ? <h3>Charlie {data} Tango</h3> : null}
    </>
  );
}

export default withFetch(C3, 'c3');