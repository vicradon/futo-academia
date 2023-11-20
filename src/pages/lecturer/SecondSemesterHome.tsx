import { Box, Grid, Button, Text, Image, Flex } from "@chakra-ui/react"
import { SearchParams } from "./LecturerHome";
import { useQuery } from "@tanstack/react-query";
import http from "../../utils/http";
import { useEffect } from "react";
import Loader from "../../components/Loaders";
import EmptyIcon from "../../assets/images/emptyfile.svg";


export const SecondSemesterHome = ({semester, search, faculty, level, skip, limit}: SearchParams) => {
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
          <Box display={"flex"} mt={10} height="30vh" alignItems={"center"} mx="auto" justifyContent={"center"} w="100%" textAlign={"center"}>
            <Loader height="50%" />
          </Box>
      )
    }

    if (data?.length <= 0) {
      return (
          <Box display={"flex"} mt={40} alignItems={"center"} mx="auto" justifyContent={"center"} w="100%" textAlign={"center"}>
            <Box>
              <img
                src={EmptyIcon}
                style={{
                  margin: "0 auto",
                }}
                alt="empty icon"
                height={100}
                width={100}
              />
              <Text fontWeight={"bold"} textAlign={"center"}>
                No Courses
              </Text>
            </Box>
          </Box>
        )
    }

  return (
    <Grid justifyItems={"center"} rowGap={"3rem"} columnGap={"2rem"} templateColumns={{ base: "1fr", md: "1fr 1fr", lg: "1fr 1fr 1fr" }}>
        {data?.map((course: any) => (
            <Box width={{ base: "280px", sm: "313px" }} key={course.course_code}>
                <Image width={"100%"} backgroundSize="cover" src={course.image_url} alt={course.title} />
                <Box borderRadius={"0 0 0.5rem 0.5rem"} shadow={"lg"} padding={"1rem"}>
                    <Box mb={6}>
                        <Text fontSize={"2xl"} mb={0} color={"brand.500"}>
                            {course.title}
                        </Text>
                        <Text color={"brand.500"}>{course.course_code}</Text>
                    </Box>

                    <Button width={"100%"} colorScheme={"brand"}>
                        View
                    </Button>
                </Box>
            </Box>
        ))}
        {data?.length === 10 && <Flex my={12} justifyContent={"center"} gridColumn={{base: "span 1", md: "span 2", lg: "span 3"}}>
						<Button width={{ base: "150px", md: "200px", lg: "400px" }} colorScheme={"brand"} variant={"outline"}>
							View More
						</Button>
				</Flex>}
    </Grid>
  )
}
