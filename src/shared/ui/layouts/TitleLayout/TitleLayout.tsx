import type { ReactNode } from 'react';

import s from './TitleLayout.module.scss';

interface IProps {
  children: ReactNode;
  title: string;
}

export const TitleLayout = ({ children, title }: IProps) => {
  return (
    <div className={s.titleLayout}>
      <h2 className={s.title}>{title}</h2>
      {children}
    </div>
  );
};
