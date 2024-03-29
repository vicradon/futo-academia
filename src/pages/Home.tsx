import { Flex, Heading, Text, Box, Grid, Image } from "@chakra-ui/react";
import HomeLayout from "../layout/HomeLayout";
import SignupModal from "./Home/SignupModal";
import students from "../assets/images/students.png";
import line1 from "../assets/bg-images/line1.png";
import line2 from "../assets/bg-images/line2.png";
import line3 from "../assets/bg-images/line3.png";
import line4 from "../assets/bg-images/line4.png";
import LoginModal from "./Home/LoginModal";

export default function Home() {
	return (
		<HomeLayout
			height={"100vh"}
			styles={{
				backgroundImage: `url(${line1}), url(${line2}), url(${line3}), url(${line4})`,
				backgroundPosition: "-15% -15%, -24% -24%, 95% 95%, 120% 120%",
				backgroundRepeat: "no-repeat, no-repeat, no-repeat, no-repeat",
			}}
		>
			<Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} columnGap={"1rem"} justifyItems={"right"}>
				<Box marginTop={12} marginLeft={{ base: 4, md: 20 }}>
					<Box mb={12}>
						<Heading color={"brand.500"} mb={"-30px"} fontSize={{ base: "80px", md: "120px" }}>
							Futo
						</Heading>
						<Heading color={"brand.500"} fontSize={{ base: "40px", md: "70px" }}>
							Academia
						</Heading>
					</Box>

					<Text mb={12}>An Open Source Website For FUTO students with Over 10,000 Courses, Professional degrees and Certificates</Text>

					<Flex columnGap={4}>
						<SignupModal />
						<LoginModal />
					</Flex>
				</Box>

				<Box
					display={{ base: "none", md: "block" }}
					backgroundColor={"brand.500"}
					width={{ base: "370px", md: "430px", xl: "570px" }}
					borderRadius={{ base: "30px", md: "50px", xl: "98.1002px 98.1002px 49.0501px 49.0501px" }}
				>
					<Image src={students} alt="students standing" width={{ base: "400px", md: "450px", xl: "600px" }} />
				</Box>
			</Grid>
		</HomeLayout>
	);
}
