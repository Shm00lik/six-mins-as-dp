import { Table } from "antd";

const TopTable = ({ columns, data }: TableProps) => {
  return (
    <Table
      columns={columns.map((c) => {
        return {
          ...c,
          align: "center",
          width: c.width || "auto",
        };
      })}
      dataSource={data.map((d, i) => ({ ...d, key: i }))}
      pagination={false}
    />
  );
};

interface TableProps {
  columns: {
    title: string;
    dataIndex: string;
    render?: (
      text: any,
      record: { [key: string]: string | number },
      index: number
    ) => React.ReactNode;
    width?: string | number;
  }[];
  data: {}[];
}

export default TopTable;
