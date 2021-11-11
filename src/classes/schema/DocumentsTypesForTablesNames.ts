export default class DocumentsTypesForTablesNames {
  documentsTypesForVacancies = '';
  constructor(i?: DocumentsTypesForTablesNames) {
    if (!i) {
      return;
    }
    this.documentsTypesForVacancies = i.documentsTypesForVacancies;
  }

  createQueryParam(): string {
    return `?${this.documentsTypesForVacancies}`;
  }
}
