import { apiCall, streamIn, streamOut, streamInOut } from "encore.dev/internal/codegen/api";
import { registerTestHandler } from "encore.dev/internal/codegen/appinit";

import * as onboarding_service from "../../../../onboarding/encore.service";

export async function completeOnboarding(params, opts) {
    const handler = (await import("../../../../onboarding/complete_onboarding")).completeOnboarding;
    registerTestHandler({
        apiRoute: { service: "onboarding", name: "completeOnboarding", raw: false, handler, streamingRequest: false, streamingResponse: false },
        middlewares: onboarding_service.default.cfg.middlewares || [],
        endpointOptions: {"expose":true,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
    });

    return apiCall("onboarding", "completeOnboarding", params, opts);
}

export async function getDraft(params, opts) {
    const handler = (await import("../../../../onboarding/get_draft")).getDraft;
    registerTestHandler({
        apiRoute: { service: "onboarding", name: "getDraft", raw: false, handler, streamingRequest: false, streamingResponse: false },
        middlewares: onboarding_service.default.cfg.middlewares || [],
        endpointOptions: {"expose":true,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
    });

    return apiCall("onboarding", "getDraft", params, opts);
}

export async function saveDraft(params, opts) {
    const handler = (await import("../../../../onboarding/save_draft")).saveDraft;
    registerTestHandler({
        apiRoute: { service: "onboarding", name: "saveDraft", raw: false, handler, streamingRequest: false, streamingResponse: false },
        middlewares: onboarding_service.default.cfg.middlewares || [],
        endpointOptions: {"expose":true,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
    });

    return apiCall("onboarding", "saveDraft", params, opts);
}

export async function uploadDocument(params, opts) {
    const handler = (await import("../../../../onboarding/upload_document")).uploadDocument;
    registerTestHandler({
        apiRoute: { service: "onboarding", name: "uploadDocument", raw: false, handler, streamingRequest: false, streamingResponse: false },
        middlewares: onboarding_service.default.cfg.middlewares || [],
        endpointOptions: {"expose":true,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
    });

    return apiCall("onboarding", "uploadDocument", params, opts);
}

