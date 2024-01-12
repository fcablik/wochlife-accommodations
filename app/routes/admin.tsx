import { type DataFunctionArgs } from '@remix-run/node'
import { NavLink, Outlet } from '@remix-run/react'
import UserDropdown from '#app/components/dropdowns/dropdown-user.tsx'
import { GeneralErrorBoundary } from '#app/components/error-boundary.tsx'
import { Button } from '#app/components/ui/button.tsx'
import { Icon } from '#app/components/ui/icon.tsx'
import { cn } from '#app/utils/misc.tsx'
import { requireUserWithRole } from '#app/utils/permissions.ts'
import { useUser } from '#app/utils/user.ts'
import { type IconName } from '@/icon-name'

export async function loader({ request }: DataFunctionArgs) {
	await requireUserWithRole(request, 'admin')
	return null
}

function SidebarMainNavLink({
	routeName,
	classList,
	title,
	first,
	icon,
	target,
}: {
	routeName: string
	classList?: string
	title?: string
	first?: boolean
	icon?: IconName
	target?: '_blank'
}) {
	return (
		<div
			className={cn(classList, !first ? 'lg:mt-2' : '', 'w-full px-2 lg:mb-2')}
		>
			<NavLink to={routeName} target={target}>
				{({ isActive }) => (
					<div
						className={cn(
							'group p-2 text-center capitalize',
							isActive ? 'rounded-xl bg-background text-foreground' : '',
						)}
					>
						<Icon size="xl" name={icon ?? 'caret-right'} />
						<div
							className={cn(
								'no-scrollbar overflow-x-scroll text-sm',
								!isActive
									? 'lg:opacity-0 lg:transition-opacity lg:group-hover:opacity-100'
									: '',
							)}
						>
							{title ?? routeName !== 'more' ? routeName : ''}
						</div>
					</div>
				)}
			</NavLink>
		</div>
	)
}
function SidebarNavLink({
	routeName,
	title,
	first,
	icon,
	target,
}: {
	routeName: string
	title?: string
	first?: boolean
	icon?: IconName
	target?: '_blank'
}) {
	return (
		<div className={cn(!first ? 'mt-2' : '', 'mb-2')}>
			<NavLink to={routeName} target={target}>
				{({ isActive }) => (
					<Button
						size="dashboardSidebar"
						variant={
							title === 'pricings2' ||
							title === 'discounts' ||
							title === 'facilities' ||
							title === 'galleries' ||
							title === 'packages'
								? isActive
									? 'dashboardSidebar'
									: 'dashboardSidebar'
								: isActive
								  ? 'activedashboardSidebar'
								  : 'dashboardSidebar'
						}
						className={cn(
							'capitalize',
							title === 'pricings2' ||
								title === 'discounts' ||
								title === 'facilities' ||
								title === 'galleries' ||
								title === 'packages'
								? isActive && 'font-bold text-highlight'
								: isActive && 'hover:bg-black dark:hover:bg-white',
						)}
					>
						<Icon
							size={icon ? 'xl-secondary' : 'xl'}
							name={icon ?? 'caret-right'}
						>
							{routeName !== 'more' && (title ?? routeName)}
						</Icon>
					</Button>
				)}
			</NavLink>
		</div>
	)
}

export default function AdminRoute() {
	const user = useUser()

	const sidebarBoxBaseClasslist =
		'lg:flex lg:flex-col lg:justify-between lg:items-center rounded-3xl bg-foreground text-background'
	const sidebarWidthClassList = 'w-full lg:w-[152px]'

	return (
		<div className="flex items-start justify-center">
			<div className="max-lg:contents">
				<div
					className={cn(
						'fixed z-3001 py-6 max-lg:bottom-0 max-lg:px-6 lg:h-full lg:overflow-y-scroll lg:pr-9 2xl:py-10',
						sidebarWidthClassList,
					)}
				>
					<div className={cn(sidebarBoxBaseClasslist, 'py-2 lg:py-10')}>
						<div className="text-center max-lg:hidden">
							property
							<br />
							logo
						</div>

						<div className="flex w-full items-center justify-between gap-5 lg:my-16 lg:flex-col">
							<SidebarMainNavLink
								first={true}
								routeName="dashboard"
								title="dashboard"
								icon="dashboard"
							/>

							<SidebarMainNavLink
								routeName="reservations"
								title="bookings"
								icon="calendar"
							/>

							<SidebarMainNavLink routeName="rooms" icon="home" />

							<div className="hidden">
								<SidebarNavLink
									routeName="rooms/gallery"
									title="galleries"
									icon="file-text"
								/>
								<SidebarNavLink
									routeName="rooms/pricing"
									title="pricings"
									icon="file-text"
								/>
								<SidebarNavLink
									routeName="rooms/discounts"
									title="discounts"
									icon="file-text"
								/>
								<SidebarNavLink
									routeName="rooms/packagedeals"
									title="packages"
									icon="file-text"
								/>
								<SidebarNavLink
									routeName="rooms/facility"
									title="facilities"
									icon="file-text"
								/>
							</div>

							<SidebarMainNavLink
								routeName="pages"
								icon="file-text"
								classList="max-lg:hidden"
							/>

							<SidebarMainNavLink
								title="more"
								routeName="more"
								icon="dots-horizontal"
								classList="lg:hidden"
							/>
						</div>

						<div className="text-center max-lg:hidden">
							<span>language</span>

							<SidebarMainNavLink routeName="more" icon="dots-horizontal" />
							<div className="hidden">
								<SidebarNavLink
									routeName="docs"
									title="help"
									icon="question-mark-circled"
								/>
								<SidebarNavLink routeName="users" icon="avatar" />
								{/* dots-horizontal, file-text, link-2 */}

								<SidebarNavLink routeName="cache" />

								<div
									className={cn(
										'mt-4 2xl:mt-8',
										sidebarBoxBaseClasslist,
										'px-2 py-4 2xl:px-4',
									)}
								>
									{user ? <UserDropdown /> : null}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className={cn('h-full max-lg:hidden', sidebarWidthClassList)} />

			<div className="w-full py-6 2xl:py-10">
				<div className="rounded-3xl bg-backgroundDashboard px-2 py-8 sm:px-3 xl:px-4 2xl:px-8 2xl:py-8">
					{/* rounded-3xl bg-backgroundDashboard  */}
					<Outlet />
				</div>
			</div>
		</div>
	)
}

export function ErrorBoundary() {
	return <GeneralErrorBoundary />
}
