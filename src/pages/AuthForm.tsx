// AuthForm.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { FieldConfig, useGeneratedAntForm } from "../hooks/useGeneratedAntForm";
import { t } from "i18next";
import { notification } from "antd";
import { login, signup } from "../api/authServices";
import { uploadProfilePictureToSupabase } from "../api/uploadProfilePictureToSupabase";
import { getCurrentUser } from "../api/usersService";

type Props = {
  isLogin?: boolean;
  onAfterSignup?: () => void;
};

const AuthForm: React.FC<Props> = ({ isLogin = true, onAfterSignup }) => {
  const navigate = useNavigate(); // ← grab navigate
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
        label: t("confirm Password"),
        type: "password",
        required: true,
        placeholder: "Confirm your password",
      },
      {
        name: t("fullName"),
        label: "Full Name",
        type: "input",
        required: true,
        placeholder: "Your full name",
      },
      {
        name: "email",
        label: "Email",
        type: "input",
        required: true,
        placeholder: "you@example.com",
      },
      {
        name: "accountType",
        label: "Account Type",
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

  const onSubmit = async (values: any) => {
    if (isLogin) {
      try {
        await login(values);
        notification.success({
          message: "Login Successful",
          description: "You have been logged in.",
        });

        const user = await getCurrentUser();
        localStorage.setItem("user", JSON.stringify(user));
        navigate("/", { replace: true }); // ← redirect home
      } catch (error: any) {
        notification.error({
          message: "Login Failed",
          description: error.message || "An error occurred during login.",
        });
      }
    } else {
      try {
        let profilePictureUrl: string | undefined = undefined;
        if (values.profile_picture) {
          profilePictureUrl = await uploadProfilePictureToSupabase(
            values.profile_picture.file
          );
        }
        await signup({
          ...values,
          profilePictureUrl: profilePictureUrl,
        });
        notification.success({
          message: "Signup Successful",
          description: "Your account has been created.",
        });
        onAfterSignup?.();
        // navigate("/", { replace: true }); // ← also redirect after signup if you wish
      } catch (error: any) {
        notification.error({
          message: "Signup Failed",
          description: error.message || "An error occurred during signup.",
        });
      }
    }
  };

  const { GeneratedForm } = useGeneratedAntForm({
    fields,
    buttonLabel: isLogin ? t("login") : t("signup"),
    onSubmit,
  });

  return <GeneratedForm />;
};

export default AuthForm;
