function genQuery(timeRange, componentName, seed) {
  return `SELECT ${timeRange} WHERE c = ${componentName} AND x = ${
    // eslint-disable-next-line
    seed % 7 == 0 ? "true" : "false"
    }`;
}

export default genQuery;
