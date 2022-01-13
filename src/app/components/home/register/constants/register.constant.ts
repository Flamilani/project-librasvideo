import { RegisterViewData } from "../interface/login.interface";

export const REGISTER_VIEW_DATA: RegisterViewData =
  {
    header: {
      title: "Fazer Cadastro",
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
