import { storePath } from '../constants/paths';

export interface Hypothesis {
  id: number;
  path: string;
  title: string;
  description: string;
  status: 'active' | 'soon';
}

export const hypotheses: Hypothesis[] = [
  {
    id: 1,
    path: storePath(),
    title: 'Магазин СМ',
    description: 'Текущий функционал интернет-магазина Строймаркет: каталог, категории, заявка и звонок.',
    status: 'active',
  },
];
