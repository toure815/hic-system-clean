import { registerGateways, registerHandlers, run, type Handler } from "encore.dev/internal/codegen/appinit";

import { gw as api_gatewayGW } from "../../../../auth/auth";
import { dbCheck as auth_dbCheckImpl0 } from "../../../../auth/db_check";
import { listUsers as auth_listUsersImpl1 } from "../../../../auth/list_users";
import { me as auth_meImpl2 } from "../../../../auth/me";
import { syncUser as auth_syncUserImpl3 } from "../../../../auth/sync_user";
import { health as health_healthImpl4 } from "../../../../health/health";
import { completeOnboarding as onboarding_completeOnboardingImpl5 } from "../../../../onboarding/complete_onboarding";
import { getDraft as onboarding_getDraftImpl6 } from "../../../../onboarding/get_draft";
import { saveDraft as onboarding_saveDraftImpl7 } from "../../../../onboarding/save_draft";
import { uploadDocument as onboarding_uploadDocumentImpl8 } from "../../../../onboarding/upload_document";
import * as health_service from "../../../../health/encore.service";
import * as onboarding_service from "../../../../onboarding/encore.service";
import * as auth_service from "../../../../auth/encore.service";

const gateways: any[] = [
    api_gatewayGW,
];

const handlers: Handler[] = [
    {
        apiRoute: {
            service:           "auth",
            name:              "dbCheck",
            handler:           auth_dbCheckImpl0,
            raw:               false,
            streamingRequest:  false,
            streamingResponse: false,
        },
        endpointOptions: {"expose":true,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
        middlewares: auth_service.default.cfg.middlewares || [],
    },
    {
        apiRoute: {
            service:           "auth",
            name:              "listUsers",
            handler:           auth_listUsersImpl1,
            raw:               false,
            streamingRequest:  false,
            streamingResponse: false,
        },
        endpointOptions: {"expose":true,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
        middlewares: auth_service.default.cfg.middlewares || [],
    },
    {
        apiRoute: {
            service:           "auth",
            name:              "me",
            handler:           auth_meImpl2,
            raw:               false,
            streamingRequest:  false,
            streamingResponse: false,
        },
        endpointOptions: {"expose":true,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
        middlewares: auth_service.default.cfg.middlewares || [],
    },
    {
        apiRoute: {
            service:           "auth",
            name:              "syncUser",
            handler:           auth_syncUserImpl3,
            raw:               false,
            streamingRequest:  false,
            streamingResponse: false,
        },
        endpointOptions: {"expose":true,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
        middlewares: auth_service.default.cfg.middlewares || [],
    },
    {
        apiRoute: {
            service:           "health",
            name:              "health",
            handler:           health_healthImpl4,
            raw:               false,
            streamingRequest:  false,
            streamingResponse: false,
        },
        endpointOptions: {"expose":false,"auth":false,"isRaw":false,"isStream":false,"tags":[]},
        middlewares: health_service.default.cfg.middlewares || [],
    },
    {
        apiRoute: {
            service:           "onboarding",
            name:              "completeOnboarding",
            handler:           onboarding_completeOnboardingImpl5,
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
            handler:           onboarding_getDraftImpl6,
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
            handler:           onboarding_saveDraftImpl7,
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
            handler:           onboarding_uploadDocumentImpl8,
            raw:               false,
            streamingRequest:  false,
            streamingResponse: false,
        },
        endpointOptions: {"expose":true,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
        middlewares: onboarding_service.default.cfg.middlewares || [],
    },
];

registerGateways(gateways);
registerHandlers(handlers);

await run(import.meta.url);
