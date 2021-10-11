import { StatusCodeEnum } from "v1/enum/status-code";
import { Route } from "v1/types/route";
import { login } from "./login.service";
import { validation } from "./login.validation";

export const loginController: Route = async (request, reply) => {
	let result;

	try {
		const validatedParams = await validation(request.body as any);

		result = login(undefined, validatedParams);
	} catch (err: any) {
		return reply.status(err.statusCode || StatusCodeEnum.INTERNAL).send({
			error: err.message,
		});
	}

	reply.send(result);
};
