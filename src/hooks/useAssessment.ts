import { useQuery } from "@tanstack/react-query";
import http from "../utils/http";

export function useAssessment(assessment: any, name: string) {
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
