import { registerHandlers, run, type Handler } from "encore.dev/internal/codegen/appinit";
import { Worker, isMainThread } from "node:worker_threads";
import { fileURLToPath } from "node:url";
import { availableParallelism } from "node:os";

import { dbCheck as dbCheckImpl0 } from "../../../../../auth/db_check";
import { listUsers as listUsersImpl1 } from "../../../../../auth/list_users";
import { me as meImpl2 } from "../../../../../auth/me";
import { syncUser as syncUserImpl3 } from "../../../../../auth/sync_user";
import * as auth_service from "../../../../../auth/encore.service";

const handlers: Handler[] = [
    {
        apiRoute: {
            service:           "auth",
            name:              "dbCheck",
            handler:           dbCheckImpl0,
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
            handler:           listUsersImpl1,
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
            handler:           meImpl2,
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
            handler:           syncUserImpl3,
            raw:               false,
            streamingRequest:  false,
            streamingResponse: false,
        },
        endpointOptions: {"expose":true,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
        middlewares: auth_service.default.cfg.middlewares || [],
    },
];

registerHandlers(handlers);

await run(import.meta.url);
