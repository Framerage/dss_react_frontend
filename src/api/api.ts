import axios from "axios";
import { request } from "http";
export const APP_URL = process.env.SERVER_URL;
// console.log(APP_URL, "APP_URL111");
export const appFetch = axios.create({
  //   baseURL: process.env.SERVER_URL,
  baseURL: "http://localhost:3333",
});
export const getAuthToken = async ({
  email,
  pass,
}: {
  email: string;
  pass: string;
}) => {
  const response = await appFetch({
    method: "GET",
    // url: process.env.SERVER_URL,
    params: {
      lang: "ru",
      data: { email, pass },
      headers: {
        "Content-Type": "application/json",
        Authorization: "",
      },
    },
  });
  return response.data;

  // return request({
  //     // ctx: this.ctx,
  //     url: `/hpsd/returnToWork?id=${requestId}`,
  //     options: {
  //       method: 'POST',
  //       data: {
  //         description: text,
  //       },
  //     },
  //   })
};
