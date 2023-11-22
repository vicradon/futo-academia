import { useQuery, useQueryClient } from "@tanstack/react-query";
import ObjectiveQuestion from "../components/ObjectiveQuestion";
import CourseTabs from "../layout/CourseTabs";
import { Box, Text, Flex, Textarea, useToast, FormControl, FormLabel, Button, Heading, UnorderedList, ListItem, Spacer, Center } from "@chakra-ui/react";
import http from "../utils/http";
import { useParams } from "react-router-dom";
import { useAddInstructions, useDeleteInstruction, useUpdateInstruction } from "../hooks/useAssessment";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";

// import { toast } from "react-toastify";
interface InstructionObject {
	assessment_id: number | null;
	id: number | null;
	instruction: string;
  }

export default function AddAssessment() {
	const { idx } = useParams();


	const [instructionsObject, setInstructionsObject] = useState<InstructionObject[]>([]);
	const [instruction, setInstruction] = useState<InstructionObject>({
		assessment_id: null,
		id: null,
		instruction: ""
	})
	const [instructionEdit, setInstructionEdit] = useState(false)
	const [editIndex, setEditIndex] = useState<number>(-1)

	const { data: instructionsData, isLoading: instructionIsLoading, refetch: refetchInstructions } = useQuery({
		queryKey: ["getInstructions", idx],
		queryFn: () => http.get(`/instructions/${idx}`).then((r) => r.data),
	});

	useEffect(() => {
	  setInstructionsObject(instructionsData)
	  console.log(instructionsData)
	}, [instructionIsLoading])


	const addInstructionsMutation = useAddInstructions()
	const updateInstruction = useUpdateInstruction()
	const deleteInstruction = useDeleteInstruction()

	const handleInstructionUpload = () => {
		const newInstructions = instructionsObject.filter((instruction) => !instruction.id).map((instruction) => instruction.instruction);

		
		addInstructionsMutation.mutate({idx, instructions: newInstructions}, {onSuccess: () => refetchInstructions()})

		const oldInstructions = instructionsObject.filter((instruction) => instruction.id);
		for (let i=0; i<oldInstructions.length; i++){
			updateInstruction.mutate({id: oldInstructions[i].id, instruction: oldInstructions[i].instruction})
		}
		refetchInstructions()
	}

	const handleInstructionDelete: any = (id: number | null, index: number) => {
		if (id) {
			setInstructionsObject(instructionsObject.filter((instruction) => instruction.id !== id));
			deleteInstruction.mutate(id)
		} else {
			const newArray = [...instructionsObject]
			newArray.splice(index, 1)
			setInstructionsObject(newArray)
		}
	}

	const handleInstructionEdit: any = (index: number) => {
		setInstructionEdit(true)
		setEditIndex(index)
		setInstruction(instructionsObject[index])
	}

	const handleInstructionInput = (e: any) => {
		e.preventDefault();
		if (instructionEdit) {

			const newInstructionObject = [...instructionsObject]

			newInstructionObject[editIndex] = {
				...newInstructionObject[editIndex],
				instruction: instruction.instruction,
			};

			setInstructionsObject(newInstructionObject);
			setInstructionEdit(false);
			} else {
				setInstructionsObject((prevList: InstructionObject[]) => [...prevList, {assessment_id: null, id: null, instruction: instruction.instruction}]); 
			}
			setInstruction({
				assessment_id: null,
				id: null,
				instruction: ""
			})
	}

	
	return (
		<CourseTabs>
			<Box>
				<Text fontSize="24px" color="#585AD4" fontWeight="bold" my={5}>
					Assesment
				</Text>

				{/* <Flex alignItems="center" justifyContent={"space-between"} my={5}>
					<NoOfQuestions />
					<QuestionType />
					<AllocatedTime />
				</Flex> */}
				

				<Flex my={3} flexDir={"column"}>
						<Heading as={"h4"} size={"lg"}>
							Instructions
						</Heading>
					<Box width={"100%"} bg={"whiteAlpha.900"} p={5}>
						{instructionsObject?.length === 0 ? 
							<Text><i>No instructions.</i></Text>
							: 
							<UnorderedList>
								{instructionsObject?.map((object, index) => <ListItem key={index} my={2} boxShadow={"sm"}>
									<Flex gap={2} alignItems={"start"}>
										<Text>{object.instruction}</Text>
										<Spacer />
										<FontAwesomeIcon color="#B3A3FF" icon={faPencil} onClick={() => handleInstructionEdit(index)} />
										<FontAwesomeIcon color="#EEAEA0" icon={faTrash} onClick={() => handleInstructionDelete(object.id, index)} />
									</Flex>
								</ListItem>)}
								<Button size="sm" colorScheme="blue" minWidth={"min-content"} onClick={handleInstructionUpload}>Save</Button>
							</UnorderedList>
						}
					<Box width="100%" as="form" onSubmit={handleInstructionInput}>
						<FormControl display={"flex"} alignItems={"center"} gap={4}>
							<FormLabel fontWeight="bold" mt={8}>
							</FormLabel>
							<Textarea
								mt={4}
								height={"1rem"}
								placeholder="Type instruction"
								value={instruction.instruction}
								maxLength={300}
								name="instruction"
								onChange={(e: any) => {
									setInstruction((prev: any) => ({...prev, instruction: e.target.value}))
								}}
								sx={{
									width: "100%",
								}}
								bgColor="#fff"
							/>
							<Button size="sm" mt={4} ml={"auto"} type="submit" colorScheme="blue" isDisabled={instruction.instruction === "" ? true : false} minWidth={"min-content"} alignSelf={"end"} variant={"outline"}>{instructionEdit ? "Save Edit" : "Add Instruction"}</Button>
						</FormControl>
					</Box>
					</Box>
				</Flex>

				<ObjectiveQuestion />
			</Box>
		</CourseTabs>
	);
}

/*
const NoOfQuestions = () => {
	return (
		<Box display="flex" flexDir="column" justifyContent="center" mr={2}>
			<Text my={3} fontWeight={"bold"}>
				No of questions
			</Text>
			<Box border="1px solid #000000" p={2} borderRadius="9px">
				<Input
					m={3}
					mx="auto"
					placeholder="0"
					_placeholder={{
						mx: "auto",
					}}
				/>
			</Box>
		</Box>
	);
};

const QuestionType = () => {
	return (
		<Box>
			<Text>Question type</Text>
			<Select placeholder="Select option">
				<option value="option1">Objective</option>
				<option value="option2">Theoretical</option>
			</Select>
		</Box>
	);
};

const AllocatedTime = () => {
	return (
		<Box>
			<Text>Allocated time</Text>
			<Select placeholder="Select option">
				<option value="option1">Objective</option>
				<option value="option2">Theoretical</option>
			</Select>
		</Box>
	);
};

*/
