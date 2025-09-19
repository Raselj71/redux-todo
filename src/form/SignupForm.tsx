import { useForm } from "react-hook-form";
import {  registerSchema, type TTregisterSchema } from "../types/zod/ZodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Flex } from "@radix-ui/themes";
import LabeledInput from "../component/ui/Input";
import { useSignupAPIMutation } from "../redux/auth/authApi";
import { toast } from "react-toastify";
import {  useNavigate } from "react-router-dom";




function SignupForm() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const navigate = useNavigate();
    const [signupApi, {isLoading}]=useSignupAPIMutation()
    const { control, handleSubmit, formState: { isSubmitting,errors } } = useForm<TTregisterSchema>({
        mode: "onChange",
        defaultValues: {
           email:'',
           password:'',
           name:''
        },
        resolver: zodResolver(registerSchema),
    });

    const onsubmit = async (data: TTregisterSchema) => {
           try {
                 const response= await signupApi(data)
                 if(response.data){
                    toast('Register Successfull', {
                        type:'success'
                    })

                     navigate("/login"); 
                 }else{
                let errorMessage = 'Register  failed';
                if (response.error && 'data' in response.error && (response.error as any).data?.message) {
                  errorMessage = (response.error as any).data.message;
                } else if (response.error && 'message' in response.error) {
                  errorMessage = (response.error as { message?: string }).message || 'Login failed';
                }
                toast(errorMessage, {
                    type:'error'
                })
              }
           } catch (error) {
             console.log(error)
           }
    }

    return <form onSubmit={handleSubmit(onsubmit)}>

        <Flex gap={'4'} direction={'column'}>
            <LabeledInput control={control} error={errors.name} size="3" name="name" required placeholder={"Name"} label="Name" />
              <LabeledInput control={control} error={errors.email} size="3" name="email" required placeholder={"Email"} label="Email" />
            <LabeledInput control={control} size="3" error={errors.password} name="password" required placeholder={"password"} label="Password" />

            <Button
                variant='solid'
                type='submit'
                loading={isSubmitting || isLoading}
                disabled={isSubmitting}
                size={'3'}
                className='w-full!'
            >
                Register
            </Button>
        </Flex>
    </form>;
}

export default SignupForm;
