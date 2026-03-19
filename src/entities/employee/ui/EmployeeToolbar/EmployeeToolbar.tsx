import { PlusOutlined } from '@ant-design/icons';
import { Button, Input } from 'antd';

import { useScreens } from '@/shared';

import s from './EmployeeToolbar.module.scss';

interface IProps {
  searchValue: string;
  onSearch: (value: string) => void;
  onCreate: () => void;
}

export const EmployeeToolbar = ({
  searchValue,
  onSearch,
  onCreate
}: IProps) => {
  const { screens, isReady } = useScreens();
  const size = screens.lg ? 'large' : 'medium';

  if (!isReady) {
    return null;
  }

  return (
    <div className={s.employeeToolbar}>
      <Input
        placeholder="Search"
        size={size}
        value={searchValue}
        onChange={e => onSearch(e.target.value)}
        allowClear
        className={s.searchInput}
      />
      <Button
        type="primary"
        size={size}
        icon={<PlusOutlined />}
        onClick={onCreate}
      >
        Create Employee
      </Button>
    </div>
  );
};
