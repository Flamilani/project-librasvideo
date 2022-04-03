import { LoginViewData } from '../interface/login.interface';

export const LOGIN_VIEW_DATA: LoginViewData =
{
  header: {
    title: "Fazer Login",
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
    },
    {
      label: "Senha",
      input: {
        ariaLabel: "Preenche sua senha",
        inputMode: "",
        type: "password",
        control: "password"
      },
      errorMsg: "Senha obrigatória"
    }
  ],
  footer: {
    description: "",
    btnAction: {
      id: "button-login",
      text: "Acessar",
    }
  }
}
