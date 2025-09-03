

export const AccountStatus = {
  VERIFIED: 'VERIFIED',
  NOT_VERIFY: 'NOT_VERIFY',
  BANNED: 'BANNED',
  DISABLED: 'DISABLED'
} as const;

export type AccountStatus = typeof AccountStatus[keyof typeof AccountStatus];