import {
	FastifyInstance,
	HookHandlerDoneFunction,
	onRequestHookHandler,
} from "fastify";
import fp from "fastify-plugin";
import { StatusCodeEnum } from "v1/enum/status-code";
import { CustomError } from "v1/utils/error";
import { verify } from "v1/utils/jwt/verify";

export const authorizationMiddleware: onRequestHookHandler = (
	request,
	_reply,
	done,
) => {
	const { authorization } = request.headers;

	if (!authorization) {
		return done(
			new CustomError(
				"authorization is a required header",
				StatusCodeEnum.FORBIDDEN,
			),
		);
	}

	if (!authorization.startsWith("Bearer ")) {
		return done(
			new CustomError("Invalid token pattern", StatusCodeEnum.FORBIDDEN),
		);
	}

	const token = authorization.replace("Bearer ", "");

	if (!verify(token)) {
		return done(new CustomError("Invalid token", StatusCodeEnum.FORBIDDEN));
	}

	done();
};

export const setAuthorizationMiddleware = fp(
	(fastify: FastifyInstance, _options: any, done: HookHandlerDoneFunction) => {
		fastify.addHook("onRequest", authorizationMiddleware);

		done();
	},
);
