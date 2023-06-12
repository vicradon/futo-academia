import { Button, Flex, Heading, Text } from "@chakra-ui/react";
import HomeLayout from "../layout/HomeLayout";
import { Link } from "react-router-dom";
import SignupModal from "./Home/SignupModal";

export default function Home() {
	return (
		<HomeLayout>
			<Heading>Futo</Heading>
			<Heading>Academia</Heading>

			<Text>An Open Source Website For FUTO students with Over 10,000 Courses, Professional degrees and Certificates</Text>

			<Flex>
				<Button>Log In</Button>
				<SignupModal />
			</Flex>

			<Link to="/about">About</Link>
		</HomeLayout>
	);
}
