import { json, redirect, type DataFunctionArgs } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { addDays, format } from 'date-fns'
import { z } from 'zod'
import { GeneralErrorBoundary } from '#app/components/error-boundary.tsx'
import { ErrorList } from '#app/components/forms.tsx'
import { FiltersWithSearchAndCalendar } from '#app/components/reservation-filters.tsx'
import { ReservationAccordion } from '#app/routes/resources+/__reservation-accordion.tsx'
import { prisma } from '#app/utils/db.server.ts'
import { cn, useDelayedIsPending } from '#app/utils/misc.tsx'

const ReservationSearchResultSchema = z.object({
	id: z.string(),
	status: z.string(),
	reservationNumber: z.string(),
	numberOfGuests: z.number(),
	numberOfNights: z.number(),
	name: z.string(),
	email: z.string(),
	roomId: z.string(),
	roomTitle: z.string().nullable(),
	reservationDateFrom: z.string(),
	reservationDateTo: z.string(),
	totalPrice: z.number(),
	message: z
		.string()
		.nullish()
		.transform(x => x ?? undefined),
	createdAt: z.date(),
})

const ReservationSearchResultsSchema = z.array(ReservationSearchResultSchema)

export async function loader({ request }: DataFunctionArgs) {
	const searchTerm = new URL(request.url).searchParams.get('search')
	if (searchTerm === '') {
		return redirect('/admin/reservations')
	}
	const like = `%${searchTerm ?? ''}%`

	let today = ''
	let tomorrow = ''
	if (searchTerm === 'todays-check-ins' || 'todays-check-outs' || 'new-today') {
		today = format(new Date(), 'yyyy/MM/dd')
	}
	if (searchTerm === 'tomorrows-check-ins' || 'tomorrows-check-outs') {
		tomorrow = format(addDays(new Date(), 1), 'yyyy/MM/dd')
	}

	let certainDateSearch = ''
	const certainDateSearchString = 'check-in-out-dates-'
	if (searchTerm && searchTerm.includes(certainDateSearchString)) {
		const dateOnly = searchTerm.split(certainDateSearchString)
		certainDateSearch = dateOnly[1]
	}

	const limit = 50 //#later make dynamic load or some kind of pagination/continue load
	const rawReservations = await prisma.$queryRaw`
		SELECT Reservation.id, Reservation.status, Reservation.reservationNumber, Reservation.numberOfGuests, Reservation.numberOfNights, Reservation.name, Reservation.email, Reservation.message, Reservation.roomId, Reservation.reservationDateFrom, Reservation.reservationDateTo, Reservation.totalPrice, Reservation.createdAt, Reservation.createdAtString, Room.title AS roomTitle
		FROM Reservation
		LEFT JOIN Room ON Reservation.roomId = Room.id
		WHERE Reservation.reservationNumber LIKE ${like}
		OR Reservation.name LIKE ${like}
		OR Reservation.email LIKE ${like}
		OR Reservation.message LIKE ${like}
		OR (
			${searchTerm === 'todays-check-ins'} 
			AND Reservation.reservationDateFrom LIKE ${today}
		)
		OR (
			${searchTerm === 'todays-check-outs'}
			AND Reservation.reservationDateTo LIKE ${today}
		)
		OR (
			${searchTerm === 'tomorrows-check-ins'}
			AND Reservation.reservationDateFrom LIKE ${tomorrow}
		)
		OR (
			${searchTerm === 'tomorrows-check-outs'}
			AND Reservation.reservationDateTo LIKE ${tomorrow}
		)
		OR (
			${searchTerm === 'new-today'}
			AND Reservation.createdAtString LIKE ${today}
		)
		OR (
			${searchTerm?.includes(certainDateSearchString)}
			AND Reservation.reservationDateFrom LIKE ${certainDateSearch}
		)
		OR (
			${searchTerm?.includes(certainDateSearchString)}
			AND Reservation.reservationDateTo LIKE ${certainDateSearch}
		)
		ORDER BY (Reservation.createdAt) DESC
		LIMIT ${limit}
	`

	const result = ReservationSearchResultsSchema.safeParse(rawReservations)
	if (!result.success) {
		return json({ status: 'error', error: result.error.message } as const, {
			status: 400,
		})
	}
	return json({ status: 'idle', reservations: result.data } as const)
}

export default function ReservationsRoute() {
	const data = useLoaderData<typeof loader>()
	const isPending = useDelayedIsPending({
		formMethod: 'GET',
		formAction: '/admin/reservations',
	})

	if (data.status === 'error') {
		console.error(data.error)
	}

	return (
		<div className="grid xl:grid-cols-3 gap-5">
			<div className="w-full rounded-3xl bg-backgroundDashboard px-2 py-8 sm:px-3 xl:col-span-2 xl:px-6 2xl:px-8 2xl:py-8">
				<div className="mb-12 max-sm:text-center">
					<h3 className="mb-2 text-h3 capitalize text-foreground">
						reservations overview
					</h3>
					<p className="text-lg">
						View or change all Your property’s reservations at one place.
					</p>
				</div>

				<div>
					{data.status === 'idle' ? (
						data.reservations.length ? (
							<div
								className={cn(
									'flex w-full flex-wrap items-center justify-center gap-4 delay-200',
									{ 'opacity-50': isPending },
								)}
							>
								{data.reservations.map(reservation => (
									<div key={reservation.id} className="relative w-full">
										{format(new Date(reservation.createdAt), 'yyyy/MM/dd') ===
										format(new Date(), 'yyyy/MM/dd') ? (
											<div className="absolute left-[-1em] top-[-1em] rotate-[-20deg] rounded-sm bg-foreground px-2 text-background xl:top-[-.5em] xl:px-4 xl:py-1 2xl:top-[-.2em]">
												new
											</div>
										) : (
											reservation.status === 'cancelled' && (
												<>
													<div className="absolute left-[-1em] top-[-1em] rotate-[-20deg] rounded-sm bg-destructive px-2 text-background xl:top-[-.5em] xl:px-4 xl:py-1 2xl:top-[-.2em]">
														cancelled
													</div>
												</>
											)
										)}

										<ReservationAccordion
											roomId={reservation.roomId}
											roomTitle={reservation.roomTitle ?? reservation.roomId}
											reservationStatus={reservation.status}
											reservationNumber={reservation.reservationNumber}
											guestName={reservation.name}
											checkIn={reservation.reservationDateFrom}
											checkOut={reservation.reservationDateTo}
											guestEmail={reservation.email}
											guestMessage={reservation.message ?? ''}
											reservationId={reservation.id}
											numberOfGuests={reservation.numberOfGuests}
											numberOfNights={reservation.numberOfNights}
											totalPrice={reservation.totalPrice}
											createdAt={new Date(reservation.createdAt)}
										/>
									</div>
								))}
							</div>
						) : (
							<p>No reservations found</p>
						)
					) : data.status === 'error' ? (
						<ErrorList errors={['There was an error parsing the results']} />
					) : null}
				</div>
			</div>

			<div className="w-full rounded-3xl bg-backgroundDashboard px-2 py-8 sm:px-3 xl:px-6 2xl:px-8 2xl:py-8">
				<div className="w-full">
					<FiltersWithSearchAndCalendar
						actionUrl="admin/reservations"
						status={data.status}
						autoSubmit
					/>
				</div>
			</div>
		</div>
	)
}

export function ErrorBoundary() {
	return <GeneralErrorBoundary />
}
