const upFirstLetter = require("./upFirstLetter");

test("Форматирование первого символа", () => {
  expect(upFirstLetter("soMe Text")).toEqual("Some text");
});
