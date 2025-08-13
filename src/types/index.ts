export interface Agent {
  id: string;
  name: string;
  company: string;
  companyTitle: string;
  tone: string;
  avatar: string | null;
}

export interface FormData {
  avatar: FileList;
  company: string;
  companyTitle: string;
  name: string;
  tone: string;
}

export interface TrainingData {
  id: string;
  title: string;
  dataOptions: {
    url: boolean;
    attachments: boolean;
    text: boolean;
  };
  mainDomains: string[];
  findRelatedLinks: boolean;
  attachments: FileList | null;
  text: string;
  privacySettings: {
    addToPublic: boolean;
    addToPrivate: boolean;
  };
}

export interface TrainingFormData {
  title: string;
  url: boolean;
  attachments: boolean;
  text: boolean;
  mainDomains: string[];
  findRelatedLinks: boolean;
  attachmentFiles: FileList;
  textContent: string;
  addToPublic: boolean;
  addToPrivate: boolean;
}