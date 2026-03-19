import { useMemo } from 'react';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Space } from 'antd';
import type { ColumnsType } from 'antd/es/table';

import { employeesData } from '@/entities/employee/const';
import type { IEmployee } from '@/entities/employee/model';

import { CustomTable, DateUtils } from '@/shared';

export const EmployeeTable = () => {
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
              onClick={() => console.log('Delete', record.id)}
            />
          </Space>
        )
      }
    ];
  }, []);

  return (
    <CustomTable<IEmployee> dataSource={employeesData} columns={columns} />
  );
};
