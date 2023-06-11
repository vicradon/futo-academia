import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";

import { extendTheme } from "@chakra-ui/react";

// 2. Extend the theme to include custom colors, fonts, etc
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

const theme = extendTheme({ colors });

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<ChakraProvider theme={theme}>
			<App />
		</ChakraProvider>
	</React.StrictMode>
);
