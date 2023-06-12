import { Modal, ModalOverlay, ModalContent, ModalBody, ModalCloseButton, Button, useDisclosure, Text, Flex, FormControl, FormLabel, Input, Heading } from "@chakra-ui/react";
import PasswordInput from "../../components/PasswordInput";

export default function LoginModal() {
	const { isOpen, onOpen, onClose } = useDisclosure();

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
									<FormLabel textTransform={"uppercase"}>Email</FormLabel>
									<Input type="email" />
								</FormControl>

								<PasswordInput />

								<Button my={8} w={"60%"} colorScheme="brand" size={"lg"}>
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
