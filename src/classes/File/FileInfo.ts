import { v4 as uuidv4 } from 'uuid';

import IFile from '@/interfaces/files/IFile';
import IFileInfo from '@/interfaces/files/IFileInfo';
import IFilesList from '@/interfaces/files/IFIlesList';

export default class FileInfo implements IFileInfo {
  id?: string;
  originalName = '';
  fileSystemPath;
  category?;
  file?: Blob;

  constructor(i?: IFileInfo) {
    if (!i) return;

    this.id = i.id;
    this.originalName = i.originalName;
    this.fileSystemPath = i.fileSystemPath;
    this.category = i.category;
    this.file = i.file;
  }

  getImageUrl(): string {
    return `${process.env.VUE_APP_STATIC_URL}/${this.fileSystemPath}`;
  }

  getFileListObject(): IFilesList {
    return { name: this.originalName, url: this.getImageUrl() };
  }

  static CreatePreviewFile(file: IFile, category: string, id?: string): IFileInfo {
    const fileInfo = new FileInfo();
    fileInfo.id = id;
    fileInfo.originalName = file.name;
    fileInfo.file = file.blob;
    fileInfo.fileSystemPath = uuidv4();
    fileInfo.category = category;
    return fileInfo;
  }

  static CreatePreviewFileWithoutNewFilePath(file: IFile, category: string, id?: string): IFileInfo {
    const fileInfo = new FileInfo();
    fileInfo.id = id;
    fileInfo.originalName = file.name;
    fileInfo.file = file.blob;
    fileInfo.category = category;
    return fileInfo;
  }

  static CreateFileInfo(file: IFile): IFileInfo {
    const fileInfo = new FileInfo();
    fileInfo.originalName = file.name;
    fileInfo.file = file.raw;
    return fileInfo;
  }
}
