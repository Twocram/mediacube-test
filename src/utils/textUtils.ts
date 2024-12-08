export const pluralizeText = (count: number, text: string) =>
  `${text}${count > 1 || count === 0 ? 's' : ''}`
