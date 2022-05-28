import React, {useState, useEffect} from "react";
import PropTypes from "prop-types";
import {map} from 'lodash';
import moment from "moment";

// components
import {AppServices} from "../../src/services/AppServices";
import Router from "next/router";

export default function CardOrders({color}) {

	const [orders, setOrders] = useState([]);

	useEffect(() => {
		const token = localStorage.getItem('token');
		let listOrders = AppServices.getOrders(token);
		listOrders.then(response => {
			if (response.isSucess) {
				setOrders(response.data.data)
			} else {
				AppServices.messages('Không kết nối được với CSDL', 'danger')
			}
		})
	})

	return (
		<>
			<div
				className={
					"relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded " +
					(color === "light" ? "bg-white" : "bg-blueGray-700 text-white")
				}
			>
				<div className="rounded-t mb-0 px-4 py-3 border-0">
					<div className="flex flex-wrap items-center">
						<div className="relative w-full px-4 max-w-full flex-grow flex-1">
							<h3
								className={
									"font-semibold text-lg " +
									(color === "light" ? "text-blueGray-700" : "text-white")
								}
							>
								Danh sách đơn hàng
							</h3>
						</div>
					</div>
				</div>
				<div className="block w-full overflow-x-auto">
					{/* Projects table */}
					<table className="items-center w-full bg-transparent border-collapse">
						<thead>
						<tr>
							<th
								className={
									"px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
									(color === "light"
										? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
										: "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
								}
							>
								Họ và tên
							</th>
							<th
								className={
									"px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
									(color === "light"
										? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
										: "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
								}
							>
								Địa chỉ
							</th>
							<th
								className={
									"px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
									(color === "light"
										? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
										: "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
								}
							>
								SĐT
							</th>
							<th
								className={
									"px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
									(color === "light"
										? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
										: "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
								}
							>
								Số lượng
							</th>
							<th
								className={
									"px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
									(color === "light"
										? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
										: "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
								}
							>
								Trạng thái
							</th>
							<th
								className={
									"px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
									(color === "light"
										? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
										: "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
								}
							>
								Ngày khởi tạo
							</th>
						</tr>
						</thead>
						<tbody>
						{map(orders, (order, k) => {
							return(
								<tr key={k}>
									<th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
										{order.name}
									</th>
									<td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
										{order.address}
									</td>
									<td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
										{order.phone}
									</td>
									<td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
										{order.qty}
									</td>
									<td
										className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
										dangerouslySetInnerHTML={{ __html: AppServices.getOrderStatus((order.status)) }}
									/>
									<td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
										{moment(order.created_at).format('H:m:s DD-MM-YYYY')}
									</td>
								</tr>
							)
						})}

						</tbody>
					</table>
				</div>
			</div>
		</>
	);
}

CardOrders.defaultProps = {
	color: "light",
};

CardOrders.propTypes = {
	color: PropTypes.oneOf(["light", "dark"]),
};
