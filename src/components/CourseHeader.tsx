import { Flex, Text, Square, Box, Button, Image } from "@chakra-ui/react";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";

function CourseHeader({ course_code, title, description, units, course_photo_url }: any) {
	return (
		<div style={{ marginTop: 2, marginBottom: "40px" }}>
			<Flex color="white" w={"100%"}>
				<Square display={{base: "none", sm: "block"}} maxW={"30%"}>
					<Image objectFit="cover" height="100%" src={course_photo_url} alt="Course header photo" />
				</Square>
				<Box flex="1" bg="#C5C8FF" p={4}>
					<Flex justifyContent={"space-between"} alignContent={"center"}>
					<Text fontSize={{base: "20px", sm: "2xl", xl: "4xl"}} as="b" color="#696CFF">
						{title || "--"}
					</Text>
					<NavLink to={`/lecturer/edit-course/${course_code}`}>
						<Text color={"#696CFF"}><FontAwesomeIcon icon={faPencil} color={"#696CFF"} size="sm"/></Text>
					</NavLink>
					</Flex>
					<Flex alignItems={"center"}>
						<Text fontSize={{base: "sm", sm: "xs", md: "xs"}} color={"#232455"} mr={"10px"}>({course_code || "--"})</Text>
						<Button size="xs" borderRadius={"40px"} textColor={"#4625EF"} mr={"5px"}>
							{units || "--"} units
						</Button>
						<Button size={"xs"} borderRadius={"40px"} bg={"#696CFF"} textColor={"#F8FAFF"}>122 students</Button>
					</Flex>
					<Text fontSize="xs" color={"#000000"} mt={"1.25rem"}>{description || "--"}</Text>
				</Box>
			</Flex>
		</div>
	);
}

export default CourseHeader;
