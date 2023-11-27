import {Table, TableHeader, TableBody, TableColumn, TableRow, TableCell, getKeyValue } from "@nextui-org/react";
import {fieldIncome} from"@/types/models"
import React, {useEffect, useState} from "react";
import {useSession} from "next-auth/react";

const IncomeTable = () => {

  // Table columns
	const columns = [
		{
			key: "field_id",
			label: "ID",
		},
		{
			key: "field_name",
			label: "FIELD",
		},
		{
			key: "field_income",
			label: "INCOME",
		},
	];

	// table rows
	const { data: session } = useSession();
	const [fieldsIncomes, setFieldsIncomes] = useState<fieldIncome[]>([]);

	useEffect(() => {
        fetch('/api/fields/income')
            .then(response => {
                // console.log('API response:', response);
                return response.json();
            })
            .then(data => {
                // console.log('API data:', data);
                setFieldsIncomes(data.fields_incomes);
				console.log(data.fields_incomes);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, []);

	
	console.log(fieldsIncomes);
	
  return (
    <Table aria-label="Income Table" align="center" shadow="md" isStriped>
			<TableHeader columns={columns}>
					{(column) => <TableColumn key={column.key}  className="purple_gradient font-bold">{column.label}</TableColumn>}
			</TableHeader>
			<TableBody items={fieldsIncomes}>
					{(item) => (
					<TableRow key={item.field_id}>
							{(columnKey) => <TableCell className="font-inter">{getKeyValue(item, columnKey)}</TableCell>}
					</TableRow>
					)}
			</TableBody>
		</Table>
  )
}

export default IncomeTable