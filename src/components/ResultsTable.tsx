import { Box, TableContainer, Table, Thead, Tr, Th, Tbody, Td } from "@chakra-ui/react"
import Loader from "./Loaders"
import { useParams } from "react-router-dom";

export const ResultsTable = () => {
    const { idx } = useParams()
    const headers = [
		{
			title: "Name",
			key: "name",
			align: "left",
		},
		{
			title: "Reg No",
			key: "reg_num",
			align: "left",
		},
		{
			title: "Total (Score)",
			key: "total",
			align: "right",
		},
	];
  return (
    <TableContainer mx="auto" mt={6}>
        {idx}
				<Table variant="striped">
					<Thead bgColor="brand.800" textColor="white">
						<Tr>
							{headers.map((header: any) => (
								<Th
									key={header?.title}
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
						{/* {tableData?.length > 0 &&
							tableData?.map((data: any, index: number) => (
								<Tr key={index}>
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
							))} */}
					</Tbody>
				</Table>
				{/* {isTableLoading && (
					<Box display={"flex"} mt={10} alignItems={"center"} mx="auto" justifyContent={"center"} w="100%" textAlign={"center"}>
						<Loader height="30%" />
					</Box>
				)}
				{tableData?.length <= 0 && (
					<Box display={"flex"} mt={10} alignItems={"center"} mx="auto" justifyContent={"center"} w="100%" textAlign={"center"}>
						<Box>
							<img
								src={EmptyIcon}
								style={{
									margin: "0 auto",
								}}
								alt="empty icon"
								height={100}
								width={100}
							/>
							<Text fontWeight={"bold"} textAlign={"center"}>
								No data to view here
							</Text>
						</Box>
					</Box>
				)} */}
			</TableContainer>
  )
}
