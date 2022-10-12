import FilterModel from '@/classes/filters/FilterModel';
import { DataTypes } from '@/interfaces/filters/DataTypes';
import IFilterModel from '@/interfaces/filters/IFilterModel';
import { Operators } from '@/interfaces/filters/Operators';
import Provider from '@/services/Provider';

const NewsFiltersLib = (() => {
  function onlyPublished(): IFilterModel {
    const onlyPublished = FilterModel.CreateFilterModel(
      Provider.schema.value.news.tableName,
      Provider.schema.value.news.publishedOn,
      DataTypes.Date
    );
    onlyPublished.date1 = new Date();
    onlyPublished.operator = Operators.Lt;
    return onlyPublished;
  }

  function excludeSlug(slug: string): IFilterModel {
    const sf = FilterModel.CreateFilterModel(Provider.schema.value.news.tableName, Provider.schema.value.news.slug, DataTypes.String);
    sf.value1 = slug;
    sf.operator = Operators.Ne;
    return sf;
  }

  function filterByTags(tagsIdSet: string[]): IFilterModel {
    const filterModel: IFilterModel = FilterModel.CreateFilterModelWithJoin(
      Provider.schema.value.news.tableName,
      Provider.schema.value.news.id,
      Provider.schema.value.newsToTag.tableName,
      Provider.schema.value.newsToTag.id,
      Provider.schema.value.newsToTag.newsId,
      DataTypes.Join,
      Provider.schema.value.newsToTag.id,
      Provider.schema.value.newsToTag.tagId
    );
    filterModel.operator = Operators.In;
    filterModel.set = tagsIdSet;
    return filterModel;
  }

  function onlyDivisions(): IFilterModel {
    const filterModel = FilterModel.CreateFilterModel(
      Provider.schema.value.division.tableName,
      Provider.schema.value.division.isCenter,
      DataTypes.Boolean
    );
    filterModel.boolean = false;
    filterModel.operator = Operators.Eq;
    filterModel.label = 'Отделения';
    return filterModel;
  }

  function onlyCenters(): IFilterModel {
    const filterModel = FilterModel.CreateFilterModel(
      Provider.schema.value.division.tableName,
      Provider.schema.value.division.isCenter,
      DataTypes.Boolean
    );
    filterModel.boolean = true;
    filterModel.operator = Operators.Eq;
    filterModel.label = 'Центры';
    return filterModel;
  }

  return {
    filterByTags,
    excludeSlug,
    onlyPublished,
    onlyDivisions,
    onlyCenters,
  };
})();

export default NewsFiltersLib;
