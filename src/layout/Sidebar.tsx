import { Box, Flex, Link, List, ListItem, Stack, Text, Button } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import AutoStoriesOutlinedIcon from "@mui/icons-material/AutoStoriesOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import { useUser } from "../hooks/useUser";

const Sidebar = () => {
	const user = useUser();

	const [activeItem, setActiveItem] = useState("");
	const location = useLocation();

	//Logout Functionality
	// const navigate = useNavigate();
	const handleLogout = () => {
		sessionStorage.clear();
		localStorage.clear();

		window.location.href = "/";
	};

	// update activeItem based on current location
	useEffect(() => {
		if (location.pathname === "/profile") {
			setActiveItem("profile");
		} else if (location.pathname === "/announcement") {
			// setActiveItem("announcement");
		} else if (location.pathname === "/lecturer/courses" || location.pathname.includes("courses") || location.pathname.startsWith("/lecturer/courses")) {
			setActiveItem("courses");
		}
	}, [location]);

	// define active and inactive colors
	const activeBackgroundColor = "#696CFF";

	// set style for active link
	const activeLinkStyle = {
		backgroundColor: activeBackgroundColor,
		textDecoration: "none",
		color: "#fff",
		transition: ".5s ease",
	};

	return (
		<Box  p="30px" display={{base: "none", md: "block"}} >
			<Stack flexDir="row" justify="center" mb="20" textAlign={"center"}>
				<Text fontWeight="bold" fontSize="30px" color={"#696CFF"} textAlign={"center"} textTransform={"capitalize"}>
					{user?.name}
				</Text>
			</Stack>

			<List spacing="2">
				<ListItem padding={"10px"} mb={4} style={activeItem === "courses" ? activeLinkStyle : {}}>
					<Link href="/lecturer/courses" sx={{ textDecoration: "none" }}>
						<Flex alignItems={"center"}>
							<AutoStoriesOutlinedIcon sx={{ marginRight: "20px" }} />
							Courses
						</Flex>
					</Link>
				</ListItem>
				<ListItem padding={"10px"} mb={4} style={activeItem === "profile" ? activeLinkStyle : {}}>
					<Link href="/profile">
						<Flex alignItems={"center"}>
							<PersonOutlineOutlinedIcon sx={{ marginRight: "20px" }} />
							Profile
						</Flex>
					</Link>
				</ListItem>
			</List>

			<Flex mt="20" padding={"10px"}>
				<LogoutRoundedIcon sx={{ marginRight: "20px" }} />
				<Button onClick={handleLogout}>Logout</Button>
			</Flex>
		</Box>
	);
};

export default Sidebar;
