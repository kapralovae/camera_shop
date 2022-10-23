import dayjs from 'dayjs';
import 'dayjs/locale/ru';


export const humanizeCommentDate = (dueDate: string) => {
  // const updateLocale = require('dayjs/plugin/updateLocale')
  // dayjs.extend(updateLocale);

  dayjs().locale('ru-bg');
  return dayjs(dueDate).format('D MMMM');
};
