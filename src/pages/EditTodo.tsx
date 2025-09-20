import { Box, Card, Flex, Heading, Skeleton, Text } from "@radix-ui/themes";
import { useParams } from "react-router-dom";
import { useGetTodoByIdQuery } from "../redux/todo/todoApi";
import TodoUpdateForm from "../form/TodoUpdateForm";

function EditTodo() {
  const { id } = useParams();
  const {
    isLoading,
    isError,
    error,
    data,
  } = useGetTodoByIdQuery(id ?? "", { skip: !id });

  return (
    <Card className="m-4 mt-20 lg:w-[700px] mx-auto">
      <Flex justify="center">
        <Heading my="5" as="h3">
          Update todo
        </Heading>
      </Flex>

      <Box>
      
        {isLoading && (
          <div className="space-y-4">
            <Skeleton>
              <div className="h-6 w-1/3 mx-auto" />
            </Skeleton>
            <Skeleton>
              <div className="h-10 w-full" />
            </Skeleton>
            <Skeleton>
              <div className="h-10 w-full" />
            </Skeleton>
            <Skeleton>
              <div className="h-10 w-2/3" />
            </Skeleton>
          </div>
        )}

       
        {isError && (
          <Text color="red" align="center">
            Failed to load todo.{" "}
            {(error as any)?.data?.message || "Something went wrong."}
          </Text>
        )}

      
        {!isLoading && !isError && data && <TodoUpdateForm todo={data} />}
      </Box>
    </Card>
  );
}

export default EditTodo;
