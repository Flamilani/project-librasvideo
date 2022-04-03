export interface RegisterViewData {
  header: RegisterViewHeader;
  content: RegisterViewContent[];
  footer: RegisterViewFooter[];
}

export interface RegisterViewHeader {
  title: string;
  iconUrl?: string;
}

export interface RegisterViewContent {
  label: string;
  input: RegisterViewInput;
  errorMsg: string;
}

export interface RegisterViewInput {
  ariaLabel: string;
  inputMode: string;
  type: string;
  control: string;
  inputMask?: string;
}

export interface RegisterViewFooter {
  description: string;
  btnAction: RegisterViewBtnAction;
}

export interface RegisterViewBtnAction {
  id: string;
  text: string;
}
