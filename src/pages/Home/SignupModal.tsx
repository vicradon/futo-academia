import { Modal, ModalOverlay, ModalContent, ModalBody, ModalCloseButton, Button, useDisclosure, Text, Flex, FormControl, FormLabel, Input, Heading } from "@chakra-ui/react";
import { FormEvent, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import PasswordInput from "../../components/PasswordInput";
import OtherBioModal from "./OtherBioModal";
import useSignUp from "../../hooks/useSignUp";

export default function SignupModal() {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { isOpen: otherBioModalIsOpen, onOpen: openOtherBioModal, onClose: closeOtherBioModal } = useDisclosure();
	const [userMode, setUserMode] = useState<"Student" | "Lecturer">("Student");
	const params = useSearchParams();
	const [signUp, setSignUp] = useState({
		name: "",
		regNo: "",
		faculty: "",
		department: "",
		email: "",
	});

	useEffect(() => {
		if (params[0].get("userMode") === "Student") {
			setUserMode("Student");
		} else {
			setUserMode("Lecturer");
		}
	}, []);

	const handleSignup = async (event: FormEvent) => {
		event.preventDefault();

		console.log("Form", signUp);
		onClose();
		openOtherBioModal();
	};

	const signUpMutation = useSignUp();

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
							<Heading color={"brand.500"}>Sign Up ({userMode})</Heading>
							<Text>Please fill in your details</Text>
							<Flex onSubmit={handleSignup} my={4} alignItems={"center"} rowGap={6} flexDirection={"column"} as="form">
								<FormControl>
									<FormLabel textTransform={"uppercase"}>Full name</FormLabel>
									<Input
										type="text"
										id="name"
										name="name"
										autoComplete="name"
										required
										onChange={(e) => {
											setSignUp({
												...signUp,
												name: e.target.value,
											});
										}}
									/>
								</FormControl>

								<FormControl>
									<FormLabel textTransform={"uppercase"}>Registration Number</FormLabel>
									<Input
										type="text"
										id="regNo"
										name="regNo"
										autoComplete=""
										required
										onChange={(e) => {
											setSignUp({
												...signUp,
												regNo: e.target.value,
											});
										}}
									/>
								</FormControl>

								<FormControl>
									<FormLabel textTransform={"uppercase"}>Faculty</FormLabel>
									<Input
										type="text"
										id="faculty"
										name="faculty"
										autoComplete=""
										required
										onChange={(e) => {
											setSignUp({
												...signUp,
												faculty: e.target.value,
											});
										}}
									/>
								</FormControl>

								<FormControl>
									<FormLabel textTransform={"uppercase"}>Department</FormLabel>
									<Input
										type="text"
										id="dept"
										name="dept"
										autoComplete=""
										required
										onChange={(e) => {
											setSignUp({
												...signUp,
												department: e.target.value,
											});
										}}
									/>
								</FormControl>

								<FormControl>
									<FormLabel textTransform={"uppercase"}>Email</FormLabel>
									<Input
										type="email"
										id="email"
										name="email"
										autoComplete="email"
										required
										onChange={(e) => {
											setSignUp({
												...signUp,
												email: e.target.value,
											});
										}}
									/>
								</FormControl>

								<FormControl>
									<FormLabel textTransform={"uppercase"}>Password</FormLabel>

									<PasswordInput />
								</FormControl>

								<Button type="submit" colorScheme="brand" onClick={() => signUpMutation.mutate(signUp)} isLoading={signUpMutation.isLoading} size={"lg"}>
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
