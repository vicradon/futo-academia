import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Button, Heading } from "@chakra-ui/react";
import HomeLayout from "./layout/HomeLayout";

function App() {
	const [count, setCount] = useState(0);

	return (
		<HomeLayout>
			<Heading></Heading>
		</HomeLayout>
	);
}

export default App;
