import { Flex, IconButton, Text } from "@radix-ui/themes";

import type { FC } from "react";
import {
  PiEyeDuotone,
  PiGearDuotone,
  PiNotePencilDuotone,
  PiTrashDuotone,
} from "react-icons/pi";
import { Link, useLocation } from "react-router-dom";
import { ConfirmationDialog } from "../../utils/ConfirmDialog";
import { useDeleteTodoMutation } from "../../redux/todo/todoApi";

type TableActionProps = {
  id: string;
  preview?: boolean;
  showEdit?: boolean;
  showDelete?: boolean;
  showConfig?: boolean;
};

const TableActions: FC<TableActionProps> = ({
  id,
  preview = true,
  showEdit = true,
  showDelete = true,
  showConfig = false,
}) => {
  const location = useLocation();

  const [todoDeleteAPI] = useDeleteTodoMutation();

  const handleDelete = async () => {
    const confirmAction = async () => {
      try {
        console.log("receiving id:", id);
        const response = await todoDeleteAPI(id);
        console.log(response);
        if (response.data) {
          return {
            success: false,
            message: "Delete successfully",
          };
        } else {
          return {
            success: false,
            message: "Failed to delete",
          };
        }
      } catch (error) {
        if (error instanceof Error) {
          return {
            success: false,
            message: error.message,
          };
        }
        return {
          success: false,
          message: "Delete failed with an unknown error",
        };
      }
    };

    ConfirmationDialog(
      "Confirm Delete",
      "Do you Really want to Delete?",
      confirmAction
    );
  };

  return (
    <Flex gap="3">
      {showConfig && (
        <Link
          to={`${location.pathname}/${id}`}
          className="flex gap-1 text-purple-10"
        >
          <PiGearDuotone className="size-5" />
          <Text>Config</Text>
        </Link>
      )}
      {preview && (
        <Link
          to={`${location}/preview/${id}`}
          className="flex gap-1 text-iris-10"
        >
          <PiEyeDuotone className="size-5" />
          <Text>Details</Text>
        </Link>
      )}
      {showEdit && (
        <Link
          to={`${location.pathname}/${id}`}
          className="flex gap-1 text-orange-10"
        >
          <PiNotePencilDuotone className="size-5" />
          <Text>Edit</Text>
        </Link>
      )}
      {showDelete && (
        <IconButton variant="ghost" onClick={handleDelete}>
          <PiTrashDuotone className="size-5 text-crimson-10" />
        </IconButton>
      )}
    </Flex>
  );
};

export default TableActions;
