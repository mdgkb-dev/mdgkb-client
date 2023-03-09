import Employee from '@/classes/Employee';
import FilterModel from '@/services/classes/filters/FilterModel';
import Teacher from '@/classes/Teacher';
import { DataTypes } from '@/services/interfaces/DataTypes';
import IFilterModel from '@/services/interfaces/IFilterModel';
import { Operators } from '@/services/interfaces/Operators';
import ClassHelper from '@/services/ClassHelper';
import { Orders } from '@/services/interfaces/Orders';
import Provider from '@/services/Provider/Provider';

const TeachersFiltersLib = (() => {
  const modelName = 'teacher';
  function onlyMale(): FilterModel {
    const filterModel = FilterModel.CreateFilterModelV2(modelName, ClassHelper.GetPropertyName(Teacher).isMale, DataTypes.Boolean);
    filterModel.boolean = true;
    filterModel.operator = Operators.Eq;
    filterModel.label = 'Мужской';
    return filterModel;
  }

  function onlyFemale(): FilterModel {
    const filterModel = FilterModel.CreateFilterModelV2(modelName, ClassHelper.GetPropertyName(Teacher).isMale, DataTypes.Boolean);
    filterModel.boolean = false;
    filterModel.operator = Operators.Eq;
    filterModel.label = 'Женский';
    return filterModel;
  }

  function byFullName(): FilterModel {
    const filterModel = FilterModel.CreateFilterModelV2(modelName, ClassHelper.GetPropertyName(Teacher).fullName, DataTypes.String);
    filterModel.operator = Operators.Eq;
    filterModel.label = 'По ФИО';
    return filterModel;
  }

  return {
    onlyMale,
    onlyFemale,
    byFullName,
  };
})();

export default TeachersFiltersLib;
