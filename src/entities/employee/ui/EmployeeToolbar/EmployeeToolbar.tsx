import { Button, Input } from 'antd';

import s from './EmployeeToolbar.module.scss';

interface IProps {
  onCreate: () => void;
}

export const EmployeeToolbar = ({ onCreate }: IProps) => {
  return (
    <div className={s.employeeToolbar}>
      <Input placeholder="Search" size="large" className={s.searchInput} />
      <Button type="primary" size="large" onClick={onCreate}>
        Create Employee
      </Button>
    </div>
  );
};
