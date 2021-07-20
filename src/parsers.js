import yaml from 'js-yaml';

export default (data, format) => {
  switch (format) {
    case '.json':
      return JSON.parse(data);
    case '.yml':
    case '.yaml':
      return yaml.safeLoad(data);
    default:
      throw new Error(`Wrong format: '${format}'`);
  }
};
