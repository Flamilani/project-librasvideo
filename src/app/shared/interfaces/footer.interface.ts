export interface FooterData {
  footer: FooterViewData
}

export interface FooterViewData {
  title: string;
  description: string;
  contacts: Contact;
  terms: Terms;
}

export interface Contact {
  title: string;
  email: string;
  celular: string;
}

export interface Terms {
  term: string;
  urlTerm: string;
  policy: string;
  urlPolicy: string;
}
