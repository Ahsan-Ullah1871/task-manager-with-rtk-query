import React from "react";
import Sidebar from "../components/Home/Sidebar";
import TasksList from "../components/Home/TasksList";

const Home = () => {
	return (
		<div class="container relative">
			<Sidebar />
			<TasksList />
		</div>
	);
};

export default Home;
