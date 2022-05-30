/* eslint-disable react/jsx-no-target-blank */
import React, {useState} from "react";
import Router from 'next/router'
import FooterSmall from "../components/Footers/FooterSmall";
import {AppServices} from "../src/services/AppServices";

export default function Index() {

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [remember, setRemember] = useState(false);

	const submitLogin = (e) => {
		e.preventDefault();
		let loginData = AppServices.login(email, password, remember);
		loginData.then(response => {
			if (response.isSucess) {
				localStorage.setItem('token', response.data.bearerToken.token)
				//console.log('response: ', response)
				Router.push('/admin/dashboard')
			} else {
				AppServices.messages('Thông tin đăng nhập không đúng!', 'danger')
			}
		})
	}

	return (
		<>
			<main>
				<section className="relative w-full h-full py-40 min-h-screen">
					<div
						className="absolute top-0 w-full h-full bg-blueGray-800 bg-no-repeat bg-full"
						style={{
							backgroundImage: "url('/img/register_bg_2.png')",
						}}
					></div>
					<div className="container mx-auto px-4 h-full">
						<div className="flex content-center items-center justify-center h-full">
							<div className="w-full lg:w-4/12 px-4">
								<div
									className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
									<div className="rounded-t mb-0 px-6 py-6">
									</div>
									<div className="flex-auto px-4 lg:px-10 py-10 pt-0">
										<form onSubmit={submitLogin}>
											<div className="relative w-full mb-3">
												<label
													className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
													htmlFor="grid-password"
												>
													Email
												</label>
												<input
													type="email"
													className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
													placeholder="Email"
													value={email}
													onChange={(e) => setEmail(e.target.value)}
													required={true}
												/>
											</div>

											<div className="relative w-full mb-3">
												<label
													className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
													htmlFor="grid-password"
												>
													Password
												</label>
												<input
													type="password"
													className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
													placeholder="Password"
													value={password}
													onChange={(e) => setPassword(e.target.value)}
													required={true}
												/>
											</div>
											<div>
												<label className="inline-flex items-center cursor-pointer">
													<input
														id="customCheckLogin"
														type="checkbox"
														className="form-checkbox border-0 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
														checked={remember}
														onChange={(e) => setRemember(e.target.checked)}
													/>
													<span className="ml-2 text-sm font-semibold text-blueGray-600">
								                        Remember me
							                        </span>
												</label>
											</div>

											<div className="text-center mt-6">
												<button
													className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
													type="submit"
												>
													Sign In
												</button>
											</div>
										</form>
									</div>
								</div>
							</div>
						</div>
					</div>
					<FooterSmall absolute/>
				</section>
			</main>
		</>
	);
}
