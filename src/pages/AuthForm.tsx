import React from "react";
import { FieldConfig, useGeneratedAntForm } from "../hooks/useGeneratedAntForm";
import { t } from "i18next";

type Props = {
  isLogin?: boolean;
  onSubmit: (values: any) => void;
};

const AuthForm: React.FC<Props> = ({ isLogin = true, onSubmit }) => {
  const fields: FieldConfig[] = [
    {
      name: "email",
      label: "Email",
      type: "input",
      required: true,
      placeholder: "you@example.com",
    },
    {
      name: "password",
      label: "Password",
      type: "password",
      required: true,
      placeholder: "Your password",
    },
  ];

  if (!isLogin) {
    fields.unshift({
      name: "username",
      label: "Username",
      type: "input",
      required: true,
      placeholder: "Pick a username",
    });
  }

  const { GeneratedForm } = useGeneratedAntForm({
    fields,
    buttonLabel: isLogin ? t("login") : t("signup"),
    onSubmit,
  });

  return <GeneratedForm />;
};

export default AuthForm;
