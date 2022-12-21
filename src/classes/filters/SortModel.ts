import { v4 as uuidv4 } from 'uuid';
import { LocationQuery } from 'vue-router';

import ISortModel from '@/interfaces/filters/ISortModel';
import { Orders } from '@/interfaces/filters/Orders';

export default class SortModel implements ISortModel {
  id?: string;
  table = '';
  col = '';
  order: Orders | undefined;
  label = '';
  default = false;

  static CreateSortModel(table: string, col: string, order?: Orders, label?: string, defaultModel?: boolean, code?: string): ISortModel {
    const model = new SortModel();
    model.id = uuidv4();
    model.table = table;
    model.col = col;
    model.order = order ?? Orders.Asc;
    model.label = label ?? '';
    model.default = defaultModel ?? false;
    return model;
  }

  isAsc(): boolean {
    return this.order === Orders.Asc;
  }

  isDesc(): boolean {
    return this.order === Orders.Desc;
  }

  toUrlQuery(): string {
    let url = '';
    Object.keys(this).forEach((el, i) => {
      const value: any = this[el as keyof typeof this];
      const isObj = typeof this[el as keyof typeof this] == 'object';
      if (value && value !== undefined && url !== '?' && !isObj) {
        if (i !== 0) url += '&';
        url += `sortm${el}=${value}`;
      }
    });
    return url;
  }

  fromUrlQuery(obj: LocationQuery): void {
    if (obj.sortmcol) {
      this.col = String(obj.sortmcol);
    }
    if (obj.sortmtable) {
      this.table = String(obj.sortmtable);
    }
    if (obj.sortmlabel) {
      this.label = String(obj.sortmlabel);
    }
    if (obj.sortmdefault !== undefined) {
      this.default = Boolean(obj.sortmdefault);
    }
    if (obj.sortmorder) {
      this.order = obj.sortmorder as Orders;
    }
  }
}
