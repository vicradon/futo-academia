import { useQuery } from "@tanstack/react-query";
import http from "../utils/http";
import { Flex, Text } from "@chakra-ui/react";
import Loader from "../components/Loaders";

const Enrolled = ({id}: any) => {
    const { data, isLoading } = useQuery({
		queryKey: ["getStudents", id],
		queryFn: () => http.get(`/students/enrolled/${id}`).then((r) => r.data),
		onError: (err) => console.log("error", err),
	});

    if (isLoading) return <Loader />;

  
  return (
    <Flex>
      Enrolled
      {data?.map((student: any) => <Text>{student.name}</Text>)}
    </Flex>
  )
}

export default Enrolled