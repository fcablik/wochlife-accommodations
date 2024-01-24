import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'

import { cn } from '#app/utils/misc.tsx'

const buttonVariants = cva(
	'inline-flex items-center justify-center rounded-lg lg:rounded-xl font-medium bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:bg-background disabled:pointer-events-none disabled:opacity-50 transition duration-250',
	{
		variants: {
			variant: {
				default: 'bg-background text-foreground hover:bg-background/80',
				destructive:
					'bg-destructive text-destructive-foreground hover:bg-destructive',
				deactivating:
					'bg-destructive text-destructive-foreground hover:bg-destructive',
				outline:
					'border border-input hover:bg-backgroundDashboard hover:text-highlight',
				'outline-contrast':
					'bg-transparent text-background border border-input hover:bg-backgroundDashboard hover:text-highlight',
				primary: 'bg-backgroundDashboard border-2 hover:border-highlight',
				secondary:
					'bg-secondary text-secondary-foreground hover:bg-highlight hover:text-background',
				ghost: 'hover:bg-accent hover:text-accent-foreground',
				link: 'text-primary underline-offset-4 hover:underline',

				// highlight w/o Hover
				highlight:
					'shadow-highlight bg-highlight text-background hover:bg-highlight/70',
				'highlight-static':
					'shadow-highlight bg-highlight text-background cursor-auto',
				'highlight-contrast': 'shadow-highlight bg-background text-foreground',

				// highlight w/ Hover
				'highlight-secondary':
					'font-500 shadow-highlight bg-highlight text-background hover:bg-highlight/20 border-2 border-highlight',

				disabled: 'border border-input bg-background cursor-auto opacity-60',
				activedashboardSidebar:
					'shadow-lg shadow-highlight bg-highlight text-background',
				dashboardSidebar: 'bg-transparent',
			},
			size: {
				default: 'h-10 px-4 py-2',
				wide: 'px-24 py-5',
				xs: 'h-8 px-3',
				sm: 'h-9 px-3',
				lg: 'h-11 px-8',
				xl: 'h-12 px-6 py-2',
				pill: 'px-12 py-3 leading-3',
				icon: 'h-10 w-10',
				dashboardSidebar: 'pl-3 pr-6 py-3',
			},
		},
		defaultVariants: {
			variant: 'default',
			size: 'default',
		},
	},
)

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {
	asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, variant, size, asChild = false, ...props }, ref) => {
		const Comp = asChild ? Slot : 'button'
		return (
			<Comp
				className={cn(buttonVariants({ variant, size, className }))}
				ref={ref}
				{...props}
			/>
		)
	},
)
Button.displayName = 'Button'

export { Button, buttonVariants }
