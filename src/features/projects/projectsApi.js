import { apiSlice } from "../api/apiSlice";
import { selectAllProjects, selectProject } from "./projectsSlice";

export const projectsApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		//getProjects:
		getProjects: builder.query({
			query: () => `/projects`,

			async onQueryStarted(arg, { queryFulfilled, dispatch }) {
				const result = await queryFulfilled;
				const isAvailableInStorage =
					localStorage.getItem("selected_projects");

				if (
					(isAvailableInStorage == undefined ||
						isAvailableInStorage == null) &&
					result?.data?.length > 0
				) {
					dispatch(
						selectAllProjects(
							result?.data?.map(
								(it) => it.id
							)
						)
					);
				} else if (
					result?.data?.length > 0 &&
					JSON.parse(
						localStorage.getItem(
							"selected_projects"
						)
					)?.length > 0
				) {
					const selected_projects = JSON.parse(
						localStorage.getItem(
							"selected_projects"
						)
					);

					dispatch(
						selectAllProjects(selected_projects)
					);
				}
			},
		}),
	}),
});

export const { useGetProjectsQuery } = projectsApi;
