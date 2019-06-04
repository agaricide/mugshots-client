import { County } from '../../types/County';
import { State } from '../../types/State';

interface args<T> {
  prop: 'name' | 'state';
  records: T[];
  start?: County;
}

const startFrom = <T extends State | County>({ prop, records, start }: args<T>): T[] => {
  if (!start) return records;
  const index = records.findIndex(record => record.name === start[prop]);
  if (index === -1) return records;
  return records.slice(index);
};

const startFromState = (records: State[], start?: County) =>
  startFrom({ prop: 'state', records, start });

const startFromCounty = (records: County[], start?: County) =>
  startFrom({ prop: 'name', records, start });

export { startFromState, startFromCounty };
