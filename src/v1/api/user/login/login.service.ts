import { compare } from "bcrypt";
import { StatusCodeEnum } from "v1/enum/status-code";
import { CustomError } from "v1/utils/error";
import { sign } from "v1/utils/jwt/sign";
import { UserRepository } from "../user.entity";

interface Injectables {
	userRepository: UserRepository;
}

export interface LoginParams {
	email: string;
	password: string;
}

export const login = async (
	{ userRepository }: Injectables,
	{ email, password }: LoginParams,
) => {
	const userData = await userRepository.findOne({
		where: { email },
	});

	if (!userData) {
		throw new CustomError("Forbidden", StatusCodeEnum.FORBIDDEN);
	}

	const isTheSamePassword = await compare(password, userData.password);

	if (!isTheSamePassword) {
		throw new CustomError("Forbidden", StatusCodeEnum.FORBIDDEN);
	}

	return {
		authCode: sign(userData),
	};
};
