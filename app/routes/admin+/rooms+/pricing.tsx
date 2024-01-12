import { json } from '@remix-run/node'
import { Link, Outlet, useLoaderData } from '@remix-run/react'
import { format } from 'date-fns'
import { useState } from 'react'
import { GeneralErrorBoundary } from '#app/components/error-boundary.tsx'
import { useRedirectWithScrollToTop } from '#app/components/reservation-modal-animation.tsx'
import { Button } from '#app/components/ui/button.tsx'
import { Icon } from '#app/components/ui/icon.tsx'
import { prisma } from '#app/utils/db.server.ts'

export async function loader() {
	const seasonLists = await prisma.seasonList.findMany({
		select: {
			id: true,
			name: true,
			dateFrom: true,
			dateTo: true,
			rooms: {
				select: {
					id: true,
					title: true,
					seasonalPrices: {
						select: {
							id: true,
							nightPrice: true,
							seasonId: true,
							weekDivisionId: true,
							additionalNightPrice: true,
						},
					},
				},
			},
		},
	})
	const rooms = await prisma.room.findMany({
		select: {
			id: true,
			title: true,
			url: true,
			price1: true,
			additionalNightPrice1: true,
			price2: true,
			additionalNightPrice2: true,
			price3: true,
			additionalNightPrice3: true,
		},
	})
	if (!seasonLists || !rooms) {
		throw new Response('not found', { status: 404 })
	}

	const weekDivision = await prisma.weekDivision.findMany({
		select: {
			id: true,
			partOfTheWeek: {
				select: {
					id: true,
					dayInAWeek: true,
				},
			},
		},
	})

	return json({
		seasonLists,
		rooms,
		weekDivision,
	})
}

export default function PricingRoute() {
	const data = useLoaderData<typeof loader>()
	const reversedSeasonLists = data.seasonLists.slice().reverse()

	const navigateAndScroll = useRedirectWithScrollToTop()
	const openRoomPricesRoute = (route: string) => {
		navigateAndScroll(route)
	}

	const numberOfWeekParts: number = data.weekDivision.filter(
		division => division.partOfTheWeek.length > 0,
	).length
	const weekIsDivided = numberOfWeekParts > 0
	const [showWeekDivision, setShowWeekDivision] = useState(weekIsDivided)

	const currency = '€' //switch to dynamic #later

	return (
		<div className="relative flex flex-col items-center justify-center gap-6 py-8">
			<Outlet />

			<div className="mb-8 w-full max-sm:text-center">
				<h2 className="mb-2 text-h2 capitalize text-black dark:text-foreground">
					rooms pricings, seasons & events
				</h2>
				<p className="mb-4 text-xl">Manage Your rooms prices from here. 🤗</p>
			</div>

			{data.rooms.length ? (
				<>
					<div className="w-full md:mb-12">
						<h5 className="mb-4 text-h5 capitalize">Rooms' Default Prices</h5>

						<div className="relative flex flex-row flex-wrap">
							<div className="mb-4 w-full text-center">
								<div className="flex gap-5">
									<div className="w-24">title</div>
									<div className="w-24"></div>
									<div className="w-24">price</div>
									<div className="w-24">+bed price</div>
									<div className="w-24">url</div>
								</div>
							</div>

							{data.rooms.map(room => (
								<div key={room.id} className="mb-4 w-full text-center">
									<div className="flex justify-between rounded-lg border border-black py-4">
										<div className="flex items-center gap-5">
											<div className="w-24">{room.title}</div>
											<div className="w-24">
												<div>1. week part:</div>
												{numberOfWeekParts > 1 && <div>2. week part:</div>}
												{numberOfWeekParts > 2 && <div>3. week part:</div>}
											</div>
											<div className="w-24">
												<div>
													{currency}
													{room.price1}
												</div>
												{numberOfWeekParts > 1 && (
													<div>
														{currency}
														{room.price2}
													</div>
												)}
												{numberOfWeekParts > 2 && (
													<div>
														{currency}
														{room.price3}
													</div>
												)}
											</div>
											<div className="w-24">
												<div>
													{currency}
													{room.additionalNightPrice1}
												</div>
												{numberOfWeekParts > 1 && (
													<div>
														{currency}
														{room.additionalNightPrice2}
													</div>
												)}
												{numberOfWeekParts > 2 && (
													<div>
														{currency}
														{room.additionalNightPrice3}
													</div>
												)}
											</div>
											<div className="w-24">
												<Link
													to={`/admin/rooms/${room.id}`}
													className="underline hover:no-underline"
												>
													{room.url}
												</Link>
											</div>
										</div>

										<div className="min-w-[6rem]">
											<Button
												variant="primary"
												onClick={() =>
													openRoomPricesRoute(`defaultprices/${room.id}/edit`)
												}
											>
												edit
											</Button>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>

					<div className="w-full md:mb-12">
						<div className="mb-6">
							<h5 className="mb-4 text-h5 capitalize">Seasons List</h5>
							<Link to="season/createnew">
								<Button variant="highlight">create new</Button>
							</Link>
						</div>
						{data.seasonLists.length ? (
							<>
								<div className="mb-4 text-center text-lg capitalize underline md:mb-8">
									your seasonal pricings
								</div>
								{reversedSeasonLists.map((seasonList, i) => (
									<div
										key={i}
										className="relative mb-16 mt-3 rounded-xl border-2 border-highlight p-2 md:p-4"
									>
										<h5 className="mb-8 text-center text-h5">
											Season: {seasonList.name}
										</h5>

										<div className="mx-auto max-w-xl">
											<div className="flex items-center rounded-xl border border-highlight p-3">
												<div className="w-2/3">
													{format(new Date(seasonList.dateFrom), 'PPP')} -{' '}
													{format(new Date(seasonList.dateTo), 'PPP')}
												</div>
												<div className="w-1/3 text-right">
													<Link to={`season/${seasonList.id}/edit`}>
														<Button variant="primary">edit</Button>
													</Link>

													<Link to={`${seasonList.id}/delete`}>
														<button className="text-destructive">
															<span aria-hidden>
																<Icon name="cross-1" />
															</span>{' '}
															<span className="sr-only">delete</span>
														</button>
													</Link>
												</div>
											</div>
										</div>

										<div className="mt-16 pb-2">
											{seasonList.rooms.length ? (
												<>
													<h5 className="mb-8 text-center text-h5">
														{seasonList.name}'s room list
													</h5>
													<div className="flex items-center border-b border-background">
														<div className="w-1/3">room name</div>
														<div className="flex w-2/3">
															{weekIsDivided && (
																<div className="w-1/3">week part</div>
															)}
															<div
																className={weekIsDivided ? 'w-1/3' : 'w-1/2'}
															>
																price / night
															</div>
															<div
																className={weekIsDivided ? 'w-1/3' : 'w-1/2'}
															>
																+bed price /night
															</div>
														</div>
													</div>

													<div className="w-full">
														{seasonList.rooms.map((room, i) => (
															<div key={i} className="my-4 flex items-center">
																<div className="w-1/3">
																	<Link to={'/admin/rooms/' + room.id}>
																		<span className="underline hover:no-underline">
																			{room.title}
																		</span>
																	</Link>
																</div>

																<div className="w-2/3">
																	{weekIsDivided
																		? room.seasonalPrices
																				.filter(
																					seasonalPrice =>
																						seasonalPrice.seasonId ===
																							seasonList.id &&
																						parseInt(
																							seasonalPrice.weekDivisionId ??
																								'',
																						) <= numberOfWeekParts,
																				)
																				.map((seasonalPrice, i) => (
																					<div
																						key={i}
																						className="flex w-full items-center"
																					>
																						<div className="w-1/3">
																							{seasonalPrice.weekDivisionId}.
																							week part
																						</div>
																						<div className="w-1/3">
																							{currency}
																							{seasonalPrice.nightPrice}
																						</div>
																						<div className="w-1/3">
																							{currency}
																							{
																								seasonalPrice.additionalNightPrice
																							}
																						</div>
																					</div>
																				))
																		: room.seasonalPrices
																				.filter(
																					seasonalPrice =>
																						seasonalPrice.seasonId ===
																							seasonList.id &&
																						parseInt(
																							seasonalPrice.weekDivisionId ??
																								'',
																						) === 1,
																				)
																				.map((seasonalPrice, i) => (
																					<div
																						key={i}
																						className="flex w-full items-center"
																					>
																						<div className="w-1/2">
																							{seasonalPrice.nightPrice}
																						</div>
																						<div className="w-1/2">/</div>
																					</div>
																				))}
																</div>
															</div>
														))}
													</div>
												</>
											) : (
												<div className="flex flex-col gap-2 text-center font-bold">
													no rooms selected
													<Link to={`season/${seasonList.id}/edit`}>
														<Button className="highlight-secondary w-[10em] self-center">
															<Icon name="plus">add rooms</Icon>
														</Button>
													</Link>
												</div>
											)}
										</div>
									</div>
								))}
							</>
						) : (
							<div>no existing pricings, create your first</div>
						)}
					</div>
				</>
			) : (
				<div className="w-full">
					<p className="text-xl font-semibold capitalize">- Rooms Prices</p>
					<p className="text-xl font-semibold capitalize">
						- Seasons / Seasonal Prices
					</p>
					<p className="font-bold">! create rooms to handle their prices !</p>
				</div>
			)}
			<div className="w-full">
				<p className="text-xl font-semibold capitalize">week parts</p>
				<p className="text-md mb-4 capitalize">
					( currently: {numberOfWeekParts} )
				</p>

				<div className="flex items-center gap-5">
					{!weekIsDivided && (
						<Button
							variant="highlight-secondary"
							className="w-[10em]"
							onClick={() => setShowWeekDivision(!showWeekDivision)}
						>
							{!showWeekDivision ? 'divide' : 'hide'}
						</Button>
					)}
					<div>
						- You can divide Your week into 2-3 parts to customize prices for
						each part.
					</div>
				</div>

				{showWeekDivision &&
					data.weekDivision.map((division, i) => (
						<div
							key={i}
							className="my-2 flex w-full items-center justify-between gap-5"
						>
							<div className="w-[10%)">{division.id}. part:</div>

							{division.partOfTheWeek.length ? (
								<>
									<div className="flex w-3/4 gap-5 rounded-lg border border-highlight p-2">
										{division.partOfTheWeek.map((parts, i) => (
											<div key={i}>{parts.dayInAWeek}</div>
										))}
									</div>
									<div className="w-[15%] text-right">
										<Link to={'weekpart/' + division.id + '/edit'}>
											<Button variant="highlight-secondary">
												<Icon name="lock-open-1">edit</Icon>
											</Button>
										</Link>
									</div>
								</>
							) : (
								<>
									<div className="flex w-3/4 gap-5 p-2 text-center">
										-- not active --
									</div>

									<div className="w-[15%] text-right">
										<Link to={'weekpart/' + division.id + '/edit'}>
											<Button variant="highlight-secondary">
												<Icon name="plus">add days</Icon>
											</Button>
										</Link>
									</div>
								</>
							)}
						</div>
					))}
			</div>
		</div>
	)
}

export function ErrorBoundary() {
	return <GeneralErrorBoundary />
}
