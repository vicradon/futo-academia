import { Link } from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";

interface Props {
	href: string;
	children: React.ReactNode;
}

export default function Navlink({ href, children }: Props) {
	return (
		<Link to={href} as={ReactRouterLink}>
			{children}
		</Link>
	);
}
