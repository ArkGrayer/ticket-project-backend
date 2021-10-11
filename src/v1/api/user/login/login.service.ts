import { StatusCodeEnum } from "v1/enum/status-code";
import { CustomError } from "v1/utils/error";

type Injectables = undefined;

export interface LoginParams {
	email: string;
	password: string;
}

export const login = (
	_injectables: Injectables,
	{ email, password }: LoginParams,
) => {
	if (email !== "test@test.com") {
		throw new CustomError("Invalid email", StatusCodeEnum.BAD_REQUEST);
	}

	if (password !== "123") {
		throw new CustomError("Invalid password", StatusCodeEnum.BAD_REQUEST);
	}

	return {
		authCode: "foo",
	};
};
