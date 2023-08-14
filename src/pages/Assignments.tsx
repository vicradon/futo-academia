import { useParams } from "react-router-dom";
import CourseCard from "../components/CourseCard";
import CourseTabs from "../layout/CourseTabs";

import http from "../utils/http";
import { useQuery } from "@tanstack/react-query";

export default function Assignments() {
	const { id } = useParams();
	const { data, isLoading } = useQuery({
		queryKey: ["getassesments", id],
		queryFn: () => http.get(`/courses/${id}/assessments`).then((r) => r.data),
		// onError: (err) => console.log("error", err),
	});

	if (isLoading) return <h1>Loadingggggg........</h1>;
	return (
		<CourseTabs>
			{data?.map((x: any) => {
				return <CourseCard {...x} />;
			})}
		</CourseTabs>
	);
}
