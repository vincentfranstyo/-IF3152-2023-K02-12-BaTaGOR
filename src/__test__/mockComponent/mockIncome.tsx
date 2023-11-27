import {Table, TableHeader, TableBody, TableColumn, TableRow, TableCell, getKeyValue } from "@nextui-org/react";


const IncomeTable = (
    {userState, field_id, field_id2, field_id3, 
		field_name, field_name2, field_name3,
		 field_income, field_income2, field_income3}
	: {userState: Boolean, field_id: number, field_id2: number, field_id3: number,
		field_name: string, field_name2: string, field_name3: string,
		field_income: number, field_income2: number, field_income3: number}) => {

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

	const rows = [
		{
			field_id: field_id,
			field_name: field_name,
			field_income: field_income
		},

		{
			field_id: field_id2,
			field_name: field_name2,
			field_income: field_income2
		},

		{
			field_id: field_id3,
			field_name: field_name3,
			field_income: field_income3
		}
	]
	
  return (
    <Table aria-label="Income Table" align="center" shadow="md" isStriped data-testid="testTable">
			<TableHeader columns={columns}>
					{(column) => <TableColumn key={column.key}  className="purple_gradient font-bold">{column.label}</TableColumn>}
			</TableHeader>
			<TableBody items={rows}>
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