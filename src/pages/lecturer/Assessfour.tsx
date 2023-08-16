import { useState } from "react";
import { Flex, Box, Button, chakra, FormControl, FormLabel,  Input, Select, Textarea, VStack, Heading } from "@chakra-ui/react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../layout/Sidebar";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import profile from "../../assets/images/profile.png";
import HumanitiesImage from "../../assets/images/humanities.png"
import HtmlEditor from "../lecturer/HtmlEditor";
import SearchIcon from '@mui/icons-material/Search';


const Assessfour = () => {


	

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
                </div>
                </div>
                <div className="bk">
							<svg xmlns="http://www.w3.org/2000/svg" height="1em" className="arrw" viewBox="0 0 320 512">
								<path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z" />
							</svg>
							<h2 className="back">Back</h2>
						</div>
                    
                      <h2 className="logy">Food Science Technology 201</h2>
                      <div className="flex">
                      <h4 className="stood">No. Submitted:</h4>
                    <h3 className="stu">122 students</h3>
                    </div>
                    <div className="score">
                    <p className="per">Average Score:</p>
                    <p className="per">45%</p>
                    </div>
                <div className="put">
                    <h3 className="prob">Students</h3>
                    
                     <div className="search-container">
        <div className="search-input-container">
            <input type="text" id="search-input" placeholder="Search"/>
            <span className="search-icon"><SearchIcon />
               
            </span>
        </div>
       
                </div>
                </div>
  
                <table>
  <tr className="col-one">
    <th>No</th>
    <th className="mid">Student Name</th>
    <th>Matriculation No.</th>
    <th className="middle">Score</th>
  </tr>
  <tr>
    <td className="small">1</td>
    <td className="get"><span><img src={profile} alt="profile"/></span><span>Adegbolahan Enioluwayan Oluwagbemiga</span></td>
    <td className="num">23/21AF/123</td>
    <td className="percent">78%</td>
  </tr>
  <tr>
    <td className="small">2</td>
    <td className="get"><span><img src={profile} alt="profile"/></span><span>Adegbolahan Enioluwayan Oluwagbemiga</span></td>
    <td className="num">23/21AF/123</td>
    <td className="percent">78%</td>
  </tr>
  <tr>
    <td className="small">3</td>
    <td className="get"><span><img src={profile} alt="profile"/></span><span>Adegbolahan Enioluwayan Oluwagbemiga</span></td>
    <td className="num">23/21AF/123</td>
    <td className="percent">78%</td>
  </tr>
  <tr>
    <td className="small">4</td>
    <td className="get"><span><img src={profile} alt="profile"/></span><span>Adegbolahan Enioluwayan Oluwagbemiga</span></td>
    <td className="num">23/21AF/123</td>
    <td className="percent">78%</td>
  </tr>
  <tr>
    <td className="small">5</td>
    <td className="get"><span><img src={profile} alt="profile"/></span><span>Adegbolahan Enioluwayan Oluwagbemiga</span></td>
    <td className="num">23/21AF/123</td>
    <td className="percent">78%</td>
  </tr>
  <tr>
    <td className="small">6</td>
    <td className="get"><span><img src={profile} alt="profile"/></span><span>Adegbolahan Enioluwayan Oluwagbemiga</span></td>
    <td className="num">23/21AF/123</td>
    <td className="percent">78%</td>
  </tr>
  <tr>
    <td className="small">7</td>
    <td className="get"><span><img src={profile} alt="profile"/></span><span>Adegbolahan Enioluwayan Oluwagbemiga</span></td>
    <td className="num">23/21AF/123</td>
    <td className="percent">78%</td>
  </tr>
  <tr>
    <td className="small">8</td>
    <td className="get"><span><img src={profile} alt="profile"/></span><span>Adegbolahan Enioluwayan Oluwagbemiga</span></td>
    <td className="num">23/21AF/123</td>
    <td className="percent">78%</td>
  </tr>
  <tr>
    <td className="small">9</td>
    <td className="get"><span><img src={profile} alt="profile"/></span><span>Adegbolahan Enioluwayan Oluwagbemiga</span></td>
    <td className="num">23/21AF/123</td>
    <td className="percent">78%</td>
  </tr>
  <tr>
    <td className="small">10</td>
    <td className="get"><span><img src={profile} alt="profile"/></span><span>Adegbolahan Enioluwayan Oluwagbemiga</span></td>
    <td className="num">23/21AF/123</td>
    <td className="percent">78%</td>
  </tr>
    
    
   

 

</table>
                  
                
          
 

            
                

                </div>
                </div>

            
         
                </Box>
                </>
                
				

								
	);
};

export default Assessfour;
