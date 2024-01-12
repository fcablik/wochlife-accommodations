import { json, type DataFunctionArgs, type MetaFunction } from '@remix-run/node'
import { Link, Outlet, useLoaderData } from '@remix-run/react'
// import { format } from 'date-fns'
import { format } from 'date-fns'
import {
	frontendRoutesSpacingFromHeaderAndFooter,
	roomsContentContainerClassList,
} from '#app/components/classlists.tsx'
import { GeneralErrorBoundary } from '#app/components/error-boundary.tsx'
import {
	GallerySlider,
	RoomPreviewImagesSlider,
} from '#app/components/image-sliders.tsx'
import { ReadOnlyReservationCalendar } from '#app/components/reservation-handlers-extensions.tsx'
import { useRedirectWithScrollToTop } from '#app/components/reservation-modal-animation.tsx'
import { Spacer } from '#app/components/spacer.tsx'
import { Button } from '#app/components/ui/button.tsx'
import { Icon } from '#app/components/ui/icon.tsx'
import { prisma } from '#app/utils/db.server.ts'
import { cn, getRoomsGalleryImgSrc } from '#app/utils/misc.tsx'
import { useOptionalUser } from '#app/utils/user.ts'
import { OffersAndServicesLoader } from '../resources+/_offers-and-services-loader.tsx'

export async function loader({ params }: DataFunctionArgs) {
	const now = new Date()
	const currentDate = format(now, 'yyyy/MM/dd')
	const dayName = format(now, 'EEEE').toLowerCase()

	const room = await prisma.room.findUnique({
		where: { url: params.url },
		select: {
			id: true,
			url: true,
			price1: true,
			// additionalNightPrice1: true,
			maxGuests: true,
			title: true,
			description: true,
			seo: true,
			visibility: true,
			reservations: {
				where: {
					status: 'accepted',
				},
				select: {
					reservationDateFrom: true,
					reservationDateTo: true,
				},
			},
			roomFacility: {
				select: {
					id: true,
					name: true,
					iconName: true,
				},
			},
			roomGalleryImages: {
				select: {
					id: true,
					altText: true,
				},
			},
			roomPreviewImages: {
				select: {
					id: true,
					altText: true,
				},
			},
		},
	})

	if (!room || !room.visibility) {
		throw new Response('not found', { status: 404 })
	}

	const weekPart = await prisma.weekDay.findUnique({
		where: {
			dayInAWeek: dayName,
		},
		select: {
			divisionAssignmentId: true,
		},
	})

	const roomCurrentSeasonalPrices = await prisma.room.findUnique({
		where: { id: room.id },
		select: {
			id: true,
			seasons: {
				select: {
					seasonalRoomPrices: {
						// orderBy: {
						// 	createdAt: 'desc',
						// },
						where: {
							roomId: params.id,
							season: {
								dateFrom: {
									lte: currentDate, // currentDate should be after or equal to dateFrom
								},
								dateTo: {
									gte: currentDate, // currentDate should be before or equal to dateTo
								},
							},
							weekDivisionId: weekPart?.divisionAssignmentId ?? '1',
						},
						take: 1,
						select: {
							nightPrice: true,
							// additionalNightPrice: true,
						},
					},
				},
			},
		},
	})

	return json({
		room,
		roomCurrentSeasonalPrices,
	})
}

export default function RoomUrlRoute() {
	const data = useLoaderData<typeof loader>()
	const isUserLoggedIn = useOptionalUser()
	const room = data.room
	const roomGallery = room.roomGalleryImages
	const previewImages = room.roomPreviewImages
	const content = room.description ? room.description : ''
	const roomDescriptionHtml = content ? { __html: content } : null

	const baseRoomNightPrice =
		data.roomCurrentSeasonalPrices?.seasons
			.map(season => season.seasonalRoomPrices)
			.find(innerArray =>
				innerArray.some(item => item?.nightPrice !== undefined),
			)
			?.find(item => item?.nightPrice !== undefined)?.nightPrice ??
		data.room.price1

	const currency = '€' //#later dynamic

	let roomPrice
	if (currency === '€') {
		roomPrice = currency + baseRoomNightPrice
	} else if (currency === 'czk') {
		roomPrice = baseRoomNightPrice + ' ' + currency
	}

	const navigateAndScroll = useRedirectWithScrollToTop()
	const openReservationFormRoute = () => {
		navigateAndScroll('reservation')
	}

	return (
		<div className={frontendRoutesSpacingFromHeaderAndFooter}>
			{previewImages.length ? (
				<div className="relative z-1000 h-[50vh] max-h-[550px] min-h-[350px]">
					{previewImages.length > 1 ? (
						<RoomPreviewImagesSlider
							images={previewImages}
							roomSeo={room.seo ?? ''}
							roomTitle={room.title}
						/>
					) : (
						<>
							<img
								className="pointer-events-none h-full w-full rounded-2xl bg-cover bg-center object-cover"
								src={getRoomsGalleryImgSrc(previewImages[0].id)}
								alt={previewImages[0].altText ?? room.seo ?? room.title}
							/>
							<div className="absolute inset-0 rounded-2xl bg-gradient-to-l from-transparent to-black opacity-60"></div>
						</>
					)}

					<div className="absolute left-10 top-1/2 z-999 -translate-y-1/2 text-background">
						<h1 className="text-h3 lg:text-h1">Room {room.title}</h1>
						<p className="mt-1 text-xl">room.shortDescription</p>
						{isUserLoggedIn ? (
							<div className="mt-4">
								<Link to={'/admin/rooms/' + room.id}>
									<Button variant="secondary" className="text-xs" size="sm">
										edit room
									</Button>
								</Link>
							</div>
						) : null}
					</div>
				</div>
			) : null}

			<div
				className={cn(
					roomsContentContainerClassList,
					'mb-16 mt-16 md:relative md:mb-20 lg:mb-24',
				)}
			>
				<div className="z-1000 max-lg:w-full lg:absolute lg:right-10 lg:top-[-24em]">
					<ReadOnlyReservationCalendar roomReservations={room.reservations} />
					<Button
						variant="highlight-secondary"
						className="mx-auto mt-4 flex capitalize"
						onClick={openReservationFormRoute}
					>
						<Icon iconAfter={true} name="arrow-right">
							Reservation
						</Icon>
					</Button>
				</div>

				<div>
					<h3 className="text mb-2 text-2xl font-bold">Facility</h3>
					<div className="flex flex-wrap gap-5">
						{room.roomFacility.length ? (
							<div className="flex w-full max-w-[180px] flex-col">
								{room.roomFacility.map((facility, i) => (
									<div key={i} className="flex justify-between">
										<div className="w-1/3">{facility.name}</div>
										<div className="w-1/3">
											{facility.iconName ? (
												<Icon name={facility.iconName} />
											) : (
												'no icon'
											)}
										</div>
									</div>
								))}
							</div>
						) : (
							'Room has no selected facilities, Contact us for more informations.'
						)}
					</div>
				</div>

				<div className="mt-16 flex items-start justify-between max-md:flex-col">
					{roomDescriptionHtml ? (
						<div className="max-md:order-2 md:max-w-[80%] xl:max-w-[60%]">
							<h3 className="text mb-2 text-2xl font-bold">Room details</h3>
							<span
								className="pb-2"
								dangerouslySetInnerHTML={roomDescriptionHtml}
							/>
						</div>
					) : null}

					<div className="flex flex-col items-center">
						from
						<div className="flex flex-col items-center rounded-xl bg-highlight/20 p-3 max-md:order-1 max-md:mb-12">
							<div className="text-xl font-bold text-highlight">
								{roomPrice}
							</div>
							<div className="text-sm">/ night</div>
						</div>
					</div>
				</div>

				{roomGallery.length ? (
					<>
						<h3 className="text mb-2 text-center text-2xl font-bold">
							Gallery
						</h3>

						{roomGallery.length > 1 ? (
							<GallerySlider
								images={roomGallery}
								roomSeo={room.seo ?? ''}
								roomTitle={room.title}
							/>
						) : (
							<img
								className="pointer-events-none max-h-[300px] w-full object-contain"
								src={getRoomsGalleryImgSrc(roomGallery[0].id)}
								alt={roomGallery[0].altText ?? room.seo ?? room.title}
							/>
						)}
					</>
				) : null}
			</div>

			<OffersAndServicesLoader />
			<Outlet />
		</div>
	)
}

export function ErrorBoundary() {
	return (
		<GeneralErrorBoundary
			statusHandlers={{
				404: ({ params }) => (
					<div className="container mx-auto flex h-5/6 flex-col justify-center pb-32 pt-20 text-center">
						<h3 className="text-h3">
							No room with the room url "{params.url}" exists
						</h3>

						<Spacer size="sm" />

						<Link to="/">
							<Button variant="default" className="text-xs" size="sm">
								go home
							</Button>
						</Link>
					</div>
				),
			}}
		/>
	)
}

export const meta: MetaFunction<typeof loader> = ({ data, params }) => {
	const displayName = data?.room.title ?? params.url
	const seoContent = data?.room.seo ?? params.title

	return [
		{ title: `${displayName} | wochdev` },
		{
			name: 'description',
			content: seoContent,
		},
	]
}
