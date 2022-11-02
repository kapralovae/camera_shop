import dayjs from 'dayjs';
import 'dayjs/locale/ru';


export const humanizeCommentDate = (dueDate: string) => {
  dayjs().locale('ru-bg');
  return dayjs(dueDate).format('D MMMM');
};
