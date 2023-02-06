import Page from '@/classes/page/Page';
import IFileInfo from '@/interfaces/files/IFileInfo';
import IFiler from '@/interfaces/files/IFiler';
import IOrdered from '@/interfaces/IOrdered';
import ICrud from '@/interfaces/shared/ICrud';

export default interface ISubMenu extends IFiler, IOrdered {
  id?: string;
  name: string;
  link: string;
  menuId?: string;
  selected: boolean;
  editMode: boolean;
  hide: boolean;
  color: string;
  background: string;

  page: Page;
  pageId?: string;

  isPageLink: () => boolean;
  isLink: () => boolean;

  getLink: () => string;

  iconId?: string;
  icon: IFileInfo;
  iconName: string;
  svgCode: string;

  crud: ICrud;
}
