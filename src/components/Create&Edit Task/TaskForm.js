import React from "react";
import { useGetProjectsQuery } from "../../features/projects/projectsApi";
import { useGetTeamsQuery } from "../../features/teams/teamsApi";

const TaskForm = ({ formState, setFormState, handleSubmit }) => {
	//projects
	const { data: projects = [] } = useGetProjectsQuery();
	//team members
	const { data: tem_members = [] } = useGetTeamsQuery();

	//handle Change
	const handleChange = (key_name, value) => {
		setFormState((prev) => ({ ...prev, [key_name]: value }));
	};

	return (
		<form className="space-y-6" onSubmit={handleSubmit}>
			<div className="fieldContainer">
				<label for="lws-taskName">Task Name</label>
				<input
					type="text"
					name="taskName"
					id="lws-taskName"
					required
					placeholder="Implement RTK Query"
					value={formState?.taskName}
					onChange={(e) =>
						handleChange(
							"taskName",
							e.target.value
						)
					}
				/>
			</div>

			<div className="fieldContainer">
				<label>Assign To</label>
				<select
					name="teamMember"
					id="lws-teamMember"
					required
					onChange={(e) => {
						const selected_member =
							tem_members.find(
								(it) =>
									it.id ==
									e.target.value
							);

						handleChange(
							"teamMember",
							selected_member
						);
					}}
				>
					<option value="" hidden selected>
						Select team member
					</option>
					{tem_members?.map((member) => {
						return (
							<option
								value={member.id}
								selected={
									formState
										?.teamMember
										?.id ==
									member.id
								}
							>
								{member.name}
							</option>
						);
					})}
				</select>
			</div>
			<div className="fieldContainer">
				<label for="lws-projectName">Project Name</label>
				<select
					id="lws-projectName"
					name="projectName"
					required
					onChange={(e) => {
						const selected_project =
							projects.find(
								(it) =>
									it.id ==
									e.target.value
							);

						handleChange(
							"project",
							selected_project
						);
					}}
				>
					<option value="" hidden selected>
						Select Project
					</option>
					{projects?.map((project) => {
						return (
							<option
								value={project.id}
								selected={
									formState
										?.project
										?.id ==
									project.id
								}
							>
								{project.projectName}
							</option>
						);
					})}
				</select>
			</div>

			<div className="fieldContainer">
				<label for="lws-deadline">Deadline</label>
				<input
					type="date"
					name="deadline"
					id="lws-deadline"
					required
					onChange={(e) =>
						handleChange(
							"deadline",
							e.target.value
						)
					}
					value={formState?.deadline}
				/>
			</div>

			<div className="text-right">
				<button type="submit" className="lws-submit">
					Save
				</button>
			</div>
		</form>
	);
};

export default TaskForm;
