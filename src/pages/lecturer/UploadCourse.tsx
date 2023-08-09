import { useState } from "react";
import { Flex, Box, Button, chakra, FormControl, FormLabel, Input, Select, Textarea, VStack, Heading } from "@chakra-ui/react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../layout/Sidebar";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";

const UploadCourse = () => {
	const navigate = useNavigate();
	const [courseTitle, setCourseTitle] = useState("");
	const [courseUnit, setCourseUnit] = useState("");
	const [courseCode, setCourseCode] = useState("");
	const [courseDescription, setCourseDescription] = useState("");
	const [courseCoverImage, setCourseCoverImage] = useState<File | null>(null);
	const [semester, setSemester] = useState("");
	const [courseMaterial, setCourseMaterial] = useState<File[]>([]);
	const [submittedData, setSubmittedData] = useState<any>(null);

	const handleGoBack = () => {
		navigate(-1);
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

	const handleCourseTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setCourseTitle(event.target.value);
	};

	const handleCourseUnitChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setCourseUnit(event.target.value);
	};

	const handleCourseCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setCourseCode(event.target.value);
	};

	const handleCourseDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		setCourseDescription(event.target.value);
	};
	const handleCourseCoverImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files) {
			setCourseCoverImage(event.target.files[0]);
		}
	};

	const handleSemesterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setSemester(event.target.value);
	};

	const handleCourseMaterialChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files) {
			setCourseMaterial(Array.from(event.target.files));
		}
	};

	const handleCancel = () => {
		window.history.back();
	};

	const handleSubmit = () => {
		const data = {
			courseTitle,
			courseUnit,
			courseCode,
			courseDescription,
			courseCoverImage,
			semester,
			courseMaterial,
		};
		setSubmittedData(data);
	};

	return (
		<Box bg={"#F3F6FF"}>
			<Navbar bgColor="#F3F6FF" />
			<Flex gap={"2vw"} paddingTop={"110px"}>
				<Sidebar />
				<Box paddingTop={"20px"} sx={{ marginRight: "50px" }}>
					<HoverableArrowBackIcon onClick={handleGoBack} />
					<Box padding={"40px 80px"} width={"73vw"}>
						{submittedData ? (
							<>
								<Box fontSize="xl" fontWeight="bold" mb={4}>
									Uploaded Course Details
								</Box>
								<Box>
									<strong>Course Title:</strong> {submittedData.courseTitle}
								</Box>
								<Box>
									<strong>Course Unit:</strong> {submittedData.courseUnit}
								</Box>

								<Button mt={4} onClick={handleGoBack}>
									Go Back
								</Button>
							</>
						) : (
							<>
								<Box fontWeight="bold" mb={10} color={"#585AD4"} textAlign={"center"}>
									<Heading size="lg">Upload New Course</Heading>
								</Box>
								<VStack spacing={4} align="stretch">
									{" "}
									<Flex justifyContent={"space-between"}>
										<Box>
											<FormControl>
												<FormLabel>
													<Heading size="sm" color={"#151633"}>
														Title
													</Heading>
												</FormLabel>
												<Input value={courseTitle} onChange={handleCourseTitleChange} bg="#fff" placeholder="Enter title here" sx={{ marginBottom: "20px", width: "350px" }} />
											</FormControl>
											<FormControl>
												<FormLabel>
													<Heading size="sm" color={"#151633"}>
														Course Unit
													</Heading>
												</FormLabel>

												<Select value={courseUnit} onChange={handleCourseUnitChange} sx={{ marginBottom: "20px" }} bg="#fff">
													<option value="2">2 Units</option>
													<option value="3">3 Units</option>
													<option value="4">4 Units</option>
													<option value="5">5 Units</option>
													<option value="6">6 Units</option>
												</Select>
											</FormControl>
											<FormControl>
												<FormLabel>
													<Heading size="sm" color={"#151633"}>
														Course Code
													</Heading>
												</FormLabel>
												<Input value={courseCode} onChange={handleCourseCodeChange} sx={{ marginBottom: "20px" }} bg="#fff" />
											</FormControl>
											<FormControl>
												<FormLabel>
													<Heading size="sm" color={"#151633"}>
														Description
													</Heading>
												</FormLabel>
												<Textarea value={courseDescription} onChange={handleCourseDescriptionChange} sx={{ marginBottom: "20px" }} bg="#fff" />
											</FormControl>
										</Box>
										<Box>
											<FormControl>
												<FormLabel>
													<Heading size="sm" color={"#151633"}>
														Cover Image
													</Heading>
												</FormLabel>
												<Input type="file" accept="image/*" onChange={handleCourseCoverImageChange} sx={{ marginBottom: "20px" }} bg="#fff" />
											</FormControl>
											<FormControl>
												<FormLabel>
													<Heading size="sm" color={"#151633"}>
														Semester
													</Heading>
												</FormLabel>
												<Select value={semester} onChange={handleSemesterChange} sx={{ marginBottom: "20px" }} bg="#fff">
													<option value="harmattan">Harmattan Semester</option>
													<option value="rain">Rain Semester</option>
												</Select>
											</FormControl>
											<FormControl>
												<FormLabel>
													<Heading size="sm" color={"#151633"}>
														Uploading Course Material
													</Heading>
												</FormLabel>
												<Input type="file" multiple onChange={handleCourseMaterialChange} sx={{ marginBottom: "20px" }} bg="#fff" />
											</FormControl>
										</Box>
									</Flex>
									<Flex alignItems={"center"} justifyContent={"center"} gap={"20px"}>
										<Button onClick={handleCancel} width={"200px"} border={"1px solid #EB5757"} color={"#EB5757"}>
											Cancel
										</Button>
										<Button onClick={handleSubmit} colorScheme="brand" mr={2} width={"200px"}>
											Done
										</Button>
									</Flex>
								</VStack>
							</>
						)}
					</Box>
				</Box>
			</Flex>
		</Box>
	);
};

export default UploadCourse;
