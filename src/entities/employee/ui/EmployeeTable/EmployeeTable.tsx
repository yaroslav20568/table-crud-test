import { useMemo } from 'react';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Space } from 'antd';
import type { ColumnsType } from 'antd/es/table';

import { type IEmployee } from '@/entities/employee/model';

import { CustomTable, DateUtils } from '@/shared';

interface IProps {
  employees: Array<IEmployee>;
  onDeleteEmployee: (id: string) => void;
}

export const EmployeeTable = ({ employees, onDeleteEmployee }: IProps) => {
  const columns: ColumnsType<IEmployee> = useMemo(() => {
    return [
      {
        title: 'ФИО',
        dataIndex: 'fullName',
        key: 'fullName',
        sorter: (a, b) => a.fullName.localeCompare(b.fullName)
      },
      {
        title: 'Дата приема',
        dataIndex: 'startDate',
        key: 'startDate',
        sorter: (a, b) => a.startDate.localeCompare(b.startDate),
        render: (date: IEmployee['startDate']) => DateUtils.format(date)
      },
      {
        title: 'Зарплата',
        dataIndex: 'salary',
        key: 'salary',
        sorter: (a, b) => a.salary - b.salary,
        render: (salary: IEmployee['salary']) => `${salary.toLocaleString()} ₽`
      },
      {
        title: 'Формат',
        dataIndex: 'isRemote',
        key: 'isRemote',
        sorter: (a, b) => Number(a.isRemote) - Number(b.isRemote),
        render: (isRemote: IEmployee['isRemote']) => (
          <span style={{ color: isRemote ? 'green' : 'blue' }}>
            {isRemote ? 'Удаленка' : 'Офис'}
          </span>
        )
      },
      {
        title: 'Действия',
        key: 'actions',
        render: (_, record) => (
          <Space size="middle">
            <Button
              type="text"
              icon={<EditOutlined />}
              onClick={() => console.log('Edit', record.id)}
            />
            <Button
              type="text"
              danger
              icon={<DeleteOutlined />}
              onClick={() => onDeleteEmployee(record.id)}
            />
          </Space>
        )
      }
    ];
  }, [onDeleteEmployee]);

  return <CustomTable<IEmployee> dataSource={employees} columns={columns} />;
};
