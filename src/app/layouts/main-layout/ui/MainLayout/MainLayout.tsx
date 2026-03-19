import type { ReactNode } from 'react';

import s from './MainLayout.module.scss';

interface IProps {
  children: ReactNode;
}

export const MainLayout = ({ children }: IProps) => {
  return <main className={s.mainLayout}>{children}</main>;
};
