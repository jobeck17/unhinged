export function isResultsOwner(user, ownerEmail) {
  return Boolean(user?.userId && user?.email && ownerEmail && user.email.toLowerCase() === ownerEmail.toLowerCase());
}
