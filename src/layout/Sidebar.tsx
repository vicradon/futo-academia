import { Box, Flex, Link, List, ListItem, Stack, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AutoStoriesOutlinedIcon from "@mui/icons-material/AutoStoriesOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";

const Sidebar = () => {
	// const reloadPage = () => {
	// 	window.location.reload();
	// };

	const [activeItem, setActiveItem] = useState("");
	const location = useLocation();

	//Logout Functionality
	const navigate = useNavigate();
	const handleLogout = () => {
		sessionStorage.clear();
		navigate("/login");
	};

	// update activeItem based on current location
	useEffect(() => {
		if (location.pathname === "/profile") {
			setActiveItem("profile");
		} else if (location.pathname === "/announcement") {
			setActiveItem("announcement");
		} else if (location.pathname === "/lecturer/courses" || location.pathname.startsWith("/lecturer/courses")) {
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
		<Box w="25vw" p="4" ml={"50px"} className="boxi">
			<Stack justify="center" mb="20">
				<Text fontWeight="bold" fontSize="30px" color={"#696CFF"} textAlign={"center"}>
					Hi Delvin
				</Text>
				<Text fontSize="16px">What are we learning today?</Text>
			</Stack>

			<List spacing="2">
				<ListItem padding={"10px"} mb={4} style={activeItem === "courses" ? activeLinkStyle : {}}>
					<Link href="/lecturer/courses" sx={{ textDecoration: "none" }}>
						<Flex alignItems={"center"}>
							<AutoStoriesOutlinedIcon sx={{ marginRight: "20px" }} />
							<p className="round">Courses</p>
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
				<ListItem padding={"10px"} mb={4} style={activeItem === "profile" ? activeLinkStyle : {}}>
					<Link href="/announcements">
						<Flex alignItems={"center"}>
							<NotificationsOutlinedIcon sx={{ marginRight: "20px" }} />
							Announcements{" "}
						</Flex>
					</Link>
				</ListItem>
			</List>

			<Flex mt="20" padding={"10px"}>
				<LogoutRoundedIcon sx={{ marginRight: "20px" }} />
				<Link onClick={handleLogout}>Logout</Link>
			</Flex>
		</Box>
	);
};

export default Sidebar;
