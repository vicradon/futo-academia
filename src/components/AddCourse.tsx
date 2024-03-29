import { AddIcon } from "@chakra-ui/icons";
import { Box, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const AddCourse = () => {
	const navigate = useNavigate();

	const handleAddCourseClick = () => {
		navigate("/lecturer/courses-upload");
	};
	return (
		<Box sx={{ border: "4px solid #585AD4", margin: "auto", padding: "70px 40px", cursor: "pointer" }} textAlign={"center"} textColor={"#585ad4"} onClick={handleAddCourseClick}>
			<AddIcon sx={{ fontSize: "25px" }} />
			<Text>Add course</Text>
		</Box>
	);
};

export default AddCourse;
