import instance from "./api";

export const getAuthToken = async ({
  email,
  pass,
}: {
  email: string;
  pass: string;
}) => {
  const resp = await instance
    .post("/auth/login", {email: email, pass: pass})
    .then(res => res)
    .catch(err => err.response.data);
  if (resp.status !== 200) {
    return resp;
  }
  return resp;
};
export const userRegistration = async (request: {
  email: string;
  pass: string;
  name: string;
  regPromo: string;
}) => {
  return instance
    .post("/auth/registration", {...request})
    .then(res => res.data)
    .catch(({response}) => response);
};
