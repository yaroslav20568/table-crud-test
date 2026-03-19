import { type Key, useState } from 'react';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';

interface IProps<T> {
  dataSource: Array<T>;
  columns: ColumnsType<T>;
}

export const CustomTable = <T extends { id: Key }>({
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
