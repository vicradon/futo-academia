import { useState } from "react";
import { Flex, Box, Button, chakra, FormControl, FormLabel,  Input, Select, Textarea, VStack, Heading } from "@chakra-ui/react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../layout/Sidebar";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import HumanitiesImage from "../../assets/images/humanities.png";
import deleted from "../../assets/images/deleted.png";
import cancel from "../../assets/images/cancel.png"
import line2 from "../../assets/images/line2.png"
import map from "../../assets/images/map.png"

import { Checkbox, CheckboxGroup } from '@chakra-ui/react'



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
                    <div className="saved">
                    <h2>Saved Assignment</h2>
                    </div>
                    <div className="editty">
                        <div><img src={deleted} alt="delete"/></div>
                        <div><img src={cancel} alt="cancel"/></div>
                    </div>
                    
                        </div>
                    <div className="flexy">
                   <label className="container">
                    <input type="checkbox" />
                    <span className="checkmark"></span>
                    </label>
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
                    </div>
                    <div className="flexy">
                   <label className="container">
                    <input type="checkbox" />
                    <span className="checkmark"></span>
                    </label>
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
                    </div>
                    <div className="flexy">
                   <label className="container">
                    <input type="checkbox" />
                    <span className="checkmark"></span>
                    </label>
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
                    </div>
                    <div className="flexy">
                   <label className="container">
                    <input type="checkbox" />
                    <span className="checkmark"></span>
                    </label>
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
                    </div>
                    <div className="flexy">
                   <label className="container">
                    <input type="checkbox" />
                    <span className="checkmark"></span>
                    </label>
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
                    </div>
                    <div className="flexy">
                   <label className="container">
                    <input type="checkbox" />
                    <span className="checkmark"></span>
                    </label>
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
                    </div>
                 
                  
   
              
         
           
                  
                
          
      

            

                </div>
                </div>

         
                </Box>
                </>
                
				

								
	);
};

export default Assessthree;




