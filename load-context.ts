import { AppLoadContext } from '@remix-run/cloudflare'
import { type PlatformProxy } from 'wrangler'
import { StorageContext } from './app/utils/auth.server'
import { db } from './app/utils/db.server'
import {
	createAuthSessionStorage,
	createConnectionSessionStorage,
	createToastSessionStorage,
	createVerificationSessionStorage,
} from './app/utils/session.server'

// When using `wrangler.toml` to configure bindings,
// `wrangler types` will generate types for those bindings
// into the global `Env` interface.
// Need this empty interface so that typechecking passes
// even if no `wrangler.toml` exists.
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Env {
	COOKIE_SECRET: string
	ENVIRONMENT_NAME: string
	DATABASE_URL: string
	RESEND_API_KEY: string
	MOCKS: boolean
	HONEYPOT_SECRET: string
	STORAGE_BUCKET: R2Bucket
	SESSIONS: KVNamespace
}

type Cloudflare = Omit<PlatformProxy<Env>, 'dispose'>

declare module '@remix-run/cloudflare' {
	interface AppLoadContext {
		cloudflare: Cloudflare
		storageContext: StorageContext
	}
}

type GetLoadContext = (args: {
	request: Request
	context: { cloudflare: Cloudflare } // load context _before_ augmentation
}) => AppLoadContext

// Shared implementation compatible with Vite, Wrangler, and Cloudflare Pages
export const getLoadContext: GetLoadContext = ({ context }) => {
	const { COOKIE_SECRET, ENVIRONMENT_NAME, DATABASE_URL, SESSIONS } = context.cloudflare.env
	const database = db(DATABASE_URL, ENVIRONMENT_NAME)
	const authSessionStorage = createAuthSessionStorage(COOKIE_SECRET, ENVIRONMENT_NAME, SESSIONS)
	const verificationSessionStorage = createVerificationSessionStorage(COOKIE_SECRET, ENVIRONMENT_NAME, SESSIONS)
	const toastSessionStorage = createToastSessionStorage(COOKIE_SECRET, ENVIRONMENT_NAME, SESSIONS)
	const connectionSessionStorage = createConnectionSessionStorage(COOKIE_SECRET, ENVIRONMENT_NAME, SESSIONS)
	const storageContext: StorageContext = {
		db: database,
		authSessionStorage,
		verificationSessionStorage,
		toastSessionStorage,
		connectionSessionStorage,
	}

	return {
		cloudflare: context.cloudflare,
		storageContext,
	}
}
