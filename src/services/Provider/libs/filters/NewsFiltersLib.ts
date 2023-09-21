import FilterModel from '@/services/classes/filters/FilterModel';
import { DataTypes } from '@/services/interfaces/DataTypes';
import IFilterModel from '@/services/interfaces/IFilterModel';
import { Operators } from '@/services/interfaces/Operators';
import Provider from '@/services/Provider/Provider';

const NewsFiltersLib = (() => {
  function onlyPublished(): IFilterModel {
    const onlyPublished = FilterModel.CreateFilterModel(
      Provider.schema.value.news.tableName,
      Provider.schema.value.news.publishedOn,
      DataTypes.Date
    );
    const now = new Date();
    now.setTime(now.getTime() + 3 * 60 * 60 * 1000);

    onlyPublished.date1 = now;
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

  function withoutDrafts(): IFilterModel {
    const filterModel = FilterModel.CreateFilterModel(
      Provider.schema.value.news.tableName,
      Provider.schema.value.news.isDraft,
      DataTypes.Boolean
    );
    filterModel.boolean = false;
    filterModel.label = 'Без черновиков';
    return filterModel;
  }

  function withDrafts(): IFilterModel {
    const filterModel = FilterModel.CreateFilterModel(
      Provider.schema.value.news.tableName,
      Provider.schema.value.news.isDraft,
      DataTypes.Boolean
    );
    filterModel.boolean = true;
    filterModel.label = 'Только черновики';
    return filterModel;
  }

  return {
    filterByTags,
    excludeSlug,
    onlyPublished,
    withoutDrafts,
    withDrafts,
  };
})();

export default NewsFiltersLib;
