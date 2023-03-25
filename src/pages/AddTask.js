import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import TaskForm from "../components/Create&Edit Task/TaskForm";
import { useAddTaskMutation } from "../features/tasks/tasksApi";

const AddTask = () => {
	//
	const navigate = useNavigate();

	//Add task mutation router
	const [addTask, { data, isLoading, isSuccess, isError, error }] =
		useAddTaskMutation();

	const [formState, setFormState] = useState({});

	// handle submit
	const handleSubmit = (e) => {
		e.preventDefault();
		addTask({ data: formState });
	};

	//
	useEffect(() => {
		if (isSuccess && data?.id) {
			navigate("/");
		}
	}, [isSuccess]);

	return (
		<div className="container relative">
			<main className="relative z-20 max-w-3xl mx-auto rounded-lg xl:max-w-none">
				<h1 className="mt-4 mb-8 text-3xl font-bold text-center text-gray-800">
					Create Task for Your Team
				</h1>

				<div className="justify-center mb-10 space-y-2 md:flex md:space-y-0">
					<TaskForm
						formState={formState}
						setFormState={setFormState}
						handleSubmit={handleSubmit}
					/>
				</div>
			</main>
		</div>
	);
};

export default AddTask;
