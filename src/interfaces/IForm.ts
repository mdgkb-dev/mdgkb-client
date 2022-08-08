import IField from '@/interfaces/IField';
import IFormValueFile from '@/interfaces/IFormValueFile';

import IFileInfo from './files/IFileInfo';
import ICandidateApplication from './ICandidateApplication';
import IChild from './IChild';
import IDpoApplication from './IDpoApplication';
import IFieldValue from './IFieldValue';
import IFormStatus from './IFormStatus';
import IFormStatusGroup from './IFormStatusGroup';
import IPostgraduateApplication from './IPostgraduateApplication';
import IResidencyApplication from './IResidencyApplication';
import IUser from './IUser';
import IVisitsApplication from './IVisitsApplication';
import IVacancyResponse from './vacancyResponse/IVacancyResponse';

export default interface IForm {
  id?: string;
  title?: string;
  modComment?: string;
  code: string;
  emailNotify: boolean;
  description: string;
  fields: IField[];
  fieldsForDelete: string[];
  fieldValues: IFieldValue[];
  formStatus: IFormStatus;
  approvingDate?: Date;
  fieldValuesForDelete: string[];
  validated?: boolean;
  createdAt?: Date;
  isNew: boolean;
  viewedByUser: boolean;
  user: IUser;
  dpoApplication?: IDpoApplication;
  defaultFormStatus?: IFormStatus;
  defaultFormStatusId?: string;
  formStatusGroup?: IFormStatusGroup;
  formStatusGroupId?: string;
  child: IChild;
  childId?: string;
  personalDataAgreement?: IFileInfo;
  personalDataAgreementId?: string;
  withPersonalDataAgreement: boolean;
  agreedWithPersonalDataAgreement: boolean;
  showPersonalDataAgreementError: boolean;
  formValueFiles: IFormValueFile[];
  formValueFilesForDelete: string[];
  postgraduateApplication?: IPostgraduateApplication;
  candidateApplication?: ICandidateApplication;
  residencyApplication?: IResidencyApplication;
  visitsApplication?: IVisitsApplication;
  vacancyResponse?: IVacancyResponse;

  addField: (field?: IField) => void;
  removeField: (index: number) => void;
  getFileInfos: () => IFileInfo[];
  getFieldValuesFileInfos: () => IFileInfo[];
  initFieldsValues: () => void;
  getFieldValue: (field: IField) => string | number | Date | IFileInfo | boolean | undefined;
  findFieldValue: (fieldId: string) => IFieldValue | undefined;
  validate: (withoutFiles?: boolean) => void;
  getErrorFields: () => IFieldValue[];
  getErrorMessage: () => string;
  clearIds: () => void;
  removeAllFieldsAndValues: () => void;
  applyFormPatternFields: (pattern: IForm) => void;
  isFieldValuesModChecked: () => boolean;
  haveModComments: () => boolean;
  changeFieldValuesModChecked: (modChecked: boolean) => void;
  // setNewStatus: (statuses: IFormStatus[]) => void;
  setCpecifyStatus: (statuses: IFormStatus[]) => void;
  setStatus: (status: IFormStatus, statuses: IFormStatus[]) => void;
  updateViewedByUser: (initialStatus: IFormStatus) => void;
  clearValidate: () => void;
  getApplicationType: () => string;
  getApplicationTypeLink: () => string;
  getApplicationName: () => string;
  getApplicationNameLink: () => string;
  getRequiredForCancelFields: () => IField[];
  getFieldsByCodes: (codes: string[]) => IField[];
  clearAllFields: () => void;
  addForValueFile: () => void;
}
