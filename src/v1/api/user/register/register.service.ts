import { StatusCodeEnum } from "v1/enum/status-code";
import { CustomError } from "v1/utils/error";
import { encrypt } from "v1/utils/encrypt/encrypt";
import { sign } from "v1/utils/jwt/sign";
import { hasUserWithTheSameEmail } from "../helpers/has-user-with-the-same-email";
import { UserRepository } from "../user.entity";

interface Injectables {
	userRepository: UserRepository;
}

export interface RegisterParams {
	email: string;
	password: string;
}

export const register = async (
	{ userRepository }: Injectables,
	params: RegisterParams,
) => {
	if (
		await hasUserWithTheSameEmail({
			userRepository,
			email: params.email as string,
		})
	) {
		throw new CustomError("Forbidden", StatusCodeEnum.FORBIDDEN);
	}

	const data = {
		...params,
		password: await encrypt(params.password),
	};

	const userData = await userRepository.save(data);

	return {
		authCode: sign(userData),
	};
};
