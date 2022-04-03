import { RegisterViewData } from "../interface/register.interface";

export const REGISTER_VIEW_DATA: RegisterViewData =
{
  header: {
    title: "Fazer Cadastro",
    iconUrl: ""
  },
  content: [
    {
      label: "Nome Completo",
      input: {
        ariaLabel: "Preenche seu seu nome completo",
        inputMode: "text",
        type: "text",
        control: "name"
      },
      errorMsg: "Nome Completo obrigatório"
    },
    {
      label: "Número de Celular",
      input: {
        ariaLabel: "Preenche seu número de celular",
        inputMode: "tel",
        type: "tel",
        control: "celular"
      },
      errorMsg: "Celular obrigatório"
    },
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
    },
    {
      label: "Confirmar Senha",
      input: {
        ariaLabel: "Confirme sua senha",
        inputMode: "",
        type: "password",
        control: "confirmPassword"
      },
      errorMsg: "Senha não corresponde"
    }
  ],
  footer: [
    {
    description: "",
    btnAction: {
      id: "button-register",
      text: "Cadastrar",
    }
  },
  {
    description: "Já é Usuário?",
    btnAction: {
      id: "button-logar",
      text: "Logar",
    }
  }
]
}
