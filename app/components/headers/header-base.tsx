import { Link, NavLink } from '@remix-run/react'
import { cn } from '#app/utils/misc.tsx'
import { baseContainerWidthClassList } from '../classlists.tsx'
import ThemeSwitcher from '../theme-switch.tsx'
import { Button } from '../ui/button.tsx'
// import { useOptionalUser } from "#app/utils/user.ts"
// import UserDropdown from "../dropdowns/dropdown-user.tsx"

export function HeaderBase({ routeAdmin }: { routeAdmin?: boolean }) {
	// const user = useOptionalUser()
	const headerHeight = 'h-[60px]'

	return (
		<header className={cn('max-md:absolute', routeAdmin && 'max-lg:hidden')}>
			<div className="fixed z-1999 w-full max-md:bottom-2 md:top-0">
				<div
					className={cn(
						'bg-background max-md:mx-2 max-md:rounded-xl',
						headerHeight,
						'py-2 shadow-header-menu max-md:px-2 max-md:py-4',
					)}
				>
					<nav className={cn("space-between flex items-center justify-between", baseContainerWidthClassList)}>
						<Link to="/">
							<div className="font-light">wochdev</div>
							<div>properties</div>
						</Link>

						<div className="md:absolute md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2">
							<div className="flex justify-center gap-5">
								<NavLink to="rooms">
									{({ isActive }) => (
										<Button variant={isActive ? 'highlight' : 'secondary'}>
											rooms
										</Button>
									)}
								</NavLink>

								<NavLink to="pages">
									{({ isActive }) => (
										<Button variant={isActive ? 'highlight' : 'secondary'}>
											pages
										</Button>
									)}
								</NavLink>

								<NavLink to="contact">
									{({ isActive }) => (
										<Button variant={isActive ? 'highlight' : 'secondary'}>
											contact
										</Button>
									)}
								</NavLink>
							</div>
						</div>

						<div className="flex items-center gap-10">
							<ThemeSwitcher />

							{/* {user ? (
								<UserDropdown />
							) : (
								<Button asChild variant="default" size="sm">
									<Link to="/login">Log In</Link>
								</Button>
							)} */}
						</div>
					</nav>
				</div>
			</div>

			<div className={headerHeight} />
		</header>
	)
}
