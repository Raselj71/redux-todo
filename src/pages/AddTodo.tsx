import { Box, Card, Flex, Heading, } from '@radix-ui/themes';

import TodoForm from '../form/TodoForm';

function AddTodo() {

   return (
    <Card className="m-4  mt-20 lg:w-[700px] mx-auto ">
      <Flex justify={"center"}>
        <Heading my={"5"} as="h3">
          Login
        </Heading>
      </Flex>

      <Box>
        <TodoForm />
      </Box>

   
    </Card>
  );

}

export default AddTodo