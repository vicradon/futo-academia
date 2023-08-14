import { Box, Text, Divider } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export default function CourseCard({ title, start_date, id }: any) {
	const navigate = useNavigate();
	return (
		<Box display="flex" my={4}>
			<Box bgColor="grey" width="100px" height="90px" display="flex" alignItems="center" justifyContent="center">
				<Text fontSize={"80px"} color={"#fff"}>
					{title?.["0"].toUpperCase("")}
				</Text>
			</Box>
			<Box bgColor="#fff" p={3} display="flex" alignItems="center" w="100%" justifyContent="space-between">
				<Box display="flex" flexDir="column">
					<Text>{title}</Text>
					<Text>{start_date?.split("T")[0]}</Text>
				</Box>

				<Box display="flex" alignItems="center" justifyContent="space-between">
					<Text mx={3}>|</Text>
					<Text
						cursor="pointer"
						onClick={() => {
							navigate(`/lecturer/courses/ECE501/examination/add/${id}`);
						}}
					>
						Edit
					</Text>
					<Text mx={3}>|</Text>
					<Text cursor="pointer">Upload</Text>
				</Box>
			</Box>
		</Box>
	);
}
