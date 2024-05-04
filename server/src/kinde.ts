import {
  createKindeServerClient,
  GrantType,
  SessionManager,
  UserType,
} from '@kinde-oss/kinde-typescript-sdk';
import { Context } from 'hono';
import { deleteCookie, getCookie, setCookie } from 'hono/cookie';
import { createMiddleware } from 'hono/factory';
import { env } from './config/env';

export const kindeClient = createKindeServerClient(
  GrantType.AUTHORIZATION_CODE,
  {
    authDomain: env.KINDE_DOMAIN,
    clientId: env.KINDE_CLIENT_ID,
    clientSecret: env.KINDE_CLIENT_SECRET,
    redirectURL: env.KINDE_REDIRECT_URI,
    logoutRedirectURL: env.KINDE_LOGOUT_REDIRECT_URI,
  }
);

export const sessionManager = (c: Context): SessionManager => ({
  async getSessionItem(key: string) {
    const result = getCookie(c, key);
    return result;
  },
  async setSessionItem(key: string, value: unknown) {
    const cookieOptions = {
      httpOnly: true,
      secure: true,
      sameSite: 'Lax',
    } as const;

    if (typeof value === 'string') {
      setCookie(c, key, value, cookieOptions);
    } else {
      setCookie(c, key, JSON.stringify(value), cookieOptions);
    }
  },
  async removeSessionItem(key: string) {
    deleteCookie(c, key);
  },
  async destroySession() {
    ['id_token', 'access_token', 'user', 'refresh_token'].forEach((key) =>
      deleteCookie(c, key)
    );
  },
});

type Env = {
  Variables: {
    user: UserType;
  };
};

export const authMiddleware = createMiddleware<Env>(async (c, next) => {
  try {
    const manager = sessionManager(c);
    const isAuthenticated = await kindeClient.isAuthenticated(manager);

    if (!isAuthenticated) throw Error();

    const user = await kindeClient.getUser(manager);

    c.set('user', user);
    await next();
  } catch (error) {
    console.error(error);
    return c.json({ error: 'Unauthorized' }, 401);
  }
});