import { useCallback, useState } from 'react';

import { employeesData } from '@/entities/employee/const';
import type { IEmployee } from '@/entities/employee/model';

export const useEmployees = () => {
  const [employees, setEmployees] = useState<Array<IEmployee>>(employeesData);

  const addEmployee = useCallback((newEmployee: IEmployee) => {
    setEmployees(prev => [...prev, newEmployee]);
  }, []);

  const updateEmployee = useCallback(
    (id: IEmployee['id'], newData: Partial<IEmployee>) => {
      setEmployees(prev =>
        prev.map(employee =>
          employee.id === id ? { ...employee, ...newData } : employee
        )
      );
    },
    []
  );

  const deleteEmployee = useCallback((id: IEmployee['id']) => {
    setEmployees(prev => prev.filter(employee => employee.id !== id));
  }, []);

  return {
    employees,
    addEmployee,
    updateEmployee,
    deleteEmployee
  };
};
