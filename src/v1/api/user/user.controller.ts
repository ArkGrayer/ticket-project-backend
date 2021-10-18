import { FastifyInstance, FastifyPluginAsync } from "fastify";
import { loginController } from "./login/login.controller";
import { registerController } from "./register/register.controller";

// eslint-disable-next-line require-await
const userController: FastifyPluginAsync = async fastifyInstancePlugin => {
	fastifyInstancePlugin.post("/register", registerController);
	fastifyInstancePlugin.post("/login", loginController);
};

export const setUserController = (fastify: FastifyInstance) =>
	fastify.register(userController, {
		prefix: "/user",
	});
