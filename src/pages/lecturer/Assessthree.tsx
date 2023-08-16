import { useState } from "react";
import { Flex, Box, Button, chakra, FormControl, FormLabel,  Input, Select, Textarea, VStack, Heading } from "@chakra-ui/react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../layout/Sidebar";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import HumanitiesImage from "../../assets/images/humanities.png";
import add from "../../assets/images/add.png";
import edit from "../../assets/images/edit.png"
import line2 from "../../assets/images/line2.png"
import map from "../../assets/images/map.png"
import { Switch } from '@chakra-ui/react';



const Assessthree = () => {



	

	return (
        <>
		<Box bg={"#F3F6FF"}>
			<Navbar bgColor="#F3F6FF" />
			
				
                <div className="bod">
                <div className="side"><Sidebar /></div>
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
                        <p className="interest" >This course is is very interesting</p>
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
                <div className="save">
                
                    <h2 className="saved">Saved Assignment</h2>
                
                    <div className="editty">
                        <div><img src={add} alt="add"/></div>
                        <div><img src={edit} alt="edit"/></div>
                    </div>
                    <div className="notify">
                        {/* <h3>Notify students via email</h3> */}
                        <FormControl display='flex' alignItems='center'>
                        <FormLabel htmlFor='email-alerts' mb='0'>
                            Enable email alerts?
                        </FormLabel>
                        <Switch id='email-alerts' />
                        </FormControl>
                        </div>
                        </div>
                        
                   <div className="food">
                    <div className="mapo"><img src={map} alt="map" /></div>
                    <div className="tech"><h4>Food science and Technology 201</h4>
                    <h5>May 25, 2023</h5>
                    </div>
                    <div><img src={line2} alt="line2" className="lino"/></div>
                    <h2 className="edito">Edit</h2>
                    <div><img src={line2} alt="line2" className="lino"/></div>
                    <h2 className="uploado">Upload</h2>
                    </div>
                   
                   <div className="food">
                    <div><img src={map} alt="map" className="mapo"/></div>
                    <div className="tech"><h4>Food science and Technology 201</h4>
                    <h5>May 25, 2023</h5>
                    </div>
                    <div><img src={line2} alt="line2" className="lino"/></div>
                    <h2 className="edito">Edit</h2>
                    <div><img src={line2} alt="line2" className="lino"/></div>
                    <h2 className="uploado">Upload</h2>
                    </div>
                    <p className="see">See all</p>
                   
                   <h1 className="load">Uploaded assignment</h1>
                   <div className="food">
                    <div><img src={map} alt="map" className="mapo"/></div>
                    <div className="tech"><h4>Food science and Technology 201</h4>
                    <h5>May 25, 2023</h5>
                    </div>
                    <div><img src={line2} alt="line2" className="lino"/></div>
                    <h2 className="edito">Edit</h2>
                    <div><img src={line2} alt="line2" className="lino"/></div>
                    <h2 className="uploado">view</h2>
                    </div>
                   <div className="food">
                    <div><img src={map} alt="map" className="mapo"/></div>
                    <div className="tech"><h4>Food science and Technology 201</h4>
                    <h5>May 25, 2023</h5>
                    </div>
                    <div><img src={line2} alt="line2" className="lino"/></div>
                    <h2 className="edito">Edit</h2>
                    <div><img src={line2} alt="line2" className="lino"/></div>
                    <h2 className="uploado">view</h2>
                    </div>
                    <p className="sees">See all</p>
                   
                    
                        
              
         
           
                  
                
          
      

            
                

                </div>
                </div>

         
                </Box>
                </>
                
				

								
	);
};

export default Assessthree;
