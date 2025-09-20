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
  Skeleton,
  Callout,
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

  const { isLoading, data, isError, error } = useGetTodosQuery(params);

  console.log(data?.data);

  const tableHeader = [
    "Title",
    "Status",
    "Priority",
    "Due Date",
    "Tags",
    "Action",
  ];


  const LoadingSkeleton = () => (
    <DTable headerCells={tableHeader}>
      {[...Array(5)].map((_, index) => (
        <Table.Row key={index} align="center">
          <Table.Cell>
            <Skeleton height="20px" />
          </Table.Cell>
          <Table.Cell>
            <Skeleton height="24px" width="80px" />
          </Table.Cell>
          <Table.Cell>
            <Skeleton height="20px" width="60px" />
          </Table.Cell>
          <Table.Cell>
            <Skeleton height="20px" width="100px" />
          </Table.Cell>
          <Table.Cell>
            <Skeleton height="20px" width="120px" />
          </Table.Cell>
          <Table.Cell>
            <div className="flex gap-2">
              <Skeleton height="32px" width="32px" />
              <Skeleton height="32px" width="32px" />
            </div>
          </Table.Cell>
        </Table.Row>
      ))}
    </DTable>
  );

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
          disabled={isLoading}
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
          disabled={isLoading}
        >
          <Select.Trigger placeholder="Choose Status" />
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
            onValueChange={(e) => setParams((prev) => ({ ...prev, sortBy: e }))}
            disabled={isLoading}
          >
            <Select.Trigger placeholder="sort By" />
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
            disabled={isLoading}
          >
            <Select.Trigger placeholder="Sort Order" />

            <Select.Content>
              <Select.Group>
                <Select.Label>Choose Order</Select.Label>
                <Select.Item value="desc">Desc</Select.Item>
                <Select.Item value="asc">Asc</Select.Item>
              </Select.Group>
            </Select.Content>
          </Select.Root>
        </div>

        <Button
          size={{
            initial: "2",
            lg: "3",
          }}
          asChild
          disabled={isLoading}
        >
          <Link to={"/app/todos/add"}>Add Todo</Link>
        </Button>
      </div>

 
      {isError && (
        <Callout.Root color="red" mb="4">
          <Callout.Icon>
            {/* <ExclamationTriangleIcon /> */}
          </Callout.Icon>
          <Callout.Text>
            Failed to load todos. {error?.data?.message || "Please try again later."}
          </Callout.Text>
        </Callout.Root>
      )}

      {isLoading && <LoadingSkeleton />}

    
      {!isLoading && !isError && (
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

          <Table.Row className="bg-surface!" align={"center"}>
            <Table.Cell colSpan={tableHeader.length}>
              <div className="flex items-center justify-center gap-4 mt-4">
                <Button
                  disabled={params.page <= 1 || isLoading}
                  onClick={() =>
                    setParams((prev) => ({ ...prev, page: params.page - 1 }))
                  }
                >
                  Prev
                </Button>
                <div>Page {params.page}</div>
                <Button
                  disabled={(data?.data.length ?? 0) < 10 || isLoading}
                  onClick={() =>
                    setParams((prev) => ({ ...prev, page: params.page + 1 }))
                  }
                >
                  Next
                </Button>
              </div>
            </Table.Cell>
          </Table.Row>
        </DTable>
      )}
    </Box>
  );
}

export default Home;