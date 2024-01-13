import { type DataFunctionArgs } from '@remix-run/node'
import { Link, NavLink, Outlet } from '@remix-run/react'
import { useState } from 'react'
import { GeneralErrorBoundary } from '#app/components/error-boundary.tsx'
import { Button } from '#app/components/ui/button.tsx'
import { Icon } from '#app/components/ui/icon.tsx'
import { cn, getUserImgSrc } from '#app/utils/misc.tsx'
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
							'group/item p-2 text-center capitalize',
							isActive ? 'rounded-xl bg-background text-foreground' : '',
						)}
					>
						<Icon
							size="xl"
							name={icon ?? 'caret-right'}
							className="max-lg:h-5 max-lg:w-5"
						/>
						{routeName !== 'more' && (
							<div
								className={cn(
									'no-scrollbar overflow-x-scroll text-sm max-lg:text-xs',
									!isActive
										? 'group-hover/item:pointer-events-auto group-hover/rooms:opacity-100 lg:opacity-0 lg:transition-opacity lg:duration-300 lg:group-hover/item:opacity-100'
										: '',
								)}
							>
								{title ?? routeName}
							</div>
						)}
					</div>
				)}
			</NavLink>
		</div>
	)
}
function SidebarNavLink({
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
		<div className={cn(classList, !first ? 'mt-2' : '', 'mb-2')}>
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
							isActive
								? 'bg-background font-bold text-highlight dark:bg-foreground'
								: 'hover:bg-background hover:text-highlight hover:dark:bg-foreground hover:dark:text-foreground',
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

	const [isHovered, setIsHovered] = useState(false)

	const handleMouseOver = () => {
		setIsHovered(true)
	}

	const handleMouseOut = () => {
		setTimeout(() => {
			setIsHovered(false)
		}, 300)
	}

	return (
		<div className="flex items-start justify-center">
			<div className="max-lg:contents">
				<div
					className={cn(
						'fixed z-3001 w-full max-lg:bottom-0 lg:h-full lg:overflow-y-scroll',
						!isHovered && 'lg:w-[152px]',
					)}
				>
					<div
						className="pb-2 max-lg:px-2 lg:w-[152px] lg:pb-20 lg:pr-9 lg:py-6 2xl:py-10"
						onMouseOver={handleMouseOver}
						onMouseLeave={handleMouseOut}
					>
						<div className={cn(sidebarBoxBaseClasslist, 'py-2 lg:py-10')}>
							<div className="text-center max-lg:hidden">logo</div>

							<div className="custom-admin-sidebar-height flex w-full items-center justify-between lg:flex-col lg:gap-2 2xl:gap-5">
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

								<div className="group/rooms relative w-full">
									<SidebarMainNavLink routeName="rooms" icon="home" />

									<div className="pointer-events-none absolute z-3001 group-hover/rooms:pointer-events-auto max-lg:bottom-16 max-lg:right-0 lg:left-full lg:top-[-2rem]">
										<div className="ml-4 rounded-2xl bg-foreground px-4 py-2 opacity-0 transition group-hover/rooms:opacity-100">
											<SidebarNavLink
												routeName="rooms/pricing"
												title="pricings"
												icon="file-text"
											/>
											<SidebarNavLink
												routeName="rooms/gallery"
												title="galleries"
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
											<SidebarNavLink
												routeName="rooms/discounts"
												title="discounts"
												icon="file-text"
											/>
										</div>
									</div>
								</div>

								<SidebarMainNavLink
									routeName="pages"
									icon="file-text"
									classList="max-lg:hidden"
								/>

								<div className="group/additional relative w-full">
									<Icon
										name="dots-horizontal"
										size="xl"
										className="w-full cursor-pointer"
									/>

									<div className="pointer-events-none absolute z-3001 group-hover/additional:pointer-events-auto max-lg:bottom-16 max-lg:right-0 lg:bottom-[-5rem] lg:left-full">
										<div className="ml-4 rounded-2xl bg-foreground px-4 py-2 opacity-0 transition group-hover/additional:opacity-100">
											<SidebarNavLink
												routeName="pages"
												icon="file-text"
												classList="lg:hidden"
											/>

											<SidebarNavLink
												routeName="docs"
												title="help"
												icon="question-mark-circled"
											/>
											<SidebarNavLink routeName="users" icon="avatar" />
											{/* dots-horizontal, file-text, link-2 */}

											<SidebarNavLink routeName="cache" />

											<Button variant="secondary" className="z-9999">
												<Link
													to="/me"
													// this is for progressive enhancement
													className="flex items-center gap-2"
												>
													<img
														className="h-8 w-8 rounded-full object-cover"
														alt={user.name ?? user.username}
														src={getUserImgSrc(user.image?.id)}
													/>
													<span className="text-body-sm font-bold">
														{user.name ?? user.username}
													</span>
												</Link>
											</Button>
										</div>
									</div>
								</div>
							</div>

							<div className="w-full text-center max-lg:hidden">
								<span>language</span>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="h-full w-full max-lg:hidden lg:w-[152px]" />

			<div className="w-full py-6 2xl:py-10">
				<div className="rounded-3xl bg-backgroundDashboard px-2 py-8 sm:px-3 xl:px-4 2xl:px-8 2xl:py-8">
					<Outlet />
				</div>
			</div>
		</div>
	)
}

export function ErrorBoundary() {
	return <GeneralErrorBoundary />
}
