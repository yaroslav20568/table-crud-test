import { useState } from 'react';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';

import { withMemo } from '@/shared/utils';

interface IProps<T> {
  dataSource: Array<T>;
  columns: ColumnsType<T>;
}

// eslint-disable-next-line react-refresh/only-export-components
const CustomTableComponent = <T extends Record<string, any>>({
  dataSource,
  columns
}: IProps<T>) => {
  const [pageSize, setPageSize] = useState(5);

  return (
    <Table
      dataSource={dataSource}
      columns={columns}
      rowKey="id"
      pagination={{
        pageSize: pageSize,
        placement: ['bottomCenter'],
        showSizeChanger: true,
        pageSizeOptions: ['5', '10', '20'],
        onShowSizeChange: (_, size) => {
          setPageSize(size);
        }
      }}
    />
  );
};
CustomTableComponent.displayName = 'CustomTable';
export const CustomTable = withMemo(CustomTableComponent);
