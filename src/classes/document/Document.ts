import DocumentFieldValue from '@/classes/document/DocumentFieldValue';
import DocumentScan from '@/classes/document/DocumentScan';
import DocumentType from '@/classes/document/DocumentType';
import IDocument from '@/interfaces/document/IDocument';
import IDocumentFieldValue from '@/interfaces/document/IDocumentFieldValue';
import IDocumentScan from '@/interfaces/document/IDocumentScan';
import IDocumentType from '@/interfaces/document/IDocumentType';
import IFile from '@/interfaces/files/IFile';
import IFileInfo from '@/interfaces/files/IFileInfo';

export default class Document implements IDocument {
  id?: string;
  name = '';
  order = 0;
  documentTypeId?: string;
  documentType: IDocumentType = new DocumentType();

  documentsScans: IDocumentScan[] = [];
  documentsScansForDelete: string[] = [];

  documentFieldValues: IDocumentFieldValue[] = [];

  constructor(i?: IDocument) {
    if (!i) {
      return;
    }
    this.id = i?.id;
    this.name = i.name;
    this.order = i.order;
    this.documentTypeId = i.documentTypeId;
    if (i.documentType) {
      this.documentType = new DocumentType(i.documentType);
    }
    if (i.documentsScans) {
      this.documentsScans = i.documentsScans.map((item: IDocumentScan) => new DocumentScan(item));
    }
    if (i.documentFieldValues) {
      this.documentFieldValues = i.documentFieldValues.map((item: IDocumentFieldValue) => new DocumentFieldValue(item));
    }
  }

  getFileInfos(): IFileInfo[] {
    return this.documentsScans.map((i: IDocumentScan) => i.getFileInfo());
  }

  getScan(): IFileInfo {
    return this.documentsScans[0].scan;
  }

  uploadScan(file: IFile): IFileInfo {
    const newDocScan = DocumentScan.CreateNewScan(file);
    this.documentsScans.push(newDocScan);
    return newDocScan.scan;
  }

  deleteScan(): IFileInfo {
    const fileForDelete = this.documentsScans[0];
    const idForDelete = fileForDelete.id;
    if (idForDelete) {
      this.documentsScansForDelete.push(idForDelete);
    }
    this.documentsScans.splice(0, 1);
    return fileForDelete.scan;
  }
}
