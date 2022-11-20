import DailyMenuItem from '@/classes/DailyMenuItem';
import DishesGroup from '@/classes/DishesGroup';
import IDailyMenu from '@/interfaces/IDailyMenu';
import IDailyMenuItem from '@/interfaces/IDailyMenuItem';
import IDishesGroup from '@/interfaces/IDishesGroup';
import IDishSample from '@/interfaces/IDishSample';
import removeFromClass from '@/services/removeFromClass';

export default class DailyMenu implements IDailyMenu {
  id?: string;
  date = new Date();
  dailyMenuItems: IDailyMenuItem[] = [];
  dailyMenuItemsForDelete: string[] = [];
  dishesGroups: IDishesGroup[] = [];
  constructor(i?: IDailyMenu) {
    if (!i) {
      return;
    }
    this.id = i.id;
    if (i.date) {
      this.date = new Date(i.date);
    }
    if (i.dailyMenuItems) {
      this.dailyMenuItems = i.dailyMenuItems.map((item: IDailyMenuItem) => new DailyMenuItem(item));
    }
  }

  addDishesFromSamples(dishesSamples: IDishSample[]): void {
    dishesSamples.forEach((ds: IDishSample) => {
      const item = DailyMenuItem.CreateFromSample(ds);
      item.dailyMenuId = this.id;
      this.dailyMenuItems.push(item);
    });
    this.groupDishes();
  }

  groupDishes(): void {
    this.dishesGroups = [];
    this.dailyMenuItems.forEach((i: IDailyMenuItem) => {
      const dishesGroup = this.dishesGroups.find((g: IDishesGroup) => g.id === i.dishSample.dishesGroupId);
      if (dishesGroup) {
        dishesGroup.dailyMenuItems.push(i);
      } else {
        const group = new DishesGroup(i.dishSample.dishesGroup);
        this.dishesGroups.push(group);
        group.dailyMenuItems.push(i);
      }
    });
    this.dishesGroups.sort((g1: IDishesGroup, g2) => g1.order - g2.order);
  }

  removeMenuItem(id: string): void {
    const index = this.dailyMenuItems.findIndex((d: IDailyMenuItem) => d.id === id);
    removeFromClass(index, this.dailyMenuItems, this.dailyMenuItemsForDelete);
    this.groupDishes();
  }
}
