import DishesGroup from '@/classes/DishesGroup';
import FileInfo from '@/classes/File/FileInfo';
import IFileInfo from '@/interfaces/files/IFileInfo';
import ClassHelper from '@/services/ClassHelper';

export default class DishSample {
  id?: string;
  name = '';
  price = 0;
  order = 0;
  weight = 0;
  caloric = 0;
  quantity = 0;
  additionalWeight = 0;
  dishesGroupId?: string;
  selected = false;
  image: IFileInfo = new FileInfo();
  imageId?: string;
  updatedAt?: Date = new Date();
  proteins = 0;
  fats = 0;
  carbohydrates = 0;
  dietary = false;
  lean = false;
  composition = '';
  description = '';

  constructor(i?: DishSample) {
    ClassHelper.BuildClass(this, i);
  }

  removeImage(): void {
    this.image = new FileInfo();
    this.imageId = undefined;
  }

  getFileInfos(): IFileInfo[] {
    return [this.image];
  }
}
