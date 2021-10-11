import { FastifyInstance, FastifyPluginAsync } from "fastify";
import { findByCodeController } from "./create/find-by-code/find-by-code.controller";
import { createController } from "./create/helpers/create.controller";

// eslint-disable-next-line require-await
const ticketController: FastifyPluginAsync = async fastifyInstancePlugin => {
	fastifyInstancePlugin.post("/create", createController);
	fastifyInstancePlugin.get("/find-by-code", findByCodeController);
};

export const setTicketController = (fastify: FastifyInstance) =>
	fastify.register(ticketController, {
		prefix: "/ticket",
	});
