export interface ForgotViewData {
  header: ForgotViewHeader;
  content: ForgotViewContent[];
  footer: ForgotViewFooter;
}

export interface ForgotViewHeader {
  title: string;
  iconUrl?: string;
}

export interface ForgotViewContent {
  label: string;
  input: ForgotViewInput;
  errorMsg: string;
}

export interface ForgotViewInput {
  ariaLabel: string;
  inputMode: string;
  type: string;
  control: string;
  inputMask?: string;
}

export interface ForgotViewFooter {
  description: string;
  btnAction: ForgotViewBtnAction;
}

export interface ForgotViewBtnAction {
  id: string;
  text: string;
}
