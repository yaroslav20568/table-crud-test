import { MainLayout } from '@/app';

import { EmployeeTable } from '@/entities';

import { TitleLayout } from './shared';

import '@/app/styles';

const App = () => {
  return (
    <MainLayout>
      <TitleLayout title="Employees">
        <EmployeeTable />
      </TitleLayout>
    </MainLayout>
  );
};

export default App;
