import { apiCall, streamIn, streamOut, streamInOut } from "encore.dev/internal/codegen/api";
import { registerTestHandler } from "encore.dev/internal/codegen/appinit";

import * as auth_service from "../../../../auth/encore.service";

export async function dbCheck(params, opts) {
    const handler = (await import("../../../../auth/db_check")).dbCheck;
    registerTestHandler({
        apiRoute: { service: "auth", name: "dbCheck", raw: false, handler, streamingRequest: false, streamingResponse: false },
        middlewares: auth_service.default.cfg.middlewares || [],
        endpointOptions: {"expose":true,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
    });

    return apiCall("auth", "dbCheck", params, opts);
}

export async function listUsers(params, opts) {
    const handler = (await import("../../../../auth/list_users")).listUsers;
    registerTestHandler({
        apiRoute: { service: "auth", name: "listUsers", raw: false, handler, streamingRequest: false, streamingResponse: false },
        middlewares: auth_service.default.cfg.middlewares || [],
        endpointOptions: {"expose":true,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
    });

    return apiCall("auth", "listUsers", params, opts);
}

export async function me(params, opts) {
    const handler = (await import("../../../../auth/me")).me;
    registerTestHandler({
        apiRoute: { service: "auth", name: "me", raw: false, handler, streamingRequest: false, streamingResponse: false },
        middlewares: auth_service.default.cfg.middlewares || [],
        endpointOptions: {"expose":true,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
    });

    return apiCall("auth", "me", params, opts);
}

export async function syncUser(params, opts) {
    const handler = (await import("../../../../auth/sync_user")).syncUser;
    registerTestHandler({
        apiRoute: { service: "auth", name: "syncUser", raw: false, handler, streamingRequest: false, streamingResponse: false },
        middlewares: auth_service.default.cfg.middlewares || [],
        endpointOptions: {"expose":true,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
    });

    return apiCall("auth", "syncUser", params, opts);
}

