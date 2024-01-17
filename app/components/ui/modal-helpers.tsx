import { Icon } from '#app/components/ui/icon.tsx'
import { cn } from '#app/utils/misc.tsx'
import { modalBackdropClassList } from '../modal-backdrop.tsx'

export function MobileModalCaretOpener({
	isMobExtraMenuToggled,
	handleToggle,
	classList,
}: {
	isMobExtraMenuToggled: boolean
	handleToggle: () => void
	classList?: string
}) {
	return (
		<>
			{!isMobExtraMenuToggled ? (
				<Icon
					name="caret-up"
					className={cn(
						classList,
						'fixed bottom-20 right-5 z-1999 h-8 w-8 cursor-pointer gap-3 rounded-lg bg-foreground text-background transition-colors hover:bg-highlight hover:text-foreground',
					)}
					onClick={handleToggle}
				/>
			) : (
				<div onClick={handleToggle} className={modalBackdropClassList} />
			)}
		</>
	)
}

export function ModalCloserIcon({
	handleToggle,
	iconName = 'cross-1',
}: {
	handleToggle: () => void
	iconName?: string
}) {
	return (
		<Icon
			name={iconName}
			size="md"
			className="absolute right-6 top-6 z-4001 cursor-pointer text-foreground transition-opacity hover:opacity-70"
			onClick={handleToggle}
		/>
	)
}
