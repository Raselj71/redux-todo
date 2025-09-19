import { useForm } from "react-hook-form";
import { loginSchema, type TTloginSchema } from "../types/zod/ZodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Flex } from "@radix-ui/themes";
import LabeledInput from "../component/ui/Input";



function LoginForm() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { control, handleSubmit, formState: { isSubmitting,errors } } = useForm<TTloginSchema>({
        mode: "onChange",
        defaultValues: {
           email:'',
           password:''
        },
        resolver: zodResolver(loginSchema),
    });

    const onsubmit = async (data: TTloginSchema) => {
        console.log(data)

    }

    return <form onSubmit={handleSubmit(onsubmit)}>

        <Flex gap={'4'} direction={'column'}>
            <LabeledInput control={control} error={errors.email} size="3" name="email" required placeholder={"Email"} label="Email" />
            <LabeledInput control={control} size="3" error={errors.password} name="password" required placeholder={"password"} label="Password" />

            <Button
                variant='solid'
                type='submit'
                loading={isSubmitting}
                disabled={isSubmitting}
                size={'3'}
                className='w-full!'
            >
                LogIn
            </Button>
        </Flex>
    </form>;
}

export default LoginForm;
