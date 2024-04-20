export interface CertificateRequest {
  id: number,
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  organization: string,
  country: string,
  publicKey: string, // PublicKey će biti pretvoren u string, ili može biti null ako ne postoji javni ključ
  role: string
}
