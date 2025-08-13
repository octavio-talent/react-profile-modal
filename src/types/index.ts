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