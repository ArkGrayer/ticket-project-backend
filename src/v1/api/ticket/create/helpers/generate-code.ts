const CHARACTERS =
	"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

const CODE_LENGTH = 5;

export const generateCode = (code?: string) => {
	if (code) {
		return code;
	}

	return Array(CODE_LENGTH)
		.fill("")
		.reduce(
			acc =>
				acc + CHARACTERS.charAt(Math.floor(Math.random() * CHARACTERS.length)),
			"",
		);
};
