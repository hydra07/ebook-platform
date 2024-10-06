import { AuthOptions } from 'next-auth';
import Google from 'next-auth/providers/google';

const authOptions: AuthOptions = {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    maxAge: 2 * 60 * 60,
  },
  callbacks: {
    async signIn({user,account,profile,email,credentials} ){
      if (!account) return false;
      return true
    }
  }
};


//Auth service 
// const 