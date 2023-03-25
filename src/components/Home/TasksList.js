import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useGetTasksQuery } from "../../features/tasks/tasksApi";
import Task from "./Tasks/Task";

const TasksList = () => {
	//selected projects
	const { selected_projects } = useSelector((state) => state.projects);
	// search key
	const { search_key } = useSelector((state) => state.task);

	//handle search
	const handleSearch = (task) => {
		return task.taskName
			.replace(/\s+/g, "")
			.toUpperCase()
			.includes(search_key.replace(/\s+/g, "").toUpperCase());
	};
	//handle search
	const handleFilterByProject = (task) => {
		return selected_projects.includes(task?.project?.id);
	};

	//task selector
	const {
		data: tasks_list = [],
		isFetching,
		isLoading,
		isError,
		error,
		is,
	} = useGetTasksQuery();

	//decide ui
	let content = null;
	if (isFetching && isLoading)
		content = (
			<div>
				<p>Loading...</p>
			</div>
		);
	else if (!isLoading && isError)
		content = (
			<div>
				<p>There have some problem {error?.message}</p>
			</div>
		);
	else if (
		!isFetching &&
		!isLoading &&
		!isError &&
		tasks_list?.filter(handleFilterByProject)?.filter(handleSearch)
			?.length == 0
	) {
		content = (
			<div>
				<p>Tasks not found</p>
			</div>
		);
	} else if (!isLoading && !isError && tasks_list?.length > 0) {
		content = tasks_list
			?.filter(handleFilterByProject)
			?.filter(handleSearch)
			?.map((task) => <Task key={task.id} task={task} />);
	}

	return (
		<div className="lg:pl-[16rem] 2xl:pl-[23rem]">
			<main className="relative z-20 max-w-3xl mx-auto rounded-lg xl:max-w-none">
				<div className="justify-between mb-10 space-y-2 md:flex md:space-y-0">
					<Link
						to="/addtask"
						className="lws-addnew group"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							className="w-6 h-6 group-hover:text-indigo-500"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M12 4.5v15m7.5-7.5h-15"
							/>
						</svg>

						<span className="group-hover:text-indigo-500">
							Add New
						</span>
					</Link>
				</div>

				<div className="lws-task-list">{content}</div>
			</main>
		</div>
	);
};

export default TasksList;
