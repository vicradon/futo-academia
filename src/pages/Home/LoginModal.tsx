import { useState } from "react";
import { Modal, ModalOverlay, ModalContent, ModalBody, ModalCloseButton, Button, useDisclosure, Text, Flex, FormControl, FormLabel, Input, Heading } from "@chakra-ui/react";
import PasswordInput from "../../components/PasswordInput";
import useLogin from "../../hooks/useLogin";

export default function LoginModal() {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [user, setUser] = useState({
		username: "",
		password: "",
	});

	const loginMutation = useLogin();

	return (
		<>
			<Button variant={"secondary"} onClick={onOpen}>
				Login
			</Button>

			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalCloseButton />
					<ModalBody>
						<Flex pt={8} alignItems={"center"} rowGap={"0.5rem"} flexDirection={"column"}>
							<Heading color={"brand.500"}>Login (Student)</Heading>
							<Text>Please fill in your details</Text>

							<Flex my={8} alignItems={"center"} rowGap={"0.5rem"} flexDirection={"column"} as="form">
								<FormControl>
									<FormLabel textTransform={"uppercase"}>username</FormLabel>
									<Input
										type="text"
										id="username"
										name="username"
										autoComplete="name"
										required
										onChange={(e) => {
											setUser({
												...user,
												username: e.target.value,
											});
										}}
									/>
								</FormControl>

								<PasswordInput
									onChange={(e: any) => {
										console.log("Password", e.target.value);
										setUser({
											...user,
											password: e.target.value,
										});
									}}
								/>

								<Button my={8} w={"60%"} colorScheme="brand" onClick={() => loginMutation.mutate(user)} isLoading={loginMutation.isLoading} size={"lg"}>
									Continue
								</Button>

								<Flex>
									<Text>Forgot Password?</Text>
									<Button variant={"link"}>Click Here</Button>
								</Flex>
							</Flex>
						</Flex>
					</ModalBody>
				</ModalContent>
			</Modal>
		</>
	);
}
