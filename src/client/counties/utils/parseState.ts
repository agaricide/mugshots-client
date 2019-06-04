import { State } from '../../types/State';

const parseState = ({ href = '', origin = '' }): State => {
  return {
    name: href.split('/')[2],
    url: origin + href
  };
};

export default parseState;
