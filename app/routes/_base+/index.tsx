import { json, type MetaFunction } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
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

export default function Index() {
	const data = useLoaderData<typeof loader>()

	return (
		<div className='flex flex-col justify-center mx-auto text-center h-[90vh]'>
			<h1 className='text-h2'>Filapps Hospitality System</h1>

			<div className='mt-48 mb-8' >
			<h2 className='text-h4'>Rooms</h2>
			<RoomsListLoader roomData={data} />
			</div>
		</div>
	)
}

export const meta: MetaFunction = () => [{ title: 'Welcome To Wochdev' }]