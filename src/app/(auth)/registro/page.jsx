"use client";
import Link from "next/link";
import Button from "@/componentes/Button";
import Input from "@/componentes/Input";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import { useRouter } from "next/navigation";

export default function Register() {
    const [error, setError] = useState("");
    const [isFormSubmitting, setFormSubmitting] = useState(false);

    const router = useRouter();
    const initialValues = {
        nome: "",
        email: "",
        password: "",
        confirmPassword: "",
    };

    const validationSchema = Yup.object().shape({
        nome: Yup.string().required(" Digite seu nome "),
        email: Yup.string()
            .email("Digite um email válido")
            .required("Digite um e-mail"),
        password: Yup.string()
            .min(6, 'A senha deve ter no mínimo 6 caracteres')
            .required('A senha é obrigatória')
            .test(
                'is-valid-password',
                'A senha deve conter números, letras e caracteres especiais',
                (value) => {
                    const hasNumber = /\d/.test(value);
                    const hasLetter = /[a-zA-Z]/.test(value);
                    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);
                    return hasNumber && hasLetter && hasSpecialChar;
                }
            ),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'As senhas devem coincidir')
            .required('Confirmação de senha é obrigatória'),
    });

    async function handleSubmit(values, { resetForm }) {
        setFormSubmitting(true);
        try {
            const response = await fetch("/api", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    nome: values.nome,
                    email: values.email,
                    password: values.password,
                }),
            });

            const result = await response.json();
            if (response.status === 201) {
                alert(result.message);
                router.push("/login");
            } else {
                renderError(result.message);
                resetForm();
            }
        } catch (error) {
            renderError("Erro ao criar uma conta, tente novamente mais tarde!");
        } finally {
            setFormSubmitting(false);
        }
    }

    function renderError(msg) {
        setError(msg);
        setTimeout(() => {
            setError("");
        }, 3000);
    }

    return (
        <main className="min-h-screen flex items-center justify-center">
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ values }) => (
                    <Form
                        noValidate
                        className="flex flex-col gap-2 p-4 border border-zinc-600 min-w-[300px] bg-white"
                    >
                        <Input
                         name="nome"
                          type="nome"
                           label="Nome"
                            required />
                        <Input
                         name="email"
                          type="email"
                           label="E-Mail"
                            required />
                        <Input
                            name="password"
                            type="password"
                            label="Digite uma senha"
                            required
                            autoComplete="on"
                            className="border-zinc-300 min-w-[300px] bg-white"
                        />
                        <Input
                            name="confirmPassword"
                            type="password"
                            label="Repita a senha"
                            required
                            autoComplete="off"
                            className="border-zinc-300 min-w-[300px] bg-white"
                        />
                        <Button
                            type="submit"
                            text={isFormSubmitting ? "Carregando..." : "Inscrever-se"}
                            disabled={isFormSubmitting}
                            className="bg-green-500 text-white rounded p-2 cursor-pointer"
                        />
                        {error && (
                            <span className="text-red-600 text-sm text-center">{error}</span>
                        )}
                        <span className="text-xs text-zinc-500">
                            Já possui uma conta?
                            <strong className="text-zinc-700">
                                <Link href="/login"> Faça Login </Link>
                            </strong>
                        </span>
                    </Form>
                )}
            </Formik>
        </main>
    );
}
