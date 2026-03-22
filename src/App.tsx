import { useCallback, useState } from 'react';

import { MainLayout } from '@/app';

import { EmployeeModalForm, useEmployees } from '@/features';

import { EmployeeTable, EmployeeToolbar, type IEmployee } from '@/entities';

import { TitleLayout, useModal } from '@/shared';

import '@/app/styles';

export const App = () => {
  const [editingEmployee, setEditingEmployee] = useState<IEmployee | null>(
    null
  );
  const [isOpen, openModal, closeModal] = useModal();
  const {
    filteredEmployees,
    searchQuery,
    nextId,
    setSearchQuery,
    createEmployee,
    deleteEmployee,
    updateEmployee
  } = useEmployees();

  const handleEdit = useCallback(
    (employee: IEmployee) => {
      setEditingEmployee(employee);
      openModal();
    },
    [openModal]
  );

  const handleClose = () => {
    setEditingEmployee(null);
    closeModal();
  };

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
        <EmployeeModalForm
          isOpen={isOpen}
          onClose={handleClose}
          editingEmployee={editingEmployee}
          onCreate={createEmployee}
          onUpdate={updateEmployee}
          nextId={nextId}
        />
      </TitleLayout>
    </MainLayout>
  );
};

export default App;
