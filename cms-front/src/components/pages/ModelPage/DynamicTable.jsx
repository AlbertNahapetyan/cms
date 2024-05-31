import { useTable } from 'react-table';
import { FaTrash, FaEdit } from 'react-icons/fa';
import { useRouter } from 'next/router';
import axios from "axios"
import { useMemo } from "react";

const DynamicTable = ({ data, modelName }) => {
    const router = useRouter();

    const columns = useMemo(
        () => {
            if (!data || data.length === 0) return [];
            const keys = Object.keys(data[0]);
            return keys.map((key) => ({
                Header: key,
                accessor: key,
            })).concat([
                {
                    Header: 'Actions',
                    Cell: ({ row }) => (
                        <div className="flex space-x-2 justify-center">
                            <button onClick={() => handleDelete(row.original)} className="text-red-500 focus:outline-none">
                                <FaTrash />
                            </button>
                            <button onClick={() => handleEdit(row.original)} className="text-blue-500 focus:outline-none">
                                <FaEdit />
                            </button>
                        </div>
                    ),
                },
            ]);
        },
        [data]
    );

    const handleDelete = async (rowData) => {
        try {
            const authToken = localStorage.getItem("authToken")
            await axios.delete(`/api/models/${modelName}/delete/${rowData.id}`,
                { headers: { Authorization: `Bearer ${authToken}` } }
            )

            router.reload()
        } catch (e) {
            console.error("Error while deleting entry: ", rowData.id)
        }
    };

    const handleEdit = (rowData) => {
        router.push(`/models/${modelName}/${rowData.id}`);
    };

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
        columns,
        data,
    });

    return (
        <table {...getTableProps()} className="table-auto w-table-width ml-table-margin border-collapse text-gray-300">
            <thead className="bg-gray-200 text-gray-900">
            {headerGroups.map(headerGroup => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map(column => (
                        <th {...column.getHeaderProps()} className="p-2 border border-gray-300">
                            {column.render('Header')}
                        </th>
                    ))}
                </tr>
            ))}
            </thead>
            <tbody {...getTableBodyProps()}>
            {rows.map(row => {
                prepareRow(row);
                return (
                    <tr {...row.getRowProps()} className="border-t border-gray-300">
                        {row.cells.map(cell => (
                            <td {...cell.getCellProps()} className="p-2 border border-gray-300">
                                {cell.render('Cell')}
                            </td>
                        ))}
                    </tr>
                );
            })}
            </tbody>
        </table>
    );
};

export default DynamicTable;
