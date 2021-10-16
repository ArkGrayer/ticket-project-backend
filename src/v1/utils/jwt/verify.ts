import { verify as verifyJwt } from "jsonwebtoken";

export const verify = (token: string) => {
	try {
		verifyJwt(token, process.env.JWT_PRIVATE_KEY as string);

		return true;
	} catch (_) {
		return false;
	}
};
