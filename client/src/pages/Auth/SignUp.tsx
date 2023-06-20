import { ArrowBackIcon } from "@chakra-ui/icons";
import {
  Button,
  ButtonGroup,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Select,
  Textarea,
  useToast,
  VStack,
} from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { AccountContext } from "../../context/AccountContext";
import { ApiClient } from "../../utils/ApiClient";
import { useCookies } from "react-cookie";
import { expiresTime } from "../../utils/TimeOperations";
import { Technology } from "../../utils/enums";

interface FormData {
  login: string;
  email: string;
  password: string;
  aboutMe: string;
  technology: Technology;
}

const SignUp: React.FC = () => {
  const { setIsLoggedIn, error } = useContext(AccountContext);
  const apiClient = new ApiClient();
  const [formData, setFormData] = useState<FormData>({
    login: "",
    email: "",
    password: "",
    aboutMe: "",
    technology: Technology.Frontend,
  });

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = event.target;

    setFormData({ ...formData, [name]: value });
  };

  const toast = useToast();
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(["is_logged_in"]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await apiClient.post("/auth/signup", formData);
      setCookie("is_logged_in", true, { path: "/", expires: expiresTime });
      setIsLoggedIn(true);

      setTimeout(() => {
        navigate("/");
      }, 500);
    } catch (error: any) {
      toast({
        title: `Error: ${error?.status}`,
        description: `${error.message}`,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <VStack
      w={{ base: "90%", md: "500px" }}
      m="auto"
      justify="center"
      minH="70vh"
      spacing="1rem"
    >
      <Heading>Register</Heading>
      <form onSubmit={handleSubmit}>
        <FormControl isInvalid={Boolean(error)}>
          <FormLabel mt={"2"} mb={"0"} htmlFor="login">
            Login:
          </FormLabel>
          <Input
            type="text"
            id="login"
            name="login"
            bg="white"
            color="black"
            value={formData.login}
            onChange={handleChange}
            required
          />
          <FormLabel mt={"2"} mb={"0"} htmlFor="email">
            Email:
          </FormLabel>
          <Input
            type="email"
            id="email"
            name="email"
            bg="white"
            color="black"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <FormLabel mt={"2"} mb={"0"} htmlFor="password">
            Password:
          </FormLabel>
          <Input
            type="password"
            id="password"
            name="password"
            bg="white"
            color="black"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <FormLabel mt={"2"} mb={"0"} htmlFor="aboutMe">
            About me:
          </FormLabel>
          <Textarea
            id="aboutMe"
            name="aboutMe"
            bg="white"
            color="black"
            value={formData.aboutMe}
            onChange={handleChange}
            required
          />
          <FormLabel mt={"2"} mb={"0"} htmlFor="technology">
            Technology:
          </FormLabel>
          <Select
            id="technology"
            name="technology"
            bg="white"
            color="black"
            value={formData.technology}
            onChange={handleChange}
            required
          >
            {Object.values(Technology).map((tech) => (
              <option key={tech} value={tech}>
                {tech}
              </option>
            ))}
          </Select>
          <FormErrorMessage>{error}</FormErrorMessage>
          <ButtonGroup pt="1rem">
            <Button size={["sm", "md", "lg"]} colorScheme="blue" type="submit">
              Create Account
            </Button>
            <Button
              size={["sm", "md", "lg"]}
              onClick={() => navigate("/")}
              leftIcon={<ArrowBackIcon />}
            >
              Back
            </Button>
          </ButtonGroup>
        </FormControl>
      </form>
    </VStack>
  );
};

export default SignUp;
