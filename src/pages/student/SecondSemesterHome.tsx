import { Box, Grid, Button, Text, Image } from "@chakra-ui/react"
import { SearchParams } from "./StudentHome";
import { useQuery } from "@tanstack/react-query";
import http from "../../utils/http";
import { useEffect } from "react";

export const SecondSemesterHome = ({semester, search, faculty, level, skip, limit}: SearchParams) => {
    const { data, isLoading } = useQuery(["getCourses"], async () => {
		const response = await http.get('/courses', {
		  params: {
			semester: semester,
			search: search,
			faculty: faculty,
			level: level,
			skip: skip,
			limit: limit,
		  },
		});
	  
		return response.data;
	  },
    {
      refetchOnWindowFocus: false,
      refetchOnMount: true,
    }
    );

  return (
    <Grid justifyItems={"center"} rowGap={"3rem"} columnGap={"2rem"} templateColumns={{ base: "1fr", md: "1fr 1fr", lg: "1fr 1fr 1fr" }}>
        {data?.map((course: any) => (
            <Box width={{ base: "280px", sm: "313px" }} key={course.course_code}>
                <Image height={"300px"} backgroundSize="cover" src={course.image_url} alt={course.title} />
                <Box borderRadius={"0 0 0.5rem 0.5rem"} shadow={"lg"} padding={"1rem"}>
                    <Box mb={6}>
                        <Text fontSize={"2xl"} mb={0} color={"brand.500"}>
                            {course.title}
                        </Text>
                        <Text color={"brand.500"}>{course.course_code}</Text>
                    </Box>

                    <Button width={"100%"} colorScheme={"brand"}>
                        Add Course
                    </Button>
                </Box>
            </Box>
        ))}
    </Grid>
  )
}
