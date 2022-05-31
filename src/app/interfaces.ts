export interface IncidentRow {
  key: string,
  no: number;
  category: string;
  subject: string;
  status: string;
  createdBy: string;
}

export interface RaiseIncident {
  no: number;
  category: string;
  subject: string;
  description: string;
  status: string;
  createdBy: string;
  other: string;
}

export interface IncidentDetails {
  key: string,
  no: number;
  category: string;
  subject: string;
  description: string;
  status: string;
  createdBy: string;
  remarks: RemarksRow[];
}

export interface SubmitRemarks {
  status: string;
  remarks: string;
  user: string;
  date: number;
}

export interface RemarksRow {
  key: string;
  status: string;
  remarks: string;
  user: string;
  date: number;
}

export interface Profile {
  firstName: string;
  middleName: string;
  lastName: string;
  contactNo: string;
  role: string;
  email: string;
}

export interface UserRole {
  uid: string;
  role: string;
  email: string;
}


