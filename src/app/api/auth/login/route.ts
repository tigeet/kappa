import { handleLogin } from "@auth0/nextjs-auth0";
export const GET = async function (req: any, res: any) {
  return await handleLogin(req, res, {
    returnTo: process.env.AUTH0_REDIRECT_URL,
  });
};
