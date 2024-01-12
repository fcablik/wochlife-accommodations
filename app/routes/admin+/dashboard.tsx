import { json } from '@remix-run/node'
import { Link, useLoaderData } from '@remix-run/react'
import { addDays, format } from 'date-fns'
import { z } from 'zod'
import { GeneralErrorBoundary } from '#app/components/error-boundary.tsx'
import { Spacer } from '#app/components/spacer.tsx'
import { Button } from '#app/components/ui/button.tsx'
import { prisma } from '#app/utils/db.server.ts'
import { cn } from '#app/utils/misc.tsx'
import { useUser } from '#app/utils/user.ts'

const CheckInsResultSchema = z.object({
	reservationDateFrom: z.string(),
})
const CheckOutsResultSchema = z.object({
	reservationDateTo: z.string(),
})
const TodaysNewReservationsResultSchema = z.object({
	createdAtString: z.string(),
})

const NewReservationsTodaySchema = z.array(TodaysNewReservationsResultSchema)
const CheckInsResultsSchema = z.array(CheckInsResultSchema)
const CheckOutsResultsSchema = z.array(CheckOutsResultSchema)

export async function loader() {
	// Sidebar Info Section queries
	const newReservationToday = format(new Date(), 'yyyy/MM/dd')
	const checkInOutToday = format(new Date(), 'yyyy/MM/dd')
	const checkInOutTomorrow = format(addDays(new Date(), 1), 'yyyy/MM/dd')

	// new-TODAY
	const rawNewReservationsToday = await prisma.$queryRaw`
		SELECT Reservation.createdAtString
		FROM Reservation
		WHERE Reservation.createdAtString LIKE ${newReservationToday}
		LIMIT 100
	`
	const resultNewReservationsToday = NewReservationsTodaySchema.safeParse(
		rawNewReservationsToday,
	)

	// TODAYs
	const rawCheckInsToday = await prisma.$queryRaw`
		SELECT Reservation.reservationDateFrom
		FROM Reservation
		WHERE Reservation.reservationDateFrom LIKE ${checkInOutToday}
		LIMIT 100
	`
	const resultCheckInsToday = CheckInsResultsSchema.safeParse(rawCheckInsToday)

	const rawCheckOutsToday = await prisma.$queryRaw`
		SELECT Reservation.reservationDateTo
		FROM Reservation
		WHERE Reservation.reservationDateTo LIKE ${checkInOutToday}
		LIMIT 100
	`
	const resultCheckOutsToday =
		CheckOutsResultsSchema.safeParse(rawCheckOutsToday)

	// TOMORROWs
	const rawCheckInsTomorrow = await prisma.$queryRaw`
		SELECT Reservation.reservationDateFrom
		FROM Reservation
		WHERE Reservation.reservationDateFrom LIKE ${checkInOutTomorrow}
		LIMIT 100
	`
	const resultCheckInsTomorrow =
		CheckInsResultsSchema.safeParse(rawCheckInsTomorrow)

	const rawCheckOutsTomorrow = await prisma.$queryRaw`
		SELECT Reservation.reservationDateTo
		FROM Reservation
		WHERE Reservation.reservationDateTo LIKE ${checkInOutTomorrow}
		LIMIT 100
	`
	const resultCheckOutsTomorrow =
		CheckOutsResultsSchema.safeParse(rawCheckOutsTomorrow)

	if (!resultNewReservationsToday.success) {
		return json(
			{
				status: 'error',
				error: resultNewReservationsToday.error.message,
			} as const,
			{
				status: 400,
			},
		)
	}

	if (!resultCheckInsToday.success) {
		return json(
			{ status: 'error', error: resultCheckInsToday.error.message } as const,
			{
				status: 400,
			},
		)
	}
	if (!resultCheckOutsToday.success) {
		return json(
			{ status: 'error', error: resultCheckOutsToday.error.message } as const,
			{
				status: 400,
			},
		)
	}

	if (!resultCheckInsTomorrow.success) {
		return json(
			{ status: 'error', error: resultCheckInsTomorrow.error.message } as const,
			{
				status: 400,
			},
		)
	}
	if (!resultCheckOutsTomorrow.success) {
		return json(
			{
				status: 'error',
				error: resultCheckOutsTomorrow.error.message,
			} as const,
			{
				status: 400,
			},
		)
	}

	return json({
		status: 'idle',
		newReservationsToday: resultNewReservationsToday.data,
		checkInsToday: resultCheckInsToday.data,
		checkOutsToday: resultCheckOutsToday.data,
		checkInsTomorrow: resultCheckInsTomorrow.data,
		checkOutsTomorrow: resultCheckOutsTomorrow.data,
	} as const)
}

export default function AdminDashboard() {
    const user = useUser()

	const sidebarBoxBaseClasslist =
		'flex flex-col items-center rounded-2xl bg-backgroundDashboard'
	const sidebarBoxClasslist = sidebarBoxBaseClasslist + ' px-2 2xl:px-4 py-4'
	const sidebarCheckInsOutsBoxClassList =
		'w-full text-center rounded-xl bg-highlight py-3 text-background'

	const data = useLoaderData<typeof loader>()
	if (data.status === 'error') {
		console.error(data.error)
	}

	let newReservationsDataToday
	let checkInsDataToday
	let checkOutsDataToday
	let checkInsDataTomorrow
	let checkOutsDataTomorrow

	if (data.status === 'idle') {
		if (data.newReservationsToday.length) {
			const mappedNewReservationsTodayData = data.newReservationsToday.map(
				reservation =>
					format(new Date(reservation.createdAtString), 'yyyy/M/d'),
			)
			newReservationsDataToday = mappedNewReservationsTodayData.length ?? null
		}
		if (data.checkInsToday.length) {
			const mappedCheckInsTodayData = data.checkInsToday.map(reservation =>
				format(new Date(reservation.reservationDateFrom), 'yyyy/M/d'),
			)
			checkInsDataToday = mappedCheckInsTodayData.length ?? null
		}
		if (data.checkOutsToday.length) {
			const mappedCheckOutsTodayData = data.checkOutsToday.map(reservation =>
				format(new Date(reservation.reservationDateTo), 'yyyy/M/d'),
			)
			checkOutsDataToday = mappedCheckOutsTodayData.length ?? null
		}

		if (data.checkInsTomorrow.length) {
			const mappedCheckInsTomorrowData = data.checkInsTomorrow.map(
				reservation =>
					format(new Date(reservation.reservationDateFrom), 'yyyy/M/d'),
			)
			checkInsDataTomorrow = mappedCheckInsTomorrowData.length ?? null
		}
		if (data.checkOutsTomorrow.length) {
			const mappedCheckOutsTomorrowData = data.checkOutsTomorrow.map(
				reservation =>
					format(new Date(reservation.reservationDateTo), 'yyyy/M/d'),
			)
			checkOutsDataTomorrow = mappedCheckOutsTomorrowData.length ?? null
		}
	}

	return (
		<div className="container mx-auto flex flex-col justify-center pb-32 pt-20 text-center">
			<p className="text-2xl">
				Welcome back <strong>{user.username}</strong>!
			</p>

			<Spacer size="3xs" />
			<div className="flex justify-center gap-5 max-sm:flex-wrap">
				<Link to="/admin/reservations">
					<Button variant="secondary">reservations</Button>
				</Link>

				<Link to="/admin/rooms">
					<Button variant="secondary">rooms</Button>
				</Link>

				<Link to="/admin/pages">
					<Button variant="secondary">pages</Button>
				</Link>

				<Link to="/admin/users">
					<Button variant="secondary">users</Button>
				</Link>

				{/* <Link to='cache'>
                    <Button variant='secondary'>cache</Button>
                </Link> */}
			</div>

			<div className="mx-auto">
				{newReservationsDataToday ? (
					<Link
						className={cn(
							'mt-4 capitalize 2xl:mt-8',
							sidebarBoxClasslist,
							'hover:bg-highlight hover:text-background',
						)}
						to="/admin/reservations?search=new-today"
					>
						{newReservationsDataToday ?? '0'} new reservations
						<div className="text-xs">(today)</div>
					</Link>
				) : (
					<div className={cn('mt-4 capitalize 2xl:mt-8', sidebarBoxClasslist)}>
						0 new reservations
						<div className="text-xs">(today)</div>
					</div>
				)}

				<div
					className={cn('mt-4 gap-2 capitalize 2xl:mt-8', sidebarBoxClasslist)}
				>
					check-ins
					{checkInsDataToday ? (
						<Link
							className={cn(
								sidebarCheckInsOutsBoxClassList,
								'hover:bg-highlight',
							)}
							to="/admin/reservations?search=todays-check-ins"
						>
							Today: {checkInsDataToday ?? '0'}
						</Link>
					) : (
						<div className={sidebarCheckInsOutsBoxClassList}>Today: 0</div>
					)}
					{checkInsDataTomorrow ? (
						<Link
							className={cn(
								sidebarCheckInsOutsBoxClassList,
								'hover:bg-highlight',
							)}
							to="/admin/reservations?search=tomorrows-check-ins"
						>
							Tomorrow: {checkInsDataTomorrow ?? '0'}
						</Link>
					) : (
						<div className={sidebarCheckInsOutsBoxClassList}>Tomorrow: 0</div>
					)}
				</div>

				<div
					className={cn('mt-4 gap-2 capitalize 2xl:mt-8', sidebarBoxClasslist)}
				>
					check-outs
					{checkOutsDataToday ? (
						<Link
							className={cn(
								sidebarCheckInsOutsBoxClassList,
								'hover:bg-highlight',
							)}
							to="/admin/reservations?search=todays-check-outs"
						>
							Today: {checkOutsDataToday ?? '0'}
						</Link>
					) : (
						<div className={sidebarCheckInsOutsBoxClassList}>Today: 0</div>
					)}
					{checkOutsDataTomorrow ? (
						<Link
							className={cn(
								sidebarCheckInsOutsBoxClassList,
								'hover:bg-highlight',
							)}
							to="/admin/reservations?search=tomorrows-check-outs"
						>
							Tomorrow: {checkOutsDataTomorrow ?? '0'}
						</Link>
					) : (
						<div className={sidebarCheckInsOutsBoxClassList}>Tomorrow: 0</div>
					)}
				</div>
			</div>
		</div>
	)
}

export function ErrorBoundary() {
	return <GeneralErrorBoundary />
}
