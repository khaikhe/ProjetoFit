"use client";
import Link from "next/link";
import Button from "@/componentes/Button";
import Input from "@/componentes/Input";
import { Form, Formik } from "formik";
import React from "react";
import * as Yup from "yup";

export default function Login ()// cria validaçoes do yup
{
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

async function handleSubmit(values){console.log("form values", values);}
    return(
        <main className="min-h-screen flex items-center justify-center">
            <Formik 
            initialValues={initialValues}
             validationSchema={validationSchema}
              onSubmit={handleSubmit}
              >
                {({values, handleChange, handleBlur}) => (
                    <Form noValidate
                    className="flex flex-col gap-2 p-4 border border-zinc-600 min-w-[300px bg-white"
                    >
                    <Input name="email" type="email" label=" E-Mail" required
                    />
                    <Input name="password" type="password" label="Senha" required autoComplete="off" className=" border-zinc-300 min-w-[300px bg-white"
                    />
                    <Button type="submit" text="Entrar" className="bg-green-500 text-white rounded p-2 cursor-pointer"
                     />
                    <span className="tex-xs text-zinc-500">
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