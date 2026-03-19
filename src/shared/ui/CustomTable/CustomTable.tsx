import { useState } from 'react';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';

import { useScreens } from '@/shared/hooks';
import { withMemo } from '@/shared/utils';

import s from './CustomTable.module.scss';

interface IProps<T> {
  dataSource: Array<T>;
  columns: ColumnsType<T>;
}

// eslint-disable-next-line react-refresh/only-export-components
const CustomTableComponent = <T extends Record<string, any>>({
  dataSource,
  columns
}: IProps<T>) => {
  const [pageSize, setPageSize] = useState<number>(5);
  const { screens } = useScreens();

  return (
    <Table
      rowKey="id"
      dataSource={dataSource}
      columns={columns}
      pagination={{
        simple: screens.xs,
        pageSize: pageSize,
        placement: ['bottomCenter'],
        showSizeChanger: true,
        pageSizeOptions: ['5', '10', '20'],
        locale: { items_per_page: '' },
        onShowSizeChange: (_, size) => {
          setPageSize(size);
        }
      }}
      scroll={{ x: 850 }}
      className={s.customTable}
    />
  );
};

CustomTableComponent.displayName = 'CustomTable';
export const CustomTable = withMemo(CustomTableComponent);
