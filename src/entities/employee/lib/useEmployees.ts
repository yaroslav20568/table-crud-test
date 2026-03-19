import { useCallback, useMemo, useState } from 'react';

import { employeesData } from '@/entities/employee/const';
import type { IEmployee } from '@/entities/employee/model';

import { DateUtils, useDebounceValue } from '@/shared';

export const useEmployees = () => {
  const [employees, setEmployees] = useState<Array<IEmployee>>(employeesData);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const debouncedSearchQuery = useDebounceValue(searchQuery, 300);

  const createEmployee = useCallback((newEmployee: IEmployee) => {
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

  const filteredEmployees = useMemo(() => {
    const query = debouncedSearchQuery.trim().toLowerCase().replace(/[₽]/g, '');
    if (!query && debouncedSearchQuery.trim() !== '₽') return employees;

    return employees.filter(employee => {
      const queryWithoutSpaces = query.replace(/\s/g, '');
      const employeeId = String(employee.id);
      const fullName = employee.fullName.toLowerCase();
      const cleanSalary = String(employee.salary).replace(/\s+/g, '');
      const format = employee.isRemote ? 'remote' : 'office';
      const formattedDate = DateUtils.format(employee.startDate).toLowerCase();

      if (debouncedSearchQuery.trim() === '₽') return true;

      return (
        fullName.includes(query) ||
        formattedDate.includes(query) ||
        employeeId.includes(queryWithoutSpaces) ||
        cleanSalary.includes(queryWithoutSpaces) ||
        format.includes(queryWithoutSpaces)
      );
    });
  }, [employees, debouncedSearchQuery]);

  return {
    filteredEmployees,
    searchQuery,
    setSearchQuery,
    createEmployee,
    updateEmployee,
    deleteEmployee
  };
};
