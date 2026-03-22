import { useEffect } from 'react';
import { DatePicker, Form, Input, InputNumber, Modal, Switch } from 'antd';
import dayjs from 'dayjs';

import { type IEmployee } from '@/entities';

import { DateUtils, DEFAULT_FORMAT } from '@/shared';

import s from './EmployeeModalForm.module.scss';

export interface IEmployeeFormValues extends Omit<
  IEmployee,
  'id' | 'startDate'
> {
  startDate: dayjs.Dayjs;
}

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  editingEmployee: IEmployee | null;
  onCreate: (employee: IEmployee) => void;
  onUpdate: (id: IEmployee['id'], data: Partial<IEmployee>) => void;
  nextId: IEmployee['id'];
}

export const EmployeeModalForm = ({
  isOpen,
  onClose,
  editingEmployee,
  onCreate,
  onUpdate,
  nextId
}: IProps) => {
  const [form] = Form.useForm<IEmployeeFormValues>();

  useEffect(() => {
    if (isOpen) {
      if (editingEmployee) {
        form.setFieldsValue({
          ...editingEmployee,
          startDate: dayjs(editingEmployee.startDate)
        });
      } else {
        form.resetFields();
      }
    }
  }, [isOpen, editingEmployee, form]);

  const handleSubmit = (values: IEmployeeFormValues) => {
    const formattedValues = {
      ...values,
      startDate: DateUtils.format(values.startDate, 'YYYY-MM-DD')
    };

    if (editingEmployee) {
      onUpdate(editingEmployee.id, formattedValues);
    } else {
      onCreate({
        ...formattedValues,
        id: nextId
      } as IEmployee);
    }

    onClose();
  };

  const handleOk = () => form.submit();

  return (
    <Modal
      title={editingEmployee ? 'Edit Employee' : 'Create Employee'}
      open={isOpen}
      onOk={handleOk}
      onCancel={onClose}
      okText={editingEmployee ? 'Edit' : 'Create'}
      centered
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{ isRemote: false }}
        className={s.employeeForm}
      >
        <Form.Item<IEmployeeFormValues>
          label="Full Name"
          name="fullName"
          rules={[{ required: true, message: 'Is Required' }]}
        >
          <Input placeholder="Ivanov Ivan" />
        </Form.Item>
        <Form.Item<IEmployeeFormValues>
          label="Date Received"
          name="startDate"
          rules={[{ required: true, message: 'Is Required' }]}
        >
          <DatePicker format={DEFAULT_FORMAT} className={s.fullWidth} />
        </Form.Item>
        <Form.Item<IEmployeeFormValues>
          label="Salary"
          name="salary"
          rules={[{ required: true, message: 'Is Required' }]}
        >
          <InputNumber min={0} className={s.fullWidth} />
        </Form.Item>
        <Form.Item<IEmployeeFormValues>
          label="Remote"
          name="isRemote"
          valuePropName="checked"
        >
          <Switch />
        </Form.Item>
      </Form>
    </Modal>
  );
};
