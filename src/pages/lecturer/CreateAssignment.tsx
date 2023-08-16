import { useState } from "react";
import { Flex, Box, Button, chakra, FormControl, FormLabel, Input, Select, Textarea, VStack, Heading } from "@chakra-ui/react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../layout/Sidebar";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import HumanitiesImage from "../../assets/images/humanities.png";
import HtmlEditor from "../lecturer/HtmlEditor";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Menu, MenuButton, MenuList, MenuItem, MenuItemOption, MenuGroup, MenuOptionGroup, MenuDivider } from "@chakra-ui/react";

const CreateAssignment = () => {
	const [num, setNum] = useState(1);

	const increase = () => {
		setNum(num + 1);
	};

	const decrease = () => {
		if (num > 1) setNum(num - 1);
	};
	const handleCancel = () => {
		window.history.back();
	};

	return (
		<>
			<Box bg={"#F3F6FF"}>
				<Navbar bgColor="#F3F6FF"  />

				<div className="bod">
					<div className="side"> 
						<Sidebar />
					</div>
					<div className="board">
						<div className="futo">
							<div className="futoimg">
								<img src={HumanitiesImage} alt="humanities" />
							</div>
							<div className="text">
								<h1>HUMANITIES</h1>
								<div className="txt">
									<p className="gst">GST 103</p>
									<p className="unit">3 units</p>
									<p className="stdnts">122 students</p>
								</div>
								<p className="interest">This course is is very interesting</p>
							</div>
						</div>

						<div className="course">
							<p>Course Summary</p>
							<span className="diff">
								<p>Assignments</p>
							</span>
							<p>Tests</p>
							<p>Examination</p>
						</div>
						<div className="bk">
							<svg xmlns="http://www.w3.org/2000/svg" height="1em" className="arrw" viewBox="0 0 320 512">
								<path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z" />
							</svg>
							<h2 className="back">Back</h2>
						</div>
						<h2 className="assign">Assignment</h2>
						<form className="inc">
							<div className="title">
								<label className="tit">Title</label>
								<br />
								<input type="text" id="funame" name="fname" value="Food Science and Technology 201" />
								<br />
								<div className="increment">
									<p>No of questions</p>
									<span className="minus" onClick={decrease}>
										-
									</span>
									<span className="numone">{num}</span>
									<span className="plus" onClick={increase}>
										+
									</span>
								</div>
							</div>
							<div className="ins">
								<label className="instruct">Instruction</label>
								<br />
								<input type="text" className="luname" />
								<br />
								<br />
							</div>
						</form>

						<div className="ans">
							<HtmlEditor />
						</div>
						<div className="anodaans">
							<p className="answer">Answer</p>
							<div className="menubtn">
								<Menu>
									<MenuButton as={Button} rightIcon={<ExpandMoreIcon />}>
										<span className="actions">Answer type</span>
									</MenuButton>
									<MenuList>
										<MenuItem>Download</MenuItem>
										<MenuItem>Create a Copy</MenuItem>
										<MenuItem>Mark as Draft</MenuItem>
										<MenuItem>Delete</MenuItem>
										<MenuItem>Attend a Workshop</MenuItem>
									</MenuList>
								</Menu>
							</div>
						</div>
						<div className="space">
							<input type="text" id="lname" className="laname" />
							<br />
							<br />
							<div className="lastbtn">
								<Flex alignItems={"center"} justifyContent={"end"} gap={"20px"}>
									<Button onClick={handleCancel} width={"200px"} border={"1px solid #EB5757"} color={"#EB5757"}>
										Cancel
									</Button>
									<Button colorScheme="brand" mr={2} width={"200px"}>
										Done
									</Button>
								</Flex>
							</div>
						</div>
					</div>
				</div>
			</Box>
		</>
	);
};

export default CreateAssignment;
