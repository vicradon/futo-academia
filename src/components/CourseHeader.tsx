import { Flex, Spacer, Text, Square, Box, Button, Image } from "@chakra-ui/react";
import img from "../assets/images/courseheader.jpg";

function CourseHeader() {
	return (
		<div>
			<Flex color="white">
				<Square size="150px">
					<Image objectFit="cover" src={img} alt="courseheader" />
				</Square>
				<Box flex="1" bg="brand.500" p={4}>
					<Text fontSize="2xl" as="b" color="">
						HUMANITIES
					</Text>
					<Text fontSize="xl">(GST 103)</Text>
					<Button size="xs">3 units</Button>
					<Text fontSize="xs">This course is very interesting</Text>
				</Box>
			</Flex>
		</div>
	);
}

export default CourseHeader;
