export function cleanDescription(description: string) {
  const strippedHtml = description.replace(/(<([^>]+)>)/gi, '');

  return strippedHtml;
}
//test
