import { v4 as uuidv4 } from 'uuid';

import DocumentTypeImage from '@/classes/DocumentTypeImage';
import FileInfo from '@/classes/File/FileInfo';
import Page from '@/classes/page/Page';
import PageSectionDocument from '@/classes/PageSectionDocument';
import PageSideMenu from '@/classes/PageSideMenu';
import IElementPlusFile from '@/interfaces/files/IElementPlusFile';
import IFileInfo from '@/interfaces/files/IFileInfo';
import IPageSection from '@/interfaces/IPageSection';
import IPageSectionDocument from '@/interfaces/IPageSectionDocument';
import IPageSectionImage from '@/interfaces/IPageSectionImage';
import IPageSideMenu from '@/interfaces/IPageSideMenu';
import IPage from '@/interfaces/page/IPage';

export default class PageSection implements IPageSection {
  id?: string;
  name = '';
  singleScan = false;
  scan?: IFileInfo;
  scanId?: string;
  order = 0;
  description = '';
  scans: IFileInfo[] = [];
  scansForDelete: string[] = [];

  pageSectionDocuments: IPageSectionDocument[] = [];
  pageSectionsDocumentsForDelete: string[] = [];

  pageSectionImages: IPageSectionImage[] = [];
  pageSectionImagesForDelete: string[] = [];

  pageSideMenu: IPageSideMenu = new PageSideMenu();
  pageSideMenuId?: string;
  page: IPage = new Page();
  pageId?: string;

  constructor(i?: IPageSection) {
    if (!i) {
      return;
    }
    this.id = i?.id;
    this.name = i?.name ?? '';
    this.singleScan = i.singleScan;
    this.order = i.order;
    this.description = i.description;
    if (i.scan) {
      this.scan = new FileInfo(i.scan);
    }
    this.scanId = i.scanId;
    if (i.pageSideMenu) {
      this.pageSideMenu = new PageSideMenu(i.pageSideMenu);
    }
    this.pageSideMenuId = i.pageSideMenuId;
    if (i.page) {
      this.page = new Page(i.page);
    }
    this.pageId = i.pageId;
    if (i.pageSectionDocuments) {
      this.pageSectionDocuments = i.pageSectionDocuments.map((item: IPageSectionDocument) => new PageSectionDocument(item));
    }
    if (i.pageSectionImages) {
      this.pageSectionImages = i.pageSectionImages.map((item: IPageSectionImage) => new DocumentTypeImage(item));
    }

    if (i.scans) {
      this.scans = i.scans.map((item: IFileInfo) => new FileInfo(item));
    }
  }

  addFile(file: IElementPlusFile): void {
    if (!this.scan) {
      this.scan = new FileInfo();
    }
    if (!this.scan.id) {
      this.scan.id = uuidv4();
    }
    this.scan.originalName = file.name;
    this.scan.file = file.raw;
  }
  addDocument(): void {
    this.pageSectionDocuments.push(new PageSectionDocument());
  }
  removeDocument(index: number): void {
    const idForDelete = this.pageSectionDocuments[index].id;
    if (idForDelete) {
      this.pageSectionsDocumentsForDelete.push(idForDelete);
    }
    this.pageSectionDocuments.splice(index, 1);
  }
  // findDocument();

  getFileInfos(): IFileInfo[] {
    const fileInfos: IFileInfo[] = [];
    this.pageSectionDocuments.forEach((i: IPageSectionDocument) => {
      fileInfos.push(...i.getFileInfos());
    });
    this.pageSectionImages.forEach((i: IPageSectionImage) => {
      fileInfos.push(i.fileInfo);
    });
    return fileInfos;
  }
  addDocumentTypeImage(): void {
    this.pageSectionImages.push(new DocumentTypeImage());
  }
}