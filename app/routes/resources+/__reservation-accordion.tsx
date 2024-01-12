import {
	Accordion,
	AccordionItem,
	AccordionHeader,
	AccordionTrigger,
	AccordionContent,
} from '@radix-ui/react-accordion'
import { Link } from '@remix-run/react'
import { format } from 'date-fns'
import { Button } from '#app/components/ui/button.tsx'
import { Icon } from '#app/components/ui/icon.tsx'
import { cn, useDoubleCheck } from '#app/utils/misc.tsx'

export function ReservationAccordion({
	roomId,
	roomTitle,
	reservationStatus,
	reservationNumber,
	guestName,
	checkIn,
	checkOut,
	numberOfGuests,
	numberOfNights,
	guestEmail,
	guestMessage,
	reservationId,
	totalPrice,
	createdAt,
}: {
	roomId: string
	roomTitle: string
	reservationStatus: string
	reservationNumber: string
	guestName: string
	checkIn: string
	checkOut: string
	numberOfGuests: number
	numberOfNights: number
	guestEmail: string
	guestMessage: string
	reservationId: string
	totalPrice: number
	createdAt: Date
}) {
	const currency = '€' //#later dynamic

	const checkInOutBoxesClassList =
		'flex w-1/2 flex-wrap flex-col justify-center bg-contain bg-center bg-no-repeat px-3 py-2 md:max-xl:flex-row md:max-xl:items-center md:max-xl:pl-4 md:max-xl:pr-10 xl:w-48'

	const doubleCheckCancell = useDoubleCheck()

	return (
		<Accordion type="single" collapsible>
			<AccordionItem
				value={'id_' + roomId}
				className="mb-4 rounded-xl bg-background max-xl:shadow-md md:max-xl:mb-16"
			>
				<AccordionHeader className="AccordionHeader flex justify-between py-3 md:max-xl:relative">
					<div className="flex w-full items-center justify-between xl:px-8">
						<div className="max-lg:px-4 lg:max-xl:px-8">
							<div className="mb-1 flex flex-nowrap md:text-lg">
								<span>Room:&nbsp;</span>
								<span className="hover:underline">
									<Link to={`/admin/rooms/${roomId}`}>{roomTitle}</Link>
									{/* &nbsp;<span> / X nights</span> */}
								</span>
							</div>

							<div className="flex items-center">
								<div className="mr-4 rounded-md px-2 py-[.15em] text-sm font-bold text-highlight shadow-reservation-number">
									{reservationNumber}
								</div>

								<div className="flex flex-wrap">
									<span>Guest's Name:&nbsp;</span>
									<span>{guestName}</span>
								</div>
							</div>
						</div>

						<div className="w-full max-xl:top-full max-lg:px-4 max-md:hidden md:max-xl:absolute lg:max-xl:px-8 xl:max-w-[450px]">
							<div className="AccordionDatesBox flex justify-center gap-5 bg-backgroundDashboard p-1 max-xl:shadow-md xl:border-2 xl:border-slate-400 xl:p-3">
								<div
									className={cn(
										checkInOutBoxesClassList,
										format(new Date(checkIn), 'yyyy/MM/dd') ===
											format(new Date(), 'yyyy/MM/dd')
											? 'bg-check-in-out-arrowed-lime md:max-xl:bg-check-in-out-arrowed-lime-sm'
											: 'bg-check-in-out-arrowed-white md:max-xl:bg-check-in-out-arrowed-white-sm',
										'dark:text-background',
									)}
								>
									<div className="capitalize">
										<span>check-in</span>
										<span className="max-xl:hidden">
											{format(new Date(checkIn), 'yyyy/MM/dd') ===
											format(new Date(), 'yyyy/MM/dd') ? (
												<span className="px-1">
													<Icon className="mb-1" name="caret-right" size="md" />
													&nbsp;<strong>Today</strong>
												</span>
											) : (
												''
											)}
										</span>
										<span className="xl:hidden">:&nbsp;</span>
									</div>
									<div>
										<strong>
											{format(new Date(checkIn), 'MMM. do, yyyy')}
										</strong>
									</div>
								</div>

								<div
									className={cn(
										checkInOutBoxesClassList,
										format(new Date(checkOut), 'yyyy/MM/dd') ===
											format(new Date(), 'yyyy/MM/dd')
											? 'bg-check-in-out-arrowed-rose md:max-xl:bg-check-in-out-arrowed-rose-sm'
											: '',
									)}
								>
									<div className="capitalize">
										check-out
										<span className="max-xl:hidden">
											{format(new Date(checkOut), 'yyyy/MM/dd') ===
											format(new Date(), 'yyyy/MM/dd') ? (
												<span className="px-1">
													<Icon className="mb-1" name="caret-right" size="md" />
													&nbsp;<strong>Today</strong>
												</span>
											) : (
												''
											)}
										</span>
										<span className="xl:hidden">:&nbsp;</span>
									</div>
									<div>{format(new Date(checkOut), 'PPP')}</div>
								</div>
							</div>
						</div>
					</div>

					<AccordionTrigger className="pr-4 lg:pr-8">
						<Icon name="caret-down" size="4xl" className="" />
					</AccordionTrigger>
				</AccordionHeader>

				<AccordionContent className="AccordionContent px-4 lg:px-8">
					<div className="py-4 md:max-xl:mt-12 lg:py-8">
						<div className="mb-4 md:hidden">
							<div
								className={cn(
									'my-1 rounded-sm py-1 text-center',
									format(new Date(checkIn), 'yyyy/MM/dd') ===
										format(new Date(), 'yyyy/MM/dd')
										? 'bg-backgroundDashboard'
										: '',
								)}
							>
								<span className="capitalize">check-in:&nbsp;</span>
								<span>{format(new Date(checkIn), 'PPP')}</span>
							</div>

							<div
								className={cn(
									'my-1 rounded-sm py-1 text-center',
									format(new Date(checkOut), 'yyyy/MM/dd') ===
										format(new Date(), 'yyyy/MM/dd')
										? 'bg-destructive'
										: '',
								)}
							>
								<span className="capitalize">check-out:&nbsp;</span>
								<span>{format(new Date(checkOut), 'PPP')}</span>
							</div>
						</div>

						<h5 className="text-h5 font-normal capitalize">
							guest information
						</h5>

						<div className="mt-4">
							<div
								className={cn(
									guestMessage
										? '2xl:flex 2xl:items-end 2xl:justify-between'
										: 'md:flex md:items-end md:justify-between',
								)}
							>
								<div className={cn(guestMessage ? '2xl:max-w-2/3' : '')}>
									<div>
										<strong>
											{numberOfGuests}{' '}
											<span className="capitalize">
												guest{numberOfGuests > 1 ? 's' : ''}
											</span>
										</strong>
										{' / '}
										<strong>
											{numberOfNights}{' '}
											<span className="capitalize">
												night{numberOfNights > 1 ? 's' : ''}
											</span>
										</strong>
									</div>

									<div className="flex flex-wrap">
										<span className="capitalize">guest's email:&nbsp;</span>
										{guestEmail}
									</div>

									<div className="mt-2">
										<span className="capitalize">
											reservation created:&nbsp;
										</span>
										{format(createdAt, 'PPP')}
									</div>

									<div className="mt-2 sm:flex 2xl:pr-3">
										<div className="capitalize">message:&nbsp;</div>

										{guestMessage ? <>{guestMessage}</> : null}
									</div>
								</div>

								<div
									className={cn(
										'text-right',
										guestMessage ? 'max-2xl:mt-6' : '',
									)}
								>
									<div className="mb-4">
										<h5 className="text-xl">
											Total price:&nbsp;
											<span className="text-highlight">
												{totalPrice} {currency}
											</span>
										</h5>
									</div>

									<div className="flex justify-end gap-2">
										<Link to={`/admin/reservations/${reservationId}`}>
											<Button variant="outline">
												{reservationStatus !== 'cancelled' ? (
													'detail'
												) : (
													<span className="capitalize">detail</span>
												)}
											</Button>
										</Link>

										{reservationStatus !== 'cancelled' ? (
											<Link to={`/admin/reservations/${reservationId}`}>
												<Button
													variant={
														doubleCheckCancell.doubleCheck
															? 'highlight-secondary'
															: 'destructive'
													}
													{...doubleCheckCancell.getButtonProps({
														name: 'intent',
														value: 'delete',
													})}
												>
													{doubleCheckCancell.doubleCheck ? (
														'go to detail to cancel'
													) : (
														<Icon name="trash">Cancel</Icon>
													)}
												</Button>
											</Link>
										) : null}
									</div>
								</div>
							</div>
						</div>
					</div>
				</AccordionContent>
			</AccordionItem>
		</Accordion>
	)
}
