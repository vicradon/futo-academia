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
};

const Button = {
	defaultProps: {
		rounded: "sm",
		backgroundColor: "red",
	},
};

const theme = extendTheme({ colors, components: { Button } });

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
