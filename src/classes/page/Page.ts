import CustomSection from '@/classes/CustomSection';
import PageComment from '@/classes/page/PageComment';
import PageDocument from '@/classes/page/PageDocument';
import PageImage from '@/classes/page/PageImage';
import PageSection from '@/classes/PageSection';
import PageSideMenu from '@/classes/PageSideMenu';
import IFileInfo from '@/interfaces/files/IFileInfo';
import IPageImage from '@/interfaces/page/IPageImage';
import ContactInfo from '@/services/classes/ContactInfo';
import ClassHelper from '@/services/ClassHelper';

export default class Page {
  id?: string;
  title = '';
  content = '';
  slug = '';
  pagesGroup = 'Без группы';
  link = '';
  withComments = false;
  showContacts = false;
  collaps = false;
  showContent = false;
  @ClassHelper.GetClassConstructor(PageImage)
  pageImages: PageImage[] = [];
  pageImagesForDelete: string[] = [];
  pageImagesNames: string[] = [];
  @ClassHelper.GetClassConstructor(PageSideMenu)
  pageSideMenus: PageSideMenu[] = [];
  pageSideMenusForDelete: string[] = [];
  @ClassHelper.GetClassConstructor(PageSection)
  pageSections: PageSection[] = [];
  pageSectionsForDelete: string[] = [];
  @ClassHelper.GetClassConstructor(PageDocument)
  pageDocuments: PageDocument[] = [];
  @ClassHelper.GetClassConstructor(PageComment)
  pageComments: PageComment[] = [];
  contactInfo: ContactInfo = new ContactInfo();
  contactInfoId?: string;

  constructor(i?: Page) {
    ClassHelper.BuildClass(this, i);
  }

  getLink(): string {
    if (this.slug !== '') {
      return `/pages/${this.slug}`;
    }
    return '404';
  }

  getFileInfos(): IFileInfo[] {
    const fileInfos: IFileInfo[] = [];
    this.pageSideMenus.forEach((item: PageSideMenu) => {
      fileInfos.push(...item.getFileInfos());
    });
    this.pageDocuments.forEach((pageDocument: PageDocument) => {
      if (pageDocument.document.scan) {
        fileInfos.push(pageDocument.document.scan);
      }
    });
    this.pageImages.forEach((pageImage: IPageImage) => {
      if (pageImage.fileInfo) {
        fileInfos.push(pageImage.fileInfo);
      }
    });
    return fileInfos;
  }

  addSideMenu(): void {
    const menu = new PageSideMenu();
    menu.order = this.pageSideMenus.length - 1;
    this.pageSideMenus.push(menu);
  }

  selectSideMenu(id: string): void {
    if (!id && this.pageSideMenus.length > 0) {
      this.pageSideMenus[0].selected = true;
      return;
    }
    this.pageSideMenus.forEach((m: PageSideMenu) => (m.selected = m.id === id));
  }

  getSelectedSideMenu(): PageSideMenu {
    const selectedMenu = this.pageSideMenus.find((m: PageSideMenu) => m.selected);
    return selectedMenu ? selectedMenu : new PageSideMenu();
  }

  addCustomSectionsToSideMenu(customSections: CustomSection[]): void {
    customSections.forEach((c: CustomSection) => {
      const menu = new PageSideMenu();
      menu.id = c.id;
      menu.name = c.name;
      if (typeof c.order !== 'undefined') {
        this.pageSideMenus.splice(c.order, 0, menu);
      } else {
        this.pageSideMenus.push(menu);
      }
    });
  }

  getPageSideMenus(): PageSideMenu[] {
    if (this.showContacts && !this.pageSideMenus.find((el) => el.id === 'contacts')) {
      const contactSideMenu = new PageSideMenu();
      contactSideMenu.id = 'contacts';
      contactSideMenu.name = 'Контакты';
      this.pageSideMenus.push(contactSideMenu);
    }
    return this.pageSideMenus;
  }
}
