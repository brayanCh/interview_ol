const snakeCaseToCamelCase = (str : string) : string =>
  str.toLowerCase().replace(/([-_][a-z])/g, group =>
    group
      .toUpperCase()
      .replace('-', '')
      .replace('_', '')
  );


export default snakeCaseToCamelCase;
