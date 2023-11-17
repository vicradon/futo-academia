import { Box, Grid, Button, Text, Image } from "@chakra-ui/react"
import { SearchParams } from "./LecturerHome";
import { useQuery } from "@tanstack/react-query";
import http from "../../utils/http";
import { useEffect } from "react";
import Loader from "../../components/Loaders";

export const FirstSemesterHome = ({semester, search, faculty, level, skip, limit}: SearchParams) => {

    const { data, isLoading, refetch } = useQuery(["getCourses"], async () => {
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

      useEffect(() => {
        refetch()
      }, [search, faculty, level])
      
      if (isLoading) {
        return (
            <Box display={"flex"} height="30vh" mt={10} alignItems={"center"} mx="auto" justifyContent={"center"} w="100%" textAlign={"center"}>
              <Loader height="50%" />
            </Box>
        )
      }

  return (
    <Grid justifyItems={"center"} rowGap={"3rem"} columnGap={"2rem"} templateColumns={{ base: "1fr", md: "1fr 1fr", lg: "1fr 1fr 1fr" }}>
        {data?.map((course: any) => (
            <Box width={{ base: "200px", sm: "313px" }} key={course.course_code}>
                <Image height={"200px"} backgroundSize="cover" src={course.course_photo_url} alt={course.title} />
                <Box borderRadius={"0 0 0.5rem 0.5rem"} shadow={"lg"} padding={"1rem"}>
                    <Box mb={6}>
                        <Text fontSize={"2xl"} mb={0} color={"brand.500"}>
                            {course.title}
                        </Text>
                        <Text color={"brand.500"}>{course.course_code}</Text>
                    </Box>

                    <Button width={"100%"} colorScheme={"brand"}>
                        View Course
                    </Button>
                </Box>
            </Box>
        ))}
    </Grid>
  )
}
