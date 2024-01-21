import { conform, useForm } from '@conform-to/react'
import { getFieldsetConstraint, parse } from '@conform-to/zod'
import { type Translation } from '@prisma/client'
import {
	json,
	type DataFunctionArgs,
	type SerializeFrom,
} from '@remix-run/node'
import { Form, useFetcher } from '@remix-run/react'
import { toast } from 'sonner'
import { z } from 'zod'
import { GeneralErrorBoundary } from '#app/components/error-boundary.tsx'
import { ErrorList, Field } from '#app/components/forms.tsx'
import { StatusButton } from '#app/components/ui/status-button.tsx'
import { prisma } from '#app/utils/db.server.ts'
import { redirectWithToast } from '#app/utils/toast.server.ts'

const TranslationEditorSchema = z.object({
	id: z.string().optional(),
	name: z.string(),
	cs: z.string(),
	en: z.string(),
})

export async function action({ params, request }: DataFunctionArgs) {
	const formData = await request.formData()

	const submission = await parse(formData, {
		schema: TranslationEditorSchema.superRefine(async (data, ctx) => {
			if (!data.id) return

			const translation = await prisma.translation.findUnique({
				select: { id: true },
				where: { id: data.id },
			})
			if (!translation) {
				ctx.addIssue({
					code: 'custom',
					message: 'Translation not found',
				})
			}
		}),
		async: true,
	})

	if (submission.intent !== 'submit') {
		return json({ status: 'idle', submission } as const)
	}

	if (!submission.value) {
		return json({ status: 'error', submission } as const, { status: 400 })
	}

	const { id: translationId, name, cs, en } = submission.value

	const updatedTranslation = await prisma.translation.upsert({
		select: { name: true }, //name instead of id because of updatedTranslation.name being needed as string for toast
		where: { id: translationId ?? '__new_translation__' },
		create: {
			name,
			cs,
			en,
		},
		update: {
			name,
			cs,
			en,
		},
	})

	let toastTitle
	let toastDescription
	if (params.id) {
		toastTitle = 'Translation Saved!'
		toastDescription = `Translation "${updatedTranslation.name}" saved.`
	} else {
		toastTitle = 'Translation Created!'
		toastDescription = `New translation "${updatedTranslation.name}" successfully created.`
	}

	return redirectWithToast('/admin/translations', {
		type: 'success',
		title: toastTitle,
		description: toastDescription,
	})
}

export function TranslationEditor({
	translation,
}: {
	translation?: SerializeFrom<Pick<Translation, 'id' | 'name' | 'cs' | 'en'>>
}) {
	// TODO: implement - existingTranslations & don't allow to create the same twice
	// TODO: editing route?

	const translationFetcher = useFetcher<typeof action>()
	const isPending = translationFetcher.state !== 'idle'

	const [form, fields] = useForm({
		id: 'translation-editor',
		constraint: getFieldsetConstraint(TranslationEditorSchema),
		lastSubmission: translationFetcher.data?.submission,
		onValidate({ formData }) {
			const parsedData = parse(formData, { schema: TranslationEditorSchema })
			const errorCheck = parsedData.error

			if (Object.entries(errorCheck).length) {
				const name = errorCheck.name

				if (name) {
					toast.error('Translation not filled.')
				}
			}

			return parsedData
		},
		defaultValue: {
			name: translation?.name ?? '',
			cs: translation?.cs ?? '',
			en: translation?.en ?? '',
		},
	})

	return (
		<div className="flex flex-col items-center">
			<Form
				method="post"
				className="flex w-full flex-col"
				{...form.props}
				encType="multipart/form-data"
			>
				<div className="flex flex-col justify-between px-8 lg:px-12">
					{/*
						This hidden submit button is here to ensure that when the user hits
						"enter" on an input field, the primary form function is submitted
						rather than the first button in the form (which was delete/add image).
					*/}
					<button type="submit" className="hidden" />

					{translation ? (
						<input type="hidden" name="id" value={translation.id} />
					) : null}

					<div className="flex flex-col gap-1">
						{!translation ? 
						<Field
							labelProps={{ children: 'Translation Name' }}
							inputProps={{
								...conform.input(fields.name, { ariaAttributes: true }),
								placeholder: 'Name Of Translation',
								className: 'bg-backgroundDashboard h-12',
							}}
							errors={fields.name.errors}
						/>
					: (
						<div className='mb-4'>
							Editing Translation Name: <strong className='ml-2'>{translation.name}</strong>
						</div>
					)}

						<Field
							labelProps={{ children: 'CS Translation' }}
							inputProps={{
								...conform.input(fields.cs, { ariaAttributes: true }),
								placeholder: 'Czech String',
								className: 'bg-backgroundDashboard h-12',
							}}
							errors={fields.cs.errors}
						/>
						<Field
							labelProps={{ children: 'EN Translation' }}
							inputProps={{
								...conform.input(fields.en, { ariaAttributes: true }),
								placeholder: 'English String',
								className: 'bg-backgroundDashboard h-12',
							}}
							errors={fields.en.errors}
						/>
					</div>
					<ErrorList id={form.errorId} errors={form.errors} />
				</div>
			</Form>

			<StatusButton
				form={form.id}
				type="submit"
				disabled={isPending}
				status={isPending ? 'pending' : 'idle'}
				className="w-2/3 py-6 capitalize"
			>
				{translation ? 'save' : 'create'}
			</StatusButton>
		</div>
	)
}

export function ErrorBoundary() {
	return (
		<GeneralErrorBoundary
			statusHandlers={{
				404: ({ params }) => (
					<p>No translation with the id "{params.translationId}" exists</p>
				),
			}}
		/>
	)
}
