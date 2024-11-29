interface EnvConfig {
  falKey: string;
}

if (!import.meta.env.VITE_FAL_KEY) {
  throw new Error(
    'Missing FAL.AI credentials. Please add VITE_FAL_KEY to your .env file.'
  );
}

export const env: EnvConfig = {
  falKey: import.meta.env.VITE_FAL_KEY,
};