import IFileInfo from './files/IFileInfo';
import IField from './IField';

export default interface IFieldValue {
  id?: string;
  fieldId?: string;
  valueString?: string;
  valueNumber?: number;
  modChecked?: boolean;
  modComment?: string;
  valueDate?: Date;
  eventApplicationId?: string;
  file?: IFileInfo;
  fileId?: string;
  field?: IField;
  showError?: boolean;
  errorText?: string;

  validate: () => void;
  clearIds: () => void;
}
