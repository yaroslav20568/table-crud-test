import { EmployeeTable } from '@/entities';

import '@/app/styles/globals.scss';

const App = () => {
  return (
    <>
      <h1>Employees</h1>
      <EmployeeTable />
    </>
  );
};

export default App;
