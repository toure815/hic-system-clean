import { CallOpts } from "encore.dev/api";

type Parameters<T> = T extends (...args: infer P) => unknown ? P : never;
type WithCallOpts<T extends (...args: any) => any> = (
  ...args: [...Parameters<T>, opts?: CallOpts]
) => ReturnType<T>;

import { completeOnboarding as completeOnboarding_handler } from "../../../../onboarding/complete_onboarding.js";
declare const completeOnboarding: WithCallOpts<typeof completeOnboarding_handler>;
export { completeOnboarding };

import { getDraft as getDraft_handler } from "../../../../onboarding/get_draft.js";
declare const getDraft: WithCallOpts<typeof getDraft_handler>;
export { getDraft };

import { saveDraft as saveDraft_handler } from "../../../../onboarding/save_draft.js";
declare const saveDraft: WithCallOpts<typeof saveDraft_handler>;
export { saveDraft };

import { uploadDocument as uploadDocument_handler } from "../../../../onboarding/upload_document.js";
declare const uploadDocument: WithCallOpts<typeof uploadDocument_handler>;
export { uploadDocument };


