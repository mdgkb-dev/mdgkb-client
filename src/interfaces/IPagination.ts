import ICursor from '@/interfaces/ICursor';

export default interface IPagination {
  cursorMode: boolean;
  cursor: ICursor;
  limit: number;
  offset: number;
  append: boolean;
  setLoadMore: (lastCursor: string, column: string, table: string) => void;
}
