import { Button, Flex, Heading, Text } from "@chakra-ui/react";
import HomeLayout from "./layout/HomeLayout";

function App() {
	return (
		<HomeLayout>
			<Heading>Futo</Heading>
			<Heading>Academia</Heading>

			<Text>An Open Source Website For FUTO students with Over 10,000 Courses, Professional degrees and Certificates</Text>

			<Flex>
				<Button>Log In</Button>
				<Button colorScheme="brand">Sign Up</Button>
			</Flex>
		</HomeLayout>
	);
}

export default App;
