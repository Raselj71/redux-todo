import { useState } from "react";
import { useAppSelector } from "../redux/store";
import {
  Badge,
  Box,
  Button,
  Heading,
  Select,
  Table,
  TextField,
} from "@radix-ui/themes";
import { useGetTodosQuery } from "../redux/todo/todoApi";
import { Link } from "react-router-dom";
import DTable from "../component/ui/Table";
import { getBadgeColor } from "../utils/getStatusBadge";
import TableActions from "../component/ui/TableAction";


type QueryParams = {
  page: number;
  status: string;
  search: string;
  sortBy: string;
  sortOrder: "asc" | "desc";
};

function Home() {
  const [params, setParams] = useState<QueryParams>({
    page: 1,
    status: "",
    search: "",
    sortBy: "createdAt",
    sortOrder: "desc",
  });

  const auth = useAppSelector((state) => state.auth);
  console.log("auth State", auth);

  const { isLoading, data, isError } = useGetTodosQuery(params);

  console.log(data?.data);

  const tableHeader = [
    "Title",
    "Status",
    "Priority",
    "Due Date",
    "Tags",
    "Action",
  ];

  return (
    <Box>
      <Heading>All Todo List</Heading>

      
      
      

 
      <div className="grid md:grid-cols-5 gap-3 my-4">
        <TextField.Root
          size={{
            initial: "2",
            lg: "3",
          }}
          className="md:col-span-2 border rounded px-2 py-1"
          value={params.search}
          onChange={(e) =>
            setParams((prev) => ({ ...prev, search: e.target.value, page: 1 }))
          }
          placeholder="Search..."
        />

        <Select.Root
          defaultValue={params.status}
          size={{
            initial: "2",
            lg: "3",
          }}
          onValueChange={(e) =>
            setParams((prev) => ({ ...prev, status: e, page: 1 }))
          }
        >
          <Select.Trigger 
            placeholder="Choose Status"
           />
         	<Select.Content>
								<Select.Group>
              	<Select.Label>Choose Status</Select.Label>
            <Select.Item value="todo">Todo</Select.Item>
            <Select.Item value="in_progress">In Progress</Select.Item>
            <Select.Item value="done">Done</Select.Item>
               </Select.Group>
          </Select.Content>
       
        </Select.Root>

        <div className="flex gap-2">
          <Select.Root
            value={params.sortBy}
            size={{
            initial: "2",
            lg: "3",
          }}
            onValueChange={(e) =>
              setParams((prev) => ({ ...prev, sortBy: e }))
            }
          >
            <Select.Trigger 
              placeholder="sort By"
            />
            <Select.Content>
              <Select.Group>
                <Select.Label>Choose Status</Select.Label>
                <Select.Item value="createdAt">Created</Select.Item>
                <Select.Item value="dueDate">Due date</Select.Item>
                <Select.Item value="priority">Priority</Select.Item>
              </Select.Group>
            </Select.Content>
          </Select.Root>

          <Select.Root
            value={params.sortOrder}
            size={{
            initial: "2",
            lg: "3",
          }}
            onValueChange={(e) =>
              setParams((prev) => ({
                ...prev,
                sortOrder: e as "asc" | "desc",
              }))
            }
          >

                <Select.Trigger 
              placeholder="Sort Order"
            />

             <Select.Content>
              <Select.Group>
              <Select.Label>Choose Order</Select.Label>
            <Select.Item value="desc">Desc</Select.Item>
            <Select.Item value="asc">Asc</Select.Item>

            </Select.Group>
            </Select.Content>
          </Select.Root>
        </div>

           <Button size={{
            initial: "2",
            lg: "3",
          }} asChild>
          <Link to={"/app/todos/add"}>Add Todo</Link>
        </Button>
      </div>

      {/* Table */}
      {!isError && (
        <DTable headerCells={tableHeader}>
          {data?.data && data?.data.length > 0 ? (
            data.data.map((item) => (
              <Table.Row key={item.id} align="center">
                <Table.Cell>{item.title}</Table.Cell>
                <Table.Cell>
                  <Badge color={getBadgeColor(item.status)}>
                    {item.status}
                  </Badge>
                </Table.Cell>
                <Table.Cell>{item.priority}</Table.Cell>
                <Table.Cell>{item.dueDate}</Table.Cell>
                <Table.Cell>{item.tags}</Table.Cell>
                <Table.Cell>
                  <TableActions id={item.id} showEdit />
                </Table.Cell>
              </Table.Row>
            ))
          ) : (
            <Table.Row align="center">
              <Table.Cell colSpan={tableHeader.length}>
                <Heading
                  align="center"
                  weight="bold"
                  size="5"
                  color="gray"
                  my="4"
                >
                  No Data Found
                </Heading>
              </Table.Cell>
            </Table.Row>
          )}
        </DTable>
      )}
    </Box>
  );
}

export default Home;
