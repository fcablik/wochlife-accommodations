import { promiseHash } from 'remix-utils/promise'
import { prisma } from '#app/utils/db.server.ts'
import {
	cleanupDb,
	createPassword,
	createUser,
	getUserImages,
	img,
} from '#tests/db-utils.ts'
import { insertGitHubUser } from '#tests/mocks/github.ts'

async function seed() {
	console.log('🌱 Seeding...')
	console.time(`🌱 Database has been seeded`)

	console.time('🧹 Cleaned up the database...')
	await cleanupDb(prisma)
	console.timeEnd('🧹 Cleaned up the database...')

	console.time('🔑 Created permissions...')
	const entities = ['user']
	const actions = ['create', 'read', 'update', 'delete']
	const accesses = ['own', 'any'] as const
	for (const entity of entities) {
		for (const action of actions) {
			for (const access of accesses) {
				await prisma.permission.create({ data: { entity, action, access } })
			}
		}
	}
	console.timeEnd('🔑 Created permissions...')

	console.time('👑 Created roles...')
	await prisma.role.create({
		data: {
			name: 'admin',
			permissions: {
				connect: await prisma.permission.findMany({
					select: { id: true },
					where: { access: 'any' },
				}),
			},
		},
	})
	await prisma.role.create({
		data: {
			name: 'user',
			permissions: {
				connect: await prisma.permission.findMany({
					select: { id: true },
					where: { access: 'own' },
				}),
			},
		},
	})
	console.timeEnd('👑 Created roles...')

	if (process.env.MINIMAL_SEED) {
		console.log('👍 Minimal seed complete')
		console.timeEnd(`🌱 Database has been seeded`)
		return
	}

	const totalUsers = 5
	console.time(`👤 Created ${totalUsers} users...`)
	const userImages = await getUserImages()

	for (let index = 0; index < totalUsers; index++) {
		const userData = createUser()
		await prisma.user
			.create({
				select: { id: true },
				data: {
					...userData,
					password: { create: createPassword(userData.username) },
					image: { create: userImages[index % userImages.length] },
					roles: { connect: { name: 'user' } },
				},
			})
			.catch(e => {
				console.error('Error creating a user:', e)
				return null
			})
	}
	console.timeEnd(`👤 Created ${totalUsers} users...`)

	console.time(`🥷 Creating admin user "woch"`)
	const wochImages = await promiseHash({
		wochUser: img({ filepath: './tests/fixtures/images/user/woch.png' }),
	})

	const githubUser = await insertGitHubUser('MOCK_CODE_GITHUB_WOCH')

	await prisma.user.create({
		select: { id: true },
		data: {
			email: 'woch@wochdev.com',
			username: 'woch',
			name: 'Woch',
			image: { create: wochImages.wochUser },
			password: { create: createPassword('wochlife') },
			connections: {
				create: { providerName: 'github', providerId: githubUser.profile.id },
			},
			roles: { connect: [{ name: 'admin' }, { name: 'user' }] },
		},
	})
	console.timeEnd(`🥷 Created admin user "woch"`)

	console.timeEnd(`🥷 Creating week days`)
	const daysToCreate = [
		'monday',
		'tuesday',
		'wednesday',
		'thursday',
		'friday',
		'saturday',
		'sunday',
	]

	for (const day of daysToCreate) {
		await prisma.weekDay.create({
			data: {
				id: day.slice(0, 2), // will get first 2 letters from day name for ids ("mo", "tu", ...)
				dayInAWeek: day,
			},
		})
	}
	console.timeEnd(`🥷 Created week days`)

	console.timeEnd(`🥷 Creating week parts (3)`)
	const weekPartsToCreate = [
		'1',
		'2',
		'3',
	]

	for (const weekPart of weekPartsToCreate) {
		await prisma.weekDivision.create({
			data: {
				id: weekPart,
			},
		})
	}
	console.timeEnd(`🥷 Created week parts (3)`)

	console.timeEnd(`🌱 Database has been seeded`)
}

seed()
	.catch(e => {
		console.error(e)
		process.exit(1)
	})
	.finally(async () => {
		await prisma.$disconnect()
	})
