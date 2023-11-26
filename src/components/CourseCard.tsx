import { Box, Image, Text } from "@chakra-ui/react"
import { NavLink } from "react-router-dom"
import NoImage from "../assets/images/no-picture.jpg"

export const CourseCard = ({course}: any) => {
  return (
    <Box 
        width={"200px"}
        key={course.course_code} 
        as={NavLink} 
        to={`/lecturer/courses/${course.course_code}`} 
        bg={"white"}
        _hover={{
        transform: "scale(1.05)",
        boxShadow: "xl",
        }}
        transition="transform 0.3s, box-shadow 0.3s"
    >
        <Image width={"100%"} backgroundSize="cover" src={!course.course_photo_url ? NoImage : course.course_photo_url} alt={course.title} />
        <Box borderRadius={"0 0 0.5rem 0.5rem"} shadow={"lg"} padding={"1rem"} height={"150px"}>
            <Box mb={6}>
                <Text fontSize={"lg"} mb={0} color={"brand.500"}>
                    {course.title}
                </Text>
                <Text color={"brand.500"}>{course.course_code}</Text>
            </Box>
        </Box>
    </Box>
  )
}
