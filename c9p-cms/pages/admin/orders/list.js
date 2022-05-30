import React from "react";

// components

// layout for page

import Admin from "layouts/Admin.js";
import CardOrders from "../../../components/Cards/CardOrders";

export default function OrderList() {
	return (
		<>
			<div className="flex flex-wrap mt-4">
				<div className="w-full mb-12 px-4">
					<CardOrders/>
				</div>
			</div>
		</>
	);
}

OrderList.layout = Admin;
