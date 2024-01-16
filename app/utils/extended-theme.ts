import { type Config } from 'tailwindcss'

export const extendedTheme = {
	colors: {
		border: 'hsl(var(--border))',
		input: {
			DEFAULT: 'hsl(var(--input))',
			invalid: 'hsl(var(--input-invalid))',
		},
		ring: {
			DEFAULT: 'hsl(var(--ring))',
			invalid: 'hsl(var(--foreground-destructive))',
		},
		background: 'hsl(var(--background))',
		foreground: {
			DEFAULT: 'hsl(var(--foreground))',
			destructive: 'hsl(var(--foreground-destructive))',
		},
		backgroundDashboard: 'hsl(var(--background-dashboard))',
		primary: {
			DEFAULT: 'hsl(var(--primary))',
			foreground: 'hsl(var(--primary-foreground))',
		},
		secondary: {
			DEFAULT: 'hsl(var(--secondary))',
			foreground: 'hsl(var(--secondary-foreground))',
		},
		highlight: 'hsl(var(--highlight))',
		destructive: {
			DEFAULT: 'hsl(var(--destructive))',
			foreground: 'hsl(var(--destructive-foreground))',
		},
		accepted: {
			DEFAULT: 'hsl(var(--accepted))',
			foreground: 'hsl(var(--accepted-foreground))',
		},
		muted: {
			DEFAULT: 'hsl(var(--muted))',
			foreground: 'hsl(var(--muted-foreground))',
		},
		accent: {
			DEFAULT: 'hsl(var(--accent))',
			foreground: 'hsl(var(--accent-foreground))',
		},
		popover: {
			DEFAULT: 'hsl(var(--popover))',
			foreground: 'hsl(var(--popover-foreground))',
		},
		card: {
			DEFAULT: 'hsl(var(--card))',
			foreground: 'hsl(var(--card-foreground))',
		},
	},
	boxShadow: {
		'reservation-number': '0px 0px 5px rgba(0, 0, 0, .16)',
		'admin-detail-box': '0px 0px 15px rgba(0, 0, 0, .15)',
		'header-menu': '0px 0px 8px 4px rgba(0, 0, 0, .15)',
		'page-container': '0px 10px 10px rgba(0, 0, 0, .1)',
	},
	minWidth: {
		'1/2': '50%',
		'1/3': '33.33%',
		'2/3': '66.66%',
		'1/4': '25%',
		'3/4': '75%',
		'2/5': '40%',
		'3/5': '60%',
	},
	maxWidth: {
		'1/2': '50%',
		'1/3': '33.33%',
		'2/3': '66.66%',
	},
	borderRadius: {
		lg: 'var(--radius)',
		md: 'calc(var(--radius) - 2px)',
		sm: 'calc(var(--radius) - 4px)',
	},
	fontSize: {
		// 1rem = 16px
		/** 80px size / 84px high / bold */
		mega: ['5rem', { lineHeight: '5.25rem', fontWeight: '700' }],
		/** 56px size / 62px high / bold */
		h1: ['3.5rem', { lineHeight: '3.875rem', fontWeight: '700' }],
		/** 40px size / 48px high / bold */
		h2: ['2.5rem', { lineHeight: '3rem', fontWeight: '700' }],
		/** 32px size / 36px high / bold */
		h3: ['2rem', { lineHeight: '2.25rem', fontWeight: '700' }],
		/** 28px size / 36px high / bold */
		h4: ['1.75rem', { lineHeight: '2.25rem', fontWeight: '700' }],
		/** 24px size / 32px high / bold */
		h5: ['1.5rem', { lineHeight: '2rem', fontWeight: '700' }],
		/** 16px size / 20px high / bold */
		h6: ['1rem', { lineHeight: '1.25rem', fontWeight: '700' }],

		/** 32px size / 36px high / normal */
		'body-3xl': ['2rem', { lineHeight: '2.25rem' }],
		/** 32px size / 36px high / normal */
		'body-2xl': ['2rem', { lineHeight: '2.25rem' }],
		/** 28px size / 36px high / normal */
		'body-xl': ['1.75rem', { lineHeight: '2.25rem' }],
		/** 24px size / 32px high / normal */
		'body-lg': ['1.5rem', { lineHeight: '2rem' }],
		/** 20px size / 28px high / normal */
		'body-md': ['1.25rem', { lineHeight: '1.75rem' }],
		/** 16px size / 20px high / normal */
		'body-sm': ['1rem', { lineHeight: '1.25rem' }],
		/** 14px size / 18px high / normal */
		'body-xs': ['0.875rem', { lineHeight: '1.125rem' }],
		/** 12px size / 16px high / normal */
		'body-2xs': ['0.75rem', { lineHeight: '1rem' }],

		'body-base': ['.925rem', { lineHeight: '1.2rem' }],

		/** 18px size / 24px high / semibold */
		caption: ['1.125rem', { lineHeight: '1.5rem', fontWeight: '600' }],
		/** 12px size / 16px high / bold */
		button: ['0.75rem', { lineHeight: '1rem', fontWeight: '700' }],
	},
	keyframes: {
		'accordion-down': {
			from: { height: '0' },
			to: { height: 'var(--radix-accordion-content-height)' },
		},
		'accordion-up': {
			from: { height: 'var(--radix-accordion-content-height)' },
			to: { height: '0' },
		},
	},
	animation: {
		'accordion-down': 'accordion-down 0.2s ease-out',
		'accordion-up': 'accordion-up 0.2s ease-out',
	},
	zIndex: {
		'9': '9',
		'10': '10',
		'49': '49',
		'99': '99',
		'100': '100',
		'999': '999',
		'1000': '1000',
		'1001': '1001',
		'1999': '1999',
		'2000': '2000',
		'2001': '2001',
		'3000': '3000',
		'3001': '3001',
		'4000': '4000',
		'4001': '4001',
	},
	backgroundImage: {
		'checkin-day': 'linear-gradient(-45deg, var(--tw-gradient-stops))',
		'checkout-day': 'linear-gradient(45deg, var(--tw-gradient-stops))',
		// 'check-in-out-arrowed-white': "url('/img/check-in-out-arrowed-white.svg')",
		// 'check-in-out-arrowed-rose': "url('/img/check-in-out-arrowed-rose.svg')",
		// 'check-in-out-arrowed-lime': "url('/img/check-in-out-arrowed-lime.svg')",
		// 'check-in-out-arrowed-white-sm':
		// 	"url('/img/check-in-out-arrowed-white-sm.svg')",
		// 'check-in-out-arrowed-rose-sm':
		// 	"url('/img/check-in-out-arrowed-rose-sm.svg')",
		// 'check-in-out-arrowed-lime-sm':
		// 	"url('/img/check-in-out-arrowed-lime-sm.svg')",
	},
	padding: {
		'18': '4.5rem',
	},
	height: {
		'22': '5.5rem',
	},
	backdropBlur: {
		xs: '2px',
	},
} satisfies Config['theme']
