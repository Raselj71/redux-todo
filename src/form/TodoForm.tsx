import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { todoSchema, type TTtodoSchema } from "../types/zod/ZodSchema";
import { Button, Flex, Select } from "@radix-ui/themes";
import LabeledInput from "../component/ui/Input";
import { useForm } from "react-hook-form";
import LabeledSelect from "../component/ui/Select";
import LabeledTextArea from "../component/ui/TextArea";
import { useCreateTodoMutation } from "../redux/todo/todoApi";
import { toast } from "react-toastify";

function TodoForm() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const navigate = useNavigate();
  const [createTodoApi, { isLoading }] = useCreateTodoMutation();

  const {
    control,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<TTtodoSchema>({
    mode: "onChange",
    defaultValues: {
      status:'todo',
     
    },
    resolver: zodResolver(todoSchema),
  });

  const onsubmit = async (data: TTtodoSchema) => {
    try {
      const response = await createTodoApi(data);
      if (response.data) {
        toast("To created Successfully", {
            type:'success'
        });
        navigate("/app/todos");
      } else {
        let errorMessage = "Register  failed";
        if (
          response.error &&
          "data" in response.error &&
          (response.error as any).data?.message
        ) {
          errorMessage = (response.error as any).data.message;
        } else if (response.error && "message" in response.error) {
          errorMessage =
            (response.error as { message?: string }).message || "Login failed";
        }
        toast(errorMessage, {
          type: "error",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onsubmit)}>
      <Flex gap={"4"} direction={"column"}>
        <LabeledInput
          control={control}
          error={errors.title}
          size="3"
          name="title"
          required
          placeholder={"Title"}
          label="Title"
        />
        <LabeledTextArea
          control={control}
          size="3"
          error={errors.description}
          name="description"
          placeholder={"description"}
          label="description"
        />
        <Flex
          gap={"4"}
          direction={{
            initial: "column",
            lg: "row",
          }}
        >
          <LabeledSelect
            control={control}
            size="3"
            error={errors.status}
            label="Status"
            name="status"
            required
            placeholder="Choose Status"
          >
            <Select.Item value="todo">Todo</Select.Item>
            <Select.Item value="in_progress">In Progress</Select.Item>
            <Select.Item value="done">Done</Select.Item>
          </LabeledSelect>

          <LabeledSelect
            control={control}
            size="3"
            error={errors.priority}
            label="Priority"
            name="priority"
            required
            placeholder="Choose Priority"
          >
            <Select.Item value="1">1</Select.Item>
            <Select.Item value="2">2</Select.Item>
            <Select.Item value="3">3</Select.Item>
             <Select.Item value="4">4</Select.Item>
              <Select.Item value="5">5</Select.Item>
          </LabeledSelect>
        </Flex>

        <LabeledInput
          control={control}
          size="3"
          type="date"
          error={errors.dueDate}
          name="dueDate"
          placeholder={"Due Date"}
          label="Due Date"
        />

        <LabeledInput
          control={control}
          size="3"
          error={errors.tags}
          name="tags"
          placeholder={"Tags"}
          label="Tags"
        />

        <Button
          variant="solid"
          type="submit"
          loading={isSubmitting || isLoading}
          disabled={isSubmitting}
          size={"3"}
          className="w-full!"
        >
           Create Todo
        </Button>
      </Flex>
    </form>
  );
}

export default TodoForm;
