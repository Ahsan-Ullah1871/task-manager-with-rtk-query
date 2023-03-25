import React from "react";
import Members from "./Sidebar/Members";
import Projects from "./Sidebar/Projects";

const Sidebar = () => {
	return (
		<div className="sidebar">
			<Projects />

			<Members />
		</div>
	);
};

export default Sidebar;
