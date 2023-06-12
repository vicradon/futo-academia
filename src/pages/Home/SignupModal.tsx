import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	Button,
	useDisclosure,
	Text,
	Flex,
	Box,
	FormControl,
	FormLabel,
	FormErrorMessage,
	FormHelperText,
	Input,
	InputRightElement,
	InputGroup,
} from "@chakra-ui/react";
import { useState } from "react";
import Navlink from "../../components/Navlink";

export default function SignupModal() {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [showPassword, setShowPassword] = useState(false);

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
						<Flex alignItems={"center"} rowGap={"0.5rem"} flexDirection={"column"}>
							<Text color={"brand.500"}>Sign Up (Student)</Text>
							<Text>Please fill in your details</Text>

							<Flex alignItems={"center"} rowGap={"0.5rem"} flexDirection={"column"} as="form">
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

									<InputGroup size="md">
										<Input type={showPassword ? "text" : "password"} />

										<InputRightElement width="4.5rem">
											<Button h="1.75rem" size="sm" onClick={() => setShowPassword(!showPassword)}>
												{showPassword ? "Hide" : "Show"}
											</Button>
										</InputRightElement>
									</InputGroup>
								</FormControl>

								<Button colorScheme="primary" size={"lg"}>
									Continue
								</Button>

								<Flex columnGap={"0.5rem"}>
									<Text>Already have an account?</Text>
									<Button variant={"link"}>Login</Button>
								</Flex>
							</Flex>
						</Flex>
					</ModalBody>
				</ModalContent>
			</Modal>
		</>
	);
}
