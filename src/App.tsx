import { Form, Modal } from 'antd';

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
  const { employees, addEmployee, deleteEmployee } = useEmployees();
  const [form] = Form.useForm<IEmployeeFormValues>();

  const handleSubmit = (values: IEmployeeFormValues) => {
    const maxId =
      employees.length > 0
        ? Math.max(...employees.map(emp => Number(emp.id)))
        : 0;

    const newEmployee: IEmployee = {
      ...values,
      id: String(maxId + 1),
      startDate: DateUtils.format(values.startDate)
    };

    addEmployee(newEmployee);
    form.resetFields();
    closeModal();
  };

  return (
    <MainLayout>
      <TitleLayout title="Employees">
        <EmployeeToolbar onCreate={openModal} />
        <EmployeeTable
          employees={employees}
          onDeleteEmployee={deleteEmployee}
        />
        <Modal
          title="Добавить сотрудника"
          open={isOpen}
          onOk={() => form.submit()}
          onCancel={closeModal}
        >
          <EmployeeForm form={form} onFinish={handleSubmit} />
        </Modal>
      </TitleLayout>
    </MainLayout>
  );
};

export default App;
