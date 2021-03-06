import FilterModel from '@/classes/filters/FilterModel';
import { DataTypes } from '@/interfaces/filters/DataTypes';
import IFilterModel from '@/interfaces/filters/IFilterModel';
import { Operators } from '@/interfaces/filters/Operators';
import Provider from '@/services/Provider';

const VisitsApplicationsFiltersLib = (() => {
  function byStatus(): IFilterModel {
    const filterModel = FilterModel.CreateFilterModel(
      Provider.schema.value.visitsApplication.tableName,
      Provider.schema.value.visitsApplication.formStatusId,
      DataTypes.Set
    );
    filterModel.operator = Operators.In;
    return filterModel;
  }

  // function byCarNumber(order?: Orders): ISortModel {
  //   return SortModel.CreateSortModel(
  //     Provider.schema.value.visitsApplication.tableName,
  //     Provider.schema.value.visitsApplication.,
  //     order ? order : Orders.Asc,
  //     `По дате публикации ${order === Orders.Asc ? '(по возрастанию)' : '(по убыванию)'}`,
  //     order === Orders.Desc ? true : false
  //   );
  // }

  return {
    byStatus,
  };
})();

export default VisitsApplicationsFiltersLib;
