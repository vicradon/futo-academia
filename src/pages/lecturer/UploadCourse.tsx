import { ChangeEvent, FormEvent, useState } from "react";
import { Flex, Box, Button, chakra, FormControl, FormLabel, Input, Select, Textarea, VStack, Heading } from "@chakra-ui/react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../layout/Sidebar";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import { useCreateCourse, useUploadCourseCover } from "../../hooks/useCourses";
import { useEnrollStudents } from "../../hooks/useEnrollments";

const UploadCourse = () => {
	const navigate = useNavigate();
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

	// const handleFileChange = (event:ChangeEvent<HTMLInputElement>) => {
	// 	const file = event.target.files?.length === 1 ? event.target.files[0] : null;
	// 	setCourseInfo((prevCourseInfo) => ({
	// 	...prevCourseInfo,
	// 	[name]: file,
	// 	}));
	// };

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
			});

			enrollStudentMutation.mutate({
				file: courseInfo.classList,
				course_code: courseInfo.code,
			});

			coursePhotoMutation.mutate({ course_code: courseInfo.code, file: courseInfo.coverImage });

			if (coursePhotoMutation.isSuccess && enrollStudentMutation.isSuccess && createCourseMutation.isSuccess) {
				// navigate('/somewhere')
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<Box bg={"#F3F6FF"} >
			<Navbar bgColor="#F3F6FF" />
			<Flex gap={"2vw"} paddingTop={"110px"}>
				<Sidebar />
				<Box paddingTop={"20px"} sx={{ marginRight: "50px" }}>
					<HoverableArrowBackIcon onClick={handleGoBack} marginLeft={"30px"} />
					<Box padding={"20px 20px"} width={{base: "100vw", md: "73vw"}} maxWidth={"1200px"}>
							<Box fontWeight="bold" mb={10} color={"#585AD4"} textAlign={"center"}>
								<Heading size="lg">Upload New Course</Heading>
							</Box>
						<form onSubmit={handleSubmit}>
							<VStack spacing={4} >
								<Flex justifyContent={"space-between"} columnGap={4} as="form" onSubmit={handleSubmit} width={"100%"} p={"0rem"} flexDir={{base: "column", md: "row"}}>
									<Box width={{base: "100%", md: "50%"}}>
										<FormControl isRequired>
											<FormLabel display={"flex"} columnGap={4}>
												<Heading size="sm" color={"#151633"} >
													Title
												</Heading>
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
										<FormControl>
											<FormLabel display={"flex"} columnGap={4}>
												<Heading size="sm" color={"#151633"}>
													Course Units
												</Heading>
											</FormLabel>

											<Select required name="unit" value={courseInfo.unit} onChange={handleChange} sx={{ marginBottom: "20px" }} bg="#fff">
												<option value="1">1</option>
												<option value="2">2</option>
												<option value="3">3</option>
												<option value="4">4</option>
												<option value="5">5</option>
												<option value="6">6</option>
											</Select>
										</FormControl>
										<FormControl isRequired>
											<FormLabel display={"flex"} columnGap={4}>
												<Heading size="sm" color={"#151633"}>
													Course Code
												</Heading>
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
										<FormControl>
											<FormLabel>
												<Heading size="sm" color={"#151633"}>
													Description
												</Heading>
											</FormLabel>
											<Textarea 
												value={courseInfo.description} 
												name="description"
												onChange={handleChange} sx={{ marginBottom: "20px" }} bg="#fff" />
										</FormControl>
									</Box>
									<Box width={{base: "100%", md: "50%"}} >
										<FormControl>
											<FormLabel>
												<Heading size="sm" color={"#151633"}>
													Cover Image
												</Heading>
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
											<FormLabel display={"flex"} columnGap={4}>
												<Heading size="sm" color={"#151633"}>
													Course Faculty
												</Heading>
											</FormLabel>
											<Select 
												width="100%" 
												name="faculty" 
												required 
												onChange={handleChange} 
												sx={{ marginBottom: "20px" }}
												placeholder="CHOOSE FACULTY"
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
											<FormLabel display={"flex"} columnGap={4}>
												<Heading size="sm" color={"#151633"}>
													Course Level
												</Heading>
											</FormLabel>
											<Select isRequired name="level" value={courseInfo.level} onChange={handleChange} sx={{ marginBottom: "20px" }} bg="#fff">
												<option value={"100"}>100</option>
												<option value={"200"}>200</option>
												<option value={"300"}>300</option>
												<option value={"400"}>400</option>
												<option value={"500"}>500</option>
											</Select>
										</FormControl>
										<FormControl>
											<FormLabel>
												<Heading size="sm" color={"#151633"}>
													Semester
												</Heading>
											</FormLabel>
											<Select isRequired name="semester" value={courseInfo.semester} onChange={handleChange} sx={{ marginBottom: "20px" }} bg="#fff">
												<option value={"1"}>Harmattan Semester</option>
												<option value={"2"}>Rain Semester</option>
											</Select>
										</FormControl>
										<FormControl isRequired>
											<FormLabel display={"flex"} columnGap={4}>
												<Heading size="sm" color={"#151633"}>
													Upload Class List
												</Heading>
											</FormLabel>
											<Input 
												required 
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
										isLoading={createCourseMutation.isLoading}
										// isActive={courseTitle && courseCode && courseFaculty && courseDescription ? true : false}
									>
										Create
									</Button>
								</Flex>
							</VStack>
						</form>
					</Box>
				</Box>
			</Flex>
		</Box>
	);
};

export default UploadCourse;
