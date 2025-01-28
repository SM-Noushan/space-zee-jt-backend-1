import path from "path";
import dotenv from "dotenv";

dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
  port: process.env.PORT || 5000,
  dbUrl: process.env.DB_URL,
  backendUrl2: process.env.BACKEND_URL2,
  secretToken: process.env.SECRET_TOKEN,
  allowedUrl: process.env.CORS_ALLOWED_URL,
  bcyptSalRound: process.env.BCRYPT_SALT_ROUNDS || 10,
};
