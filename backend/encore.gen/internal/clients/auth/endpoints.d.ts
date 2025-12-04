import { CallOpts } from "encore.dev/api";

type Parameters<T> = T extends (...args: infer P) => unknown ? P : never;
type WithCallOpts<T extends (...args: any) => any> = (
  ...args: [...Parameters<T>, opts?: CallOpts]
) => ReturnType<T>;

import { dbCheck as dbCheck_handler } from "../../../../auth/db_check.js";
declare const dbCheck: WithCallOpts<typeof dbCheck_handler>;
export { dbCheck };

import { listUsers as listUsers_handler } from "../../../../auth/list_users.js";
declare const listUsers: WithCallOpts<typeof listUsers_handler>;
export { listUsers };

import { me as me_handler } from "../../../../auth/me.js";
declare const me: WithCallOpts<typeof me_handler>;
export { me };

import { syncUser as syncUser_handler } from "../../../../auth/sync_user.js";
declare const syncUser: WithCallOpts<typeof syncUser_handler>;
export { syncUser };


