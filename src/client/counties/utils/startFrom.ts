import { County } from '../../types/County';
import { State } from '../../types/State';

const startFromState = (records: State[], start?: County): State[] => {
  if (!start) return records;
  const index = records.findIndex(record => record.name === start.state);
  if (index === -1) return records;
  return records.slice(index);
};

const startFromCounty = (records: County[], start?: County): County[] => {
  if (!start) return records;
  const index = records.findIndex(record => record.name === start.name);
  if (index === -1) return records;
  return records.slice(index);
};

export { startFromState, startFromCounty };
