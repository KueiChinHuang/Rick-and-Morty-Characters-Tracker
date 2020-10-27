import auth0 from "../../utils/auth0";

export default async function login(req, res) {
  try {
    console.log("In Login api: ", req, res);
    await auth0.handleLogin(req, res);
  } catch (error) {
    console.error(error);
    res.status(error.status || 400).end(error.message);
  }
}
