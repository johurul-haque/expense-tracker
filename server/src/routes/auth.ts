import { Hono } from 'hono';
import { kindeClient, sessionManager } from '../kinde';

export const authRoutes = new Hono()
  .get('/login', async (c) => {
    const loginUrl = await kindeClient.login(sessionManager(c));
    return c.redirect(loginUrl.toString());
  })
  .get('/register', async (c) => {
    const registerUrl = await kindeClient.register(sessionManager(c));
    return c.redirect(registerUrl.toString());
  })
  .get('/callback', async (c) => {
    const url = new URL(c.req.url);
    await kindeClient.handleRedirectToApp(sessionManager(c), url);
    return c.redirect('/');
  })
  .get('/logout', async (c) => {
    const logoutUrl = await kindeClient.logout(sessionManager(c));
    return c.redirect(logoutUrl.toString());
  })
  .get('/profile', async (c) => {
    const manager = sessionManager(c);
    const isAuthenticated = await kindeClient.isAuthenticated(manager);
    if (!isAuthenticated) return c.json({ error: 'Unauthorized' }, 401);

    const user = await kindeClient.getUser(manager);
    return c.json({ user });
  });