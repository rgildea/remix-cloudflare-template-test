import { Pool, neonConfig } from '@neondatabase/serverless'
import { PrismaNeon } from '@prisma/adapter-neon'
import { Prisma, PrismaClient } from '@prisma/client'
import chalk from 'chalk'
import ws from 'ws'

export const prisma = (connectionString: string) => {
	// NOTE: if you change anything in this function you'll need to restart
	// the dev server to see your changes.

	// Feel free to change this log threshold to something that makes sense for you
	const logThreshold = 500 // ms

	neonConfig.webSocketConstructor = ws
	const pool = new Pool({ connectionString })
	const adapter = new PrismaNeon(pool)
	const client = new PrismaClient({
		adapter,
		log: [
			{ level: 'query', emit: 'event' },
			{ level: 'error', emit: 'stdout' },
			{ level: 'warn', emit: 'stdout' },
		],
	})

	client.$on('query', async e => {
		if (e.duration < logThreshold) return
		const color =
			e.duration < logThreshold * 1.1
				? 'green'
				: e.duration < logThreshold * 1.2
					? 'blue'
					: e.duration < logThreshold * 1.3
						? 'yellow'
						: e.duration < logThreshold * 1.4
							? 'redBright'
							: 'red'
		const dur = chalk[color](`${e.duration}ms`)
		console.info(`prisma:query - ${dur} - ${e.query}`)
	})

	client.$on('query', e => {
		console.info('Executing Query...')
		console.info('Query', e)
	})

	try {
		client.$connect()
	} catch (e) {
		console.error('Error connecting to the database')
		if (e instanceof Prisma.PrismaClientInitializationError) {
			console.error('PrismaClientInitializationError')
			// do something smart here?
		}
		throw e
	}

	return client
}
export const db = prisma // alias for prisma
