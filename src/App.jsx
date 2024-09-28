import React, { useState } from 'react';
import styles from './App.module.css';

export const App = () => {
	const [form, setForm] = useState({ email: '', password: '', repeatPassword: '' });
	const [errors, setErrors] = useState({});

	const handleSubmit = (event) => {
		event.preventDefault();
		console.log(form);
		setForm({ email: '', password: '', repeatPassword: '' });
	};

	const handleChange = (event) => {
		const { name, value } = event.target;
		setForm((prevForm) => ({ ...prevForm, [name]: value }));
		validateField(name, value);
	};

	const validateField = (name, value) => {
		let error = null;

		if (name === 'email') {
			if (!value) {
				error = 'Поле Email не может быть пустым';
			} else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)) {
				error = 'Некорректный Email';
			}
		} else if (name === 'password') {
			if (!value) {
				error = 'Поле Пароль не может быть пустым';
			} else if (value.length < 8) {
				error = 'Пароль должен быть не менее 8 символов';
			}
		} else if (name === 'repeatPassword') {
			if (!value) {
				error = 'Поле Повтор пароля не может быть пустым';
			} else if (value !== form.password) {
				error = 'Пароли не совпадают';
			}
		}
		setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
	};

	const isFormValid =
		form.email &&
		form.password &&
		form.repeatPassword &&
		!errors.email &&
		!errors.password &&
		!errors.repeatPassword;

	return (
		<div className={styles.container}>
			<form onSubmit={handleSubmit}>
				<label className={styles.label}>
					<span>Email:</span>
					<input
						type="email"
						value={form.email}
						onChange={handleChange}
						name="email"
						className={styles.input}
					/>
					{errors.email && <div className={styles.error}>{errors.email}</div>}
				</label>
				<br />
				<label className={styles.label}>
					Пароль:
					<input
						type="password"
						value={form.password}
						onChange={handleChange}
						name="password"
						className={styles.input}
					/>
					{errors.password && <div className={styles.error}>{errors.password}</div>}
				</label>
				<br />
				<label className={styles.label}>
					Повтор пароля:
					<input
						type="password"
						value={form.repeatPassword}
						onChange={handleChange}
						name="repeatPassword"
						className={styles.input}
					/>
					{errors.repeatPassword && <div className={styles.error}>{errors.repeatPassword}</div>}
				</label>
				<br />
				<button type="submit" disabled={!isFormValid} className={styles.button}>
					Зарегистрироваться
				</button>
			</form>
		</div>
	);
};
