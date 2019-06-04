import { County } from '../../types/County';

const format = (str: string): string => str.replace(/-/g, ' ');

const parseCounty = ({ href = '', origin = '' }): County | null => {
  const split = href.split('/');

  if (split.length < 4) return null;

  return {
    state: format(split[2]),
    name: format(split[3]),
    url: origin + href
  };
};

export default parseCounty;
