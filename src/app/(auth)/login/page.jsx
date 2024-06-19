"use client";
import Link from "next/link";
import Button from "@/componentes/Button";
import Input from "@/componentes/Input";
import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { signIn, useSession } from "next-auth/react"
import { useRouter } from "next/navigation";

export default function Login ()// cria validaçoes do yup
{
    const [error, setError] = useState("");
    const [isFormSubmitting, setFormSubmitting] = useState(false);
    const router = useRouter();
    const { status } = useSession();

    useEffect(()=>{
        if(status === "authenticated"){
            router.push("/");
        }
    },[status, router]);
    if(status !== "unauthenticated"){
        return null;
    }
    
 


    const initialValues = {
        email: "",
        password:"",

    };
const validationSchema = Yup.object().shape({
    email: Yup.string()
    .email("Digite um email valido")
    .required(" Digite um e-mail "),
    password: Yup.string().required("O Campo senha é obrigatório"),
});

async function handleSubmit(values){console.log("form values", values);

    setFormSubmitting(true);
    try {signIn("Credentials",{...values, redirect: false}).then(
        ({error}) =>{
            if (!error){
                router.push("/");
            }else{
                renderError(error.replace("Error:",""))
                resetForm();
            }
            setFormSubmitting(false);
        }
    );

    }catch {
        setFormSubmitting(false);
        renderError(" Erro logar tente mais tarde !");
    }
}

function renderError(msg){
    setError(msg);
    setTimeout(()=>{
        setError("");
    },3000);
}
    return(
        <main className="min-h-screen flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: "url('/img/imagem2.webp')" }}>
            <Formik 
            initialValues={initialValues}
             validationSchema={validationSchema}
              onSubmit={handleSubmit}
              >
                {({values, handleChange, handleBlur}) => (
                    <Form noValidate
                    className="flex flex-col gap-2 p-4 border border-zinc-600 min-w-[300px] bg-transparent backdrop-filter backdrop-blur-lg"

                    >
                    <Input name="email" type="email" label=" E-Mail" required
                    className="border-zinc-300 min-w-[300px] bg-transparent"
                    />
                    <Input name="password" type="password" label="Senha" required autoComplete="off"
                     className="border-zinc-300 min-w-[300px] bg-transparent"
                    />
                    <Button 
                    type="submit"
                     text={isFormSubmitting? "Carregando...":" Entrar"}
                     disabled={isFormSubmitting}
                    className="bg-orange-600 text-white rounded p-2 cursor-pointer"
                     />
                     {!values.email&& !values.password && error &&(
                    <span className="text-red-800  text-lg text-center">{error}</span>
                     )}
                    <span className="tex-xs text-zinc-">
                        Não possui conta?
                        <strong className="text-zinc-700">
                            <Link href="/registro"> Inscreva-se </Link>
                        </strong>
                    </span>
                    
                    </Form>
                )}
            </Formik>
        </main>
    );
}