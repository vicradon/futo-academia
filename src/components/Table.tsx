import { Box, Table, Thead, Tbody, Tr, Th, Td, TableContainer, Flex, Text, Input } from "@chakra-ui/react";

import EmptyIcon from "../assets/images/emptyfile.svg";
import Loader from "./Loaders";

const AppTable = ({ title, header: headers, data: body = [], filterData, onSelectChange, isLoading, handleSearch }: any) => {
	// console.log({ body });
	return (
		<Box>
			<Flex alignItems="center" my={8} justifyContent={"space-between"}>
				<Text fontSize="32px" fontWeight="bold">
					{title}
				</Text>
				<Input placeholder="Search" ml={3} width="60%" onChange={handleSearch} bgColor="#fff" />
				<select
					style={{
						padding: 10,
						width: "80%",
						borderRadius: "8px",
						marginLeft: 14,
					}}
					onChange={(e) => onSelectChange(e)}
					//defaultValue={filterData[0]?.id ?? ""}
					placeholder="Select Assessment"
				>
					{filterData?.map((x: any) => (
						<option value={x?.id}>{x?.title}</option>
					))}
				</select>
			</Flex>
			<TableContainer mx="auto" mt={6}>
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
						{body?.length > 0 &&
							body?.map((data: any) => (
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
				</Table>
				{isLoading && (
					<Box display={"flex"} mt={10} alignItems={"center"} mx="auto" justifyContent={"center"} w="100%" textAlign={"center"}>
						<Loader height="30%" />
					</Box>
				)}
				{body?.length <= 0 && (
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
				)}
			</TableContainer>
		</Box>
	);
};

export default AppTable;
