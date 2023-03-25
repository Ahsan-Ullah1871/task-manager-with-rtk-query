import React from "react";
import { useGetTeamsQuery } from "../../../features/teams/teamsApi";

const Members = () => {
	const {
		data: tem_members = [],
		isLoading,
		isError,
	} = useGetTeamsQuery();
	return (
		<div className="mt-8">
			<h3 className="text-xl font-bold">Team Members</h3>
			<div className="mt-3 space-y-4">
				{tem_members?.map((member) => {
					return (
						<div className="checkbox-container">
							<img
								src={member.avatar}
								className="team-avater"
								alt={member.name}
							/>
							<p className="label">
								{member.name}
							</p>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default Members;
