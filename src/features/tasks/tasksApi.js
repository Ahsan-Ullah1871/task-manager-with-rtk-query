import { apiSlice } from "../api/apiSlice";

export const tasksApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		//getProjects:
		getTasks: builder.query({
			query: () => `/tasks`,
		}),

		//getTask:
		getTask: builder.query({
			query: ({ task_id }) => {
				return `/tasks/${task_id}`;
			},
		}),

		//editTask:
		editTask: builder.mutation({
			query: ({ task_id, data }) => ({
				url: `/tasks/${task_id}`,
				method: "PATCH",
				body: data,
			}),

			async onQueryStarted(
				{ task_id },
				{ queryFulfilled, dispatch }
			) {
				try {
					const { data: edited_task } =
						await queryFulfilled;
					if (edited_task?.id) {
						// Pessimistic update
						//Task list
						dispatch(
							apiSlice.util.updateQueryData(
								"getTasks",
								undefined,
								(draft) => {
									return draft.map(
										(
											item
										) => {
											if (
												item.id !=
												task_id
											) {
												return item;
											} else {
												return {
													...item,
													...edited_task,
												};
											}
										}
									);
								}
							)
						);

						//Task
						dispatch(
							apiSlice.util.updateQueryData(
								"getTask",
								{
									task_id: task_id,
								},
								(draft) => {
									return edited_task;
								}
							)
						);
					}
				} catch (error) {
					//
				}
			},
		}),

		//addTask:
		addTask: builder.mutation({
			query: ({ data }) => ({
				url: `/tasks`,
				method: "POST",
				body: data,
			}),

			async onQueryStarted(arg, { queryFulfilled, dispatch }) {
				try {
					const { data: new_task } =
						await queryFulfilled;
					if (new_task?.id) {
						// Pessimistic update
						dispatch(
							apiSlice.util.updateQueryData(
								"getTasks",
								undefined,
								(draft) => {
									draft.push(
										new_task
									);
								}
							)
						);
					}
				} catch (error) {
					//
				}
			},
		}),

		//deleteTask:
		deleteTask: builder.mutation({
			query: ({ task_id }) => ({
				url: `/tasks/${task_id}`,
				method: "DELETE",
			}),

			async onQueryStarted(
				{ task_id },
				{ queryFulfilled, dispatch }
			) {
				//Optimistic update mutation
				const patchResult = dispatch(
					apiSlice.util.updateQueryData(
						"getTasks",
						undefined,
						(draft) => {
							return draft.filter(
								(item) =>
									item.id !=
									task_id
							);
						}
					)
				);
				try {
					await queryFulfilled;
				} catch (error) {
					patchResult.undo();
				}
			},
		}),
	}),
});

export const {
	useGetTasksQuery,
	useGetTaskQuery,
	useAddTaskMutation,
	useEditTaskMutation,
	useDeleteTaskMutation,
} = tasksApi;
