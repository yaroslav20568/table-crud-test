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
        label="ФИО"
        name="fullName"
        rules={[{ required: true, message: 'Введите ФИО' }]}
      >
        <Input placeholder="Иванов Иван" />
      </Form.Item>
      <Form.Item<IEmployeeFormValues>
        label="Дата приема"
        name="startDate"
        rules={[{ required: true, message: 'Выберите Дату' }]}
      >
        <DatePicker format={DEFAULT_FORMAT} className={s.fullWidth} />
      </Form.Item>
      <Form.Item<IEmployeeFormValues>
        label="Зарплата"
        name="salary"
        rules={[{ required: true, message: 'Укажите Сумму' }]}
      >
        <InputNumber min={0} className={s.fullWidth} />
      </Form.Item>
      <Form.Item<IEmployeeFormValues>
        label="Удаленно"
        name="isRemote"
        valuePropName="checked"
      >
        <Switch />
      </Form.Item>
    </Form>
  );
};
