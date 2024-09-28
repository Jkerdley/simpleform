import React from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import styles from './App.module.css';

const schema = yup.object().shape({
	email: yup
		.string()
		.matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Некорректный Email')
		.required('Поле Email не может быть пустым'),
	password: yup
		.string()
		.min(8, 'Пароль должен быть не менее 8 символов')
		.max(20, 'Не вводите более 20 символов')
		.required('Поле Пароль не может быть пустым'),
	repeatPassword: yup
		.string()
		.oneOf([yup.ref('password'), null], 'Пароли не совпадают')
		.required('Поле Повтор пароля не может быть пустым'),
});

export const App = () => {
	const {
		register,
		handleSubmit,
		formState: { errors, isValid },
		reset,
	} = useForm({
		resolver: yupResolver(schema),
		mode: 'onChange',
	});

	const onSubmit = (data) => {
		console.log(data);
		reset();
	};

	return (
		<div className={styles.container}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<label className={styles.label}>
					<span>Email:</span>
					<input type="email" {...register('email')} className={styles.input} />
					{errors.email && <div className={styles.error}>{errors.email.message}</div>}
				</label>
				<br />
				<label className={styles.label}>
					Пароль:
					<input type="password" {...register('password')} className={styles.input} />
					{errors.password && <div className={styles.error}>{errors.password.message}</div>}
				</label>
				<br />
				<label className={styles.label}>
					Повтор пароля:
					<input type="password" {...register('repeatPassword')} className={styles.input} />
					{errors.repeatPassword && <div className={styles.error}>{errors.repeatPassword.message}</div>}
				</label>
				<br />
				<button type="submit" disabled={!isValid} className={styles.button}>
					Зарегистрироваться
				</button>
			</form>
		</div>
	);
};
