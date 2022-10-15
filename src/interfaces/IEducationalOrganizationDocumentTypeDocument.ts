import IDocumentType from '@/interfaces/IDocumentType';
import IEducationalOrganizationDocumentType from '@/interfaces/IEducationalOrganizationDocumentType';

export default interface IEducationalOrganizationDocumentTypeDocument {
  id?: string;

  document: IDocumentType;
  documentId?: string;

  educationalOrganizationDocumentType: IEducationalOrganizationDocumentType;
  educationalOrganizationDocumentTypeId?: string;
}
