import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { GeneralErrorBoundary } from '#app/components/error-boundary.tsx'
import { Spacer } from '#app/components/spacer.tsx'
import { prisma } from '#app/utils/db.server.ts'
import { RoomsListLoader } from '../resources+/rooms-list.tsx'

export async function loader() {
	const rooms = await prisma.room.findMany({
		select: {
			id: true,
			url: true,
			title: true,
			visibility: true,
			price1: true,
		},
	})
	if (!rooms) {
		throw new Response('not found', { status: 404 })
	}
	return json({ rooms })
}

export default function RoomsIndex() {
	const data = useLoaderData<typeof loader>()

	return (
		<div className="mb-48 mt-36 text-center">
			<h1 className="text-h1">Rooms</h1>
			<Spacer size="sm" />

			<RoomsListLoader roomData={data} />
		</div>
	)
}

export function ErrorBoundary() {
	return <GeneralErrorBoundary />
}
