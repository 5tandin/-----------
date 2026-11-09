import { useEffect, useRef, useState } from 'react';
import styles from './App.module.css';
import { Field } from './components/Field/Field';
import { emailValidator } from './validators/email-validator';
import { passwordMinValidator, passwordSimbolsValidator } from './validators/index';

function App() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [passwordcheck, setPasswordcheck] = useState('');

	const [isEmailValide, setIsEmailValide] = useState(false);
	const [isPasswordValide, setIsPasswordValide] = useState(false);
	const [isPasswordcheckValide, setIsPasswordcheckValide] = useState(false);

	const submitButtorRef = useRef(null);

	const onSubmit = (event) => {
		event.preventDefault();
		console.log({ email, password });
	};

	const isFormValide = isEmailValide && isPasswordValide && isPasswordcheckValide;

	useEffect(() => {
		if (isFormValide) {
			submitButtorRef.current.focus();
		}
	}, [isFormValide]);

	return (
		<form className={styles.formBlock} onSubmit={onSubmit}>
			<Field
				type="email"
				name="email"
				placeholder="Логин..."
				value={email}
				setValue={setEmail}
				setIsValide={setIsEmailValide}
				validators={[emailValidator]}
			/>
			<Field
				type="password"
				name="password"
				placeholder="Пароль..."
				value={password}
				setValue={setPassword}
				setIsValide={setIsPasswordValide}
				validators={[passwordMinValidator, passwordSimbolsValidator]}
			/>
			<Field
				type="password"
				name="passwordcheck"
				placeholder="Повтор пароля..."
				value={passwordcheck}
				setValue={setPasswordcheck}
				setIsValide={setIsPasswordcheckValide}
				validators={[
					(value) => (value === password ? null : 'Пароли не совпадают'),
				]}
				dependencies={{password}}
				forceValidation={(value) =>
					value.length > 0 && value.length >= password.length
				}
			/>
			<button type="submit" disabled={!isFormValide} ref={submitButtorRef}>
				Зарегистрироваться
			</button>
		</form>
	);
}

export default App;
