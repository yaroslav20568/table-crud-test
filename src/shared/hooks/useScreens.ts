import { Grid } from 'antd';

const { useBreakpoint } = Grid;

export const useScreens = () => {
  const screens = useBreakpoint();
  const isReady = Object.keys(screens).length > 0;

  return { screens, isReady };
};
