import ROUTE_LINK from "@/routes/RouterLink";
export const BASE_URL = `http://localhost:8080`;

export const APIS = {
  signin: `${BASE_URL}${ROUTE_LINK.SIGNIN.link}`,
  signup: `${BASE_URL}${ROUTE_LINK.SIGNUP.link}`,
  user: `${BASE_URL}${ROUTE_LINK.USER.link}`,

  storePictureUpload: `${BASE_URL}/uploads`,
  getImageBase: `${BASE_URL}/`,
  logout: `${BASE_URL}/logout`,
};
