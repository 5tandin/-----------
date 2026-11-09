export const validate = (value, validators) => {
	let validationError = null;
	const error = validators.some((validator) => {
		validationError = validator(value);
		return validationError;
	});
	return validationError;
};
