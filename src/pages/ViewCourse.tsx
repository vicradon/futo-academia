import AppTable from "../components/Table";
import { Box, Tab, TabList, TabPanels, TabPanel, Tabs, Text, Flex } from "@chakra-ui/react";
import StudentDashboardLayout from "../layout/StudentDashboardLayout";
import AdminLayout from "../layout/AdminLayout";
import TimerBox from "../components/TimerBox";

export default function ViewCourse() {
	const tabData = [
		{
			name: "Course Summary",
		},
		{
			name: "Assignments",
		},
		{
			name: "Tests",
		},
		{
			name: "Examination",
		},
	];
	return (
		<>
			<AdminLayout>
				<Box>
					<Tabs variant="unstyled">
						<TabList bgColor="#DAE4FF">
							{tabData?.map((x) => (
								<Tab _selected={{ color: "white", bg: "#343680" }}>{x?.name}</Tab>
							))}
						</TabList>
						<TabPanels>
							<TabPanel>
								<p>one!</p>
							</TabPanel>
							<TabPanel>
								<p>two!</p>
							</TabPanel>
						</TabPanels>
					</Tabs>
				</Box>
				<Box>
					<Text fontSize="24px" color="#585AD4" fontWeight="bold">
						Currently up
					</Text>

					<Flex alignItems="center">
						<Box width="100px" height="100px" bgColor="red"></Box>
						<Flex direction="column" ml={2} justifyContent="space-around" mr={3}>
							<Box>Assignment</Box>
							<Box>
								<Text color="#3578D3" fontWeight="bold">
									Jan 1 2023
								</Text>
							</Box>
						</Flex>

						<TimerBox />
					</Flex>
				</Box>
				<AppTable></AppTable>
			</AdminLayout>
		</>
	);
}
