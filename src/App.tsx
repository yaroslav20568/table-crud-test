import { Modal } from 'antd';

import { MainLayout } from '@/app';

import { EmployeeTable, EmployeeToolbar } from '@/entities';

import { TitleLayout, useModal } from './shared';

import '@/app/styles';

const App = () => {
  const [isOpen, openModal, closeModal] = useModal();

  return (
    <MainLayout>
      <TitleLayout title="Employees">
        <EmployeeToolbar onCreate={openModal} />
        <EmployeeTable />
        <Modal
          title="Заголовок"
          open={isOpen}
          onOk={closeModal}
          onCancel={closeModal}
        >
          Содержимое окна
        </Modal>
      </TitleLayout>
    </MainLayout>
  );
};

export default App;
