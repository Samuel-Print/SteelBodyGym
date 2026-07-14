export const PASSWORD_RULES = [
  { label: "Mínimo 8 caracteres", test: (pw) => pw.length >= 8 },
  { label: "Una letra mayúscula", test: (pw) => /[A-Z]/.test(pw) },
  { label: "Una letra minúscula", test: (pw) => /[a-z]/.test(pw) },
  { label: "Un número", test: (pw) => /[0-9]/.test(pw) },
  { label: "Un carácter especial (!@#$...)", test: (pw) => /[^A-Za-z0-9]/.test(pw) },
];

export const getFailingPasswordRules = (password) =>
  PASSWORD_RULES.filter((rule) => !rule.test(password));

export const isValidEmail = (email) => /^\S+@\S+\.\S+$/.test(email.trim());