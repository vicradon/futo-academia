import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";
import Home from "./pages/Home";
import { Route, RouterProvider, Routes, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import StudentHome from "./pages/student/StudentHome";
import Courses from "./pages/lecturer/Courses";
import UploadCourse from "./pages/lecturer/UploadCourse";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ViewCourse from "./pages/ViewCourse";
import CourseHeader from "./components/CourseHeader";
import Examination from "./pages/Examination";
import AddExam from "./pages/AddExam";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Assignments from "./pages/Assignments";
import ObjectiveAnswer from "./components/ObjectiveAnswer";
import TakeExam from "./pages/TakeExam";
import ExamResult from "./pages/ExamResult";
import UserProfile from "./layout/UserProfile";
import Profile from "./pages/Profile/Profile";
import Password from "./pages/Profile/Password";

const colors = {
	brand: {
		900: "#232455",
		800: "#353680",
		700: "#4648AA",
		600: "#585AD4",
		500: "#696CFF",
		400: "#8284FF",
		300: "#9B9DFF",
		200: "#B4B5FF",
		100: "#CDCEFF",
		50: "#E1E2FF",
	},
	secondary: {
		900: "#494C55",
		800: "#6D7280",
		700: "#9198AA",
		600: "#B6BED4",
		500: "#DAE4FF",
		400: "#E0E8FF",
		300: "#E6EDFF",
		200: "#ECF1FF",
		100: "#F3F6FF",
		50: "#F8FAFF",
	},
};

const Button = {
	baseStyle: {
		borderRadius: "4px",
		fontWeight: "medium",
	},
	sizes: {
		md: {
			fontSize: "1em",
			width: "110px",
			height: "50px",
		},
	},
	variants: {
		secondary: {
			bgColor: "#fff",
			color: "#000",
			border: "1px solid #B6B3C7",
		},
		link: {
			color: "brand.500",
			textDecoration: "underline",
		},
	},
	defaultProps: {
		size: "md",
	},
};

const FormLabel = {
	baseStyle: {
		color: "#B6B3C7",
	},
};

const components = {
	Button,
	FormLabel,
};

const fonts = {
	heading: `'inter', sans-serif`,
	body: `'inter', sans-serif`,
};

const theme = extendTheme({ colors, components, fonts });

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/">
			<Route index element={<Home />} />
			<Route path="student/home" element={<StudentHome />} />
			<Route path="lecturer/courses" element={<Courses />} />
			<Route path="lecturer/courses-upload" element={<UploadCourse />} />
			<Route path="lecturer/courses/:id" element={<ViewCourse />} />
			<Route path="course/header" element={<CourseHeader />} />
			<Route path="lecturer/courses/:id/examination" element={<Examination />} />
			<Route path="lecturer/courses/:id/examination/add/:idx" element={<AddExam />} />
			<Route path="lecturer/courses/:id/assignments" element={<Assignments />} />
			<Route path="exams/:id/:courseId" element={<TakeExam />} />
			<Route path="exam/:id/:idx/results" element={<ExamResult />} />
			<Route path="course/header/obj" element={<ObjectiveAnswer />} />
			<Route path="profile" element={<UserProfile />}>
				<Route index element={<Profile />} />
			  	<Route path="password" element={<Password />} />
			</Route>
		</Route>

	)
)

// const router = createBrowserRouter([
// 	{
// 		path: "/",
// 		element: <Home />,
// 	},
// 	{
// 		path: "/student/home",
// 		element: <StudentHome />,
// 	},
// 	{
// 		path: "/lecturer/courses",
// 		element: <Courses />,
// 	},
// 	{
// 		path: "/lecturer/courses-upload",
// 		element: <UploadCourse />,
// 	},
// 	{
// 		path: "/lecturer/courses/:id",
// 		element: <ViewCourse />,
// 	},
// 	{ path: "/course/header", element: <CourseHeader /> },
// 	{
// 		path: "/lecturer/courses/:id/examination",
// 		element: <Examination />,
// 	},
// 	{
// 		path: "/lecturer/courses/:id/examination/add/:idx",
// 		element: <AddExam />,
// 	},
// 	{
// 		path: "/lecturer/courses/:id/assignments",
// 		element: <Assignments />,
// 	},
// 	{
// 		path: "exams/:id/:courseId",
// 		element: <TakeExam />,
// 	},
// 	{
// 		path: "exam/:id/:idx/results",
// 		element: <ExamResult />,
// 	},
// 	{ path: "/course/header/obj", element: <ObjectiveAnswer /> },

// 	{ path: "/course/header", element: <CourseHeader /> },
// 	{
// 		path: "/profile",
// 		element: (
// 			<Routes>
// 				createRoutesFromElements(
// 			  <Route path="" element={<UserProfile />}>
// 			  	<Route index element={<Profile />} />
// 			  	<Route path="/password" element={<Password />} />
// 			  </Route>
// 			  )
// 			</Routes>
// 		  ),
// 	}
// ]);

const queryClient = new QueryClient();

createRoot(document.getElementById("root") as HTMLElement).render(
	<StrictMode>
		<QueryClientProvider client={queryClient}>
			<ChakraProvider theme={theme}>
				<ToastContainer />
				<RouterProvider router={router} />
			</ChakraProvider>
		</QueryClientProvider>
	</StrictMode>
);
