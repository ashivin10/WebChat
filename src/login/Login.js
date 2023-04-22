import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import chat from '../images/chat.png'
import styles from "./styles.module.css";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

const Login = () => {
	const [data, setData] = useState({ email: "", password: "" });
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(true);

	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			setLoading(false)
			const url = "https://real-erin-oyster-cap.cyclic.app/api/auth";
			const { data: res } = await axios.post(url, data);
			setLoading(true)
			localStorage.setItem("token", res.data);
			localStorage.setItem("user", res.user);
			localStorage.setItem("last", res.user_last);

			window.location = "/";
		} catch (error) {
			setLoading(true)
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
		<div className={styles.login_container}>
			<div className={styles.login_form_container}>
				<div className={styles.left}>
					<form className={styles.form_container} onSubmit={handleSubmit}>
						<h1>Login to Your Account</h1>
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
							Sign In
						</button>
					</form>
				</div>
				<div className={styles.right}>
				<div className={styles.heading_login}>
                <h2>WebChat</h2>

            </div>
            <div className={styles.img_icon_login}>
                <img src={chat} alt='' />
            </div>
					<h1>New Here ?</h1>
					<Link to="/signup">
						<button type="button" className={styles.white_btn}>
							Sign Up
						</button>
					</Link>
				</div>
			</div>
			{loading?loading:<Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}open>
        <CircularProgress color="inherit" />
      </Backdrop>}
		</div>
	);
};

export default Login;
