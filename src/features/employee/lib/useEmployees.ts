import { useCallback, useMemo, useState } from 'react';

import { currency, employeesData, type IEmployee } from '@/entities';

import { DateUtils, useDebounceValue } from '@/shared';

export const useEmployees = () => {
  const [employees, setEmployees] = useState<Array<IEmployee>>(employeesData);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const debouncedSearchQuery = useDebounceValue(searchQuery, 300);

  const nextId = useMemo(
    () =>
      employees.length > 0 ? Math.max(...employees.map(e => e.id)) + 1 : 1,
    [employees]
  );

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
    const currencyRegExp = new RegExp(`[${currency}]`, 'g');
    const query = debouncedSearchQuery
      .trim()
      .toLowerCase()
      .replace(currencyRegExp, '');

    if (!query && debouncedSearchQuery.trim() !== currency) return employees;

    if (!query && debouncedSearchQuery.trim() !== currency) return employees;

    return employees.filter(employee => {
      const queryWithoutSpaces = query.replace(/\s/g, '');
      const employeeId = String(employee.id);
      const fullName = employee.fullName.toLowerCase();
      const cleanSalary = String(employee.salary).replace(/\s+/g, '');
      const format = employee.isRemote ? 'remote' : 'office';
      const formattedDate = DateUtils.format(employee.startDate).toLowerCase();

      if (debouncedSearchQuery.trim() === currency) return true;

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
    nextId,
    setSearchQuery,
    createEmployee,
    updateEmployee,
    deleteEmployee
  };
};
