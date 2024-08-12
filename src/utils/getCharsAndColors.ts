//Функция, которая получает ожидаемое слово,введенное пользователем слово и индикатор отображающий: является ли оно последним, возвращает массив объектов с цветом и символом
const getCharsAndColors = (
  expected: string,
  current: string,
  isLast: boolean
) => {
  const res = [];
  for (let i = 0; i < current.length; i++) {
    if (i >= expected.length) {
      res.push({ color: 'text-red-600', char: current[i] });
    } else if (current[i] === expected[i]) {
      res.push({ color: 'text-primary-400', char: current[i] });
    } else {
      res.push({ color: 'text-red-600', char: expected[i] });
    }
  }
  for (let i = current.length; i < expected.length; i++) {
    res.push({
      color: `${isLast ? 'text-slate-500' : 'text-red-800 underline'}`,
      char: expected[i],
    });
  }
  return res;
};
export default getCharsAndColors;