const { randomBytes } = await import('node:crypto');

export const generateUsername = (name) => {
	const id = randomBytes(2).toString('hex');
	return `${name.slice(0, 5)}${id}`;
};

export const getImageURL = (collectionId, recordId, filename, size = '0x0') => {
	return `http://127.0.0.1:8090/api/files/${collectionId}/${recordId}/${filename}?thumb=${size}`;
};

export const validateFormData = (formData, schema) => {
	const body = Object.fromEntries(formData);

	try {
		const validatedData = schema.parse(body);
		return {
			formData: validatedData,
			errors: null
		};
	} catch (err) {
		const errors = err.flatten();
		return {
			formData: body,
			errors: errors.fieldErrors
		};
	}
};
