import { atom } from 'recoil';

type SampleState = {
  count: number,
};

export const sampleState = atom<SampleState>({
  key: 'sample state',
  default: { count: 0 },
});