import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalBody,
	ModalCloseButton,
	Button,
	useDisclosure,
	Text,
	Flex,
	FormControl,
	FormLabel,
	Heading,
	useToast,
	Select,
	Input,
	InputGroup,
	Image,
	InputRightElement,
} from "@chakra-ui/react";
import { FormEvent, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import PasswordInput from "../../components/PasswordInput";
import EyeIcon from "../../assets/icons/eye.svg";
import OtherBioModal from "./OtherBioModal";
import useSignUp from "../../hooks/useSignUp";

export default function SignupModal() {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { isOpen: otherBioModalIsOpen, onOpen: openOtherBioModal, onClose: closeOtherBioModal } = useDisclosure();
	const [userMode, setUserMode] = useState<"Student" | "Lecturer">("Student");
	const params = useSearchParams();
	const toast = useToast();

	const [formData, setFormData] = useState<any>({
		name: "",
		id: "",
		faculty: "",
		department: "",
		email: "",
		role: "",
		password: "",
	});

	const [showPassword, setShowPassword] = useState(false);

	useEffect(() => {
		if (params[0].get("userMode") === "Student") {
			setUserMode("Student");
		} else {
			setUserMode("Lecturer");
		}
	}, []);

	useEffect(() => {
		if (formData?.role === "lecturer") {
			setFormData({ ...formData, id: 0 });
		}
	}, [formData?.role]);

	const handleSignup = async (event: FormEvent) => {
		event.preventDefault();

		console.log("Form", formData);
		signUpMutation.mutate(formData);

		// openOtherBioModal();
	};

	const signUpMutation = useSignUp();

	const handleInputChange = (e: any) => {
		setFormData({
			...formData,
			[e?.target?.name]: e.target.value,
		});
	};

	return (
		<>
			<Button colorScheme="brand" onClick={onOpen}>
				Signup
			</Button>

			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalCloseButton />
					<ModalBody>
						<Flex p={8} alignItems={"center"} rowGap={"0.5rem"} flexDirection={"column"}>
							<Heading color={"brand.500"}>Sign Up </Heading>
							<Text>Please fill in your details</Text>
							<Flex onSubmit={handleSignup} my={4} alignItems={"center"} rowGap={6} flexDirection={"column"} as="form">
								<FormControl>
									<FormLabel textTransform={"uppercase"}>Full name</FormLabel>
									<Input type="text" id="name" name="name" autoComplete="name" required onChange={handleInputChange} />
								</FormControl>

								<FormControl>
									<FormLabel textTransform={"uppercase"}>Role</FormLabel>
									<Select name="role" placeholder="Select Role" onChange={handleInputChange}>
										<option value={"student"}>Student</option>
										<option value={"lecturer"}>Lecturer</option>
									</Select>
								</FormControl>

								{formData?.role === "student" && (
									<FormControl>
										<FormLabel textTransform={"uppercase"}>Registration Number</FormLabel>
										<Input type="text" id="regNo" name="id" autoComplete="" required onChange={handleInputChange} />
									</FormControl>
								)}

								<FormControl>
									<FormLabel textTransform={"uppercase"}>Faculty</FormLabel>
									<Input type="text" id="faculty" name="faculty" autoComplete="" required onChange={handleInputChange} />
								</FormControl>

								<FormControl>
									<FormLabel textTransform={"uppercase"}>Department</FormLabel>
									<Input type="text" id="dept" name="department" autoComplete="" required onChange={handleInputChange} />
								</FormControl>

								<FormControl>
									<FormLabel textTransform={"uppercase"}>Email</FormLabel>
									<Input type="email" id="email" name="email" autoComplete="email" required onChange={handleInputChange} />
								</FormControl>

								<FormControl>
									<FormLabel>Password</FormLabel>
									<PasswordInput name="password" value={formData.password} onChange={handleInputChange} />
									{/* <InputGroup size="md">
											<Input
												// value={value}
												onChange={(e) => {
													setSignUp({
														...signUp,
														[e?.target?.name]: e.target.value,
													});
												}}
												name="password"
												type={showPassword ? "text" : "password"}
											/>

											<InputRightElement width="4.5rem">
												<Button h="1.75rem" size="sm" onClick={() => setShowPassword(!showPassword)}>
													<Image src={EyeIcon} alt={"eye icon"} />
												</Button>
											</InputRightElement>
										</InputGroup>	 */}
								</FormControl>

								<Button type="submit" colorScheme="brand" isLoading={signUpMutation.isLoading} size={"lg"}>
									Continue
								</Button>

								<Flex>
									<Text>Already have an account?</Text>
									<Button p={0} variant={"link"}>
										Login
									</Button>
								</Flex>
							</Flex>
						</Flex>
					</ModalBody>
				</ModalContent>
			</Modal>
			<OtherBioModal isOpen={otherBioModalIsOpen} onClose={closeOtherBioModal} />
		</>
	);
}
