import dotenv from "dotenv";

let envLoaded = false;

export const loadEnv = () => {
  if (envLoaded) {
    return;
  }

  dotenv.config();
  envLoaded = true;
};
