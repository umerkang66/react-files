export function createProfile(profile: any, parent: any) {
  return {
    id: profile.id,
    userId: parent.id,
    role: parent.role,
  };
}

export function createTokenWithUserId(token: any, user: { id: string }) {
  const anyUser: any = user;
  token.role = anyUser.role;
  token.userId = anyUser.userId;

  return token;
}
