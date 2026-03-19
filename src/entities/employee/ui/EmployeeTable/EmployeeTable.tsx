import { useMemo } from 'react';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Space } from 'antd';
import type { ColumnsType } from 'antd/es/table';

import { type IEmployee } from '@/entities/employee/model';

import { CustomTable, DateUtils } from '@/shared';

interface IProps {
  employees: Array<IEmployee>;
  onEditEmployee: (employee: IEmployee) => void;
  onDeleteEmployee: (id: string) => void;
}

export const EmployeeTable = ({
  employees,
  onEditEmployee,
  onDeleteEmployee
}: IProps) => {
  const columns: ColumnsType<IEmployee> = useMemo(() => {
    return [
      {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
        width: 100,
        defaultSortOrder: 'descend',
        sorter: (a, b) => Number(a.id) - Number(b.id),
        shouldCellUpdate: (record, prevRecord) => record.id !== prevRecord.id
      },
      {
        title: 'Full Name',
        dataIndex: 'fullName',
        key: 'fullName',
        sorter: (a, b) => a.fullName.localeCompare(b.fullName),
        shouldCellUpdate: (record, prevRecord) =>
          record.fullName !== prevRecord.fullName
      },
      {
        title: 'Date Received',
        dataIndex: 'startDate',
        key: 'startDate',
        sorter: (a, b) => a.startDate.localeCompare(b.startDate),
        render: (date: IEmployee['startDate']) => DateUtils.format(date),
        shouldCellUpdate: (record, prevRecord) =>
          record.startDate !== prevRecord.startDate
      },
      {
        title: 'Salary',
        dataIndex: 'salary',
        key: 'salary',
        sorter: (a, b) => a.salary - b.salary,
        render: (salary: IEmployee['salary']) => `${salary.toLocaleString()} ₽`,
        shouldCellUpdate: (record, prevRecord) =>
          record.salary !== prevRecord.salary
      },
      {
        title: 'Format',
        dataIndex: 'isRemote',
        key: 'isRemote',
        sorter: (a, b) => Number(a.isRemote) - Number(b.isRemote),
        render: (isRemote: IEmployee['isRemote']) => (
          <span style={{ color: isRemote ? 'green' : 'blue' }}>
            {isRemote ? 'Remote' : 'Office'}
          </span>
        ),
        shouldCellUpdate: (record, prevRecord) =>
          record.isRemote !== prevRecord.isRemote
      },
      {
        title: 'Actions',
        key: 'actions',
        width: 150,
        shouldCellUpdate: (record, prevRecord) => record !== prevRecord,
        render: (_, record) => (
          <Space size="middle">
            <Button
              type="text"
              icon={<EditOutlined />}
              onClick={() => onEditEmployee(record)}
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
  }, [onEditEmployee, onDeleteEmployee]);

  return <CustomTable<IEmployee> dataSource={employees} columns={columns} />;
};
