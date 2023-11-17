import { Box, Flex, Grid, Text } from "@chakra-ui/react";
import Logo from "../components/Logo";
import Navlink from "../components/Navlink";

export default function DashboardLayout() {
	return (
		<Grid gridTemplateColumns={"20% 1fr"} columnGap={"1rem"}>
			<Box>
				<Logo />

				<Box>
					<Text color="brand.500">Hi Devin</Text>
					<Text>What are we learning today?</Text>
				</Box>

				<Flex flexDirection={"column"}></Flex>
			</Box>
			<Box>
				<Flex>
					<Navlink href="/student/my-courses">Courses</Navlink>
				</Flex>
			</Box>
		</Grid>
	);
}
