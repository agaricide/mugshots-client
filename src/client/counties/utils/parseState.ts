import { State } from '../../types/State';

const parseState = (path: string): State => {
  return {
    name: path.split('/')[2],
    url: origin + path
  };
};

export default parseState;
