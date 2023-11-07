import { useEffect, useRef, useState } from "react";
import { Flex, Button, Box, Container, Input, FormControl, FormLabel, Text, Center, Avatar, Heading, Textarea } from "@chakra-ui/react";

import Navbar from "../../components/Navbar";
import Sidebar from "../../layout/Sidebar";
import { useUser } from "../../hooks/useUser";

export default function Profile() {
	const [, setSemester] = useState(1);
	const fileInputRef = useRef(null);
	const [edit, setEdit] = useState(false)

	const user = useUser();

	console.log("User", user);

	const [formData, setFormData] = useState<any>({
		name: "",
		title: "",
		firstName: "",
		middleName: "",
		lastName: "",
		faculty: "",
		department: "",
		bio: "",
		profilePicture: "",
	});

	useEffect(() => {
		setFormData(user);
	}, []);

	const handleChange = (event: any) => {
		const { name, value } = event.target;
		setFormData((prevData: any) => ({
			...prevData,
			[name]: value,
		}));
	};

	const handleSubmit = (event: any) => {
		event.preventDefault();

		const apiFormData = new FormData();
		// for (const key in formData) {
		// 	// console.log(formData[key])
		// 	if (formData[key] !== null) {
		// 		apiFormData.append(key, formData[key]);
		// 	}
		// }

		// Replace this with your API call logic
		Object.keys(formData).forEach((x) => console.log(apiFormData.getAll(x)));
		// Display form data before sending to API
	};

	const handleFileChange = (event: any) => {
		const file = event.target.files[0];
		setFormData((prevData: any) => ({
			...prevData,
			profilePicture: file,
		}));
	};

	const [showHarmattan, setShowHarmattan] = useState(true);
	const handleSemesterToggle = () => {
		setShowHarmattan((prevShowHarmattan) => !prevShowHarmattan);
	};

	const handleAvatarClick = () => {
		if (fileInputRef.current) {
			// fileInputRef.current.click();
		}
	};
	return (
		<Box bg={"#F3F6FF"}>
			<Navbar bgColor="#F3F6FF" />
			<Flex gap={"2vw"} paddingTop={"110px"}>
				<Sidebar />
				<Box my={8} w="100%" sx={{ marginRight: "50px" }}>
					<Container maxW={"73vw"}>
						<Flex my={8} justifyContent={"center"}>
							<Button
								// bgColor='#343680'
								sx={{ height: "2rem", margin: "0 0", borderRadius: 0 }}
								width={"200px"}
								variant={showHarmattan ? "solid" : "ghost"}
								colorScheme="purple"
								onClick={() => {
									setSemester(1);
									handleSemesterToggle();
								}}
							>
								My Profile
							</Button>
						</Flex>
						<form onSubmit={handleSubmit}>
							<Box>
								<Center>
									<Heading as="h1" size="sm" sx={{ color: "#585AD4", margin: "1rem 0" }}>
										Edit Profile
									</Heading>{" "}
									<br />
								</Center>
								<Center>
									<Flex justifyContent="center" alignItems="center">
										{/* <form onSubmit={handleSubmit}> */}
										<Box textAlign="center">
											<Avatar size="xl" src={formData.profilePicture ? "" : ""} sx={{ cursor: "pointer" }} onClick={handleAvatarClick} />
											<label>
												<Input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} display="none" />
												{/* <Button as="span" mt="2" colorScheme="blue">
                                                    Upload Profile Picture
                                                </Button> */}
											</label>
										</Box>
										{/* </form> */}
									</Flex>
								</Center>

								<Flex justifyContent="center" alignItems="start" height="100vh">
									<div style={{ width: "70%" }}>
										<FormControl>
											<Flex width="100%" mt="8">
												<FormLabel width="50%">Title</FormLabel>
												<FormLabel width="50%" ml="4">
													First Name
												</FormLabel>
											</Flex>
											<Flex width="100%" mb="8">
												{!edit ? 
												<Text
													width="50%"
													mr="2"
													fontSize={'1.2rem'}
												>
													{formData.title}
												</Text>
												:
												<Input
													width="50%"
													mr="2"
													placeholder={formData.title}
													name="title"
													value={formData.title }
													onChange={handleChange}
													sx={{ boxShadow: "0px 5px 28.5px 1.5px #9598C833", borderRadius: 0, height: "3rem" }}
												/>}
												{!edit ? 
												<Text
													width="50%"
													mr="2"
													fontSize={'1.2rem'}
												>
													{formData.name}
												</Text>
												:
												<Input
													width="50%"
													ml="2"
													placeholder="Thomas"
													name="firstName"
													value={formData.name}
													onChange={handleChange}
													sx={{ boxShadow: "0px 5px 28.5px 1.5px #9598C833", borderRadius: 0, height: "3rem" }}
												/>
											}
											</Flex>

											<Flex width="100%" mt="8">
												<FormLabel width="50%">Faculty </FormLabel>
												<FormLabel width="50%" ml="4">
													Department
												</FormLabel>
											</Flex>
											<Flex width="100%" mb="8">
											{!edit ? 
												<Text
													width="50%"
													mr="2"
													fontSize={'1.2rem'}
												>
													{formData.faculty}
												</Text>
												:
												<Input
													width="50%"
													mr="2"
													placeholder="Sops"
													name="faculty"
													value={formData.faculty}
													onChange={handleChange}
													sx={{ boxShadow: "0px 5px 28.5px 1.5px #9598C833", borderRadius: 0, height: "3rem" }}
												/>
												}
												{!edit ? 
												<Text
													width="50%"
													mr="2"
													fontSize={'1.2rem'}
												>
													{formData.department}
												</Text>
												:
												<Input
													width="50%"
													ml="2"
													placeholder="Computer science"
													name="department"
													value={formData.department}
													onChange={handleChange}
													sx={{ boxShadow: "0px 5px 28.5px 1.5px #9598C833", borderRadius: 0, height: "3rem" }}
												/>
												}
											</Flex>
											{/* <Flex width="100%" mt="8">
                                            <FormLabel width="50%">Faculty </FormLabel>
                                        </Flex>
                                        <Flex width="100%" mb="8">
                                            <Input width="50%" mr="2" placeholder="Sops" name="faculty" value={formData.faculty}
                                                onChange={handleChange} sx={{ boxShadow: '0px 5px 28.5px 1.5px #9598C833', borderRadius: 0, height: '3rem' }} />
                                        </Flex> */}
											<Flex width="100%" mt="8">
												<FormLabel width="50%">Bio </FormLabel>
											</Flex>
											<Flex width="100%" mb="8">
											{!edit ? 
												<Text
													width="50%"
													mr="2"
													fontSize={'1.2rem'}
												>
													{formData.bio ? formData.bio : <i>No bio</i>}
												</Text>
												:
												<Textarea
													width="100%"
													mr="2"
													placeholder="I am a  professor in Computer Science. Born  on  May 2nd 1972. I acquired My Bachelor Degree at the Federal University Technology Owerri, Imo in the year 1994.  "
													name="bio"
													value={formData.bio}
													onChange={handleChange}
													sx={{ boxShadow: "0px 5px 28.5px 1.5px #9598C833", borderRadius: 0, height: "10rem" }}
												/>
												}
											</Flex>
										</FormControl>

										{edit && <Button width="40%" mt="2" colorScheme="purple" bgColor="#696CFF" type="submit">
											Submit
										</Button>}
									</div>
								</Flex>
							</Box>
						</form>
					</Container>
				</Box>
			</Flex>
		</Box>
	);
}
