import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import FacebookProvider from "next-auth/providers/facebook";

import DB from "@/app/api/config/db";


const authOptions = {
    
    providers: [
        CredentialsProvider({
            id: "credentials",
            name: "credentials",
            credentials: {
                email: {label: "Email", type: "text"},
                password: {label: "Password", type: "password"}
            },
            async authorize(credentials) {

                try {
                    // Query the user by email
                    const user = await new Promise((resolve, reject) => {
                        DB.query(
                            'SELECT id, username, email, password, role FROM user WHERE email = ? || username = ?',
                            [credentials.email, credentials.email],
                            (err, results) => {
                                if (err) {
                                    reject(err);
                                } else {
                                    resolve(results.length > 0 ? results[0] : null);
                                }
                            }
                        );
                    });
            

                    if (user) {

                      
                        // Compare the provided password with the stored hashed password
                        const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password);
                        if (isPasswordCorrect) {
                        
                            return user; // Return user if the password is correct
                        } 
                    }
            
                    // Return null if the user is not found or password is incorrect
                    return null;
                } catch (error) {
                    // Handle errors
                    console.error('Error verifying user:', error);
                    throw new Error('Internal Server Error');
                }
               
            }
        }),
        FacebookProvider({
            clientId: process.env.FACEBOOK_CLIENT_ID,
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET
        })
    ],
    callbacks:{
        async singIn({user, account}) {
            if(account?.provider == "credentials"){
                return true;
            }
        },
        async jwt({ token, user }) {
            if (user) {
              token.id = user.id;
              token.role = user.role
              token.name = user.username
            }
            return token;
        },
        async session({ session, token, user }) {
            session.user.id = token.id;
            session.user.role = token.role
            return session;
        },
    },
    session: {
        strategy: "jwt"
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages:{
        signIn: "/login"
    }

}


const handler = NextAuth(authOptions)

export {handler as GET, handler as POST }  




// const authOptions = {
    
//     providers: [
//         CredentialsProvider({
//             id: "credentials",
//             name: "credentials",
//             credentials: {
//                 email: {label: "Email", type: "text"},
//                 password: {label: "Password", type: "password"}
//             },
//             async authorize(credentials) {

//                 await connectMongoDB();
                
//                 try {
//                     const user = await User.findOne({email: credentials.email});
                    
//                     if(user){
//                         const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password);
//                         if(isPasswordCorrect) {
//                             return user;
//                         }
//                     }

//                 } catch (error) {
//                     throw new Error(error);
//                 }
               
//             }
//         }),
//         FacebookProvider({
//             clientId: process.env.FACEBOOK_CLIENT_ID,
//             clientSecret: process.env.FACEBOOK_CLIENT_SECRET
//         })
//     ],
//     callbacks:{
//         async singIn({user, account}) {
//             if(account?.provider == "credentials"){
//                 return true;
//             }
//         },
//         async jwt({ token, user }) {
//             if (user) {
//               token.id = user._id;
//               token.role = user.role
//             }
//             return token;
//         },
//         async session({ session, token, user }) {
//             session.user._id = token.id;
//             session.user.role = token.role

//             console.log("-----")
//             console.log(session)
//             console.log("-----")
//             return session;
//         },
//     },
//     session: {
//         strategy: "jwt"
//     },
//     secret: process.env.NEXTAUTH_SECRET,
//     pages:{
//         signIn: "/login"
//     }

// }

// const handler = NextAuth(authOptions)

// export {handler as GET, handler as POST }  