import { cleanEnv, str } from "envalid";

const env = cleanEnv(process.env, {
  BACKEND_URL: str(),
  NEXT_PUBLIC_BASE_URL: str(),
  NEXTAUTH_SECRET: str(),
  NEXT_PUBLIC_MAP_API_KEY: str(),
});

export default env;
