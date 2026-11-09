import { useEffect, useState } from 'react';
import styles from './Field.module.css';
import { validate } from './utils';

export const Field = ({
	value,
	validators,
	setValue,
	setIsValide,
	dependencies = {},
	forceValidation = () => false,
	...props
}) => {
	const [error, setError] = useState(null);
	const [isDirty, setIsDirty] = useState(false);

	const validateField = (currentValue, shouldValidate) => {
		let error = null;
		let isValide = false;

		if (shouldValidate) {
			error = validate(currentValue, validators);
			isValide = error === null;
		}

		setError(error);
		setIsValide(isValide);
	};

    useEffect(() => {
        validateField(value, isDirty)
    },[...Object.values(dependencies)])

	const onChange = ({ target }) => {
		setIsDirty(true);
		setValue(target.value);

		const isForceValidate = forceValidation(target.value);

		validateField(target.value, isForceValidate);
	};
	const onBlur = () => {
		validateField(value, isDirty);
	};
	return (
		<div>
			<input onChange={onChange} onBlur={onBlur} {...props} />
			{error && <span className={styles.errorSpan}>{error}</span>}
		</div>
	);
};
