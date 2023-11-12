import { Box, Button, FormControl, FormLabel, Heading, Input, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { password_regex } from "../Home/SignupModal";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { usePasswordUpdate } from "../../hooks/useUserProfileUpdate";
import { useUser } from "../../hooks/useUser";

export default function Password() {
  const [passwords, setPasswords] = useState<{oldPassword: string, newPassword: string, confirmPassword: string}>(
    {oldPassword: "",
    newPassword: "",
    confirmPassword: ""}
  )
  const user = useUser()
  

  const [validPassword, setValidPassword] = useState(false)
  const [validMatchPassword, setValidMatchPassword] = useState(false)

  const resetPasswordFields = () => {
    setPasswords({oldPassword: "",
    newPassword: "",
    confirmPassword: ""})
  }

  useEffect(() => {
    setValidPassword(password_regex.test(passwords.newPassword));
    setValidMatchPassword(passwords.newPassword === passwords.confirmPassword)
  }, [passwords.newPassword, passwords.confirmPassword])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value} = event.target
    setPasswords((prev) => ({ ...prev, [name]: value }))
  }

  const updatePasswordMutation = usePasswordUpdate()

  const handleUpdate = (event: React.FormEvent) => {
    event.preventDefault()
    try {
			updatePasswordMutation.mutate({
				id: user.id,
				oldPassword: passwords.oldPassword,
        newPassword: passwords.newPassword,
        confirmPassword: passwords.confirmPassword,
        resetPasswordFields: resetPasswordFields
			},
			)
		} catch (error) {
			console.log(error);
		}
  }

  return (
    <form onSubmit={handleUpdate}>
      <Box mt={"20px"} display={"flex"} flexDir={"column"} alignItems={"center"}>
        <Heading 
          as={"h1"}
          fontSize={"32px"}
          mt={"90px"}
          mb={"135px"}
          textColor={"#585AD4"}
        >
          Change Password
        </Heading>
          <FormControl>
            <FormLabel fontSize={"20px"} fontWeight={"600"} color={"#333"}>Old Password</FormLabel>
            <Input 
              backgroundColor={passwords.oldPassword ? "green.100" : "white"} 
              boxShadow=" 0px 5px 28.5px 1.5px rgba(149, 152, 200, 0.20);" 
              type="password"
              name="oldPassword"
              value={passwords.oldPassword}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl mt={"3rem"}>
          <FormLabel fontSize={"20px"} fontWeight={"600"} color={"#333"}>
              New Password
          </FormLabel>
            <Input 
              boxShadow=" 0px 5px 28.5px 1.5px rgba(149, 152, 200, 0.20);" 
              type="password" 
              name="newPassword"
              value={passwords.newPassword}
              onChange={handleChange}
              backgroundColor={validPassword ? "green.100" : !(validPassword || !passwords.newPassword) ? "red.100" : "white"}
            />
            {passwords.newPassword && !validPassword && 
                      <Text fontSize={'12px'} color={'blue.900'} p={'5px'}>
                          <FontAwesomeIcon icon={faInfoCircle} /> 8 to 24 characters.<br/>
                          Must include uppercase and lowercase letters.<br/>
                          Must include a number. <br/>
                          Must includ special characters: !, @, #, $, %
                      </Text>}
          </FormControl>
          <FormControl mt={passwords.newPassword && !validPassword ? "1rem" : "3rem"}>
          <FormLabel fontSize={"20px"} fontWeight={"600"} color={"#333"}>
            Confirm Password
          </FormLabel>
            <Input 
              backgroundColor={validMatchPassword && passwords.confirmPassword ? "green.100" : !(validMatchPassword || !passwords.confirmPassword) ? "red.100" : "white"} 
              boxShadow=" 0px 5px 28.5px 1.5px rgba(149, 152, 200, 0.20);" 
              type="password" 
              name="confirmPassword"
              value={passwords.confirmPassword}
              onChange={handleChange}
            />
             {!validMatchPassword && passwords.confirmPassword &&
                  <Text id='pwdnote' fontSize={'12px'} color={'blue.900'} p={'5px'}>
                    <FontAwesomeIcon icon={faInfoCircle} /><br/>Must match previous password
                  </Text>
              }
          </FormControl>
          <Button 
            type="submit" 
            colorScheme="blue" 
            mt={!validMatchPassword && passwords.confirmPassword ? "1rem" : "3rem"} 
            w={"10.75rem"} 
            height={"3.5rem"}
            isDisabled = {!validPassword || !validMatchPassword || !passwords.oldPassword ? true : false}
            isLoading = {updatePasswordMutation.isLoading}
          >
            Save
          </Button>
      </Box>
    </form>
  )
}
