import { Box, Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption, TableContainer, Flex, Text, Input } from "@chakra-ui/react";

const AppTable = () => {
	const headers = [
		{
			title: "Name",
			key: "name",
			align: "left",
		},
		{
			title: "ID",
			key: "id",
			align: "left",
		},
		{
			title: "Age",
			key: "age",
			align: "right",
		},
	];

	const body = [
		{
			name: "Chimaobi",
			id: "1234563",
			age: "40",
		},
		{
			name: "Chimaobi",
			id: "1234563",
			age: "40",
		},
		{
			name: "Chimaobi",
			id: "1234563",
			age: "40",
		},
		{
			name: "Chimaobi",
			id: "1234563",
			age: "40",
		},
		{
			name: "Chimaobi",
			id: "1234563",
			age: "40",
		},
		{
			name: "Chimaobi",
			id: "1234563",
			age: "40",
		},
	];
	return (
		<Box>
			<Flex alignItems="center" my={8}>
				<Text fontSize="32px" fontWeight="bold">
					Students
				</Text>
				<Input placeholder="Search" ml={3} width="40%" bgColor="#fff" />
			</Flex>
			<TableContainer mx="auto" mt={6}>
				<Table variant="striped">
					<Thead bgColor="brand.800" textColor="white">
						<Tr>
							{headers.map((header) => (
								<Th
									sx={{
										color: "#fff",
										textAlign: header?.align,
									}}
								>
									{header.title}
								</Th>
							))}
						</Tr>
					</Thead>
					<Tbody>
						{body?.map((data: any) => (
							<Tr>
								{headers.map(({ key, align }: any) => (
									<Td
										sx={{
											textAlign: align,
										}}
									>
										{data?.[key]}
									</Td>
								))}
							</Tr>
						))}
					</Tbody>
					<Tfoot>
						<Tr>
							<Th>To convert</Th>
							<Th>into</Th>
							<Th isNumeric>multiply by</Th>
						</Tr>
					</Tfoot>
				</Table>
			</TableContainer>
		</Box>
	);
};

export default AppTable;
