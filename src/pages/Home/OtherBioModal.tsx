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
	Input,
	Heading,
	HStack,
	Box,
	Grid,
	Textarea,
	Image,
} from "@chakra-ui/react";
import PlaceholderPerson from "../../assets/icons/placeholder-person.svg";

interface Props {
	isOpen: boolean;
	onClose: () => void;
}
export default function OtherBioModal({ isOpen, onClose }: Props) {
	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<ModalOverlay />
			<ModalContent>
				{/* <ModalCloseButton /> */}
				<ModalBody>
					<Box as="form" p={8}>
						<Text textAlign={"center"}>Welcome to FUTO Academia, Delvin</Text>

						<Grid justifyContent={"center"} rowGap={8} my={8}>
							<Grid
								rowGap={4}
								width={"300px"}
								height={"200px"}
								justifyContent={"center"}
								padding={"1rem 0.5rem"}
								position={"relative"}
								boxShadow={"0px 8px 40px rgba(9, 44, 76, 0.16)"}
								borderRadius={8}
							>
								<Flex
									position={"absolute"}
									width={"150px"}
									height={"150px"}
									top={"-30px"}
									left={0}
									right={0}
									marginLeft={"auto"}
									marginRight={"auto"}
									rounded={"full"}
									bg={"brand.500"}
									padding={"1rem"}
								>
									<Image m={0} src={PlaceholderPerson} alt="Placeholder person" />
								</Flex>
								<Button width={"250px"} alignSelf={"end"} backgroundColor={"#092C4C"} colorScheme={"brand"} color={"white"}>
									Add Photo
								</Button>
							</Grid>
							<FormControl>
								<FormLabel>Major</FormLabel>
								<Input placeholder="Enter Major" />
							</FormControl>

							<FormControl>
								<FormLabel>Bio</FormLabel>
								<Textarea />
							</FormControl>
						</Grid>

						<HStack justifyContent={"center"}>
							<Button variant={"secondary"}>Skip</Button>
							<Button colorScheme={"brand"}>Done</Button>
						</HStack>
					</Box>
				</ModalBody>
			</ModalContent>
		</Modal>
	);
}
