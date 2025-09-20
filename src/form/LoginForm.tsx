import { useForm } from "react-hook-form";
import { loginSchema, type TTloginSchema } from "../types/zod/ZodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Flex } from "@radix-ui/themes";
import LabeledInput from "../component/ui/Input";
import { useLoginAPIMutation } from "../redux/auth/authApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { PiEyeDuotone, PiEyeSlashDuotone } from "react-icons/pi";

function LoginForm() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [loginAPI, { isLoading }] = useLoginAPIMutation();
  const {
    control,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<TTloginSchema>({
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  });

  const onsubmit = async (data: TTloginSchema) => {
    try {
      const response = await loginAPI(data);
      if (response.data) {
        toast("login Successfully", {
          type: "success",
        });

        navigate("/");
      } else {
        let errorMessage = "Login failed";
        if (
          response.error &&
          "data" in response.error &&
          (response.error as any).data?.message
        ) {
          errorMessage = (response.error as any).data.message;
        } else if (response.error && "message" in response.error) {
          errorMessage =
            (response.error as { message?: string }).message || "Login failed";
        }
        toast(errorMessage, {
          type: "error",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handlePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <form onSubmit={handleSubmit(onsubmit)}>
      <Flex gap={"4"} direction={"column"}>
        <LabeledInput
          control={control}
          error={errors.email}
          size="3"
          name="email"
          required
          placeholder={"Email"}
          label="Email"
        />
        <LabeledInput
         type={showPassword ? 'text' : 'password'}
          control={control}
          icon={
            showPassword ? (
              <PiEyeDuotone
                height="16"
                width="16"
                cursor="pointer"
                onClick={handlePasswordVisibility}
              />
            ) : (
              <PiEyeSlashDuotone
                height="16"
                width="16"
                cursor="pointer"
                onClick={handlePasswordVisibility}
              />
            )
          }
          size="3"
          error={errors.password}
          name="password"
          required
          placeholder={"password"}
          label="Password"
        />

        <Button
          variant="solid"
          type="submit"
          loading={isSubmitting || isLoading}
          disabled={isSubmitting}
          size={"3"}
          className="w-full!"
        >
          LogIn
        </Button>
      </Flex>
    </form>
  );
}

export default LoginForm;
