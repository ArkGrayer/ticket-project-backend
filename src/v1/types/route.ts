import { FastifyReply, FastifyRequest } from "fastify";
import { RouteGenericInterface } from "fastify/types/route";
import { Server, IncomingMessage, ServerResponse } from "http";

export type Route = (
	request: FastifyRequest<RouteGenericInterface, Server, IncomingMessage>,
	reply: FastifyReply<
		Server,
		IncomingMessage,
		ServerResponse,
		RouteGenericInterface,
		unknown
	>,
) => any;
