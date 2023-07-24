import instance from "./api";

export const getAuthToken = async ({
  email,
  pass,
}: {
  email: string;
  pass: string;
}) => {
  const response = await instance.post("/auth/login", {
    email: email,
    pass: pass,
  });
  if (response.status !== 200) {
    console.error(response, "resp");
    return null;
  }
  return response.data;
};
