import User from "@/models/user";
import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import connect from "@/utils/db";

export async function POST(req) {
    try {
        const { nome, email, password } = await req.json();

        await connect();

        const emailExists = await User.findOne({ email });

        if (emailExists){
            return NextResponse.json({
                message: "E-mail ja esta cadastrado! ",
                status: 409,
            });
        }
        const hashedPassword = await bcryptjs.hash(password, 5);

        const newUser = new User({
            nome,
            email,
            password: hashedPassword,
        });

        await newUser.save();

        return NextResponse.json({
            message: "Usuario cadastrado com sucesso! ",
            status: 201,
        });


    } catch (error) {
        return NextResponse.json({
            error: " Falha ao cadastrar usuário ",
            status: 500,
        });
    }

}