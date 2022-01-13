import { LoginViewData } from '../interface/login.interface';
export const LOGIN_VIEW_DATA: LoginViewData =
  {
    header: {
      title: "Fazer Login",
      iconUrl: ""
    },
      content: {
        label: "E-mail",
        input: {
          ariaLabel: "Preenche seu e-mail",
          inputMode: "email",
          type: "email"
        },
        errorMsg: "E-mail obrigatório"
      },
      footer: {
        description: "",
        btnAction: {
          id: "button-login",
          text: "Acessar",
        }
      }
  }
