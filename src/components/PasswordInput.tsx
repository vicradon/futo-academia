import { Image, Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { useState } from "react";
import EyeIcon from "../assets/icons/eye.svg";

interface Props {
	value?: string;
	name: string;
	onChange?: (e: React.ChangeEvent) => void;
}

export default function PasswordInput({ value, onChange, name, ...otherProps }: Props) {
	const [showPassword, setShowPassword] = useState(false);

	return (
		<InputGroup size="md">
			<Input value={value} onChange={onChange} name={name} type={showPassword ? "text" : "password"} {...otherProps} />

			<InputRightElement width="4.5rem">
				<Image h='1rem' src={EyeIcon} alt={"eye icon"} cursor={'pointer'} onClick={() => setShowPassword(!showPassword)}/>
			</InputRightElement>
		</InputGroup>
	);
}
