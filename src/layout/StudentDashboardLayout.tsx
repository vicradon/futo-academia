import { Avatar, Box, Button, Container, Flex, FormControl, FormLabel, Grid, Image, Input, Link, ListItem, Text, UnorderedList } from "@chakra-ui/react";
import { NavLink, Link as RouterLink } from "react-router-dom";
import { FacebookIcon, LinkedInIcon, TwitterIcon, WhatsAppIcon } from "../components/Icons";
import Logo, { LogoWhite } from "../components/Logo";
import styles from "./StudentDashboardLayout.module.css";
import Bell from "../assets/icons/bell.png";
import { useUser } from "../hooks/useUser";
import { useEffect, useState } from "react";

interface Props {
	children: React.ReactNode;
}

export default function StudentDashboardLayout({ children }: Props) {
	const user = useUser()
	const [userData, setUserData] = useState<any>({})

	useEffect(() => {
	  setUserData(user)
	  console.log(user)
	}, [user.isLoading])
	
	return (
		<Box>
			<Container maxW={"100vw"} bg={"yellow.100"}>
				<Flex paddingY={"1rem"} justifyContent={"space-between"}>
					<Logo />
						<Flex display={{ base: "flex", md: "flex" }} columnGap={2} alignItems={"center"}>
							<Image src={Bell} boxSize="35px" />
							<Avatar src={userData.photo_url} name={userData.name} as={NavLink} to={"/profile"}/>
						</Flex>
				</Flex>
			</Container>

			{children}

			<svg width={"100vw"} style={{ height: 0 }}>
				<defs>
					<clipPath clipPathUnits="objectBoundingBox" id="clipPath">
						<path
							className={styles.path}
							d="M502.084 15.2655C280.068 -23.8234 58.0097 20.574 0 54.3549V482H1566.26V15.2655L1553 28.5L1539 39L1525.5 48.25L1505.5 60L1480.5 68C1471 72.5 1459.22 73.6067 1448.5 75.0764C1137 117.798 716.717 53.0545 502.084 15.2655Z"
							fill="#4648AA"
						/>
					</clipPath>
				</defs>
			</svg>

			<Flex className={styles.clip_path} minHeight={"400px"} paddingTop={{ base: "150px", md: "50px", lg: 0 }} bgColor={"brand.700"} alignItems={"center"}>
				<Container maxW={"container.xl"}>
					<Grid templateColumns={{ base: "1fr", md: "1fr 1fr", lg: "1fr 1fr 1fr" }} rowGap={12}>
						<Box>
							<LogoWhite />

							<Text mt={8} color={"white"}>
								Join our social media pages
							</Text>

							<Grid width={"200px"} templateColumns={"1fr 1fr 1fr 1fr"} columnGap={0}>
								<WhatsAppIcon />
								<TwitterIcon />
								<LinkedInIcon />
								<FacebookIcon />
							</Grid>
						</Box>

						<Box as={"form"}>
							<FormControl mb={4}>
								<FormLabel color={"white"}>Subscribe to our newsletters</FormLabel>
								<Input bgColor={"white"} placeholder=" Input your e-mail" />
							</FormControl>

							<Button type="submit" colorScheme="brand" variant="secondary">
								Subscribe
							</Button>
						</Box>

						<UnorderedList color={"white"} justifySelf={{ base: "left", lg: "center" }}>
							<ListItem>
								<Link as={RouterLink} to="/profile">
									Profile
								</Link>
							</ListItem>
							<ListItem>
								<Link as={RouterLink} to="/notifications">
									Notifications
								</Link>
							</ListItem>
							<ListItem>
								<Link as={RouterLink} to="/contact">
									Contact Us
								</Link>
							</ListItem>
						</UnorderedList>
					</Grid>
				</Container>
			</Flex>
		</Box>
	);
}
