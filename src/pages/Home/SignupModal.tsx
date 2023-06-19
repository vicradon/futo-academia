import { Modal, ModalOverlay, ModalContent, ModalBody, ModalCloseButton, Button, useDisclosure, Text, Flex, FormControl, FormLabel, Input, Heading } from "@chakra-ui/react";
import { FormEvent, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import PasswordInput from "../../components/PasswordInput";
import OtherBioModal from "./OtherBioModal";

export default function SignupModal() {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { isOpen: otherBioModalIsOpen, onOpen: openOtherBioModal, onClose: closeOtherBioModal } = useDisclosure();
	const [userMode, setUserMode] = useState<"Student" | "Lecturer">("Student");
	const params = useSearchParams();

	useEffect(() => {
		if (params[0].get("userMode") === "Student") {
			setUserMode("Student");
		} else {
			setUserMode("Lecturer");
		}
	}, []);

	const handleSignup = async (event: FormEvent) => {
		event.preventDefault();
		onClose();
		openOtherBioModal();
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
							<Heading color={"brand.500"}>Sign Up ({userMode})</Heading>
							<Text>Please fill in your details</Text>

							<Flex onSubmit={handleSignup} my={4} alignItems={"center"} rowGap={6} flexDirection={"column"} as="form">
								<FormControl>
									<FormLabel textTransform={"uppercase"}>Full name</FormLabel>
									<Input type="text" />
								</FormControl>

								<FormControl>
									<FormLabel textTransform={"uppercase"}>Registration Number</FormLabel>
									<Input type="text" />
								</FormControl>

								<FormControl>
									<FormLabel textTransform={"uppercase"}>Faculty</FormLabel>
									<Input type="text" />
								</FormControl>

								<FormControl>
									<FormLabel textTransform={"uppercase"}>Department</FormLabel>
									<Input type="text" />
								</FormControl>

								<FormControl>
									<FormLabel textTransform={"uppercase"}>Email</FormLabel>
									<Input type="email" />
								</FormControl>

								<FormControl>
									<FormLabel textTransform={"uppercase"}>Password</FormLabel>

									<PasswordInput />
								</FormControl>

								<Button type="submit" colorScheme="brand" size={"lg"}>
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
