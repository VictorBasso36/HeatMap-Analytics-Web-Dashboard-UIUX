// @ts-ignore
import { CognitoIdentityServiceProvider } from 'aws-sdk';
import crypto from 'crypto';
import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import jwt from 'jsonwebtoken';

// Configuração da região da AWS
const AWS = require('aws-sdk');
AWS.config.update({region: 'sa-east-1'}); // Substitua 'sa-east-1' pela sua região da AWS


function calculateSecretHash(username: string) {
    const secretHash = crypto.createHmac('SHA256', process.env.COGNITO_CLIENT_SECRET || '')
        .update(username + process.env.COGNITO_CLIENT_ID)
        .digest('base64');
    return secretHash;
}



const nextAuthOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email: { label: 'email', type: 'text' },
                password: { label: 'password', type: 'password' }
            },

            async authorize(credentials, req) {
                const cognito = new CognitoIdentityServiceProvider();
                const secretHash = calculateSecretHash(credentials?.email || '');

                const params = {
                    AuthFlow: 'USER_PASSWORD_AUTH',
                    ClientId: process.env.COGNITO_CLIENT_ID || '',
                    AuthParameters: {
                        USERNAME: credentials?.email || '',
                        PASSWORD: credentials?.password || '',
                        SECRET_HASH: secretHash
                    }
                };  

                console.log('pre')
       
                return new Promise((resolve, reject) => {
                    console.log("pre", "initiateAuth")
                    cognito.initiateAuth(params, function(err, data) {
                        if (err) {
                            console.log('Erro:', err);
                            reject(err);
                        } else {
                            if(data) {
                                console.log('Data:', JSON.stringify(data, null, 2));
                                if(!data?.AuthenticationResult) return null
                                if(!data?.AuthenticationResult?.IdToken) return null

                                const decodedToken: any = jwt.decode(data?.AuthenticationResult?.IdToken );
                                console.log("decoedToken:", decodedToken)
                                resolve({ 
                                    email: decodedToken?.email,
                                    accessToken: data.AuthenticationResult?.AccessToken,
                                    name: decodedToken?.name,
                                    photo: decodedToken?.picture
                                } as any);
                            } else {
                                console.log('Data is null or undefined');
                            }
                        }
                    });
                });
                
            },
        })
    ],
    pages: {
        signIn: '/'
    },
    callbacks: {
        async jwt({ token, user }) {
            user && (token.user = user)
            return token
        },
        async session({ session, token }){
            session = token.user as any
            return session
        }
    }
}

const handler = NextAuth(nextAuthOptions)

export { handler as GET, handler as POST }