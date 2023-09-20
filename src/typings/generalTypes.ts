/**
 * @param T тип/интерфейс, вложенность которого хотим видеть
 * @returns вложенные свойства
 */
export type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};