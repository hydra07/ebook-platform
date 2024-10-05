import axios from '@/lib/axios';
import { env } from '@/lib/validateEnv';
import { AuthOptions } from 'next-auth';
import Google from 'next-auth/providers/google';
const authOptions: AuthOptions = {
  providers: [
    Google({
      clientId: env.GOOGLE_CLIENT_ID as string,
      clientSecret: env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  secret: env.NEXTAUTH_SECRET,
  session: {
    maxAge: 2 * 60 * 60,
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      if (!account) return false;
      const auth = await authenticate(user, account);
      console.log(auth);
      if (auth.isAuthenticated) {
        return true;
      } else {
        return false;
      }
      // return true;
    },
  },
};

//Auth service
async function authenticate(user: any, account: any) {
  const data = {
    name: user.name as string,
    email: user.email as string,
    image: user.image as string,
    provider: account.provider as string,
    providerAccountId: account.providerAccountId as string,
  };
  console.log(data);
  const res = await axios.post('/auth', data);
  return res.data;
}

export default authOptions;
