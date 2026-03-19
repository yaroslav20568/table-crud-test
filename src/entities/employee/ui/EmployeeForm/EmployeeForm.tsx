import {
  DatePicker,
  Form,
  type FormInstance,
  Input,
  InputNumber,
  Switch
} from 'antd';
import type dayjs from 'dayjs';

import type { IEmployee } from '@/entities/employee/model';

import { DEFAULT_FORMAT } from '@/shared';

import s from './EmployeeForm.module.scss';

export interface IEmployeeFormValues extends Omit<
  IEmployee,
  'id' | 'startDate'
> {
  startDate: dayjs.Dayjs;
}

interface EmployeeFormProps {
  form: FormInstance<IEmployeeFormValues>;
  onFinish: (values: IEmployeeFormValues) => void;
}

export const EmployeeForm = ({ form, onFinish }: EmployeeFormProps) => {
  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      initialValues={{ isRemote: false }}
      className={s.employeeForm}
    >
      <Form.Item<IEmployeeFormValues>
        label="Full Name"
        name="fullName"
        rules={[{ required: true, message: 'Is Required' }]}
      >
        <Input placeholder="Иванов Иван" />
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
  );
};
