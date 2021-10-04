import Fastify from "fastify";
import "reflect-metadata";

const PORT = 3000;

const server = async () => {
	if (process.env.NODE_ENV !== "production") {
		const { config } = await import("dotenv");
		config();
	}

	const fastify = Fastify({ logger: true });

	fastify.listen(PORT, err => {
		if (err) throw err;
	});
};

server();
