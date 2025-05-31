import { useMutation } from "@tanstack/react-query";
import { Grid } from "antd";
import { t } from "i18next";
import React from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "../api/authServices";
import { uploadProfilePictureToSupabase } from "../api/uploadProfilePictureToSupabase";
import { useAuth } from "../context/AuthContext";
import { FieldConfig, useGeneratedAntForm } from "../hooks/useGeneratedAntForm";
import { useGlobalNotification } from "../providers/GlobalNotificationProvider";

type Props = {
  isLogin?: boolean;
  onAfterSignup?: () => void;
};

const AuthForm: React.FC<Props> = ({ isLogin = true, onAfterSignup }) => {
  const navigate = useNavigate();
  const screens = Grid.useBreakpoint();
  const api = useGlobalNotification();
  const { login } = useAuth();

  const fields: FieldConfig[] = [
    {
      name: "username",
      label: t("username"),
      type: "input",
      required: true,
      placeholder: "Pick a username",
    },
    {
      name: "password",
      label: t("password"),
      type: "password",
      required: true,
      placeholder: "Your password",
    },
  ];

  if (!isLogin) {
    fields.push(
      {
        name: "confirmPassword",
        label: t("confirmPassword"),
        type: "password",
        required: true,
        placeholder: "Confirm your password",
      },
      {
        name: "fullName",
        label: t("fullName"),
        type: "input",
        required: true,
        placeholder: "Your full name",
      },
      {
        name: "bio",
        label: t("bio"),
        type: "textarea",
        required: false,
        placeholder: "Enter a short bio",
      },
      {
        name: "email",
        label: t("email"),
        type: "input",
        required: true,
        placeholder: "you@example.com",
      },
      {
        name: "role",
        label: t("accountType"),
        type: "select",
        required: true,
        placeholder: "e.g. Artist, User",
        options: [
          { value: "artist", label: "Artist" },
          { value: "user", label: "User" },
        ],
      },
      {
        name: "profile_picture",
        label: "Profile Picture",
        type: "upload",
        required: false,
      }
    );
  }

  const loginMutation = useMutation({
    mutationFn: async (values: any) => {
      await login(values);
    },
    onSuccess: () => {
      api.success({
        message: "Login Successful",
        description: "You have been logged in.",
        pauseOnHover: false,
      });
      setTimeout(() => navigate("/", { replace: true }), 500); // 👈 small delay to show toast
    },
    onError: (error: any) => {
      api.error({
        message: "Login Failed",
        description: error.message || "An error occurred.",
        pauseOnHover: false,
      });
    },
  });

  const signupMutation = useMutation({
    mutationFn: async (values: any) => {
      let profilePictureUrl;
      console.log(values);
      if (values.profile_picture) {
        profilePictureUrl = await uploadProfilePictureToSupabase(
          values.profile_picture[0].originFileObj
        );
      }
      return await signup({ ...values, profilePictureUrl });
    },
    onSuccess: () => {
      api.success({
        message: "Signup Successful",
        description: "Your account has been created.",
      });
      onAfterSignup?.();
    },
    onError: (error: any) => {
      api.error({
        message: "Signup Failed",
        description: error.message || "An error occurred.",
      });
    },
  });

  const onSubmit = (values: any) => {
    if (isLogin) {
      loginMutation.mutate(values);
    } else {
      signupMutation.mutate(values);
    }
  };

  const { GeneratedForm } = useGeneratedAntForm({
    fields,
    layoutConfig: isLogin
      ? {
          columns: [{ key: "col1", span: { xs: 24, md: 24, xl: 24 } }],
          fieldGroups: { col1: ["username", "password"] },
        }
      : {
          columns: [
            { key: "col1", span: { xs: 24, md: 12 } },
            { key: "col2", span: { xs: 24, md: 12 } },
          ],
          fieldGroups: {
            col1: ["username", "password", "confirmPassword", "accountType"],
            col2: ["fullName", "email", "profile_picture"],
          },
          fullWidthFields: ["bio"], // Add this to make 'bio' span across both columns
        },
    buttonLabel: isLogin ? t("login") : t("signup"),
    onSubmit,
  });

  const wrapperStyle: React.CSSProperties = isLogin
    ? {
        minWidth: screens.lg ? 400 : "100%",
        maxWidth: screens.lg ? 600 : "100%",
        margin: "0 auto",
      }
    : { width: "100%" };

  return (
    <div style={wrapperStyle}>
      <GeneratedForm />
    </div>
  );
};

export default AuthForm;
