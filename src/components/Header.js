import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setSearchKey } from "../features/tasks/tasksSlice";

const Header = () => {
	const dispatch = useDispatch();

	const { search_key } = useSelector((state) => state.task);
	const handleSearch = (e) => {
		dispatch(setSearchKey(e.target.value));
	};
	return (
		<nav className="container relative py-3">
			<div className="flex items-center justify-between">
				<Link to="/">
					<img src="/images/logo.svg" />
				</Link>
				<div className="flex-1 max-w-xs search-field group">
					<i className="fa-solid fa-magnifying-glass search-icon group-focus-within:text-blue-500"></i>
					<input
						type="text"
						placeholder="Search Task"
						className="search-input"
						id="lws-searchTask"
						value={search_key}
						onChange={handleSearch}
						style={{ color: "black" }}
					/>
				</div>
			</div>
		</nav>
	);
};

export default Header;
