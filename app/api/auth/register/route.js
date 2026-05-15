import { normalizeIdentifier, readUsers, writeUsers } from '../users';

export async function POST(request) {
  try {
    const { username, email, password } = await request.json();
    const cleanUsername = String(username || '').trim();
    const cleanEmail = String(email || '').trim();
    const cleanPassword = String(password || '');

    if (!cleanUsername || !cleanEmail || !cleanPassword) {
      return Response.json({ error: 'Username, email, and password are required.' }, { status: 400 });
    }

    if (!cleanEmail.includes('@')) {
      return Response.json({ error: 'Please enter a valid email address.' }, { status: 400 });
    }

    if (cleanPassword.length < 6) {
      return Response.json({ error: 'Password must be at least 6 characters.' }, { status: 400 });
    }

    const users = await readUsers();
    const usernameKey = normalizeIdentifier(cleanUsername);
    const emailKey = normalizeIdentifier(cleanEmail);
    const existingUser = users.find((user) => (
      normalizeIdentifier(user.username) === usernameKey
      || normalizeIdentifier(user.email) === emailKey
    ));

    if (existingUser) {
      return Response.json({ error: 'That username or email is already registered.' }, { status: 409 });
    }

    const user = {
      id: Date.now().toString(),
      username: cleanUsername,
      email: cleanEmail,
      password: cleanPassword,
      createdAt: new Date().toISOString(),
    };

    await writeUsers([user, ...users]);

    return Response.json({
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.error('Registration error:', error);
    return Response.json({ error: 'Failed to register user.' }, { status: 500 });
  }
}
