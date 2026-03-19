import dayjs from 'dayjs';

export const DEFAULT_FORMAT = 'DD.MM.YYYY';

export class DateUtils {
  static format(
    date: string | Date,
    formatStr: string = DEFAULT_FORMAT
  ): string {
    return dayjs(date).format(formatStr);
  }
}
