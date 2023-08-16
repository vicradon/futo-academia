import { useToast } from "@chakra-ui/react";

export function handleToast(err: any) {
	// eslint-disable-next-line react-hooks/rules-of-hooks
	const toast = useToast();
	toast({
		title: err?.response?.data?.detail,
		containerStyle: {
			backgroundColor: "red",
			color: "white",
		},
	});
}
