export interface Certificate {
  serialNumber: string;
  startDate: Date;
  endDate: Date;
  subject: Subject;
  issuer: Issuer;
  x509Certificate: any;
  alias: string;
}

export interface Subject {
  privateKey: any;
  publicKey: any;
  x500Name: any;
}

export interface Issuer {
  privateKey: any;
  publicKey: any;
  x500Name: any;
}
