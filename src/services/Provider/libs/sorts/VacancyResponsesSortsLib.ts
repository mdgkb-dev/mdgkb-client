import SortModel from '@/classes/filters/SortModel';
import ISortModel from '@/interfaces/filters/ISortModel';
import { Orders } from '@/interfaces/filters/Orders';
import Provider from '@/services/Provider';

const VacancyResponsesSortsLib = (() => {
  function byDate(order?: Orders): ISortModel {
    return SortModel.CreateSortModel(
      Provider.schema.value.vacancyResponse.tableName,
      Provider.schema.value.vacancyResponse.date,
      order ? order : Orders.Asc,
      `По дате публикации ${order === Orders.Asc ? '(по возрастанию)' : '(по убыванию)'}`,
      order === Orders.Desc ? true : false
    );
  }

  function byTitle(order?: Orders): ISortModel {
    return SortModel.CreateSortModel(
      Provider.schema.value.vacancyResponse.tableName,
      Provider.schema.value.vacancyResponse.title,
      order ? order : Orders.Asc,
      `По названию вакансии ${order === Orders.Asc ? '(по возрастанию)' : '(по убыванию)'}`,
      false
    );
  }

  function byUserFullName(order?: Orders): ISortModel {
    return SortModel.CreateSortModel(
      Provider.schema.value.vacancyResponse.tableName,
      Provider.schema.value.vacancyResponse.fullName,
      order ? order : Orders.Asc,
      `По ФИО заявителя ${order === Orders.Asc ? '(по возрастанию)' : '(по убыванию)'}`
    );
  }

  function byUserEmail(order?: Orders): ISortModel {
    return SortModel.CreateSortModel(
      Provider.schema.value.vacancyResponse.tableName,
      Provider.schema.value.vacancyResponse.email,
      order ? order : Orders.Asc,
      `По email заявителя ${order === Orders.Asc ? '(по возрастанию)' : '(по убыванию)'}`
    );
  }

  return {
    byDate,
    byTitle,
    byUserFullName,
    byUserEmail,
  };
})();

export default VacancyResponsesSortsLib;
