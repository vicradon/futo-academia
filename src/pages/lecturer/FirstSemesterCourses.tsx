import { Image, SimpleGrid, Button, Box, Text } from '@chakra-ui/react'
import { useFetchCourses } from '../../hooks/useCourses';
import { useNavigate } from 'react-router-dom';

export default function FirstSemesterCourses() {
    const courseQuery = useFetchCourses(1);
    const navigate = useNavigate();
  return (
    <SimpleGrid  rowGap={"1rem"} columnGap={"1.5rem"} minChildWidth='200px' mb={"50px"} width={"100%"}>
							{courseQuery.data?.map((course: any) => (
								<Box 
									width="200px" 
									height="300px"
									sx={{ background: "#fff" }} 
                                    key={course.course_code}
									display="flex" 
									flexDir="column" justifyContent="space-between"
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
  )
}
