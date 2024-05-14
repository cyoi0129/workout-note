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
  return new Date(str);
};
