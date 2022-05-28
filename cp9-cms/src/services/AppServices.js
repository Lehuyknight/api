import { Store } from 'react-notifications-component';

const baseApi = 'http://103.226.249.207:23451/'
const loginApi = baseApi + 'user/login'
const listOrdersApi = baseApi + 'userorder';

export class AppServices {

	static getOrderStatus = (status) => {
		let text = '<i class="fas fa-circle text-orange-500 mr-2"></i> Tạo mới'
		switch (status) {
			case 'PENDING':
				text = '<i class="fas fa-circle text-orange-500 mr-2"></i> Đang xử lý';
				break;
			case 'CREATED':
				text = '<i class="fas fa-circle text-orange-500 mr-2"></i> Tạo mới';
				break;
			case 'DELIVERING':
				text = '<i class="fas fa-circle text-orange-500 mr-2"></i> Đang giao hàng';
				break;
			case 'GET':
				text = '<i class="fas fa-circle text-orange-500 mr-2"></i> Lấy hàng thành công';
				break;
			case 'CANCEL':
				text = '<i class="fas fa-circle text-orange-500 mr-2"></i> Bị hủy';
				break;
			case 'FAULT':
				text = '<i class="fas fa-circle text-orange-500 mr-2"></i> Bị lỗi';
				break;
		}

		return text;

	}

	/**
	 *
	 * @param content
	 * @param type
	 */
	static messages = (content = '', type) => {
		let title = type === 'success' ? 'Thành công!' : 'Lỗi!'
		Store.addNotification({
			title: title,
			message: content,
			type: type,
			insert: "top",
			container: "top-right",
			animationIn: ["animate__animated", "animate__fadeIn"],
			animationOut: ["animate__animated", "animate__fadeOut"],
			dismiss: {
				duration: 5000,
				onScreen: true
			}
		});
	}

	/**
	 *
	 * @param email
	 * @param password
	 * @param remember
	 * @returns {Promise<any>}
	 */
	static login = async (email, password, remember = false) => {
		const requestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			mode: 'cors',
			body: JSON.stringify({
				'email': email,
				'password': password
			})
		};

		let response = await fetch(loginApi, requestOptions)
		return await response.json();
	}

	/**
	 *
	 * @param token
	 * @returns {Promise<any>}
	 */
	static getOrders = async (token) => {
		const requestOptions = {
			method: 'GET',
			headers: {
				'Authorization': 'Bearer ' + token
			},
			mode: 'cors'
		};

		let response = await fetch(listOrdersApi, requestOptions)
		return await response.json();
	}
}