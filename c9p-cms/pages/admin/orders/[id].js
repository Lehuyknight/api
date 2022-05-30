import React from "react";

// components

// layout for page

import Admin from "layouts/Admin.js";
import CardSettings from "../../../components/Cards/CardSettings";
import CardOrderDetail from "../../../components/Cards/CardOrderDetail";

export default function OrderDetail() {
	return (
		<>
			<div className="flex flex-wrap">
				<div className="w-full lg:w-8/12 px-4">
					<CardOrderDetail/>
				</div>
			</div>
		</>
	);
}

OrderDetail.layout = Admin;
