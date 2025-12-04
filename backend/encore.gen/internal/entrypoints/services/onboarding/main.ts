import { registerHandlers, run, type Handler } from "encore.dev/internal/codegen/appinit";
import { Worker, isMainThread } from "node:worker_threads";
import { fileURLToPath } from "node:url";
import { availableParallelism } from "node:os";

import { completeOnboarding as completeOnboardingImpl0 } from "../../../../../onboarding/complete_onboarding";
import { getDraft as getDraftImpl1 } from "../../../../../onboarding/get_draft";
import { saveDraft as saveDraftImpl2 } from "../../../../../onboarding/save_draft";
import { uploadDocument as uploadDocumentImpl3 } from "../../../../../onboarding/upload_document";
import * as onboarding_service from "../../../../../onboarding/encore.service";

const handlers: Handler[] = [
    {
        apiRoute: {
            service:           "onboarding",
            name:              "completeOnboarding",
            handler:           completeOnboardingImpl0,
            raw:               false,
            streamingRequest:  false,
            streamingResponse: false,
        },
        endpointOptions: {"expose":true,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
        middlewares: onboarding_service.default.cfg.middlewares || [],
    },
    {
        apiRoute: {
            service:           "onboarding",
            name:              "getDraft",
            handler:           getDraftImpl1,
            raw:               false,
            streamingRequest:  false,
            streamingResponse: false,
        },
        endpointOptions: {"expose":true,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
        middlewares: onboarding_service.default.cfg.middlewares || [],
    },
    {
        apiRoute: {
            service:           "onboarding",
            name:              "saveDraft",
            handler:           saveDraftImpl2,
            raw:               false,
            streamingRequest:  false,
            streamingResponse: false,
        },
        endpointOptions: {"expose":true,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
        middlewares: onboarding_service.default.cfg.middlewares || [],
    },
    {
        apiRoute: {
            service:           "onboarding",
            name:              "uploadDocument",
            handler:           uploadDocumentImpl3,
            raw:               false,
            streamingRequest:  false,
            streamingResponse: false,
        },
        endpointOptions: {"expose":true,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
        middlewares: onboarding_service.default.cfg.middlewares || [],
    },
];

registerHandlers(handlers);

await run(import.meta.url);
