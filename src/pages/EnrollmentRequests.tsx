import { useQuery } from "@tanstack/react-query";
import http from "../utils/http";
import { Center, Flex, Grid, Input, InputGroup, InputLeftAddon, Text } from "@chakra-ui/react";
import Loader from "../components/Loaders";
import { SearchIcon } from "@chakra-ui/icons";

function EnrollmentRequests({id}: any) {

  const { data, isLoading } = useQuery({
		queryKey: ["getStudents", id],
		queryFn: () => http.get(`/students/enrolled/${id}/requests`).then((r) => r.data),
		onError: (err) => console.log("error", err),
	});

  if (isLoading) return <Loader />;

  
  return (
    <Flex flexDir={"column"}>
      <Center my={5}>
        <InputGroup gridArea={"search"} backgroundColor={"white"} rounded={"md"} maxWidth={{ base: "90%", md: "50%" }}>
          <Input type="text" placeholder="Search..."  name="search"/>
          <InputLeftAddon backgroundColor={"white"} children={<SearchIcon />} />
        </InputGroup>
      </Center>
      <Grid templateColumns={"0.8fr 2.5fr 1.8fr 1fr 1fr 0.8fr 0.8fr"} border={"none"} fontSize={{base: "xs", md: "md"}}>
        <Text bgColor={"#343680"} textColor={"white"} border={"none"} p={3}>S/N</Text>
        <Text bgColor={"#343680"} textColor={"white"}border={"none"} p={3}>Name</Text>
        <Text bgColor={"#343680"} textColor={"white"}border={"none"} p={3}>Reg. No.</Text>
        <Text bgColor={"#343680"} textColor={"white"}border={"none"} p={3}>Dept</Text>
        <Text bgColor={"#343680"} textColor={"white"}border={"none"} p={3}>Level</Text>
        <Text border={"none"} bgColor={"#343680"}></Text>
        <Text border={"none"} bgColor={"#343680"}></Text>
      </Grid>
      {data?.map((student: any, index: number) => 
        <Grid templateColumns={"0.8fr 2.5fr 1.8fr 1fr 1fr 0.8fr 0.8fr"} border={"none"} fontSize={{base: "xs", md: "md"}} key={student?.reg_num} height={"40px"} bg={index%2 === 0 ? "#E0E0E066" : "unset"} alignContent={"center"}>
          <Text p={3}>{index+1}</Text>
          <Text p={3}>{student?.name}</Text>
          <Text p={3}>{student?.reg_num}</Text>
          <Text p={3}>{student?.department}</Text>
          <Text p={3}>{student?.level}</Text>
          <Text p={3} textAlign={"center"} textColor={"green"} cursor={"pointer"}>Accept</Text>
          <Text p={3} textAlign={"center"} textColor={"red"} cursor={"pointer"}>Deny</Text>

        </Grid>
        )}
    </Flex>
  )
}

export default EnrollmentRequests