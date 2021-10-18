import { getRepository } from "typeorm";
import { StatusCodeEnum } from "v1/enum/status-code";
import { Route } from "v1/types/route";
import { UserEntity } from "../user.entity";
import { register } from "./register.service";
import { validation } from "./register.validation";

export const registerController: Route = async (request, reply) => {
	let result;

	try {
		const validatedParams = await validation(request.body as any);

		const userRepository = getRepository(UserEntity);

		result = await register({ userRepository }, validatedParams);
	} catch (err: any) {
		return reply.status(err.statusCode || StatusCodeEnum.INTERNAL).send({
			error: err.message,
		});
	}

	reply.send(result);
};
