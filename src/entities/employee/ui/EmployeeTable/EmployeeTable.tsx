import { useCallback, useMemo } from 'react';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Modal, Space } from 'antd';
import type { ColumnsType } from 'antd/es/table';

import { currency } from '@/entities/employee/const';
import { type IEmployee } from '@/entities/employee/model';

import { CustomTable, DateUtils } from '@/shared';

interface IProps {
  employees: Array<IEmployee>;
  onEditEmployee: (employee: IEmployee) => void;
  onDeleteEmployee: (id: IEmployee['id']) => void;
}

export const EmployeeTable = ({
  employees,
  onEditEmployee,
  onDeleteEmployee
}: IProps) => {
  const handleConfirmDelete = useCallback(
    (id: IEmployee['id']) => {
      Modal.confirm({
        title: 'Delete Employee',
        content: 'Are you sure you want to delete this employee?',
        okText: 'Delete',
        okType: 'danger',
        onOk: () => onDeleteEmployee(id),
        centered: true,
        mask: { closable: true },
        icon: null
      });
    },
    [onDeleteEmployee]
  );

  const columns: ColumnsType<IEmployee> = useMemo(() => {
    return [
      {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
        width: 100,
        defaultSortOrder: 'descend',
        sorter: (a, b) => a.id - b.id
      },
      {
        title: 'Full Name',
        dataIndex: 'fullName',
        key: 'fullName',
        sorter: (a, b) => a.fullName.localeCompare(b.fullName)
      },
      {
        title: 'Date Received',
        dataIndex: 'startDate',
        key: 'startDate',
        sorter: (a, b) => a.startDate.localeCompare(b.startDate),
        render: (date: IEmployee['startDate']) => DateUtils.format(date)
      },
      {
        title: 'Salary',
        dataIndex: 'salary',
        key: 'salary',
        sorter: (a, b) => a.salary - b.salary,
        render: (salary: IEmployee['salary']) =>
          `${salary.toLocaleString()} ${currency}`
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
        )
      },
      {
        title: 'Actions',
        key: 'actions',
        width: 150,
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
              onClick={() => handleConfirmDelete(record.id)}
            />
          </Space>
        )
      }
    ];
  }, [onEditEmployee, handleConfirmDelete]);

  return <CustomTable<IEmployee> dataSource={employees} columns={columns} />;
};
