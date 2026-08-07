export const messages = {
  RegisterPage: {
    createAccountLabel: 'Crear cuenta',
    subtitleLabel: 'Ingresá tus datos para registrarte',

    fullNameLabel: 'Nombre completo',
    fullNamePlaceholder: 'Juan Pérez',

    emailLabel: 'Email',
    emailPlaceholder: 'juan@email.com',

    passwordLabel: 'Contraseña',
    passwordPlaceholder: '••••••••',

    countryLabel: 'País',

    registerButtonLabel: 'Registrarse',

    errorRequiredTitle: 'Campos requeridos',
    errorRequiredMessage: 'Por favor completá todos los campos.',

    errorPasswordShortTitle: 'Contraseña muy corta',
    errorPasswordShortMessage: 'La contraseña debe tener al menos 6 caracteres.',

    errorAlreadyRegistered: 'Este email ya está registrado.',
    errorInvalidEmail: 'El formato del email no es válido.',
    errorRateLimit: 'Demasiados intentos. Esperá unos minutos e intentá de nuevo.',

    successTitle: '¡Registro exitoso!',
    successMessage: 'Revisá tu email para confirmar tu cuenta.',
  },
} as const;
