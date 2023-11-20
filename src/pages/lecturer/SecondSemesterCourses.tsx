import { Image, SimpleGrid, Button, Box, Text, Flex } from '@chakra-ui/react'
import { useFetchCourses } from '../../hooks/useCourses';
import { useNavigate } from 'react-router-dom';
import EmptyIcon from "../../assets/images/emptyfile.svg";


export default function SecondSemesterCourses() {
    const courseQuery = useFetchCourses(2);
    const navigate = useNavigate();


	if (courseQuery.data?.length <= 0) {
        return (
            <Box display={"flex"} mt={10} alignItems={"center"} mx="auto" justifyContent={"center"} w="100%" textAlign={"center"}>
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
	<>
    <SimpleGrid justifyItems={"center"} rowGap={"1rem"} columnGap={"1.5rem"}minChildWidth='200px' mb={"50px"}>
							{courseQuery.data?.map((course: any) => (
								<Box 
									width="200px" 
									height="300px"
									sx={{ background: "#fff" }}
                                    key={course.course_code}
									display="flex" 
									flexDir="row" justifyContent="space-between"
								>
									<Image maxHeight={"240px"} maxWidth={"100%"} backgroundSize="cover" src={course.course_photo_url} alt={course.title} />
									<Box borderRadius={"  0.5rem 0.5rem"} shadow={"lg"} padding={"1rem"}>
										<Box mb={6}>
											<Text fontSize={"2xl"} mb={0} color={"brand.500"}>
												{course.title}
											</Text>
											<Text color={"brand.500"}>{course.course_code}</Text>
										</Box>
										<Button width={"100%"} colorScheme={"brand"} onClick={() => navigate(`/lecturer/courses/${course?.course_code}`)}>
											View Course
										</Button>
									</Box>
								</Box>
							))}

	</SimpleGrid>
	{courseQuery?.data?.length === 10 && <Flex my={12} justifyContent={"center"}>
							<Button width={{ base: "150px", md: "200px", lg: "400px" }} colorScheme={"brand"} variant={"outline"}>
								View More
							</Button>
						</Flex>}
	</>
  )
}
