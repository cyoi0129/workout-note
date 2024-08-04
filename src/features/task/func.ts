/**
 * 日付から文字列へ
 * @param date 
 * @returns 
 */
export const date2Str = (date: Date): string => {
  return date.toLocaleDateString().replace(/\//g, '-');
};

/**
 * 文字列から日付へ
 * @param str 
 * @returns 
 */
export const str2Date = (str: string): Date => {
  return new Date(str.replace(/-/g, '/'));
};

/**
 * グラフラベル日付へ変換
 * @param str 
 * @returns 
 */
export const str2LabelDate = (str: string): string => {
  const date = new Date(str.replace(/-/g, '/'));
  return (date.getMonth() + 1) + '/' + date.getDate();
};
