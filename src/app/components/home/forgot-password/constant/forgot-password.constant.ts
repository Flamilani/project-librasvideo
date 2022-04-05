import { ForgotViewData } from "../interface/forgot-password.interface";


export const FORGOT_VIEW_DATA: ForgotViewData =
{
  header: {
    title: "Recuperar sua Senha",
    iconUrl: ""
  },
  content: [
    {
      label: "E-mail",
      input: {
        ariaLabel: "Preenche seu e-mail",
        inputMode: "email",
        type: "email",
        control: "email"
      },
      errorMsg: "E-mail obrigatório"
    }
  ],
  footer: {
    description: "",
    btnAction: {
      id: "button-send",
      text: "Enviar",
    }
  }
}
