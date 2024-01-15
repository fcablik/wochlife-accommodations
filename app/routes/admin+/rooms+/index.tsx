import { type DataFunctionArgs, json } from '@remix-run/node'
import { Form, Link, useLoaderData } from '@remix-run/react'
import { Spacer } from '#app/components/spacer.tsx'
import { Button } from '#app/components/ui/button.tsx'
import { Icon } from '#app/components/ui/icon.tsx'
import { prisma } from '#app/utils/db.server.ts'
import {
	generateShortString,
	useDoubleCheckInsideMap,
} from '#app/utils/misc.tsx'

export async function loader() {
	const rooms = await prisma.room.findMany({
		select: {
			id: true,
			title: true,
			url: true,
			visibility: true,
		},
	})
	if (!rooms) {
		throw new Response('not found', { status: 404 })
	}
	return json({ rooms })
}

export async function action({ request }: DataFunctionArgs) {
	const form = await request.formData()
	const roomId = form.get('roomId') as string

	if (roomId) {
		await duplicateRoom(roomId)
	} else {
		return json({ status: 'error' })
	}

	return json({ status: 'success' })
}

async function duplicateRoom(roomId: string) {
	const room = await prisma.room.findUnique({
		where: { id: roomId },
	})

	if (!room) {
		throw new Error('Room not found')
	}

	const randomString = 'duplicated-' + room.title + '-' + generateShortString(4)
	await prisma.room.create({
		data: {
			...room,
			id: undefined, //letting Prisma generate a new ID
			url: randomString,
			title: randomString,
			description: randomString,
			visibility: false,
		},
	})
}

export default function AdminRoomsIndex() {
	const data = useLoaderData<typeof loader>()
	const doubleCheckDuplicate = useDoubleCheckInsideMap()

	return (
		<div className="grid items-start gap-5 xl:grid-cols-5 3xl:grid-cols-3">
			<div className="w-full rounded-3xl bg-backgroundDashboard px-2 py-8 sm:px-3 xl:col-span-4 3xl:col-span-2 xl:px-6 2xl:px-8 2xl:py-8">
				<div className="max-sm:text-center">
				<h3 className="mb-2 text-h3 capitalize text-foreground">
						rooms list
					</h3>
					<p className="text-lg">Manage Your rooms from here. 🤗</p>
				</div>

				<Spacer size="2xs" />
				<div className="grid grid-cols-2 xl:grid-cols-3 gap-5">
					{data.rooms.map(room => (
						<div
							key={room.id}
							className="w-full text-center "
						>
							<div className="flex min-h-full flex-col justify-center rounded-lg border-2 border-foreground px-2 py-6">
								<div className="p-2 2xl:p-4">
									<div className="overflow-hidden truncate pb-4 text-highlight dark:text-highlight">
										{' '}
										/{room.url}{' '}
									</div>
									<div className="pb-4 capitalize">{room.title}</div>

									{room.visibility ? (
										<div>
											status:{' '}
											<span className="text-highlight dark:text-highlight">
												visible
											</span>
										</div>
									) : (
										<div>
											status:{' '}
											<span className="px-1 text-destructive dark:bg-foreground">
												hidden
											</span>
										</div>
									)}
								</div>

								<div className="flex flex-wrap justify-center gap-2">
									<Link to={room.id} className="text-center">
										<Button variant="secondary">Detail</Button>
									</Link>

									{room.visibility ? (
										<Link
											to={'/rooms/' + room.url}
											className="text-center"
											target="_blank"
										>
											<Button variant="outline">See Live</Button>
										</Link>
									) : null}

									<Form method="POST">
										<input type="hidden" name="roomId" value={room.id} />

										<Button
											variant={
												doubleCheckDuplicate.doubleCheckStates[room.id]
													? 'highlight-secondary'
													: 'outline'
											}
											{...doubleCheckDuplicate.getButtonProps(room.id, {
												name: 'intent',
												value: 'submit',
											})}
										>
											{doubleCheckDuplicate.doubleCheckStates[room.id] ? (
												'Are you sure?'
											) : (
												<Icon name="file-text">duplicate</Icon>
											)}
										</Button>
									</Form>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>

			<div className="w-full rounded-3xl bg-backgroundDashboard px-2 py-8 sm:px-3 xl:px-6 2xl:px-8 2xl:py-8">
				<p className="mb-4 capitalize text-lg font-semibold sm:mb-2">
					rooms options
				</p>

				<div className="mt-4 flex max-xl:flex-wrap xl:max-3xl:flex-col 3xl:flex-wrap gap-3 w-full">
					<Link to="/admin/rooms/createnew" className=''>
						<Button size="lg" variant="highlight" className='capitalize w-full'>
							create new
						</Button>
					</Link>

					<Link to="/rooms/" target="_blank" className=''>
						<Button size="lg" variant="highlight" className='capitalize w-full'>
							live room list
						</Button>
					</Link>

					<div className='w-full my-3 border-b border-highlight/20' />

					<Link to="pricing" className=''>
						<Button size="lg" variant="highlight" className='capitalize w-full'>
							pricing
						</Button>
					</Link>

					<Link to="facility" className=''>
						<Button size="lg" variant="highlight" className='capitalize w-full'>
							facilities
						</Button>
					</Link>

					<Link to="gallery" className=''>
						<Button size="lg" variant="highlight" className='capitalize w-full'>
							galleries
						</Button>
					</Link>

					<Link to="packagedeals" className=''>
						<Button size="lg" variant="highlight" className='capitalize w-full'>
							package deals
						</Button>
					</Link>

					<Link to="discounts" className=''>
						<Button size="lg" variant="highlight" className='capitalize w-full'>
							discounts
						</Button>
					</Link>
				</div>
			</div>
		</div>
	)
}
