import type { ListResponse, Todo, todoResponse } from "../../types/common";
import type { TTtodoSchema } from "../../types/zod/ZodSchema";
import { apiSlice } from "../apiSlice";
export const todosApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTodos: builder.query<
      ListResponse,
      {
        page?: number;
        limit?: number;
        status?: string;
        search?: string;
        sortBy?: string;
        sortOrder?: "asc" | "desc";
      }
    >({
      query: (params) => ({ url: "todos", params }),
      providesTags: (res) =>
        res
          ? [
            ...res.data.map((t) => ({ type: "Todos" as const, id: t.id })),
            { type: "Todos" as const, id: "LIST" },
          ]
          : [{ type: "Todos", id: "LIST" }],
    }),
    createTodo: builder.mutation<todoResponse, TTtodoSchema>({
      query: (body) => ({ url: "todos", method: "POST", body }),
      invalidatesTags: [{ type: "Todos", id: "LIST" }],
    }),
    getTodoById: builder.query<todoResponse, string>({
      query: (id) => ({ url: `todos/${id}` }),
      providesTags: (res, err, id) => [{ type: "Todos", id }],
    }),
    updateTodo: builder.mutation<todoResponse,{ id: string; patch: Partial<Todo> }>({
      query: ({ id, patch }) => ({
        url: `todos/${id}`,
        method: "PATCH",
        body: patch,
      }),
      async onQueryStarted({ id, patch }, { dispatch, queryFulfilled }) {
        const patchResults = dispatch(
          todosApi.util.updateQueryData(
            "getTodos",
            { page: 1, limit: 10 },
            (draft) => {
              const item = draft.data.find((t) => t.id === id);
              if (item) Object.assign(item, patch);
            }
          )
        );
        try {
          await queryFulfilled;
        } catch {
          patchResults.undo();
        }
      },
      invalidatesTags: (res, err, arg) => [{ type: "Todos", id: arg.id }],
    }),
    deleteTodo: builder.mutation<{ success: boolean }, string>({
      query: (id) => ({
        url: `todos/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (res, err, id) => [
        { type: "Todos", id },
        { type: "Todos", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetTodosQuery,
  useCreateTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
  useGetTodoByIdQuery
} = todosApi;
