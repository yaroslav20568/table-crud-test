import { useCallback, useState } from 'react';
import { Form, Modal } from 'antd';
import dayjs from 'dayjs';

import { MainLayout } from '@/app';

import {
  EmployeeForm,
  EmployeeTable,
  EmployeeToolbar,
  type IEmployee,
  type IEmployeeFormValues,
  useEmployees
} from '@/entities';

import { DateUtils, TitleLayout, useModal } from '@/shared';

import '@/app/styles';

export const App = () => {
  const [isOpen, openModal, closeModal] = useModal();
  const {
    employees,
    filteredEmployees,
    searchQuery,
    setSearchQuery,
    createEmployee,
    deleteEmployee,
    updateEmployee
  } = useEmployees();
  const [form] = Form.useForm<IEmployeeFormValues>();
  const [editingEmployee, setEditingEmployee] = useState<IEmployee | null>(
    null
  );

  const handleEdit = useCallback(
    (employee: IEmployee) => {
      setEditingEmployee(employee);

      form.setFieldsValue({
        ...employee,
        startDate: dayjs(employee.startDate)
      });

      openModal();
    },
    [form, openModal]
  );

  const handleClose = () => {
    setEditingEmployee(null);

    form.resetFields();

    closeModal();
  };

  const handleSubmit = (values: IEmployeeFormValues) => {
    const formattedValues = {
      ...values,
      startDate: DateUtils.format(values.startDate, 'YYYY-MM-DD')
    };

    if (editingEmployee) {
      updateEmployee(editingEmployee.id, { ...formattedValues });
    } else {
      const maxId =
        employees.length > 0
          ? Math.max(...employees.map(employee => Number(employee.id)))
          : 0;

      const newEmployee: IEmployee = {
        ...formattedValues,
        id: String(maxId + 1)
      };

      createEmployee(newEmployee);
    }

    handleClose();
  };

  const handleOk = () => form.submit();

  return (
    <MainLayout>
      <TitleLayout title="Employees">
        <EmployeeToolbar
          searchValue={searchQuery}
          onSearch={setSearchQuery}
          onCreate={openModal}
        />
        <EmployeeTable
          employees={filteredEmployees}
          onDeleteEmployee={deleteEmployee}
          onEditEmployee={handleEdit}
        />
        <Modal
          title={editingEmployee ? 'Edit Employee' : 'Create Employee'}
          open={isOpen}
          onOk={handleOk}
          onCancel={handleClose}
          okText={editingEmployee ? 'Edit' : 'Create'}
        >
          <EmployeeForm form={form} onFinish={handleSubmit} />
        </Modal>
      </TitleLayout>
    </MainLayout>
  );
};

export default App;
