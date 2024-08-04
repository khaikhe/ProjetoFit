
import User from "@/models/user";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import connect from "@/utils/db";


const options = NextAuth({
    providers: [CredentialsProvider({
        id: "Credentials",
        name: "Credentials",
        async authorize(credentials){
            await connect();
            try {
                const user = await User.findOne({
                    email: credentials.email,
                });

                if (user) {
                    const validPassword = await bcrypt.compare(
                        credentials.password,
                        user.password
                    );

                    if (validPassword) {
                        return user;
                    } else {
                        throw new Error ("Credenciais erradas!");
                    }
                }
                    else{
                        throw new Error ("Email errado!");
                    }
                
        
    } catch(error){
        throw new Error(error);
}
}})],

    pages: {
        error:"/login",
    },
    secret:process.env.NEXTAUTH_SECRET
});

export {options as GET, options as POST };