import { Button, Input } from 'antd';

import { useScreens } from '@/shared';

import s from './EmployeeToolbar.module.scss';

interface IProps {
  onCreate: () => void;
}

export const EmployeeToolbar = ({ onCreate }: IProps) => {
  const { screens, isReady } = useScreens();
  const size = screens.lg ? 'large' : 'medium';

  if (!isReady) {
    return null;
  }

  return (
    <div className={s.employeeToolbar}>
      <Input placeholder="Search" size={size} className={s.searchInput} />
      <Button type="primary" size={size} onClick={onCreate}>
        Create Employee
      </Button>
    </div>
  );
};
