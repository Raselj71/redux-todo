import { Box, Card, Flex, Heading, Text } from "@radix-ui/themes";


import { Link } from "react-router-dom";
import SignupForm from "../form/SignupForm";

function RegisterPage() {
  return (
    <Card className="m-4  mt-20 lg:w-[700px] mx-auto ">
      <Flex justify={"center"}>
        <Heading my={"5"} as="h3">
          Register 
        </Heading>
      </Flex>

      <Box>
        <SignupForm />
      </Box>

      <Box my="4" width="100%">
        <Text align="center">
         Already have an account?{" "}
          <Link className="underline" to="/login">
            Click here to login
          </Link>
        </Text>
      </Box>
    </Card>
  );
}

export default RegisterPage;
