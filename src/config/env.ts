function getEnv(key: string): string {
  const value = process.env[key];

  if (!value) {
    throw new Error(
      `Error de configuración, La variable de entorno ${key} no tiene un valor asignado.`,
    );
  }

  return value;
}

export const ENV = {
  PORT: Number(getEnv("PORT")),
  DATABASE_URL: getEnv("DATABASE_URL"),
};
