import instance from "./api";

export const getCatalogCards = async () => {
  const response = await instance("/cards");
  if (response.status !== 200) {
    console.error(response, "resp");
    return null;
  }
  return response.data;
};
