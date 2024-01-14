import { type DataFunctionArgs } from '@remix-run/node'
import { NavLink, Outlet } from '@remix-run/react'
import { useState } from 'react'
import UserDropdown from '#app/components/dropdowns/dropdown-user.tsx'
import { GeneralErrorBoundary } from '#app/components/error-boundary.tsx'
import { Button } from '#app/components/ui/button.tsx'
import { Icon } from '#app/components/ui/icon.tsx'
import { cn } from '#app/utils/misc.tsx'
import { requireUserWithRole } from '#app/utils/permissions.ts'
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
			className={cn(
				classList,
				!first ? 'lg:mt-2' : '',
				'w-full px-1 lg:mb-2 lg:px-2',
			)}
		>
			<NavLink to={routeName} target={target}>
				{({ isActive }) => (
					<div
						className={cn(
							'group/item p-2 text-center capitalize lg:px-2 lg:py-3',
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
									'no-scrollbar mt-1 overflow-x-scroll text-sm max-lg:text-xs',
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
						variant="dashboardSidebar"
						className={cn(
							'capitalize',
							isActive
								? 'bg-background font-bold text-highlight '
								: 'hover:bg-background hover:text-foreground',
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
	const [isHovered, setIsHovered] = useState(false)

	const handleMouseOver = () => {
		setIsHovered(true)
	}
	const handleMouseOut = () => {
		setTimeout(() => {
			setIsHovered(false)
		}, 300)
	}

	const sidebarBoxBaseClasslist =
		'lg:flex lg:flex-col lg:justify-between lg:items-center rounded-2xl lg:rounded-3xl bg-foreground dark:bg-backgroundDashboard dark:text-foreground text-background'

	return (
		<div className="flex items-start justify-center">
			<div className="max-lg:contents">
				<div
					className={cn(
						'fixed z-3001 w-full max-lg:bottom-0 lg:h-full lg:overflow-y-scroll',
						!isHovered && 'lg:w-[135px] xl:w-[145px] 2xl:w-[152px]',
					)}
				>
					<div
						className="pb-1 max-lg:px-1 lg:w-[135px] lg:pb-16 lg:pr-9 xl:w-[145px] 2xl:w-[152px] custom-admin-sidebar-wrapper"
						onMouseOver={handleMouseOver}
						onMouseLeave={handleMouseOut}
					>
						<div className={cn(sidebarBoxBaseClasslist, 'py-1 lg:py-8')}>
							<div className="text-center max-lg:hidden">logo</div>

							<div className="custom-admin-sidebar-height flex w-full items-center justify-between gap-1 lg:flex-col 2xl:gap-2">
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

									<div className="pointer-events-none absolute z-3001 group-hover/rooms:pointer-events-auto max-lg:bottom-16 max-lg:right-[-3rem] lg:left-full lg:top-[-50%]">
										<div className="ml-4 rounded-2xl bg-foreground px-4 py-2 opacity-0 transition group-hover/rooms:opacity-100 dark:bg-black dark:text-foreground">
											<div
												className="max-lg:hidden"
												style={{
													content: "''",
													position: 'absolute',
													top: '5rem',
													left: '-.6rem',
													borderWidth: '13px',
													borderStyle: 'solid',
													borderColor:
														'transparent #161414 transparent transparent',
												}}
											/>

											<SidebarNavLink
												routeName="rooms/pricing"
												title="pricings"
												icon="file-text"
											/>
											<SidebarNavLink
												routeName="rooms/facility"
												title="facilities"
												icon="drawing-pin-solid"
											/>
											<SidebarNavLink
												routeName="rooms/gallery"
												title="galleries"
												icon="image"
											/>
											<SidebarNavLink
												routeName="rooms/packagedeals"
												title="packages"
												icon="codesandbox-logo"
											/>
											<SidebarNavLink
												routeName="rooms/discounts"
												title="discounts"
												icon="mixer-horizontal"
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
										className="my-3 w-full cursor-pointer"
									/>

									<div className="pointer-events-none absolute z-3001 group-hover/additional:pointer-events-auto max-lg:bottom-16 max-lg:right-0 lg:bottom-[-3.5rem] 2xl:bottom-[-4.15rem] lg:left-full">
										<div className="ml-4 rounded-2xl bg-foreground px-4 py-2 opacity-0 transition group-hover/additional:opacity-100 dark:bg-black dark:text-foreground">
											<div
												className="max-lg:hidden"
												style={{
													content: "''",
													position: 'absolute',
													top: '9.25rem',
													left: '-.6rem',
													borderWidth: '13px',
													borderStyle: 'solid',
													borderColor:
														'transparent #161414 transparent transparent',
												}}
											/>

											<SidebarNavLink title="homepage" routeName="/" icon='home' target='_blank' />
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

											{/* <Button variant="secondary" className="z-9999">
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
											</Button> */}
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

			<div className="h-full w-full max-lg:hidden lg:w-[135px] xl:w-[145px] 2xl:w-[152px]" />

			<div className="w-full py-6 2xl:py-10">
				<div className="relative mb-4 flex items-center justify-between p-2 lg:mb-6">
					<div className="flex gap-2 max-lg:hidden">
						<Icon name="arrow-left" size="lg" />
						<Icon name="arrow-right" size="lg" />
					</div>

					<h5 className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-h5 capitalize">
						dashboard
					</h5>

					<div className="max-lg:hidden">
						<UserDropdown />
					</div>
				</div>
				<div className="">
					{/* rounded-3xl bg-backgroundDashboard */}
					<Outlet />
				</div>
			</div>
		</div>
	)
}

export function ErrorBoundary() {
	return <GeneralErrorBoundary />
}
