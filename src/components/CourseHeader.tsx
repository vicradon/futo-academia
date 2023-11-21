import { Flex, Text, Square, Box, Button, Image } from "@chakra-ui/react";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";
import NoImage from "../assets/images/no-picture.jpg";


function CourseHeader({ course_code, title, description, units, course_photo_url, student_count, instructor_count }: any) {
	return (
		<div style={{ marginTop: 2, marginBottom: "40px" }}>
			<Flex color="white" w={"100%"}>
				<Square display={{base: "none", sm: "block"}} maxW={"30%"}>
					<Image maxW={"200px"} objectFit="cover" height="100%" src={!course_photo_url ? NoImage : course_photo_url} alt="Course header photo" />
				</Square>
				<Box flex="1" bg="#C5C8FF" p={4}>
					<Flex justifyContent={"space-between"} alignContent={"center"}>
					<Text fontSize={"xl"} as="b" color="#696CFF">
						{title || "--"}
					</Text>
					<Text as={NavLink} to={`/lecturer/edit-course/${course_code}`} display={"flex"} alignItems={"center"}>
						<Text color={"#696CFF"} display={{base: "none", md: "flex"}} marginRight={"5px"}>Edit</Text>
						<FontAwesomeIcon icon={faPencil} color={"#696CFF"} size={"sm"} />
					</Text>
					</Flex>
						<Text fontSize={"md"} color={"#232455"}>({course_code || "--"})</Text>
					<Flex alignItems={"center"} gap={"5px"} mt={"10px"}>
						<Button size="xs" borderRadius={"40px"} textColor={"#4625EF"}>
							{units || "--"} units
						</Button>
						<Button size={"xs"} borderRadius={"40px"} bg={"#696CFF"} textColor={"#F8FAFF"}>{student_count} student{student_count == 1 ? "" : "s"}</Button>
						<Button size={"xs"} borderRadius={"40px"} bg={"#696CFF"} textColor={"#F8FAFF"}>{instructor_count} instructor{instructor_count == 1 ? "" : "s"}</Button>
					</Flex>
					<Text fontSize="md" color={"#000000"} mt={"1.25rem"}>{description || "--"}</Text>
				</Box>
			</Flex>
		</div>
	);
}

export default CourseHeader;
