export const getAgetUser = async ({ req, res }) => {
    if (typeof window === 'undefined') {
      const session = await auth0.getSession(req);
      if (!session || !session.user) {
        res.writeHead(302, {
          Location: '/api/login'
        });
        res.end();
        return;
      }
      return { user: session.user };
    }
  };