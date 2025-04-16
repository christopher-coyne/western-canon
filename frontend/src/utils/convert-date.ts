export const convertDate = (date: number, approx: boolean | null) => {
  const isApprox = approx ? "c." : "";
  if (date < 0) {
    return `${isApprox} ${Math.abs(date)} BC`;
  }
  return `${isApprox} ${Math.abs(date)}`;
};
