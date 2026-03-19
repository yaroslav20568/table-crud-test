import { MainLayout } from '@/app';

import { EmployeeTable } from '@/entities';

import '@/app/styles';

const App = () => {
  return (
    <MainLayout>
      <h1>Employees</h1>
      <EmployeeTable />
    </MainLayout>
  );
};

export default App;
