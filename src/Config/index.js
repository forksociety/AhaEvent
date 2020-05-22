import ConfigObj from './Config';

const Config = () => {
  const get = (key) => {
    if (key in ConfigObj) {
      return ConfigObj[key];
    }
    return null;
  };

  return {
    get,
  };
};

export default Config();
