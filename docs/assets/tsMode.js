import { t as typescriptDefaults, m as monaco_editor_core_star } from "./index.js";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __reExport = (target, mod, secondTarget) => (__copyProps(target, mod, "default"), secondTarget);
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
var monaco_editor_core_exports = {};
__reExport(monaco_editor_core_exports, monaco_editor_core_star);
var WorkerManager = class {
  constructor(_modeId, _defaults) {
    this._modeId = _modeId;
    this._defaults = _defaults;
    this._worker = null;
    this._client = null;
    this._configChangeListener = this._defaults.onDidChange(() => this._stopWorker());
    this._updateExtraLibsToken = 0;
    this._extraLibsChangeListener = this._defaults.onDidExtraLibsChange(() => this._updateExtraLibs());
  }
  _configChangeListener;
  _updateExtraLibsToken;
  _extraLibsChangeListener;
  _worker;
  _client;
  dispose() {
    this._configChangeListener.dispose();
    this._extraLibsChangeListener.dispose();
    this._stopWorker();
  }
  _stopWorker() {
    if (this._worker) {
      this._worker.dispose();
      this._worker = null;
    }
    this._client = null;
  }
  async _updateExtraLibs() {
    if (!this._worker) {
      return;
    }
    const myToken = ++this._updateExtraLibsToken;
    const proxy = await this._worker.getProxy();
    if (this._updateExtraLibsToken !== myToken) {
      return;
    }
    proxy.updateExtraLibs(this._defaults.getExtraLibs());
  }
  _getClient() {
    if (!this._client) {
      this._client = (async () => {
        this._worker = monaco_editor_core_exports.editor.createWebWorker({
          moduleId: "vs/language/typescript/tsWorker",
          label: this._modeId,
          keepIdleModels: true,
          createData: {
            compilerOptions: this._defaults.getCompilerOptions(),
            extraLibs: this._defaults.getExtraLibs(),
            customWorkerPath: this._defaults.workerOptions.customWorkerPath,
            inlayHintsOptions: this._defaults.inlayHintsOptions
          }
        });
        if (this._defaults.getEagerModelSync()) {
          return await this._worker.withSyncedResources(monaco_editor_core_exports.editor.getModels().filter((model) => model.getLanguageId() === this._modeId).map((model) => model.uri));
        }
        return await this._worker.getProxy();
      })();
    }
    return this._client;
  }
  async getLanguageServiceWorker(...resources) {
    const client = await this._getClient();
    if (this._worker) {
      await this._worker.withSyncedResources(resources);
    }
    return client;
  }
};
var libFileSet = {};
libFileSet["lib.d.ts"] = true;
libFileSet["lib.decorators.d.ts"] = true;
libFileSet["lib.decorators.legacy.d.ts"] = true;
libFileSet["lib.dom.d.ts"] = true;
libFileSet["lib.dom.iterable.d.ts"] = true;
libFileSet["lib.es2015.collection.d.ts"] = true;
libFileSet["lib.es2015.core.d.ts"] = true;
libFileSet["lib.es2015.d.ts"] = true;
libFileSet["lib.es2015.generator.d.ts"] = true;
libFileSet["lib.es2015.iterable.d.ts"] = true;
libFileSet["lib.es2015.promise.d.ts"] = true;
libFileSet["lib.es2015.proxy.d.ts"] = true;
libFileSet["lib.es2015.reflect.d.ts"] = true;
libFileSet["lib.es2015.symbol.d.ts"] = true;
libFileSet["lib.es2015.symbol.wellknown.d.ts"] = true;
libFileSet["lib.es2016.array.include.d.ts"] = true;
libFileSet["lib.es2016.d.ts"] = true;
libFileSet["lib.es2016.full.d.ts"] = true;
libFileSet["lib.es2017.d.ts"] = true;
libFileSet["lib.es2017.full.d.ts"] = true;
libFileSet["lib.es2017.intl.d.ts"] = true;
libFileSet["lib.es2017.object.d.ts"] = true;
libFileSet["lib.es2017.sharedmemory.d.ts"] = true;
libFileSet["lib.es2017.string.d.ts"] = true;
libFileSet["lib.es2017.typedarrays.d.ts"] = true;
libFileSet["lib.es2018.asyncgenerator.d.ts"] = true;
libFileSet["lib.es2018.asynciterable.d.ts"] = true;
libFileSet["lib.es2018.d.ts"] = true;
libFileSet["lib.es2018.full.d.ts"] = true;
libFileSet["lib.es2018.intl.d.ts"] = true;
libFileSet["lib.es2018.promise.d.ts"] = true;
libFileSet["lib.es2018.regexp.d.ts"] = true;
libFileSet["lib.es2019.array.d.ts"] = true;
libFileSet["lib.es2019.d.ts"] = true;
libFileSet["lib.es2019.full.d.ts"] = true;
libFileSet["lib.es2019.intl.d.ts"] = true;
libFileSet["lib.es2019.object.d.ts"] = true;
libFileSet["lib.es2019.string.d.ts"] = true;
libFileSet["lib.es2019.symbol.d.ts"] = true;
libFileSet["lib.es2020.bigint.d.ts"] = true;
libFileSet["lib.es2020.d.ts"] = true;
libFileSet["lib.es2020.date.d.ts"] = true;
libFileSet["lib.es2020.full.d.ts"] = true;
libFileSet["lib.es2020.intl.d.ts"] = true;
libFileSet["lib.es2020.number.d.ts"] = true;
libFileSet["lib.es2020.promise.d.ts"] = true;
libFileSet["lib.es2020.sharedmemory.d.ts"] = true;
libFileSet["lib.es2020.string.d.ts"] = true;
libFileSet["lib.es2020.symbol.wellknown.d.ts"] = true;
libFileSet["lib.es2021.d.ts"] = true;
libFileSet["lib.es2021.full.d.ts"] = true;
libFileSet["lib.es2021.intl.d.ts"] = true;
libFileSet["lib.es2021.promise.d.ts"] = true;
libFileSet["lib.es2021.string.d.ts"] = true;
libFileSet["lib.es2021.weakref.d.ts"] = true;
libFileSet["lib.es2022.array.d.ts"] = true;
libFileSet["lib.es2022.d.ts"] = true;
libFileSet["lib.es2022.error.d.ts"] = true;
libFileSet["lib.es2022.full.d.ts"] = true;
libFileSet["lib.es2022.intl.d.ts"] = true;
libFileSet["lib.es2022.object.d.ts"] = true;
libFileSet["lib.es2022.regexp.d.ts"] = true;
libFileSet["lib.es2022.sharedmemory.d.ts"] = true;
libFileSet["lib.es2022.string.d.ts"] = true;
libFileSet["lib.es2023.array.d.ts"] = true;
libFileSet["lib.es2023.d.ts"] = true;
libFileSet["lib.es2023.full.d.ts"] = true;
libFileSet["lib.es5.d.ts"] = true;
libFileSet["lib.es6.d.ts"] = true;
libFileSet["lib.esnext.d.ts"] = true;
libFileSet["lib.esnext.full.d.ts"] = true;
libFileSet["lib.esnext.intl.d.ts"] = true;
libFileSet["lib.scripthost.d.ts"] = true;
libFileSet["lib.webworker.d.ts"] = true;
libFileSet["lib.webworker.importscripts.d.ts"] = true;
libFileSet["lib.webworker.iterable.d.ts"] = true;
function flattenDiagnosticMessageText(diag, newLine, indent = 0) {
  if (typeof diag === "string") {
    return diag;
  } else if (diag === void 0) {
    return "";
  }
  let result = "";
  if (indent) {
    result += newLine;
    for (let i = 0; i < indent; i++) {
      result += "  ";
    }
  }
  result += diag.messageText;
  indent++;
  if (diag.next) {
    for (const kid of diag.next) {
      result += flattenDiagnosticMessageText(kid, newLine, indent);
    }
  }
  return result;
}
function displayPartsToString(displayParts) {
  if (displayParts) {
    return displayParts.map((displayPart) => displayPart.text).join("");
  }
  return "";
}
var Adapter = class {
  constructor(_worker) {
    this._worker = _worker;
  }
  _textSpanToRange(model, span) {
    let p1 = model.getPositionAt(span.start);
    let p2 = model.getPositionAt(span.start + span.length);
    let { lineNumber: startLineNumber, column: startColumn } = p1;
    let { lineNumber: endLineNumber, column: endColumn } = p2;
    return { startLineNumber, startColumn, endLineNumber, endColumn };
  }
};
var LibFiles = class {
  constructor(_worker) {
    this._worker = _worker;
    this._libFiles = {};
    this._hasFetchedLibFiles = false;
    this._fetchLibFilesPromise = null;
  }
  _libFiles;
  _hasFetchedLibFiles;
  _fetchLibFilesPromise;
  isLibFile(uri) {
    if (!uri) {
      return false;
    }
    if (uri.path.indexOf("/lib.") === 0) {
      return !!libFileSet[uri.path.slice(1)];
    }
    return false;
  }
  getOrCreateModel(fileName) {
    const uri = monaco_editor_core_exports.Uri.parse(fileName);
    const model = monaco_editor_core_exports.editor.getModel(uri);
    if (model) {
      return model;
    }
    if (this.isLibFile(uri) && this._hasFetchedLibFiles) {
      return monaco_editor_core_exports.editor.createModel(this._libFiles[uri.path.slice(1)], "typescript", uri);
    }
    const matchedLibFile = typescriptDefaults.getExtraLibs()[fileName];
    if (matchedLibFile) {
      return monaco_editor_core_exports.editor.createModel(matchedLibFile.content, "typescript", uri);
    }
    return null;
  }
  _containsLibFile(uris) {
    for (let uri of uris) {
      if (this.isLibFile(uri)) {
        return true;
      }
    }
    return false;
  }
  async fetchLibFilesIfNecessary(uris) {
    if (!this._containsLibFile(uris)) {
      return;
    }
    await this._fetchLibFiles();
  }
  _fetchLibFiles() {
    if (!this._fetchLibFilesPromise) {
      this._fetchLibFilesPromise = this._worker().then((w) => w.getLibFiles()).then((libFiles) => {
        this._hasFetchedLibFiles = true;
        this._libFiles = libFiles;
      });
    }
    return this._fetchLibFilesPromise;
  }
};
var DiagnosticsAdapter = class extends Adapter {
  constructor(_libFiles, _defaults, _selector, worker) {
    super(worker);
    this._libFiles = _libFiles;
    this._defaults = _defaults;
    this._selector = _selector;
    const onModelAdd = (model) => {
      if (model.getLanguageId() !== _selector) {
        return;
      }
      const maybeValidate = () => {
        const { onlyVisible } = this._defaults.getDiagnosticsOptions();
        if (onlyVisible) {
          if (model.isAttachedToEditor()) {
            this._doValidate(model);
          }
        } else {
          this._doValidate(model);
        }
      };
      let handle;
      const changeSubscription = model.onDidChangeContent(() => {
        clearTimeout(handle);
        handle = window.setTimeout(maybeValidate, 500);
      });
      const visibleSubscription = model.onDidChangeAttached(() => {
        const { onlyVisible } = this._defaults.getDiagnosticsOptions();
        if (onlyVisible) {
          if (model.isAttachedToEditor()) {
            maybeValidate();
          } else {
            monaco_editor_core_exports.editor.setModelMarkers(model, this._selector, []);
          }
        }
      });
      this._listener[model.uri.toString()] = {
        dispose() {
          changeSubscription.dispose();
          visibleSubscription.dispose();
          clearTimeout(handle);
        }
      };
      maybeValidate();
    };
    const onModelRemoved = (model) => {
      monaco_editor_core_exports.editor.setModelMarkers(model, this._selector, []);
      const key = model.uri.toString();
      if (this._listener[key]) {
        this._listener[key].dispose();
        delete this._listener[key];
      }
    };
    this._disposables.push(monaco_editor_core_exports.editor.onDidCreateModel((model) => onModelAdd(model)));
    this._disposables.push(monaco_editor_core_exports.editor.onWillDisposeModel(onModelRemoved));
    this._disposables.push(monaco_editor_core_exports.editor.onDidChangeModelLanguage((event) => {
      onModelRemoved(event.model);
      onModelAdd(event.model);
    }));
    this._disposables.push({
      dispose() {
        for (const model of monaco_editor_core_exports.editor.getModels()) {
          onModelRemoved(model);
        }
      }
    });
    const recomputeDiagostics = () => {
      for (const model of monaco_editor_core_exports.editor.getModels()) {
        onModelRemoved(model);
        onModelAdd(model);
      }
    };
    this._disposables.push(this._defaults.onDidChange(recomputeDiagostics));
    this._disposables.push(this._defaults.onDidExtraLibsChange(recomputeDiagostics));
    monaco_editor_core_exports.editor.getModels().forEach((model) => onModelAdd(model));
  }
  _disposables = [];
  _listener = /* @__PURE__ */ Object.create(null);
  dispose() {
    this._disposables.forEach((d) => d && d.dispose());
    this._disposables = [];
  }
  async _doValidate(model) {
    const worker = await this._worker(model.uri);
    if (model.isDisposed()) {
      return;
    }
    const promises = [];
    const { noSyntaxValidation, noSemanticValidation, noSuggestionDiagnostics } = this._defaults.getDiagnosticsOptions();
    if (!noSyntaxValidation) {
      promises.push(worker.getSyntacticDiagnostics(model.uri.toString()));
    }
    if (!noSemanticValidation) {
      promises.push(worker.getSemanticDiagnostics(model.uri.toString()));
    }
    if (!noSuggestionDiagnostics) {
      promises.push(worker.getSuggestionDiagnostics(model.uri.toString()));
    }
    const allDiagnostics = await Promise.all(promises);
    if (!allDiagnostics || model.isDisposed()) {
      return;
    }
    const diagnostics = allDiagnostics.reduce((p, c) => c.concat(p), []).filter((d) => (this._defaults.getDiagnosticsOptions().diagnosticCodesToIgnore || []).indexOf(d.code) === -1);
    const relatedUris = diagnostics.map((d) => d.relatedInformation || []).reduce((p, c) => c.concat(p), []).map((relatedInformation) => relatedInformation.file ? monaco_editor_core_exports.Uri.parse(relatedInformation.file.fileName) : null);
    await this._libFiles.fetchLibFilesIfNecessary(relatedUris);
    if (model.isDisposed()) {
      return;
    }
    monaco_editor_core_exports.editor.setModelMarkers(model, this._selector, diagnostics.map((d) => this._convertDiagnostics(model, d)));
  }
  _convertDiagnostics(model, diag) {
    const diagStart = diag.start || 0;
    const diagLength = diag.length || 1;
    const { lineNumber: startLineNumber, column: startColumn } = model.getPositionAt(diagStart);
    const { lineNumber: endLineNumber, column: endColumn } = model.getPositionAt(diagStart + diagLength);
    const tags = [];
    if (diag.reportsUnnecessary) {
      tags.push(monaco_editor_core_exports.MarkerTag.Unnecessary);
    }
    if (diag.reportsDeprecated) {
      tags.push(monaco_editor_core_exports.MarkerTag.Deprecated);
    }
    return {
      severity: this._tsDiagnosticCategoryToMarkerSeverity(diag.category),
      startLineNumber,
      startColumn,
      endLineNumber,
      endColumn,
      message: flattenDiagnosticMessageText(diag.messageText, "\n"),
      code: diag.code.toString(),
      tags,
      relatedInformation: this._convertRelatedInformation(model, diag.relatedInformation)
    };
  }
  _convertRelatedInformation(model, relatedInformation) {
    if (!relatedInformation) {
      return [];
    }
    const result = [];
    relatedInformation.forEach((info) => {
      let relatedResource = model;
      if (info.file) {
        relatedResource = this._libFiles.getOrCreateModel(info.file.fileName);
      }
      if (!relatedResource) {
        return;
      }
      const infoStart = info.start || 0;
      const infoLength = info.length || 1;
      const { lineNumber: startLineNumber, column: startColumn } = relatedResource.getPositionAt(infoStart);
      const { lineNumber: endLineNumber, column: endColumn } = relatedResource.getPositionAt(infoStart + infoLength);
      result.push({
        resource: relatedResource.uri,
        startLineNumber,
        startColumn,
        endLineNumber,
        endColumn,
        message: flattenDiagnosticMessageText(info.messageText, "\n")
      });
    });
    return result;
  }
  _tsDiagnosticCategoryToMarkerSeverity(category) {
    switch (category) {
      case 1:
        return monaco_editor_core_exports.MarkerSeverity.Error;
      case 3:
        return monaco_editor_core_exports.MarkerSeverity.Info;
      case 0:
        return monaco_editor_core_exports.MarkerSeverity.Warning;
      case 2:
        return monaco_editor_core_exports.MarkerSeverity.Hint;
    }
    return monaco_editor_core_exports.MarkerSeverity.Info;
  }
};
var SuggestAdapter = class extends Adapter {
  get triggerCharacters() {
    return ["."];
  }
  async provideCompletionItems(model, position, _context, token) {
    const wordInfo = model.getWordUntilPosition(position);
    const wordRange = new monaco_editor_core_exports.Range(position.lineNumber, wordInfo.startColumn, position.lineNumber, wordInfo.endColumn);
    const resource = model.uri;
    const offset = model.getOffsetAt(position);
    const worker = await this._worker(resource);
    if (model.isDisposed()) {
      return;
    }
    const info = await worker.getCompletionsAtPosition(resource.toString(), offset);
    if (!info || model.isDisposed()) {
      return;
    }
    const suggestions = info.entries.map((entry) => {
      let range = wordRange;
      if (entry.replacementSpan) {
        const p1 = model.getPositionAt(entry.replacementSpan.start);
        const p2 = model.getPositionAt(entry.replacementSpan.start + entry.replacementSpan.length);
        range = new monaco_editor_core_exports.Range(p1.lineNumber, p1.column, p2.lineNumber, p2.column);
      }
      const tags = [];
      if (entry.kindModifiers !== void 0 && entry.kindModifiers.indexOf("deprecated") !== -1) {
        tags.push(monaco_editor_core_exports.languages.CompletionItemTag.Deprecated);
      }
      return {
        uri: resource,
        position,
        offset,
        range,
        label: entry.name,
        insertText: entry.name,
        sortText: entry.sortText,
        kind: SuggestAdapter.convertKind(entry.kind),
        tags
      };
    });
    return {
      suggestions
    };
  }
  async resolveCompletionItem(item, token) {
    const myItem = item;
    const resource = myItem.uri;
    const position = myItem.position;
    const offset = myItem.offset;
    const worker = await this._worker(resource);
    const details = await worker.getCompletionEntryDetails(resource.toString(), offset, myItem.label);
    if (!details) {
      return myItem;
    }
    return {
      uri: resource,
      position,
      label: details.name,
      kind: SuggestAdapter.convertKind(details.kind),
      detail: displayPartsToString(details.displayParts),
      documentation: {
        value: SuggestAdapter.createDocumentationString(details)
      }
    };
  }
  static convertKind(kind) {
    switch (kind) {
      case Kind.primitiveType:
      case Kind.keyword:
        return monaco_editor_core_exports.languages.CompletionItemKind.Keyword;
      case Kind.variable:
      case Kind.localVariable:
        return monaco_editor_core_exports.languages.CompletionItemKind.Variable;
      case Kind.memberVariable:
      case Kind.memberGetAccessor:
      case Kind.memberSetAccessor:
        return monaco_editor_core_exports.languages.CompletionItemKind.Field;
      case Kind.function:
      case Kind.memberFunction:
      case Kind.constructSignature:
      case Kind.callSignature:
      case Kind.indexSignature:
        return monaco_editor_core_exports.languages.CompletionItemKind.Function;
      case Kind.enum:
        return monaco_editor_core_exports.languages.CompletionItemKind.Enum;
      case Kind.module:
        return monaco_editor_core_exports.languages.CompletionItemKind.Module;
      case Kind.class:
        return monaco_editor_core_exports.languages.CompletionItemKind.Class;
      case Kind.interface:
        return monaco_editor_core_exports.languages.CompletionItemKind.Interface;
      case Kind.warning:
        return monaco_editor_core_exports.languages.CompletionItemKind.File;
    }
    return monaco_editor_core_exports.languages.CompletionItemKind.Property;
  }
  static createDocumentationString(details) {
    let documentationString = displayPartsToString(details.documentation);
    if (details.tags) {
      for (const tag of details.tags) {
        documentationString += `

${tagToString(tag)}`;
      }
    }
    return documentationString;
  }
};
function tagToString(tag) {
  let tagLabel = `*@${tag.name}*`;
  if (tag.name === "param" && tag.text) {
    const [paramName, ...rest] = tag.text;
    tagLabel += `\`${paramName.text}\``;
    if (rest.length > 0)
      tagLabel += ` — ${rest.map((r) => r.text).join(" ")}`;
  } else if (Array.isArray(tag.text)) {
    tagLabel += ` — ${tag.text.map((r) => r.text).join(" ")}`;
  } else if (tag.text) {
    tagLabel += ` — ${tag.text}`;
  }
  return tagLabel;
}
var SignatureHelpAdapter = class extends Adapter {
  signatureHelpTriggerCharacters = ["(", ","];
  static _toSignatureHelpTriggerReason(context) {
    switch (context.triggerKind) {
      case monaco_editor_core_exports.languages.SignatureHelpTriggerKind.TriggerCharacter:
        if (context.triggerCharacter) {
          if (context.isRetrigger) {
            return { kind: "retrigger", triggerCharacter: context.triggerCharacter };
          } else {
            return { kind: "characterTyped", triggerCharacter: context.triggerCharacter };
          }
        } else {
          return { kind: "invoked" };
        }
      case monaco_editor_core_exports.languages.SignatureHelpTriggerKind.ContentChange:
        return context.isRetrigger ? { kind: "retrigger" } : { kind: "invoked" };
      case monaco_editor_core_exports.languages.SignatureHelpTriggerKind.Invoke:
      default:
        return { kind: "invoked" };
    }
  }
  async provideSignatureHelp(model, position, token, context) {
    const resource = model.uri;
    const offset = model.getOffsetAt(position);
    const worker = await this._worker(resource);
    if (model.isDisposed()) {
      return;
    }
    const info = await worker.getSignatureHelpItems(resource.toString(), offset, {
      triggerReason: SignatureHelpAdapter._toSignatureHelpTriggerReason(context)
    });
    if (!info || model.isDisposed()) {
      return;
    }
    const ret = {
      activeSignature: info.selectedItemIndex,
      activeParameter: info.argumentIndex,
      signatures: []
    };
    info.items.forEach((item) => {
      const signature = {
        label: "",
        parameters: []
      };
      signature.documentation = {
        value: displayPartsToString(item.documentation)
      };
      signature.label += displayPartsToString(item.prefixDisplayParts);
      item.parameters.forEach((p, i, a) => {
        const label = displayPartsToString(p.displayParts);
        const parameter = {
          label,
          documentation: {
            value: displayPartsToString(p.documentation)
          }
        };
        signature.label += label;
        signature.parameters.push(parameter);
        if (i < a.length - 1) {
          signature.label += displayPartsToString(item.separatorDisplayParts);
        }
      });
      signature.label += displayPartsToString(item.suffixDisplayParts);
      ret.signatures.push(signature);
    });
    return {
      value: ret,
      dispose() {
      }
    };
  }
};
var QuickInfoAdapter = class extends Adapter {
  async provideHover(model, position, token) {
    const resource = model.uri;
    const offset = model.getOffsetAt(position);
    const worker = await this._worker(resource);
    if (model.isDisposed()) {
      return;
    }
    const info = await worker.getQuickInfoAtPosition(resource.toString(), offset);
    if (!info || model.isDisposed()) {
      return;
    }
    const documentation = displayPartsToString(info.documentation);
    const tags = info.tags ? info.tags.map((tag) => tagToString(tag)).join("  \n\n") : "";
    const contents = displayPartsToString(info.displayParts);
    return {
      range: this._textSpanToRange(model, info.textSpan),
      contents: [
        {
          value: "```typescript\n" + contents + "\n```\n"
        },
        {
          value: documentation + (tags ? "\n\n" + tags : "")
        }
      ]
    };
  }
};
var DocumentHighlightAdapter = class extends Adapter {
  async provideDocumentHighlights(model, position, token) {
    const resource = model.uri;
    const offset = model.getOffsetAt(position);
    const worker = await this._worker(resource);
    if (model.isDisposed()) {
      return;
    }
    const entries = await worker.getDocumentHighlights(resource.toString(), offset, [
      resource.toString()
    ]);
    if (!entries || model.isDisposed()) {
      return;
    }
    return entries.flatMap((entry) => {
      return entry.highlightSpans.map((highlightSpans) => {
        return {
          range: this._textSpanToRange(model, highlightSpans.textSpan),
          kind: highlightSpans.kind === "writtenReference" ? monaco_editor_core_exports.languages.DocumentHighlightKind.Write : monaco_editor_core_exports.languages.DocumentHighlightKind.Text
        };
      });
    });
  }
};
var DefinitionAdapter = class extends Adapter {
  constructor(_libFiles, worker) {
    super(worker);
    this._libFiles = _libFiles;
  }
  async provideDefinition(model, position, token) {
    const resource = model.uri;
    const offset = model.getOffsetAt(position);
    const worker = await this._worker(resource);
    if (model.isDisposed()) {
      return;
    }
    const entries = await worker.getDefinitionAtPosition(resource.toString(), offset);
    if (!entries || model.isDisposed()) {
      return;
    }
    await this._libFiles.fetchLibFilesIfNecessary(entries.map((entry) => monaco_editor_core_exports.Uri.parse(entry.fileName)));
    if (model.isDisposed()) {
      return;
    }
    const result = [];
    for (let entry of entries) {
      const refModel = this._libFiles.getOrCreateModel(entry.fileName);
      if (refModel) {
        result.push({
          uri: refModel.uri,
          range: this._textSpanToRange(refModel, entry.textSpan)
        });
      }
    }
    return result;
  }
};
var ReferenceAdapter = class extends Adapter {
  constructor(_libFiles, worker) {
    super(worker);
    this._libFiles = _libFiles;
  }
  async provideReferences(model, position, context, token) {
    const resource = model.uri;
    const offset = model.getOffsetAt(position);
    const worker = await this._worker(resource);
    if (model.isDisposed()) {
      return;
    }
    const entries = await worker.getReferencesAtPosition(resource.toString(), offset);
    if (!entries || model.isDisposed()) {
      return;
    }
    await this._libFiles.fetchLibFilesIfNecessary(entries.map((entry) => monaco_editor_core_exports.Uri.parse(entry.fileName)));
    if (model.isDisposed()) {
      return;
    }
    const result = [];
    for (let entry of entries) {
      const refModel = this._libFiles.getOrCreateModel(entry.fileName);
      if (refModel) {
        result.push({
          uri: refModel.uri,
          range: this._textSpanToRange(refModel, entry.textSpan)
        });
      }
    }
    return result;
  }
};
var OutlineAdapter = class extends Adapter {
  async provideDocumentSymbols(model, token) {
    const resource = model.uri;
    const worker = await this._worker(resource);
    if (model.isDisposed()) {
      return;
    }
    const root = await worker.getNavigationTree(resource.toString());
    if (!root || model.isDisposed()) {
      return;
    }
    const convert = (item, containerLabel) => {
      const result2 = {
        name: item.text,
        detail: "",
        kind: outlineTypeTable[item.kind] || monaco_editor_core_exports.languages.SymbolKind.Variable,
        range: this._textSpanToRange(model, item.spans[0]),
        selectionRange: this._textSpanToRange(model, item.spans[0]),
        tags: [],
        children: item.childItems?.map((child) => convert(child, item.text)),
        containerName: containerLabel
      };
      return result2;
    };
    const result = root.childItems ? root.childItems.map((item) => convert(item)) : [];
    return result;
  }
};
var Kind = class {
};
__publicField(Kind, "unknown", "");
__publicField(Kind, "keyword", "keyword");
__publicField(Kind, "script", "script");
__publicField(Kind, "module", "module");
__publicField(Kind, "class", "class");
__publicField(Kind, "interface", "interface");
__publicField(Kind, "type", "type");
__publicField(Kind, "enum", "enum");
__publicField(Kind, "variable", "var");
__publicField(Kind, "localVariable", "local var");
__publicField(Kind, "function", "function");
__publicField(Kind, "localFunction", "local function");
__publicField(Kind, "memberFunction", "method");
__publicField(Kind, "memberGetAccessor", "getter");
__publicField(Kind, "memberSetAccessor", "setter");
__publicField(Kind, "memberVariable", "property");
__publicField(Kind, "constructorImplementation", "constructor");
__publicField(Kind, "callSignature", "call");
__publicField(Kind, "indexSignature", "index");
__publicField(Kind, "constructSignature", "construct");
__publicField(Kind, "parameter", "parameter");
__publicField(Kind, "typeParameter", "type parameter");
__publicField(Kind, "primitiveType", "primitive type");
__publicField(Kind, "label", "label");
__publicField(Kind, "alias", "alias");
__publicField(Kind, "const", "const");
__publicField(Kind, "let", "let");
__publicField(Kind, "warning", "warning");
var outlineTypeTable = /* @__PURE__ */ Object.create(null);
outlineTypeTable[Kind.module] = monaco_editor_core_exports.languages.SymbolKind.Module;
outlineTypeTable[Kind.class] = monaco_editor_core_exports.languages.SymbolKind.Class;
outlineTypeTable[Kind.enum] = monaco_editor_core_exports.languages.SymbolKind.Enum;
outlineTypeTable[Kind.interface] = monaco_editor_core_exports.languages.SymbolKind.Interface;
outlineTypeTable[Kind.memberFunction] = monaco_editor_core_exports.languages.SymbolKind.Method;
outlineTypeTable[Kind.memberVariable] = monaco_editor_core_exports.languages.SymbolKind.Property;
outlineTypeTable[Kind.memberGetAccessor] = monaco_editor_core_exports.languages.SymbolKind.Property;
outlineTypeTable[Kind.memberSetAccessor] = monaco_editor_core_exports.languages.SymbolKind.Property;
outlineTypeTable[Kind.variable] = monaco_editor_core_exports.languages.SymbolKind.Variable;
outlineTypeTable[Kind.const] = monaco_editor_core_exports.languages.SymbolKind.Variable;
outlineTypeTable[Kind.localVariable] = monaco_editor_core_exports.languages.SymbolKind.Variable;
outlineTypeTable[Kind.variable] = monaco_editor_core_exports.languages.SymbolKind.Variable;
outlineTypeTable[Kind.function] = monaco_editor_core_exports.languages.SymbolKind.Function;
outlineTypeTable[Kind.localFunction] = monaco_editor_core_exports.languages.SymbolKind.Function;
var FormatHelper = class extends Adapter {
  static _convertOptions(options) {
    return {
      ConvertTabsToSpaces: options.insertSpaces,
      TabSize: options.tabSize,
      IndentSize: options.tabSize,
      IndentStyle: 2,
      NewLineCharacter: "\n",
      InsertSpaceAfterCommaDelimiter: true,
      InsertSpaceAfterSemicolonInForStatements: true,
      InsertSpaceBeforeAndAfterBinaryOperators: true,
      InsertSpaceAfterKeywordsInControlFlowStatements: true,
      InsertSpaceAfterFunctionKeywordForAnonymousFunctions: true,
      InsertSpaceAfterOpeningAndBeforeClosingNonemptyParenthesis: false,
      InsertSpaceAfterOpeningAndBeforeClosingNonemptyBrackets: false,
      InsertSpaceAfterOpeningAndBeforeClosingTemplateStringBraces: false,
      PlaceOpenBraceOnNewLineForControlBlocks: false,
      PlaceOpenBraceOnNewLineForFunctions: false
    };
  }
  _convertTextChanges(model, change) {
    return {
      text: change.newText,
      range: this._textSpanToRange(model, change.span)
    };
  }
};
var FormatAdapter = class extends FormatHelper {
  canFormatMultipleRanges = false;
  async provideDocumentRangeFormattingEdits(model, range, options, token) {
    const resource = model.uri;
    const startOffset = model.getOffsetAt({
      lineNumber: range.startLineNumber,
      column: range.startColumn
    });
    const endOffset = model.getOffsetAt({
      lineNumber: range.endLineNumber,
      column: range.endColumn
    });
    const worker = await this._worker(resource);
    if (model.isDisposed()) {
      return;
    }
    const edits = await worker.getFormattingEditsForRange(resource.toString(), startOffset, endOffset, FormatHelper._convertOptions(options));
    if (!edits || model.isDisposed()) {
      return;
    }
    return edits.map((edit) => this._convertTextChanges(model, edit));
  }
};
var FormatOnTypeAdapter = class extends FormatHelper {
  get autoFormatTriggerCharacters() {
    return [";", "}", "\n"];
  }
  async provideOnTypeFormattingEdits(model, position, ch, options, token) {
    const resource = model.uri;
    const offset = model.getOffsetAt(position);
    const worker = await this._worker(resource);
    if (model.isDisposed()) {
      return;
    }
    const edits = await worker.getFormattingEditsAfterKeystroke(resource.toString(), offset, ch, FormatHelper._convertOptions(options));
    if (!edits || model.isDisposed()) {
      return;
    }
    return edits.map((edit) => this._convertTextChanges(model, edit));
  }
};
var CodeActionAdaptor = class extends FormatHelper {
  async provideCodeActions(model, range, context, token) {
    const resource = model.uri;
    const start = model.getOffsetAt({
      lineNumber: range.startLineNumber,
      column: range.startColumn
    });
    const end = model.getOffsetAt({
      lineNumber: range.endLineNumber,
      column: range.endColumn
    });
    const formatOptions = FormatHelper._convertOptions(model.getOptions());
    const errorCodes = context.markers.filter((m) => m.code).map((m) => m.code).map(Number);
    const worker = await this._worker(resource);
    if (model.isDisposed()) {
      return;
    }
    const codeFixes = await worker.getCodeFixesAtPosition(resource.toString(), start, end, errorCodes, formatOptions);
    if (!codeFixes || model.isDisposed()) {
      return { actions: [], dispose: () => {
      } };
    }
    const actions = codeFixes.filter((fix) => {
      return fix.changes.filter((change) => change.isNewFile).length === 0;
    }).map((fix) => {
      return this._tsCodeFixActionToMonacoCodeAction(model, context, fix);
    });
    return {
      actions,
      dispose: () => {
      }
    };
  }
  _tsCodeFixActionToMonacoCodeAction(model, context, codeFix) {
    const edits = [];
    for (const change of codeFix.changes) {
      for (const textChange of change.textChanges) {
        edits.push({
          resource: model.uri,
          versionId: void 0,
          textEdit: {
            range: this._textSpanToRange(model, textChange.span),
            text: textChange.newText
          }
        });
      }
    }
    const action = {
      title: codeFix.description,
      edit: { edits },
      diagnostics: context.markers,
      kind: "quickfix"
    };
    return action;
  }
};
var RenameAdapter = class extends Adapter {
  constructor(_libFiles, worker) {
    super(worker);
    this._libFiles = _libFiles;
  }
  async provideRenameEdits(model, position, newName, token) {
    const resource = model.uri;
    const fileName = resource.toString();
    const offset = model.getOffsetAt(position);
    const worker = await this._worker(resource);
    if (model.isDisposed()) {
      return;
    }
    const renameInfo = await worker.getRenameInfo(fileName, offset, {
      allowRenameOfImportPath: false
    });
    if (renameInfo.canRename === false) {
      return {
        edits: [],
        rejectReason: renameInfo.localizedErrorMessage
      };
    }
    if (renameInfo.fileToRename !== void 0) {
      throw new Error("Renaming files is not supported.");
    }
    const renameLocations = await worker.findRenameLocations(fileName, offset, false, false, false);
    if (!renameLocations || model.isDisposed()) {
      return;
    }
    const edits = [];
    for (const renameLocation of renameLocations) {
      const model2 = this._libFiles.getOrCreateModel(renameLocation.fileName);
      if (model2) {
        edits.push({
          resource: model2.uri,
          versionId: void 0,
          textEdit: {
            range: this._textSpanToRange(model2, renameLocation.textSpan),
            text: newName
          }
        });
      } else {
        throw new Error(`Unknown file ${renameLocation.fileName}.`);
      }
    }
    return { edits };
  }
};
var InlayHintsAdapter = class extends Adapter {
  async provideInlayHints(model, range, token) {
    const resource = model.uri;
    const fileName = resource.toString();
    const start = model.getOffsetAt({
      lineNumber: range.startLineNumber,
      column: range.startColumn
    });
    const end = model.getOffsetAt({
      lineNumber: range.endLineNumber,
      column: range.endColumn
    });
    const worker = await this._worker(resource);
    if (model.isDisposed()) {
      return null;
    }
    const tsHints = await worker.provideInlayHints(fileName, start, end);
    const hints = tsHints.map((hint) => {
      return {
        ...hint,
        label: hint.text,
        position: model.getPositionAt(hint.position),
        kind: this._convertHintKind(hint.kind)
      };
    });
    return { hints, dispose: () => {
    } };
  }
  _convertHintKind(kind) {
    switch (kind) {
      case "Parameter":
        return monaco_editor_core_exports.languages.InlayHintKind.Parameter;
      case "Type":
        return monaco_editor_core_exports.languages.InlayHintKind.Type;
      default:
        return monaco_editor_core_exports.languages.InlayHintKind.Type;
    }
  }
};
var javaScriptWorker;
var typeScriptWorker;
function setupTypeScript(defaults) {
  typeScriptWorker = setupMode(defaults, "typescript");
}
function setupJavaScript(defaults) {
  javaScriptWorker = setupMode(defaults, "javascript");
}
function getJavaScriptWorker() {
  return new Promise((resolve, reject) => {
    if (!javaScriptWorker) {
      return reject("JavaScript not registered!");
    }
    resolve(javaScriptWorker);
  });
}
function getTypeScriptWorker() {
  return new Promise((resolve, reject) => {
    if (!typeScriptWorker) {
      return reject("TypeScript not registered!");
    }
    resolve(typeScriptWorker);
  });
}
function setupMode(defaults, modeId) {
  const providers = [];
  const client = new WorkerManager(modeId, defaults);
  const worker = (...uris) => {
    return client.getLanguageServiceWorker(...uris);
  };
  const libFiles = new LibFiles(worker);
  function registerProviders() {
    const { modeConfiguration } = defaults;
    disposeAll(providers);
    if (modeConfiguration.completionItems) {
      providers.push(monaco_editor_core_exports.languages.registerCompletionItemProvider(modeId, new SuggestAdapter(worker)));
    }
    if (modeConfiguration.signatureHelp) {
      providers.push(monaco_editor_core_exports.languages.registerSignatureHelpProvider(modeId, new SignatureHelpAdapter(worker)));
    }
    if (modeConfiguration.hovers) {
      providers.push(monaco_editor_core_exports.languages.registerHoverProvider(modeId, new QuickInfoAdapter(worker)));
    }
    if (modeConfiguration.documentHighlights) {
      providers.push(monaco_editor_core_exports.languages.registerDocumentHighlightProvider(modeId, new DocumentHighlightAdapter(worker)));
    }
    if (modeConfiguration.definitions) {
      providers.push(monaco_editor_core_exports.languages.registerDefinitionProvider(modeId, new DefinitionAdapter(libFiles, worker)));
    }
    if (modeConfiguration.references) {
      providers.push(monaco_editor_core_exports.languages.registerReferenceProvider(modeId, new ReferenceAdapter(libFiles, worker)));
    }
    if (modeConfiguration.documentSymbols) {
      providers.push(monaco_editor_core_exports.languages.registerDocumentSymbolProvider(modeId, new OutlineAdapter(worker)));
    }
    if (modeConfiguration.rename) {
      providers.push(monaco_editor_core_exports.languages.registerRenameProvider(modeId, new RenameAdapter(libFiles, worker)));
    }
    if (modeConfiguration.documentRangeFormattingEdits) {
      providers.push(monaco_editor_core_exports.languages.registerDocumentRangeFormattingEditProvider(modeId, new FormatAdapter(worker)));
    }
    if (modeConfiguration.onTypeFormattingEdits) {
      providers.push(monaco_editor_core_exports.languages.registerOnTypeFormattingEditProvider(modeId, new FormatOnTypeAdapter(worker)));
    }
    if (modeConfiguration.codeActions) {
      providers.push(monaco_editor_core_exports.languages.registerCodeActionProvider(modeId, new CodeActionAdaptor(worker)));
    }
    if (modeConfiguration.inlayHints) {
      providers.push(monaco_editor_core_exports.languages.registerInlayHintsProvider(modeId, new InlayHintsAdapter(worker)));
    }
    if (modeConfiguration.diagnostics) {
      providers.push(new DiagnosticsAdapter(libFiles, defaults, modeId, worker));
    }
  }
  registerProviders();
  return worker;
}
function disposeAll(disposables) {
  while (disposables.length) {
    disposables.pop().dispose();
  }
}
export {
  Adapter,
  CodeActionAdaptor,
  DefinitionAdapter,
  DiagnosticsAdapter,
  DocumentHighlightAdapter,
  FormatAdapter,
  FormatHelper,
  FormatOnTypeAdapter,
  InlayHintsAdapter,
  Kind,
  LibFiles,
  OutlineAdapter,
  QuickInfoAdapter,
  ReferenceAdapter,
  RenameAdapter,
  SignatureHelpAdapter,
  SuggestAdapter,
  WorkerManager,
  flattenDiagnosticMessageText,
  getJavaScriptWorker,
  getTypeScriptWorker,
  setupJavaScript,
  setupTypeScript
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHNNb2RlLmpzIiwic291cmNlcyI6WyIuLi8uLi9ub2RlX21vZHVsZXMvbW9uYWNvLWVkaXRvci9lc20vdnMvbGFuZ3VhZ2UvdHlwZXNjcmlwdC90c01vZGUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyohLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogVmVyc2lvbjogMC40NS4wKDVlNWFmMDEzZjhkMjk1NTU1YTcyMTBkZjBkNWYyY2VhMGJmNWRkNTYpXG4gKiBSZWxlYXNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2VcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9taWNyb3NvZnQvbW9uYWNvLWVkaXRvci9ibG9iL21haW4vTElDRU5TRS50eHRcbiAqLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG52YXIgX19kZWZQcm9wID0gT2JqZWN0LmRlZmluZVByb3BlcnR5O1xudmFyIF9fZ2V0T3duUHJvcERlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yO1xudmFyIF9fZ2V0T3duUHJvcE5hbWVzID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXM7XG52YXIgX19oYXNPd25Qcm9wID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcbnZhciBfX2RlZk5vcm1hbFByb3AgPSAob2JqLCBrZXksIHZhbHVlKSA9PiBrZXkgaW4gb2JqID8gX19kZWZQcm9wKG9iaiwga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSwgd3JpdGFibGU6IHRydWUsIHZhbHVlIH0pIDogb2JqW2tleV0gPSB2YWx1ZTtcbnZhciBfX2NvcHlQcm9wcyA9ICh0bywgZnJvbSwgZXhjZXB0LCBkZXNjKSA9PiB7XG4gIGlmIChmcm9tICYmIHR5cGVvZiBmcm9tID09PSBcIm9iamVjdFwiIHx8IHR5cGVvZiBmcm9tID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICBmb3IgKGxldCBrZXkgb2YgX19nZXRPd25Qcm9wTmFtZXMoZnJvbSkpXG4gICAgICBpZiAoIV9faGFzT3duUHJvcC5jYWxsKHRvLCBrZXkpICYmIGtleSAhPT0gZXhjZXB0KVxuICAgICAgICBfX2RlZlByb3AodG8sIGtleSwgeyBnZXQ6ICgpID0+IGZyb21ba2V5XSwgZW51bWVyYWJsZTogIShkZXNjID0gX19nZXRPd25Qcm9wRGVzYyhmcm9tLCBrZXkpKSB8fCBkZXNjLmVudW1lcmFibGUgfSk7XG4gIH1cbiAgcmV0dXJuIHRvO1xufTtcbnZhciBfX3JlRXhwb3J0ID0gKHRhcmdldCwgbW9kLCBzZWNvbmRUYXJnZXQpID0+IChfX2NvcHlQcm9wcyh0YXJnZXQsIG1vZCwgXCJkZWZhdWx0XCIpLCBzZWNvbmRUYXJnZXQgJiYgX19jb3B5UHJvcHMoc2Vjb25kVGFyZ2V0LCBtb2QsIFwiZGVmYXVsdFwiKSk7XG52YXIgX19wdWJsaWNGaWVsZCA9IChvYmosIGtleSwgdmFsdWUpID0+IHtcbiAgX19kZWZOb3JtYWxQcm9wKG9iaiwgdHlwZW9mIGtleSAhPT0gXCJzeW1ib2xcIiA/IGtleSArIFwiXCIgOiBrZXksIHZhbHVlKTtcbiAgcmV0dXJuIHZhbHVlO1xufTtcblxuLy8gc3JjL2ZpbGxlcnMvbW9uYWNvLWVkaXRvci1jb3JlLnRzXG52YXIgbW9uYWNvX2VkaXRvcl9jb3JlX2V4cG9ydHMgPSB7fTtcbl9fcmVFeHBvcnQobW9uYWNvX2VkaXRvcl9jb3JlX2V4cG9ydHMsIG1vbmFjb19lZGl0b3JfY29yZV9zdGFyKTtcbmltcG9ydCAqIGFzIG1vbmFjb19lZGl0b3JfY29yZV9zdGFyIGZyb20gXCIuLi8uLi9lZGl0b3IvZWRpdG9yLmFwaS5qc1wiO1xuXG4vLyBzcmMvbGFuZ3VhZ2UvdHlwZXNjcmlwdC93b3JrZXJNYW5hZ2VyLnRzXG52YXIgV29ya2VyTWFuYWdlciA9IGNsYXNzIHtcbiAgY29uc3RydWN0b3IoX21vZGVJZCwgX2RlZmF1bHRzKSB7XG4gICAgdGhpcy5fbW9kZUlkID0gX21vZGVJZDtcbiAgICB0aGlzLl9kZWZhdWx0cyA9IF9kZWZhdWx0cztcbiAgICB0aGlzLl93b3JrZXIgPSBudWxsO1xuICAgIHRoaXMuX2NsaWVudCA9IG51bGw7XG4gICAgdGhpcy5fY29uZmlnQ2hhbmdlTGlzdGVuZXIgPSB0aGlzLl9kZWZhdWx0cy5vbkRpZENoYW5nZSgoKSA9PiB0aGlzLl9zdG9wV29ya2VyKCkpO1xuICAgIHRoaXMuX3VwZGF0ZUV4dHJhTGlic1Rva2VuID0gMDtcbiAgICB0aGlzLl9leHRyYUxpYnNDaGFuZ2VMaXN0ZW5lciA9IHRoaXMuX2RlZmF1bHRzLm9uRGlkRXh0cmFMaWJzQ2hhbmdlKCgpID0+IHRoaXMuX3VwZGF0ZUV4dHJhTGlicygpKTtcbiAgfVxuICBfY29uZmlnQ2hhbmdlTGlzdGVuZXI7XG4gIF91cGRhdGVFeHRyYUxpYnNUb2tlbjtcbiAgX2V4dHJhTGlic0NoYW5nZUxpc3RlbmVyO1xuICBfd29ya2VyO1xuICBfY2xpZW50O1xuICBkaXNwb3NlKCkge1xuICAgIHRoaXMuX2NvbmZpZ0NoYW5nZUxpc3RlbmVyLmRpc3Bvc2UoKTtcbiAgICB0aGlzLl9leHRyYUxpYnNDaGFuZ2VMaXN0ZW5lci5kaXNwb3NlKCk7XG4gICAgdGhpcy5fc3RvcFdvcmtlcigpO1xuICB9XG4gIF9zdG9wV29ya2VyKCkge1xuICAgIGlmICh0aGlzLl93b3JrZXIpIHtcbiAgICAgIHRoaXMuX3dvcmtlci5kaXNwb3NlKCk7XG4gICAgICB0aGlzLl93b3JrZXIgPSBudWxsO1xuICAgIH1cbiAgICB0aGlzLl9jbGllbnQgPSBudWxsO1xuICB9XG4gIGFzeW5jIF91cGRhdGVFeHRyYUxpYnMoKSB7XG4gICAgaWYgKCF0aGlzLl93b3JrZXIpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgbXlUb2tlbiA9ICsrdGhpcy5fdXBkYXRlRXh0cmFMaWJzVG9rZW47XG4gICAgY29uc3QgcHJveHkgPSBhd2FpdCB0aGlzLl93b3JrZXIuZ2V0UHJveHkoKTtcbiAgICBpZiAodGhpcy5fdXBkYXRlRXh0cmFMaWJzVG9rZW4gIT09IG15VG9rZW4pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgcHJveHkudXBkYXRlRXh0cmFMaWJzKHRoaXMuX2RlZmF1bHRzLmdldEV4dHJhTGlicygpKTtcbiAgfVxuICBfZ2V0Q2xpZW50KCkge1xuICAgIGlmICghdGhpcy5fY2xpZW50KSB7XG4gICAgICB0aGlzLl9jbGllbnQgPSAoYXN5bmMgKCkgPT4ge1xuICAgICAgICB0aGlzLl93b3JrZXIgPSBtb25hY29fZWRpdG9yX2NvcmVfZXhwb3J0cy5lZGl0b3IuY3JlYXRlV2ViV29ya2VyKHtcbiAgICAgICAgICBtb2R1bGVJZDogXCJ2cy9sYW5ndWFnZS90eXBlc2NyaXB0L3RzV29ya2VyXCIsXG4gICAgICAgICAgbGFiZWw6IHRoaXMuX21vZGVJZCxcbiAgICAgICAgICBrZWVwSWRsZU1vZGVsczogdHJ1ZSxcbiAgICAgICAgICBjcmVhdGVEYXRhOiB7XG4gICAgICAgICAgICBjb21waWxlck9wdGlvbnM6IHRoaXMuX2RlZmF1bHRzLmdldENvbXBpbGVyT3B0aW9ucygpLFxuICAgICAgICAgICAgZXh0cmFMaWJzOiB0aGlzLl9kZWZhdWx0cy5nZXRFeHRyYUxpYnMoKSxcbiAgICAgICAgICAgIGN1c3RvbVdvcmtlclBhdGg6IHRoaXMuX2RlZmF1bHRzLndvcmtlck9wdGlvbnMuY3VzdG9tV29ya2VyUGF0aCxcbiAgICAgICAgICAgIGlubGF5SGludHNPcHRpb25zOiB0aGlzLl9kZWZhdWx0cy5pbmxheUhpbnRzT3B0aW9uc1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGlmICh0aGlzLl9kZWZhdWx0cy5nZXRFYWdlck1vZGVsU3luYygpKSB7XG4gICAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMuX3dvcmtlci53aXRoU3luY2VkUmVzb3VyY2VzKG1vbmFjb19lZGl0b3JfY29yZV9leHBvcnRzLmVkaXRvci5nZXRNb2RlbHMoKS5maWx0ZXIoKG1vZGVsKSA9PiBtb2RlbC5nZXRMYW5ndWFnZUlkKCkgPT09IHRoaXMuX21vZGVJZCkubWFwKChtb2RlbCkgPT4gbW9kZWwudXJpKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMuX3dvcmtlci5nZXRQcm94eSgpO1xuICAgICAgfSkoKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuX2NsaWVudDtcbiAgfVxuICBhc3luYyBnZXRMYW5ndWFnZVNlcnZpY2VXb3JrZXIoLi4ucmVzb3VyY2VzKSB7XG4gICAgY29uc3QgY2xpZW50ID0gYXdhaXQgdGhpcy5fZ2V0Q2xpZW50KCk7XG4gICAgaWYgKHRoaXMuX3dvcmtlcikge1xuICAgICAgYXdhaXQgdGhpcy5fd29ya2VyLndpdGhTeW5jZWRSZXNvdXJjZXMocmVzb3VyY2VzKTtcbiAgICB9XG4gICAgcmV0dXJuIGNsaWVudDtcbiAgfVxufTtcblxuLy8gc3JjL2xhbmd1YWdlL3R5cGVzY3JpcHQvbGFuZ3VhZ2VGZWF0dXJlcy50c1xuaW1wb3J0IHtcbiAgdHlwZXNjcmlwdERlZmF1bHRzXG59IGZyb20gXCIuL21vbmFjby5jb250cmlidXRpb24uanNcIjtcblxuLy8gc3JjL2xhbmd1YWdlL3R5cGVzY3JpcHQvbGliL2xpYi5pbmRleC50c1xudmFyIGxpYkZpbGVTZXQgPSB7fTtcbmxpYkZpbGVTZXRbXCJsaWIuZC50c1wiXSA9IHRydWU7XG5saWJGaWxlU2V0W1wibGliLmRlY29yYXRvcnMuZC50c1wiXSA9IHRydWU7XG5saWJGaWxlU2V0W1wibGliLmRlY29yYXRvcnMubGVnYWN5LmQudHNcIl0gPSB0cnVlO1xubGliRmlsZVNldFtcImxpYi5kb20uZC50c1wiXSA9IHRydWU7XG5saWJGaWxlU2V0W1wibGliLmRvbS5pdGVyYWJsZS5kLnRzXCJdID0gdHJ1ZTtcbmxpYkZpbGVTZXRbXCJsaWIuZXMyMDE1LmNvbGxlY3Rpb24uZC50c1wiXSA9IHRydWU7XG5saWJGaWxlU2V0W1wibGliLmVzMjAxNS5jb3JlLmQudHNcIl0gPSB0cnVlO1xubGliRmlsZVNldFtcImxpYi5lczIwMTUuZC50c1wiXSA9IHRydWU7XG5saWJGaWxlU2V0W1wibGliLmVzMjAxNS5nZW5lcmF0b3IuZC50c1wiXSA9IHRydWU7XG5saWJGaWxlU2V0W1wibGliLmVzMjAxNS5pdGVyYWJsZS5kLnRzXCJdID0gdHJ1ZTtcbmxpYkZpbGVTZXRbXCJsaWIuZXMyMDE1LnByb21pc2UuZC50c1wiXSA9IHRydWU7XG5saWJGaWxlU2V0W1wibGliLmVzMjAxNS5wcm94eS5kLnRzXCJdID0gdHJ1ZTtcbmxpYkZpbGVTZXRbXCJsaWIuZXMyMDE1LnJlZmxlY3QuZC50c1wiXSA9IHRydWU7XG5saWJGaWxlU2V0W1wibGliLmVzMjAxNS5zeW1ib2wuZC50c1wiXSA9IHRydWU7XG5saWJGaWxlU2V0W1wibGliLmVzMjAxNS5zeW1ib2wud2VsbGtub3duLmQudHNcIl0gPSB0cnVlO1xubGliRmlsZVNldFtcImxpYi5lczIwMTYuYXJyYXkuaW5jbHVkZS5kLnRzXCJdID0gdHJ1ZTtcbmxpYkZpbGVTZXRbXCJsaWIuZXMyMDE2LmQudHNcIl0gPSB0cnVlO1xubGliRmlsZVNldFtcImxpYi5lczIwMTYuZnVsbC5kLnRzXCJdID0gdHJ1ZTtcbmxpYkZpbGVTZXRbXCJsaWIuZXMyMDE3LmQudHNcIl0gPSB0cnVlO1xubGliRmlsZVNldFtcImxpYi5lczIwMTcuZnVsbC5kLnRzXCJdID0gdHJ1ZTtcbmxpYkZpbGVTZXRbXCJsaWIuZXMyMDE3LmludGwuZC50c1wiXSA9IHRydWU7XG5saWJGaWxlU2V0W1wibGliLmVzMjAxNy5vYmplY3QuZC50c1wiXSA9IHRydWU7XG5saWJGaWxlU2V0W1wibGliLmVzMjAxNy5zaGFyZWRtZW1vcnkuZC50c1wiXSA9IHRydWU7XG5saWJGaWxlU2V0W1wibGliLmVzMjAxNy5zdHJpbmcuZC50c1wiXSA9IHRydWU7XG5saWJGaWxlU2V0W1wibGliLmVzMjAxNy50eXBlZGFycmF5cy5kLnRzXCJdID0gdHJ1ZTtcbmxpYkZpbGVTZXRbXCJsaWIuZXMyMDE4LmFzeW5jZ2VuZXJhdG9yLmQudHNcIl0gPSB0cnVlO1xubGliRmlsZVNldFtcImxpYi5lczIwMTguYXN5bmNpdGVyYWJsZS5kLnRzXCJdID0gdHJ1ZTtcbmxpYkZpbGVTZXRbXCJsaWIuZXMyMDE4LmQudHNcIl0gPSB0cnVlO1xubGliRmlsZVNldFtcImxpYi5lczIwMTguZnVsbC5kLnRzXCJdID0gdHJ1ZTtcbmxpYkZpbGVTZXRbXCJsaWIuZXMyMDE4LmludGwuZC50c1wiXSA9IHRydWU7XG5saWJGaWxlU2V0W1wibGliLmVzMjAxOC5wcm9taXNlLmQudHNcIl0gPSB0cnVlO1xubGliRmlsZVNldFtcImxpYi5lczIwMTgucmVnZXhwLmQudHNcIl0gPSB0cnVlO1xubGliRmlsZVNldFtcImxpYi5lczIwMTkuYXJyYXkuZC50c1wiXSA9IHRydWU7XG5saWJGaWxlU2V0W1wibGliLmVzMjAxOS5kLnRzXCJdID0gdHJ1ZTtcbmxpYkZpbGVTZXRbXCJsaWIuZXMyMDE5LmZ1bGwuZC50c1wiXSA9IHRydWU7XG5saWJGaWxlU2V0W1wibGliLmVzMjAxOS5pbnRsLmQudHNcIl0gPSB0cnVlO1xubGliRmlsZVNldFtcImxpYi5lczIwMTkub2JqZWN0LmQudHNcIl0gPSB0cnVlO1xubGliRmlsZVNldFtcImxpYi5lczIwMTkuc3RyaW5nLmQudHNcIl0gPSB0cnVlO1xubGliRmlsZVNldFtcImxpYi5lczIwMTkuc3ltYm9sLmQudHNcIl0gPSB0cnVlO1xubGliRmlsZVNldFtcImxpYi5lczIwMjAuYmlnaW50LmQudHNcIl0gPSB0cnVlO1xubGliRmlsZVNldFtcImxpYi5lczIwMjAuZC50c1wiXSA9IHRydWU7XG5saWJGaWxlU2V0W1wibGliLmVzMjAyMC5kYXRlLmQudHNcIl0gPSB0cnVlO1xubGliRmlsZVNldFtcImxpYi5lczIwMjAuZnVsbC5kLnRzXCJdID0gdHJ1ZTtcbmxpYkZpbGVTZXRbXCJsaWIuZXMyMDIwLmludGwuZC50c1wiXSA9IHRydWU7XG5saWJGaWxlU2V0W1wibGliLmVzMjAyMC5udW1iZXIuZC50c1wiXSA9IHRydWU7XG5saWJGaWxlU2V0W1wibGliLmVzMjAyMC5wcm9taXNlLmQudHNcIl0gPSB0cnVlO1xubGliRmlsZVNldFtcImxpYi5lczIwMjAuc2hhcmVkbWVtb3J5LmQudHNcIl0gPSB0cnVlO1xubGliRmlsZVNldFtcImxpYi5lczIwMjAuc3RyaW5nLmQudHNcIl0gPSB0cnVlO1xubGliRmlsZVNldFtcImxpYi5lczIwMjAuc3ltYm9sLndlbGxrbm93bi5kLnRzXCJdID0gdHJ1ZTtcbmxpYkZpbGVTZXRbXCJsaWIuZXMyMDIxLmQudHNcIl0gPSB0cnVlO1xubGliRmlsZVNldFtcImxpYi5lczIwMjEuZnVsbC5kLnRzXCJdID0gdHJ1ZTtcbmxpYkZpbGVTZXRbXCJsaWIuZXMyMDIxLmludGwuZC50c1wiXSA9IHRydWU7XG5saWJGaWxlU2V0W1wibGliLmVzMjAyMS5wcm9taXNlLmQudHNcIl0gPSB0cnVlO1xubGliRmlsZVNldFtcImxpYi5lczIwMjEuc3RyaW5nLmQudHNcIl0gPSB0cnVlO1xubGliRmlsZVNldFtcImxpYi5lczIwMjEud2Vha3JlZi5kLnRzXCJdID0gdHJ1ZTtcbmxpYkZpbGVTZXRbXCJsaWIuZXMyMDIyLmFycmF5LmQudHNcIl0gPSB0cnVlO1xubGliRmlsZVNldFtcImxpYi5lczIwMjIuZC50c1wiXSA9IHRydWU7XG5saWJGaWxlU2V0W1wibGliLmVzMjAyMi5lcnJvci5kLnRzXCJdID0gdHJ1ZTtcbmxpYkZpbGVTZXRbXCJsaWIuZXMyMDIyLmZ1bGwuZC50c1wiXSA9IHRydWU7XG5saWJGaWxlU2V0W1wibGliLmVzMjAyMi5pbnRsLmQudHNcIl0gPSB0cnVlO1xubGliRmlsZVNldFtcImxpYi5lczIwMjIub2JqZWN0LmQudHNcIl0gPSB0cnVlO1xubGliRmlsZVNldFtcImxpYi5lczIwMjIucmVnZXhwLmQudHNcIl0gPSB0cnVlO1xubGliRmlsZVNldFtcImxpYi5lczIwMjIuc2hhcmVkbWVtb3J5LmQudHNcIl0gPSB0cnVlO1xubGliRmlsZVNldFtcImxpYi5lczIwMjIuc3RyaW5nLmQudHNcIl0gPSB0cnVlO1xubGliRmlsZVNldFtcImxpYi5lczIwMjMuYXJyYXkuZC50c1wiXSA9IHRydWU7XG5saWJGaWxlU2V0W1wibGliLmVzMjAyMy5kLnRzXCJdID0gdHJ1ZTtcbmxpYkZpbGVTZXRbXCJsaWIuZXMyMDIzLmZ1bGwuZC50c1wiXSA9IHRydWU7XG5saWJGaWxlU2V0W1wibGliLmVzNS5kLnRzXCJdID0gdHJ1ZTtcbmxpYkZpbGVTZXRbXCJsaWIuZXM2LmQudHNcIl0gPSB0cnVlO1xubGliRmlsZVNldFtcImxpYi5lc25leHQuZC50c1wiXSA9IHRydWU7XG5saWJGaWxlU2V0W1wibGliLmVzbmV4dC5mdWxsLmQudHNcIl0gPSB0cnVlO1xubGliRmlsZVNldFtcImxpYi5lc25leHQuaW50bC5kLnRzXCJdID0gdHJ1ZTtcbmxpYkZpbGVTZXRbXCJsaWIuc2NyaXB0aG9zdC5kLnRzXCJdID0gdHJ1ZTtcbmxpYkZpbGVTZXRbXCJsaWIud2Vid29ya2VyLmQudHNcIl0gPSB0cnVlO1xubGliRmlsZVNldFtcImxpYi53ZWJ3b3JrZXIuaW1wb3J0c2NyaXB0cy5kLnRzXCJdID0gdHJ1ZTtcbmxpYkZpbGVTZXRbXCJsaWIud2Vid29ya2VyLml0ZXJhYmxlLmQudHNcIl0gPSB0cnVlO1xuXG4vLyBzcmMvbGFuZ3VhZ2UvdHlwZXNjcmlwdC9sYW5ndWFnZUZlYXR1cmVzLnRzXG5mdW5jdGlvbiBmbGF0dGVuRGlhZ25vc3RpY01lc3NhZ2VUZXh0KGRpYWcsIG5ld0xpbmUsIGluZGVudCA9IDApIHtcbiAgaWYgKHR5cGVvZiBkaWFnID09PSBcInN0cmluZ1wiKSB7XG4gICAgcmV0dXJuIGRpYWc7XG4gIH0gZWxzZSBpZiAoZGlhZyA9PT0gdm9pZCAwKSB7XG4gICAgcmV0dXJuIFwiXCI7XG4gIH1cbiAgbGV0IHJlc3VsdCA9IFwiXCI7XG4gIGlmIChpbmRlbnQpIHtcbiAgICByZXN1bHQgKz0gbmV3TGluZTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGluZGVudDsgaSsrKSB7XG4gICAgICByZXN1bHQgKz0gXCIgIFwiO1xuICAgIH1cbiAgfVxuICByZXN1bHQgKz0gZGlhZy5tZXNzYWdlVGV4dDtcbiAgaW5kZW50Kys7XG4gIGlmIChkaWFnLm5leHQpIHtcbiAgICBmb3IgKGNvbnN0IGtpZCBvZiBkaWFnLm5leHQpIHtcbiAgICAgIHJlc3VsdCArPSBmbGF0dGVuRGlhZ25vc3RpY01lc3NhZ2VUZXh0KGtpZCwgbmV3TGluZSwgaW5kZW50KTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cbmZ1bmN0aW9uIGRpc3BsYXlQYXJ0c1RvU3RyaW5nKGRpc3BsYXlQYXJ0cykge1xuICBpZiAoZGlzcGxheVBhcnRzKSB7XG4gICAgcmV0dXJuIGRpc3BsYXlQYXJ0cy5tYXAoKGRpc3BsYXlQYXJ0KSA9PiBkaXNwbGF5UGFydC50ZXh0KS5qb2luKFwiXCIpO1xuICB9XG4gIHJldHVybiBcIlwiO1xufVxudmFyIEFkYXB0ZXIgPSBjbGFzcyB7XG4gIGNvbnN0cnVjdG9yKF93b3JrZXIpIHtcbiAgICB0aGlzLl93b3JrZXIgPSBfd29ya2VyO1xuICB9XG4gIF90ZXh0U3BhblRvUmFuZ2UobW9kZWwsIHNwYW4pIHtcbiAgICBsZXQgcDEgPSBtb2RlbC5nZXRQb3NpdGlvbkF0KHNwYW4uc3RhcnQpO1xuICAgIGxldCBwMiA9IG1vZGVsLmdldFBvc2l0aW9uQXQoc3Bhbi5zdGFydCArIHNwYW4ubGVuZ3RoKTtcbiAgICBsZXQgeyBsaW5lTnVtYmVyOiBzdGFydExpbmVOdW1iZXIsIGNvbHVtbjogc3RhcnRDb2x1bW4gfSA9IHAxO1xuICAgIGxldCB7IGxpbmVOdW1iZXI6IGVuZExpbmVOdW1iZXIsIGNvbHVtbjogZW5kQ29sdW1uIH0gPSBwMjtcbiAgICByZXR1cm4geyBzdGFydExpbmVOdW1iZXIsIHN0YXJ0Q29sdW1uLCBlbmRMaW5lTnVtYmVyLCBlbmRDb2x1bW4gfTtcbiAgfVxufTtcbnZhciBMaWJGaWxlcyA9IGNsYXNzIHtcbiAgY29uc3RydWN0b3IoX3dvcmtlcikge1xuICAgIHRoaXMuX3dvcmtlciA9IF93b3JrZXI7XG4gICAgdGhpcy5fbGliRmlsZXMgPSB7fTtcbiAgICB0aGlzLl9oYXNGZXRjaGVkTGliRmlsZXMgPSBmYWxzZTtcbiAgICB0aGlzLl9mZXRjaExpYkZpbGVzUHJvbWlzZSA9IG51bGw7XG4gIH1cbiAgX2xpYkZpbGVzO1xuICBfaGFzRmV0Y2hlZExpYkZpbGVzO1xuICBfZmV0Y2hMaWJGaWxlc1Byb21pc2U7XG4gIGlzTGliRmlsZSh1cmkpIHtcbiAgICBpZiAoIXVyaSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBpZiAodXJpLnBhdGguaW5kZXhPZihcIi9saWIuXCIpID09PSAwKSB7XG4gICAgICByZXR1cm4gISFsaWJGaWxlU2V0W3VyaS5wYXRoLnNsaWNlKDEpXTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIGdldE9yQ3JlYXRlTW9kZWwoZmlsZU5hbWUpIHtcbiAgICBjb25zdCB1cmkgPSBtb25hY29fZWRpdG9yX2NvcmVfZXhwb3J0cy5VcmkucGFyc2UoZmlsZU5hbWUpO1xuICAgIGNvbnN0IG1vZGVsID0gbW9uYWNvX2VkaXRvcl9jb3JlX2V4cG9ydHMuZWRpdG9yLmdldE1vZGVsKHVyaSk7XG4gICAgaWYgKG1vZGVsKSB7XG4gICAgICByZXR1cm4gbW9kZWw7XG4gICAgfVxuICAgIGlmICh0aGlzLmlzTGliRmlsZSh1cmkpICYmIHRoaXMuX2hhc0ZldGNoZWRMaWJGaWxlcykge1xuICAgICAgcmV0dXJuIG1vbmFjb19lZGl0b3JfY29yZV9leHBvcnRzLmVkaXRvci5jcmVhdGVNb2RlbCh0aGlzLl9saWJGaWxlc1t1cmkucGF0aC5zbGljZSgxKV0sIFwidHlwZXNjcmlwdFwiLCB1cmkpO1xuICAgIH1cbiAgICBjb25zdCBtYXRjaGVkTGliRmlsZSA9IHR5cGVzY3JpcHREZWZhdWx0cy5nZXRFeHRyYUxpYnMoKVtmaWxlTmFtZV07XG4gICAgaWYgKG1hdGNoZWRMaWJGaWxlKSB7XG4gICAgICByZXR1cm4gbW9uYWNvX2VkaXRvcl9jb3JlX2V4cG9ydHMuZWRpdG9yLmNyZWF0ZU1vZGVsKG1hdGNoZWRMaWJGaWxlLmNvbnRlbnQsIFwidHlwZXNjcmlwdFwiLCB1cmkpO1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuICBfY29udGFpbnNMaWJGaWxlKHVyaXMpIHtcbiAgICBmb3IgKGxldCB1cmkgb2YgdXJpcykge1xuICAgICAgaWYgKHRoaXMuaXNMaWJGaWxlKHVyaSkpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBhc3luYyBmZXRjaExpYkZpbGVzSWZOZWNlc3NhcnkodXJpcykge1xuICAgIGlmICghdGhpcy5fY29udGFpbnNMaWJGaWxlKHVyaXMpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGF3YWl0IHRoaXMuX2ZldGNoTGliRmlsZXMoKTtcbiAgfVxuICBfZmV0Y2hMaWJGaWxlcygpIHtcbiAgICBpZiAoIXRoaXMuX2ZldGNoTGliRmlsZXNQcm9taXNlKSB7XG4gICAgICB0aGlzLl9mZXRjaExpYkZpbGVzUHJvbWlzZSA9IHRoaXMuX3dvcmtlcigpLnRoZW4oKHcpID0+IHcuZ2V0TGliRmlsZXMoKSkudGhlbigobGliRmlsZXMpID0+IHtcbiAgICAgICAgdGhpcy5faGFzRmV0Y2hlZExpYkZpbGVzID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5fbGliRmlsZXMgPSBsaWJGaWxlcztcbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5fZmV0Y2hMaWJGaWxlc1Byb21pc2U7XG4gIH1cbn07XG52YXIgRGlhZ25vc3RpY3NBZGFwdGVyID0gY2xhc3MgZXh0ZW5kcyBBZGFwdGVyIHtcbiAgY29uc3RydWN0b3IoX2xpYkZpbGVzLCBfZGVmYXVsdHMsIF9zZWxlY3Rvciwgd29ya2VyKSB7XG4gICAgc3VwZXIod29ya2VyKTtcbiAgICB0aGlzLl9saWJGaWxlcyA9IF9saWJGaWxlcztcbiAgICB0aGlzLl9kZWZhdWx0cyA9IF9kZWZhdWx0cztcbiAgICB0aGlzLl9zZWxlY3RvciA9IF9zZWxlY3RvcjtcbiAgICBjb25zdCBvbk1vZGVsQWRkID0gKG1vZGVsKSA9PiB7XG4gICAgICBpZiAobW9kZWwuZ2V0TGFuZ3VhZ2VJZCgpICE9PSBfc2VsZWN0b3IpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgY29uc3QgbWF5YmVWYWxpZGF0ZSA9ICgpID0+IHtcbiAgICAgICAgY29uc3QgeyBvbmx5VmlzaWJsZSB9ID0gdGhpcy5fZGVmYXVsdHMuZ2V0RGlhZ25vc3RpY3NPcHRpb25zKCk7XG4gICAgICAgIGlmIChvbmx5VmlzaWJsZSkge1xuICAgICAgICAgIGlmIChtb2RlbC5pc0F0dGFjaGVkVG9FZGl0b3IoKSkge1xuICAgICAgICAgICAgdGhpcy5fZG9WYWxpZGF0ZShtb2RlbCk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuX2RvVmFsaWRhdGUobW9kZWwpO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgICAgbGV0IGhhbmRsZTtcbiAgICAgIGNvbnN0IGNoYW5nZVN1YnNjcmlwdGlvbiA9IG1vZGVsLm9uRGlkQ2hhbmdlQ29udGVudCgoKSA9PiB7XG4gICAgICAgIGNsZWFyVGltZW91dChoYW5kbGUpO1xuICAgICAgICBoYW5kbGUgPSB3aW5kb3cuc2V0VGltZW91dChtYXliZVZhbGlkYXRlLCA1MDApO1xuICAgICAgfSk7XG4gICAgICBjb25zdCB2aXNpYmxlU3Vic2NyaXB0aW9uID0gbW9kZWwub25EaWRDaGFuZ2VBdHRhY2hlZCgoKSA9PiB7XG4gICAgICAgIGNvbnN0IHsgb25seVZpc2libGUgfSA9IHRoaXMuX2RlZmF1bHRzLmdldERpYWdub3N0aWNzT3B0aW9ucygpO1xuICAgICAgICBpZiAob25seVZpc2libGUpIHtcbiAgICAgICAgICBpZiAobW9kZWwuaXNBdHRhY2hlZFRvRWRpdG9yKCkpIHtcbiAgICAgICAgICAgIG1heWJlVmFsaWRhdGUoKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbW9uYWNvX2VkaXRvcl9jb3JlX2V4cG9ydHMuZWRpdG9yLnNldE1vZGVsTWFya2Vycyhtb2RlbCwgdGhpcy5fc2VsZWN0b3IsIFtdKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgdGhpcy5fbGlzdGVuZXJbbW9kZWwudXJpLnRvU3RyaW5nKCldID0ge1xuICAgICAgICBkaXNwb3NlKCkge1xuICAgICAgICAgIGNoYW5nZVN1YnNjcmlwdGlvbi5kaXNwb3NlKCk7XG4gICAgICAgICAgdmlzaWJsZVN1YnNjcmlwdGlvbi5kaXNwb3NlKCk7XG4gICAgICAgICAgY2xlYXJUaW1lb3V0KGhhbmRsZSk7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgICBtYXliZVZhbGlkYXRlKCk7XG4gICAgfTtcbiAgICBjb25zdCBvbk1vZGVsUmVtb3ZlZCA9IChtb2RlbCkgPT4ge1xuICAgICAgbW9uYWNvX2VkaXRvcl9jb3JlX2V4cG9ydHMuZWRpdG9yLnNldE1vZGVsTWFya2Vycyhtb2RlbCwgdGhpcy5fc2VsZWN0b3IsIFtdKTtcbiAgICAgIGNvbnN0IGtleSA9IG1vZGVsLnVyaS50b1N0cmluZygpO1xuICAgICAgaWYgKHRoaXMuX2xpc3RlbmVyW2tleV0pIHtcbiAgICAgICAgdGhpcy5fbGlzdGVuZXJba2V5XS5kaXNwb3NlKCk7XG4gICAgICAgIGRlbGV0ZSB0aGlzLl9saXN0ZW5lcltrZXldO1xuICAgICAgfVxuICAgIH07XG4gICAgdGhpcy5fZGlzcG9zYWJsZXMucHVzaChtb25hY29fZWRpdG9yX2NvcmVfZXhwb3J0cy5lZGl0b3Iub25EaWRDcmVhdGVNb2RlbCgobW9kZWwpID0+IG9uTW9kZWxBZGQobW9kZWwpKSk7XG4gICAgdGhpcy5fZGlzcG9zYWJsZXMucHVzaChtb25hY29fZWRpdG9yX2NvcmVfZXhwb3J0cy5lZGl0b3Iub25XaWxsRGlzcG9zZU1vZGVsKG9uTW9kZWxSZW1vdmVkKSk7XG4gICAgdGhpcy5fZGlzcG9zYWJsZXMucHVzaChtb25hY29fZWRpdG9yX2NvcmVfZXhwb3J0cy5lZGl0b3Iub25EaWRDaGFuZ2VNb2RlbExhbmd1YWdlKChldmVudCkgPT4ge1xuICAgICAgb25Nb2RlbFJlbW92ZWQoZXZlbnQubW9kZWwpO1xuICAgICAgb25Nb2RlbEFkZChldmVudC5tb2RlbCk7XG4gICAgfSkpO1xuICAgIHRoaXMuX2Rpc3Bvc2FibGVzLnB1c2goe1xuICAgICAgZGlzcG9zZSgpIHtcbiAgICAgICAgZm9yIChjb25zdCBtb2RlbCBvZiBtb25hY29fZWRpdG9yX2NvcmVfZXhwb3J0cy5lZGl0b3IuZ2V0TW9kZWxzKCkpIHtcbiAgICAgICAgICBvbk1vZGVsUmVtb3ZlZChtb2RlbCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgICBjb25zdCByZWNvbXB1dGVEaWFnb3N0aWNzID0gKCkgPT4ge1xuICAgICAgZm9yIChjb25zdCBtb2RlbCBvZiBtb25hY29fZWRpdG9yX2NvcmVfZXhwb3J0cy5lZGl0b3IuZ2V0TW9kZWxzKCkpIHtcbiAgICAgICAgb25Nb2RlbFJlbW92ZWQobW9kZWwpO1xuICAgICAgICBvbk1vZGVsQWRkKG1vZGVsKTtcbiAgICAgIH1cbiAgICB9O1xuICAgIHRoaXMuX2Rpc3Bvc2FibGVzLnB1c2godGhpcy5fZGVmYXVsdHMub25EaWRDaGFuZ2UocmVjb21wdXRlRGlhZ29zdGljcykpO1xuICAgIHRoaXMuX2Rpc3Bvc2FibGVzLnB1c2godGhpcy5fZGVmYXVsdHMub25EaWRFeHRyYUxpYnNDaGFuZ2UocmVjb21wdXRlRGlhZ29zdGljcykpO1xuICAgIG1vbmFjb19lZGl0b3JfY29yZV9leHBvcnRzLmVkaXRvci5nZXRNb2RlbHMoKS5mb3JFYWNoKChtb2RlbCkgPT4gb25Nb2RlbEFkZChtb2RlbCkpO1xuICB9XG4gIF9kaXNwb3NhYmxlcyA9IFtdO1xuICBfbGlzdGVuZXIgPSAvKiBAX19QVVJFX18gKi8gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgZGlzcG9zZSgpIHtcbiAgICB0aGlzLl9kaXNwb3NhYmxlcy5mb3JFYWNoKChkKSA9PiBkICYmIGQuZGlzcG9zZSgpKTtcbiAgICB0aGlzLl9kaXNwb3NhYmxlcyA9IFtdO1xuICB9XG4gIGFzeW5jIF9kb1ZhbGlkYXRlKG1vZGVsKSB7XG4gICAgY29uc3Qgd29ya2VyID0gYXdhaXQgdGhpcy5fd29ya2VyKG1vZGVsLnVyaSk7XG4gICAgaWYgKG1vZGVsLmlzRGlzcG9zZWQoKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBwcm9taXNlcyA9IFtdO1xuICAgIGNvbnN0IHsgbm9TeW50YXhWYWxpZGF0aW9uLCBub1NlbWFudGljVmFsaWRhdGlvbiwgbm9TdWdnZXN0aW9uRGlhZ25vc3RpY3MgfSA9IHRoaXMuX2RlZmF1bHRzLmdldERpYWdub3N0aWNzT3B0aW9ucygpO1xuICAgIGlmICghbm9TeW50YXhWYWxpZGF0aW9uKSB7XG4gICAgICBwcm9taXNlcy5wdXNoKHdvcmtlci5nZXRTeW50YWN0aWNEaWFnbm9zdGljcyhtb2RlbC51cmkudG9TdHJpbmcoKSkpO1xuICAgIH1cbiAgICBpZiAoIW5vU2VtYW50aWNWYWxpZGF0aW9uKSB7XG4gICAgICBwcm9taXNlcy5wdXNoKHdvcmtlci5nZXRTZW1hbnRpY0RpYWdub3N0aWNzKG1vZGVsLnVyaS50b1N0cmluZygpKSk7XG4gICAgfVxuICAgIGlmICghbm9TdWdnZXN0aW9uRGlhZ25vc3RpY3MpIHtcbiAgICAgIHByb21pc2VzLnB1c2god29ya2VyLmdldFN1Z2dlc3Rpb25EaWFnbm9zdGljcyhtb2RlbC51cmkudG9TdHJpbmcoKSkpO1xuICAgIH1cbiAgICBjb25zdCBhbGxEaWFnbm9zdGljcyA9IGF3YWl0IFByb21pc2UuYWxsKHByb21pc2VzKTtcbiAgICBpZiAoIWFsbERpYWdub3N0aWNzIHx8IG1vZGVsLmlzRGlzcG9zZWQoKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBkaWFnbm9zdGljcyA9IGFsbERpYWdub3N0aWNzLnJlZHVjZSgocCwgYykgPT4gYy5jb25jYXQocCksIFtdKS5maWx0ZXIoKGQpID0+ICh0aGlzLl9kZWZhdWx0cy5nZXREaWFnbm9zdGljc09wdGlvbnMoKS5kaWFnbm9zdGljQ29kZXNUb0lnbm9yZSB8fCBbXSkuaW5kZXhPZihkLmNvZGUpID09PSAtMSk7XG4gICAgY29uc3QgcmVsYXRlZFVyaXMgPSBkaWFnbm9zdGljcy5tYXAoKGQpID0+IGQucmVsYXRlZEluZm9ybWF0aW9uIHx8IFtdKS5yZWR1Y2UoKHAsIGMpID0+IGMuY29uY2F0KHApLCBbXSkubWFwKChyZWxhdGVkSW5mb3JtYXRpb24pID0+IHJlbGF0ZWRJbmZvcm1hdGlvbi5maWxlID8gbW9uYWNvX2VkaXRvcl9jb3JlX2V4cG9ydHMuVXJpLnBhcnNlKHJlbGF0ZWRJbmZvcm1hdGlvbi5maWxlLmZpbGVOYW1lKSA6IG51bGwpO1xuICAgIGF3YWl0IHRoaXMuX2xpYkZpbGVzLmZldGNoTGliRmlsZXNJZk5lY2Vzc2FyeShyZWxhdGVkVXJpcyk7XG4gICAgaWYgKG1vZGVsLmlzRGlzcG9zZWQoKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBtb25hY29fZWRpdG9yX2NvcmVfZXhwb3J0cy5lZGl0b3Iuc2V0TW9kZWxNYXJrZXJzKG1vZGVsLCB0aGlzLl9zZWxlY3RvciwgZGlhZ25vc3RpY3MubWFwKChkKSA9PiB0aGlzLl9jb252ZXJ0RGlhZ25vc3RpY3MobW9kZWwsIGQpKSk7XG4gIH1cbiAgX2NvbnZlcnREaWFnbm9zdGljcyhtb2RlbCwgZGlhZykge1xuICAgIGNvbnN0IGRpYWdTdGFydCA9IGRpYWcuc3RhcnQgfHwgMDtcbiAgICBjb25zdCBkaWFnTGVuZ3RoID0gZGlhZy5sZW5ndGggfHwgMTtcbiAgICBjb25zdCB7IGxpbmVOdW1iZXI6IHN0YXJ0TGluZU51bWJlciwgY29sdW1uOiBzdGFydENvbHVtbiB9ID0gbW9kZWwuZ2V0UG9zaXRpb25BdChkaWFnU3RhcnQpO1xuICAgIGNvbnN0IHsgbGluZU51bWJlcjogZW5kTGluZU51bWJlciwgY29sdW1uOiBlbmRDb2x1bW4gfSA9IG1vZGVsLmdldFBvc2l0aW9uQXQoZGlhZ1N0YXJ0ICsgZGlhZ0xlbmd0aCk7XG4gICAgY29uc3QgdGFncyA9IFtdO1xuICAgIGlmIChkaWFnLnJlcG9ydHNVbm5lY2Vzc2FyeSkge1xuICAgICAgdGFncy5wdXNoKG1vbmFjb19lZGl0b3JfY29yZV9leHBvcnRzLk1hcmtlclRhZy5Vbm5lY2Vzc2FyeSk7XG4gICAgfVxuICAgIGlmIChkaWFnLnJlcG9ydHNEZXByZWNhdGVkKSB7XG4gICAgICB0YWdzLnB1c2gobW9uYWNvX2VkaXRvcl9jb3JlX2V4cG9ydHMuTWFya2VyVGFnLkRlcHJlY2F0ZWQpO1xuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgc2V2ZXJpdHk6IHRoaXMuX3RzRGlhZ25vc3RpY0NhdGVnb3J5VG9NYXJrZXJTZXZlcml0eShkaWFnLmNhdGVnb3J5KSxcbiAgICAgIHN0YXJ0TGluZU51bWJlcixcbiAgICAgIHN0YXJ0Q29sdW1uLFxuICAgICAgZW5kTGluZU51bWJlcixcbiAgICAgIGVuZENvbHVtbixcbiAgICAgIG1lc3NhZ2U6IGZsYXR0ZW5EaWFnbm9zdGljTWVzc2FnZVRleHQoZGlhZy5tZXNzYWdlVGV4dCwgXCJcXG5cIiksXG4gICAgICBjb2RlOiBkaWFnLmNvZGUudG9TdHJpbmcoKSxcbiAgICAgIHRhZ3MsXG4gICAgICByZWxhdGVkSW5mb3JtYXRpb246IHRoaXMuX2NvbnZlcnRSZWxhdGVkSW5mb3JtYXRpb24obW9kZWwsIGRpYWcucmVsYXRlZEluZm9ybWF0aW9uKVxuICAgIH07XG4gIH1cbiAgX2NvbnZlcnRSZWxhdGVkSW5mb3JtYXRpb24obW9kZWwsIHJlbGF0ZWRJbmZvcm1hdGlvbikge1xuICAgIGlmICghcmVsYXRlZEluZm9ybWF0aW9uKSB7XG4gICAgICByZXR1cm4gW107XG4gICAgfVxuICAgIGNvbnN0IHJlc3VsdCA9IFtdO1xuICAgIHJlbGF0ZWRJbmZvcm1hdGlvbi5mb3JFYWNoKChpbmZvKSA9PiB7XG4gICAgICBsZXQgcmVsYXRlZFJlc291cmNlID0gbW9kZWw7XG4gICAgICBpZiAoaW5mby5maWxlKSB7XG4gICAgICAgIHJlbGF0ZWRSZXNvdXJjZSA9IHRoaXMuX2xpYkZpbGVzLmdldE9yQ3JlYXRlTW9kZWwoaW5mby5maWxlLmZpbGVOYW1lKTtcbiAgICAgIH1cbiAgICAgIGlmICghcmVsYXRlZFJlc291cmNlKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGNvbnN0IGluZm9TdGFydCA9IGluZm8uc3RhcnQgfHwgMDtcbiAgICAgIGNvbnN0IGluZm9MZW5ndGggPSBpbmZvLmxlbmd0aCB8fCAxO1xuICAgICAgY29uc3QgeyBsaW5lTnVtYmVyOiBzdGFydExpbmVOdW1iZXIsIGNvbHVtbjogc3RhcnRDb2x1bW4gfSA9IHJlbGF0ZWRSZXNvdXJjZS5nZXRQb3NpdGlvbkF0KGluZm9TdGFydCk7XG4gICAgICBjb25zdCB7IGxpbmVOdW1iZXI6IGVuZExpbmVOdW1iZXIsIGNvbHVtbjogZW5kQ29sdW1uIH0gPSByZWxhdGVkUmVzb3VyY2UuZ2V0UG9zaXRpb25BdChpbmZvU3RhcnQgKyBpbmZvTGVuZ3RoKTtcbiAgICAgIHJlc3VsdC5wdXNoKHtcbiAgICAgICAgcmVzb3VyY2U6IHJlbGF0ZWRSZXNvdXJjZS51cmksXG4gICAgICAgIHN0YXJ0TGluZU51bWJlcixcbiAgICAgICAgc3RhcnRDb2x1bW4sXG4gICAgICAgIGVuZExpbmVOdW1iZXIsXG4gICAgICAgIGVuZENvbHVtbixcbiAgICAgICAgbWVzc2FnZTogZmxhdHRlbkRpYWdub3N0aWNNZXNzYWdlVGV4dChpbmZvLm1lc3NhZ2VUZXh0LCBcIlxcblwiKVxuICAgICAgfSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuICBfdHNEaWFnbm9zdGljQ2F0ZWdvcnlUb01hcmtlclNldmVyaXR5KGNhdGVnb3J5KSB7XG4gICAgc3dpdGNoIChjYXRlZ29yeSkge1xuICAgICAgY2FzZSAxIC8qIEVycm9yICovOlxuICAgICAgICByZXR1cm4gbW9uYWNvX2VkaXRvcl9jb3JlX2V4cG9ydHMuTWFya2VyU2V2ZXJpdHkuRXJyb3I7XG4gICAgICBjYXNlIDMgLyogTWVzc2FnZSAqLzpcbiAgICAgICAgcmV0dXJuIG1vbmFjb19lZGl0b3JfY29yZV9leHBvcnRzLk1hcmtlclNldmVyaXR5LkluZm87XG4gICAgICBjYXNlIDAgLyogV2FybmluZyAqLzpcbiAgICAgICAgcmV0dXJuIG1vbmFjb19lZGl0b3JfY29yZV9leHBvcnRzLk1hcmtlclNldmVyaXR5Lldhcm5pbmc7XG4gICAgICBjYXNlIDIgLyogU3VnZ2VzdGlvbiAqLzpcbiAgICAgICAgcmV0dXJuIG1vbmFjb19lZGl0b3JfY29yZV9leHBvcnRzLk1hcmtlclNldmVyaXR5LkhpbnQ7XG4gICAgfVxuICAgIHJldHVybiBtb25hY29fZWRpdG9yX2NvcmVfZXhwb3J0cy5NYXJrZXJTZXZlcml0eS5JbmZvO1xuICB9XG59O1xudmFyIFN1Z2dlc3RBZGFwdGVyID0gY2xhc3MgZXh0ZW5kcyBBZGFwdGVyIHtcbiAgZ2V0IHRyaWdnZXJDaGFyYWN0ZXJzKCkge1xuICAgIHJldHVybiBbXCIuXCJdO1xuICB9XG4gIGFzeW5jIHByb3ZpZGVDb21wbGV0aW9uSXRlbXMobW9kZWwsIHBvc2l0aW9uLCBfY29udGV4dCwgdG9rZW4pIHtcbiAgICBjb25zdCB3b3JkSW5mbyA9IG1vZGVsLmdldFdvcmRVbnRpbFBvc2l0aW9uKHBvc2l0aW9uKTtcbiAgICBjb25zdCB3b3JkUmFuZ2UgPSBuZXcgbW9uYWNvX2VkaXRvcl9jb3JlX2V4cG9ydHMuUmFuZ2UocG9zaXRpb24ubGluZU51bWJlciwgd29yZEluZm8uc3RhcnRDb2x1bW4sIHBvc2l0aW9uLmxpbmVOdW1iZXIsIHdvcmRJbmZvLmVuZENvbHVtbik7XG4gICAgY29uc3QgcmVzb3VyY2UgPSBtb2RlbC51cmk7XG4gICAgY29uc3Qgb2Zmc2V0ID0gbW9kZWwuZ2V0T2Zmc2V0QXQocG9zaXRpb24pO1xuICAgIGNvbnN0IHdvcmtlciA9IGF3YWl0IHRoaXMuX3dvcmtlcihyZXNvdXJjZSk7XG4gICAgaWYgKG1vZGVsLmlzRGlzcG9zZWQoKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBpbmZvID0gYXdhaXQgd29ya2VyLmdldENvbXBsZXRpb25zQXRQb3NpdGlvbihyZXNvdXJjZS50b1N0cmluZygpLCBvZmZzZXQpO1xuICAgIGlmICghaW5mbyB8fCBtb2RlbC5pc0Rpc3Bvc2VkKCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3Qgc3VnZ2VzdGlvbnMgPSBpbmZvLmVudHJpZXMubWFwKChlbnRyeSkgPT4ge1xuICAgICAgbGV0IHJhbmdlID0gd29yZFJhbmdlO1xuICAgICAgaWYgKGVudHJ5LnJlcGxhY2VtZW50U3Bhbikge1xuICAgICAgICBjb25zdCBwMSA9IG1vZGVsLmdldFBvc2l0aW9uQXQoZW50cnkucmVwbGFjZW1lbnRTcGFuLnN0YXJ0KTtcbiAgICAgICAgY29uc3QgcDIgPSBtb2RlbC5nZXRQb3NpdGlvbkF0KGVudHJ5LnJlcGxhY2VtZW50U3Bhbi5zdGFydCArIGVudHJ5LnJlcGxhY2VtZW50U3Bhbi5sZW5ndGgpO1xuICAgICAgICByYW5nZSA9IG5ldyBtb25hY29fZWRpdG9yX2NvcmVfZXhwb3J0cy5SYW5nZShwMS5saW5lTnVtYmVyLCBwMS5jb2x1bW4sIHAyLmxpbmVOdW1iZXIsIHAyLmNvbHVtbik7XG4gICAgICB9XG4gICAgICBjb25zdCB0YWdzID0gW107XG4gICAgICBpZiAoZW50cnkua2luZE1vZGlmaWVycyAhPT0gdm9pZCAwICYmIGVudHJ5LmtpbmRNb2RpZmllcnMuaW5kZXhPZihcImRlcHJlY2F0ZWRcIikgIT09IC0xKSB7XG4gICAgICAgIHRhZ3MucHVzaChtb25hY29fZWRpdG9yX2NvcmVfZXhwb3J0cy5sYW5ndWFnZXMuQ29tcGxldGlvbkl0ZW1UYWcuRGVwcmVjYXRlZCk7XG4gICAgICB9XG4gICAgICByZXR1cm4ge1xuICAgICAgICB1cmk6IHJlc291cmNlLFxuICAgICAgICBwb3NpdGlvbixcbiAgICAgICAgb2Zmc2V0LFxuICAgICAgICByYW5nZSxcbiAgICAgICAgbGFiZWw6IGVudHJ5Lm5hbWUsXG4gICAgICAgIGluc2VydFRleHQ6IGVudHJ5Lm5hbWUsXG4gICAgICAgIHNvcnRUZXh0OiBlbnRyeS5zb3J0VGV4dCxcbiAgICAgICAga2luZDogU3VnZ2VzdEFkYXB0ZXIuY29udmVydEtpbmQoZW50cnkua2luZCksXG4gICAgICAgIHRhZ3NcbiAgICAgIH07XG4gICAgfSk7XG4gICAgcmV0dXJuIHtcbiAgICAgIHN1Z2dlc3Rpb25zXG4gICAgfTtcbiAgfVxuICBhc3luYyByZXNvbHZlQ29tcGxldGlvbkl0ZW0oaXRlbSwgdG9rZW4pIHtcbiAgICBjb25zdCBteUl0ZW0gPSBpdGVtO1xuICAgIGNvbnN0IHJlc291cmNlID0gbXlJdGVtLnVyaTtcbiAgICBjb25zdCBwb3NpdGlvbiA9IG15SXRlbS5wb3NpdGlvbjtcbiAgICBjb25zdCBvZmZzZXQgPSBteUl0ZW0ub2Zmc2V0O1xuICAgIGNvbnN0IHdvcmtlciA9IGF3YWl0IHRoaXMuX3dvcmtlcihyZXNvdXJjZSk7XG4gICAgY29uc3QgZGV0YWlscyA9IGF3YWl0IHdvcmtlci5nZXRDb21wbGV0aW9uRW50cnlEZXRhaWxzKHJlc291cmNlLnRvU3RyaW5nKCksIG9mZnNldCwgbXlJdGVtLmxhYmVsKTtcbiAgICBpZiAoIWRldGFpbHMpIHtcbiAgICAgIHJldHVybiBteUl0ZW07XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICB1cmk6IHJlc291cmNlLFxuICAgICAgcG9zaXRpb24sXG4gICAgICBsYWJlbDogZGV0YWlscy5uYW1lLFxuICAgICAga2luZDogU3VnZ2VzdEFkYXB0ZXIuY29udmVydEtpbmQoZGV0YWlscy5raW5kKSxcbiAgICAgIGRldGFpbDogZGlzcGxheVBhcnRzVG9TdHJpbmcoZGV0YWlscy5kaXNwbGF5UGFydHMpLFxuICAgICAgZG9jdW1lbnRhdGlvbjoge1xuICAgICAgICB2YWx1ZTogU3VnZ2VzdEFkYXB0ZXIuY3JlYXRlRG9jdW1lbnRhdGlvblN0cmluZyhkZXRhaWxzKVxuICAgICAgfVxuICAgIH07XG4gIH1cbiAgc3RhdGljIGNvbnZlcnRLaW5kKGtpbmQpIHtcbiAgICBzd2l0Y2ggKGtpbmQpIHtcbiAgICAgIGNhc2UgS2luZC5wcmltaXRpdmVUeXBlOlxuICAgICAgY2FzZSBLaW5kLmtleXdvcmQ6XG4gICAgICAgIHJldHVybiBtb25hY29fZWRpdG9yX2NvcmVfZXhwb3J0cy5sYW5ndWFnZXMuQ29tcGxldGlvbkl0ZW1LaW5kLktleXdvcmQ7XG4gICAgICBjYXNlIEtpbmQudmFyaWFibGU6XG4gICAgICBjYXNlIEtpbmQubG9jYWxWYXJpYWJsZTpcbiAgICAgICAgcmV0dXJuIG1vbmFjb19lZGl0b3JfY29yZV9leHBvcnRzLmxhbmd1YWdlcy5Db21wbGV0aW9uSXRlbUtpbmQuVmFyaWFibGU7XG4gICAgICBjYXNlIEtpbmQubWVtYmVyVmFyaWFibGU6XG4gICAgICBjYXNlIEtpbmQubWVtYmVyR2V0QWNjZXNzb3I6XG4gICAgICBjYXNlIEtpbmQubWVtYmVyU2V0QWNjZXNzb3I6XG4gICAgICAgIHJldHVybiBtb25hY29fZWRpdG9yX2NvcmVfZXhwb3J0cy5sYW5ndWFnZXMuQ29tcGxldGlvbkl0ZW1LaW5kLkZpZWxkO1xuICAgICAgY2FzZSBLaW5kLmZ1bmN0aW9uOlxuICAgICAgY2FzZSBLaW5kLm1lbWJlckZ1bmN0aW9uOlxuICAgICAgY2FzZSBLaW5kLmNvbnN0cnVjdFNpZ25hdHVyZTpcbiAgICAgIGNhc2UgS2luZC5jYWxsU2lnbmF0dXJlOlxuICAgICAgY2FzZSBLaW5kLmluZGV4U2lnbmF0dXJlOlxuICAgICAgICByZXR1cm4gbW9uYWNvX2VkaXRvcl9jb3JlX2V4cG9ydHMubGFuZ3VhZ2VzLkNvbXBsZXRpb25JdGVtS2luZC5GdW5jdGlvbjtcbiAgICAgIGNhc2UgS2luZC5lbnVtOlxuICAgICAgICByZXR1cm4gbW9uYWNvX2VkaXRvcl9jb3JlX2V4cG9ydHMubGFuZ3VhZ2VzLkNvbXBsZXRpb25JdGVtS2luZC5FbnVtO1xuICAgICAgY2FzZSBLaW5kLm1vZHVsZTpcbiAgICAgICAgcmV0dXJuIG1vbmFjb19lZGl0b3JfY29yZV9leHBvcnRzLmxhbmd1YWdlcy5Db21wbGV0aW9uSXRlbUtpbmQuTW9kdWxlO1xuICAgICAgY2FzZSBLaW5kLmNsYXNzOlxuICAgICAgICByZXR1cm4gbW9uYWNvX2VkaXRvcl9jb3JlX2V4cG9ydHMubGFuZ3VhZ2VzLkNvbXBsZXRpb25JdGVtS2luZC5DbGFzcztcbiAgICAgIGNhc2UgS2luZC5pbnRlcmZhY2U6XG4gICAgICAgIHJldHVybiBtb25hY29fZWRpdG9yX2NvcmVfZXhwb3J0cy5sYW5ndWFnZXMuQ29tcGxldGlvbkl0ZW1LaW5kLkludGVyZmFjZTtcbiAgICAgIGNhc2UgS2luZC53YXJuaW5nOlxuICAgICAgICByZXR1cm4gbW9uYWNvX2VkaXRvcl9jb3JlX2V4cG9ydHMubGFuZ3VhZ2VzLkNvbXBsZXRpb25JdGVtS2luZC5GaWxlO1xuICAgIH1cbiAgICByZXR1cm4gbW9uYWNvX2VkaXRvcl9jb3JlX2V4cG9ydHMubGFuZ3VhZ2VzLkNvbXBsZXRpb25JdGVtS2luZC5Qcm9wZXJ0eTtcbiAgfVxuICBzdGF0aWMgY3JlYXRlRG9jdW1lbnRhdGlvblN0cmluZyhkZXRhaWxzKSB7XG4gICAgbGV0IGRvY3VtZW50YXRpb25TdHJpbmcgPSBkaXNwbGF5UGFydHNUb1N0cmluZyhkZXRhaWxzLmRvY3VtZW50YXRpb24pO1xuICAgIGlmIChkZXRhaWxzLnRhZ3MpIHtcbiAgICAgIGZvciAoY29uc3QgdGFnIG9mIGRldGFpbHMudGFncykge1xuICAgICAgICBkb2N1bWVudGF0aW9uU3RyaW5nICs9IGBcblxuJHt0YWdUb1N0cmluZyh0YWcpfWA7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBkb2N1bWVudGF0aW9uU3RyaW5nO1xuICB9XG59O1xuZnVuY3Rpb24gdGFnVG9TdHJpbmcodGFnKSB7XG4gIGxldCB0YWdMYWJlbCA9IGAqQCR7dGFnLm5hbWV9KmA7XG4gIGlmICh0YWcubmFtZSA9PT0gXCJwYXJhbVwiICYmIHRhZy50ZXh0KSB7XG4gICAgY29uc3QgW3BhcmFtTmFtZSwgLi4ucmVzdF0gPSB0YWcudGV4dDtcbiAgICB0YWdMYWJlbCArPSBgXFxgJHtwYXJhbU5hbWUudGV4dH1cXGBgO1xuICAgIGlmIChyZXN0Lmxlbmd0aCA+IDApXG4gICAgICB0YWdMYWJlbCArPSBgIFxcdTIwMTQgJHtyZXN0Lm1hcCgocikgPT4gci50ZXh0KS5qb2luKFwiIFwiKX1gO1xuICB9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkodGFnLnRleHQpKSB7XG4gICAgdGFnTGFiZWwgKz0gYCBcXHUyMDE0ICR7dGFnLnRleHQubWFwKChyKSA9PiByLnRleHQpLmpvaW4oXCIgXCIpfWA7XG4gIH0gZWxzZSBpZiAodGFnLnRleHQpIHtcbiAgICB0YWdMYWJlbCArPSBgIFxcdTIwMTQgJHt0YWcudGV4dH1gO1xuICB9XG4gIHJldHVybiB0YWdMYWJlbDtcbn1cbnZhciBTaWduYXR1cmVIZWxwQWRhcHRlciA9IGNsYXNzIGV4dGVuZHMgQWRhcHRlciB7XG4gIHNpZ25hdHVyZUhlbHBUcmlnZ2VyQ2hhcmFjdGVycyA9IFtcIihcIiwgXCIsXCJdO1xuICBzdGF0aWMgX3RvU2lnbmF0dXJlSGVscFRyaWdnZXJSZWFzb24oY29udGV4dCkge1xuICAgIHN3aXRjaCAoY29udGV4dC50cmlnZ2VyS2luZCkge1xuICAgICAgY2FzZSBtb25hY29fZWRpdG9yX2NvcmVfZXhwb3J0cy5sYW5ndWFnZXMuU2lnbmF0dXJlSGVscFRyaWdnZXJLaW5kLlRyaWdnZXJDaGFyYWN0ZXI6XG4gICAgICAgIGlmIChjb250ZXh0LnRyaWdnZXJDaGFyYWN0ZXIpIHtcbiAgICAgICAgICBpZiAoY29udGV4dC5pc1JldHJpZ2dlcikge1xuICAgICAgICAgICAgcmV0dXJuIHsga2luZDogXCJyZXRyaWdnZXJcIiwgdHJpZ2dlckNoYXJhY3RlcjogY29udGV4dC50cmlnZ2VyQ2hhcmFjdGVyIH07XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB7IGtpbmQ6IFwiY2hhcmFjdGVyVHlwZWRcIiwgdHJpZ2dlckNoYXJhY3RlcjogY29udGV4dC50cmlnZ2VyQ2hhcmFjdGVyIH07XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiB7IGtpbmQ6IFwiaW52b2tlZFwiIH07XG4gICAgICAgIH1cbiAgICAgIGNhc2UgbW9uYWNvX2VkaXRvcl9jb3JlX2V4cG9ydHMubGFuZ3VhZ2VzLlNpZ25hdHVyZUhlbHBUcmlnZ2VyS2luZC5Db250ZW50Q2hhbmdlOlxuICAgICAgICByZXR1cm4gY29udGV4dC5pc1JldHJpZ2dlciA/IHsga2luZDogXCJyZXRyaWdnZXJcIiB9IDogeyBraW5kOiBcImludm9rZWRcIiB9O1xuICAgICAgY2FzZSBtb25hY29fZWRpdG9yX2NvcmVfZXhwb3J0cy5sYW5ndWFnZXMuU2lnbmF0dXJlSGVscFRyaWdnZXJLaW5kLkludm9rZTpcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiB7IGtpbmQ6IFwiaW52b2tlZFwiIH07XG4gICAgfVxuICB9XG4gIGFzeW5jIHByb3ZpZGVTaWduYXR1cmVIZWxwKG1vZGVsLCBwb3NpdGlvbiwgdG9rZW4sIGNvbnRleHQpIHtcbiAgICBjb25zdCByZXNvdXJjZSA9IG1vZGVsLnVyaTtcbiAgICBjb25zdCBvZmZzZXQgPSBtb2RlbC5nZXRPZmZzZXRBdChwb3NpdGlvbik7XG4gICAgY29uc3Qgd29ya2VyID0gYXdhaXQgdGhpcy5fd29ya2VyKHJlc291cmNlKTtcbiAgICBpZiAobW9kZWwuaXNEaXNwb3NlZCgpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IGluZm8gPSBhd2FpdCB3b3JrZXIuZ2V0U2lnbmF0dXJlSGVscEl0ZW1zKHJlc291cmNlLnRvU3RyaW5nKCksIG9mZnNldCwge1xuICAgICAgdHJpZ2dlclJlYXNvbjogU2lnbmF0dXJlSGVscEFkYXB0ZXIuX3RvU2lnbmF0dXJlSGVscFRyaWdnZXJSZWFzb24oY29udGV4dClcbiAgICB9KTtcbiAgICBpZiAoIWluZm8gfHwgbW9kZWwuaXNEaXNwb3NlZCgpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IHJldCA9IHtcbiAgICAgIGFjdGl2ZVNpZ25hdHVyZTogaW5mby5zZWxlY3RlZEl0ZW1JbmRleCxcbiAgICAgIGFjdGl2ZVBhcmFtZXRlcjogaW5mby5hcmd1bWVudEluZGV4LFxuICAgICAgc2lnbmF0dXJlczogW11cbiAgICB9O1xuICAgIGluZm8uaXRlbXMuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgY29uc3Qgc2lnbmF0dXJlID0ge1xuICAgICAgICBsYWJlbDogXCJcIixcbiAgICAgICAgcGFyYW1ldGVyczogW11cbiAgICAgIH07XG4gICAgICBzaWduYXR1cmUuZG9jdW1lbnRhdGlvbiA9IHtcbiAgICAgICAgdmFsdWU6IGRpc3BsYXlQYXJ0c1RvU3RyaW5nKGl0ZW0uZG9jdW1lbnRhdGlvbilcbiAgICAgIH07XG4gICAgICBzaWduYXR1cmUubGFiZWwgKz0gZGlzcGxheVBhcnRzVG9TdHJpbmcoaXRlbS5wcmVmaXhEaXNwbGF5UGFydHMpO1xuICAgICAgaXRlbS5wYXJhbWV0ZXJzLmZvckVhY2goKHAsIGksIGEpID0+IHtcbiAgICAgICAgY29uc3QgbGFiZWwgPSBkaXNwbGF5UGFydHNUb1N0cmluZyhwLmRpc3BsYXlQYXJ0cyk7XG4gICAgICAgIGNvbnN0IHBhcmFtZXRlciA9IHtcbiAgICAgICAgICBsYWJlbCxcbiAgICAgICAgICBkb2N1bWVudGF0aW9uOiB7XG4gICAgICAgICAgICB2YWx1ZTogZGlzcGxheVBhcnRzVG9TdHJpbmcocC5kb2N1bWVudGF0aW9uKVxuICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgc2lnbmF0dXJlLmxhYmVsICs9IGxhYmVsO1xuICAgICAgICBzaWduYXR1cmUucGFyYW1ldGVycy5wdXNoKHBhcmFtZXRlcik7XG4gICAgICAgIGlmIChpIDwgYS5sZW5ndGggLSAxKSB7XG4gICAgICAgICAgc2lnbmF0dXJlLmxhYmVsICs9IGRpc3BsYXlQYXJ0c1RvU3RyaW5nKGl0ZW0uc2VwYXJhdG9yRGlzcGxheVBhcnRzKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICBzaWduYXR1cmUubGFiZWwgKz0gZGlzcGxheVBhcnRzVG9TdHJpbmcoaXRlbS5zdWZmaXhEaXNwbGF5UGFydHMpO1xuICAgICAgcmV0LnNpZ25hdHVyZXMucHVzaChzaWduYXR1cmUpO1xuICAgIH0pO1xuICAgIHJldHVybiB7XG4gICAgICB2YWx1ZTogcmV0LFxuICAgICAgZGlzcG9zZSgpIHtcbiAgICAgIH1cbiAgICB9O1xuICB9XG59O1xudmFyIFF1aWNrSW5mb0FkYXB0ZXIgPSBjbGFzcyBleHRlbmRzIEFkYXB0ZXIge1xuICBhc3luYyBwcm92aWRlSG92ZXIobW9kZWwsIHBvc2l0aW9uLCB0b2tlbikge1xuICAgIGNvbnN0IHJlc291cmNlID0gbW9kZWwudXJpO1xuICAgIGNvbnN0IG9mZnNldCA9IG1vZGVsLmdldE9mZnNldEF0KHBvc2l0aW9uKTtcbiAgICBjb25zdCB3b3JrZXIgPSBhd2FpdCB0aGlzLl93b3JrZXIocmVzb3VyY2UpO1xuICAgIGlmIChtb2RlbC5pc0Rpc3Bvc2VkKCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgaW5mbyA9IGF3YWl0IHdvcmtlci5nZXRRdWlja0luZm9BdFBvc2l0aW9uKHJlc291cmNlLnRvU3RyaW5nKCksIG9mZnNldCk7XG4gICAgaWYgKCFpbmZvIHx8IG1vZGVsLmlzRGlzcG9zZWQoKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBkb2N1bWVudGF0aW9uID0gZGlzcGxheVBhcnRzVG9TdHJpbmcoaW5mby5kb2N1bWVudGF0aW9uKTtcbiAgICBjb25zdCB0YWdzID0gaW5mby50YWdzID8gaW5mby50YWdzLm1hcCgodGFnKSA9PiB0YWdUb1N0cmluZyh0YWcpKS5qb2luKFwiICBcXG5cXG5cIikgOiBcIlwiO1xuICAgIGNvbnN0IGNvbnRlbnRzID0gZGlzcGxheVBhcnRzVG9TdHJpbmcoaW5mby5kaXNwbGF5UGFydHMpO1xuICAgIHJldHVybiB7XG4gICAgICByYW5nZTogdGhpcy5fdGV4dFNwYW5Ub1JhbmdlKG1vZGVsLCBpbmZvLnRleHRTcGFuKSxcbiAgICAgIGNvbnRlbnRzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICB2YWx1ZTogXCJgYGB0eXBlc2NyaXB0XFxuXCIgKyBjb250ZW50cyArIFwiXFxuYGBgXFxuXCJcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIHZhbHVlOiBkb2N1bWVudGF0aW9uICsgKHRhZ3MgPyBcIlxcblxcblwiICsgdGFncyA6IFwiXCIpXG4gICAgICAgIH1cbiAgICAgIF1cbiAgICB9O1xuICB9XG59O1xudmFyIERvY3VtZW50SGlnaGxpZ2h0QWRhcHRlciA9IGNsYXNzIGV4dGVuZHMgQWRhcHRlciB7XG4gIGFzeW5jIHByb3ZpZGVEb2N1bWVudEhpZ2hsaWdodHMobW9kZWwsIHBvc2l0aW9uLCB0b2tlbikge1xuICAgIGNvbnN0IHJlc291cmNlID0gbW9kZWwudXJpO1xuICAgIGNvbnN0IG9mZnNldCA9IG1vZGVsLmdldE9mZnNldEF0KHBvc2l0aW9uKTtcbiAgICBjb25zdCB3b3JrZXIgPSBhd2FpdCB0aGlzLl93b3JrZXIocmVzb3VyY2UpO1xuICAgIGlmIChtb2RlbC5pc0Rpc3Bvc2VkKCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgZW50cmllcyA9IGF3YWl0IHdvcmtlci5nZXREb2N1bWVudEhpZ2hsaWdodHMocmVzb3VyY2UudG9TdHJpbmcoKSwgb2Zmc2V0LCBbXG4gICAgICByZXNvdXJjZS50b1N0cmluZygpXG4gICAgXSk7XG4gICAgaWYgKCFlbnRyaWVzIHx8IG1vZGVsLmlzRGlzcG9zZWQoKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICByZXR1cm4gZW50cmllcy5mbGF0TWFwKChlbnRyeSkgPT4ge1xuICAgICAgcmV0dXJuIGVudHJ5LmhpZ2hsaWdodFNwYW5zLm1hcCgoaGlnaGxpZ2h0U3BhbnMpID0+IHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICByYW5nZTogdGhpcy5fdGV4dFNwYW5Ub1JhbmdlKG1vZGVsLCBoaWdobGlnaHRTcGFucy50ZXh0U3BhbiksXG4gICAgICAgICAga2luZDogaGlnaGxpZ2h0U3BhbnMua2luZCA9PT0gXCJ3cml0dGVuUmVmZXJlbmNlXCIgPyBtb25hY29fZWRpdG9yX2NvcmVfZXhwb3J0cy5sYW5ndWFnZXMuRG9jdW1lbnRIaWdobGlnaHRLaW5kLldyaXRlIDogbW9uYWNvX2VkaXRvcl9jb3JlX2V4cG9ydHMubGFuZ3VhZ2VzLkRvY3VtZW50SGlnaGxpZ2h0S2luZC5UZXh0XG4gICAgICAgIH07XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxufTtcbnZhciBEZWZpbml0aW9uQWRhcHRlciA9IGNsYXNzIGV4dGVuZHMgQWRhcHRlciB7XG4gIGNvbnN0cnVjdG9yKF9saWJGaWxlcywgd29ya2VyKSB7XG4gICAgc3VwZXIod29ya2VyKTtcbiAgICB0aGlzLl9saWJGaWxlcyA9IF9saWJGaWxlcztcbiAgfVxuICBhc3luYyBwcm92aWRlRGVmaW5pdGlvbihtb2RlbCwgcG9zaXRpb24sIHRva2VuKSB7XG4gICAgY29uc3QgcmVzb3VyY2UgPSBtb2RlbC51cmk7XG4gICAgY29uc3Qgb2Zmc2V0ID0gbW9kZWwuZ2V0T2Zmc2V0QXQocG9zaXRpb24pO1xuICAgIGNvbnN0IHdvcmtlciA9IGF3YWl0IHRoaXMuX3dvcmtlcihyZXNvdXJjZSk7XG4gICAgaWYgKG1vZGVsLmlzRGlzcG9zZWQoKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBlbnRyaWVzID0gYXdhaXQgd29ya2VyLmdldERlZmluaXRpb25BdFBvc2l0aW9uKHJlc291cmNlLnRvU3RyaW5nKCksIG9mZnNldCk7XG4gICAgaWYgKCFlbnRyaWVzIHx8IG1vZGVsLmlzRGlzcG9zZWQoKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBhd2FpdCB0aGlzLl9saWJGaWxlcy5mZXRjaExpYkZpbGVzSWZOZWNlc3NhcnkoZW50cmllcy5tYXAoKGVudHJ5KSA9PiBtb25hY29fZWRpdG9yX2NvcmVfZXhwb3J0cy5VcmkucGFyc2UoZW50cnkuZmlsZU5hbWUpKSk7XG4gICAgaWYgKG1vZGVsLmlzRGlzcG9zZWQoKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCByZXN1bHQgPSBbXTtcbiAgICBmb3IgKGxldCBlbnRyeSBvZiBlbnRyaWVzKSB7XG4gICAgICBjb25zdCByZWZNb2RlbCA9IHRoaXMuX2xpYkZpbGVzLmdldE9yQ3JlYXRlTW9kZWwoZW50cnkuZmlsZU5hbWUpO1xuICAgICAgaWYgKHJlZk1vZGVsKSB7XG4gICAgICAgIHJlc3VsdC5wdXNoKHtcbiAgICAgICAgICB1cmk6IHJlZk1vZGVsLnVyaSxcbiAgICAgICAgICByYW5nZTogdGhpcy5fdGV4dFNwYW5Ub1JhbmdlKHJlZk1vZGVsLCBlbnRyeS50ZXh0U3BhbilcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cbn07XG52YXIgUmVmZXJlbmNlQWRhcHRlciA9IGNsYXNzIGV4dGVuZHMgQWRhcHRlciB7XG4gIGNvbnN0cnVjdG9yKF9saWJGaWxlcywgd29ya2VyKSB7XG4gICAgc3VwZXIod29ya2VyKTtcbiAgICB0aGlzLl9saWJGaWxlcyA9IF9saWJGaWxlcztcbiAgfVxuICBhc3luYyBwcm92aWRlUmVmZXJlbmNlcyhtb2RlbCwgcG9zaXRpb24sIGNvbnRleHQsIHRva2VuKSB7XG4gICAgY29uc3QgcmVzb3VyY2UgPSBtb2RlbC51cmk7XG4gICAgY29uc3Qgb2Zmc2V0ID0gbW9kZWwuZ2V0T2Zmc2V0QXQocG9zaXRpb24pO1xuICAgIGNvbnN0IHdvcmtlciA9IGF3YWl0IHRoaXMuX3dvcmtlcihyZXNvdXJjZSk7XG4gICAgaWYgKG1vZGVsLmlzRGlzcG9zZWQoKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBlbnRyaWVzID0gYXdhaXQgd29ya2VyLmdldFJlZmVyZW5jZXNBdFBvc2l0aW9uKHJlc291cmNlLnRvU3RyaW5nKCksIG9mZnNldCk7XG4gICAgaWYgKCFlbnRyaWVzIHx8IG1vZGVsLmlzRGlzcG9zZWQoKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBhd2FpdCB0aGlzLl9saWJGaWxlcy5mZXRjaExpYkZpbGVzSWZOZWNlc3NhcnkoZW50cmllcy5tYXAoKGVudHJ5KSA9PiBtb25hY29fZWRpdG9yX2NvcmVfZXhwb3J0cy5VcmkucGFyc2UoZW50cnkuZmlsZU5hbWUpKSk7XG4gICAgaWYgKG1vZGVsLmlzRGlzcG9zZWQoKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCByZXN1bHQgPSBbXTtcbiAgICBmb3IgKGxldCBlbnRyeSBvZiBlbnRyaWVzKSB7XG4gICAgICBjb25zdCByZWZNb2RlbCA9IHRoaXMuX2xpYkZpbGVzLmdldE9yQ3JlYXRlTW9kZWwoZW50cnkuZmlsZU5hbWUpO1xuICAgICAgaWYgKHJlZk1vZGVsKSB7XG4gICAgICAgIHJlc3VsdC5wdXNoKHtcbiAgICAgICAgICB1cmk6IHJlZk1vZGVsLnVyaSxcbiAgICAgICAgICByYW5nZTogdGhpcy5fdGV4dFNwYW5Ub1JhbmdlKHJlZk1vZGVsLCBlbnRyeS50ZXh0U3BhbilcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cbn07XG52YXIgT3V0bGluZUFkYXB0ZXIgPSBjbGFzcyBleHRlbmRzIEFkYXB0ZXIge1xuICBhc3luYyBwcm92aWRlRG9jdW1lbnRTeW1ib2xzKG1vZGVsLCB0b2tlbikge1xuICAgIGNvbnN0IHJlc291cmNlID0gbW9kZWwudXJpO1xuICAgIGNvbnN0IHdvcmtlciA9IGF3YWl0IHRoaXMuX3dvcmtlcihyZXNvdXJjZSk7XG4gICAgaWYgKG1vZGVsLmlzRGlzcG9zZWQoKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCByb290ID0gYXdhaXQgd29ya2VyLmdldE5hdmlnYXRpb25UcmVlKHJlc291cmNlLnRvU3RyaW5nKCkpO1xuICAgIGlmICghcm9vdCB8fCBtb2RlbC5pc0Rpc3Bvc2VkKCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgY29udmVydCA9IChpdGVtLCBjb250YWluZXJMYWJlbCkgPT4ge1xuICAgICAgY29uc3QgcmVzdWx0MiA9IHtcbiAgICAgICAgbmFtZTogaXRlbS50ZXh0LFxuICAgICAgICBkZXRhaWw6IFwiXCIsXG4gICAgICAgIGtpbmQ6IG91dGxpbmVUeXBlVGFibGVbaXRlbS5raW5kXSB8fCBtb25hY29fZWRpdG9yX2NvcmVfZXhwb3J0cy5sYW5ndWFnZXMuU3ltYm9sS2luZC5WYXJpYWJsZSxcbiAgICAgICAgcmFuZ2U6IHRoaXMuX3RleHRTcGFuVG9SYW5nZShtb2RlbCwgaXRlbS5zcGFuc1swXSksXG4gICAgICAgIHNlbGVjdGlvblJhbmdlOiB0aGlzLl90ZXh0U3BhblRvUmFuZ2UobW9kZWwsIGl0ZW0uc3BhbnNbMF0pLFxuICAgICAgICB0YWdzOiBbXSxcbiAgICAgICAgY2hpbGRyZW46IGl0ZW0uY2hpbGRJdGVtcz8ubWFwKChjaGlsZCkgPT4gY29udmVydChjaGlsZCwgaXRlbS50ZXh0KSksXG4gICAgICAgIGNvbnRhaW5lck5hbWU6IGNvbnRhaW5lckxhYmVsXG4gICAgICB9O1xuICAgICAgcmV0dXJuIHJlc3VsdDI7XG4gICAgfTtcbiAgICBjb25zdCByZXN1bHQgPSByb290LmNoaWxkSXRlbXMgPyByb290LmNoaWxkSXRlbXMubWFwKChpdGVtKSA9PiBjb252ZXJ0KGl0ZW0pKSA6IFtdO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cbn07XG52YXIgS2luZCA9IGNsYXNzIHtcbn07XG5fX3B1YmxpY0ZpZWxkKEtpbmQsIFwidW5rbm93blwiLCBcIlwiKTtcbl9fcHVibGljRmllbGQoS2luZCwgXCJrZXl3b3JkXCIsIFwia2V5d29yZFwiKTtcbl9fcHVibGljRmllbGQoS2luZCwgXCJzY3JpcHRcIiwgXCJzY3JpcHRcIik7XG5fX3B1YmxpY0ZpZWxkKEtpbmQsIFwibW9kdWxlXCIsIFwibW9kdWxlXCIpO1xuX19wdWJsaWNGaWVsZChLaW5kLCBcImNsYXNzXCIsIFwiY2xhc3NcIik7XG5fX3B1YmxpY0ZpZWxkKEtpbmQsIFwiaW50ZXJmYWNlXCIsIFwiaW50ZXJmYWNlXCIpO1xuX19wdWJsaWNGaWVsZChLaW5kLCBcInR5cGVcIiwgXCJ0eXBlXCIpO1xuX19wdWJsaWNGaWVsZChLaW5kLCBcImVudW1cIiwgXCJlbnVtXCIpO1xuX19wdWJsaWNGaWVsZChLaW5kLCBcInZhcmlhYmxlXCIsIFwidmFyXCIpO1xuX19wdWJsaWNGaWVsZChLaW5kLCBcImxvY2FsVmFyaWFibGVcIiwgXCJsb2NhbCB2YXJcIik7XG5fX3B1YmxpY0ZpZWxkKEtpbmQsIFwiZnVuY3Rpb25cIiwgXCJmdW5jdGlvblwiKTtcbl9fcHVibGljRmllbGQoS2luZCwgXCJsb2NhbEZ1bmN0aW9uXCIsIFwibG9jYWwgZnVuY3Rpb25cIik7XG5fX3B1YmxpY0ZpZWxkKEtpbmQsIFwibWVtYmVyRnVuY3Rpb25cIiwgXCJtZXRob2RcIik7XG5fX3B1YmxpY0ZpZWxkKEtpbmQsIFwibWVtYmVyR2V0QWNjZXNzb3JcIiwgXCJnZXR0ZXJcIik7XG5fX3B1YmxpY0ZpZWxkKEtpbmQsIFwibWVtYmVyU2V0QWNjZXNzb3JcIiwgXCJzZXR0ZXJcIik7XG5fX3B1YmxpY0ZpZWxkKEtpbmQsIFwibWVtYmVyVmFyaWFibGVcIiwgXCJwcm9wZXJ0eVwiKTtcbl9fcHVibGljRmllbGQoS2luZCwgXCJjb25zdHJ1Y3RvckltcGxlbWVudGF0aW9uXCIsIFwiY29uc3RydWN0b3JcIik7XG5fX3B1YmxpY0ZpZWxkKEtpbmQsIFwiY2FsbFNpZ25hdHVyZVwiLCBcImNhbGxcIik7XG5fX3B1YmxpY0ZpZWxkKEtpbmQsIFwiaW5kZXhTaWduYXR1cmVcIiwgXCJpbmRleFwiKTtcbl9fcHVibGljRmllbGQoS2luZCwgXCJjb25zdHJ1Y3RTaWduYXR1cmVcIiwgXCJjb25zdHJ1Y3RcIik7XG5fX3B1YmxpY0ZpZWxkKEtpbmQsIFwicGFyYW1ldGVyXCIsIFwicGFyYW1ldGVyXCIpO1xuX19wdWJsaWNGaWVsZChLaW5kLCBcInR5cGVQYXJhbWV0ZXJcIiwgXCJ0eXBlIHBhcmFtZXRlclwiKTtcbl9fcHVibGljRmllbGQoS2luZCwgXCJwcmltaXRpdmVUeXBlXCIsIFwicHJpbWl0aXZlIHR5cGVcIik7XG5fX3B1YmxpY0ZpZWxkKEtpbmQsIFwibGFiZWxcIiwgXCJsYWJlbFwiKTtcbl9fcHVibGljRmllbGQoS2luZCwgXCJhbGlhc1wiLCBcImFsaWFzXCIpO1xuX19wdWJsaWNGaWVsZChLaW5kLCBcImNvbnN0XCIsIFwiY29uc3RcIik7XG5fX3B1YmxpY0ZpZWxkKEtpbmQsIFwibGV0XCIsIFwibGV0XCIpO1xuX19wdWJsaWNGaWVsZChLaW5kLCBcIndhcm5pbmdcIiwgXCJ3YXJuaW5nXCIpO1xudmFyIG91dGxpbmVUeXBlVGFibGUgPSAvKiBAX19QVVJFX18gKi8gT2JqZWN0LmNyZWF0ZShudWxsKTtcbm91dGxpbmVUeXBlVGFibGVbS2luZC5tb2R1bGVdID0gbW9uYWNvX2VkaXRvcl9jb3JlX2V4cG9ydHMubGFuZ3VhZ2VzLlN5bWJvbEtpbmQuTW9kdWxlO1xub3V0bGluZVR5cGVUYWJsZVtLaW5kLmNsYXNzXSA9IG1vbmFjb19lZGl0b3JfY29yZV9leHBvcnRzLmxhbmd1YWdlcy5TeW1ib2xLaW5kLkNsYXNzO1xub3V0bGluZVR5cGVUYWJsZVtLaW5kLmVudW1dID0gbW9uYWNvX2VkaXRvcl9jb3JlX2V4cG9ydHMubGFuZ3VhZ2VzLlN5bWJvbEtpbmQuRW51bTtcbm91dGxpbmVUeXBlVGFibGVbS2luZC5pbnRlcmZhY2VdID0gbW9uYWNvX2VkaXRvcl9jb3JlX2V4cG9ydHMubGFuZ3VhZ2VzLlN5bWJvbEtpbmQuSW50ZXJmYWNlO1xub3V0bGluZVR5cGVUYWJsZVtLaW5kLm1lbWJlckZ1bmN0aW9uXSA9IG1vbmFjb19lZGl0b3JfY29yZV9leHBvcnRzLmxhbmd1YWdlcy5TeW1ib2xLaW5kLk1ldGhvZDtcbm91dGxpbmVUeXBlVGFibGVbS2luZC5tZW1iZXJWYXJpYWJsZV0gPSBtb25hY29fZWRpdG9yX2NvcmVfZXhwb3J0cy5sYW5ndWFnZXMuU3ltYm9sS2luZC5Qcm9wZXJ0eTtcbm91dGxpbmVUeXBlVGFibGVbS2luZC5tZW1iZXJHZXRBY2Nlc3Nvcl0gPSBtb25hY29fZWRpdG9yX2NvcmVfZXhwb3J0cy5sYW5ndWFnZXMuU3ltYm9sS2luZC5Qcm9wZXJ0eTtcbm91dGxpbmVUeXBlVGFibGVbS2luZC5tZW1iZXJTZXRBY2Nlc3Nvcl0gPSBtb25hY29fZWRpdG9yX2NvcmVfZXhwb3J0cy5sYW5ndWFnZXMuU3ltYm9sS2luZC5Qcm9wZXJ0eTtcbm91dGxpbmVUeXBlVGFibGVbS2luZC52YXJpYWJsZV0gPSBtb25hY29fZWRpdG9yX2NvcmVfZXhwb3J0cy5sYW5ndWFnZXMuU3ltYm9sS2luZC5WYXJpYWJsZTtcbm91dGxpbmVUeXBlVGFibGVbS2luZC5jb25zdF0gPSBtb25hY29fZWRpdG9yX2NvcmVfZXhwb3J0cy5sYW5ndWFnZXMuU3ltYm9sS2luZC5WYXJpYWJsZTtcbm91dGxpbmVUeXBlVGFibGVbS2luZC5sb2NhbFZhcmlhYmxlXSA9IG1vbmFjb19lZGl0b3JfY29yZV9leHBvcnRzLmxhbmd1YWdlcy5TeW1ib2xLaW5kLlZhcmlhYmxlO1xub3V0bGluZVR5cGVUYWJsZVtLaW5kLnZhcmlhYmxlXSA9IG1vbmFjb19lZGl0b3JfY29yZV9leHBvcnRzLmxhbmd1YWdlcy5TeW1ib2xLaW5kLlZhcmlhYmxlO1xub3V0bGluZVR5cGVUYWJsZVtLaW5kLmZ1bmN0aW9uXSA9IG1vbmFjb19lZGl0b3JfY29yZV9leHBvcnRzLmxhbmd1YWdlcy5TeW1ib2xLaW5kLkZ1bmN0aW9uO1xub3V0bGluZVR5cGVUYWJsZVtLaW5kLmxvY2FsRnVuY3Rpb25dID0gbW9uYWNvX2VkaXRvcl9jb3JlX2V4cG9ydHMubGFuZ3VhZ2VzLlN5bWJvbEtpbmQuRnVuY3Rpb247XG52YXIgRm9ybWF0SGVscGVyID0gY2xhc3MgZXh0ZW5kcyBBZGFwdGVyIHtcbiAgc3RhdGljIF9jb252ZXJ0T3B0aW9ucyhvcHRpb25zKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIENvbnZlcnRUYWJzVG9TcGFjZXM6IG9wdGlvbnMuaW5zZXJ0U3BhY2VzLFxuICAgICAgVGFiU2l6ZTogb3B0aW9ucy50YWJTaXplLFxuICAgICAgSW5kZW50U2l6ZTogb3B0aW9ucy50YWJTaXplLFxuICAgICAgSW5kZW50U3R5bGU6IDIgLyogU21hcnQgKi8sXG4gICAgICBOZXdMaW5lQ2hhcmFjdGVyOiBcIlxcblwiLFxuICAgICAgSW5zZXJ0U3BhY2VBZnRlckNvbW1hRGVsaW1pdGVyOiB0cnVlLFxuICAgICAgSW5zZXJ0U3BhY2VBZnRlclNlbWljb2xvbkluRm9yU3RhdGVtZW50czogdHJ1ZSxcbiAgICAgIEluc2VydFNwYWNlQmVmb3JlQW5kQWZ0ZXJCaW5hcnlPcGVyYXRvcnM6IHRydWUsXG4gICAgICBJbnNlcnRTcGFjZUFmdGVyS2V5d29yZHNJbkNvbnRyb2xGbG93U3RhdGVtZW50czogdHJ1ZSxcbiAgICAgIEluc2VydFNwYWNlQWZ0ZXJGdW5jdGlvbktleXdvcmRGb3JBbm9ueW1vdXNGdW5jdGlvbnM6IHRydWUsXG4gICAgICBJbnNlcnRTcGFjZUFmdGVyT3BlbmluZ0FuZEJlZm9yZUNsb3NpbmdOb25lbXB0eVBhcmVudGhlc2lzOiBmYWxzZSxcbiAgICAgIEluc2VydFNwYWNlQWZ0ZXJPcGVuaW5nQW5kQmVmb3JlQ2xvc2luZ05vbmVtcHR5QnJhY2tldHM6IGZhbHNlLFxuICAgICAgSW5zZXJ0U3BhY2VBZnRlck9wZW5pbmdBbmRCZWZvcmVDbG9zaW5nVGVtcGxhdGVTdHJpbmdCcmFjZXM6IGZhbHNlLFxuICAgICAgUGxhY2VPcGVuQnJhY2VPbk5ld0xpbmVGb3JDb250cm9sQmxvY2tzOiBmYWxzZSxcbiAgICAgIFBsYWNlT3BlbkJyYWNlT25OZXdMaW5lRm9yRnVuY3Rpb25zOiBmYWxzZVxuICAgIH07XG4gIH1cbiAgX2NvbnZlcnRUZXh0Q2hhbmdlcyhtb2RlbCwgY2hhbmdlKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHRleHQ6IGNoYW5nZS5uZXdUZXh0LFxuICAgICAgcmFuZ2U6IHRoaXMuX3RleHRTcGFuVG9SYW5nZShtb2RlbCwgY2hhbmdlLnNwYW4pXG4gICAgfTtcbiAgfVxufTtcbnZhciBGb3JtYXRBZGFwdGVyID0gY2xhc3MgZXh0ZW5kcyBGb3JtYXRIZWxwZXIge1xuICBjYW5Gb3JtYXRNdWx0aXBsZVJhbmdlcyA9IGZhbHNlO1xuICBhc3luYyBwcm92aWRlRG9jdW1lbnRSYW5nZUZvcm1hdHRpbmdFZGl0cyhtb2RlbCwgcmFuZ2UsIG9wdGlvbnMsIHRva2VuKSB7XG4gICAgY29uc3QgcmVzb3VyY2UgPSBtb2RlbC51cmk7XG4gICAgY29uc3Qgc3RhcnRPZmZzZXQgPSBtb2RlbC5nZXRPZmZzZXRBdCh7XG4gICAgICBsaW5lTnVtYmVyOiByYW5nZS5zdGFydExpbmVOdW1iZXIsXG4gICAgICBjb2x1bW46IHJhbmdlLnN0YXJ0Q29sdW1uXG4gICAgfSk7XG4gICAgY29uc3QgZW5kT2Zmc2V0ID0gbW9kZWwuZ2V0T2Zmc2V0QXQoe1xuICAgICAgbGluZU51bWJlcjogcmFuZ2UuZW5kTGluZU51bWJlcixcbiAgICAgIGNvbHVtbjogcmFuZ2UuZW5kQ29sdW1uXG4gICAgfSk7XG4gICAgY29uc3Qgd29ya2VyID0gYXdhaXQgdGhpcy5fd29ya2VyKHJlc291cmNlKTtcbiAgICBpZiAobW9kZWwuaXNEaXNwb3NlZCgpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IGVkaXRzID0gYXdhaXQgd29ya2VyLmdldEZvcm1hdHRpbmdFZGl0c0ZvclJhbmdlKHJlc291cmNlLnRvU3RyaW5nKCksIHN0YXJ0T2Zmc2V0LCBlbmRPZmZzZXQsIEZvcm1hdEhlbHBlci5fY29udmVydE9wdGlvbnMob3B0aW9ucykpO1xuICAgIGlmICghZWRpdHMgfHwgbW9kZWwuaXNEaXNwb3NlZCgpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHJldHVybiBlZGl0cy5tYXAoKGVkaXQpID0+IHRoaXMuX2NvbnZlcnRUZXh0Q2hhbmdlcyhtb2RlbCwgZWRpdCkpO1xuICB9XG59O1xudmFyIEZvcm1hdE9uVHlwZUFkYXB0ZXIgPSBjbGFzcyBleHRlbmRzIEZvcm1hdEhlbHBlciB7XG4gIGdldCBhdXRvRm9ybWF0VHJpZ2dlckNoYXJhY3RlcnMoKSB7XG4gICAgcmV0dXJuIFtcIjtcIiwgXCJ9XCIsIFwiXFxuXCJdO1xuICB9XG4gIGFzeW5jIHByb3ZpZGVPblR5cGVGb3JtYXR0aW5nRWRpdHMobW9kZWwsIHBvc2l0aW9uLCBjaCwgb3B0aW9ucywgdG9rZW4pIHtcbiAgICBjb25zdCByZXNvdXJjZSA9IG1vZGVsLnVyaTtcbiAgICBjb25zdCBvZmZzZXQgPSBtb2RlbC5nZXRPZmZzZXRBdChwb3NpdGlvbik7XG4gICAgY29uc3Qgd29ya2VyID0gYXdhaXQgdGhpcy5fd29ya2VyKHJlc291cmNlKTtcbiAgICBpZiAobW9kZWwuaXNEaXNwb3NlZCgpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IGVkaXRzID0gYXdhaXQgd29ya2VyLmdldEZvcm1hdHRpbmdFZGl0c0FmdGVyS2V5c3Ryb2tlKHJlc291cmNlLnRvU3RyaW5nKCksIG9mZnNldCwgY2gsIEZvcm1hdEhlbHBlci5fY29udmVydE9wdGlvbnMob3B0aW9ucykpO1xuICAgIGlmICghZWRpdHMgfHwgbW9kZWwuaXNEaXNwb3NlZCgpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHJldHVybiBlZGl0cy5tYXAoKGVkaXQpID0+IHRoaXMuX2NvbnZlcnRUZXh0Q2hhbmdlcyhtb2RlbCwgZWRpdCkpO1xuICB9XG59O1xudmFyIENvZGVBY3Rpb25BZGFwdG9yID0gY2xhc3MgZXh0ZW5kcyBGb3JtYXRIZWxwZXIge1xuICBhc3luYyBwcm92aWRlQ29kZUFjdGlvbnMobW9kZWwsIHJhbmdlLCBjb250ZXh0LCB0b2tlbikge1xuICAgIGNvbnN0IHJlc291cmNlID0gbW9kZWwudXJpO1xuICAgIGNvbnN0IHN0YXJ0ID0gbW9kZWwuZ2V0T2Zmc2V0QXQoe1xuICAgICAgbGluZU51bWJlcjogcmFuZ2Uuc3RhcnRMaW5lTnVtYmVyLFxuICAgICAgY29sdW1uOiByYW5nZS5zdGFydENvbHVtblxuICAgIH0pO1xuICAgIGNvbnN0IGVuZCA9IG1vZGVsLmdldE9mZnNldEF0KHtcbiAgICAgIGxpbmVOdW1iZXI6IHJhbmdlLmVuZExpbmVOdW1iZXIsXG4gICAgICBjb2x1bW46IHJhbmdlLmVuZENvbHVtblxuICAgIH0pO1xuICAgIGNvbnN0IGZvcm1hdE9wdGlvbnMgPSBGb3JtYXRIZWxwZXIuX2NvbnZlcnRPcHRpb25zKG1vZGVsLmdldE9wdGlvbnMoKSk7XG4gICAgY29uc3QgZXJyb3JDb2RlcyA9IGNvbnRleHQubWFya2Vycy5maWx0ZXIoKG0pID0+IG0uY29kZSkubWFwKChtKSA9PiBtLmNvZGUpLm1hcChOdW1iZXIpO1xuICAgIGNvbnN0IHdvcmtlciA9IGF3YWl0IHRoaXMuX3dvcmtlcihyZXNvdXJjZSk7XG4gICAgaWYgKG1vZGVsLmlzRGlzcG9zZWQoKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBjb2RlRml4ZXMgPSBhd2FpdCB3b3JrZXIuZ2V0Q29kZUZpeGVzQXRQb3NpdGlvbihyZXNvdXJjZS50b1N0cmluZygpLCBzdGFydCwgZW5kLCBlcnJvckNvZGVzLCBmb3JtYXRPcHRpb25zKTtcbiAgICBpZiAoIWNvZGVGaXhlcyB8fCBtb2RlbC5pc0Rpc3Bvc2VkKCkpIHtcbiAgICAgIHJldHVybiB7IGFjdGlvbnM6IFtdLCBkaXNwb3NlOiAoKSA9PiB7XG4gICAgICB9IH07XG4gICAgfVxuICAgIGNvbnN0IGFjdGlvbnMgPSBjb2RlRml4ZXMuZmlsdGVyKChmaXgpID0+IHtcbiAgICAgIHJldHVybiBmaXguY2hhbmdlcy5maWx0ZXIoKGNoYW5nZSkgPT4gY2hhbmdlLmlzTmV3RmlsZSkubGVuZ3RoID09PSAwO1xuICAgIH0pLm1hcCgoZml4KSA9PiB7XG4gICAgICByZXR1cm4gdGhpcy5fdHNDb2RlRml4QWN0aW9uVG9Nb25hY29Db2RlQWN0aW9uKG1vZGVsLCBjb250ZXh0LCBmaXgpO1xuICAgIH0pO1xuICAgIHJldHVybiB7XG4gICAgICBhY3Rpb25zLFxuICAgICAgZGlzcG9zZTogKCkgPT4ge1xuICAgICAgfVxuICAgIH07XG4gIH1cbiAgX3RzQ29kZUZpeEFjdGlvblRvTW9uYWNvQ29kZUFjdGlvbihtb2RlbCwgY29udGV4dCwgY29kZUZpeCkge1xuICAgIGNvbnN0IGVkaXRzID0gW107XG4gICAgZm9yIChjb25zdCBjaGFuZ2Ugb2YgY29kZUZpeC5jaGFuZ2VzKSB7XG4gICAgICBmb3IgKGNvbnN0IHRleHRDaGFuZ2Ugb2YgY2hhbmdlLnRleHRDaGFuZ2VzKSB7XG4gICAgICAgIGVkaXRzLnB1c2goe1xuICAgICAgICAgIHJlc291cmNlOiBtb2RlbC51cmksXG4gICAgICAgICAgdmVyc2lvbklkOiB2b2lkIDAsXG4gICAgICAgICAgdGV4dEVkaXQ6IHtcbiAgICAgICAgICAgIHJhbmdlOiB0aGlzLl90ZXh0U3BhblRvUmFuZ2UobW9kZWwsIHRleHRDaGFuZ2Uuc3BhbiksXG4gICAgICAgICAgICB0ZXh0OiB0ZXh0Q2hhbmdlLm5ld1RleHRcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cbiAgICBjb25zdCBhY3Rpb24gPSB7XG4gICAgICB0aXRsZTogY29kZUZpeC5kZXNjcmlwdGlvbixcbiAgICAgIGVkaXQ6IHsgZWRpdHMgfSxcbiAgICAgIGRpYWdub3N0aWNzOiBjb250ZXh0Lm1hcmtlcnMsXG4gICAgICBraW5kOiBcInF1aWNrZml4XCJcbiAgICB9O1xuICAgIHJldHVybiBhY3Rpb247XG4gIH1cbn07XG52YXIgUmVuYW1lQWRhcHRlciA9IGNsYXNzIGV4dGVuZHMgQWRhcHRlciB7XG4gIGNvbnN0cnVjdG9yKF9saWJGaWxlcywgd29ya2VyKSB7XG4gICAgc3VwZXIod29ya2VyKTtcbiAgICB0aGlzLl9saWJGaWxlcyA9IF9saWJGaWxlcztcbiAgfVxuICBhc3luYyBwcm92aWRlUmVuYW1lRWRpdHMobW9kZWwsIHBvc2l0aW9uLCBuZXdOYW1lLCB0b2tlbikge1xuICAgIGNvbnN0IHJlc291cmNlID0gbW9kZWwudXJpO1xuICAgIGNvbnN0IGZpbGVOYW1lID0gcmVzb3VyY2UudG9TdHJpbmcoKTtcbiAgICBjb25zdCBvZmZzZXQgPSBtb2RlbC5nZXRPZmZzZXRBdChwb3NpdGlvbik7XG4gICAgY29uc3Qgd29ya2VyID0gYXdhaXQgdGhpcy5fd29ya2VyKHJlc291cmNlKTtcbiAgICBpZiAobW9kZWwuaXNEaXNwb3NlZCgpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IHJlbmFtZUluZm8gPSBhd2FpdCB3b3JrZXIuZ2V0UmVuYW1lSW5mbyhmaWxlTmFtZSwgb2Zmc2V0LCB7XG4gICAgICBhbGxvd1JlbmFtZU9mSW1wb3J0UGF0aDogZmFsc2VcbiAgICB9KTtcbiAgICBpZiAocmVuYW1lSW5mby5jYW5SZW5hbWUgPT09IGZhbHNlKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBlZGl0czogW10sXG4gICAgICAgIHJlamVjdFJlYXNvbjogcmVuYW1lSW5mby5sb2NhbGl6ZWRFcnJvck1lc3NhZ2VcbiAgICAgIH07XG4gICAgfVxuICAgIGlmIChyZW5hbWVJbmZvLmZpbGVUb1JlbmFtZSAhPT0gdm9pZCAwKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJSZW5hbWluZyBmaWxlcyBpcyBub3Qgc3VwcG9ydGVkLlwiKTtcbiAgICB9XG4gICAgY29uc3QgcmVuYW1lTG9jYXRpb25zID0gYXdhaXQgd29ya2VyLmZpbmRSZW5hbWVMb2NhdGlvbnMoZmlsZU5hbWUsIG9mZnNldCwgZmFsc2UsIGZhbHNlLCBmYWxzZSk7XG4gICAgaWYgKCFyZW5hbWVMb2NhdGlvbnMgfHwgbW9kZWwuaXNEaXNwb3NlZCgpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IGVkaXRzID0gW107XG4gICAgZm9yIChjb25zdCByZW5hbWVMb2NhdGlvbiBvZiByZW5hbWVMb2NhdGlvbnMpIHtcbiAgICAgIGNvbnN0IG1vZGVsMiA9IHRoaXMuX2xpYkZpbGVzLmdldE9yQ3JlYXRlTW9kZWwocmVuYW1lTG9jYXRpb24uZmlsZU5hbWUpO1xuICAgICAgaWYgKG1vZGVsMikge1xuICAgICAgICBlZGl0cy5wdXNoKHtcbiAgICAgICAgICByZXNvdXJjZTogbW9kZWwyLnVyaSxcbiAgICAgICAgICB2ZXJzaW9uSWQ6IHZvaWQgMCxcbiAgICAgICAgICB0ZXh0RWRpdDoge1xuICAgICAgICAgICAgcmFuZ2U6IHRoaXMuX3RleHRTcGFuVG9SYW5nZShtb2RlbDIsIHJlbmFtZUxvY2F0aW9uLnRleHRTcGFuKSxcbiAgICAgICAgICAgIHRleHQ6IG5ld05hbWVcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBVbmtub3duIGZpbGUgJHtyZW5hbWVMb2NhdGlvbi5maWxlTmFtZX0uYCk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB7IGVkaXRzIH07XG4gIH1cbn07XG52YXIgSW5sYXlIaW50c0FkYXB0ZXIgPSBjbGFzcyBleHRlbmRzIEFkYXB0ZXIge1xuICBhc3luYyBwcm92aWRlSW5sYXlIaW50cyhtb2RlbCwgcmFuZ2UsIHRva2VuKSB7XG4gICAgY29uc3QgcmVzb3VyY2UgPSBtb2RlbC51cmk7XG4gICAgY29uc3QgZmlsZU5hbWUgPSByZXNvdXJjZS50b1N0cmluZygpO1xuICAgIGNvbnN0IHN0YXJ0ID0gbW9kZWwuZ2V0T2Zmc2V0QXQoe1xuICAgICAgbGluZU51bWJlcjogcmFuZ2Uuc3RhcnRMaW5lTnVtYmVyLFxuICAgICAgY29sdW1uOiByYW5nZS5zdGFydENvbHVtblxuICAgIH0pO1xuICAgIGNvbnN0IGVuZCA9IG1vZGVsLmdldE9mZnNldEF0KHtcbiAgICAgIGxpbmVOdW1iZXI6IHJhbmdlLmVuZExpbmVOdW1iZXIsXG4gICAgICBjb2x1bW46IHJhbmdlLmVuZENvbHVtblxuICAgIH0pO1xuICAgIGNvbnN0IHdvcmtlciA9IGF3YWl0IHRoaXMuX3dvcmtlcihyZXNvdXJjZSk7XG4gICAgaWYgKG1vZGVsLmlzRGlzcG9zZWQoKSkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIGNvbnN0IHRzSGludHMgPSBhd2FpdCB3b3JrZXIucHJvdmlkZUlubGF5SGludHMoZmlsZU5hbWUsIHN0YXJ0LCBlbmQpO1xuICAgIGNvbnN0IGhpbnRzID0gdHNIaW50cy5tYXAoKGhpbnQpID0+IHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLmhpbnQsXG4gICAgICAgIGxhYmVsOiBoaW50LnRleHQsXG4gICAgICAgIHBvc2l0aW9uOiBtb2RlbC5nZXRQb3NpdGlvbkF0KGhpbnQucG9zaXRpb24pLFxuICAgICAgICBraW5kOiB0aGlzLl9jb252ZXJ0SGludEtpbmQoaGludC5raW5kKVxuICAgICAgfTtcbiAgICB9KTtcbiAgICByZXR1cm4geyBoaW50cywgZGlzcG9zZTogKCkgPT4ge1xuICAgIH0gfTtcbiAgfVxuICBfY29udmVydEhpbnRLaW5kKGtpbmQpIHtcbiAgICBzd2l0Y2ggKGtpbmQpIHtcbiAgICAgIGNhc2UgXCJQYXJhbWV0ZXJcIjpcbiAgICAgICAgcmV0dXJuIG1vbmFjb19lZGl0b3JfY29yZV9leHBvcnRzLmxhbmd1YWdlcy5JbmxheUhpbnRLaW5kLlBhcmFtZXRlcjtcbiAgICAgIGNhc2UgXCJUeXBlXCI6XG4gICAgICAgIHJldHVybiBtb25hY29fZWRpdG9yX2NvcmVfZXhwb3J0cy5sYW5ndWFnZXMuSW5sYXlIaW50S2luZC5UeXBlO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIG1vbmFjb19lZGl0b3JfY29yZV9leHBvcnRzLmxhbmd1YWdlcy5JbmxheUhpbnRLaW5kLlR5cGU7XG4gICAgfVxuICB9XG59O1xuXG4vLyBzcmMvbGFuZ3VhZ2UvdHlwZXNjcmlwdC90c01vZGUudHNcbnZhciBqYXZhU2NyaXB0V29ya2VyO1xudmFyIHR5cGVTY3JpcHRXb3JrZXI7XG5mdW5jdGlvbiBzZXR1cFR5cGVTY3JpcHQoZGVmYXVsdHMpIHtcbiAgdHlwZVNjcmlwdFdvcmtlciA9IHNldHVwTW9kZShkZWZhdWx0cywgXCJ0eXBlc2NyaXB0XCIpO1xufVxuZnVuY3Rpb24gc2V0dXBKYXZhU2NyaXB0KGRlZmF1bHRzKSB7XG4gIGphdmFTY3JpcHRXb3JrZXIgPSBzZXR1cE1vZGUoZGVmYXVsdHMsIFwiamF2YXNjcmlwdFwiKTtcbn1cbmZ1bmN0aW9uIGdldEphdmFTY3JpcHRXb3JrZXIoKSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgaWYgKCFqYXZhU2NyaXB0V29ya2VyKSB7XG4gICAgICByZXR1cm4gcmVqZWN0KFwiSmF2YVNjcmlwdCBub3QgcmVnaXN0ZXJlZCFcIik7XG4gICAgfVxuICAgIHJlc29sdmUoamF2YVNjcmlwdFdvcmtlcik7XG4gIH0pO1xufVxuZnVuY3Rpb24gZ2V0VHlwZVNjcmlwdFdvcmtlcigpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICBpZiAoIXR5cGVTY3JpcHRXb3JrZXIpIHtcbiAgICAgIHJldHVybiByZWplY3QoXCJUeXBlU2NyaXB0IG5vdCByZWdpc3RlcmVkIVwiKTtcbiAgICB9XG4gICAgcmVzb2x2ZSh0eXBlU2NyaXB0V29ya2VyKTtcbiAgfSk7XG59XG5mdW5jdGlvbiBzZXR1cE1vZGUoZGVmYXVsdHMsIG1vZGVJZCkge1xuICBjb25zdCBkaXNwb3NhYmxlcyA9IFtdO1xuICBjb25zdCBwcm92aWRlcnMgPSBbXTtcbiAgY29uc3QgY2xpZW50ID0gbmV3IFdvcmtlck1hbmFnZXIobW9kZUlkLCBkZWZhdWx0cyk7XG4gIGRpc3Bvc2FibGVzLnB1c2goY2xpZW50KTtcbiAgY29uc3Qgd29ya2VyID0gKC4uLnVyaXMpID0+IHtcbiAgICByZXR1cm4gY2xpZW50LmdldExhbmd1YWdlU2VydmljZVdvcmtlciguLi51cmlzKTtcbiAgfTtcbiAgY29uc3QgbGliRmlsZXMgPSBuZXcgTGliRmlsZXMod29ya2VyKTtcbiAgZnVuY3Rpb24gcmVnaXN0ZXJQcm92aWRlcnMoKSB7XG4gICAgY29uc3QgeyBtb2RlQ29uZmlndXJhdGlvbiB9ID0gZGVmYXVsdHM7XG4gICAgZGlzcG9zZUFsbChwcm92aWRlcnMpO1xuICAgIGlmIChtb2RlQ29uZmlndXJhdGlvbi5jb21wbGV0aW9uSXRlbXMpIHtcbiAgICAgIHByb3ZpZGVycy5wdXNoKG1vbmFjb19lZGl0b3JfY29yZV9leHBvcnRzLmxhbmd1YWdlcy5yZWdpc3RlckNvbXBsZXRpb25JdGVtUHJvdmlkZXIobW9kZUlkLCBuZXcgU3VnZ2VzdEFkYXB0ZXIod29ya2VyKSkpO1xuICAgIH1cbiAgICBpZiAobW9kZUNvbmZpZ3VyYXRpb24uc2lnbmF0dXJlSGVscCkge1xuICAgICAgcHJvdmlkZXJzLnB1c2gobW9uYWNvX2VkaXRvcl9jb3JlX2V4cG9ydHMubGFuZ3VhZ2VzLnJlZ2lzdGVyU2lnbmF0dXJlSGVscFByb3ZpZGVyKG1vZGVJZCwgbmV3IFNpZ25hdHVyZUhlbHBBZGFwdGVyKHdvcmtlcikpKTtcbiAgICB9XG4gICAgaWYgKG1vZGVDb25maWd1cmF0aW9uLmhvdmVycykge1xuICAgICAgcHJvdmlkZXJzLnB1c2gobW9uYWNvX2VkaXRvcl9jb3JlX2V4cG9ydHMubGFuZ3VhZ2VzLnJlZ2lzdGVySG92ZXJQcm92aWRlcihtb2RlSWQsIG5ldyBRdWlja0luZm9BZGFwdGVyKHdvcmtlcikpKTtcbiAgICB9XG4gICAgaWYgKG1vZGVDb25maWd1cmF0aW9uLmRvY3VtZW50SGlnaGxpZ2h0cykge1xuICAgICAgcHJvdmlkZXJzLnB1c2gobW9uYWNvX2VkaXRvcl9jb3JlX2V4cG9ydHMubGFuZ3VhZ2VzLnJlZ2lzdGVyRG9jdW1lbnRIaWdobGlnaHRQcm92aWRlcihtb2RlSWQsIG5ldyBEb2N1bWVudEhpZ2hsaWdodEFkYXB0ZXIod29ya2VyKSkpO1xuICAgIH1cbiAgICBpZiAobW9kZUNvbmZpZ3VyYXRpb24uZGVmaW5pdGlvbnMpIHtcbiAgICAgIHByb3ZpZGVycy5wdXNoKG1vbmFjb19lZGl0b3JfY29yZV9leHBvcnRzLmxhbmd1YWdlcy5yZWdpc3RlckRlZmluaXRpb25Qcm92aWRlcihtb2RlSWQsIG5ldyBEZWZpbml0aW9uQWRhcHRlcihsaWJGaWxlcywgd29ya2VyKSkpO1xuICAgIH1cbiAgICBpZiAobW9kZUNvbmZpZ3VyYXRpb24ucmVmZXJlbmNlcykge1xuICAgICAgcHJvdmlkZXJzLnB1c2gobW9uYWNvX2VkaXRvcl9jb3JlX2V4cG9ydHMubGFuZ3VhZ2VzLnJlZ2lzdGVyUmVmZXJlbmNlUHJvdmlkZXIobW9kZUlkLCBuZXcgUmVmZXJlbmNlQWRhcHRlcihsaWJGaWxlcywgd29ya2VyKSkpO1xuICAgIH1cbiAgICBpZiAobW9kZUNvbmZpZ3VyYXRpb24uZG9jdW1lbnRTeW1ib2xzKSB7XG4gICAgICBwcm92aWRlcnMucHVzaChtb25hY29fZWRpdG9yX2NvcmVfZXhwb3J0cy5sYW5ndWFnZXMucmVnaXN0ZXJEb2N1bWVudFN5bWJvbFByb3ZpZGVyKG1vZGVJZCwgbmV3IE91dGxpbmVBZGFwdGVyKHdvcmtlcikpKTtcbiAgICB9XG4gICAgaWYgKG1vZGVDb25maWd1cmF0aW9uLnJlbmFtZSkge1xuICAgICAgcHJvdmlkZXJzLnB1c2gobW9uYWNvX2VkaXRvcl9jb3JlX2V4cG9ydHMubGFuZ3VhZ2VzLnJlZ2lzdGVyUmVuYW1lUHJvdmlkZXIobW9kZUlkLCBuZXcgUmVuYW1lQWRhcHRlcihsaWJGaWxlcywgd29ya2VyKSkpO1xuICAgIH1cbiAgICBpZiAobW9kZUNvbmZpZ3VyYXRpb24uZG9jdW1lbnRSYW5nZUZvcm1hdHRpbmdFZGl0cykge1xuICAgICAgcHJvdmlkZXJzLnB1c2gobW9uYWNvX2VkaXRvcl9jb3JlX2V4cG9ydHMubGFuZ3VhZ2VzLnJlZ2lzdGVyRG9jdW1lbnRSYW5nZUZvcm1hdHRpbmdFZGl0UHJvdmlkZXIobW9kZUlkLCBuZXcgRm9ybWF0QWRhcHRlcih3b3JrZXIpKSk7XG4gICAgfVxuICAgIGlmIChtb2RlQ29uZmlndXJhdGlvbi5vblR5cGVGb3JtYXR0aW5nRWRpdHMpIHtcbiAgICAgIHByb3ZpZGVycy5wdXNoKG1vbmFjb19lZGl0b3JfY29yZV9leHBvcnRzLmxhbmd1YWdlcy5yZWdpc3Rlck9uVHlwZUZvcm1hdHRpbmdFZGl0UHJvdmlkZXIobW9kZUlkLCBuZXcgRm9ybWF0T25UeXBlQWRhcHRlcih3b3JrZXIpKSk7XG4gICAgfVxuICAgIGlmIChtb2RlQ29uZmlndXJhdGlvbi5jb2RlQWN0aW9ucykge1xuICAgICAgcHJvdmlkZXJzLnB1c2gobW9uYWNvX2VkaXRvcl9jb3JlX2V4cG9ydHMubGFuZ3VhZ2VzLnJlZ2lzdGVyQ29kZUFjdGlvblByb3ZpZGVyKG1vZGVJZCwgbmV3IENvZGVBY3Rpb25BZGFwdG9yKHdvcmtlcikpKTtcbiAgICB9XG4gICAgaWYgKG1vZGVDb25maWd1cmF0aW9uLmlubGF5SGludHMpIHtcbiAgICAgIHByb3ZpZGVycy5wdXNoKG1vbmFjb19lZGl0b3JfY29yZV9leHBvcnRzLmxhbmd1YWdlcy5yZWdpc3RlcklubGF5SGludHNQcm92aWRlcihtb2RlSWQsIG5ldyBJbmxheUhpbnRzQWRhcHRlcih3b3JrZXIpKSk7XG4gICAgfVxuICAgIGlmIChtb2RlQ29uZmlndXJhdGlvbi5kaWFnbm9zdGljcykge1xuICAgICAgcHJvdmlkZXJzLnB1c2gobmV3IERpYWdub3N0aWNzQWRhcHRlcihsaWJGaWxlcywgZGVmYXVsdHMsIG1vZGVJZCwgd29ya2VyKSk7XG4gICAgfVxuICB9XG4gIHJlZ2lzdGVyUHJvdmlkZXJzKCk7XG4gIGRpc3Bvc2FibGVzLnB1c2goYXNEaXNwb3NhYmxlKHByb3ZpZGVycykpO1xuICByZXR1cm4gd29ya2VyO1xufVxuZnVuY3Rpb24gYXNEaXNwb3NhYmxlKGRpc3Bvc2FibGVzKSB7XG4gIHJldHVybiB7IGRpc3Bvc2U6ICgpID0+IGRpc3Bvc2VBbGwoZGlzcG9zYWJsZXMpIH07XG59XG5mdW5jdGlvbiBkaXNwb3NlQWxsKGRpc3Bvc2FibGVzKSB7XG4gIHdoaWxlIChkaXNwb3NhYmxlcy5sZW5ndGgpIHtcbiAgICBkaXNwb3NhYmxlcy5wb3AoKS5kaXNwb3NlKCk7XG4gIH1cbn1cbmV4cG9ydCB7XG4gIEFkYXB0ZXIsXG4gIENvZGVBY3Rpb25BZGFwdG9yLFxuICBEZWZpbml0aW9uQWRhcHRlcixcbiAgRGlhZ25vc3RpY3NBZGFwdGVyLFxuICBEb2N1bWVudEhpZ2hsaWdodEFkYXB0ZXIsXG4gIEZvcm1hdEFkYXB0ZXIsXG4gIEZvcm1hdEhlbHBlcixcbiAgRm9ybWF0T25UeXBlQWRhcHRlcixcbiAgSW5sYXlIaW50c0FkYXB0ZXIsXG4gIEtpbmQsXG4gIExpYkZpbGVzLFxuICBPdXRsaW5lQWRhcHRlcixcbiAgUXVpY2tJbmZvQWRhcHRlcixcbiAgUmVmZXJlbmNlQWRhcHRlcixcbiAgUmVuYW1lQWRhcHRlcixcbiAgU2lnbmF0dXJlSGVscEFkYXB0ZXIsXG4gIFN1Z2dlc3RBZGFwdGVyLFxuICBXb3JrZXJNYW5hZ2VyLFxuICBmbGF0dGVuRGlhZ25vc3RpY01lc3NhZ2VUZXh0LFxuICBnZXRKYXZhU2NyaXB0V29ya2VyLFxuICBnZXRUeXBlU2NyaXB0V29ya2VyLFxuICBzZXR1cEphdmFTY3JpcHQsXG4gIHNldHVwVHlwZVNjcmlwdFxufTtcbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBT0EsSUFBSSxZQUFZLE9BQU87QUFDdkIsSUFBSSxtQkFBbUIsT0FBTztBQUM5QixJQUFJLG9CQUFvQixPQUFPO0FBQy9CLElBQUksZUFBZSxPQUFPLFVB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
