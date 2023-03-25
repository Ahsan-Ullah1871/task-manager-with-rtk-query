import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import TaskForm from "../components/Create&Edit Task/TaskForm";
import {
	useEditTaskMutation,
	useGetTaskQuery,
} from "../features/tasks/tasksApi";

const EditTask = () => {
	const { taskID } = useParams();

	//
	const navigate = useNavigate();

	//search_key

	//Get task mutation router
	const {
		data: task,
		isError: getTaskIsError,
		isLoading: getTaskLoading,
		error: getTaskError,
	} = useGetTaskQuery({ task_id: taskID });

	const [formState, setFormState] = useState({});
	//
	useEffect(() => {
		if (task?.id) {
			setFormState(task);
		}
	}, [task]);

	//Add task mutation router
	const [editTask, { data, isLoading, isSuccess, isError, error }] =
		useEditTaskMutation();
	// handle submit
	const handleSubmit = (e) => {
		e.preventDefault();
		editTask({
			task_id: taskID,
			data: formState,
		});
	};

	//
	useEffect(() => {
		if (isSuccess && data?.id) {
			navigate("/");
		}
	}, [data?.id, isSuccess, navigate]);

	return (
		<div className="container relative">
			<main className="relative z-20 max-w-3xl mx-auto rounded-lg xl:max-w-none">
				<h1 className="mt-4 mb-8 text-3xl font-bold text-center text-gray-800">
					Edit Task for Your Team
				</h1>
				{getTaskLoading && !getTaskIsError && (
					<p
						className="mt-2 text-center "
						style={{ color: "green" }}
					>
						Loading details..
					</p>
				)}
				<div className="justify-center mb-10 space-y-2 md:flex md:space-y-0">
					{!getTaskLoading && (
						<TaskForm
							formState={formState}
							setFormState={setFormState}
							handleSubmit={handleSubmit}
						/>
					)}
				</div>
				{(isError || getTaskIsError) &&
					(error || getTaskError) && (
						<p
							className="mt-2 text-center"
							style={{ color: "red" }}
						>
							There have an error{" "}
						</p>
					)}
			</main>
		</div>
	);
};

export default EditTask;
