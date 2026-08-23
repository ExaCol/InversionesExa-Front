export const messages = {
  Common: {
    countrySelectPlaceholder: 'Seleccioná un país',
    countrySearchPlaceholder: 'Buscar país...',
    countryEmptyLabel: 'No se encontraron países',
    errorLoadCountries: 'No se pudieron cargar los países.',
  },
  LoginPage: {
    titleLabel: 'Bienvenido',
    subtitleLabel: 'Ingresá tu email y contraseña para continuar',

    emailLabel: 'Email',
    emailPlaceholder: 'juan@email.com',

    passwordLabel: 'Contraseña',
    passwordPlaceholder: '••••••••',

    loginButtonLabel: 'Iniciar sesión',

    errorRequiredTitle: 'Campos requeridos',
    errorRequiredMessage: 'Por favor completá todos los campos.',

    errorInvalidCredentials: 'Email o contraseña incorrectos.',
    errorRateLimit: 'Demasiados intentos. Esperá unos minutos e intentá de nuevo.',

    noAccountLabel: '¿No tenés cuenta?',
    registerLinkLabel: 'Registrate',
  },
  RegisterPage: {
    createAccountLabel: 'Crear cuenta',
    subtitleLabel: 'Ingresá tus datos para registrarte',

    fullNameLabel: 'Nombre completo',
    fullNamePlaceholder: 'Juan Pérez',

    emailLabel: 'Email',
    emailPlaceholder: 'juan@email.com',

    passwordLabel: 'Contraseña',
    passwordPlaceholder: '••••••••',
    passwordHintLabel: 'Mínimo 8 caracteres, con una mayúscula, un número y un carácter especial.',

    confirmPasswordLabel: 'Confirmar contraseña',
    confirmPasswordPlaceholder: '••••••••',

    countryLabel: 'País',

    registerButtonLabel: 'Registrarse',

    errorRequiredTitle: 'Campos requeridos',
    errorRequiredMessage: 'Por favor completá todos los campos.',

    errorPasswordShortTitle: 'Contraseña insegura',
    errorPasswordShortMessage:
      'La contraseña debe tener al menos 8 caracteres, incluyendo una mayúscula, un número y un carácter especial.',

    errorPasswordMismatchTitle: 'Las contraseñas no coinciden',
    errorPasswordMismatchMessage: 'Verificá que ambas contraseñas sean iguales.',

    errorAlreadyRegistered: 'Este email ya está registrado.',
    errorInvalidEmail: 'El formato del email no es válido.',
    errorRateLimit: 'Demasiados intentos. Esperá unos minutos e intentá de nuevo.',

    successTitle: '¡Registro exitoso!',
    successMessage: 'Revisá tu email para confirmar tu cuenta.',
  },
  SelectCountryPage: {
    titleLabel: 'Elegí tu país',
    subtitleLabel: 'Necesitamos saber tu país para continuar.',
    continueButtonLabel: 'Continuar',

    errorCountryRequiredTitle: 'País requerido',
    errorCountryRequiredMessage: 'Seleccioná un país para continuar.',

    errorSaveCountry: 'No se pudo guardar el país.',
  },
} as const;
