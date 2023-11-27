import {Table, TableHeader, TableBody, TableColumn, TableRow, TableCell, getKeyValue } from "@nextui-org/react";

const IncomeTable = () => {

  // Table columns
	const columns = [
		{
			key: "fieldName",
			label: "FIELD",
		},
		{
			key: "fieldIncome",
			label: "INCOME",
		},
	];

	// table rows
	const rows = [
		{
			key: "1",
			fieldName: "Vincent Van Goal",
			fieldIncome: "10.000.000"
		},
		{
			key: "2",
			fieldName: "Duke of Gawangan",
			fieldIncome: "10.000.000"
		},
		{
			key: "3",
			fieldName: "Farhan Algoalni",
			fieldIncome: "10.000.000"
		},
		{
			key: "4",
			fieldName: "Fakhri Putranya Messi",
			fieldIncome: "10.000.000"
		},
	];

  return (
    <Table aria-label="Income Table" align="center" shadow="md" isStriped>
			<TableHeader columns={columns}>
					{(column) => <TableColumn key={column.key}  className="purple_gradient font-bold">{column.label}</TableColumn>}
			</TableHeader>
			<TableBody items={rows}>
					{(item) => (
					<TableRow key={item.key}>
							{(columnKey) => <TableCell className="font-inter">{getKeyValue(item, columnKey)}</TableCell>}
					</TableRow>
					)}
			</TableBody>
		</Table>
  )
}

export default IncomeTable