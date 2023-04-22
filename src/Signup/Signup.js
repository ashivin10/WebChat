import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import chat from '../images/chat.png'

import styles from "./styles.module.css";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
const Signup = () => {
	const [data, setData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
	});
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(true);

	const navigate = useNavigate();

	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			setLoading(false)

			const url = "https://real-erin-oyster-cap.cyclic.app/api/users";
			const { data: res } = await axios.post(url, data);
			setLoading(true)
			navigate("/login");
			console.log(res.message);
		} catch (error) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				setError(error.response.data.message);
			}
		}
	};

	return (
		<div className={styles.signup_container}>
			<div className={styles.signup_form_container}>
				<div className={styles.left}>
				<div className={styles.heading_signup}>
                <h2>WebChat</h2>

            </div>
            <div className={styles.img_icon_signup}>
                <img src={chat} alt='' />
            </div>
					<h1>Welcome</h1>
					<Link to="/login">
						<button type="button" className={styles.white_btn}>
							Sign in
						</button>
					</Link>
					
				
				</div>
				<div className={styles.right}>
					<form className={styles.form_container} onSubmit={handleSubmit}>
						<h1>Create Account</h1>
						<input
							type="text"
							placeholder="First Name"
							name="firstName"
							onChange={handleChange}
							value={data.firstName}
							required
							className={styles.input}
						/>
						<input
							type="text"
							placeholder="Last Name"
							name="lastName"
							onChange={handleChange}
							value={data.lastName}
							required
							className={styles.input}
						/>
						<input
							type="email"
							placeholder="Email"
							name="email"
							onChange={handleChange}
							value={data.email}
							required
							className={styles.input}
						/>
						<input
							type="password"
							placeholder="Password"
							name="password"
							onChange={handleChange}
							value={data.password}
							required
							className={styles.input}
						/>
						<Stack sx={{ width: '100%' }} spacing={2}></Stack>
						{error &&<Alert severity="error">{error}</Alert>}
						<button type="submit" className={styles.green_btn}>
							Sign Up
						</button>
					</form>
				</div>
			</div>
			{loading?loading:<Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}open>
        <CircularProgress color="inherit" />
      </Backdrop>}
		</div>
		
	);
};

export default Signup;
