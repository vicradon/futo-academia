import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Flex, Box, Button, chakra, FormControl, FormLabel, Input, Select, Textarea, VStack, Heading } from "@chakra-ui/react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../layout/SidebarLecturer";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { useNavigate, useParams } from "react-router-dom";
import { useCreateCourse, useUploadCourseCover } from "../../hooks/useCourses";
import { useEnrollStudents } from "../../hooks/useEnrollments";
import { useUser } from "../../hooks/useUser";
import { useQuery } from "@tanstack/react-query";
import http from "../../utils/http";

const EditCourse = () => {
	const navigate = useNavigate();
	const user = useUser();
	const { id } = useParams()
	const { data, isLoading } = useQuery({
		queryKey: ["getCourseID", id],
		queryFn: () => http.get(`/courses/${id}`).then((r) => r.data),
	});

	const [courseInfo, setCourseInfo] = useState({
		title: '',
		unit: '1',
		code: '',
		faculty: '',
		level: '100',
		description: '',
		coverImage: null as File | null,
		semester: '1',
		classList: null as File | null,
	});

	useEffect(() => {
	  setCourseInfo({
		...courseInfo, 
		title: data?.title,
		unit: data?.unit,
		code: data?.code,
		faculty: data?.faculty,
		level: data?.level,
		description: data?.description,
		semester: data?.semester,
	})
	}, [isLoading])
	
	console.log(courseInfo)

	const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
		const { name, value } = event.target;
		setCourseInfo((prevCourseInfo) => ({
		...prevCourseInfo,
		[name]: value,
		}));
	};
	const HoverableArrowBackIcon = chakra(ArrowBackIcon, {
		baseStyle: {
			fontSize: "25px",
			cursor: "pointer",
			transition: "all 0.2s ease-in-out",
			_hover: {
				color: "blue.500",
			},
		},
	});

	const handleFileChange = (event: any) => {
		const file = event.target.files[0];
		setCourseInfo((prevCourseInfo) => ({
			...prevCourseInfo,
			[event.target.name]: file,
			}));
	};

	const handleCancel = () => {
		window.history.back();
	};

	const handleGoBack = () => {
		navigate(-1);
	};

	const createCourseMutation = useCreateCourse();
	const coursePhotoMutation = useUploadCourseCover(createCourseMutation.isSuccess);
	const enrollStudentMutation = useEnrollStudents(createCourseMutation.isSuccess);

	const handleSubmit = async (event: FormEvent) => {
		try {
			event.preventDefault();

				createCourseMutation.mutate({
				course_code: courseInfo.code,
				title: courseInfo.title,
				description: courseInfo.description,
				units: courseInfo.unit,
				faculty: courseInfo.faculty,
				semester: courseInfo.semester,
				level: courseInfo.level,
			}, 
			// {onSuccess: () => {
			// 	if (createCourseMutation?.data?.response.status === 201){
			// 		console.log(createCourseMutation?.data?.response.status)
			// 		enrollStudentMutation.mutate({
			// 		file: courseInfo.classList,
			// 		course_code: courseInfo.code,
			// 		});
			// 		coursePhotoMutation.mutate({ course_code: courseInfo.code, file: courseInfo.coverImage });
			// 	} else {
			// 		console.log("hurray", createCourseMutation?.data?.response.status)
			// 	}
			// }}
			);

			

			if (createCourseMutation.isSuccess) {
				console.log(createCourseMutation.data)
			}
		} catch (error) {
			console.log(error);
		}
	};
	useEffect(() => {
		if (createCourseMutation.isSuccess) {
			coursePhotoMutation.mutate({ course_code: courseInfo.code, file: courseInfo.coverImage });
			navigate(`/lecturer/courses/${courseInfo.code}`)
			enrollStudentMutation.mutate({
			file: courseInfo.classList,
			course_code: courseInfo.code,
			});
		}
	}, [createCourseMutation.isSuccess])

	return (
		<Box bg={"#F3F6FF"} minH={"100vh"}>
			<Navbar bgColor="#F3F6FF" />
			<Flex gap={"2vw"} paddingTop={"110px"}>
				<Sidebar />
				<Box paddingTop={"20px"} sx={{ marginRight: "50px" }}>
					<HoverableArrowBackIcon onClick={handleGoBack} marginLeft={"30px"} />
					<Box padding={"20px 20px"} width={{base: "100vw", md: "73vw"}} maxWidth={"1200px"}>
							<Box fontWeight="bold" mb={10} color={"#585AD4"} textAlign={"center"}>
								<Heading size="lg">Upload New Course</Heading>
							</Box>
							<VStack spacing={4} as="form" onSubmit={handleSubmit}>
								<Flex justifyContent={"space-between"} columnGap={4} width={"100%"} p={"0rem"} flexDir={{base: "column", md: "row"}}>
									<Box width={{base: "100%", md: "50%"}}>
										<FormControl isRequired>
											<FormLabel size="sm" color={"#151633"}>
													Title
											</FormLabel>
											<Input 
												value={courseInfo.title} 
												name="title"
												required 
												onChange={handleChange}
												bg="#fff"
												placeholder="Title" 
												mb={"20px"} 
											/>
										</FormControl>
										<FormControl isRequired>
											<FormLabel size="sm" color={"#151633"} >
													Course Units
											</FormLabel>

											<Select name="unit" value={courseInfo.unit} onChange={handleChange} sx={{ marginBottom: "20px" }} bg="#fff">
												<option value="1">1</option>
												<option value="2">2</option>
												<option value="3">3</option>
												<option value="4">4</option>
												<option value="5">5</option>
												<option value="6">6</option>
											</Select>
										</FormControl>
										<FormControl isRequired>
											<FormLabel size="sm" color={"#151633"}>
												Course Code
											</FormLabel>
											<Input 
												isRequired 
												value={courseInfo.code} 
												name="code"
												onChange={handleChange} 
												sx={{ marginBottom: "20px" }} 
												bg="#fff" 
											/>
										</FormControl>
										<FormControl isRequired>
											<FormLabel size="sm" color={"#151633"}>
													Description
											</FormLabel>
											<Textarea 
												value={courseInfo.description} 
												name="description"
												onChange={handleChange} sx={{ marginBottom: "20px" }} bg="#fff" />
										</FormControl>
									</Box>
									<Box width={{base: "100%", md: "50%"}} >
										<FormControl isRequired>
											<FormLabel size="sm" color={"#151633"}>
													Cover Image
											</FormLabel>
											<Input 
												isRequired 
												type="file" 
												name="coverImage"
												accept="image/*" 
												onChange={handleFileChange} 
												sx={{ marginBottom: "20px" }} bg="#fff" />
										</FormControl>
										<FormControl isRequired>
											<FormLabel size="sm" color={"#151633"}>
													Course Faculty
											</FormLabel>
											<Select 
												width="100%" 
												name="faculty" 
												value={courseInfo.faculty}
												required 
												onChange={handleChange} 
												sx={{ marginBottom: "20px" }}
												placeholder="CHOOSE FACULTY"
												bg="#fff"
											>
												<option value="SAAT">SAAT - School of Agriculture And Agricultural Technology</option>
												<option value="SBMS">SBMS - School of Basic Medical Science</option>
												<option value="SEET">SEET - School of Engineering and Engineering Technology</option>
												<option value="SESET">SESET - School of Electrical Systems and Engineering Technology</option>
												<option value="SICT">SICT - School of Information and Communication Technology</option>
												<option value="SLIT">SLIT - School of Logistics and Innovation Technology</option>
												<option value="SOBS">SOBS - School of Biological Science</option>
												<option value="SOES">SOES - School of Environmental Science</option>
												<option value="SOHT">SOHT - School of Health Technology</option>
												<option value="SOPS">SOPS - School of Physical Science</option>
												<option value="SPGS">SPGS - School of Postgraduate Studies</option>
											</Select>
										</FormControl>
										<FormControl isRequired>
											<FormLabel size="sm" color={"#151633"}>
													Course Level
											</FormLabel>
											<Select isRequired name="level" value={courseInfo.level} onChange={handleChange} sx={{ marginBottom: "20px" }} bg="#fff">
												<option value={"100"}>100</option>
												<option value={"200"}>200</option>
												<option value={"300"}>300</option>
												<option value={"400"}>400</option>
												<option value={"500"}>500</option>
											</Select>
										</FormControl>
										<FormControl isRequired>
											<FormLabel size="sm" color={"#151633"}>
													Semester
											</FormLabel>
											<Select isRequired name="semester" value={courseInfo.semester} onChange={handleChange} sx={{ marginBottom: "20px" }} bg="#fff">
												<option value={"1"}>Harmattan Semester</option>
												<option value={"2"}>Rain Semester</option>
											</Select>
										</FormControl>
										<FormControl>
											<FormLabel size="sm" color={"#151633"}>
													Upload Class List
											</FormLabel>
											<Input 
												type="file" 
												multiple
												name="classList"
												onChange={handleFileChange} sx={{ marginBottom: "20px" }} bg="#fff" 
												accept="application/csv"
											/>
										</FormControl>
									</Box>
								</Flex>
								<Flex alignItems={"center"} justifyContent={"center"} gap={"20px"}>
									<Button 
										onClick={handleCancel} 
										maxWidth={"200px"} 
										border={"1px solid #EB5757"} 
										color={"#EB5757"}
									>
										Cancel
									</Button>
									<Button 
										type="submit" 
										colorScheme="brand" 
										mr={2} maxWidth={"200px"} 
										isLoading={createCourseMutation.isLoading || coursePhotoMutation.isLoading || enrollStudentMutation.isLoading}
									>
										Create
									</Button>
								</Flex>
							</VStack>
					</Box>
				</Box>
			</Flex>
		</Box>
	);
};

export default EditCourse;
