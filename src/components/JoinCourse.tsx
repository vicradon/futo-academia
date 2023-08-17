import { AddIcon } from "@chakra-ui/icons";
import { Box, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const JoinCourse = () => {
	const navigate = useNavigate();

	const handleJoinCourseClick = () => {
		navigate("#");
	};
	return (
		<Box sx={{ border: "4px solid green", margin: "auto", padding: "70px 40px", cursor: "pointer" }} textAlign={"center"} textColor={"green"} onClick={handleJoinCourseClick}>
			<AddIcon sx={{ fontSize: "25px" }} />
			<Text>Join course</Text>
		</Box>
	);
};

export default JoinCourse;
