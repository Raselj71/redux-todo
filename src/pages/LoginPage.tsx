import { Box, Card, Flex, Heading, Text } from "@radix-ui/themes";
import React from "react";
import LoginForm from "../form/loginForm";
import { Link } from "react-router-dom";

function LoginPage() {
  return (
    <Card className="m-4  mt-20 lg:w-[700px] mx-auto ">
      <Flex justify={"center"}>
        <Heading my={"5"} as="h3">
          Login
        </Heading>
      </Flex>

      <Box>
        <LoginForm />
      </Box>

      <Box my="4" width="100%">
        <Text align="center">
          Don&apos;t have an account?{" "}
          <Link className="underline" to="/register">
            Click here to create an account
          </Link>
        </Text>
      </Box>
    </Card>
  );
}

export default LoginPage;
