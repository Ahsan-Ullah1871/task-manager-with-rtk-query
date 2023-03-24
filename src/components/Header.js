import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
	return (
		<nav class="container relative py-3">
			<div class="flex items-center justify-between">
				<Link to="/">
					<img src="/images/logo.svg" />
				</Link>
				<div class="flex-1 max-w-xs search-field group">
					<i class="fa-solid fa-magnifying-glass search-icon group-focus-within:text-blue-500"></i>
					<input
						type="text"
						placeholder="Search Task"
						class="search-input"
						id="lws-searchTask"
					/>
				</div>
			</div>
		</nav>
	);
};

export default Header;
