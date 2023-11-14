import { Flex, Text, Square, Box, Button, Image } from "@chakra-ui/react";

function CourseHeader({ course_code, title, description, units, img }: any) {
	return (
		<div style={{ marginTop: 2, marginBottom: "40px" }}>
			<Flex color="white">
				<Square size="150px">
					<Image objectFit="cover" height="100%" src={img} alt="courseheader" />
				</Square>
				<Box flex="1" bg="brand.500" p={4}>
					<Text fontSize="2xl" as="b" color="">
						{title || "--"}
					</Text>
					<Text fontSize="xl">({course_code || "--"})</Text>
					<Button my={1} size="xs">
						{units || "--"} units
					</Button>
					<Text fontSize="xs">{description || "--"}</Text>
				</Box>
			</Flex>
		</div>
	);
}

export default CourseHeader;
