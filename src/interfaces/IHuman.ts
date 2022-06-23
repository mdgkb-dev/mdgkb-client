import IContactInfo from '@/interfaces/contacts/IContactInfo';
import IFileInfo from '@/interfaces/files/IFileInfo';

export default interface IHuman {
  id?: string;
  name: string;
  surname: string;
  patronymic: string;
  snils: string;
  isMale: boolean;
  citizenship: string;
  placeBirth: string;
  dateBirth?: Date;
  slug: string;
  getFullName: () => string;

  photoId?: string;
  photo: IFileInfo;

  contactInfo: IContactInfo;
  sanitizeName: () => void;
}
