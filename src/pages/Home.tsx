import { Button, Flex, Heading, Text, Box, Grid, Image } from "@chakra-ui/react";
import HomeLayout from "../layout/HomeLayout";
import { Link } from "react-router-dom";
import SignupModal from "./Home/SignupModal";
import students from "../assets/images/students.png";

export default function Home() {
	return (
		<HomeLayout>
			<Grid templateColumns={"1fr 1fr"} columnGap={"1rem"}>
				<Box>
					<Heading>Futo</Heading>
					<Heading>Academia</Heading>

					<Text>An Open Source Website For FUTO students with Over 10,000 Courses, Professional degrees and Certificates</Text>

					<Flex>
						<Button>Log In</Button>
						<SignupModal />
					</Flex>
				</Box>

				<Box backgroundColor={"brand.500"} borderRadius="98.1002px 98.1002px 49.0501px 49.0501px">
					<Image src={students} alt="students standing" />
				</Box>
			</Grid>
		</HomeLayout>
	);
}
