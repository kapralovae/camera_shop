export const COUNT_CARDS_ON_PAGE = 9;

export const COUNT_SHOW_COMMENTS = 3;

export enum CountStarsSvg {
  One = 1,
  Two = 2,
  Three = 3,
  Four = 4,
  Five = 5,
}

export function getNumberPage(currentPage: number, countPage:number) {
  const numbersPages = [];
  if (currentPage === 1) {
    numbersPages.push(currentPage, currentPage + 1, currentPage + 2);
    return numbersPages;
  }
  if (currentPage > 1 && currentPage < countPage) {
    numbersPages.push(currentPage - 1, currentPage, currentPage + 1);
    return numbersPages;
  }
  if (currentPage === countPage) {
    numbersPages.push(currentPage - 2, currentPage - 1, currentPage);
    return numbersPages;
  }
}
