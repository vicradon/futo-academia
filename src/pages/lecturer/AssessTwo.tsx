import { useState } from "react";
import { Flex, Box, Button, chakra, FormControl, FormLabel, Input, Select, Textarea, VStack, Heading } from "@chakra-ui/react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../layout/Sidebar";

import HumanitiesImage from "../../assets/images/humanities.png";




const CreateAssignment = () => {
	
	const handleCancel = () => {
		window.history.back();
	};

	return (
		<>
			<Box bg={"#F3F6FF"}>
				<Navbar bgColor="#F3F6FF" />

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
                        <h3 className="science">Food Science Technology 201</h3>
                        <p className="tobe">To be submitted on and before 11:00 am next Monday</p>
					
					

						
						<div className="anods">
							<p className="answer">Question</p>
						
							
						</div>
						<div className="space">
                            <form>
                            <label for ="fname" className="qname">Q 1.</label><br/>
                            <input type="text" id="fname" className="laname" name="fname" value="What is Nutrition?"/><br/>
							</form>
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
