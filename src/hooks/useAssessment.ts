import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import http from "../utils/http";
import { useToast } from "@chakra-ui/react";

export function useAssessment(assessment: any, name: string) {
	if (!assessment) {
		return {data: null, isLoading: false, isFetching: false}
	}
	return useQuery({
		queryKey: ["getTableData", assessment, name],
		queryFn: async () => {
			
			const { data } = await http.get(`/assessments/${assessment}/results?name=${name}`);

			const uniqueEntries = [];
			const seenSet = new Set();

			for (const entry of data) {
				const entryKey = entry.reg_num;
				if (!seenSet.has(entryKey)) {
					uniqueEntries.push(entry);
					seenSet.add(entryKey);
				}
			}

			return uniqueEntries;
		},
	});
}

export function useAddInstructions() {
	const toast = useToast();
	const queryClient = useQueryClient();
	return useMutation({
		mutationKey: ["addInstructions"],
		mutationFn: async ({ idx, instructions }: {idx: string | undefined, instructions: string[]}) => {
			try {
				const response = await http.post("/instructions", {assessment_id: idx, instructions: instructions});
				return response
			} catch (error) {
				return error;
			}
		}, onSuccess: () => {
			toast({ title: "Instructions Uploaded", status: "success", variant: "solid" });
			queryClient.invalidateQueries({ queryKey: ["addInstructions"] });
		},
		onError: (err: any) => {
			console.log("toast err", err);
			toast({ title: err?.response?.data?.detail || err?.message });
		},
	});
}

export function useUpdateInstruction() {
	const toast = useToast();
	const queryClient = useQueryClient();
	return useMutation({
		mutationKey: ["updateInstruction"],
		mutationFn: async ({ id, instruction }: {id: number | null, instruction: string}) => {
			try {
				const response = await http.put(`/instructions/${id}`, {instruction: instruction});
				return response
			} catch (error) {
				return error;
			}
		},
		onError: (err: any) => {
			console.log("toast err", err);
			toast({ title: err?.response?.data?.detail || err?.message });
		},
	});
}

export function useDeleteInstruction() {
	const toast = useToast();
	const queryClient = useQueryClient();
	return useMutation({
		mutationKey: ["deleteInstruction"],
		mutationFn: async (id) => {
			try {
				const response = await http.delete(`/instructions/${id}`);
				return response
			} catch (error) {
				return error;
			}
		}, onSuccess: () => {
			toast({ title: "Instruction deleted", status: "success", variant: "solid" });
			queryClient.invalidateQueries({ queryKey: ["deleteInstruction"] });
		},
		onError: (err: any) => {
			console.log("toast err", err);
			toast({ title: err?.response?.data?.detail || err?.message });
		},
	});
}