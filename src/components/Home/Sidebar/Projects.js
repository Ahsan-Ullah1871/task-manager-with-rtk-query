import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetProjectsQuery } from "../../../features/projects/projectsApi";
import { selectProject } from "../../../features/projects/projectsSlice";

const Projects = () => {
	const dispatch = useDispatch();
	// project selector
	const {
		data: projects = [],
		isLoading,
		isSuccess,
		isError,
	} = useGetProjectsQuery();

	// selected projects
	const { selected_projects } = useSelector((state) => state.projects);

	//handleSelect
	const handleSelect = (id) => {
		dispatch(selectProject(id));
	};

	return (
		<div>
			<h3 className="text-xl font-bold">Projects</h3>
			<div className="mt-3 space-y-4">
				{projects?.map((project) => {
					return (
						<div
							className="checkbox-container"
							key={project.id}
						>
							<input
								type="checkbox"
								className={
									project.colorClass
								}
								checked={selected_projects?.includes(
									project.id
								)}
								onChange={() =>
									handleSelect(
										project.id
									)
								}
							/>
							<p className="label">
								{project.projectName}
							</p>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default Projects;
