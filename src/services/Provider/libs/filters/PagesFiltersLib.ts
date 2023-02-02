import FilterModel from '@/classes/filters/FilterModel';
import Page from '@/classes/page/Page';
import { DataTypes } from '@/interfaces/filters/DataTypes';
import { Operators } from '@/interfaces/filters/Operators';
import ClassHelper from '@/services/ClassHelper';

const PagesFiltersLib = (() => {
  const modelName = 'page';
  function byPagesGroup(value: string): FilterModel {
    const filterModel = FilterModel.CreateFilterModelV2(modelName, ClassHelper.GetPropertyName(Page).pagesGroup, DataTypes.String);
    filterModel.operator = Operators.Eq;
    filterModel.label = value;
    filterModel.value1 = value;
    return filterModel;
  }

  return {
    byPagesGroup,
  };
})();

export default PagesFiltersLib;
