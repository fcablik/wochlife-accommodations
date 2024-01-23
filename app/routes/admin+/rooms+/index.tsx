import { type DataFunctionArgs, json } from '@remix-run/node'
import { Form, Link, useLoaderData } from '@remix-run/react'
import { useState } from 'react'
import { Spacer } from '#app/components/spacer.tsx'
import { Button } from '#app/components/ui/button.tsx'
import { Icon } from '#app/components/ui/icon.tsx'
import {
	MobileModalCaretOpener,
	ModalCloserIcon,
} from '#app/components/ui/modal-helpers.tsx'
import { prisma } from '#app/utils/db.server.ts'
import {
	cn,
	generateShortString,
	getRoomsGalleryImgSrc,
	useDoubleCheckInsideMap,
} from '#app/utils/misc.tsx'

export async function loader() {
	const rooms = await prisma.room.findMany({
		select: {
			id: true,
			title: true,
			url: true,
			visibility: true,
			roomPreviewImages: {
				take: 1,
				select: {
					id: true,
					altText: true,
				},
			},
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

	const [isMobExtraMenuToggled, setMobExtraMenuToggled] = useState(false)
	const handleToggle = () => {
		setMobExtraMenuToggled(prev => !prev)
	}

	return (
		<div className="grid items-start gap-5 xl:grid-cols-5 3xl:grid-cols-3">
			<div className="w-full rounded-3xl bg-backgroundDashboard px-2 py-8 sm:px-3 xl:col-span-4 xl:px-6 2xl:px-8 2xl:py-8 3xl:col-span-2">
				<div className="max-sm:text-center">
					<h3 className="mb-2 text-h3 capitalize text-foreground">
						rooms list
					</h3>
					<p className="text-lg">Manage Your rooms from here. 🤗</p>
				</div>

				<Spacer size="2xs" />
				<div className="grid grid-cols-2 gap-5 md:grid-cols-3">
					{data.rooms.map(room => (
						<div key={room.id} className="w-full text-center ">
							<div className="relative flex min-h-full flex-col justify-between rounded-lg border-2 border-foreground/20 pb-6">
								<div className="relative h-[100px] xl:h-[145px]">
									<>
										{room.roomPreviewImages.length ? (
											<img
												src={getRoomsGalleryImgSrc(
													room.roomPreviewImages[0]?.id,
												)}
												alt={room.roomPreviewImages[0]?.altText ?? ''}
												className="pointer-events-none h-full w-full rounded-t-lg bg-cover bg-center object-cover"
											/>
										) : (
											<img
												src="/img/room-preview-img-placeholder.png"
												alt=""
												className="pointer-events-none h-full w-full rounded-t-lg bg-cover bg-center object-cover"
											/>
										)}

										<div className="absolute inset-0 rounded-t-lg bg-gradient-to-l from-transparent to-black opacity-60"></div>
									</>
								</div>

								<div className="p-2 2xl:px-4 2xl:pt-4">
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

									{room.visibility && (
										<Link
											to={'/rooms/' + room.url}
											className="text-center"
											target="_blank"
										>
											<Button variant="outline">See Live</Button>
										</Link>
									)}

									<Form method="POST" className="max-lg:hidden">
										<input type="hidden" name="roomId" value={room.id} />

										<Button
											className={
												doubleCheckDuplicate.doubleCheckStates[room.id]
													? 'absolute bottom-[-1.25rem] right-0'
													: ''
											}
											variant={
												doubleCheckDuplicate.doubleCheckStates[room.id]
													? 'secondary'
													: 'outline'
											}
											{...doubleCheckDuplicate.getButtonProps(room.id, {
												name: 'intent',
												value: 'submit',
											})}
										>
											{doubleCheckDuplicate.doubleCheckStates[room.id] ? (
												'Click Again To Duplicate Room'
											) : (
												<Icon name="copy" />
											)}
										</Button>
									</Form>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>

			<MobileModalCaretOpener
				isMobExtraMenuToggled={isMobExtraMenuToggled}
				handleToggle={handleToggle}
				classList="xl:hidden"
				triggerTitle="options"
			/>

			<div
				className={cn(
					isMobExtraMenuToggled
						? 'top-4 z-4001 max-xl:visible md:max-xl:right-4 md:max-lg:max-w-3/5 lg:max-xl:max-w-2/5'
						: 'max-xl:hidden',
					'rounded-3xl bg-backgroundDashboard px-2 py-8 max-xl:fixed sm:px-3 xl:w-full xl:px-6 2xl:px-8 2xl:py-8',
				)}
			>
				{isMobExtraMenuToggled && (
					<ModalCloserIcon handleToggle={handleToggle} />
				)}

				<p className="mb-4 text-lg font-semibold capitalize sm:mb-2">
					rooms options
				</p>

				<div className="mt-4 flex w-full gap-3 max-xl:flex-wrap xl:max-3xl:flex-col 3xl:flex-wrap">
					<Link to="/admin/rooms/createnew" className="">
						<Button size="lg" variant="highlight" className="w-full capitalize">
							create new
						</Button>
					</Link>

					<Link to="/rooms/" target="_blank">
						<Button size="lg" variant="highlight" className="w-full capitalize px-1">
							live room list
						</Button>
					</Link>

					<div className="my-3 w-full border-b border-highlight/20" />

					<p className="mb-1 w-full text-lg font-semibold capitalize">
						manage extras
					</p>

					<Link to="pricing" className="">
						<Button size="lg" variant="highlight" className="w-full capitalize">
							pricing
						</Button>
					</Link>

					<Link to="facility" className="">
						<Button size="lg" variant="highlight" className="w-full capitalize">
							facilities
						</Button>
					</Link>

					<Link to="gallery" className="">
						<Button size="lg" variant="highlight" className="w-full capitalize">
							galleries
						</Button>
					</Link>

					<Link to="packagedeals" className="">
						<Button size="lg" variant="highlight" className="w-full capitalize">
							package deals
						</Button>
					</Link>

					<Link to="discounts" className="">
						<Button size="lg" variant="highlight" className="w-full capitalize">
							discounts
						</Button>
					</Link>
				</div>
			</div>
		</div>
	)
}
