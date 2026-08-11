export const messages = {
  LoginPage: {
    titleLabel: "Bienvenido",
    subtitleLabel: "Ingresa tu email y contraseña para continuar",

    emailLabel: "Email",
    emailPlaceholder: "juan@email.com",

    passwordLabel: "Contraseña",
    passwordPlaceholder: "••••••••",

    loginButtonLabel: "Iniciar sesión",

    errorRequiredTitle: "Campos requeridos",
    errorRequiredMessage: "Por favor completa todos los campos.",

    errorInvalidCredentials: "Email o contraseña incorrectos.",
    errorRateLimit:
      "Demasiados intentos. Espera unos minutos e intenta de nuevo.",

    noAccountLabel: "¿No tienes cuenta?",
    registerLinkLabel: "Registrate",
  },
  RegisterPage: {
    createAccountLabel: "Crear cuenta",
    subtitleLabel: "Ingresa tus datos para registrarte",

    fullNameLabel: "Nombre completo",
    fullNamePlaceholder: "Juan Pérez",

    emailLabel: "Email",
    emailPlaceholder: "juan@email.com",

    passwordLabel: "Contraseña",
    passwordPlaceholder: "••••••••",

    countryLabel: "País",

    registerButtonLabel: "Registrarse",

    errorRequiredTitle: "Campos requeridos",
    errorRequiredMessage: "Por favor completa todos los campos.",

    errorPasswordShortTitle: "Contraseña muy corta",
    errorPasswordShortMessage:
      "La contraseña debe tener al menos 6 caracteres.",

    errorAlreadyRegistered: "Este email ya está registrado.",
    errorInvalidEmail: "El formato del email no es válido.",
    errorRateLimit:
      "Demasiados intentos. Espera unos minutos e intenta de nuevo.",

    successTitle: "¡Registro exitoso!",
    successMessage: "Revisá tu email para confirmar tu cuenta.",
  },
} as const;
