import React from "react";
import DataTable from "react-data-table-component";

interface DataTableProps {
  data: any[];
  loading: boolean;
  totalRows: number;
  page: number;
  onPageChange: (page: number) => void;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

const DataTableComponent: React.FC<DataTableProps> = ({
  data,
  loading,
  totalRows,
  page,
  onPageChange,
  onEdit,
  onDelete,
}) => {

  const columns = [
    { name: "Name", selector: (row: any) => row.name, sortable: true },
    { name: "Category", selector: (row: any) => row.category, sortable: true },
    { name: "Price", selector: (row: any) => `$${row.price}`, sortable: true },
    { name: "Expiration Date", selector: (row: any) => row.expirationDate || "-", sortable: true },
    { name: "Stock", selector: (row: any) => row.quantityInStock, sortable: true },
    {
      name: "Actions",
      cell: (row: any) => (
        <>
          <button onClick={() => onEdit(row.id)} style={{ marginRight: "5px" }}>Edit</button>
          <button onClick={() => onDelete(row.id)}>Delete</button>
        </>
      )
    }
  ];

  return (
    <DataTable
      columns={columns}
      data={data}
      progressPending={loading}
      pagination
      paginationServer
      paginationTotalRows={totalRows}
      onChangePage={onPageChange}
      highlightOnHover
      pointerOnHover
    />
  );
};

export default DataTableComponent;
