import { smMeta } from '../hypotheses/sm';

export interface Hypothesis {
  id: number;
  path: string;
  title: string;
  description: string;
  status: 'active' | 'soon';
}

/** Registry of all hypotheses shown on the hub. */
export const hypotheses: Hypothesis[] = [smMeta];
