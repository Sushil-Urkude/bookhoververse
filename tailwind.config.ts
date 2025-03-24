
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
                cream: "#F9F6F0",
                navy: "#1A365D",
                darknavy: "#0F2642",
                charcoal: "#333333",
                softgray: "#E5E5E5",
                accent1: "#7D4CDB",
                accent2: "#6FFFB0",
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			fontFamily: {
				sans: ['Inter', 'sans-serif'],
				serif: ['Playfair Display', 'serif'],
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
                'float': {
                    '0%, 100%': {
                        transform: 'translateY(0)'
                    },
                    '50%': {
                        transform: 'translateY(-10px)'
                    }
                },
                'fade-in': {
                    '0%': {
                        opacity: '0',
                        transform: 'translateY(10px)'
                    },
                    '100%': {
                        opacity: '1',
                        transform: 'translateY(0)'
                    }
                },
                'rotate-y': {
                    '0%': {
                        transform: 'rotateY(0deg)'
                    },
                    '100%': {
                        transform: 'rotateY(180deg)'
                    }
                },
                'book-hover': {
                    '0%': {
                        transform: 'rotateY(0deg) translateZ(0)'
                    },
                    '100%': {
                        transform: 'rotateY(15deg) translateZ(20px)'
                    }
                },
                'soft-pulse': {
                    '0%, 100%': {
                        opacity: '1'
                    },
                    '50%': {
                        opacity: '0.8'
                    }
                }
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
                'float': 'float 3s ease-in-out infinite',
                'fade-in': 'fade-in 0.6s ease-out forwards',
                'rotate-y': 'rotate-y 0.5s ease-out forwards',
                'book-hover': 'book-hover 0.3s ease-out forwards',
                'soft-pulse': 'soft-pulse 2s ease-in-out infinite'
			},
			boxShadow: {
				'glass': '0 4px 30px rgba(0, 0, 0, 0.1)',
				'book': '0 10px 25px -10px rgba(0, 0, 0, 0.25)',
				'subtle': '0 2px 10px rgba(0, 0, 0, 0.05)',
				'hover': '0 15px 30px -10px rgba(0, 0, 0, 0.3)',
			},
			backgroundImage: {
				'grain': "url('data:image/png;base64,data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAFKSURBVGhD7ZixSgNBFEXXIJYWFhZ+hYWFhYWFn2FhYWFhYWFhYeFP2FpYWNhYJHrhjHkQgm6ek3vgwOzb3exJ3uzsbDoSQgghhBBCCOE/MN/UC5ub/INZN/UEnu2afAK/B9AU1mBN1mZPtsnSUmwAEGvaAmxp2yA5SICmaQKabQukg0QoapaAZdoEySESpGkaJGmaBlnSVLU8kqZqlOWRNFWjDChRMaCkFiTNZkHSTAMkzaZB0kwLJM22QaqpJM/wqcknbGm7Ltck3h55Mb8xvyafTJ+aLlBgB/ZgT/Zm79pMZ8Uu8jEWCcUW7MFeTUJpVsQuNolFgrEHezUJpVkRu9gkFot480FyVsQuNolFIvHmR9tZEbvYJBaJxJt/RZ0VsYtNYpFIvPnXklkR21zH9h1wBHWcXCGEEEIIIYQQwj8ym30DV1Wy2wSzCwgAAAAASUVORK5CYII=')",
				'texture': "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAOHElEQVR4nO1dbVczNw69JCEvBJInEEIgEIb//6/6fbu73e77lkAIkI1JSAIhre/H0VwyQ8/4hWQmgahnjs5OZnzrsmxdluSrzr/8j/s/CH8ZUmnr6Jyp4NJdv+bisLNuxW7LrAMsM+zzK1SeZVkyR+7LIincthPHrMXY+z145Yb9+F7PPC0xNmjIiV0CnmI7GLnVJXFf9ey5BI5yJbd6KqV308E7+SBl0RBdeS0e557vJIwfunKFHwo/M0Pe+UFijMARKCGkIV0LWYaduwFLPApBMF+nIEKYFpUZi1q4FT1j76cB/CrUXaGnQt91Kn7X4eqhno3I7IxoJ1xJON/YPf6XFu0nSWTkZA0U138pKvsqeq7kZ4wZSsGpG3cppJ2i7C8+G4lp3XJe9GeulLJQdFCS9XvQFSWXbPQ1JX8wZsAr8l09J9Ls3bjDVl489m4U+q+2v2qxOxl9D2MwB3al7QrWk6GkI6Zv10PTUdKnFOVJNjNXJP3AiSaf6L7Q6aqcPQVlRVOYtNa+jg6YQFtJR0kbn2anwEgZP5R6KncvJIPgW3Aa4QvovM40R8ySuoqyrqTyC86c17IW0ko7SvoOCz8HhR/Jc4cKTZt5sSPEtYAcj4S+B6SsUDrSvnScnPmuIKKdJIgbUZQ3xt4VJd2JO3e5uJnDnSjzSjqtVs9F6+i5pMpV2hXRLyXRlbTCyZnH2D8Cp9le4YKuK0MCN2yZo/colO5KVSL/B/puYEcF4r0K+j1KFaWlVqTxlNdr0lFWluRPVyJq8jlRyj5CsE/G3hX6i343xJMnkOuKqri3o6QjDwbJTnZAOkJqK1L/UWF+NGWHpCUdPQNyOpGSr9F3A3Quix4J/TVyNtPHYgkuHJODaZ32cR454h79dRGrWK3jf2UlZQq1K2k3KbNDmV2sUOQlSsjj5+RDSRGcTri0TlDyt1ZaOO1zZmqBFNbnaJA0a3KCnQf4qihpj/L6RfRFQnuQPVdqCjlmQ8V3gZK+kV1ZRRblAcpq2RjQRyJ/Hq7YLbtSPlPuOnIfkpYIi5kpRxJdRdLnqXKfH3lFz5pa6LkHs+f8E9keNQy1s6pAiXmNHhiQe1e0ZD1SyjP0u6Kij+TeAiZQn1oRQ+6nkpKepOxb8/xv8Pcre2qfqSNd2QVCUKUgB8p4UOHvmJXfyVnzeuStXlXmREsVy7Q0iHInsGcKGLVCOFP+dQTtAPpuYA0lvdSZplPZCaSirC8Uwp0xJkLtQnH3dCpIaSiCktxcKc9ZdPNC9R8UZXWkq7RDQsUvNfZMpZC/dThwJ69rIvdS5Ghd+tvMAWoKUVdQOI2uh7ndC9lbsv9kzFg6VeagtVYMobIUuCC4UJ5zJJ/lfZrw9NtwQ1HWRShtgrK2kl1tVxN/hyGMOXcqTvcBcqxqtRR2jWFKx8WiJR0Ri01JP8DHoUFxn0N5rQDWVfkFHN7YU86SzBG0FNvlsj4n8nyXLx+OyNNFgq0vFyWlnxqYdpHr/8H9Giq603nUvqwyRtUu2vt1dqfUaYiFIecVWk30vbfldKXsXc4c728/aWaRiXDsA7YcnnnrfJfTTU7ZQSEEr62j8wa7xtRRCNBISX8wWs2VVOx9QrI45Y6k7sVg9NqE0GnmLU5KOkciJGudJ7jDDfKV35ESuCvn21WVtzh79omW1G2n3CqdMqel1YGyvllUJZspz4E3cuMC3BQU0rTFDgzpSN6JjlD8N2QqH3Tt1OraM9+W8BEV/6NccN2hKO3Y6TnFvoPG0KPh2Alym4DCs9JhC3Nnn6Pk1JUbioLetOUL8Rmb0ZEy78qyXWcGYi9LvKh0o9SOgOK/wVrfQS6d9mbXJeJEEZPsL4ui5Ah9LHDlhpT1FIkdRTGtPPvE9B3YmOCKd5D78HsbWt9m91TmB0Rl7B3uKmMcl8mpN7ipIRoShSRFvs3Ksuf7ZtjIBWbOBeFJ+e5jtVLGOBIpKZeEeIqyxCk9knOR2+Cpi9EHivxAT1HQn7GjKqWXhIRDDQ8Ye55QlYEVJD1ZNGVJSvfYFXZA+e5QlIOlvhYbHSnsFoHmHbcCls1rRQDmBtnHDjsZV7JpkzaFPdMWDXJCQxXOFomglN5RIW0HyI0yHXVg5RxFJBFl73FFJzDzFYGMI3DSe4LbQxEKu3LlkzfcUdRdRRHnWHvvJZeBhEiNcU5VyB1uFUCHfQS7E6Ny/fYgUfTQNAHBb8PuDnCbPL9IZGDcF8r/CX/7LHppzCGgZEEFX3leUz3GYzQZdWYJZYXCBlxaXYC5k11BURU0SgJZkV4q5WfHwAdlOjfYM2t5UOZ2Iih6QnBemTPGR9HoEkqZx+YvNBzYE9E8vWHJ51tqqEk1jjDWRiprZoB8ykUeSxR0rINrlyufYFSF9JLQbXmxvbBsM7qx2yVB+IUa9X1V2Sjl0Z9xhdnLjCxLvzMgf+SMxFtROhDkTMl8F7KZwc2J0ixYNpFrR3Vhcl2kXkzshygYLO7dTnFkpX/zUNOsRnxMfI41XEBDd2BzmssS2GgaDIV2KMOXtYGZXAQ7h1xkIjZCc/2EHSt71hezDGPYbDUDEaYxWsv+CYbRoQKRdSOcOxQeYH5ZgJXfiCdncPngCE27VfqHR+cczxY9KRwhsGsX3zzR3iWH0vY8V2jTlrOmjBSxQFbWeAzJ6oqTnYVMo79REWKbhqS1g3mG8l9YpLRD/MeO1KYbHK0Rmb9XmZfRfB+Dku+U3+FU2Rjwkl1zSRJcqvPHWjQxj4TxIJ0r/FoS51/QhxbJGNeDaZNfhz0vCgqLuVPBkZ24sdYHD5pRSotxj12xm9e3BQq+A3s6V5LsmPn+YR3vCfEPsPMRfN8NJdaCi9n4UGqcxX7WoKZM4/VlAejk8mYf9nHGd8Zu8f3p6xA8gKh7lbGtmCrFhQe+NhQeHoOdFx5C4uu5PUeIbZY/L4reIaNyYhZhcpJxW7RLa1HGcR0O7FnFx6xO/T+SqHaVPrRJGCvIPdc2o7DQ72HGGbPj4o64YQwb7g8ntiaSHUQzP14P/gn93oWxh0p+BjLb+S7Ks0r0O3c+yIrK2JX5GKnwRJ7TcWCuAfHTF3lSvmcfdsaD6tMESf/iGpJTr4/uyKmkTCYbtGGmUp8nKu1A4F8o+bwSu5QpujWB1OTHcb4Q5x1ZTtHbVnzm19jdxRwVpQkJahJkH+Mxph2W1D3KbslvUY41PJjSvoW0wQc+Y5U7QlGZw7Iy+CmF6Vj5NFhJI2fxSukvFe2i5LcCEcWuZG/JPIvAr0BSxzv1Dn3GanJQEpnQQqEOYaqlUOY4VZQ3VxU9kcHzfYyjUPINdl9FqcGgaJc+qW6gpP+YssZKQuJ05hJCE9+Xjcb9lrqV+uN2WPYJpDVvqQsK2V2SHDr7xVWiZ58CkDCtZQm3vCdmzFk3RrBM4ftoVSVKrKtq3yO90ZRCHrMsrVnxCwF3I9qG58tCz3aOQP1lmvB1jR5bpnTZhpZZXzQ7HqpfhvMfRbYZhfD8WaAvTQ+btmPmcnQNxj4VoTgL5d8F/cYc/qmZygjsyEVJZQVxJPRPRDHXQUi7IGUOcC+6GHPYoWV2CWUvxsVLrfAM7RdCcuRyQkzTQHyVuaRPH7DXJLzGrDGp7DWF8fPkrnSG/iIFSHvKnvtHyXewYxcGSMuMHV6zO2alrMgvVHjnXIcjEbNMY8+qEh5TFjqS/C9qcoxqq52SvUrGvhGRR+L0lZ55ZQdmZ+I0HMWmYqTEaFSHHE+P8JtdxnL6bLI3NerI+UHWUoY+VQ/1lTrR4sJI4Vktp5S9F+KKThRHU8g+2fXi0cnFlnY27p4Jssv4vDhvquJxWOGSWVCIGpdm5CUvg3s0+jbSdLkBu1zIQYG2r3CGD0pSvntrwpxdktQoK9tRZGDjl7FGhDO9IAJ3EQbQOW9JQeX1CnZYIuPcMRvjoZ6NPu0wXE26i5aTZ4cW7XlRmDsQw6FeXdhsVeJ0fYLfuEoFl/1RZJtptHNZijQ56TEgE8n5jCGcSZPvWaWGHKGWPSmnxUDXGcQfI4QTqy9DXkc99rTsUfQ1dufqXB7qyWvCXuDLUW2v7HGr5eHDkaZPhDgmJaVX9rQhO2pHTBXaaeB5p6OgXypKOXWiJ8Qv0a++mU0mEq9QcHmPxb7o7YM8T2ItDM7+Pv5HuZrIz2+pRStKFHwKu1LmJ2dPjvnTTnrPEPbRDZUWa3k6DQ5p8H7dK3K11GyJQq+xMTnHXPpkjj0n/JqDDuxtV95QSpPaZJRQw7JB6g/MQUCe1zNSlc2VHxQFXUE71FsAyHWfOi9o7oISc4Ga3HeSf0xJaZVjVt9+VTJeAqVPCLsBd9hBKbbR1uYCdTUjWHuEn2QTuYAjPWPPDylnBfbiJqcpZ057U3NQDBBJzE4q8lNSW1YT2m0XJRtAu3NJSf9gEcZKNIOdlsKoMUHkWnE6D+AEzCftgvHyCK+dnJfQMnNZUbKk1PCyWPXgXXkwUJ2Jcv0rQqPNdq/0e4HlGX90ttCFPdPCwF2y8RztydFYOCmJfMQtrsQYDuWJhIbQnCG1QhAHU5RzN8lPBK3vgqzMyZO4kRgNhJwWF75NxHDtumYJjeMabWD+GHtFUT80Vcs0sBEV/QcP8Td2FwkJUg6k30Ju3xSScBrn+M6zsOc0+SWlLl34rKyaKuPznR1V8W+Kk7qSFRRShwG5YE9a3PiaTrRrjCwVdHNOGcRmNTk9PU7mZl/lbHxcmHs9KUkhZmNGaYiTGqWxBi4pN01XlEIXExYHvmgW8xUwQ6KgX1JVpfnH6Eg5bTpxWUSlAY3hpvBIg8vLNEVWDBaWL8TLlD2nzQmdxqbBt8zxB0lEbWQXJn9RqfHX5AxJyb8ox9eVeVmK0Vxh0TnpZ6AxMPwkCnprHANOOpW8L3hMYWuZh3Kl0wkU93xqXlOXzHF5A+WHciX2+9JMOSb+Aypc0CnS9OjlAAAAAElFTkSuQmCC')",
			},
			backdropFilter: {
				'none': 'none',
				'blur': 'blur(20px)',
			},
			perspective: {
				'1000': '1000px',
				'2000': '2000px',
			},
			transformStyle: {
				'3d': 'preserve-3d',
			},
			transformOrigin: {
				'center-left': 'center left',
			},
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
