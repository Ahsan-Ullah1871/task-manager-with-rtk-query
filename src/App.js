import React from "react";
import "./App.css";
import Header from "./components/Header";
import Home from "./pages/Home";
import AddTask from "./pages/AddTask";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import EditTask from "./pages/EditTask";

function App() {
	return (
		<BrowserRouter>
			<div className="text-[#111827]">
				<Header />

				<Routes>
					<Route path="/" element={<Home />} />
					<Route
						path="/addtask"
						element={<AddTask />}
					/>
					<Route
						path="/edittask/:taskID"
						element={<EditTask />}
					/>
				</Routes>
			</div>
		</BrowserRouter>
	);
}

export default App;

