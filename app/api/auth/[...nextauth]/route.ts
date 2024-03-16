import NextAuth from "next-auth"
import CognitoProvider from "next-auth/providers/cognito"

const handler = NextAuth({
    providers: [
        CognitoProvider({
            clientId: process.env.COGNITO_CLIENT_ID || '',
            clientSecret: process.env.COGNITO_CLIENT_SECRET || '',
            issuer: process.env.COGNITO_ISSUER,
        })
    ],
    callbacks: {
        async jwt({ token, user, account }) {
            if (account && user) {
                token.idToken = account.id_token;
                token.accessToken = account.access_token;
            }
            return token;
        },
        async session({ session, token }) {
            session.idToken = token.idToken;
            session.accessToken = token.accessToken;
            return session;
        },
    },
    pages: {
        signIn: '/'
    }
});

export { handler as GET, handler as POST }
