import { apiCall, streamIn, streamOut, streamInOut } from "encore.dev/internal/codegen/api";

const TEST_ENDPOINTS = typeof ENCORE_DROP_TESTS === "undefined" && process.env.NODE_ENV === "test"
    ? await import("./endpoints_testing.js")
    : null;

export async function completeOnboarding(params, opts) {
    if (typeof ENCORE_DROP_TESTS === "undefined" && process.env.NODE_ENV === "test") {
        return TEST_ENDPOINTS.completeOnboarding(params, opts);
    }

    return apiCall("onboarding", "completeOnboarding", params, opts);
}
export async function getDraft(opts) {
    const params = undefined;
    if (typeof ENCORE_DROP_TESTS === "undefined" && process.env.NODE_ENV === "test") {
        return TEST_ENDPOINTS.getDraft(params, opts);
    }

    return apiCall("onboarding", "getDraft", params, opts);
}
export async function saveDraft(params, opts) {
    if (typeof ENCORE_DROP_TESTS === "undefined" && process.env.NODE_ENV === "test") {
        return TEST_ENDPOINTS.saveDraft(params, opts);
    }

    return apiCall("onboarding", "saveDraft", params, opts);
}
export async function uploadDocument(params, opts) {
    if (typeof ENCORE_DROP_TESTS === "undefined" && process.env.NODE_ENV === "test") {
        return TEST_ENDPOINTS.uploadDocument(params, opts);
    }

    return apiCall("onboarding", "uploadDocument", params, opts);
}
