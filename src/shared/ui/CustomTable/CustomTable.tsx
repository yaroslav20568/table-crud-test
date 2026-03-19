import { useState } from 'react';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';

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

  return (
    <Table
      rowKey="id"
      dataSource={dataSource}
      columns={columns}
      pagination={{
        pageSize: pageSize,
        placement: ['bottomCenter'],
        showSizeChanger: true,
        pageSizeOptions: ['5', '10', '20'],
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
