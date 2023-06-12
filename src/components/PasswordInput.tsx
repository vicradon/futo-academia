import { Button, Image, Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { useState } from "react";
import EyeIcon from "../assets/icons/eye.svg";

interface Props {
	value?: string;
	onChange?: (e: React.ChangeEvent) => void;
}

export default function PasswordInput({ value, onChange }: Props) {
	const [showPassword, setShowPassword] = useState(false);

	return (
		<InputGroup size="md">
			<Input value={value} onChange={onChange} type={showPassword ? "text" : "password"} />

			<InputRightElement width="4.5rem">
				<Button h="1.75rem" size="sm" onClick={() => setShowPassword(!showPassword)}>
					<Image src={EyeIcon} alt={"eye icon"} />
				</Button>
			</InputRightElement>
		</InputGroup>
	);
}
