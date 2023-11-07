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
	Select,
	Input,
} from "@chakra-ui/react";
import { FormEvent, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import PasswordInput from "../../components/PasswordInput";
import OtherBioModal from "./OtherBioModal";
import useSignUp from "../../hooks/useSignUp";

export default function SignupModal() {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { isOpen: otherBioModalIsOpen, onClose: closeOtherBioModal } = useDisclosure();
	const [, setUserMode] = useState<"Student" | "Lecturer">("Student");
	const params = useSearchParams();

	const [formData, setFormData] = useState<any>({
		name: "",
		id: null,
		faculty: "",
		department: "",
		email: "",
		role: "",
		password: "",
	});

	useEffect(() => {
		if (params[0].get("userMode") === "Student") {
			setUserMode("Student");
		} else {
			setUserMode("Lecturer");
		}
	}, []);

	useEffect(() => {
		if (formData?.role === "lecturer") {
			setFormData({ ...formData, id: null });
		}
	}, [formData?.role]);

	const handleSignup = async (event: FormEvent) => {
		event.preventDefault();

		console.log("Form", formData);
		signUpMutation.mutate(formData);
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
									<Input type="text" id="name" name="name" autoComplete='off' required onChange={handleInputChange} />
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
										<Input type="text" id="id" name="id" autoComplete='off' required onChange={handleInputChange} />
									</FormControl>
								)}

								<FormControl>
									<FormLabel textTransform={"uppercase"}>Faculty</FormLabel>
									<Input type="text" id="faculty" name="faculty" autoComplete="off" required onChange={handleInputChange} />
								</FormControl>

								<FormControl>
									<FormLabel textTransform={"uppercase"}>Department</FormLabel>
									<Input type="text" id="dept" name="department" autoComplete="off" required onChange={handleInputChange} />
								</FormControl>

								<FormControl>
									<FormLabel textTransform={"uppercase"}>Email</FormLabel>
									<Input type="email" id="email" name="email" autoComplete="off" required onChange={handleInputChange} />
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
