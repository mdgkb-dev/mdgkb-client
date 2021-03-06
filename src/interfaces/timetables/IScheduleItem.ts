export default interface IScheduleItem {
  id?: string;
  name: string;
  startTime: string;
  endTime: string;

  getPeriodWithName: () => string;
  getPeriod: () => string;
  isNow: () => boolean;
  getTime: (dateString: string) => string;
}
