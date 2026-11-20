/* tslint:disable */
/* eslint-disable */

/**
 * Rust-owned application encryption/replay state for a browser WebSocket or
 * WebTransport host. JavaScript transports the returned opaque bytes without
 * receiving the run key or implementing protocol crypto.
 */
export class BrowserEncryptedFrameSession {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    open(encoded: Uint8Array): Uint8Array;
    seal(frame_kind: number, plaintext: Uint8Array): Uint8Array;
}

export class BrowserExecutionRecipient {
    free(): void;
    [Symbol.dispose](): void;
    constructor(fingerprint: string, valid_after_unix_millis: bigint, valid_before_unix_millis: bigint);
    open(artifact: any): Uint8Array;
    openRunKey(envelope: any, expected_run_identity: string, expected_key_epoch: number): BrowserRunKey;
    seal(context: any, plaintext: Uint8Array): any;
    readonly recipient: any;
}

/**
 * Browser-side authority for the content-blind two-stage submission.
 *
 * Network requests remain a small TypeScript host responsibility. Rust owns
 * the run key, exact endpoint recipient, encryption contexts, and canonical
 * ciphertext bytes so browser and native submissions cannot drift.
 */
export class BrowserRemoteSubmission {
    free(): void;
    [Symbol.dispose](): void;
    createFrameSession(session_id: Uint8Array, direction: string, key_epoch: number): BrowserEncryptedFrameSession;
    decryptObject(purpose: string, ciphertext: Uint8Array): Uint8Array;
    encryptObject(purpose: string, plaintext: Uint8Array, task_identity: string | null | undefined, attempt_identity: string | null | undefined, chunk_index: bigint, key_epoch: number): Uint8Array;
    constructor(run_identity: string, verified_endpoint: any);
    sealRunKeyEnvelope(key_epoch: number): Uint8Array;
    /**
     * Seal this submission's content key to an organization recovery
     * recipient returned by the public Server policy API.
     */
    sealRunKeyForRecipient(recipient: any, key_epoch: number): Uint8Array;
    readonly directQuicEndpoints: any;
    readonly endpointFingerprint: string;
}

/**
 * Browser-owned content key for one remote run. JavaScript can use it to
 * encrypt/decrypt objects and create recipient envelopes, but cannot extract
 * the raw key bytes.
 */
export class BrowserRunKey {
    free(): void;
    [Symbol.dispose](): void;
    createFrameSession(run_identity: string, session_id: Uint8Array, direction: string, key_epoch: number): BrowserEncryptedFrameSession;
    constructor();
    open(object: any): Uint8Array;
    seal(context: any, plaintext: Uint8Array): any;
    sealForRecipient(recipient: any, run_identity: string, key_epoch: number): any;
}

export class RunMatWasm {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    acquireFeaWorkerGrant(context: any, required_ops: any): Promise<any>;
    browseFeaSource(request: any): any;
    cancelExecution(): void;
    checkFeaSource(path: string, inputs: any): Promise<any>;
    checkFeaWorkingSource(request: any): Promise<any>;
    checkFeaWorkspace(request: any): Promise<any>;
    clearProjectHandoff(): void;
    clearWorkspace(): void;
    createFeaFieldScene(run_id: string, field_id: string | null | undefined, shape_mode: string, exaggeration: number, show_undeformed_outline: boolean, view: any, replace_handle?: number | null): Promise<any>;
    delegateFeaWorker(context: any): any;
    discardFeaChanges(id: any): Promise<any>;
    discardUndispatchedFeaWorker(context: any, receipt: any): void;
    /**
     * Return semantic discovery for the exact caller-frozen run snapshot.
     * The Core session verifies it against the installed project handoff
     * before static analysis; no browser filesystem rediscovery occurs.
     */
    discoverTests(value: any): any;
    dispose(): void;
    disposeGeometryPreview(figure_handle?: number | null, geometry_scene_handle?: number | null): void;
    executeRequest(request_value: any): Promise<any>;
    /**
     * Execute one exact planned test in this session. Browser worker adapters
     * use this narrow endpoint; scheduling remains in the portable Rust
     * coordinator.
     */
    executeTestAttempt(input: any): Promise<any>;
    exportFigureScene(handle: number, scene_budget_bytes?: number | null): Promise<Uint8Array | undefined>;
    exportGeometryScene(handle: number): Uint8Array | undefined;
    exportWorkspaceState(include_variables?: string | null): Promise<Uint8Array | undefined>;
    feaCapabilities(): any;
    feaField(run_id: string, field_id: string, options_value: any): Promise<any>;
    fusionPlanForSource(source: string): any;
    gpuStatus(): any;
    importFigureScene(scene: Uint8Array): Promise<number | undefined>;
    importFigureSceneFromPath(path: string): Promise<number | undefined>;
    importGeometryScene(scene: Uint8Array): number | undefined;
    importWorkspaceState(state: Uint8Array): boolean;
    inspectDataFile(path: string): Promise<any>;
    inspectFeaChanges(id: any): Promise<any>;
    installProjectHandoff(value: any): any;
    listProjectEntrypoints(start: string, context: any): Promise<any>;
    materializeDataFileVariable(path: string, array: string, options: any): Promise<any>;
    materializeVariable(selector: any, options: any): Promise<any>;
    memoryUsage(): any;
    packageCacheSnapshot(): Promise<any>;
    planFeaSource(path: string, inputs: any): Promise<any>;
    prepareCapturedProject(request: any, provider: any, filesystem: any): Promise<any>;
    /**
     * Discover and construct the selected immutable plan through the same
     * Core authority used by native hosts.
     */
    prepareTests(snapshot: any, selector: any): any;
    previewGeometry(path: string, budget_value: any): Promise<any>;
    projectRevision(): any;
    publishFeaChanges(id: any): Promise<any>;
    renewFeaRunLease(run_id: string, lease: any): void;
    reportFeaWorker(context: any, usage: any, final_report: boolean): any;
    resetSession(): void;
    retireFeaWorker(context: any, receipt: any): void;
    reviewFeaChanges(request: any): Promise<any>;
    runFeaSource(path: string, plan_id: string, inputs: any): Promise<any>;
    runProjectEntrypoint(start: string, name: string, options: any): Promise<any>;
    setErrorNamespace(namespace: string): void;
    setFeaRunAdmission(admission: any): void;
    setFsProvider(bindings: any): void;
    setFusionPlanEnabled(enabled: boolean): void;
    setInputHandler(handler: any): void;
    setLanguageCompat(mode: string): void;
    stageFeaChanges(request: any): Promise<any>;
    startFeaWorker(context: any): void;
    stats(): any;
    telemetryClientId(): string | undefined;
    telemetryConsent(): boolean;
    workspaceSnapshot(): any;
}

export class WorkerProgramInvocation {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    /**
     * A cancellation return is only request delivery. The host must await
     * run's terminal retirement proof before releasing the selected grant.
     */
    cancel(request: any): void;
    run(): Promise<any>;
    readonly assignment: any;
}

export function bindSurfaceToFigure(surface_id: number, handle: number): void;

export function buildExecutionBundle(project_handoff: any, recipe: any, executable_bytes: Uint8Array): Promise<Uint8Array>;

export function buildGitSnapshot(repository: string, subdir: string, value: any): any;

export function captureSurfacePointer(surface_id: number, x: number, y: number): any;

/**
 * Uses the currently installed host filesystem and optional immutable input
 * manifest. It does not create a session, collector, GPU or foreign runtime.
 */
export function checkSource(request: any): Promise<any>;

export function clearFigure(handle: any): number;

export function closeFigure(handle: any): number;

export function closeGeometryScene(handle: number): boolean;

export function configurePlotSurfaceViewer(surface_id: number, navigation: any, antialiasing: any): void;

export function configureSubplot(rows: number, cols: number, index: number): void;

export function createPlotSurface(canvas: any): Promise<number>;

export function createWorkerProgramInvocation(request: any): WorkerProgramInvocation;

export function currentAxesInfo(): any;

export function currentFigureHandle(): number;

export function decodePackageLock(input: string): any;

export function destroyPlotSurface(surface_id: number): void;

export function editUserRuntimeSettings(source: string, edits: any): string;

export function encodePackageLock(value: any): string;

export function executeOwnedFeaStudyStep(json: string, memory_bytes: number, worker_context: any, worker_admission: any): Promise<string>;

/**
 * Runs inside an owned worker. Its scheduler, receipts and result validation
 * are the same as the in-process serial host; termination belongs to the host.
 */
export function executePreparedFeaStudy(json: string, memory_bytes: number, worker_context: any, worker_admission: any): Promise<string>;

export function executeProgramArtifact(request: any): Promise<any>;

/**
 * Worker entry for an exact admitted Direct, Graph, or owned canonical builtin
 * request. The caller still must supply a real browser worker host; invoking
 * this export on the UI thread is not a CPU-yield or cancellation guarantee.
 */
export function executeWorkerProgram(request: any): Promise<any>;

/**
 * Build the exact browser WebSocket subprotocol list for an authenticated
 * relay capability returned by the admission endpoint.
 */
export function executionRelayProtocols(ticket: string): any;

export function fitPlotSurfaceExtents(surface_id: number): void;

export function flushOpenTelemetry(): Promise<any>;

export function freezeTestSnapshot(value: any): any;

export function getPlotSurfaceCameraState(surface_id: number): any;

export function handlePlotSurfaceEvent(surface_id: number, event: any): void;

export function handoffFromFrozenProject(value: any): any;

export function importFigureScene(scene: Uint8Array): number | undefined;

export function importGeometryScene(scene: Uint8Array): number | undefined;

export function initRunMat(options: any): Promise<RunMatWasm>;

/**
 * Verify and materialize an exact execution bundle into the active browser
 * filesystem provider, returning the existing frozen-project handoff rebased
 * to those bytes. Browser worker hosts should use an ephemeral provider and
 * dispose it with the worker.
 */
export function materializeExecutionBundle(archive: Uint8Array): Promise<any>;

export function measureGeometryScene(handle: number, kind: string, region_ids: any): any;

export function migrateLegacyRunmatConfig(source: string, format: string): any;

export function migrateLegacyRunmatConfigInto(legacy_source: string, destination_source: string, format: string): any;

export function newFigureHandle(): number;

export function onFigureEvent(callback: any): void;

export function openTelemetryStats(): any;

export function packageCacheAcquireLease(provider: any, request: any): Promise<any>;

export function packageCacheGc(provider: any, target_bytes: bigint, retain_recent_ms: bigint): Promise<any>;

export function packageCacheReleaseLease(provider: any, value: any): Promise<void>;

export function packageCacheRenewLease(provider: any, value: any, ttl_ms: bigint): Promise<any>;

export function packageCacheStatus(provider: any): Promise<any>;

export function patchRunmatConfig(source: string, format: string, patch: any): string;

export function pickGeometrySceneRegion(surface_id: number, x: number, y: number, mode: string): any;

export function planGitAcquisition(value: any): any;

export function plotRendererReady(): boolean;

export function plotSurfaceAntialiasingModes(surface_id: number): any;

/**
 * Attach real project-only settings before serializing/encrypting a selected
 * Graph Program. Different compiled language/foreign semantics are rejected.
 */
export function prepareClusterGraph(program_json: Uint8Array, project: any): Uint8Array;

export function prepareClusterProgram(source_path: string, _function?: string | null): Promise<any>;

export function prepareNamedClusterProgram(start: string, name: string, inputs: any): Promise<any>;

export function presentFigureOnSurface(surface_id: number, handle: number): void;

export function presentGeometrySceneOnSurface(surface_id: number, handle: number): void;

export function presentSurface(surface_id: number): void;

export function projectHandoff(source_path: string): Promise<any>;

export function projectRevision(source_path: string): Promise<any>;

export function projectTestLayout(value: any): any;

export function renderCurrentFigureScene(handle: number): void;

export function renderFigureImage(handle: any, width?: number | null, height?: number | null, textmark?: string | null): Promise<Uint8Array>;

export function renderFigureImageWithCameraState(handle: any, width: number | null | undefined, height: number | null | undefined, camera_state: any, textmark?: string | null): Promise<Uint8Array>;

export function renderFigureImageWithTextmark(handle: any, width?: number | null, height?: number | null, textmark?: string | null): Promise<Uint8Array>;

export function renderGeometrySceneImage(handle: number, width?: number | null, height?: number | null, view?: string | null): Promise<Uint8Array>;

export function renderGeometrySceneObservationImage(handle: number, width: number | null | undefined, height: number | null | undefined, view: string | null | undefined, observation: any): Promise<Uint8Array>;

export function resetPlotState(): void;

export function resetPlotSurfaceCamera(surface_id: number): void;

export function resizePlotSurface(surface_id: number, width: number, height: number, pixels_per_point: number): void;

export function resolveProject(request: any, provider: any, filesystem: any): Promise<any>;

export function resolveRunmatConfig(source: string, format: string): any;

export function resolveRuntimeSettings(layers: any): any;

/**
 * Run a complete immutable test plan through the portable Rust coordinator.
 * JavaScript owns only worker construction, transport, termination, and host
 * storage; it does not implement scheduling or lifecycle policy.
 */
export function runTests(input: any, backend: any): Promise<any>;

/**
 * Run tests and project each canonical coordinator event to JavaScript as it
 * occurs. The callback is a projection only; scheduling, lifecycle, results,
 * and report construction remain owned by the portable coordinator.
 */
export function runTestsWithEvents(input: any, backend: any, observer: any): Promise<any>;

export function selectFigure(handle: number): void;

export function sendOpenTelemetryTest(): Promise<any>;

export function setGeometryScenePresentation(surface_id: number, presentation: any): void;

export function setHoldMode(mode: any): boolean;

export function setLogFilter(filter: string): void;

export function setPlotSurfaceCameraState(surface_id: number, state: any, expected_target: any): void;

export function setPlotThemeConfig(theme: any): void;

export function setSurfacePresence(surface_id: number, frame: any): void;

/**
 * Runtime-wide shutdown, not session disposal. Other sessions share this exporter.
 */
export function shutdownOpenTelemetry(): Promise<any>;

/**
 * Exact SDK admission marker for string/null typed string projections.
 */
export function stringElementWireSchemaVersion(): number;

export function subscribeRuntimeLog(callback: any): number;

export function subscribeStdout(callback: any): number;

export function subscribeTraceEvents(callback: any): number;

export function takePlotSurfaceHostActions(surface_id: number): any;

export function unsubscribeRuntimeLog(id: number): void;

export function unsubscribeStdout(id: number): void;

export function unsubscribeTraceEvents(id: number): void;

export function validateGitSnapshot(value: any): any;

export function validateProjectHandoff(value: any): any;

/**
 * Verify signed Server admission evidence under browser-local trust policy and
 * return the exact HPKE recipient accepted for the run.
 */
export function verifyExecutionEndpointIdentity(evidence: any, policy: any): any;

/**
 * Describe the exact stock worker factory from this loaded module. It does
 * not create a probe worker, session, or a second execution runtime.
 */
export function workerProgramInventory(): any;

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
    readonly memory: WebAssembly.Memory;
    readonly executeOwnedFeaStudyStep: (a: number, b: number, c: number, d: any, e: any) => any;
    readonly __wbg_runmatwasm_free: (a: number, b: number) => void;
    readonly runmatwasm_packageCacheSnapshot: (a: number) => any;
    readonly runmatwasm_executeRequest: (a: number, b: any) => any;
    readonly runmatwasm_previewGeometry: (a: number, b: number, c: number, d: any) => any;
    readonly runmatwasm_disposeGeometryPreview: (a: number, b: number, c: number) => [number, number];
    readonly runmatwasm_feaCapabilities: (a: number) => [number, number, number];
    readonly runmatwasm_checkFeaSource: (a: number, b: number, c: number, d: any) => any;
    readonly runmatwasm_checkFeaWorkspace: (a: number, b: any) => any;
    readonly runmatwasm_checkFeaWorkingSource: (a: number, b: any) => any;
    readonly runmatwasm_inspectFeaChanges: (a: number, b: any) => any;
    readonly runmatwasm_reviewFeaChanges: (a: number, b: any) => any;
    readonly runmatwasm_stageFeaChanges: (a: number, b: any) => any;
    readonly runmatwasm_publishFeaChanges: (a: number, b: any) => any;
    readonly runmatwasm_discardFeaChanges: (a: number, b: any) => any;
    readonly runmatwasm_browseFeaSource: (a: number, b: any) => [number, number, number];
    readonly runmatwasm_feaField: (a: number, b: number, c: number, d: number, e: number, f: any) => any;
    readonly runmatwasm_resetSession: (a: number) => [number, number];
    readonly runmatwasm_installProjectHandoff: (a: number, b: any) => [number, number, number];
    readonly runmatwasm_clearProjectHandoff: (a: number) => [number, number];
    readonly runmatwasm_projectRevision: (a: number) => [number, number, number];
    readonly runmatwasm_discoverTests: (a: number, b: any) => [number, number, number];
    readonly runmatwasm_prepareTests: (a: number, b: any, c: any) => [number, number, number];
    readonly runmatwasm_cancelExecution: (a: number) => void;
    readonly runmatwasm_setLanguageCompat: (a: number, b: number, c: number) => void;
    readonly runmatwasm_setErrorNamespace: (a: number, b: number, c: number) => void;
    readonly runmatwasm_setInputHandler: (a: number, b: any) => [number, number];
    readonly runmatwasm_setFusionPlanEnabled: (a: number, b: number) => void;
    readonly runmatwasm_fusionPlanForSource: (a: number, b: number, c: number) => [number, number, number];
    readonly runmatwasm_materializeVariable: (a: number, b: any, c: any) => any;
    readonly runmatwasm_stats: (a: number) => [number, number, number];
    readonly runmatwasm_clearWorkspace: (a: number) => [number, number];
    readonly runmatwasm_exportWorkspaceState: (a: number, b: number, c: number) => any;
    readonly runmatwasm_importWorkspaceState: (a: number, b: number, c: number) => [number, number, number];
    readonly runmatwasm_workspaceSnapshot: (a: number) => [number, number, number];
    readonly runmatwasm_inspectDataFile: (a: number, b: number, c: number) => any;
    readonly runmatwasm_materializeDataFileVariable: (a: number, b: number, c: number, d: number, e: number, f: any) => any;
    readonly runmatwasm_exportFigureScene: (a: number, b: number, c: number) => any;
    readonly runmatwasm_exportGeometryScene: (a: number, b: number) => [number, number, number, number];
    readonly runmatwasm_importFigureScene: (a: number, b: number, c: number) => any;
    readonly runmatwasm_importGeometryScene: (a: number, b: number, c: number) => [number, number, number];
    readonly runmatwasm_createFeaFieldScene: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number, j: any, k: number) => any;
    readonly runmatwasm_importFigureSceneFromPath: (a: number, b: number, c: number) => any;
    readonly runmatwasm_telemetryConsent: (a: number) => number;
    readonly runmatwasm_gpuStatus: (a: number) => [number, number, number];
    readonly runmatwasm_telemetryClientId: (a: number) => [number, number];
    readonly runmatwasm_memoryUsage: (a: number) => [number, number, number];
    readonly runmatwasm_setFsProvider: (a: number, b: any) => [number, number];
    readonly runmatwasm_dispose: (a: number) => void;
    readonly subscribeStdout: (a: any) => [number, number, number];
    readonly unsubscribeStdout: (a: number) => void;
    readonly subscribeRuntimeLog: (a: any) => [number, number, number];
    readonly setLogFilter: (a: number, b: number) => [number, number];
    readonly unsubscribeRuntimeLog: (a: number) => void;
    readonly subscribeTraceEvents: (a: any) => [number, number, number];
    readonly unsubscribeTraceEvents: (a: number) => void;
    readonly runTests: (a: any, b: any) => any;
    readonly runTestsWithEvents: (a: any, b: any, c: any) => any;
    readonly runmatwasm_executeTestAttempt: (a: number, b: any) => any;
    readonly projectTestLayout: (a: any) => [number, number, number];
    readonly freezeTestSnapshot: (a: any) => [number, number, number];
    readonly decodePackageLock: (a: number, b: number) => [number, number, number];
    readonly encodePackageLock: (a: any) => [number, number, number, number];
    readonly planGitAcquisition: (a: any) => [number, number, number];
    readonly buildGitSnapshot: (a: number, b: number, c: number, d: number, e: any) => [number, number, number];
    readonly validateGitSnapshot: (a: any) => [number, number, number];
    readonly resolveProject: (a: any, b: any, c: any) => any;
    readonly projectHandoff: (a: number, b: number) => any;
    readonly projectRevision: (a: number, b: number) => any;
    readonly validateProjectHandoff: (a: any) => [number, number, number];
    readonly handoffFromFrozenProject: (a: any) => [number, number, number];
    readonly runmatwasm_setFeaRunAdmission: (a: number, b: any) => [number, number];
    readonly runmatwasm_renewFeaRunLease: (a: number, b: number, c: number, d: any) => [number, number];
    readonly runmatwasm_delegateFeaWorker: (a: number, b: any) => [number, number, number];
    readonly runmatwasm_reportFeaWorker: (a: number, b: any, c: any, d: number) => [number, number, number];
    readonly runmatwasm_startFeaWorker: (a: number, b: any) => [number, number];
    readonly runmatwasm_discardUndispatchedFeaWorker: (a: number, b: any, c: any) => [number, number];
    readonly runmatwasm_acquireFeaWorkerGrant: (a: number, b: any, c: any) => any;
    readonly runmatwasm_retireFeaWorker: (a: number, b: any, c: any) => [number, number];
    readonly runmatwasm_planFeaSource: (a: number, b: number, c: number, d: any) => any;
    readonly runmatwasm_runFeaSource: (a: number, b: number, c: number, d: number, e: number, f: any) => any;
    readonly executePreparedFeaStudy: (a: number, b: number, c: number, d: any, e: any) => any;
    readonly stringElementWireSchemaVersion: () => number;
    readonly initRunMat: (a: any) => any;
    readonly runmatwasm_listProjectEntrypoints: (a: number, b: number, c: number, d: any) => any;
    readonly packageCacheAcquireLease: (a: any, b: any) => any;
    readonly packageCacheRenewLease: (a: any, b: any, c: bigint) => any;
    readonly packageCacheReleaseLease: (a: any, b: any) => any;
    readonly packageCacheStatus: (a: any) => any;
    readonly packageCacheGc: (a: any, b: bigint, c: bigint) => any;
    readonly importGeometryScene: (a: number, b: number) => [number, number, number];
    readonly importFigureScene: (a: number, b: number) => [number, number, number];
    readonly closeGeometryScene: (a: number) => number;
    readonly runmatwasm_runProjectEntrypoint: (a: number, b: number, c: number, d: number, e: number, f: any) => any;
    readonly prepareNamedClusterProgram: (a: number, b: number, c: number, d: number, e: any) => any;
    readonly runmatwasm_prepareCapturedProject: (a: number, b: any, c: any, d: any) => any;
    readonly executeProgramArtifact: (a: any) => any;
    readonly executeWorkerProgram: (a: any) => any;
    readonly sendOpenTelemetryTest: () => any;
    readonly flushOpenTelemetry: () => any;
    readonly shutdownOpenTelemetry: () => any;
    readonly openTelemetryStats: () => [number, number, number];
    readonly checkSource: (a: any) => any;
    readonly resolveRunmatConfig: (a: number, b: number, c: number, d: number) => [number, number, number];
    readonly patchRunmatConfig: (a: number, b: number, c: number, d: number, e: any) => [number, number, number, number];
    readonly migrateLegacyRunmatConfig: (a: number, b: number, c: number, d: number) => [number, number, number];
    readonly migrateLegacyRunmatConfigInto: (a: number, b: number, c: number, d: number, e: number, f: number) => [number, number, number];
    readonly resolveRuntimeSettings: (a: any) => [number, number, number];
    readonly editUserRuntimeSettings: (a: number, b: number, c: any) => [number, number, number, number];
    readonly prepareClusterProgram: (a: number, b: number, c: number, d: number) => any;
    readonly prepareClusterGraph: (a: number, b: number, c: any) => [number, number, number, number];
    readonly __wbg_browserexecutionrecipient_free: (a: number, b: number) => void;
    readonly browserexecutionrecipient_new: (a: number, b: number, c: bigint, d: bigint) => [number, number, number];
    readonly browserexecutionrecipient_recipient: (a: number) => [number, number, number];
    readonly browserexecutionrecipient_seal: (a: number, b: any, c: number, d: number) => [number, number, number];
    readonly browserexecutionrecipient_open: (a: number, b: any) => [number, number, number, number];
    readonly browserexecutionrecipient_openRunKey: (a: number, b: any, c: number, d: number, e: number) => [number, number, number];
    readonly __wbg_browserrunkey_free: (a: number, b: number) => void;
    readonly browserrunkey_new: () => [number, number, number];
    readonly browserrunkey_sealForRecipient: (a: number, b: any, c: number, d: number, e: number) => [number, number, number];
    readonly browserrunkey_seal: (a: number, b: any, c: number, d: number) => [number, number, number];
    readonly browserrunkey_open: (a: number, b: any) => [number, number, number, number];
    readonly browserrunkey_createFrameSession: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number) => [number, number, number];
    readonly __wbg_browserencryptedframesession_free: (a: number, b: number) => void;
    readonly browserencryptedframesession_seal: (a: number, b: number, c: number, d: number) => [number, number, number, number];
    readonly browserencryptedframesession_open: (a: number, b: number, c: number) => [number, number, number, number];
    readonly buildExecutionBundle: (a: any, b: any, c: number, d: number) => any;
    readonly materializeExecutionBundle: (a: number, b: number) => any;
    readonly __wbg_workerprograminvocation_free: (a: number, b: number) => void;
    readonly workerProgramInventory: () => [number, number, number];
    readonly createWorkerProgramInvocation: (a: any) => [number, number, number];
    readonly workerprograminvocation_assignment: (a: number) => [number, number, number];
    readonly workerprograminvocation_cancel: (a: number, b: any) => [number, number];
    readonly workerprograminvocation_run: (a: number) => any;
    readonly verifyExecutionEndpointIdentity: (a: any, b: any) => [number, number, number];
    readonly executionRelayProtocols: (a: number, b: number) => [number, number, number];
    readonly __wbg_browserremotesubmission_free: (a: number, b: number) => void;
    readonly browserremotesubmission_new: (a: number, b: number, c: any) => [number, number, number];
    readonly browserremotesubmission_endpointFingerprint: (a: number) => [number, number];
    readonly browserremotesubmission_directQuicEndpoints: (a: number) => [number, number, number];
    readonly browserremotesubmission_sealRunKeyEnvelope: (a: number, b: number) => [number, number, number, number];
    readonly browserremotesubmission_sealRunKeyForRecipient: (a: number, b: any, c: number) => [number, number, number, number];
    readonly browserremotesubmission_encryptObject: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number, j: bigint, k: number) => [number, number, number, number];
    readonly browserremotesubmission_decryptObject: (a: number, b: number, c: number, d: number, e: number) => [number, number, number, number];
    readonly browserremotesubmission_createFrameSession: (a: number, b: number, c: number, d: number, e: number, f: number) => [number, number, number];
    readonly renderCurrentFigureScene: (a: number) => [number, number];
    readonly createPlotSurface: (a: any) => any;
    readonly resizePlotSurface: (a: number, b: number, c: number, d: number) => [number, number];
    readonly bindSurfaceToFigure: (a: number, b: number) => [number, number];
    readonly presentSurface: (a: number) => [number, number];
    readonly presentFigureOnSurface: (a: number, b: number) => [number, number];
    readonly presentGeometrySceneOnSurface: (a: number, b: number) => [number, number];
    readonly setGeometryScenePresentation: (a: number, b: any) => [number, number];
    readonly pickGeometrySceneRegion: (a: number, b: number, c: number, d: number, e: number) => [number, number, number];
    readonly handlePlotSurfaceEvent: (a: number, b: any) => [number, number];
    readonly configurePlotSurfaceViewer: (a: number, b: any, c: any) => [number, number];
    readonly plotSurfaceAntialiasingModes: (a: number) => [number, number, number];
    readonly fitPlotSurfaceExtents: (a: number) => [number, number];
    readonly resetPlotSurfaceCamera: (a: number) => [number, number];
    readonly getPlotSurfaceCameraState: (a: number) => [number, number, number];
    readonly setPlotSurfaceCameraState: (a: number, b: any, c: any) => [number, number];
    readonly takePlotSurfaceHostActions: (a: number) => [number, number, number];
    readonly setPlotThemeConfig: (a: any) => [number, number];
    readonly configureSubplot: (a: number, b: number, c: number) => [number, number];
    readonly setHoldMode: (a: any) => [number, number, number];
    readonly clearFigure: (a: any) => [number, number, number];
    readonly resetPlotState: () => void;
    readonly closeFigure: (a: any) => [number, number, number];
    readonly currentAxesInfo: () => any;
    readonly renderFigureImage: (a: any, b: number, c: number, d: number, e: number) => any;
    readonly renderFigureImageWithTextmark: (a: any, b: number, c: number, d: number, e: number) => any;
    readonly renderGeometrySceneImage: (a: number, b: number, c: number, d: number, e: number) => any;
    readonly renderGeometrySceneObservationImage: (a: number, b: number, c: number, d: number, e: number, f: any) => any;
    readonly measureGeometryScene: (a: number, b: number, c: number, d: any) => [number, number, number];
    readonly renderFigureImageWithCameraState: (a: any, b: number, c: number, d: any, e: number, f: number) => any;
    readonly plotRendererReady: () => number;
    readonly onFigureEvent: (a: any) => [number, number];
    readonly setSurfacePresence: (a: number, b: any) => [number, number];
    readonly captureSurfacePointer: (a: number, b: number, c: number) => [number, number, number];
    readonly newFigureHandle: () => number;
    readonly currentFigureHandle: () => number;
    readonly selectFigure: (a: number) => void;
    readonly destroyPlotSurface: (a: number) => void;
    readonly wasm_bindgen__convert__closures_____invoke__ha50be2f088cd7f8a: (a: number, b: number, c: any) => [number, number];
    readonly wasm_bindgen__convert__closures_____invoke__h274924f872d4aeda: (a: number, b: number, c: any, d: any) => void;
    readonly wasm_bindgen__convert__closures_____invoke__hd754023dc2c6b4d0: (a: number, b: number, c: any) => void;
    readonly wasm_bindgen__convert__closures_____invoke__h3bd95da854e9c8e8: (a: number, b: number, c: any) => void;
    readonly wasm_bindgen__convert__closures_____invoke__hd754023dc2c6b4d0_3: (a: number, b: number, c: any) => void;
    readonly wasm_bindgen__convert__closures_____invoke__h0459b599a1f48615: (a: number, b: number, c: any) => void;
    readonly wasm_bindgen__convert__closures_____invoke__hc917c8c5919a9646: (a: number, b: number) => void;
    readonly wasm_bindgen__convert__closures_____invoke__h71e8b736a4e3d596: (a: number, b: number) => void;
    readonly __wbindgen_malloc: (a: number, b: number) => number;
    readonly __wbindgen_realloc: (a: number, b: number, c: number, d: number) => number;
    readonly __wbindgen_exn_store: (a: number) => void;
    readonly __externref_table_alloc: () => number;
    readonly __wbindgen_externrefs: WebAssembly.Table;
    readonly __wbindgen_free: (a: number, b: number, c: number) => void;
    readonly __wbindgen_destroy_closure: (a: number, b: number) => void;
    readonly __externref_table_dealloc: (a: number) => void;
    readonly __wbindgen_start: () => void;
}

export type SyncInitInput = BufferSource | WebAssembly.Module;

/**
 * Instantiates the given `module`, which can either be bytes or
 * a precompiled `WebAssembly.Module`.
 *
 * @param {{ module: SyncInitInput }} module - Passing `SyncInitInput` directly is deprecated.
 *
 * @returns {InitOutput}
 */
export function initSync(module: { module: SyncInitInput } | SyncInitInput): InitOutput;

/**
 * If `module_or_path` is {RequestInfo} or {URL}, makes a request and
 * for everything else, calls `WebAssembly.instantiate` directly.
 *
 * @param {{ module_or_path: InitInput | Promise<InitInput> }} module_or_path - Passing `InitInput` directly is deprecated.
 *
 * @returns {Promise<InitOutput>}
 */
export default function __wbg_init (module_or_path?: { module_or_path: InitInput | Promise<InitInput> } | InitInput | Promise<InitInput>): Promise<InitOutput>;
