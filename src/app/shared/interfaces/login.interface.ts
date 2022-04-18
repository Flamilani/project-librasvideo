export interface LoginViewData {
  header: LoginViewHeader;
  content: LoginViewContent[];
  footer: LoginViewFooter;
}

export interface LoginViewHeader {
  title: string;
  iconUrl?: string;
}

export interface LoginViewContent {
  label: string;
  input: LoginViewInput;
  errorMsg: string;
}

export interface LoginViewInput {
  ariaLabel: string;
  inputMode: string;
  type: string;
  control: string;
  inputMask?: string;
}

export interface LoginViewFooter {
  description: string;
  btnAction: LoginViewBtnAction;
}

export interface LoginViewBtnAction {
  id: string;
  text: string;
}
