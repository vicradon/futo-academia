import { ReactNode } from "react";

import { Flex, Box } from "@chakra-ui/react";
import Sidebar from "./SidebarLecturer";
import Navbar from "../components/Navbar";

export default function AdminLayout({ children }: { children: ReactNode }) {
	return (
		<Box bg={"#F3F6FF"} minH={"100vh"}>
			<Navbar bgColor="#F3F6FF" />
			<Flex gap={"2vw"} paddingTop={"110px"}>
				<Sidebar />
				<Box my={8} sx={{ marginRight: "50px", width: "100%" }}>
					{children}
				</Box>
			</Flex>
		</Box>
	);
}
