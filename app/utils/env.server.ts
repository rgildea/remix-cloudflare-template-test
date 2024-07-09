import * as cfProcess from 'node:process'
import { z } from 'zod'

const schema = z.object({
	MODE: z.enum(['production', 'development', 'preview', 'test'] as const),
	SESSION_SECRET: z.string(),
	HONEYPOT_SECRET: z.string(),
	SENTRY_DSN: z.string(),
	RESEND_API_KEY: z.string(),
})

declare global {
	// eslint-disable-next-line @typescript-eslint/no-namespace
	namespace NodeJS {
		interface ProcessEnv extends z.infer<typeof schema> {}
	}
}

export function init() {
	const parsed = schema.safeParse(cfProcess.env)

	if (parsed.success === false) {
		console.error('❌ Invalid environment variables:', parsed.error.flatten().fieldErrors)

		throw new Error('Invalid environment variables')
	}
}

/**
 * This is used in both `entry.server.ts` and `root.tsx` to ensure that
 * the environment variables are set and globally available before the app is
 * started.
 *
 * NOTE: Do *not* add any environment variables in here that you do not wish to
 * be included in the client.
 * @returns all public ENV variables
 */
export function getEnv() {
	return {
		MODE: cfProcess.env.MODE,
		SENTRY_DSN: cfProcess.env.SENTRY_DSN,
	}
}

type ENV = ReturnType<typeof getEnv>

declare global {
	let ENV: ENV
	interface Window {
		ENV: ENV
	}
}
