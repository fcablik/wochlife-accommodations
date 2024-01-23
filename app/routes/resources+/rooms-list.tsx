import { Link } from '@remix-run/react'
import React from 'react'
import { Button } from '#app/components/ui/button.tsx'

export function RoomsListLoader({
	roomData,
}: {
	roomData: {
		rooms: {
			id: string
			url: string
			title: string
			visibility: boolean
			price1: number
		}[]
	}
}) {
	const roomsVisibility = roomData.rooms
		.map(room => room.visibility ?? true)
		.filter(Boolean)

	return (
		<>
			{roomData.rooms.length && roomsVisibility?.length ? (
				<div
					id="list"
					className="px-2 py-4 sm:mx-auto sm:max-w-[550px] md:max-w-[650px] lg:max-w-[750px] lg:px-0 lg:py-12"
				>
					<div className="flex flex-row flex-wrap justify-between">
						{roomData.rooms.map(room => (
							<React.Fragment key={room.id}>
								{room.visibility && (
									<div className="w-1/2 p-2 text-center md:p-6">
										<div className="z-1 border bg-background px-3 pb-6 pt-4 transition-opacity hover:opacity-95 lg:px-4 lg:pb-10 lg:pt-6">
											<Link to={`/rooms/${room.url}`} className="text-center">
												<div className="overflow-hidden py-6 lg:p-8">
													<div>{room.title}</div>
													<div>{room.price1}</div>
												</div>

												<Button variant="secondary" className="">
													Detail
												</Button>
											</Link>
										</div>
									</div>
								)}
							</React.Fragment>
						))}
					</div>
				</div>
			) : (
				<p>Seems like no rooms are available at the moment. 😏</p>
			)}
		</>
	)
}
