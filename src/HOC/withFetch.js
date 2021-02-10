import React, { useEffect } from 'react';
// components
import ErrorIndicator from '../components/error-indicator';
import Loading from '../components/loading';
//  context
import { useAppfocusedContext } from '../context/AppfocusedContext';
// help functions
import genQuery from '../utils/genQuery';

// There are was a lot of repeatable code inside each components and to follow
// DRY principe these code was replace in HOC withFetch
// It sate wrapped components with new props
// Just HOC works with lifecycle of components
// Just HOC works with our custom context to catch data
const withFetch = (Wrapped, component) => {
  return (props) => {
    const query = genQuery(props.timeRange, component, Math.random());

    const { state, fetchComponent } = useAppfocusedContext()

    useEffect(() => {
      const interval = setInterval(() => fetchComponent(component, query), props.refreshInterval_Secs * 1000);
      return () => {
        clearInterval(interval);
      };
      // eslint-disable-next-line
    }, []);

    // get data for each individual `component`
    const { data, loading, error } = state[component];
    // two variables would be null and just one would be NOT null
    const hasData = !(loading || error);
    const errorMessage = error ? <ErrorIndicator /> : null;
    const spinner = loading ? <Loading /> : null;
    const appfocusedData = hasData ? data.name : null;

    // return result of work
    return (
      <Wrapped {...props}
        spinner={spinner}
        errorMessage={errorMessage}
        data={appfocusedData} />
    );
  }
};

export default withFetch;