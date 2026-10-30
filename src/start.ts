import { createCsrfMiddleware, createStart } from "@tanstack/react-start";

const csrfMiddleware = createCsrfMiddleware({
	filter: (ctx) => ctx.handlerType === "serverFn",
	origin: "https://geraldchavez.xyz",
});

export const startInstance = createStart(() => ({
	requestMiddleware: [csrfMiddleware],
}));
