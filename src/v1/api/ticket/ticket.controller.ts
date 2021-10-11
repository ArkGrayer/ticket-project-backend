import { FastifyInstance, FastifyPluginAsync } from "fastify";
import { createController } from "./create/create.controller";

// eslint-disable-next-line require-await
const ticketController: FastifyPluginAsync = async fastifyInstancePlugin => {
	fastifyInstancePlugin.post("/create", createController);
};

export const setTicketController = (fastify: FastifyInstance) =>
	fastify.register(ticketController, {
		prefix: "/ticket",
	});
