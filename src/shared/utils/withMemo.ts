import { type ComponentType, memo } from 'react';

export const withMemo = <T extends ComponentType<any>>(Component: T) => {
  return memo(Component) as unknown as T;
};
