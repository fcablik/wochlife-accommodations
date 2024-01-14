import { 
	// type DataFunctionArgs, 
	type MetaFunction } from '@remix-run/node'
// import { requireUserWithRole } from '#app/utils/permissions.ts'

// export async function loader({ request }: DataFunctionArgs) {
// 	await requireUserWithRole(request, 'admin') // Temporary DEVelopment Phase
// 	return null
// }

export default function Index() {
	return (
		<div className='flex flex-col justify-center mx-auto text-center h-80'>
			<h1 className='text-h1'>Wochdev Hotels System</h1>
		</div>
	)
}

export const meta: MetaFunction = () => [{ title: 'Welcome To Wochdev' }]