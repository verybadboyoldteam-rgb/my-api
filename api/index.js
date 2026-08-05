const sessions = [];
let sessionIdCounter = 1;

function generateToken() {
  return 'token_' + Date.now() + '_' + Math.random().toString(36).substring(2, 8);
}

module.exports = (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(' ')[1];

    if (req.method === 'POST' && req.path === '/login') {
      const { login, password } = req.body;
      if (login === 'admin' && password === '12345') {
        const newToken = generateToken();
        const session = {
          id: sessionIdCounter++,
          token: newToken,
          login: login,
          createdAt: Date.now(),
          userAgent: req.headers['user-agent'] || 'unknown',
          ip: req.headers['x-forwarded-for']?.split(',')[0] || req.socket.remoteAddress || 'unknown',
          isActive: true
        };
        sessions.push(session);
        return res.status(200).json({
          message: 'Login successful',
          token: newToken,
          sessionId: session.id
        });
      }
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    if (req.method === 'POST' && req.path === '/logout') {
      if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
      }
      const sessionIndex = sessions.findIndex(s => s.token === token && s.isActive);
      if (sessionIndex === -1) {
        return res.status(401).json({ error: 'Invalid or expired token' });
      }
      sessions[sessionIndex].isActive = false;
      return res.status(200).json({ message: 'Logged out successfully' });
    }

    if (req.method === 'GET' && req.path === '/sessions') {
      if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
      }
      const userSessions = sessions.filter(s => s.isActive);
      return res.status(200).json({ sessions: userSessions });
    }

    if (req.method === 'DELETE' && req.path.startsWith('/sessions/')) {
      if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
      }
      const sessionId = parseInt(req.path.split('/')[2]);
      if (isNaN(sessionId)) {
        return res.status(400).json({ error: 'Invalid session ID' });
      }
      const session = sessions.find(s => s.id === sessionId && s.isActive);
      if (!session) {
        return res.status(404).json({ error: 'Session not found' });
      }
      session.isActive = false;
      return res.status(200).json({ message: 'Session revoked successfully' });
    }

    if (!token) {
      return res.status(401).json({ error: 'Unauthorized: missing token' });
    }

    const activeSession = sessions.find(s => s.token === token && s.isActive);
    if (!activeSession) {
      return res.status(401).json({ error: 'Unauthorized: invalid or expired token' });
    }

    res.status(200).json({
      name: "Алексей",
      age: 35,
      profession: "Руководитель отдела мобильной разработки",
      hobbies: [
        "менять скины в Quake 3",
        "читать стихи Есенина",
        "тащиться от Тринити из Матрицы"
      ],
      location: {
        currentCity: "Минск",
        currentCountry: "Беларусь",
        dreamCountry: "Франция"
      },
      session: {
        id: activeSession.id,
        login: activeSession.login,
        createdAt: new Date(activeSession.createdAt).toLocaleString(),
        userAgent: activeSession.userAgent,
        ip: activeSession.ip
      }
    });
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error: ' + err.message });
  }
};
