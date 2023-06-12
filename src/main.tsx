import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";
import Home from "./pages/Home";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import StudentHome from "./pages/student/StudentHome";

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

const router = createBrowserRouter([
	{
		path: "/",
		element: <Home />,
	},
	{
		path: "/student/home",
		element: <StudentHome />,
	},
]);

createRoot(document.getElementById("root") as HTMLElement).render(
	<StrictMode>
		<ChakraProvider theme={theme}>
			<RouterProvider router={router} />
		</ChakraProvider>
	</StrictMode>
);
