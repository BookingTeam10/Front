export interface CertificateRequest {
  id: number,
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  organization: string,
  country: string,
  publicKeyString: string,
  publicKey:any,
  role: string
}
