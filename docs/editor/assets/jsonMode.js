var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
import { m as monaco_editor_core_star } from "./index.js";
/*!-----------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Version: 0.45.0(5e5af013f8d295555a7210df0d5f2cea0bf5dd56)
 * Released under the MIT license
 * https://github.com/microsoft/monaco-editor/blob/main/LICENSE.txt
 *-----------------------------------------------------------------------------*/
var __defProp2 = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __reExport = (target, mod, secondTarget) => (__copyProps(target, mod, "default"), secondTarget && __copyProps(secondTarget, mod, "default"));
var monaco_editor_core_exports = {};
__reExport(monaco_editor_core_exports, monaco_editor_core_star);
var STOP_WHEN_IDLE_FOR = 2 * 60 * 1e3;
var WorkerManager = class {
  constructor(defaults) {
    __publicField(this, "_defaults");
    __publicField(this, "_idleCheckInterval");
    __publicField(this, "_lastUsedTime");
    __publicField(this, "_configChangeListener");
    __publicField(this, "_worker");
    __publicField(this, "_client");
    this._defaults = defaults;
    this._worker = null;
    this._client = null;
    this._idleCheckInterval = window.setInterval(() => this._checkIfIdle(), 30 * 1e3);
    this._lastUsedTime = 0;
    this._configChangeListener = this._defaults.onDidChange(() => this._stopWorker());
  }
  _stopWorker() {
    if (this._worker) {
      this._worker.dispose();
      this._worker = null;
    }
    this._client = null;
  }
  dispose() {
    clearInterval(this._idleCheckInterval);
    this._configChangeListener.dispose();
    this._stopWorker();
  }
  _checkIfIdle() {
    if (!this._worker) {
      return;
    }
    let timePassedSinceLastUsed = Date.now() - this._lastUsedTime;
    if (timePassedSinceLastUsed > STOP_WHEN_IDLE_FOR) {
      this._stopWorker();
    }
  }
  _getClient() {
    this._lastUsedTime = Date.now();
    if (!this._client) {
      this._worker = monaco_editor_core_exports.editor.createWebWorker({
        moduleId: "vs/language/json/jsonWorker",
        label: this._defaults.languageId,
        createData: {
          languageSettings: this._defaults.diagnosticsOptions,
          languageId: this._defaults.languageId,
          enableSchemaRequest: this._defaults.diagnosticsOptions.enableSchemaRequest
        }
      });
      this._client = this._worker.getProxy();
    }
    return this._client;
  }
  getLanguageServiceWorker(...resources) {
    let _client;
    return this._getClient().then((client) => {
      _client = client;
    }).then((_) => {
      if (this._worker) {
        return this._worker.withSyncedResources(resources);
      }
    }).then((_) => _client);
  }
};
var integer;
(function(integer2) {
  integer2.MIN_VALUE = -2147483648;
  integer2.MAX_VALUE = 2147483647;
})(integer || (integer = {}));
var uinteger;
(function(uinteger2) {
  uinteger2.MIN_VALUE = 0;
  uinteger2.MAX_VALUE = 2147483647;
})(uinteger || (uinteger = {}));
var Position;
(function(Position3) {
  function create(line, character) {
    if (line === Number.MAX_VALUE) {
      line = uinteger.MAX_VALUE;
    }
    if (character === Number.MAX_VALUE) {
      character = uinteger.MAX_VALUE;
    }
    return { line, character };
  }
  Position3.create = create;
  function is(value) {
    var candidate = value;
    return Is.objectLiteral(candidate) && Is.uinteger(candidate.line) && Is.uinteger(candidate.character);
  }
  Position3.is = is;
})(Position || (Position = {}));
var Range;
(function(Range3) {
  function create(one, two, three, four) {
    if (Is.uinteger(one) && Is.uinteger(two) && Is.uinteger(three) && Is.uinteger(four)) {
      return { start: Position.create(one, two), end: Position.create(three, four) };
    } else if (Position.is(one) && Position.is(two)) {
      return { start: one, end: two };
    } else {
      throw new Error("Range#create called with invalid arguments[" + one + ", " + two + ", " + three + ", " + four + "]");
    }
  }
  Range3.create = create;
  function is(value) {
    var candidate = value;
    return Is.objectLiteral(candidate) && Position.is(candidate.start) && Position.is(candidate.end);
  }
  Range3.is = is;
})(Range || (Range = {}));
var Location;
(function(Location2) {
  function create(uri, range) {
    return { uri, range };
  }
  Location2.create = create;
  function is(value) {
    var candidate = value;
    return Is.defined(candidate) && Range.is(candidate.range) && (Is.string(candidate.uri) || Is.undefined(candidate.uri));
  }
  Location2.is = is;
})(Location || (Location = {}));
var LocationLink;
(function(LocationLink2) {
  function create(targetUri, targetRange, targetSelectionRange, originSelectionRange) {
    return { targetUri, targetRange, targetSelectionRange, originSelectionRange };
  }
  LocationLink2.create = create;
  function is(value) {
    var candidate = value;
    return Is.defined(candidate) && Range.is(candidate.targetRange) && Is.string(candidate.targetUri) && (Range.is(candidate.targetSelectionRange) || Is.undefined(candidate.targetSelectionRange)) && (Range.is(candidate.originSelectionRange) || Is.undefined(candidate.originSelectionRange));
  }
  LocationLink2.is = is;
})(LocationLink || (LocationLink = {}));
var Color;
(function(Color2) {
  function create(red, green, blue, alpha) {
    return {
      red,
      green,
      blue,
      alpha
    };
  }
  Color2.create = create;
  function is(value) {
    var candidate = value;
    return Is.numberRange(candidate.red, 0, 1) && Is.numberRange(candidate.green, 0, 1) && Is.numberRange(candidate.blue, 0, 1) && Is.numberRange(candidate.alpha, 0, 1);
  }
  Color2.is = is;
})(Color || (Color = {}));
var ColorInformation;
(function(ColorInformation2) {
  function create(range, color) {
    return {
      range,
      color
    };
  }
  ColorInformation2.create = create;
  function is(value) {
    var candidate = value;
    return Range.is(candidate.range) && Color.is(candidate.color);
  }
  ColorInformation2.is = is;
})(ColorInformation || (ColorInformation = {}));
var ColorPresentation;
(function(ColorPresentation2) {
  function create(label, textEdit, additionalTextEdits) {
    return {
      label,
      textEdit,
      additionalTextEdits
    };
  }
  ColorPresentation2.create = create;
  function is(value) {
    var candidate = value;
    return Is.string(candidate.label) && (Is.undefined(candidate.textEdit) || TextEdit.is(candidate)) && (Is.undefined(candidate.additionalTextEdits) || Is.typedArray(candidate.additionalTextEdits, TextEdit.is));
  }
  ColorPresentation2.is = is;
})(ColorPresentation || (ColorPresentation = {}));
var FoldingRangeKind;
(function(FoldingRangeKind2) {
  FoldingRangeKind2["Comment"] = "comment";
  FoldingRangeKind2["Imports"] = "imports";
  FoldingRangeKind2["Region"] = "region";
})(FoldingRangeKind || (FoldingRangeKind = {}));
var FoldingRange;
(function(FoldingRange2) {
  function create(startLine, endLine, startCharacter, endCharacter, kind) {
    var result = {
      startLine,
      endLine
    };
    if (Is.defined(startCharacter)) {
      result.startCharacter = startCharacter;
    }
    if (Is.defined(endCharacter)) {
      result.endCharacter = endCharacter;
    }
    if (Is.defined(kind)) {
      result.kind = kind;
    }
    return result;
  }
  FoldingRange2.create = create;
  function is(value) {
    var candidate = value;
    return Is.uinteger(candidate.startLine) && Is.uinteger(candidate.startLine) && (Is.undefined(candidate.startCharacter) || Is.uinteger(candidate.startCharacter)) && (Is.undefined(candidate.endCharacter) || Is.uinteger(candidate.endCharacter)) && (Is.undefined(candidate.kind) || Is.string(candidate.kind));
  }
  FoldingRange2.is = is;
})(FoldingRange || (FoldingRange = {}));
var DiagnosticRelatedInformation;
(function(DiagnosticRelatedInformation2) {
  function create(location, message) {
    return {
      location,
      message
    };
  }
  DiagnosticRelatedInformation2.create = create;
  function is(value) {
    var candidate = value;
    return Is.defined(candidate) && Location.is(candidate.location) && Is.string(candidate.message);
  }
  DiagnosticRelatedInformation2.is = is;
})(DiagnosticRelatedInformation || (DiagnosticRelatedInformation = {}));
var DiagnosticSeverity;
(function(DiagnosticSeverity2) {
  DiagnosticSeverity2.Error = 1;
  DiagnosticSeverity2.Warning = 2;
  DiagnosticSeverity2.Information = 3;
  DiagnosticSeverity2.Hint = 4;
})(DiagnosticSeverity || (DiagnosticSeverity = {}));
var DiagnosticTag;
(function(DiagnosticTag2) {
  DiagnosticTag2.Unnecessary = 1;
  DiagnosticTag2.Deprecated = 2;
})(DiagnosticTag || (DiagnosticTag = {}));
var CodeDescription;
(function(CodeDescription2) {
  function is(value) {
    var candidate = value;
    return candidate !== void 0 && candidate !== null && Is.string(candidate.href);
  }
  CodeDescription2.is = is;
})(CodeDescription || (CodeDescription = {}));
var Diagnostic;
(function(Diagnostic2) {
  function create(range, message, severity, code, source, relatedInformation) {
    var result = { range, message };
    if (Is.defined(severity)) {
      result.severity = severity;
    }
    if (Is.defined(code)) {
      result.code = code;
    }
    if (Is.defined(source)) {
      result.source = source;
    }
    if (Is.defined(relatedInformation)) {
      result.relatedInformation = relatedInformation;
    }
    return result;
  }
  Diagnostic2.create = create;
  function is(value) {
    var _a;
    var candidate = value;
    return Is.defined(candidate) && Range.is(candidate.range) && Is.string(candidate.message) && (Is.number(candidate.severity) || Is.undefined(candidate.severity)) && (Is.integer(candidate.code) || Is.string(candidate.code) || Is.undefined(candidate.code)) && (Is.undefined(candidate.codeDescription) || Is.string((_a = candidate.codeDescription) === null || _a === void 0 ? void 0 : _a.href)) && (Is.string(candidate.source) || Is.undefined(candidate.source)) && (Is.undefined(candidate.relatedInformation) || Is.typedArray(candidate.relatedInformation, DiagnosticRelatedInformation.is));
  }
  Diagnostic2.is = is;
})(Diagnostic || (Diagnostic = {}));
var Command;
(function(Command2) {
  function create(title, command) {
    var args = [];
    for (var _i = 2; _i < arguments.length; _i++) {
      args[_i - 2] = arguments[_i];
    }
    var result = { title, command };
    if (Is.defined(args) && args.length > 0) {
      result.arguments = args;
    }
    return result;
  }
  Command2.create = create;
  function is(value) {
    var candidate = value;
    return Is.defined(candidate) && Is.string(candidate.title) && Is.string(candidate.command);
  }
  Command2.is = is;
})(Command || (Command = {}));
var TextEdit;
(function(TextEdit2) {
  function replace(range, newText) {
    return { range, newText };
  }
  TextEdit2.replace = replace;
  function insert(position, newText) {
    return { range: { start: position, end: position }, newText };
  }
  TextEdit2.insert = insert;
  function del(range) {
    return { range, newText: "" };
  }
  TextEdit2.del = del;
  function is(value) {
    var candidate = value;
    return Is.objectLiteral(candidate) && Is.string(candidate.newText) && Range.is(candidate.range);
  }
  TextEdit2.is = is;
})(TextEdit || (TextEdit = {}));
var ChangeAnnotation;
(function(ChangeAnnotation2) {
  function create(label, needsConfirmation, description) {
    var result = { label };
    if (needsConfirmation !== void 0) {
      result.needsConfirmation = needsConfirmation;
    }
    if (description !== void 0) {
      result.description = description;
    }
    return result;
  }
  ChangeAnnotation2.create = create;
  function is(value) {
    var candidate = value;
    return candidate !== void 0 && Is.objectLiteral(candidate) && Is.string(candidate.label) && (Is.boolean(candidate.needsConfirmation) || candidate.needsConfirmation === void 0) && (Is.string(candidate.description) || candidate.description === void 0);
  }
  ChangeAnnotation2.is = is;
})(ChangeAnnotation || (ChangeAnnotation = {}));
var ChangeAnnotationIdentifier;
(function(ChangeAnnotationIdentifier2) {
  function is(value) {
    var candidate = value;
    return typeof candidate === "string";
  }
  ChangeAnnotationIdentifier2.is = is;
})(ChangeAnnotationIdentifier || (ChangeAnnotationIdentifier = {}));
var AnnotatedTextEdit;
(function(AnnotatedTextEdit2) {
  function replace(range, newText, annotation) {
    return { range, newText, annotationId: annotation };
  }
  AnnotatedTextEdit2.replace = replace;
  function insert(position, newText, annotation) {
    return { range: { start: position, end: position }, newText, annotationId: annotation };
  }
  AnnotatedTextEdit2.insert = insert;
  function del(range, annotation) {
    return { range, newText: "", annotationId: annotation };
  }
  AnnotatedTextEdit2.del = del;
  function is(value) {
    var candidate = value;
    return TextEdit.is(candidate) && (ChangeAnnotation.is(candidate.annotationId) || ChangeAnnotationIdentifier.is(candidate.annotationId));
  }
  AnnotatedTextEdit2.is = is;
})(AnnotatedTextEdit || (AnnotatedTextEdit = {}));
var TextDocumentEdit;
(function(TextDocumentEdit2) {
  function create(textDocument, edits) {
    return { textDocument, edits };
  }
  TextDocumentEdit2.create = create;
  function is(value) {
    var candidate = value;
    return Is.defined(candidate) && OptionalVersionedTextDocumentIdentifier.is(candidate.textDocument) && Array.isArray(candidate.edits);
  }
  TextDocumentEdit2.is = is;
})(TextDocumentEdit || (TextDocumentEdit = {}));
var CreateFile;
(function(CreateFile2) {
  function create(uri, options, annotation) {
    var result = {
      kind: "create",
      uri
    };
    if (options !== void 0 && (options.overwrite !== void 0 || options.ignoreIfExists !== void 0)) {
      result.options = options;
    }
    if (annotation !== void 0) {
      result.annotationId = annotation;
    }
    return result;
  }
  CreateFile2.create = create;
  function is(value) {
    var candidate = value;
    return candidate && candidate.kind === "create" && Is.string(candidate.uri) && (candidate.options === void 0 || (candidate.options.overwrite === void 0 || Is.boolean(candidate.options.overwrite)) && (candidate.options.ignoreIfExists === void 0 || Is.boolean(candidate.options.ignoreIfExists))) && (candidate.annotationId === void 0 || ChangeAnnotationIdentifier.is(candidate.annotationId));
  }
  CreateFile2.is = is;
})(CreateFile || (CreateFile = {}));
var RenameFile;
(function(RenameFile2) {
  function create(oldUri, newUri, options, annotation) {
    var result = {
      kind: "rename",
      oldUri,
      newUri
    };
    if (options !== void 0 && (options.overwrite !== void 0 || options.ignoreIfExists !== void 0)) {
      result.options = options;
    }
    if (annotation !== void 0) {
      result.annotationId = annotation;
    }
    return result;
  }
  RenameFile2.create = create;
  function is(value) {
    var candidate = value;
    return candidate && candidate.kind === "rename" && Is.string(candidate.oldUri) && Is.string(candidate.newUri) && (candidate.options === void 0 || (candidate.options.overwrite === void 0 || Is.boolean(candidate.options.overwrite)) && (candidate.options.ignoreIfExists === void 0 || Is.boolean(candidate.options.ignoreIfExists))) && (candidate.annotationId === void 0 || ChangeAnnotationIdentifier.is(candidate.annotationId));
  }
  RenameFile2.is = is;
})(RenameFile || (RenameFile = {}));
var DeleteFile;
(function(DeleteFile2) {
  function create(uri, options, annotation) {
    var result = {
      kind: "delete",
      uri
    };
    if (options !== void 0 && (options.recursive !== void 0 || options.ignoreIfNotExists !== void 0)) {
      result.options = options;
    }
    if (annotation !== void 0) {
      result.annotationId = annotation;
    }
    return result;
  }
  DeleteFile2.create = create;
  function is(value) {
    var candidate = value;
    return candidate && candidate.kind === "delete" && Is.string(candidate.uri) && (candidate.options === void 0 || (candidate.options.recursive === void 0 || Is.boolean(candidate.options.recursive)) && (candidate.options.ignoreIfNotExists === void 0 || Is.boolean(candidate.options.ignoreIfNotExists))) && (candidate.annotationId === void 0 || ChangeAnnotationIdentifier.is(candidate.annotationId));
  }
  DeleteFile2.is = is;
})(DeleteFile || (DeleteFile = {}));
var WorkspaceEdit;
(function(WorkspaceEdit2) {
  function is(value) {
    var candidate = value;
    return candidate && (candidate.changes !== void 0 || candidate.documentChanges !== void 0) && (candidate.documentChanges === void 0 || candidate.documentChanges.every(function(change) {
      if (Is.string(change.kind)) {
        return CreateFile.is(change) || RenameFile.is(change) || DeleteFile.is(change);
      } else {
        return TextDocumentEdit.is(change);
      }
    }));
  }
  WorkspaceEdit2.is = is;
})(WorkspaceEdit || (WorkspaceEdit = {}));
var TextEditChangeImpl = function() {
  function TextEditChangeImpl2(edits, changeAnnotations) {
    this.edits = edits;
    this.changeAnnotations = changeAnnotations;
  }
  TextEditChangeImpl2.prototype.insert = function(position, newText, annotation) {
    var edit;
    var id;
    if (annotation === void 0) {
      edit = TextEdit.insert(position, newText);
    } else if (ChangeAnnotationIdentifier.is(annotation)) {
      id = annotation;
      edit = AnnotatedTextEdit.insert(position, newText, annotation);
    } else {
      this.assertChangeAnnotations(this.changeAnnotations);
      id = this.changeAnnotations.manage(annotation);
      edit = AnnotatedTextEdit.insert(position, newText, id);
    }
    this.edits.push(edit);
    if (id !== void 0) {
      return id;
    }
  };
  TextEditChangeImpl2.prototype.replace = function(range, newText, annotation) {
    var edit;
    var id;
    if (annotation === void 0) {
      edit = TextEdit.replace(range, newText);
    } else if (ChangeAnnotationIdentifier.is(annotation)) {
      id = annotation;
      edit = AnnotatedTextEdit.replace(range, newText, annotation);
    } else {
      this.assertChangeAnnotations(this.changeAnnotations);
      id = this.changeAnnotations.manage(annotation);
      edit = AnnotatedTextEdit.replace(range, newText, id);
    }
    this.edits.push(edit);
    if (id !== void 0) {
      return id;
    }
  };
  TextEditChangeImpl2.prototype.delete = function(range, annotation) {
    var edit;
    var id;
    if (annotation === void 0) {
      edit = TextEdit.del(range);
    } else if (ChangeAnnotationIdentifier.is(annotation)) {
      id = annotation;
      edit = AnnotatedTextEdit.del(range, annotation);
    } else {
      this.assertChangeAnnotations(this.changeAnnotations);
      id = this.changeAnnotations.manage(annotation);
      edit = AnnotatedTextEdit.del(range, id);
    }
    this.edits.push(edit);
    if (id !== void 0) {
      return id;
    }
  };
  TextEditChangeImpl2.prototype.add = function(edit) {
    this.edits.push(edit);
  };
  TextEditChangeImpl2.prototype.all = function() {
    return this.edits;
  };
  TextEditChangeImpl2.prototype.clear = function() {
    this.edits.splice(0, this.edits.length);
  };
  TextEditChangeImpl2.prototype.assertChangeAnnotations = function(value) {
    if (value === void 0) {
      throw new Error("Text edit change is not configured to manage change annotations.");
    }
  };
  return TextEditChangeImpl2;
}();
var ChangeAnnotations = function() {
  function ChangeAnnotations2(annotations) {
    this._annotations = annotations === void 0 ? /* @__PURE__ */ Object.create(null) : annotations;
    this._counter = 0;
    this._size = 0;
  }
  ChangeAnnotations2.prototype.all = function() {
    return this._annotations;
  };
  Object.defineProperty(ChangeAnnotations2.prototype, "size", {
    get: function() {
      return this._size;
    },
    enumerable: false,
    configurable: true
  });
  ChangeAnnotations2.prototype.manage = function(idOrAnnotation, annotation) {
    var id;
    if (ChangeAnnotationIdentifier.is(idOrAnnotation)) {
      id = idOrAnnotation;
    } else {
      id = this.nextId();
      annotation = idOrAnnotation;
    }
    if (this._annotations[id] !== void 0) {
      throw new Error("Id " + id + " is already in use.");
    }
    if (annotation === void 0) {
      throw new Error("No annotation provided for id " + id);
    }
    this._annotations[id] = annotation;
    this._size++;
    return id;
  };
  ChangeAnnotations2.prototype.nextId = function() {
    this._counter++;
    return this._counter.toString();
  };
  return ChangeAnnotations2;
}();
(function() {
  function WorkspaceChange2(workspaceEdit) {
    var _this = this;
    this._textEditChanges = /* @__PURE__ */ Object.create(null);
    if (workspaceEdit !== void 0) {
      this._workspaceEdit = workspaceEdit;
      if (workspaceEdit.documentChanges) {
        this._changeAnnotations = new ChangeAnnotations(workspaceEdit.changeAnnotations);
        workspaceEdit.changeAnnotations = this._changeAnnotations.all();
        workspaceEdit.documentChanges.forEach(function(change) {
          if (TextDocumentEdit.is(change)) {
            var textEditChange = new TextEditChangeImpl(change.edits, _this._changeAnnotations);
            _this._textEditChanges[change.textDocument.uri] = textEditChange;
          }
        });
      } else if (workspaceEdit.changes) {
        Object.keys(workspaceEdit.changes).forEach(function(key) {
          var textEditChange = new TextEditChangeImpl(workspaceEdit.changes[key]);
          _this._textEditChanges[key] = textEditChange;
        });
      }
    } else {
      this._workspaceEdit = {};
    }
  }
  Object.defineProperty(WorkspaceChange2.prototype, "edit", {
    get: function() {
      this.initDocumentChanges();
      if (this._changeAnnotations !== void 0) {
        if (this._changeAnnotations.size === 0) {
          this._workspaceEdit.changeAnnotations = void 0;
        } else {
          this._workspaceEdit.changeAnnotations = this._changeAnnotations.all();
        }
      }
      return this._workspaceEdit;
    },
    enumerable: false,
    configurable: true
  });
  WorkspaceChange2.prototype.getTextEditChange = function(key) {
    if (OptionalVersionedTextDocumentIdentifier.is(key)) {
      this.initDocumentChanges();
      if (this._workspaceEdit.documentChanges === void 0) {
        throw new Error("Workspace edit is not configured for document changes.");
      }
      var textDocument = { uri: key.uri, version: key.version };
      var result = this._textEditChanges[textDocument.uri];
      if (!result) {
        var edits = [];
        var textDocumentEdit = {
          textDocument,
          edits
        };
        this._workspaceEdit.documentChanges.push(textDocumentEdit);
        result = new TextEditChangeImpl(edits, this._changeAnnotations);
        this._textEditChanges[textDocument.uri] = result;
      }
      return result;
    } else {
      this.initChanges();
      if (this._workspaceEdit.changes === void 0) {
        throw new Error("Workspace edit is not configured for normal text edit changes.");
      }
      var result = this._textEditChanges[key];
      if (!result) {
        var edits = [];
        this._workspaceEdit.changes[key] = edits;
        result = new TextEditChangeImpl(edits);
        this._textEditChanges[key] = result;
      }
      return result;
    }
  };
  WorkspaceChange2.prototype.initDocumentChanges = function() {
    if (this._workspaceEdit.documentChanges === void 0 && this._workspaceEdit.changes === void 0) {
      this._changeAnnotations = new ChangeAnnotations();
      this._workspaceEdit.documentChanges = [];
      this._workspaceEdit.changeAnnotations = this._changeAnnotations.all();
    }
  };
  WorkspaceChange2.prototype.initChanges = function() {
    if (this._workspaceEdit.documentChanges === void 0 && this._workspaceEdit.changes === void 0) {
      this._workspaceEdit.changes = /* @__PURE__ */ Object.create(null);
    }
  };
  WorkspaceChange2.prototype.createFile = function(uri, optionsOrAnnotation, options) {
    this.initDocumentChanges();
    if (this._workspaceEdit.documentChanges === void 0) {
      throw new Error("Workspace edit is not configured for document changes.");
    }
    var annotation;
    if (ChangeAnnotation.is(optionsOrAnnotation) || ChangeAnnotationIdentifier.is(optionsOrAnnotation)) {
      annotation = optionsOrAnnotation;
    } else {
      options = optionsOrAnnotation;
    }
    var operation;
    var id;
    if (annotation === void 0) {
      operation = CreateFile.create(uri, options);
    } else {
      id = ChangeAnnotationIdentifier.is(annotation) ? annotation : this._changeAnnotations.manage(annotation);
      operation = CreateFile.create(uri, options, id);
    }
    this._workspaceEdit.documentChanges.push(operation);
    if (id !== void 0) {
      return id;
    }
  };
  WorkspaceChange2.prototype.renameFile = function(oldUri, newUri, optionsOrAnnotation, options) {
    this.initDocumentChanges();
    if (this._workspaceEdit.documentChanges === void 0) {
      throw new Error("Workspace edit is not configured for document changes.");
    }
    var annotation;
    if (ChangeAnnotation.is(optionsOrAnnotation) || ChangeAnnotationIdentifier.is(optionsOrAnnotation)) {
      annotation = optionsOrAnnotation;
    } else {
      options = optionsOrAnnotation;
    }
    var operation;
    var id;
    if (annotation === void 0) {
      operation = RenameFile.create(oldUri, newUri, options);
    } else {
      id = ChangeAnnotationIdentifier.is(annotation) ? annotation : this._changeAnnotations.manage(annotation);
      operation = RenameFile.create(oldUri, newUri, options, id);
    }
    this._workspaceEdit.documentChanges.push(operation);
    if (id !== void 0) {
      return id;
    }
  };
  WorkspaceChange2.prototype.deleteFile = function(uri, optionsOrAnnotation, options) {
    this.initDocumentChanges();
    if (this._workspaceEdit.documentChanges === void 0) {
      throw new Error("Workspace edit is not configured for document changes.");
    }
    var annotation;
    if (ChangeAnnotation.is(optionsOrAnnotation) || ChangeAnnotationIdentifier.is(optionsOrAnnotation)) {
      annotation = optionsOrAnnotation;
    } else {
      options = optionsOrAnnotation;
    }
    var operation;
    var id;
    if (annotation === void 0) {
      operation = DeleteFile.create(uri, options);
    } else {
      id = ChangeAnnotationIdentifier.is(annotation) ? annotation : this._changeAnnotations.manage(annotation);
      operation = DeleteFile.create(uri, options, id);
    }
    this._workspaceEdit.documentChanges.push(operation);
    if (id !== void 0) {
      return id;
    }
  };
  return WorkspaceChange2;
})();
var TextDocumentIdentifier;
(function(TextDocumentIdentifier2) {
  function create(uri) {
    return { uri };
  }
  TextDocumentIdentifier2.create = create;
  function is(value) {
    var candidate = value;
    return Is.defined(candidate) && Is.string(candidate.uri);
  }
  TextDocumentIdentifier2.is = is;
})(TextDocumentIdentifier || (TextDocumentIdentifier = {}));
var VersionedTextDocumentIdentifier;
(function(VersionedTextDocumentIdentifier2) {
  function create(uri, version) {
    return { uri, version };
  }
  VersionedTextDocumentIdentifier2.create = create;
  function is(value) {
    var candidate = value;
    return Is.defined(candidate) && Is.string(candidate.uri) && Is.integer(candidate.version);
  }
  VersionedTextDocumentIdentifier2.is = is;
})(VersionedTextDocumentIdentifier || (VersionedTextDocumentIdentifier = {}));
var OptionalVersionedTextDocumentIdentifier;
(function(OptionalVersionedTextDocumentIdentifier2) {
  function create(uri, version) {
    return { uri, version };
  }
  OptionalVersionedTextDocumentIdentifier2.create = create;
  function is(value) {
    var candidate = value;
    return Is.defined(candidate) && Is.string(candidate.uri) && (candidate.version === null || Is.integer(candidate.version));
  }
  OptionalVersionedTextDocumentIdentifier2.is = is;
})(OptionalVersionedTextDocumentIdentifier || (OptionalVersionedTextDocumentIdentifier = {}));
var TextDocumentItem;
(function(TextDocumentItem2) {
  function create(uri, languageId, version, text) {
    return { uri, languageId, version, text };
  }
  TextDocumentItem2.create = create;
  function is(value) {
    var candidate = value;
    return Is.defined(candidate) && Is.string(candidate.uri) && Is.string(candidate.languageId) && Is.integer(candidate.version) && Is.string(candidate.text);
  }
  TextDocumentItem2.is = is;
})(TextDocumentItem || (TextDocumentItem = {}));
var MarkupKind;
(function(MarkupKind2) {
  MarkupKind2.PlainText = "plaintext";
  MarkupKind2.Markdown = "markdown";
})(MarkupKind || (MarkupKind = {}));
(function(MarkupKind2) {
  function is(value) {
    var candidate = value;
    return candidate === MarkupKind2.PlainText || candidate === MarkupKind2.Markdown;
  }
  MarkupKind2.is = is;
})(MarkupKind || (MarkupKind = {}));
var MarkupContent;
(function(MarkupContent2) {
  function is(value) {
    var candidate = value;
    return Is.objectLiteral(value) && MarkupKind.is(candidate.kind) && Is.string(candidate.value);
  }
  MarkupContent2.is = is;
})(MarkupContent || (MarkupContent = {}));
var CompletionItemKind;
(function(CompletionItemKind2) {
  CompletionItemKind2.Text = 1;
  CompletionItemKind2.Method = 2;
  CompletionItemKind2.Function = 3;
  CompletionItemKind2.Constructor = 4;
  CompletionItemKind2.Field = 5;
  CompletionItemKind2.Variable = 6;
  CompletionItemKind2.Class = 7;
  CompletionItemKind2.Interface = 8;
  CompletionItemKind2.Module = 9;
  CompletionItemKind2.Property = 10;
  CompletionItemKind2.Unit = 11;
  CompletionItemKind2.Value = 12;
  CompletionItemKind2.Enum = 13;
  CompletionItemKind2.Keyword = 14;
  CompletionItemKind2.Snippet = 15;
  CompletionItemKind2.Color = 16;
  CompletionItemKind2.File = 17;
  CompletionItemKind2.Reference = 18;
  CompletionItemKind2.Folder = 19;
  CompletionItemKind2.EnumMember = 20;
  CompletionItemKind2.Constant = 21;
  CompletionItemKind2.Struct = 22;
  CompletionItemKind2.Event = 23;
  CompletionItemKind2.Operator = 24;
  CompletionItemKind2.TypeParameter = 25;
})(CompletionItemKind || (CompletionItemKind = {}));
var InsertTextFormat;
(function(InsertTextFormat2) {
  InsertTextFormat2.PlainText = 1;
  InsertTextFormat2.Snippet = 2;
})(InsertTextFormat || (InsertTextFormat = {}));
var CompletionItemTag;
(function(CompletionItemTag2) {
  CompletionItemTag2.Deprecated = 1;
})(CompletionItemTag || (CompletionItemTag = {}));
var InsertReplaceEdit;
(function(InsertReplaceEdit2) {
  function create(newText, insert, replace) {
    return { newText, insert, replace };
  }
  InsertReplaceEdit2.create = create;
  function is(value) {
    var candidate = value;
    return candidate && Is.string(candidate.newText) && Range.is(candidate.insert) && Range.is(candidate.replace);
  }
  InsertReplaceEdit2.is = is;
})(InsertReplaceEdit || (InsertReplaceEdit = {}));
var InsertTextMode;
(function(InsertTextMode2) {
  InsertTextMode2.asIs = 1;
  InsertTextMode2.adjustIndentation = 2;
})(InsertTextMode || (InsertTextMode = {}));
var CompletionItem;
(function(CompletionItem2) {
  function create(label) {
    return { label };
  }
  CompletionItem2.create = create;
})(CompletionItem || (CompletionItem = {}));
var CompletionList;
(function(CompletionList2) {
  function create(items, isIncomplete) {
    return { items: items ? items : [], isIncomplete: !!isIncomplete };
  }
  CompletionList2.create = create;
})(CompletionList || (CompletionList = {}));
var MarkedString;
(function(MarkedString2) {
  function fromPlainText(plainText) {
    return plainText.replace(/[\\`*_{}[\]()#+\-.!]/g, "\\$&");
  }
  MarkedString2.fromPlainText = fromPlainText;
  function is(value) {
    var candidate = value;
    return Is.string(candidate) || Is.objectLiteral(candidate) && Is.string(candidate.language) && Is.string(candidate.value);
  }
  MarkedString2.is = is;
})(MarkedString || (MarkedString = {}));
var Hover;
(function(Hover2) {
  function is(value) {
    var candidate = value;
    return !!candidate && Is.objectLiteral(candidate) && (MarkupContent.is(candidate.contents) || MarkedString.is(candidate.contents) || Is.typedArray(candidate.contents, MarkedString.is)) && (value.range === void 0 || Range.is(value.range));
  }
  Hover2.is = is;
})(Hover || (Hover = {}));
var ParameterInformation;
(function(ParameterInformation2) {
  function create(label, documentation) {
    return documentation ? { label, documentation } : { label };
  }
  ParameterInformation2.create = create;
})(ParameterInformation || (ParameterInformation = {}));
var SignatureInformation;
(function(SignatureInformation2) {
  function create(label, documentation) {
    var parameters = [];
    for (var _i = 2; _i < arguments.length; _i++) {
      parameters[_i - 2] = arguments[_i];
    }
    var result = { label };
    if (Is.defined(documentation)) {
      result.documentation = documentation;
    }
    if (Is.defined(parameters)) {
      result.parameters = parameters;
    } else {
      result.parameters = [];
    }
    return result;
  }
  SignatureInformation2.create = create;
})(SignatureInformation || (SignatureInformation = {}));
var DocumentHighlightKind;
(function(DocumentHighlightKind2) {
  DocumentHighlightKind2.Text = 1;
  DocumentHighlightKind2.Read = 2;
  DocumentHighlightKind2.Write = 3;
})(DocumentHighlightKind || (DocumentHighlightKind = {}));
var DocumentHighlight;
(function(DocumentHighlight2) {
  function create(range, kind) {
    var result = { range };
    if (Is.number(kind)) {
      result.kind = kind;
    }
    return result;
  }
  DocumentHighlight2.create = create;
})(DocumentHighlight || (DocumentHighlight = {}));
var SymbolKind;
(function(SymbolKind2) {
  SymbolKind2.File = 1;
  SymbolKind2.Module = 2;
  SymbolKind2.Namespace = 3;
  SymbolKind2.Package = 4;
  SymbolKind2.Class = 5;
  SymbolKind2.Method = 6;
  SymbolKind2.Property = 7;
  SymbolKind2.Field = 8;
  SymbolKind2.Constructor = 9;
  SymbolKind2.Enum = 10;
  SymbolKind2.Interface = 11;
  SymbolKind2.Function = 12;
  SymbolKind2.Variable = 13;
  SymbolKind2.Constant = 14;
  SymbolKind2.String = 15;
  SymbolKind2.Number = 16;
  SymbolKind2.Boolean = 17;
  SymbolKind2.Array = 18;
  SymbolKind2.Object = 19;
  SymbolKind2.Key = 20;
  SymbolKind2.Null = 21;
  SymbolKind2.EnumMember = 22;
  SymbolKind2.Struct = 23;
  SymbolKind2.Event = 24;
  SymbolKind2.Operator = 25;
  SymbolKind2.TypeParameter = 26;
})(SymbolKind || (SymbolKind = {}));
var SymbolTag;
(function(SymbolTag2) {
  SymbolTag2.Deprecated = 1;
})(SymbolTag || (SymbolTag = {}));
var SymbolInformation;
(function(SymbolInformation2) {
  function create(name, kind, range, uri, containerName) {
    var result = {
      name,
      kind,
      location: { uri, range }
    };
    if (containerName) {
      result.containerName = containerName;
    }
    return result;
  }
  SymbolInformation2.create = create;
})(SymbolInformation || (SymbolInformation = {}));
var DocumentSymbol;
(function(DocumentSymbol2) {
  function create(name, detail, kind, range, selectionRange, children) {
    var result = {
      name,
      detail,
      kind,
      range,
      selectionRange
    };
    if (children !== void 0) {
      result.children = children;
    }
    return result;
  }
  DocumentSymbol2.create = create;
  function is(value) {
    var candidate = value;
    return candidate && Is.string(candidate.name) && Is.number(candidate.kind) && Range.is(candidate.range) && Range.is(candidate.selectionRange) && (candidate.detail === void 0 || Is.string(candidate.detail)) && (candidate.deprecated === void 0 || Is.boolean(candidate.deprecated)) && (candidate.children === void 0 || Array.isArray(candidate.children)) && (candidate.tags === void 0 || Array.isArray(candidate.tags));
  }
  DocumentSymbol2.is = is;
})(DocumentSymbol || (DocumentSymbol = {}));
var CodeActionKind;
(function(CodeActionKind2) {
  CodeActionKind2.Empty = "";
  CodeActionKind2.QuickFix = "quickfix";
  CodeActionKind2.Refactor = "refactor";
  CodeActionKind2.RefactorExtract = "refactor.extract";
  CodeActionKind2.RefactorInline = "refactor.inline";
  CodeActionKind2.RefactorRewrite = "refactor.rewrite";
  CodeActionKind2.Source = "source";
  CodeActionKind2.SourceOrganizeImports = "source.organizeImports";
  CodeActionKind2.SourceFixAll = "source.fixAll";
})(CodeActionKind || (CodeActionKind = {}));
var CodeActionContext;
(function(CodeActionContext2) {
  function create(diagnostics, only) {
    var result = { diagnostics };
    if (only !== void 0 && only !== null) {
      result.only = only;
    }
    return result;
  }
  CodeActionContext2.create = create;
  function is(value) {
    var candidate = value;
    return Is.defined(candidate) && Is.typedArray(candidate.diagnostics, Diagnostic.is) && (candidate.only === void 0 || Is.typedArray(candidate.only, Is.string));
  }
  CodeActionContext2.is = is;
})(CodeActionContext || (CodeActionContext = {}));
var CodeAction;
(function(CodeAction2) {
  function create(title, kindOrCommandOrEdit, kind) {
    var result = { title };
    var checkKind = true;
    if (typeof kindOrCommandOrEdit === "string") {
      checkKind = false;
      result.kind = kindOrCommandOrEdit;
    } else if (Command.is(kindOrCommandOrEdit)) {
      result.command = kindOrCommandOrEdit;
    } else {
      result.edit = kindOrCommandOrEdit;
    }
    if (checkKind && kind !== void 0) {
      result.kind = kind;
    }
    return result;
  }
  CodeAction2.create = create;
  function is(value) {
    var candidate = value;
    return candidate && Is.string(candidate.title) && (candidate.diagnostics === void 0 || Is.typedArray(candidate.diagnostics, Diagnostic.is)) && (candidate.kind === void 0 || Is.string(candidate.kind)) && (candidate.edit !== void 0 || candidate.command !== void 0) && (candidate.command === void 0 || Command.is(candidate.command)) && (candidate.isPreferred === void 0 || Is.boolean(candidate.isPreferred)) && (candidate.edit === void 0 || WorkspaceEdit.is(candidate.edit));
  }
  CodeAction2.is = is;
})(CodeAction || (CodeAction = {}));
var CodeLens;
(function(CodeLens2) {
  function create(range, data) {
    var result = { range };
    if (Is.defined(data)) {
      result.data = data;
    }
    return result;
  }
  CodeLens2.create = create;
  function is(value) {
    var candidate = value;
    return Is.defined(candidate) && Range.is(candidate.range) && (Is.undefined(candidate.command) || Command.is(candidate.command));
  }
  CodeLens2.is = is;
})(CodeLens || (CodeLens = {}));
var FormattingOptions;
(function(FormattingOptions2) {
  function create(tabSize, insertSpaces) {
    return { tabSize, insertSpaces };
  }
  FormattingOptions2.create = create;
  function is(value) {
    var candidate = value;
    return Is.defined(candidate) && Is.uinteger(candidate.tabSize) && Is.boolean(candidate.insertSpaces);
  }
  FormattingOptions2.is = is;
})(FormattingOptions || (FormattingOptions = {}));
var DocumentLink;
(function(DocumentLink2) {
  function create(range, target, data) {
    return { range, target, data };
  }
  DocumentLink2.create = create;
  function is(value) {
    var candidate = value;
    return Is.defined(candidate) && Range.is(candidate.range) && (Is.undefined(candidate.target) || Is.string(candidate.target));
  }
  DocumentLink2.is = is;
})(DocumentLink || (DocumentLink = {}));
var SelectionRange;
(function(SelectionRange2) {
  function create(range, parent) {
    return { range, parent };
  }
  SelectionRange2.create = create;
  function is(value) {
    var candidate = value;
    return candidate !== void 0 && Range.is(candidate.range) && (candidate.parent === void 0 || SelectionRange2.is(candidate.parent));
  }
  SelectionRange2.is = is;
})(SelectionRange || (SelectionRange = {}));
var TextDocument;
(function(TextDocument2) {
  function create(uri, languageId, version, content) {
    return new FullTextDocument(uri, languageId, version, content);
  }
  TextDocument2.create = create;
  function is(value) {
    var candidate = value;
    return Is.defined(candidate) && Is.string(candidate.uri) && (Is.undefined(candidate.languageId) || Is.string(candidate.languageId)) && Is.uinteger(candidate.lineCount) && Is.func(candidate.getText) && Is.func(candidate.positionAt) && Is.func(candidate.offsetAt) ? true : false;
  }
  TextDocument2.is = is;
  function applyEdits(document, edits) {
    var text = document.getText();
    var sortedEdits = mergeSort(edits, function(a, b) {
      var diff = a.range.start.line - b.range.start.line;
      if (diff === 0) {
        return a.range.start.character - b.range.start.character;
      }
      return diff;
    });
    var lastModifiedOffset = text.length;
    for (var i = sortedEdits.length - 1; i >= 0; i--) {
      var e = sortedEdits[i];
      var startOffset = document.offsetAt(e.range.start);
      var endOffset = document.offsetAt(e.range.end);
      if (endOffset <= lastModifiedOffset) {
        text = text.substring(0, startOffset) + e.newText + text.substring(endOffset, text.length);
      } else {
        throw new Error("Overlapping edit");
      }
      lastModifiedOffset = startOffset;
    }
    return text;
  }
  TextDocument2.applyEdits = applyEdits;
  function mergeSort(data, compare) {
    if (data.length <= 1) {
      return data;
    }
    var p = data.length / 2 | 0;
    var left = data.slice(0, p);
    var right = data.slice(p);
    mergeSort(left, compare);
    mergeSort(right, compare);
    var leftIdx = 0;
    var rightIdx = 0;
    var i = 0;
    while (leftIdx < left.length && rightIdx < right.length) {
      var ret = compare(left[leftIdx], right[rightIdx]);
      if (ret <= 0) {
        data[i++] = left[leftIdx++];
      } else {
        data[i++] = right[rightIdx++];
      }
    }
    while (leftIdx < left.length) {
      data[i++] = left[leftIdx++];
    }
    while (rightIdx < right.length) {
      data[i++] = right[rightIdx++];
    }
    return data;
  }
})(TextDocument || (TextDocument = {}));
var FullTextDocument = function() {
  function FullTextDocument2(uri, languageId, version, content) {
    this._uri = uri;
    this._languageId = languageId;
    this._version = version;
    this._content = content;
    this._lineOffsets = void 0;
  }
  Object.defineProperty(FullTextDocument2.prototype, "uri", {
    get: function() {
      return this._uri;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(FullTextDocument2.prototype, "languageId", {
    get: function() {
      return this._languageId;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(FullTextDocument2.prototype, "version", {
    get: function() {
      return this._version;
    },
    enumerable: false,
    configurable: true
  });
  FullTextDocument2.prototype.getText = function(range) {
    if (range) {
      var start = this.offsetAt(range.start);
      var end = this.offsetAt(range.end);
      return this._content.substring(start, end);
    }
    return this._content;
  };
  FullTextDocument2.prototype.update = function(event, version) {
    this._content = event.text;
    this._version = version;
    this._lineOffsets = void 0;
  };
  FullTextDocument2.prototype.getLineOffsets = function() {
    if (this._lineOffsets === void 0) {
      var lineOffsets = [];
      var text = this._content;
      var isLineStart = true;
      for (var i = 0; i < text.length; i++) {
        if (isLineStart) {
          lineOffsets.push(i);
          isLineStart = false;
        }
        var ch = text.charAt(i);
        isLineStart = ch === "\r" || ch === "\n";
        if (ch === "\r" && i + 1 < text.length && text.charAt(i + 1) === "\n") {
          i++;
        }
      }
      if (isLineStart && text.length > 0) {
        lineOffsets.push(text.length);
      }
      this._lineOffsets = lineOffsets;
    }
    return this._lineOffsets;
  };
  FullTextDocument2.prototype.positionAt = function(offset) {
    offset = Math.max(Math.min(offset, this._content.length), 0);
    var lineOffsets = this.getLineOffsets();
    var low = 0, high = lineOffsets.length;
    if (high === 0) {
      return Position.create(0, offset);
    }
    while (low < high) {
      var mid = Math.floor((low + high) / 2);
      if (lineOffsets[mid] > offset) {
        high = mid;
      } else {
        low = mid + 1;
      }
    }
    var line = low - 1;
    return Position.create(line, offset - lineOffsets[line]);
  };
  FullTextDocument2.prototype.offsetAt = function(position) {
    var lineOffsets = this.getLineOffsets();
    if (position.line >= lineOffsets.length) {
      return this._content.length;
    } else if (position.line < 0) {
      return 0;
    }
    var lineOffset = lineOffsets[position.line];
    var nextLineOffset = position.line + 1 < lineOffsets.length ? lineOffsets[position.line + 1] : this._content.length;
    return Math.max(Math.min(lineOffset + position.character, nextLineOffset), lineOffset);
  };
  Object.defineProperty(FullTextDocument2.prototype, "lineCount", {
    get: function() {
      return this.getLineOffsets().length;
    },
    enumerable: false,
    configurable: true
  });
  return FullTextDocument2;
}();
var Is;
(function(Is2) {
  var toString = Object.prototype.toString;
  function defined(value) {
    return typeof value !== "undefined";
  }
  Is2.defined = defined;
  function undefined2(value) {
    return typeof value === "undefined";
  }
  Is2.undefined = undefined2;
  function boolean(value) {
    return value === true || value === false;
  }
  Is2.boolean = boolean;
  function string(value) {
    return toString.call(value) === "[object String]";
  }
  Is2.string = string;
  function number(value) {
    return toString.call(value) === "[object Number]";
  }
  Is2.number = number;
  function numberRange(value, min, max) {
    return toString.call(value) === "[object Number]" && min <= value && value <= max;
  }
  Is2.numberRange = numberRange;
  function integer2(value) {
    return toString.call(value) === "[object Number]" && -2147483648 <= value && value <= 2147483647;
  }
  Is2.integer = integer2;
  function uinteger2(value) {
    return toString.call(value) === "[object Number]" && 0 <= value && value <= 2147483647;
  }
  Is2.uinteger = uinteger2;
  function func(value) {
    return toString.call(value) === "[object Function]";
  }
  Is2.func = func;
  function objectLiteral(value) {
    return value !== null && typeof value === "object";
  }
  Is2.objectLiteral = objectLiteral;
  function typedArray(value, check) {
    return Array.isArray(value) && value.every(check);
  }
  Is2.typedArray = typedArray;
})(Is || (Is = {}));
var DiagnosticsAdapter = class {
  constructor(_languageId, _worker, configChangeEvent) {
    __publicField(this, "_disposables", []);
    __publicField(this, "_listener", /* @__PURE__ */ Object.create(null));
    this._languageId = _languageId;
    this._worker = _worker;
    const onModelAdd = (model) => {
      let modeId = model.getLanguageId();
      if (modeId !== this._languageId) {
        return;
      }
      let handle;
      this._listener[model.uri.toString()] = model.onDidChangeContent(() => {
        window.clearTimeout(handle);
        handle = window.setTimeout(() => this._doValidate(model.uri, modeId), 500);
      });
      this._doValidate(model.uri, modeId);
    };
    const onModelRemoved = (model) => {
      monaco_editor_core_exports.editor.setModelMarkers(model, this._languageId, []);
      let uriStr = model.uri.toString();
      let listener = this._listener[uriStr];
      if (listener) {
        listener.dispose();
        delete this._listener[uriStr];
      }
    };
    this._disposables.push(monaco_editor_core_exports.editor.onDidCreateModel(onModelAdd));
    this._disposables.push(monaco_editor_core_exports.editor.onWillDisposeModel(onModelRemoved));
    this._disposables.push(monaco_editor_core_exports.editor.onDidChangeModelLanguage((event) => {
      onModelRemoved(event.model);
      onModelAdd(event.model);
    }));
    this._disposables.push(configChangeEvent((_) => {
      monaco_editor_core_exports.editor.getModels().forEach((model) => {
        if (model.getLanguageId() === this._languageId) {
          onModelRemoved(model);
          onModelAdd(model);
        }
      });
    }));
    this._disposables.push({
      dispose: () => {
        monaco_editor_core_exports.editor.getModels().forEach(onModelRemoved);
        for (let key in this._listener) {
          this._listener[key].dispose();
        }
      }
    });
    monaco_editor_core_exports.editor.getModels().forEach(onModelAdd);
  }
  dispose() {
    this._disposables.forEach((d) => d && d.dispose());
    this._disposables.length = 0;
  }
  _doValidate(resource, languageId) {
    this._worker(resource).then((worker) => {
      return worker.doValidation(resource.toString());
    }).then((diagnostics) => {
      const markers = diagnostics.map((d) => toDiagnostics(resource, d));
      let model = monaco_editor_core_exports.editor.getModel(resource);
      if (model && model.getLanguageId() === languageId) {
        monaco_editor_core_exports.editor.setModelMarkers(model, languageId, markers);
      }
    }).then(void 0, (err) => {
      console.error(err);
    });
  }
};
function toSeverity(lsSeverity) {
  switch (lsSeverity) {
    case DiagnosticSeverity.Error:
      return monaco_editor_core_exports.MarkerSeverity.Error;
    case DiagnosticSeverity.Warning:
      return monaco_editor_core_exports.MarkerSeverity.Warning;
    case DiagnosticSeverity.Information:
      return monaco_editor_core_exports.MarkerSeverity.Info;
    case DiagnosticSeverity.Hint:
      return monaco_editor_core_exports.MarkerSeverity.Hint;
    default:
      return monaco_editor_core_exports.MarkerSeverity.Info;
  }
}
function toDiagnostics(resource, diag) {
  let code = typeof diag.code === "number" ? String(diag.code) : diag.code;
  return {
    severity: toSeverity(diag.severity),
    startLineNumber: diag.range.start.line + 1,
    startColumn: diag.range.start.character + 1,
    endLineNumber: diag.range.end.line + 1,
    endColumn: diag.range.end.character + 1,
    message: diag.message,
    code,
    source: diag.source
  };
}
var CompletionAdapter = class {
  constructor(_worker, _triggerCharacters) {
    this._worker = _worker;
    this._triggerCharacters = _triggerCharacters;
  }
  get triggerCharacters() {
    return this._triggerCharacters;
  }
  provideCompletionItems(model, position, context, token) {
    const resource = model.uri;
    return this._worker(resource).then((worker) => {
      return worker.doComplete(resource.toString(), fromPosition(position));
    }).then((info) => {
      if (!info) {
        return;
      }
      const wordInfo = model.getWordUntilPosition(position);
      const wordRange = new monaco_editor_core_exports.Range(position.lineNumber, wordInfo.startColumn, position.lineNumber, wordInfo.endColumn);
      const items = info.items.map((entry) => {
        const item = {
          label: entry.label,
          insertText: entry.insertText || entry.label,
          sortText: entry.sortText,
          filterText: entry.filterText,
          documentation: entry.documentation,
          detail: entry.detail,
          command: toCommand(entry.command),
          range: wordRange,
          kind: toCompletionItemKind(entry.kind)
        };
        if (entry.textEdit) {
          if (isInsertReplaceEdit(entry.textEdit)) {
            item.range = {
              insert: toRange(entry.textEdit.insert),
              replace: toRange(entry.textEdit.replace)
            };
          } else {
            item.range = toRange(entry.textEdit.range);
          }
          item.insertText = entry.textEdit.newText;
        }
        if (entry.additionalTextEdits) {
          item.additionalTextEdits = entry.additionalTextEdits.map(toTextEdit);
        }
        if (entry.insertTextFormat === InsertTextFormat.Snippet) {
          item.insertTextRules = monaco_editor_core_exports.languages.CompletionItemInsertTextRule.InsertAsSnippet;
        }
        return item;
      });
      return {
        isIncomplete: info.isIncomplete,
        suggestions: items
      };
    });
  }
};
function fromPosition(position) {
  if (!position) {
    return void 0;
  }
  return { character: position.column - 1, line: position.lineNumber - 1 };
}
function fromRange(range) {
  if (!range) {
    return void 0;
  }
  return {
    start: {
      line: range.startLineNumber - 1,
      character: range.startColumn - 1
    },
    end: { line: range.endLineNumber - 1, character: range.endColumn - 1 }
  };
}
function toRange(range) {
  if (!range) {
    return void 0;
  }
  return new monaco_editor_core_exports.Range(range.start.line + 1, range.start.character + 1, range.end.line + 1, range.end.character + 1);
}
function isInsertReplaceEdit(edit) {
  return typeof edit.insert !== "undefined" && typeof edit.replace !== "undefined";
}
function toCompletionItemKind(kind) {
  const mItemKind = monaco_editor_core_exports.languages.CompletionItemKind;
  switch (kind) {
    case CompletionItemKind.Text:
      return mItemKind.Text;
    case CompletionItemKind.Method:
      return mItemKind.Method;
    case CompletionItemKind.Function:
      return mItemKind.Function;
    case CompletionItemKind.Constructor:
      return mItemKind.Constructor;
    case CompletionItemKind.Field:
      return mItemKind.Field;
    case CompletionItemKind.Variable:
      return mItemKind.Variable;
    case CompletionItemKind.Class:
      return mItemKind.Class;
    case CompletionItemKind.Interface:
      return mItemKind.Interface;
    case CompletionItemKind.Module:
      return mItemKind.Module;
    case CompletionItemKind.Property:
      return mItemKind.Property;
    case CompletionItemKind.Unit:
      return mItemKind.Unit;
    case CompletionItemKind.Value:
      return mItemKind.Value;
    case CompletionItemKind.Enum:
      return mItemKind.Enum;
    case CompletionItemKind.Keyword:
      return mItemKind.Keyword;
    case CompletionItemKind.Snippet:
      return mItemKind.Snippet;
    case CompletionItemKind.Color:
      return mItemKind.Color;
    case CompletionItemKind.File:
      return mItemKind.File;
    case CompletionItemKind.Reference:
      return mItemKind.Reference;
  }
  return mItemKind.Property;
}
function toTextEdit(textEdit) {
  if (!textEdit) {
    return void 0;
  }
  return {
    range: toRange(textEdit.range),
    text: textEdit.newText
  };
}
function toCommand(c) {
  return c && c.command === "editor.action.triggerSuggest" ? { id: c.command, title: c.title, arguments: c.arguments } : void 0;
}
var HoverAdapter = class {
  constructor(_worker) {
    this._worker = _worker;
  }
  provideHover(model, position, token) {
    let resource = model.uri;
    return this._worker(resource).then((worker) => {
      return worker.doHover(resource.toString(), fromPosition(position));
    }).then((info) => {
      if (!info) {
        return;
      }
      return {
        range: toRange(info.range),
        contents: toMarkedStringArray(info.contents)
      };
    });
  }
};
function isMarkupContent(thing) {
  return thing && typeof thing === "object" && typeof thing.kind === "string";
}
function toMarkdownString(entry) {
  if (typeof entry === "string") {
    return {
      value: entry
    };
  }
  if (isMarkupContent(entry)) {
    if (entry.kind === "plaintext") {
      return {
        value: entry.value.replace(/[\\`*_{}[\]()#+\-.!]/g, "\\$&")
      };
    }
    return {
      value: entry.value
    };
  }
  return { value: "```" + entry.language + "\n" + entry.value + "\n```\n" };
}
function toMarkedStringArray(contents) {
  if (!contents) {
    return void 0;
  }
  if (Array.isArray(contents)) {
    return contents.map(toMarkdownString);
  }
  return [toMarkdownString(contents)];
}
var DocumentHighlightAdapter = class {
  constructor(_worker) {
    this._worker = _worker;
  }
  provideDocumentHighlights(model, position, token) {
    const resource = model.uri;
    return this._worker(resource).then((worker) => worker.findDocumentHighlights(resource.toString(), fromPosition(position))).then((entries) => {
      if (!entries) {
        return;
      }
      return entries.map((entry) => {
        return {
          range: toRange(entry.range),
          kind: toDocumentHighlightKind(entry.kind)
        };
      });
    });
  }
};
function toDocumentHighlightKind(kind) {
  switch (kind) {
    case DocumentHighlightKind.Read:
      return monaco_editor_core_exports.languages.DocumentHighlightKind.Read;
    case DocumentHighlightKind.Write:
      return monaco_editor_core_exports.languages.DocumentHighlightKind.Write;
    case DocumentHighlightKind.Text:
      return monaco_editor_core_exports.languages.DocumentHighlightKind.Text;
  }
  return monaco_editor_core_exports.languages.DocumentHighlightKind.Text;
}
var DefinitionAdapter = class {
  constructor(_worker) {
    this._worker = _worker;
  }
  provideDefinition(model, position, token) {
    const resource = model.uri;
    return this._worker(resource).then((worker) => {
      return worker.findDefinition(resource.toString(), fromPosition(position));
    }).then((definition) => {
      if (!definition) {
        return;
      }
      return [toLocation(definition)];
    });
  }
};
function toLocation(location) {
  return {
    uri: monaco_editor_core_exports.Uri.parse(location.uri),
    range: toRange(location.range)
  };
}
var ReferenceAdapter = class {
  constructor(_worker) {
    this._worker = _worker;
  }
  provideReferences(model, position, context, token) {
    const resource = model.uri;
    return this._worker(resource).then((worker) => {
      return worker.findReferences(resource.toString(), fromPosition(position));
    }).then((entries) => {
      if (!entries) {
        return;
      }
      return entries.map(toLocation);
    });
  }
};
var RenameAdapter = class {
  constructor(_worker) {
    this._worker = _worker;
  }
  provideRenameEdits(model, position, newName, token) {
    const resource = model.uri;
    return this._worker(resource).then((worker) => {
      return worker.doRename(resource.toString(), fromPosition(position), newName);
    }).then((edit) => {
      return toWorkspaceEdit(edit);
    });
  }
};
function toWorkspaceEdit(edit) {
  if (!edit || !edit.changes) {
    return void 0;
  }
  let resourceEdits = [];
  for (let uri in edit.changes) {
    const _uri = monaco_editor_core_exports.Uri.parse(uri);
    for (let e of edit.changes[uri]) {
      resourceEdits.push({
        resource: _uri,
        versionId: void 0,
        textEdit: {
          range: toRange(e.range),
          text: e.newText
        }
      });
    }
  }
  return {
    edits: resourceEdits
  };
}
var DocumentSymbolAdapter = class {
  constructor(_worker) {
    this._worker = _worker;
  }
  provideDocumentSymbols(model, token) {
    const resource = model.uri;
    return this._worker(resource).then((worker) => worker.findDocumentSymbols(resource.toString())).then((items) => {
      if (!items) {
        return;
      }
      return items.map((item) => ({
        name: item.name,
        detail: "",
        containerName: item.containerName,
        kind: toSymbolKind(item.kind),
        range: toRange(item.location.range),
        selectionRange: toRange(item.location.range),
        tags: []
      }));
    });
  }
};
function toSymbolKind(kind) {
  let mKind = monaco_editor_core_exports.languages.SymbolKind;
  switch (kind) {
    case SymbolKind.File:
      return mKind.Array;
    case SymbolKind.Module:
      return mKind.Module;
    case SymbolKind.Namespace:
      return mKind.Namespace;
    case SymbolKind.Package:
      return mKind.Package;
    case SymbolKind.Class:
      return mKind.Class;
    case SymbolKind.Method:
      return mKind.Method;
    case SymbolKind.Property:
      return mKind.Property;
    case SymbolKind.Field:
      return mKind.Field;
    case SymbolKind.Constructor:
      return mKind.Constructor;
    case SymbolKind.Enum:
      return mKind.Enum;
    case SymbolKind.Interface:
      return mKind.Interface;
    case SymbolKind.Function:
      return mKind.Function;
    case SymbolKind.Variable:
      return mKind.Variable;
    case SymbolKind.Constant:
      return mKind.Constant;
    case SymbolKind.String:
      return mKind.String;
    case SymbolKind.Number:
      return mKind.Number;
    case SymbolKind.Boolean:
      return mKind.Boolean;
    case SymbolKind.Array:
      return mKind.Array;
  }
  return mKind.Function;
}
var DocumentLinkAdapter = class {
  constructor(_worker) {
    this._worker = _worker;
  }
  provideLinks(model, token) {
    const resource = model.uri;
    return this._worker(resource).then((worker) => worker.findDocumentLinks(resource.toString())).then((items) => {
      if (!items) {
        return;
      }
      return {
        links: items.map((item) => ({
          range: toRange(item.range),
          url: item.target
        }))
      };
    });
  }
};
var DocumentFormattingEditProvider = class {
  constructor(_worker) {
    this._worker = _worker;
  }
  provideDocumentFormattingEdits(model, options, token) {
    const resource = model.uri;
    return this._worker(resource).then((worker) => {
      return worker.format(resource.toString(), null, fromFormattingOptions(options)).then((edits) => {
        if (!edits || edits.length === 0) {
          return;
        }
        return edits.map(toTextEdit);
      });
    });
  }
};
var DocumentRangeFormattingEditProvider = class {
  constructor(_worker) {
    __publicField(this, "canFormatMultipleRanges", false);
    this._worker = _worker;
  }
  provideDocumentRangeFormattingEdits(model, range, options, token) {
    const resource = model.uri;
    return this._worker(resource).then((worker) => {
      return worker.format(resource.toString(), fromRange(range), fromFormattingOptions(options)).then((edits) => {
        if (!edits || edits.length === 0) {
          return;
        }
        return edits.map(toTextEdit);
      });
    });
  }
};
function fromFormattingOptions(options) {
  return {
    tabSize: options.tabSize,
    insertSpaces: options.insertSpaces
  };
}
var DocumentColorAdapter = class {
  constructor(_worker) {
    this._worker = _worker;
  }
  provideDocumentColors(model, token) {
    const resource = model.uri;
    return this._worker(resource).then((worker) => worker.findDocumentColors(resource.toString())).then((infos) => {
      if (!infos) {
        return;
      }
      return infos.map((item) => ({
        color: item.color,
        range: toRange(item.range)
      }));
    });
  }
  provideColorPresentations(model, info, token) {
    const resource = model.uri;
    return this._worker(resource).then((worker) => worker.getColorPresentations(resource.toString(), info.color, fromRange(info.range))).then((presentations) => {
      if (!presentations) {
        return;
      }
      return presentations.map((presentation) => {
        let item = {
          label: presentation.label
        };
        if (presentation.textEdit) {
          item.textEdit = toTextEdit(presentation.textEdit);
        }
        if (presentation.additionalTextEdits) {
          item.additionalTextEdits = presentation.additionalTextEdits.map(toTextEdit);
        }
        return item;
      });
    });
  }
};
var FoldingRangeAdapter = class {
  constructor(_worker) {
    this._worker = _worker;
  }
  provideFoldingRanges(model, context, token) {
    const resource = model.uri;
    return this._worker(resource).then((worker) => worker.getFoldingRanges(resource.toString(), context)).then((ranges) => {
      if (!ranges) {
        return;
      }
      return ranges.map((range) => {
        const result = {
          start: range.startLine + 1,
          end: range.endLine + 1
        };
        if (typeof range.kind !== "undefined") {
          result.kind = toFoldingRangeKind(range.kind);
        }
        return result;
      });
    });
  }
};
function toFoldingRangeKind(kind) {
  switch (kind) {
    case FoldingRangeKind.Comment:
      return monaco_editor_core_exports.languages.FoldingRangeKind.Comment;
    case FoldingRangeKind.Imports:
      return monaco_editor_core_exports.languages.FoldingRangeKind.Imports;
    case FoldingRangeKind.Region:
      return monaco_editor_core_exports.languages.FoldingRangeKind.Region;
  }
  return void 0;
}
var SelectionRangeAdapter = class {
  constructor(_worker) {
    this._worker = _worker;
  }
  provideSelectionRanges(model, positions, token) {
    const resource = model.uri;
    return this._worker(resource).then((worker) => worker.getSelectionRanges(resource.toString(), positions.map(fromPosition))).then((selectionRanges) => {
      if (!selectionRanges) {
        return;
      }
      return selectionRanges.map((selectionRange) => {
        const result = [];
        while (selectionRange) {
          result.push({ range: toRange(selectionRange.range) });
          selectionRange = selectionRange.parent;
        }
        return result;
      });
    });
  }
};
function createScanner(text, ignoreTrivia) {
  if (ignoreTrivia === void 0) {
    ignoreTrivia = false;
  }
  var len = text.length;
  var pos = 0, value = "", tokenOffset = 0, token = 16, lineNumber = 0, lineStartOffset = 0, tokenLineStartOffset = 0, prevTokenLineStartOffset = 0, scanError = 0;
  function scanHexDigits(count, exact) {
    var digits = 0;
    var value2 = 0;
    while (digits < count || !exact) {
      var ch = text.charCodeAt(pos);
      if (ch >= 48 && ch <= 57) {
        value2 = value2 * 16 + ch - 48;
      } else if (ch >= 65 && ch <= 70) {
        value2 = value2 * 16 + ch - 65 + 10;
      } else if (ch >= 97 && ch <= 102) {
        value2 = value2 * 16 + ch - 97 + 10;
      } else {
        break;
      }
      pos++;
      digits++;
    }
    if (digits < count) {
      value2 = -1;
    }
    return value2;
  }
  function setPosition(newPosition) {
    pos = newPosition;
    value = "";
    tokenOffset = 0;
    token = 16;
    scanError = 0;
  }
  function scanNumber() {
    var start = pos;
    if (text.charCodeAt(pos) === 48) {
      pos++;
    } else {
      pos++;
      while (pos < text.length && isDigit(text.charCodeAt(pos))) {
        pos++;
      }
    }
    if (pos < text.length && text.charCodeAt(pos) === 46) {
      pos++;
      if (pos < text.length && isDigit(text.charCodeAt(pos))) {
        pos++;
        while (pos < text.length && isDigit(text.charCodeAt(pos))) {
          pos++;
        }
      } else {
        scanError = 3;
        return text.substring(start, pos);
      }
    }
    var end = pos;
    if (pos < text.length && (text.charCodeAt(pos) === 69 || text.charCodeAt(pos) === 101)) {
      pos++;
      if (pos < text.length && text.charCodeAt(pos) === 43 || text.charCodeAt(pos) === 45) {
        pos++;
      }
      if (pos < text.length && isDigit(text.charCodeAt(pos))) {
        pos++;
        while (pos < text.length && isDigit(text.charCodeAt(pos))) {
          pos++;
        }
        end = pos;
      } else {
        scanError = 3;
      }
    }
    return text.substring(start, end);
  }
  function scanString() {
    var result = "", start = pos;
    while (true) {
      if (pos >= len) {
        result += text.substring(start, pos);
        scanError = 2;
        break;
      }
      var ch = text.charCodeAt(pos);
      if (ch === 34) {
        result += text.substring(start, pos);
        pos++;
        break;
      }
      if (ch === 92) {
        result += text.substring(start, pos);
        pos++;
        if (pos >= len) {
          scanError = 2;
          break;
        }
        var ch2 = text.charCodeAt(pos++);
        switch (ch2) {
          case 34:
            result += '"';
            break;
          case 92:
            result += "\\";
            break;
          case 47:
            result += "/";
            break;
          case 98:
            result += "\b";
            break;
          case 102:
            result += "\f";
            break;
          case 110:
            result += "\n";
            break;
          case 114:
            result += "\r";
            break;
          case 116:
            result += "	";
            break;
          case 117:
            var ch3 = scanHexDigits(4, true);
            if (ch3 >= 0) {
              result += String.fromCharCode(ch3);
            } else {
              scanError = 4;
            }
            break;
          default:
            scanError = 5;
        }
        start = pos;
        continue;
      }
      if (ch >= 0 && ch <= 31) {
        if (isLineBreak(ch)) {
          result += text.substring(start, pos);
          scanError = 2;
          break;
        } else {
          scanError = 6;
        }
      }
      pos++;
    }
    return result;
  }
  function scanNext() {
    value = "";
    scanError = 0;
    tokenOffset = pos;
    lineStartOffset = lineNumber;
    prevTokenLineStartOffset = tokenLineStartOffset;
    if (pos >= len) {
      tokenOffset = len;
      return token = 17;
    }
    var code = text.charCodeAt(pos);
    if (isWhiteSpace(code)) {
      do {
        pos++;
        value += String.fromCharCode(code);
        code = text.charCodeAt(pos);
      } while (isWhiteSpace(code));
      return token = 15;
    }
    if (isLineBreak(code)) {
      pos++;
      value += String.fromCharCode(code);
      if (code === 13 && text.charCodeAt(pos) === 10) {
        pos++;
        value += "\n";
      }
      lineNumber++;
      tokenLineStartOffset = pos;
      return token = 14;
    }
    switch (code) {
      case 123:
        pos++;
        return token = 1;
      case 125:
        pos++;
        return token = 2;
      case 91:
        pos++;
        return token = 3;
      case 93:
        pos++;
        return token = 4;
      case 58:
        pos++;
        return token = 6;
      case 44:
        pos++;
        return token = 5;
      case 34:
        pos++;
        value = scanString();
        return token = 10;
      case 47:
        var start = pos - 1;
        if (text.charCodeAt(pos + 1) === 47) {
          pos += 2;
          while (pos < len) {
            if (isLineBreak(text.charCodeAt(pos))) {
              break;
            }
            pos++;
          }
          value = text.substring(start, pos);
          return token = 12;
        }
        if (text.charCodeAt(pos + 1) === 42) {
          pos += 2;
          var safeLength = len - 1;
          var commentClosed = false;
          while (pos < safeLength) {
            var ch = text.charCodeAt(pos);
            if (ch === 42 && text.charCodeAt(pos + 1) === 47) {
              pos += 2;
              commentClosed = true;
              break;
            }
            pos++;
            if (isLineBreak(ch)) {
              if (ch === 13 && text.charCodeAt(pos) === 10) {
                pos++;
              }
              lineNumber++;
              tokenLineStartOffset = pos;
            }
          }
          if (!commentClosed) {
            pos++;
            scanError = 1;
          }
          value = text.substring(start, pos);
          return token = 13;
        }
        value += String.fromCharCode(code);
        pos++;
        return token = 16;
      case 45:
        value += String.fromCharCode(code);
        pos++;
        if (pos === len || !isDigit(text.charCodeAt(pos))) {
          return token = 16;
        }
      case 48:
      case 49:
      case 50:
      case 51:
      case 52:
      case 53:
      case 54:
      case 55:
      case 56:
      case 57:
        value += scanNumber();
        return token = 11;
      default:
        while (pos < len && isUnknownContentCharacter(code)) {
          pos++;
          code = text.charCodeAt(pos);
        }
        if (tokenOffset !== pos) {
          value = text.substring(tokenOffset, pos);
          switch (value) {
            case "true":
              return token = 8;
            case "false":
              return token = 9;
            case "null":
              return token = 7;
          }
          return token = 16;
        }
        value += String.fromCharCode(code);
        pos++;
        return token = 16;
    }
  }
  function isUnknownContentCharacter(code) {
    if (isWhiteSpace(code) || isLineBreak(code)) {
      return false;
    }
    switch (code) {
      case 125:
      case 93:
      case 123:
      case 91:
      case 34:
      case 58:
      case 44:
      case 47:
        return false;
    }
    return true;
  }
  function scanNextNonTrivia() {
    var result;
    do {
      result = scanNext();
    } while (result >= 12 && result <= 15);
    return result;
  }
  return {
    setPosition,
    getPosition: function() {
      return pos;
    },
    scan: ignoreTrivia ? scanNextNonTrivia : scanNext,
    getToken: function() {
      return token;
    },
    getTokenValue: function() {
      return value;
    },
    getTokenOffset: function() {
      return tokenOffset;
    },
    getTokenLength: function() {
      return pos - tokenOffset;
    },
    getTokenStartLine: function() {
      return lineStartOffset;
    },
    getTokenStartCharacter: function() {
      return tokenOffset - prevTokenLineStartOffset;
    },
    getTokenError: function() {
      return scanError;
    }
  };
}
function isWhiteSpace(ch) {
  return ch === 32 || ch === 9 || ch === 11 || ch === 12 || ch === 160 || ch === 5760 || ch >= 8192 && ch <= 8203 || ch === 8239 || ch === 8287 || ch === 12288 || ch === 65279;
}
function isLineBreak(ch) {
  return ch === 10 || ch === 13 || ch === 8232 || ch === 8233;
}
function isDigit(ch) {
  return ch >= 48 && ch <= 57;
}
var ParseOptions;
(function(ParseOptions2) {
  ParseOptions2.DEFAULT = {
    allowTrailingComma: false
  };
})(ParseOptions || (ParseOptions = {}));
var createScanner2 = createScanner;
function createTokenizationSupport(supportComments) {
  return {
    getInitialState: () => new JSONState(null, null, false, null),
    tokenize: (line, state) => tokenize(supportComments, line, state)
  };
}
var TOKEN_DELIM_OBJECT = "delimiter.bracket.json";
var TOKEN_DELIM_ARRAY = "delimiter.array.json";
var TOKEN_DELIM_COLON = "delimiter.colon.json";
var TOKEN_DELIM_COMMA = "delimiter.comma.json";
var TOKEN_VALUE_BOOLEAN = "keyword.json";
var TOKEN_VALUE_NULL = "keyword.json";
var TOKEN_VALUE_STRING = "string.value.json";
var TOKEN_VALUE_NUMBER = "number.json";
var TOKEN_PROPERTY_NAME = "string.key.json";
var TOKEN_COMMENT_BLOCK = "comment.block.json";
var TOKEN_COMMENT_LINE = "comment.line.json";
var ParentsStack = class {
  constructor(parent, type) {
    this.parent = parent;
    this.type = type;
  }
  static pop(parents) {
    if (parents) {
      return parents.parent;
    }
    return null;
  }
  static push(parents, type) {
    return new ParentsStack(parents, type);
  }
  static equals(a, b) {
    if (!a && !b) {
      return true;
    }
    if (!a || !b) {
      return false;
    }
    while (a && b) {
      if (a === b) {
        return true;
      }
      if (a.type !== b.type) {
        return false;
      }
      a = a.parent;
      b = b.parent;
    }
    return true;
  }
};
var JSONState = class {
  constructor(state, scanError, lastWasColon, parents) {
    __publicField(this, "_state");
    __publicField(this, "scanError");
    __publicField(this, "lastWasColon");
    __publicField(this, "parents");
    this._state = state;
    this.scanError = scanError;
    this.lastWasColon = lastWasColon;
    this.parents = parents;
  }
  clone() {
    return new JSONState(this._state, this.scanError, this.lastWasColon, this.parents);
  }
  equals(other) {
    if (other === this) {
      return true;
    }
    if (!other || !(other instanceof JSONState)) {
      return false;
    }
    return this.scanError === other.scanError && this.lastWasColon === other.lastWasColon && ParentsStack.equals(this.parents, other.parents);
  }
  getStateData() {
    return this._state;
  }
  setStateData(state) {
    this._state = state;
  }
};
function tokenize(comments, line, state, offsetDelta = 0) {
  let numberOfInsertedCharacters = 0;
  let adjustOffset = false;
  switch (state.scanError) {
    case 2:
      line = '"' + line;
      numberOfInsertedCharacters = 1;
      break;
    case 1:
      line = "/*" + line;
      numberOfInsertedCharacters = 2;
      break;
  }
  const scanner = createScanner2(line);
  let lastWasColon = state.lastWasColon;
  let parents = state.parents;
  const ret = {
    tokens: [],
    endState: state.clone()
  };
  while (true) {
    let offset = offsetDelta + scanner.getPosition();
    let type = "";
    const kind = scanner.scan();
    if (kind === 17) {
      break;
    }
    if (offset === offsetDelta + scanner.getPosition()) {
      throw new Error("Scanner did not advance, next 3 characters are: " + line.substr(scanner.getPosition(), 3));
    }
    if (adjustOffset) {
      offset -= numberOfInsertedCharacters;
    }
    adjustOffset = numberOfInsertedCharacters > 0;
    switch (kind) {
      case 1:
        parents = ParentsStack.push(
          parents,
          0
          /* Object */
        );
        type = TOKEN_DELIM_OBJECT;
        lastWasColon = false;
        break;
      case 2:
        parents = ParentsStack.pop(parents);
        type = TOKEN_DELIM_OBJECT;
        lastWasColon = false;
        break;
      case 3:
        parents = ParentsStack.push(
          parents,
          1
          /* Array */
        );
        type = TOKEN_DELIM_ARRAY;
        lastWasColon = false;
        break;
      case 4:
        parents = ParentsStack.pop(parents);
        type = TOKEN_DELIM_ARRAY;
        lastWasColon = false;
        break;
      case 6:
        type = TOKEN_DELIM_COLON;
        lastWasColon = true;
        break;
      case 5:
        type = TOKEN_DELIM_COMMA;
        lastWasColon = false;
        break;
      case 8:
      case 9:
        type = TOKEN_VALUE_BOOLEAN;
        lastWasColon = false;
        break;
      case 7:
        type = TOKEN_VALUE_NULL;
        lastWasColon = false;
        break;
      case 10:
        const currentParent = parents ? parents.type : 0;
        const inArray = currentParent === 1;
        type = lastWasColon || inArray ? TOKEN_VALUE_STRING : TOKEN_PROPERTY_NAME;
        lastWasColon = false;
        break;
      case 11:
        type = TOKEN_VALUE_NUMBER;
        lastWasColon = false;
        break;
    }
    if (comments) {
      switch (kind) {
        case 12:
          type = TOKEN_COMMENT_LINE;
          break;
        case 13:
          type = TOKEN_COMMENT_BLOCK;
          break;
      }
    }
    ret.endState = new JSONState(state.getStateData(), scanner.getTokenError(), lastWasColon, parents);
    ret.tokens.push({
      startIndex: offset,
      scopes: type
    });
  }
  return ret;
}
var JSONDiagnosticsAdapter = class extends DiagnosticsAdapter {
  constructor(languageId, worker, defaults) {
    super(languageId, worker, defaults.onDidChange);
    this._disposables.push(monaco_editor_core_exports.editor.onWillDisposeModel((model) => {
      this._resetSchema(model.uri);
    }));
    this._disposables.push(monaco_editor_core_exports.editor.onDidChangeModelLanguage((event) => {
      this._resetSchema(event.model.uri);
    }));
  }
  _resetSchema(resource) {
    this._worker().then((worker) => {
      worker.resetSchema(resource.toString());
    });
  }
};
function setupMode(defaults) {
  const disposables = [];
  const providers = [];
  const client = new WorkerManager(defaults);
  disposables.push(client);
  const worker = (...uris) => {
    return client.getLanguageServiceWorker(...uris);
  };
  function registerProviders() {
    const { languageId, modeConfiguration: modeConfiguration2 } = defaults;
    disposeAll(providers);
    if (modeConfiguration2.documentFormattingEdits) {
      providers.push(monaco_editor_core_exports.languages.registerDocumentFormattingEditProvider(languageId, new DocumentFormattingEditProvider(worker)));
    }
    if (modeConfiguration2.documentRangeFormattingEdits) {
      providers.push(monaco_editor_core_exports.languages.registerDocumentRangeFormattingEditProvider(languageId, new DocumentRangeFormattingEditProvider(worker)));
    }
    if (modeConfiguration2.completionItems) {
      providers.push(monaco_editor_core_exports.languages.registerCompletionItemProvider(languageId, new CompletionAdapter(worker, [" ", ":", '"'])));
    }
    if (modeConfiguration2.hovers) {
      providers.push(monaco_editor_core_exports.languages.registerHoverProvider(languageId, new HoverAdapter(worker)));
    }
    if (modeConfiguration2.documentSymbols) {
      providers.push(monaco_editor_core_exports.languages.registerDocumentSymbolProvider(languageId, new DocumentSymbolAdapter(worker)));
    }
    if (modeConfiguration2.tokens) {
      providers.push(monaco_editor_core_exports.languages.setTokensProvider(languageId, createTokenizationSupport(true)));
    }
    if (modeConfiguration2.colors) {
      providers.push(monaco_editor_core_exports.languages.registerColorProvider(languageId, new DocumentColorAdapter(worker)));
    }
    if (modeConfiguration2.foldingRanges) {
      providers.push(monaco_editor_core_exports.languages.registerFoldingRangeProvider(languageId, new FoldingRangeAdapter(worker)));
    }
    if (modeConfiguration2.diagnostics) {
      providers.push(new JSONDiagnosticsAdapter(languageId, worker, defaults));
    }
    if (modeConfiguration2.selectionRanges) {
      providers.push(monaco_editor_core_exports.languages.registerSelectionRangeProvider(languageId, new SelectionRangeAdapter(worker)));
    }
  }
  registerProviders();
  disposables.push(monaco_editor_core_exports.languages.setLanguageConfiguration(defaults.languageId, richEditConfiguration));
  let modeConfiguration = defaults.modeConfiguration;
  defaults.onDidChange((newDefaults) => {
    if (newDefaults.modeConfiguration !== modeConfiguration) {
      modeConfiguration = newDefaults.modeConfiguration;
      registerProviders();
    }
  });
  disposables.push(asDisposable(providers));
  return asDisposable(disposables);
}
function asDisposable(disposables) {
  return { dispose: () => disposeAll(disposables) };
}
function disposeAll(disposables) {
  while (disposables.length) {
    disposables.pop().dispose();
  }
}
var richEditConfiguration = {
  wordPattern: /(-?\d*\.\d\w*)|([^\[\{\]\}\:\"\,\s]+)/g,
  comments: {
    lineComment: "//",
    blockComment: ["/*", "*/"]
  },
  brackets: [
    ["{", "}"],
    ["[", "]"]
  ],
  autoClosingPairs: [
    { open: "{", close: "}", notIn: ["string"] },
    { open: "[", close: "]", notIn: ["string"] },
    { open: '"', close: '"', notIn: ["string"] }
  ]
};
export {
  CompletionAdapter,
  DefinitionAdapter,
  DiagnosticsAdapter,
  DocumentColorAdapter,
  DocumentFormattingEditProvider,
  DocumentHighlightAdapter,
  DocumentLinkAdapter,
  DocumentRangeFormattingEditProvider,
  DocumentSymbolAdapter,
  FoldingRangeAdapter,
  HoverAdapter,
  ReferenceAdapter,
  RenameAdapter,
  SelectionRangeAdapter,
  WorkerManager,
  fromPosition,
  fromRange,
  setupMode,
  toRange,
  toTextEdit
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianNvbk1vZGUuanMiLCJzb3VyY2VzIjpbIi4uLy4uL25vZGVfbW9kdWxlcy9tb25hY28tZWRpdG9yL2VzbS92cy9sYW5ndWFnZS9qc29uL2pzb25Nb2RlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qIS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqIFZlcnNpb246IDAuNDUuMCg1ZTVhZjAxM2Y4ZDI5NTU1NWE3MjEwZGYwZDVmMmNlYTBiZjVkZDU2KVxuICogUmVsZWFzZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlXG4gKiBodHRwczovL2dpdGh1Yi5jb20vbWljcm9zb2Z0L21vbmFjby1lZGl0b3IvYmxvYi9tYWluL0xJQ0VOU0UudHh0XG4gKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxudmFyIF9fZGVmUHJvcCA9IE9iamVjdC5kZWZpbmVQcm9wZXJ0eTtcbnZhciBfX2dldE93blByb3BEZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcjtcbnZhciBfX2dldE93blByb3BOYW1lcyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzO1xudmFyIF9faGFzT3duUHJvcCA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG52YXIgX19jb3B5UHJvcHMgPSAodG8sIGZyb20sIGV4Y2VwdCwgZGVzYykgPT4ge1xuICBpZiAoZnJvbSAmJiB0eXBlb2YgZnJvbSA9PT0gXCJvYmplY3RcIiB8fCB0eXBlb2YgZnJvbSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgZm9yIChsZXQga2V5IG9mIF9fZ2V0T3duUHJvcE5hbWVzKGZyb20pKVxuICAgICAgaWYgKCFfX2hhc093blByb3AuY2FsbCh0bywga2V5KSAmJiBrZXkgIT09IGV4Y2VwdClcbiAgICAgICAgX19kZWZQcm9wKHRvLCBrZXksIHsgZ2V0OiAoKSA9PiBmcm9tW2tleV0sIGVudW1lcmFibGU6ICEoZGVzYyA9IF9fZ2V0T3duUHJvcERlc2MoZnJvbSwga2V5KSkgfHwgZGVzYy5lbnVtZXJhYmxlIH0pO1xuICB9XG4gIHJldHVybiB0bztcbn07XG52YXIgX19yZUV4cG9ydCA9ICh0YXJnZXQsIG1vZCwgc2Vjb25kVGFyZ2V0KSA9PiAoX19jb3B5UHJvcHModGFyZ2V0LCBtb2QsIFwiZGVmYXVsdFwiKSwgc2Vjb25kVGFyZ2V0ICYmIF9fY29weVByb3BzKHNlY29uZFRhcmdldCwgbW9kLCBcImRlZmF1bHRcIikpO1xuXG4vLyBzcmMvZmlsbGVycy9tb25hY28tZWRpdG9yLWNvcmUudHNcbnZhciBtb25hY29fZWRpdG9yX2NvcmVfZXhwb3J0cyA9IHt9O1xuX19yZUV4cG9ydChtb25hY29fZWRpdG9yX2NvcmVfZXhwb3J0cywgbW9uYWNvX2VkaXRvcl9jb3JlX3N0YXIpO1xuaW1wb3J0ICogYXMgbW9uYWNvX2VkaXRvcl9jb3JlX3N0YXIgZnJvbSBcIi4uLy4uL2VkaXRvci9lZGl0b3IuYXBpLmpzXCI7XG5cbi8vIHNyYy9sYW5ndWFnZS9qc29uL3dvcmtlck1hbmFnZXIudHNcbnZhciBTVE9QX1dIRU5fSURMRV9GT1IgPSAyICogNjAgKiAxZTM7XG52YXIgV29ya2VyTWFuYWdlciA9IGNsYXNzIHtcbiAgX2RlZmF1bHRzO1xuICBfaWRsZUNoZWNrSW50ZXJ2YWw7XG4gIF9sYXN0VXNlZFRpbWU7XG4gIF9jb25maWdDaGFuZ2VMaXN0ZW5lcjtcbiAgX3dvcmtlcjtcbiAgX2NsaWVudDtcbiAgY29uc3RydWN0b3IoZGVmYXVsdHMpIHtcbiAgICB0aGlzLl9kZWZhdWx0cyA9IGRlZmF1bHRzO1xuICAgIHRoaXMuX3dvcmtlciA9IG51bGw7XG4gICAgdGhpcy5fY2xpZW50ID0gbnVsbDtcbiAgICB0aGlzLl9pZGxlQ2hlY2tJbnRlcnZhbCA9IHdpbmRvdy5zZXRJbnRlcnZhbCgoKSA9PiB0aGlzLl9jaGVja0lmSWRsZSgpLCAzMCAqIDFlMyk7XG4gICAgdGhpcy5fbGFzdFVzZWRUaW1lID0gMDtcbiAgICB0aGlzLl9jb25maWdDaGFuZ2VMaXN0ZW5lciA9IHRoaXMuX2RlZmF1bHRzLm9uRGlkQ2hhbmdlKCgpID0+IHRoaXMuX3N0b3BXb3JrZXIoKSk7XG4gIH1cbiAgX3N0b3BXb3JrZXIoKSB7XG4gICAgaWYgKHRoaXMuX3dvcmtlcikge1xuICAgICAgdGhpcy5fd29ya2VyLmRpc3Bvc2UoKTtcbiAgICAgIHRoaXMuX3dvcmtlciA9IG51bGw7XG4gICAgfVxuICAgIHRoaXMuX2NsaWVudCA9IG51bGw7XG4gIH1cbiAgZGlzcG9zZSgpIHtcbiAgICBjbGVhckludGVydmFsKHRoaXMuX2lkbGVDaGVja0ludGVydmFsKTtcbiAgICB0aGlzLl9jb25maWdDaGFuZ2VMaXN0ZW5lci5kaXNwb3NlKCk7XG4gICAgdGhpcy5fc3RvcFdvcmtlcigpO1xuICB9XG4gIF9jaGVja0lmSWRsZSgpIHtcbiAgICBpZiAoIXRoaXMuX3dvcmtlcikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBsZXQgdGltZVBhc3NlZFNpbmNlTGFzdFVzZWQgPSBEYXRlLm5vdygpIC0gdGhpcy5fbGFzdFVzZWRUaW1lO1xuICAgIGlmICh0aW1lUGFzc2VkU2luY2VMYXN0VXNlZCA+IFNUT1BfV0hFTl9JRExFX0ZPUikge1xuICAgICAgdGhpcy5fc3RvcFdvcmtlcigpO1xuICAgIH1cbiAgfVxuICBfZ2V0Q2xpZW50KCkge1xuICAgIHRoaXMuX2xhc3RVc2VkVGltZSA9IERhdGUubm93KCk7XG4gICAgaWYgKCF0aGlzLl9jbGllbnQpIHtcbiAgICAgIHRoaXMuX3dvcmtlciA9IG1vbmFjb19lZGl0b3JfY29yZV9leHBvcnRzLmVkaXRvci5jcmVhdGVXZWJXb3JrZXIoe1xuICAgICAgICBtb2R1bGVJZDogXCJ2cy9sYW5ndWFnZS9qc29uL2pzb25Xb3JrZXJcIixcbiAgICAgICAgbGFiZWw6IHRoaXMuX2RlZmF1bHRzLmxhbmd1YWdlSWQsXG4gICAgICAgIGNyZWF0ZURhdGE6IHtcbiAgICAgICAgICBsYW5ndWFnZVNldHRpbmdzOiB0aGlzLl9kZWZhdWx0cy5kaWFnbm9zdGljc09wdGlvbnMsXG4gICAgICAgICAgbGFuZ3VhZ2VJZDogdGhpcy5fZGVmYXVsdHMubGFuZ3VhZ2VJZCxcbiAgICAgICAgICBlbmFibGVTY2hlbWFSZXF1ZXN0OiB0aGlzLl9kZWZhdWx0cy5kaWFnbm9zdGljc09wdGlvbnMuZW5hYmxlU2NoZW1hUmVxdWVzdFxuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIHRoaXMuX2NsaWVudCA9IHRoaXMuX3dvcmtlci5nZXRQcm94eSgpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5fY2xpZW50O1xuICB9XG4gIGdldExhbmd1YWdlU2VydmljZVdvcmtlciguLi5yZXNvdXJjZXMpIHtcbiAgICBsZXQgX2NsaWVudDtcbiAgICByZXR1cm4gdGhpcy5fZ2V0Q2xpZW50KCkudGhlbigoY2xpZW50KSA9PiB7XG4gICAgICBfY2xpZW50ID0gY2xpZW50O1xuICAgIH0pLnRoZW4oKF8pID0+IHtcbiAgICAgIGlmICh0aGlzLl93b3JrZXIpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3dvcmtlci53aXRoU3luY2VkUmVzb3VyY2VzKHJlc291cmNlcyk7XG4gICAgICB9XG4gICAgfSkudGhlbigoXykgPT4gX2NsaWVudCk7XG4gIH1cbn07XG5cbi8vIG5vZGVfbW9kdWxlcy92c2NvZGUtbGFuZ3VhZ2VzZXJ2ZXItdHlwZXMvbGliL2VzbS9tYWluLmpzXG52YXIgaW50ZWdlcjtcbihmdW5jdGlvbihpbnRlZ2VyMikge1xuICBpbnRlZ2VyMi5NSU5fVkFMVUUgPSAtMjE0NzQ4MzY0ODtcbiAgaW50ZWdlcjIuTUFYX1ZBTFVFID0gMjE0NzQ4MzY0Nztcbn0pKGludGVnZXIgfHwgKGludGVnZXIgPSB7fSkpO1xudmFyIHVpbnRlZ2VyO1xuKGZ1bmN0aW9uKHVpbnRlZ2VyMikge1xuICB1aW50ZWdlcjIuTUlOX1ZBTFVFID0gMDtcbiAgdWludGVnZXIyLk1BWF9WQUxVRSA9IDIxNDc0ODM2NDc7XG59KSh1aW50ZWdlciB8fCAodWludGVnZXIgPSB7fSkpO1xudmFyIFBvc2l0aW9uO1xuKGZ1bmN0aW9uKFBvc2l0aW9uMykge1xuICBmdW5jdGlvbiBjcmVhdGUobGluZSwgY2hhcmFjdGVyKSB7XG4gICAgaWYgKGxpbmUgPT09IE51bWJlci5NQVhfVkFMVUUpIHtcbiAgICAgIGxpbmUgPSB1aW50ZWdlci5NQVhfVkFMVUU7XG4gICAgfVxuICAgIGlmIChjaGFyYWN0ZXIgPT09IE51bWJlci5NQVhfVkFMVUUpIHtcbiAgICAgIGNoYXJhY3RlciA9IHVpbnRlZ2VyLk1BWF9WQUxVRTtcbiAgICB9XG4gICAgcmV0dXJuIHsgbGluZSwgY2hhcmFjdGVyIH07XG4gIH1cbiAgUG9zaXRpb24zLmNyZWF0ZSA9IGNyZWF0ZTtcbiAgZnVuY3Rpb24gaXModmFsdWUpIHtcbiAgICB2YXIgY2FuZGlkYXRlID0gdmFsdWU7XG4gICAgcmV0dXJuIElzLm9iamVjdExpdGVyYWwoY2FuZGlkYXRlKSAmJiBJcy51aW50ZWdlcihjYW5kaWRhdGUubGluZSkgJiYgSXMudWludGVnZXIoY2FuZGlkYXRlLmNoYXJhY3Rlcik7XG4gIH1cbiAgUG9zaXRpb24zLmlzID0gaXM7XG59KShQb3NpdGlvbiB8fCAoUG9zaXRpb24gPSB7fSkpO1xudmFyIFJhbmdlO1xuKGZ1bmN0aW9uKFJhbmdlMykge1xuICBmdW5jdGlvbiBjcmVhdGUob25lLCB0d28sIHRocmVlLCBmb3VyKSB7XG4gICAgaWYgKElzLnVpbnRlZ2VyKG9uZSkgJiYgSXMudWludGVnZXIodHdvKSAmJiBJcy51aW50ZWdlcih0aHJlZSkgJiYgSXMudWludGVnZXIoZm91cikpIHtcbiAgICAgIHJldHVybiB7IHN0YXJ0OiBQb3NpdGlvbi5jcmVhdGUob25lLCB0d28pLCBlbmQ6IFBvc2l0aW9uLmNyZWF0ZSh0aHJlZSwgZm91cikgfTtcbiAgICB9IGVsc2UgaWYgKFBvc2l0aW9uLmlzKG9uZSkgJiYgUG9zaXRpb24uaXModHdvKSkge1xuICAgICAgcmV0dXJuIHsgc3RhcnQ6IG9uZSwgZW5kOiB0d28gfTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiUmFuZ2UjY3JlYXRlIGNhbGxlZCB3aXRoIGludmFsaWQgYXJndW1lbnRzW1wiICsgb25lICsgXCIsIFwiICsgdHdvICsgXCIsIFwiICsgdGhyZWUgKyBcIiwgXCIgKyBmb3VyICsgXCJdXCIpO1xuICAgIH1cbiAgfVxuICBSYW5nZTMuY3JlYXRlID0gY3JlYXRlO1xuICBmdW5jdGlvbiBpcyh2YWx1ZSkge1xuICAgIHZhciBjYW5kaWRhdGUgPSB2YWx1ZTtcbiAgICByZXR1cm4gSXMub2JqZWN0TGl0ZXJhbChjYW5kaWRhdGUpICYmIFBvc2l0aW9uLmlzKGNhbmRpZGF0ZS5zdGFydCkgJiYgUG9zaXRpb24uaXMoY2FuZGlkYXRlLmVuZCk7XG4gIH1cbiAgUmFuZ2UzLmlzID0gaXM7XG59KShSYW5nZSB8fCAoUmFuZ2UgPSB7fSkpO1xudmFyIExvY2F0aW9uO1xuKGZ1bmN0aW9uKExvY2F0aW9uMikge1xuICBmdW5jdGlvbiBjcmVhdGUodXJpLCByYW5nZSkge1xuICAgIHJldHVybiB7IHVyaSwgcmFuZ2UgfTtcbiAgfVxuICBMb2NhdGlvbjIuY3JlYXRlID0gY3JlYXRlO1xuICBmdW5jdGlvbiBpcyh2YWx1ZSkge1xuICAgIHZhciBjYW5kaWRhdGUgPSB2YWx1ZTtcbiAgICByZXR1cm4gSXMuZGVmaW5lZChjYW5kaWRhdGUpICYmIFJhbmdlLmlzKGNhbmRpZGF0ZS5yYW5nZSkgJiYgKElzLnN0cmluZyhjYW5kaWRhdGUudXJpKSB8fCBJcy51bmRlZmluZWQoY2FuZGlkYXRlLnVyaSkpO1xuICB9XG4gIExvY2F0aW9uMi5pcyA9IGlzO1xufSkoTG9jYXRpb24gfHwgKExvY2F0aW9uID0ge30pKTtcbnZhciBMb2NhdGlvbkxpbms7XG4oZnVuY3Rpb24oTG9jYXRpb25MaW5rMikge1xuICBmdW5jdGlvbiBjcmVhdGUodGFyZ2V0VXJpLCB0YXJnZXRSYW5nZSwgdGFyZ2V0U2VsZWN0aW9uUmFuZ2UsIG9yaWdpblNlbGVjdGlvblJhbmdlKSB7XG4gICAgcmV0dXJuIHsgdGFyZ2V0VXJpLCB0YXJnZXRSYW5nZSwgdGFyZ2V0U2VsZWN0aW9uUmFuZ2UsIG9yaWdpblNlbGVjdGlvblJhbmdlIH07XG4gIH1cbiAgTG9jYXRpb25MaW5rMi5jcmVhdGUgPSBjcmVhdGU7XG4gIGZ1bmN0aW9uIGlzKHZhbHVlKSB7XG4gICAgdmFyIGNhbmRpZGF0ZSA9IHZhbHVlO1xuICAgIHJldHVybiBJcy5kZWZpbmVkKGNhbmRpZGF0ZSkgJiYgUmFuZ2UuaXMoY2FuZGlkYXRlLnRhcmdldFJhbmdlKSAmJiBJcy5zdHJpbmcoY2FuZGlkYXRlLnRhcmdldFVyaSkgJiYgKFJhbmdlLmlzKGNhbmRpZGF0ZS50YXJnZXRTZWxlY3Rpb25SYW5nZSkgfHwgSXMudW5kZWZpbmVkKGNhbmRpZGF0ZS50YXJnZXRTZWxlY3Rpb25SYW5nZSkpICYmIChSYW5nZS5pcyhjYW5kaWRhdGUub3JpZ2luU2VsZWN0aW9uUmFuZ2UpIHx8IElzLnVuZGVmaW5lZChjYW5kaWRhdGUub3JpZ2luU2VsZWN0aW9uUmFuZ2UpKTtcbiAgfVxuICBMb2NhdGlvbkxpbmsyLmlzID0gaXM7XG59KShMb2NhdGlvbkxpbmsgfHwgKExvY2F0aW9uTGluayA9IHt9KSk7XG52YXIgQ29sb3I7XG4oZnVuY3Rpb24oQ29sb3IyKSB7XG4gIGZ1bmN0aW9uIGNyZWF0ZShyZWQsIGdyZWVuLCBibHVlLCBhbHBoYSkge1xuICAgIHJldHVybiB7XG4gICAgICByZWQsXG4gICAgICBncmVlbixcbiAgICAgIGJsdWUsXG4gICAgICBhbHBoYVxuICAgIH07XG4gIH1cbiAgQ29sb3IyLmNyZWF0ZSA9IGNyZWF0ZTtcbiAgZnVuY3Rpb24gaXModmFsdWUpIHtcbiAgICB2YXIgY2FuZGlkYXRlID0gdmFsdWU7XG4gICAgcmV0dXJuIElzLm51bWJlclJhbmdlKGNhbmRpZGF0ZS5yZWQsIDAsIDEpICYmIElzLm51bWJlclJhbmdlKGNhbmRpZGF0ZS5ncmVlbiwgMCwgMSkgJiYgSXMubnVtYmVyUmFuZ2UoY2FuZGlkYXRlLmJsdWUsIDAsIDEpICYmIElzLm51bWJlclJhbmdlKGNhbmRpZGF0ZS5hbHBoYSwgMCwgMSk7XG4gIH1cbiAgQ29sb3IyLmlzID0gaXM7XG59KShDb2xvciB8fCAoQ29sb3IgPSB7fSkpO1xudmFyIENvbG9ySW5mb3JtYXRpb247XG4oZnVuY3Rpb24oQ29sb3JJbmZvcm1hdGlvbjIpIHtcbiAgZnVuY3Rpb24gY3JlYXRlKHJhbmdlLCBjb2xvcikge1xuICAgIHJldHVybiB7XG4gICAgICByYW5nZSxcbiAgICAgIGNvbG9yXG4gICAgfTtcbiAgfVxuICBDb2xvckluZm9ybWF0aW9uMi5jcmVhdGUgPSBjcmVhdGU7XG4gIGZ1bmN0aW9uIGlzKHZhbHVlKSB7XG4gICAgdmFyIGNhbmRpZGF0ZSA9IHZhbHVlO1xuICAgIHJldHVybiBSYW5nZS5pcyhjYW5kaWRhdGUucmFuZ2UpICYmIENvbG9yLmlzKGNhbmRpZGF0ZS5jb2xvcik7XG4gIH1cbiAgQ29sb3JJbmZvcm1hdGlvbjIuaXMgPSBpcztcbn0pKENvbG9ySW5mb3JtYXRpb24gfHwgKENvbG9ySW5mb3JtYXRpb24gPSB7fSkpO1xudmFyIENvbG9yUHJlc2VudGF0aW9uO1xuKGZ1bmN0aW9uKENvbG9yUHJlc2VudGF0aW9uMikge1xuICBmdW5jdGlvbiBjcmVhdGUobGFiZWwsIHRleHRFZGl0LCBhZGRpdGlvbmFsVGV4dEVkaXRzKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGxhYmVsLFxuICAgICAgdGV4dEVkaXQsXG4gICAgICBhZGRpdGlvbmFsVGV4dEVkaXRzXG4gICAgfTtcbiAgfVxuICBDb2xvclByZXNlbnRhdGlvbjIuY3JlYXRlID0gY3JlYXRlO1xuICBmdW5jdGlvbiBpcyh2YWx1ZSkge1xuICAgIHZhciBjYW5kaWRhdGUgPSB2YWx1ZTtcbiAgICByZXR1cm4gSXMuc3RyaW5nKGNhbmRpZGF0ZS5sYWJlbCkgJiYgKElzLnVuZGVmaW5lZChjYW5kaWRhdGUudGV4dEVkaXQpIHx8IFRleHRFZGl0LmlzKGNhbmRpZGF0ZSkpICYmIChJcy51bmRlZmluZWQoY2FuZGlkYXRlLmFkZGl0aW9uYWxUZXh0RWRpdHMpIHx8IElzLnR5cGVkQXJyYXkoY2FuZGlkYXRlLmFkZGl0aW9uYWxUZXh0RWRpdHMsIFRleHRFZGl0LmlzKSk7XG4gIH1cbiAgQ29sb3JQcmVzZW50YXRpb24yLmlzID0gaXM7XG59KShDb2xvclByZXNlbnRhdGlvbiB8fCAoQ29sb3JQcmVzZW50YXRpb24gPSB7fSkpO1xudmFyIEZvbGRpbmdSYW5nZUtpbmQ7XG4oZnVuY3Rpb24oRm9sZGluZ1JhbmdlS2luZDIpIHtcbiAgRm9sZGluZ1JhbmdlS2luZDJbXCJDb21tZW50XCJdID0gXCJjb21tZW50XCI7XG4gIEZvbGRpbmdSYW5nZUtpbmQyW1wiSW1wb3J0c1wiXSA9IFwiaW1wb3J0c1wiO1xuICBGb2xkaW5nUmFuZ2VLaW5kMltcIlJlZ2lvblwiXSA9IFwicmVnaW9uXCI7XG59KShGb2xkaW5nUmFuZ2VLaW5kIHx8IChGb2xkaW5nUmFuZ2VLaW5kID0ge30pKTtcbnZhciBGb2xkaW5nUmFuZ2U7XG4oZnVuY3Rpb24oRm9sZGluZ1JhbmdlMikge1xuICBmdW5jdGlvbiBjcmVhdGUoc3RhcnRMaW5lLCBlbmRMaW5lLCBzdGFydENoYXJhY3RlciwgZW5kQ2hhcmFjdGVyLCBraW5kKSB7XG4gICAgdmFyIHJlc3VsdCA9IHtcbiAgICAgIHN0YXJ0TGluZSxcbiAgICAgIGVuZExpbmVcbiAgICB9O1xuICAgIGlmIChJcy5kZWZpbmVkKHN0YXJ0Q2hhcmFjdGVyKSkge1xuICAgICAgcmVzdWx0LnN0YXJ0Q2hhcmFjdGVyID0gc3RhcnRDaGFyYWN0ZXI7XG4gICAgfVxuICAgIGlmIChJcy5kZWZpbmVkKGVuZENoYXJhY3RlcikpIHtcbiAgICAgIHJlc3VsdC5lbmRDaGFyYWN0ZXIgPSBlbmRDaGFyYWN0ZXI7XG4gICAgfVxuICAgIGlmIChJcy5kZWZpbmVkKGtpbmQpKSB7XG4gICAgICByZXN1bHQua2luZCA9IGtpbmQ7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cbiAgRm9sZGluZ1JhbmdlMi5jcmVhdGUgPSBjcmVhdGU7XG4gIGZ1bmN0aW9uIGlzKHZhbHVlKSB7XG4gICAgdmFyIGNhbmRpZGF0ZSA9IHZhbHVlO1xuICAgIHJldHVybiBJcy51aW50ZWdlcihjYW5kaWRhdGUuc3RhcnRMaW5lKSAmJiBJcy51aW50ZWdlcihjYW5kaWRhdGUuc3RhcnRMaW5lKSAmJiAoSXMudW5kZWZpbmVkKGNhbmRpZGF0ZS5zdGFydENoYXJhY3RlcikgfHwgSXMudWludGVnZXIoY2FuZGlkYXRlLnN0YXJ0Q2hhcmFjdGVyKSkgJiYgKElzLnVuZGVmaW5lZChjYW5kaWRhdGUuZW5kQ2hhcmFjdGVyKSB8fCBJcy51aW50ZWdlcihjYW5kaWRhdGUuZW5kQ2hhcmFjdGVyKSkgJiYgKElzLnVuZGVmaW5lZChjYW5kaWRhdGUua2luZCkgfHwgSXMuc3RyaW5nKGNhbmRpZGF0ZS5raW5kKSk7XG4gIH1cbiAgRm9sZGluZ1JhbmdlMi5pcyA9IGlzO1xufSkoRm9sZGluZ1JhbmdlIHx8IChGb2xkaW5nUmFuZ2UgPSB7fSkpO1xudmFyIERpYWdub3N0aWNSZWxhdGVkSW5mb3JtYXRpb247XG4oZnVuY3Rpb24oRGlhZ25vc3RpY1JlbGF0ZWRJbmZvcm1hdGlvbjIpIHtcbiAgZnVuY3Rpb24gY3JlYXRlKGxvY2F0aW9uLCBtZXNzYWdlKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGxvY2F0aW9uLFxuICAgICAgbWVzc2FnZVxuICAgIH07XG4gIH1cbiAgRGlhZ25vc3RpY1JlbGF0ZWRJbmZvcm1hdGlvbjIuY3JlYXRlID0gY3JlYXRlO1xuICBmdW5jdGlvbiBpcyh2YWx1ZSkge1xuICAgIHZhciBjYW5kaWRhdGUgPSB2YWx1ZTtcbiAgICByZXR1cm4gSXMuZGVmaW5lZChjYW5kaWRhdGUpICYmIExvY2F0aW9uLmlzKGNhbmRpZGF0ZS5sb2NhdGlvbikgJiYgSXMuc3RyaW5nKGNhbmRpZGF0ZS5tZXNzYWdlKTtcbiAgfVxuICBEaWFnbm9zdGljUmVsYXRlZEluZm9ybWF0aW9uMi5pcyA9IGlzO1xufSkoRGlhZ25vc3RpY1JlbGF0ZWRJbmZvcm1hdGlvbiB8fCAoRGlhZ25vc3RpY1JlbGF0ZWRJbmZvcm1hdGlvbiA9IHt9KSk7XG52YXIgRGlhZ25vc3RpY1NldmVyaXR5O1xuKGZ1bmN0aW9uKERpYWdub3N0aWNTZXZlcml0eTIpIHtcbiAgRGlhZ25vc3RpY1NldmVyaXR5Mi5FcnJvciA9IDE7XG4gIERpYWdub3N0aWNTZXZlcml0eTIuV2FybmluZyA9IDI7XG4gIERpYWdub3N0aWNTZXZlcml0eTIuSW5mb3JtYXRpb24gPSAzO1xuICBEaWFnbm9zdGljU2V2ZXJpdHkyLkhpbnQgPSA0O1xufSkoRGlhZ25vc3RpY1NldmVyaXR5IHx8IChEaWFnbm9zdGljU2V2ZXJpdHkgPSB7fSkpO1xudmFyIERpYWdub3N0aWNUYWc7XG4oZnVuY3Rpb24oRGlhZ25vc3RpY1RhZzIpIHtcbiAgRGlhZ25vc3RpY1RhZzIuVW5uZWNlc3NhcnkgPSAxO1xuICBEaWFnbm9zdGljVGFnMi5EZXByZWNhdGVkID0gMjtcbn0pKERpYWdub3N0aWNUYWcgfHwgKERpYWdub3N0aWNUYWcgPSB7fSkpO1xudmFyIENvZGVEZXNjcmlwdGlvbjtcbihmdW5jdGlvbihDb2RlRGVzY3JpcHRpb24yKSB7XG4gIGZ1bmN0aW9uIGlzKHZhbHVlKSB7XG4gICAgdmFyIGNhbmRpZGF0ZSA9IHZhbHVlO1xuICAgIHJldHVybiBjYW5kaWRhdGUgIT09IHZvaWQgMCAmJiBjYW5kaWRhdGUgIT09IG51bGwgJiYgSXMuc3RyaW5nKGNhbmRpZGF0ZS5ocmVmKTtcbiAgfVxuICBDb2RlRGVzY3JpcHRpb24yLmlzID0gaXM7XG59KShDb2RlRGVzY3JpcHRpb24gfHwgKENvZGVEZXNjcmlwdGlvbiA9IHt9KSk7XG52YXIgRGlhZ25vc3RpYztcbihmdW5jdGlvbihEaWFnbm9zdGljMikge1xuICBmdW5jdGlvbiBjcmVhdGUocmFuZ2UsIG1lc3NhZ2UsIHNldmVyaXR5LCBjb2RlLCBzb3VyY2UsIHJlbGF0ZWRJbmZvcm1hdGlvbikge1xuICAgIHZhciByZXN1bHQgPSB7IHJhbmdlLCBtZXNzYWdlIH07XG4gICAgaWYgKElzLmRlZmluZWQoc2V2ZXJpdHkpKSB7XG4gICAgICByZXN1bHQuc2V2ZXJpdHkgPSBzZXZlcml0eTtcbiAgICB9XG4gICAgaWYgKElzLmRlZmluZWQoY29kZSkpIHtcbiAgICAgIHJlc3VsdC5jb2RlID0gY29kZTtcbiAgICB9XG4gICAgaWYgKElzLmRlZmluZWQoc291cmNlKSkge1xuICAgICAgcmVzdWx0LnNvdXJjZSA9IHNvdXJjZTtcbiAgICB9XG4gICAgaWYgKElzLmRlZmluZWQocmVsYXRlZEluZm9ybWF0aW9uKSkge1xuICAgICAgcmVzdWx0LnJlbGF0ZWRJbmZvcm1hdGlvbiA9IHJlbGF0ZWRJbmZvcm1hdGlvbjtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuICBEaWFnbm9zdGljMi5jcmVhdGUgPSBjcmVhdGU7XG4gIGZ1bmN0aW9uIGlzKHZhbHVlKSB7XG4gICAgdmFyIF9hO1xuICAgIHZhciBjYW5kaWRhdGUgPSB2YWx1ZTtcbiAgICByZXR1cm4gSXMuZGVmaW5lZChjYW5kaWRhdGUpICYmIFJhbmdlLmlzKGNhbmRpZGF0ZS5yYW5nZSkgJiYgSXMuc3RyaW5nKGNhbmRpZGF0ZS5tZXNzYWdlKSAmJiAoSXMubnVtYmVyKGNhbmRpZGF0ZS5zZXZlcml0eSkgfHwgSXMudW5kZWZpbmVkKGNhbmRpZGF0ZS5zZXZlcml0eSkpICYmIChJcy5pbnRlZ2VyKGNhbmRpZGF0ZS5jb2RlKSB8fCBJcy5zdHJpbmcoY2FuZGlkYXRlLmNvZGUpIHx8IElzLnVuZGVmaW5lZChjYW5kaWRhdGUuY29kZSkpICYmIChJcy51bmRlZmluZWQoY2FuZGlkYXRlLmNvZGVEZXNjcmlwdGlvbikgfHwgSXMuc3RyaW5nKChfYSA9IGNhbmRpZGF0ZS5jb2RlRGVzY3JpcHRpb24pID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5ocmVmKSkgJiYgKElzLnN0cmluZyhjYW5kaWRhdGUuc291cmNlKSB8fCBJcy51bmRlZmluZWQoY2FuZGlkYXRlLnNvdXJjZSkpICYmIChJcy51bmRlZmluZWQoY2FuZGlkYXRlLnJlbGF0ZWRJbmZvcm1hdGlvbikgfHwgSXMudHlwZWRBcnJheShjYW5kaWRhdGUucmVsYXRlZEluZm9ybWF0aW9uLCBEaWFnbm9zdGljUmVsYXRlZEluZm9ybWF0aW9uLmlzKSk7XG4gIH1cbiAgRGlhZ25vc3RpYzIuaXMgPSBpcztcbn0pKERpYWdub3N0aWMgfHwgKERpYWdub3N0aWMgPSB7fSkpO1xudmFyIENvbW1hbmQ7XG4oZnVuY3Rpb24oQ29tbWFuZDIpIHtcbiAgZnVuY3Rpb24gY3JlYXRlKHRpdGxlLCBjb21tYW5kKSB7XG4gICAgdmFyIGFyZ3MgPSBbXTtcbiAgICBmb3IgKHZhciBfaSA9IDI7IF9pIDwgYXJndW1lbnRzLmxlbmd0aDsgX2krKykge1xuICAgICAgYXJnc1tfaSAtIDJdID0gYXJndW1lbnRzW19pXTtcbiAgICB9XG4gICAgdmFyIHJlc3VsdCA9IHsgdGl0bGUsIGNvbW1hbmQgfTtcbiAgICBpZiAoSXMuZGVmaW5lZChhcmdzKSAmJiBhcmdzLmxlbmd0aCA+IDApIHtcbiAgICAgIHJlc3VsdC5hcmd1bWVudHMgPSBhcmdzO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG4gIENvbW1hbmQyLmNyZWF0ZSA9IGNyZWF0ZTtcbiAgZnVuY3Rpb24gaXModmFsdWUpIHtcbiAgICB2YXIgY2FuZGlkYXRlID0gdmFsdWU7XG4gICAgcmV0dXJuIElzLmRlZmluZWQoY2FuZGlkYXRlKSAmJiBJcy5zdHJpbmcoY2FuZGlkYXRlLnRpdGxlKSAmJiBJcy5zdHJpbmcoY2FuZGlkYXRlLmNvbW1hbmQpO1xuICB9XG4gIENvbW1hbmQyLmlzID0gaXM7XG59KShDb21tYW5kIHx8IChDb21tYW5kID0ge30pKTtcbnZhciBUZXh0RWRpdDtcbihmdW5jdGlvbihUZXh0RWRpdDIpIHtcbiAgZnVuY3Rpb24gcmVwbGFjZShyYW5nZSwgbmV3VGV4dCkge1xuICAgIHJldHVybiB7IHJhbmdlLCBuZXdUZXh0IH07XG4gIH1cbiAgVGV4dEVkaXQyLnJlcGxhY2UgPSByZXBsYWNlO1xuICBmdW5jdGlvbiBpbnNlcnQocG9zaXRpb24sIG5ld1RleHQpIHtcbiAgICByZXR1cm4geyByYW5nZTogeyBzdGFydDogcG9zaXRpb24sIGVuZDogcG9zaXRpb24gfSwgbmV3VGV4dCB9O1xuICB9XG4gIFRleHRFZGl0Mi5pbnNlcnQgPSBpbnNlcnQ7XG4gIGZ1bmN0aW9uIGRlbChyYW5nZSkge1xuICAgIHJldHVybiB7IHJhbmdlLCBuZXdUZXh0OiBcIlwiIH07XG4gIH1cbiAgVGV4dEVkaXQyLmRlbCA9IGRlbDtcbiAgZnVuY3Rpb24gaXModmFsdWUpIHtcbiAgICB2YXIgY2FuZGlkYXRlID0gdmFsdWU7XG4gICAgcmV0dXJuIElzLm9iamVjdExpdGVyYWwoY2FuZGlkYXRlKSAmJiBJcy5zdHJpbmcoY2FuZGlkYXRlLm5ld1RleHQpICYmIFJhbmdlLmlzKGNhbmRpZGF0ZS5yYW5nZSk7XG4gIH1cbiAgVGV4dEVkaXQyLmlzID0gaXM7XG59KShUZXh0RWRpdCB8fCAoVGV4dEVkaXQgPSB7fSkpO1xudmFyIENoYW5nZUFubm90YXRpb247XG4oZnVuY3Rpb24oQ2hhbmdlQW5ub3RhdGlvbjIpIHtcbiAgZnVuY3Rpb24gY3JlYXRlKGxhYmVsLCBuZWVkc0NvbmZpcm1hdGlvbiwgZGVzY3JpcHRpb24pIHtcbiAgICB2YXIgcmVzdWx0ID0geyBsYWJlbCB9O1xuICAgIGlmIChuZWVkc0NvbmZpcm1hdGlvbiAhPT0gdm9pZCAwKSB7XG4gICAgICByZXN1bHQubmVlZHNDb25maXJtYXRpb24gPSBuZWVkc0NvbmZpcm1hdGlvbjtcbiAgICB9XG4gICAgaWYgKGRlc2NyaXB0aW9uICE9PSB2b2lkIDApIHtcbiAgICAgIHJlc3VsdC5kZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG4gIENoYW5nZUFubm90YXRpb24yLmNyZWF0ZSA9IGNyZWF0ZTtcbiAgZnVuY3Rpb24gaXModmFsdWUpIHtcbiAgICB2YXIgY2FuZGlkYXRlID0gdmFsdWU7XG4gICAgcmV0dXJuIGNhbmRpZGF0ZSAhPT0gdm9pZCAwICYmIElzLm9iamVjdExpdGVyYWwoY2FuZGlkYXRlKSAmJiBJcy5zdHJpbmcoY2FuZGlkYXRlLmxhYmVsKSAmJiAoSXMuYm9vbGVhbihjYW5kaWRhdGUubmVlZHNDb25maXJtYXRpb24pIHx8IGNhbmRpZGF0ZS5uZWVkc0NvbmZpcm1hdGlvbiA9PT0gdm9pZCAwKSAmJiAoSXMuc3RyaW5nKGNhbmRpZGF0ZS5kZXNjcmlwdGlvbikgfHwgY2FuZGlkYXRlLmRlc2NyaXB0aW9uID09PSB2b2lkIDApO1xuICB9XG4gIENoYW5nZUFubm90YXRpb24yLmlzID0gaXM7XG59KShDaGFuZ2VBbm5vdGF0aW9uIHx8IChDaGFuZ2VBbm5vdGF0aW9uID0ge30pKTtcbnZhciBDaGFuZ2VBbm5vdGF0aW9uSWRlbnRpZmllcjtcbihmdW5jdGlvbihDaGFuZ2VBbm5vdGF0aW9uSWRlbnRpZmllcjIpIHtcbiAgZnVuY3Rpb24gaXModmFsdWUpIHtcbiAgICB2YXIgY2FuZGlkYXRlID0gdmFsdWU7XG4gICAgcmV0dXJuIHR5cGVvZiBjYW5kaWRhdGUgPT09IFwic3RyaW5nXCI7XG4gIH1cbiAgQ2hhbmdlQW5ub3RhdGlvbklkZW50aWZpZXIyLmlzID0gaXM7XG59KShDaGFuZ2VBbm5vdGF0aW9uSWRlbnRpZmllciB8fCAoQ2hhbmdlQW5ub3RhdGlvbklkZW50aWZpZXIgPSB7fSkpO1xudmFyIEFubm90YXRlZFRleHRFZGl0O1xuKGZ1bmN0aW9uKEFubm90YXRlZFRleHRFZGl0Mikge1xuICBmdW5jdGlvbiByZXBsYWNlKHJhbmdlLCBuZXdUZXh0LCBhbm5vdGF0aW9uKSB7XG4gICAgcmV0dXJuIHsgcmFuZ2UsIG5ld1RleHQsIGFubm90YXRpb25JZDogYW5ub3RhdGlvbiB9O1xuICB9XG4gIEFubm90YXRlZFRleHRFZGl0Mi5yZXBsYWNlID0gcmVwbGFjZTtcbiAgZnVuY3Rpb24gaW5zZXJ0KHBvc2l0aW9uLCBuZXdUZXh0LCBhbm5vdGF0aW9uKSB7XG4gICAgcmV0dXJuIHsgcmFuZ2U6IHsgc3RhcnQ6IHBvc2l0aW9uLCBlbmQ6IHBvc2l0aW9uIH0sIG5ld1RleHQsIGFubm90YXRpb25JZDogYW5ub3RhdGlvbiB9O1xuICB9XG4gIEFubm90YXRlZFRleHRFZGl0Mi5pbnNlcnQgPSBpbnNlcnQ7XG4gIGZ1bmN0aW9uIGRlbChyYW5nZSwgYW5ub3RhdGlvbikge1xuICAgIHJldHVybiB7IHJhbmdlLCBuZXdUZXh0OiBcIlwiLCBhbm5vdGF0aW9uSWQ6IGFubm90YXRpb24gfTtcbiAgfVxuICBBbm5vdGF0ZWRUZXh0RWRpdDIuZGVsID0gZGVsO1xuICBmdW5jdGlvbiBpcyh2YWx1ZSkge1xuICAgIHZhciBjYW5kaWRhdGUgPSB2YWx1ZTtcbiAgICByZXR1cm4gVGV4dEVkaXQuaXMoY2FuZGlkYXRlKSAmJiAoQ2hhbmdlQW5ub3RhdGlvbi5pcyhjYW5kaWRhdGUuYW5ub3RhdGlvbklkKSB8fCBDaGFuZ2VBbm5vdGF0aW9uSWRlbnRpZmllci5pcyhjYW5kaWRhdGUuYW5ub3RhdGlvbklkKSk7XG4gIH1cbiAgQW5ub3RhdGVkVGV4dEVkaXQyLmlzID0gaXM7XG59KShBbm5vdGF0ZWRUZXh0RWRpdCB8fCAoQW5ub3RhdGVkVGV4dEVkaXQgPSB7fSkpO1xudmFyIFRleHREb2N1bWVudEVkaXQ7XG4oZnVuY3Rpb24oVGV4dERvY3VtZW50RWRpdDIpIHtcbiAgZnVuY3Rpb24gY3JlYXRlKHRleHREb2N1bWVudCwgZWRpdHMpIHtcbiAgICByZXR1cm4geyB0ZXh0RG9jdW1lbnQsIGVkaXRzIH07XG4gIH1cbiAgVGV4dERvY3VtZW50RWRpdDIuY3JlYXRlID0gY3JlYXRlO1xuICBmdW5jdGlvbiBpcyh2YWx1ZSkge1xuICAgIHZhciBjYW5kaWRhdGUgPSB2YWx1ZTtcbiAgICByZXR1cm4gSXMuZGVmaW5lZChjYW5kaWRhdGUpICYmIE9wdGlvbmFsVmVyc2lvbmVkVGV4dERvY3VtZW50SWRlbnRpZmllci5pcyhjYW5kaWRhdGUudGV4dERvY3VtZW50KSAmJiBBcnJheS5pc0FycmF5KGNhbmRpZGF0ZS5lZGl0cyk7XG4gIH1cbiAgVGV4dERvY3VtZW50RWRpdDIuaXMgPSBpcztcbn0pKFRleHREb2N1bWVudEVkaXQgfHwgKFRleHREb2N1bWVudEVkaXQgPSB7fSkpO1xudmFyIENyZWF0ZUZpbGU7XG4oZnVuY3Rpb24oQ3JlYXRlRmlsZTIpIHtcbiAgZnVuY3Rpb24gY3JlYXRlKHVyaSwgb3B0aW9ucywgYW5ub3RhdGlvbikge1xuICAgIHZhciByZXN1bHQgPSB7XG4gICAgICBraW5kOiBcImNyZWF0ZVwiLFxuICAgICAgdXJpXG4gICAgfTtcbiAgICBpZiAob3B0aW9ucyAhPT0gdm9pZCAwICYmIChvcHRpb25zLm92ZXJ3cml0ZSAhPT0gdm9pZCAwIHx8IG9wdGlvbnMuaWdub3JlSWZFeGlzdHMgIT09IHZvaWQgMCkpIHtcbiAgICAgIHJlc3VsdC5vcHRpb25zID0gb3B0aW9ucztcbiAgICB9XG4gICAgaWYgKGFubm90YXRpb24gIT09IHZvaWQgMCkge1xuICAgICAgcmVzdWx0LmFubm90YXRpb25JZCA9IGFubm90YXRpb247XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cbiAgQ3JlYXRlRmlsZTIuY3JlYXRlID0gY3JlYXRlO1xuICBmdW5jdGlvbiBpcyh2YWx1ZSkge1xuICAgIHZhciBjYW5kaWRhdGUgPSB2YWx1ZTtcbiAgICByZXR1cm4gY2FuZGlkYXRlICYmIGNhbmRpZGF0ZS5raW5kID09PSBcImNyZWF0ZVwiICYmIElzLnN0cmluZyhjYW5kaWRhdGUudXJpKSAmJiAoY2FuZGlkYXRlLm9wdGlvbnMgPT09IHZvaWQgMCB8fCAoY2FuZGlkYXRlLm9wdGlvbnMub3ZlcndyaXRlID09PSB2b2lkIDAgfHwgSXMuYm9vbGVhbihjYW5kaWRhdGUub3B0aW9ucy5vdmVyd3JpdGUpKSAmJiAoY2FuZGlkYXRlLm9wdGlvbnMuaWdub3JlSWZFeGlzdHMgPT09IHZvaWQgMCB8fCBJcy5ib29sZWFuKGNhbmRpZGF0ZS5vcHRpb25zLmlnbm9yZUlmRXhpc3RzKSkpICYmIChjYW5kaWRhdGUuYW5ub3RhdGlvbklkID09PSB2b2lkIDAgfHwgQ2hhbmdlQW5ub3RhdGlvbklkZW50aWZpZXIuaXMoY2FuZGlkYXRlLmFubm90YXRpb25JZCkpO1xuICB9XG4gIENyZWF0ZUZpbGUyLmlzID0gaXM7XG59KShDcmVhdGVGaWxlIHx8IChDcmVhdGVGaWxlID0ge30pKTtcbnZhciBSZW5hbWVGaWxlO1xuKGZ1bmN0aW9uKFJlbmFtZUZpbGUyKSB7XG4gIGZ1bmN0aW9uIGNyZWF0ZShvbGRVcmksIG5ld1VyaSwgb3B0aW9ucywgYW5ub3RhdGlvbikge1xuICAgIHZhciByZXN1bHQgPSB7XG4gICAgICBraW5kOiBcInJlbmFtZVwiLFxuICAgICAgb2xkVXJpLFxuICAgICAgbmV3VXJpXG4gICAgfTtcbiAgICBpZiAob3B0aW9ucyAhPT0gdm9pZCAwICYmIChvcHRpb25zLm92ZXJ3cml0ZSAhPT0gdm9pZCAwIHx8IG9wdGlvbnMuaWdub3JlSWZFeGlzdHMgIT09IHZvaWQgMCkpIHtcbiAgICAgIHJlc3VsdC5vcHRpb25zID0gb3B0aW9ucztcbiAgICB9XG4gICAgaWYgKGFubm90YXRpb24gIT09IHZvaWQgMCkge1xuICAgICAgcmVzdWx0LmFubm90YXRpb25JZCA9IGFubm90YXRpb247XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cbiAgUmVuYW1lRmlsZTIuY3JlYXRlID0gY3JlYXRlO1xuICBmdW5jdGlvbiBpcyh2YWx1ZSkge1xuICAgIHZhciBjYW5kaWRhdGUgPSB2YWx1ZTtcbiAgICByZXR1cm4gY2FuZGlkYXRlICYmIGNhbmRpZGF0ZS5raW5kID09PSBcInJlbmFtZVwiICYmIElzLnN0cmluZyhjYW5kaWRhdGUub2xkVXJpKSAmJiBJcy5zdHJpbmcoY2FuZGlkYXRlLm5ld1VyaSkgJiYgKGNhbmRpZGF0ZS5vcHRpb25zID09PSB2b2lkIDAgfHwgKGNhbmRpZGF0ZS5vcHRpb25zLm92ZXJ3cml0ZSA9PT0gdm9pZCAwIHx8IElzLmJvb2xlYW4oY2FuZGlkYXRlLm9wdGlvbnMub3ZlcndyaXRlKSkgJiYgKGNhbmRpZGF0ZS5vcHRpb25zLmlnbm9yZUlmRXhpc3RzID09PSB2b2lkIDAgfHwgSXMuYm9vbGVhbihjYW5kaWRhdGUub3B0aW9ucy5pZ25vcmVJZkV4aXN0cykpKSAmJiAoY2FuZGlkYXRlLmFubm90YXRpb25JZCA9PT0gdm9pZCAwIHx8IENoYW5nZUFubm90YXRpb25JZGVudGlmaWVyLmlzKGNhbmRpZGF0ZS5hbm5vdGF0aW9uSWQpKTtcbiAgfVxuICBSZW5hbWVGaWxlMi5pcyA9IGlzO1xufSkoUmVuYW1lRmlsZSB8fCAoUmVuYW1lRmlsZSA9IHt9KSk7XG52YXIgRGVsZXRlRmlsZTtcbihmdW5jdGlvbihEZWxldGVGaWxlMikge1xuICBmdW5jdGlvbiBjcmVhdGUodXJpLCBvcHRpb25zLCBhbm5vdGF0aW9uKSB7XG4gICAgdmFyIHJlc3VsdCA9IHtcbiAgICAgIGtpbmQ6IFwiZGVsZXRlXCIsXG4gICAgICB1cmlcbiAgICB9O1xuICAgIGlmIChvcHRpb25zICE9PSB2b2lkIDAgJiYgKG9wdGlvbnMucmVjdXJzaXZlICE9PSB2b2lkIDAgfHwgb3B0aW9ucy5pZ25vcmVJZk5vdEV4aXN0cyAhPT0gdm9pZCAwKSkge1xuICAgICAgcmVzdWx0Lm9wdGlvbnMgPSBvcHRpb25zO1xuICAgIH1cbiAgICBpZiAoYW5ub3RhdGlvbiAhPT0gdm9pZCAwKSB7XG4gICAgICByZXN1bHQuYW5ub3RhdGlvbklkID0gYW5ub3RhdGlvbjtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuICBEZWxldGVGaWxlMi5jcmVhdGUgPSBjcmVhdGU7XG4gIGZ1bmN0aW9uIGlzKHZhbHVlKSB7XG4gICAgdmFyIGNhbmRpZGF0ZSA9IHZhbHVlO1xuICAgIHJldHVybiBjYW5kaWRhdGUgJiYgY2FuZGlkYXRlLmtpbmQgPT09IFwiZGVsZXRlXCIgJiYgSXMuc3RyaW5nKGNhbmRpZGF0ZS51cmkpICYmIChjYW5kaWRhdGUub3B0aW9ucyA9PT0gdm9pZCAwIHx8IChjYW5kaWRhdGUub3B0aW9ucy5yZWN1cnNpdmUgPT09IHZvaWQgMCB8fCBJcy5ib29sZWFuKGNhbmRpZGF0ZS5vcHRpb25zLnJlY3Vyc2l2ZSkpICYmIChjYW5kaWRhdGUub3B0aW9ucy5pZ25vcmVJZk5vdEV4aXN0cyA9PT0gdm9pZCAwIHx8IElzLmJvb2xlYW4oY2FuZGlkYXRlLm9wdGlvbnMuaWdub3JlSWZOb3RFeGlzdHMpKSkgJiYgKGNhbmRpZGF0ZS5hbm5vdGF0aW9uSWQgPT09IHZvaWQgMCB8fCBDaGFuZ2VBbm5vdGF0aW9uSWRlbnRpZmllci5pcyhjYW5kaWRhdGUuYW5ub3RhdGlvbklkKSk7XG4gIH1cbiAgRGVsZXRlRmlsZTIuaXMgPSBpcztcbn0pKERlbGV0ZUZpbGUgfHwgKERlbGV0ZUZpbGUgPSB7fSkpO1xudmFyIFdvcmtzcGFjZUVkaXQ7XG4oZnVuY3Rpb24oV29ya3NwYWNlRWRpdDIpIHtcbiAgZnVuY3Rpb24gaXModmFsdWUpIHtcbiAgICB2YXIgY2FuZGlkYXRlID0gdmFsdWU7XG4gICAgcmV0dXJuIGNhbmRpZGF0ZSAmJiAoY2FuZGlkYXRlLmNoYW5nZXMgIT09IHZvaWQgMCB8fCBjYW5kaWRhdGUuZG9jdW1lbnRDaGFuZ2VzICE9PSB2b2lkIDApICYmIChjYW5kaWRhdGUuZG9jdW1lbnRDaGFuZ2VzID09PSB2b2lkIDAgfHwgY2FuZGlkYXRlLmRvY3VtZW50Q2hhbmdlcy5ldmVyeShmdW5jdGlvbihjaGFuZ2UpIHtcbiAgICAgIGlmIChJcy5zdHJpbmcoY2hhbmdlLmtpbmQpKSB7XG4gICAgICAgIHJldHVybiBDcmVhdGVGaWxlLmlzKGNoYW5nZSkgfHwgUmVuYW1lRmlsZS5pcyhjaGFuZ2UpIHx8IERlbGV0ZUZpbGUuaXMoY2hhbmdlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBUZXh0RG9jdW1lbnRFZGl0LmlzKGNoYW5nZSk7XG4gICAgICB9XG4gICAgfSkpO1xuICB9XG4gIFdvcmtzcGFjZUVkaXQyLmlzID0gaXM7XG59KShXb3Jrc3BhY2VFZGl0IHx8IChXb3Jrc3BhY2VFZGl0ID0ge30pKTtcbnZhciBUZXh0RWRpdENoYW5nZUltcGwgPSBmdW5jdGlvbigpIHtcbiAgZnVuY3Rpb24gVGV4dEVkaXRDaGFuZ2VJbXBsMihlZGl0cywgY2hhbmdlQW5ub3RhdGlvbnMpIHtcbiAgICB0aGlzLmVkaXRzID0gZWRpdHM7XG4gICAgdGhpcy5jaGFuZ2VBbm5vdGF0aW9ucyA9IGNoYW5nZUFubm90YXRpb25zO1xuICB9XG4gIFRleHRFZGl0Q2hhbmdlSW1wbDIucHJvdG90eXBlLmluc2VydCA9IGZ1bmN0aW9uKHBvc2l0aW9uLCBuZXdUZXh0LCBhbm5vdGF0aW9uKSB7XG4gICAgdmFyIGVkaXQ7XG4gICAgdmFyIGlkO1xuICAgIGlmIChhbm5vdGF0aW9uID09PSB2b2lkIDApIHtcbiAgICAgIGVkaXQgPSBUZXh0RWRpdC5pbnNlcnQocG9zaXRpb24sIG5ld1RleHQpO1xuICAgIH0gZWxzZSBpZiAoQ2hhbmdlQW5ub3RhdGlvbklkZW50aWZpZXIuaXMoYW5ub3RhdGlvbikpIHtcbiAgICAgIGlkID0gYW5ub3RhdGlvbjtcbiAgICAgIGVkaXQgPSBBbm5vdGF0ZWRUZXh0RWRpdC5pbnNlcnQocG9zaXRpb24sIG5ld1RleHQsIGFubm90YXRpb24pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmFzc2VydENoYW5nZUFubm90YXRpb25zKHRoaXMuY2hhbmdlQW5ub3RhdGlvbnMpO1xuICAgICAgaWQgPSB0aGlzLmNoYW5nZUFubm90YXRpb25zLm1hbmFnZShhbm5vdGF0aW9uKTtcbiAgICAgIGVkaXQgPSBBbm5vdGF0ZWRUZXh0RWRpdC5pbnNlcnQocG9zaXRpb24sIG5ld1RleHQsIGlkKTtcbiAgICB9XG4gICAgdGhpcy5lZGl0cy5wdXNoKGVkaXQpO1xuICAgIGlmIChpZCAhPT0gdm9pZCAwKSB7XG4gICAgICByZXR1cm4gaWQ7XG4gICAgfVxuICB9O1xuICBUZXh0RWRpdENoYW5nZUltcGwyLnByb3RvdHlwZS5yZXBsYWNlID0gZnVuY3Rpb24ocmFuZ2UsIG5ld1RleHQsIGFubm90YXRpb24pIHtcbiAgICB2YXIgZWRpdDtcbiAgICB2YXIgaWQ7XG4gICAgaWYgKGFubm90YXRpb24gPT09IHZvaWQgMCkge1xuICAgICAgZWRpdCA9IFRleHRFZGl0LnJlcGxhY2UocmFuZ2UsIG5ld1RleHQpO1xuICAgIH0gZWxzZSBpZiAoQ2hhbmdlQW5ub3RhdGlvbklkZW50aWZpZXIuaXMoYW5ub3RhdGlvbikpIHtcbiAgICAgIGlkID0gYW5ub3RhdGlvbjtcbiAgICAgIGVkaXQgPSBBbm5vdGF0ZWRUZXh0RWRpdC5yZXBsYWNlKHJhbmdlLCBuZXdUZXh0LCBhbm5vdGF0aW9uKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5hc3NlcnRDaGFuZ2VBbm5vdGF0aW9ucyh0aGlzLmNoYW5nZUFubm90YXRpb25zKTtcbiAgICAgIGlkID0gdGhpcy5jaGFuZ2VBbm5vdGF0aW9ucy5tYW5hZ2UoYW5ub3RhdGlvbik7XG4gICAgICBlZGl0ID0gQW5ub3RhdGVkVGV4dEVkaXQucmVwbGFjZShyYW5nZSwgbmV3VGV4dCwgaWQpO1xuICAgIH1cbiAgICB0aGlzLmVkaXRzLnB1c2goZWRpdCk7XG4gICAgaWYgKGlkICE9PSB2b2lkIDApIHtcbiAgICAgIHJldHVybiBpZDtcbiAgICB9XG4gIH07XG4gIFRleHRFZGl0Q2hhbmdlSW1wbDIucHJvdG90eXBlLmRlbGV0ZSA9IGZ1bmN0aW9uKHJhbmdlLCBhbm5vdGF0aW9uKSB7XG4gICAgdmFyIGVkaXQ7XG4gICAgdmFyIGlkO1xuICAgIGlmIChhbm5vdGF0aW9uID09PSB2b2lkIDApIHtcbiAgICAgIGVkaXQgPSBUZXh0RWRpdC5kZWwocmFuZ2UpO1xuICAgIH0gZWxzZSBpZiAoQ2hhbmdlQW5ub3RhdGlvbklkZW50aWZpZXIuaXMoYW5ub3RhdGlvbikpIHtcbiAgICAgIGlkID0gYW5ub3RhdGlvbjtcbiAgICAgIGVkaXQgPSBBbm5vdGF0ZWRUZXh0RWRpdC5kZWwocmFuZ2UsIGFubm90YXRpb24pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmFzc2VydENoYW5nZUFubm90YXRpb25zKHRoaXMuY2hhbmdlQW5ub3RhdGlvbnMpO1xuICAgICAgaWQgPSB0aGlzLmNoYW5nZUFubm90YXRpb25zLm1hbmFnZShhbm5vdGF0aW9uKTtcbiAgICAgIGVkaXQgPSBBbm5vdGF0ZWRUZXh0RWRpdC5kZWwocmFuZ2UsIGlkKTtcbiAgICB9XG4gICAgdGhpcy5lZGl0cy5wdXNoKGVkaXQpO1xuICAgIGlmIChpZCAhPT0gdm9pZCAwKSB7XG4gICAgICByZXR1cm4gaWQ7XG4gICAgfVxuICB9O1xuICBUZXh0RWRpdENoYW5nZUltcGwyLnByb3RvdHlwZS5hZGQgPSBmdW5jdGlvbihlZGl0KSB7XG4gICAgdGhpcy5lZGl0cy5wdXNoKGVkaXQpO1xuICB9O1xuICBUZXh0RWRpdENoYW5nZUltcGwyLnByb3RvdHlwZS5hbGwgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5lZGl0cztcbiAgfTtcbiAgVGV4dEVkaXRDaGFuZ2VJbXBsMi5wcm90b3R5cGUuY2xlYXIgPSBmdW5jdGlvbigpIHtcbiAgICB0aGlzLmVkaXRzLnNwbGljZSgwLCB0aGlzLmVkaXRzLmxlbmd0aCk7XG4gIH07XG4gIFRleHRFZGl0Q2hhbmdlSW1wbDIucHJvdG90eXBlLmFzc2VydENoYW5nZUFubm90YXRpb25zID0gZnVuY3Rpb24odmFsdWUpIHtcbiAgICBpZiAodmFsdWUgPT09IHZvaWQgMCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVGV4dCBlZGl0IGNoYW5nZSBpcyBub3QgY29uZmlndXJlZCB0byBtYW5hZ2UgY2hhbmdlIGFubm90YXRpb25zLlwiKTtcbiAgICB9XG4gIH07XG4gIHJldHVybiBUZXh0RWRpdENoYW5nZUltcGwyO1xufSgpO1xudmFyIENoYW5nZUFubm90YXRpb25zID0gZnVuY3Rpb24oKSB7XG4gIGZ1bmN0aW9uIENoYW5nZUFubm90YXRpb25zMihhbm5vdGF0aW9ucykge1xuICAgIHRoaXMuX2Fubm90YXRpb25zID0gYW5ub3RhdGlvbnMgPT09IHZvaWQgMCA/IC8qIEBfX1BVUkVfXyAqLyBPYmplY3QuY3JlYXRlKG51bGwpIDogYW5ub3RhdGlvbnM7XG4gICAgdGhpcy5fY291bnRlciA9IDA7XG4gICAgdGhpcy5fc2l6ZSA9IDA7XG4gIH1cbiAgQ2hhbmdlQW5ub3RhdGlvbnMyLnByb3RvdHlwZS5hbGwgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5fYW5ub3RhdGlvbnM7XG4gIH07XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShDaGFuZ2VBbm5vdGF0aW9uczIucHJvdG90eXBlLCBcInNpemVcIiwge1xuICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gdGhpcy5fc2l6ZTtcbiAgICB9LFxuICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICB9KTtcbiAgQ2hhbmdlQW5ub3RhdGlvbnMyLnByb3RvdHlwZS5tYW5hZ2UgPSBmdW5jdGlvbihpZE9yQW5ub3RhdGlvbiwgYW5ub3RhdGlvbikge1xuICAgIHZhciBpZDtcbiAgICBpZiAoQ2hhbmdlQW5ub3RhdGlvbklkZW50aWZpZXIuaXMoaWRPckFubm90YXRpb24pKSB7XG4gICAgICBpZCA9IGlkT3JBbm5vdGF0aW9uO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZCA9IHRoaXMubmV4dElkKCk7XG4gICAgICBhbm5vdGF0aW9uID0gaWRPckFubm90YXRpb247XG4gICAgfVxuICAgIGlmICh0aGlzLl9hbm5vdGF0aW9uc1tpZF0gIT09IHZvaWQgMCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiSWQgXCIgKyBpZCArIFwiIGlzIGFscmVhZHkgaW4gdXNlLlwiKTtcbiAgICB9XG4gICAgaWYgKGFubm90YXRpb24gPT09IHZvaWQgMCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTm8gYW5ub3RhdGlvbiBwcm92aWRlZCBmb3IgaWQgXCIgKyBpZCk7XG4gICAgfVxuICAgIHRoaXMuX2Fubm90YXRpb25zW2lkXSA9IGFubm90YXRpb247XG4gICAgdGhpcy5fc2l6ZSsrO1xuICAgIHJldHVybiBpZDtcbiAgfTtcbiAgQ2hhbmdlQW5ub3RhdGlvbnMyLnByb3RvdHlwZS5uZXh0SWQgPSBmdW5jdGlvbigpIHtcbiAgICB0aGlzLl9jb3VudGVyKys7XG4gICAgcmV0dXJuIHRoaXMuX2NvdW50ZXIudG9TdHJpbmcoKTtcbiAgfTtcbiAgcmV0dXJuIENoYW5nZUFubm90YXRpb25zMjtcbn0oKTtcbnZhciBXb3Jrc3BhY2VDaGFuZ2UgPSBmdW5jdGlvbigpIHtcbiAgZnVuY3Rpb24gV29ya3NwYWNlQ2hhbmdlMih3b3Jrc3BhY2VFZGl0KSB7XG4gICAgdmFyIF90aGlzID0gdGhpcztcbiAgICB0aGlzLl90ZXh0RWRpdENoYW5nZXMgPSAvKiBAX19QVVJFX18gKi8gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICBpZiAod29ya3NwYWNlRWRpdCAhPT0gdm9pZCAwKSB7XG4gICAgICB0aGlzLl93b3Jrc3BhY2VFZGl0ID0gd29ya3NwYWNlRWRpdDtcbiAgICAgIGlmICh3b3Jrc3BhY2VFZGl0LmRvY3VtZW50Q2hhbmdlcykge1xuICAgICAgICB0aGlzLl9jaGFuZ2VBbm5vdGF0aW9ucyA9IG5ldyBDaGFuZ2VBbm5vdGF0aW9ucyh3b3Jrc3BhY2VFZGl0LmNoYW5nZUFubm90YXRpb25zKTtcbiAgICAgICAgd29ya3NwYWNlRWRpdC5jaGFuZ2VBbm5vdGF0aW9ucyA9IHRoaXMuX2NoYW5nZUFubm90YXRpb25zLmFsbCgpO1xuICAgICAgICB3b3Jrc3BhY2VFZGl0LmRvY3VtZW50Q2hhbmdlcy5mb3JFYWNoKGZ1bmN0aW9uKGNoYW5nZSkge1xuICAgICAgICAgIGlmIChUZXh0RG9jdW1lbnRFZGl0LmlzKGNoYW5nZSkpIHtcbiAgICAgICAgICAgIHZhciB0ZXh0RWRpdENoYW5nZSA9IG5ldyBUZXh0RWRpdENoYW5nZUltcGwoY2hhbmdlLmVkaXRzLCBfdGhpcy5fY2hhbmdlQW5ub3RhdGlvbnMpO1xuICAgICAgICAgICAgX3RoaXMuX3RleHRFZGl0Q2hhbmdlc1tjaGFuZ2UudGV4dERvY3VtZW50LnVyaV0gPSB0ZXh0RWRpdENoYW5nZTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIGlmICh3b3Jrc3BhY2VFZGl0LmNoYW5nZXMpIHtcbiAgICAgICAgT2JqZWN0LmtleXMod29ya3NwYWNlRWRpdC5jaGFuZ2VzKS5mb3JFYWNoKGZ1bmN0aW9uKGtleSkge1xuICAgICAgICAgIHZhciB0ZXh0RWRpdENoYW5nZSA9IG5ldyBUZXh0RWRpdENoYW5nZUltcGwod29ya3NwYWNlRWRpdC5jaGFuZ2VzW2tleV0pO1xuICAgICAgICAgIF90aGlzLl90ZXh0RWRpdENoYW5nZXNba2V5XSA9IHRleHRFZGl0Q2hhbmdlO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fd29ya3NwYWNlRWRpdCA9IHt9O1xuICAgIH1cbiAgfVxuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoV29ya3NwYWNlQ2hhbmdlMi5wcm90b3R5cGUsIFwiZWRpdFwiLCB7XG4gICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgIHRoaXMuaW5pdERvY3VtZW50Q2hhbmdlcygpO1xuICAgICAgaWYgKHRoaXMuX2NoYW5nZUFubm90YXRpb25zICE9PSB2b2lkIDApIHtcbiAgICAgICAgaWYgKHRoaXMuX2NoYW5nZUFubm90YXRpb25zLnNpemUgPT09IDApIHtcbiAgICAgICAgICB0aGlzLl93b3Jrc3BhY2VFZGl0LmNoYW5nZUFubm90YXRpb25zID0gdm9pZCAwO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuX3dvcmtzcGFjZUVkaXQuY2hhbmdlQW5ub3RhdGlvbnMgPSB0aGlzLl9jaGFuZ2VBbm5vdGF0aW9ucy5hbGwoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHRoaXMuX3dvcmtzcGFjZUVkaXQ7XG4gICAgfSxcbiAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICBjb25maWd1cmFibGU6IHRydWVcbiAgfSk7XG4gIFdvcmtzcGFjZUNoYW5nZTIucHJvdG90eXBlLmdldFRleHRFZGl0Q2hhbmdlID0gZnVuY3Rpb24oa2V5KSB7XG4gICAgaWYgKE9wdGlvbmFsVmVyc2lvbmVkVGV4dERvY3VtZW50SWRlbnRpZmllci5pcyhrZXkpKSB7XG4gICAgICB0aGlzLmluaXREb2N1bWVudENoYW5nZXMoKTtcbiAgICAgIGlmICh0aGlzLl93b3Jrc3BhY2VFZGl0LmRvY3VtZW50Q2hhbmdlcyA9PT0gdm9pZCAwKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIldvcmtzcGFjZSBlZGl0IGlzIG5vdCBjb25maWd1cmVkIGZvciBkb2N1bWVudCBjaGFuZ2VzLlwiKTtcbiAgICAgIH1cbiAgICAgIHZhciB0ZXh0RG9jdW1lbnQgPSB7IHVyaToga2V5LnVyaSwgdmVyc2lvbjoga2V5LnZlcnNpb24gfTtcbiAgICAgIHZhciByZXN1bHQgPSB0aGlzLl90ZXh0RWRpdENoYW5nZXNbdGV4dERvY3VtZW50LnVyaV07XG4gICAgICBpZiAoIXJlc3VsdCkge1xuICAgICAgICB2YXIgZWRpdHMgPSBbXTtcbiAgICAgICAgdmFyIHRleHREb2N1bWVudEVkaXQgPSB7XG4gICAgICAgICAgdGV4dERvY3VtZW50LFxuICAgICAgICAgIGVkaXRzXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuX3dvcmtzcGFjZUVkaXQuZG9jdW1lbnRDaGFuZ2VzLnB1c2godGV4dERvY3VtZW50RWRpdCk7XG4gICAgICAgIHJlc3VsdCA9IG5ldyBUZXh0RWRpdENoYW5nZUltcGwoZWRpdHMsIHRoaXMuX2NoYW5nZUFubm90YXRpb25zKTtcbiAgICAgICAgdGhpcy5fdGV4dEVkaXRDaGFuZ2VzW3RleHREb2N1bWVudC51cmldID0gcmVzdWx0O1xuICAgICAgfVxuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5pbml0Q2hhbmdlcygpO1xuICAgICAgaWYgKHRoaXMuX3dvcmtzcGFjZUVkaXQuY2hhbmdlcyA9PT0gdm9pZCAwKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIldvcmtzcGFjZSBlZGl0IGlzIG5vdCBjb25maWd1cmVkIGZvciBub3JtYWwgdGV4dCBlZGl0IGNoYW5nZXMuXCIpO1xuICAgICAgfVxuICAgICAgdmFyIHJlc3VsdCA9IHRoaXMuX3RleHRFZGl0Q2hhbmdlc1trZXldO1xuICAgICAgaWYgKCFyZXN1bHQpIHtcbiAgICAgICAgdmFyIGVkaXRzID0gW107XG4gICAgICAgIHRoaXMuX3dvcmtzcGFjZUVkaXQuY2hhbmdlc1trZXldID0gZWRpdHM7XG4gICAgICAgIHJlc3VsdCA9IG5ldyBUZXh0RWRpdENoYW5nZUltcGwoZWRpdHMpO1xuICAgICAgICB0aGlzLl90ZXh0RWRpdENoYW5nZXNba2V5XSA9IHJlc3VsdDtcbiAgICAgIH1cbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICB9O1xuICBXb3Jrc3BhY2VDaGFuZ2UyLnByb3RvdHlwZS5pbml0RG9jdW1lbnRDaGFuZ2VzID0gZnVuY3Rpb24oKSB7XG4gICAgaWYgKHRoaXMuX3dvcmtzcGFjZUVkaXQuZG9jdW1lbnRDaGFuZ2VzID09PSB2b2lkIDAgJiYgdGhpcy5fd29ya3NwYWNlRWRpdC5jaGFuZ2VzID09PSB2b2lkIDApIHtcbiAgICAgIHRoaXMuX2NoYW5nZUFubm90YXRpb25zID0gbmV3IENoYW5nZUFubm90YXRpb25zKCk7XG4gICAgICB0aGlzLl93b3Jrc3BhY2VFZGl0LmRvY3VtZW50Q2hhbmdlcyA9IFtdO1xuICAgICAgdGhpcy5fd29ya3NwYWNlRWRpdC5jaGFuZ2VBbm5vdGF0aW9ucyA9IHRoaXMuX2NoYW5nZUFubm90YXRpb25zLmFsbCgpO1xuICAgIH1cbiAgfTtcbiAgV29ya3NwYWNlQ2hhbmdlMi5wcm90b3R5cGUuaW5pdENoYW5nZXMgPSBmdW5jdGlvbigpIHtcbiAgICBpZiAodGhpcy5fd29ya3NwYWNlRWRpdC5kb2N1bWVudENoYW5nZXMgPT09IHZvaWQgMCAmJiB0aGlzLl93b3Jrc3BhY2VFZGl0LmNoYW5nZXMgPT09IHZvaWQgMCkge1xuICAgICAgdGhpcy5fd29ya3NwYWNlRWRpdC5jaGFuZ2VzID0gLyogQF9fUFVSRV9fICovIE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgfVxuICB9O1xuICBXb3Jrc3BhY2VDaGFuZ2UyLnByb3RvdHlwZS5jcmVhdGVGaWxlID0gZnVuY3Rpb24odXJpLCBvcHRpb25zT3JBbm5vdGF0aW9uLCBvcHRpb25zKSB7XG4gICAgdGhpcy5pbml0RG9jdW1lbnRDaGFuZ2VzKCk7XG4gICAgaWYgKHRoaXMuX3dvcmtzcGFjZUVkaXQuZG9jdW1lbnRDaGFuZ2VzID09PSB2b2lkIDApIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIldvcmtzcGFjZSBlZGl0IGlzIG5vdCBjb25maWd1cmVkIGZvciBkb2N1bWVudCBjaGFuZ2VzLlwiKTtcbiAgICB9XG4gICAgdmFyIGFubm90YXRpb247XG4gICAgaWYgKENoYW5nZUFubm90YXRpb24uaXMob3B0aW9uc09yQW5ub3RhdGlvbikgfHwgQ2hhbmdlQW5ub3RhdGlvbklkZW50aWZpZXIuaXMob3B0aW9uc09yQW5ub3RhdGlvbikpIHtcbiAgICAgIGFubm90YXRpb24gPSBvcHRpb25zT3JBbm5vdGF0aW9uO1xuICAgIH0gZWxzZSB7XG4gICAgICBvcHRpb25zID0gb3B0aW9uc09yQW5ub3RhdGlvbjtcbiAgICB9XG4gICAgdmFyIG9wZXJhdGlvbjtcbiAgICB2YXIgaWQ7XG4gICAgaWYgKGFubm90YXRpb24gPT09IHZvaWQgMCkge1xuICAgICAgb3BlcmF0aW9uID0gQ3JlYXRlRmlsZS5jcmVhdGUodXJpLCBvcHRpb25zKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWQgPSBDaGFuZ2VBbm5vdGF0aW9uSWRlbnRpZmllci5pcyhhbm5vdGF0aW9uKSA/IGFubm90YXRpb24gOiB0aGlzLl9jaGFuZ2VBbm5vdGF0aW9ucy5tYW5hZ2UoYW5ub3RhdGlvbik7XG4gICAgICBvcGVyYXRpb24gPSBDcmVhdGVGaWxlLmNyZWF0ZSh1cmksIG9wdGlvbnMsIGlkKTtcbiAgICB9XG4gICAgdGhpcy5fd29ya3NwYWNlRWRpdC5kb2N1bWVudENoYW5nZXMucHVzaChvcGVyYXRpb24pO1xuICAgIGlmIChpZCAhPT0gdm9pZCAwKSB7XG4gICAgICByZXR1cm4gaWQ7XG4gICAgfVxuICB9O1xuICBXb3Jrc3BhY2VDaGFuZ2UyLnByb3RvdHlwZS5yZW5hbWVGaWxlID0gZnVuY3Rpb24ob2xkVXJpLCBuZXdVcmksIG9wdGlvbnNPckFubm90YXRpb24sIG9wdGlvbnMpIHtcbiAgICB0aGlzLmluaXREb2N1bWVudENoYW5nZXMoKTtcbiAgICBpZiAodGhpcy5fd29ya3NwYWNlRWRpdC5kb2N1bWVudENoYW5nZXMgPT09IHZvaWQgMCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiV29ya3NwYWNlIGVkaXQgaXMgbm90IGNvbmZpZ3VyZWQgZm9yIGRvY3VtZW50IGNoYW5nZXMuXCIpO1xuICAgIH1cbiAgICB2YXIgYW5ub3RhdGlvbjtcbiAgICBpZiAoQ2hhbmdlQW5ub3RhdGlvbi5pcyhvcHRpb25zT3JBbm5vdGF0aW9uKSB8fCBDaGFuZ2VBbm5vdGF0aW9uSWRlbnRpZmllci5pcyhvcHRpb25zT3JBbm5vdGF0aW9uKSkge1xuICAgICAgYW5ub3RhdGlvbiA9IG9wdGlvbnNPckFubm90YXRpb247XG4gICAgfSBlbHNlIHtcbiAgICAgIG9wdGlvbnMgPSBvcHRpb25zT3JBbm5vdGF0aW9uO1xuICAgIH1cbiAgICB2YXIgb3BlcmF0aW9uO1xuICAgIHZhciBpZDtcbiAgICBpZiAoYW5ub3RhdGlvbiA9PT0gdm9pZCAwKSB7XG4gICAgICBvcGVyYXRpb24gPSBSZW5hbWVGaWxlLmNyZWF0ZShvbGRVcmksIG5ld1VyaSwgb3B0aW9ucyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlkID0gQ2hhbmdlQW5ub3RhdGlvbklkZW50aWZpZXIuaXMoYW5ub3RhdGlvbikgPyBhbm5vdGF0aW9uIDogdGhpcy5fY2hhbmdlQW5ub3RhdGlvbnMubWFuYWdlKGFubm90YXRpb24pO1xuICAgICAgb3BlcmF0aW9uID0gUmVuYW1lRmlsZS5jcmVhdGUob2xkVXJpLCBuZXdVcmksIG9wdGlvbnMsIGlkKTtcbiAgICB9XG4gICAgdGhpcy5fd29ya3NwYWNlRWRpdC5kb2N1bWVudENoYW5nZXMucHVzaChvcGVyYXRpb24pO1xuICAgIGlmIChpZCAhPT0gdm9pZCAwKSB7XG4gICAgICByZXR1cm4gaWQ7XG4gICAgfVxuICB9O1xuICBXb3Jrc3BhY2VDaGFuZ2UyLnByb3RvdHlwZS5kZWxldGVGaWxlID0gZnVuY3Rpb24odXJpLCBvcHRpb25zT3JBbm5vdGF0aW9uLCBvcHRpb25zKSB7XG4gICAgdGhpcy5pbml0RG9jdW1lbnRDaGFuZ2VzKCk7XG4gICAgaWYgKHRoaXMuX3dvcmtzcGFjZUVkaXQuZG9jdW1lbnRDaGFuZ2VzID09PSB2b2lkIDApIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIldvcmtzcGFjZSBlZGl0IGlzIG5vdCBjb25maWd1cmVkIGZvciBkb2N1bWVudCBjaGFuZ2VzLlwiKTtcbiAgICB9XG4gICAgdmFyIGFubm90YXRpb247XG4gICAgaWYgKENoYW5nZUFubm90YXRpb24uaXMob3B0aW9uc09yQW5ub3RhdGlvbikgfHwgQ2hhbmdlQW5ub3RhdGlvbklkZW50aWZpZXIuaXMob3B0aW9uc09yQW5ub3RhdGlvbikpIHtcbiAgICAgIGFubm90YXRpb24gPSBvcHRpb25zT3JBbm5vdGF0aW9uO1xuICAgIH0gZWxzZSB7XG4gICAgICBvcHRpb25zID0gb3B0aW9uc09yQW5ub3RhdGlvbjtcbiAgICB9XG4gICAgdmFyIG9wZXJhdGlvbjtcbiAgICB2YXIgaWQ7XG4gICAgaWYgKGFubm90YXRpb24gPT09IHZvaWQgMCkge1xuICAgICAgb3BlcmF0aW9uID0gRGVsZXRlRmlsZS5jcmVhdGUodXJpLCBvcHRpb25zKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWQgPSBDaGFuZ2VBbm5vdGF0aW9uSWRlbnRpZmllci5pcyhhbm5vdGF0aW9uKSA/IGFubm90YXRpb24gOiB0aGlzLl9jaGFuZ2VBbm5vdGF0aW9ucy5tYW5hZ2UoYW5ub3RhdGlvbik7XG4gICAgICBvcGVyYXRpb24gPSBEZWxldGVGaWxlLmNyZWF0ZSh1cmksIG9wdGlvbnMsIGlkKTtcbiAgICB9XG4gICAgdGhpcy5fd29ya3NwYWNlRWRpdC5kb2N1bWVudENoYW5nZXMucHVzaChvcGVyYXRpb24pO1xuICAgIGlmIChpZCAhPT0gdm9pZCAwKSB7XG4gICAgICByZXR1cm4gaWQ7XG4gICAgfVxuICB9O1xuICByZXR1cm4gV29ya3NwYWNlQ2hhbmdlMjtcbn0oKTtcbnZhciBUZXh0RG9jdW1lbnRJZGVudGlmaWVyO1xuKGZ1bmN0aW9uKFRleHREb2N1bWVudElkZW50aWZpZXIyKSB7XG4gIGZ1bmN0aW9uIGNyZWF0ZSh1cmkpIHtcbiAgICByZXR1cm4geyB1cmkgfTtcbiAgfVxuICBUZXh0RG9jdW1lbnRJZGVudGlmaWVyMi5jcmVhdGUgPSBjcmVhdGU7XG4gIGZ1bmN0aW9uIGlzKHZhbHVlKSB7XG4gICAgdmFyIGNhbmRpZGF0ZSA9IHZhbHVlO1xuICAgIHJldHVybiBJcy5kZWZpbmVkKGNhbmRpZGF0ZSkgJiYgSXMuc3RyaW5nKGNhbmRpZGF0ZS51cmkpO1xuICB9XG4gIFRleHREb2N1bWVudElkZW50aWZpZXIyLmlzID0gaXM7XG59KShUZXh0RG9jdW1lbnRJZGVudGlmaWVyIHx8IChUZXh0RG9jdW1lbnRJZGVudGlmaWVyID0ge30pKTtcbnZhciBWZXJzaW9uZWRUZXh0RG9jdW1lbnRJZGVudGlmaWVyO1xuKGZ1bmN0aW9uKFZlcnNpb25lZFRleHREb2N1bWVudElkZW50aWZpZXIyKSB7XG4gIGZ1bmN0aW9uIGNyZWF0ZSh1cmksIHZlcnNpb24pIHtcbiAgICByZXR1cm4geyB1cmksIHZlcnNpb24gfTtcbiAgfVxuICBWZXJzaW9uZWRUZXh0RG9jdW1lbnRJZGVudGlmaWVyMi5jcmVhdGUgPSBjcmVhdGU7XG4gIGZ1bmN0aW9uIGlzKHZhbHVlKSB7XG4gICAgdmFyIGNhbmRpZGF0ZSA9IHZhbHVlO1xuICAgIHJldHVybiBJcy5kZWZpbmVkKGNhbmRpZGF0ZSkgJiYgSXMuc3RyaW5nKGNhbmRpZGF0ZS51cmkpICYmIElzLmludGVnZXIoY2FuZGlkYXRlLnZlcnNpb24pO1xuICB9XG4gIFZlcnNpb25lZFRleHREb2N1bWVudElkZW50aWZpZXIyLmlzID0gaXM7XG59KShWZXJzaW9uZWRUZXh0RG9jdW1lbnRJZGVudGlmaWVyIHx8IChWZXJzaW9uZWRUZXh0RG9jdW1lbnRJZGVudGlmaWVyID0ge30pKTtcbnZhciBPcHRpb25hbFZlcnNpb25lZFRleHREb2N1bWVudElkZW50aWZpZXI7XG4oZnVuY3Rpb24oT3B0aW9uYWxWZXJzaW9uZWRUZXh0RG9jdW1lbnRJZGVudGlmaWVyMikge1xuICBmdW5jdGlvbiBjcmVhdGUodXJpLCB2ZXJzaW9uKSB7XG4gICAgcmV0dXJuIHsgdXJpLCB2ZXJzaW9uIH07XG4gIH1cbiAgT3B0aW9uYWxWZXJzaW9uZWRUZXh0RG9jdW1lbnRJZGVudGlmaWVyMi5jcmVhdGUgPSBjcmVhdGU7XG4gIGZ1bmN0aW9uIGlzKHZhbHVlKSB7XG4gICAgdmFyIGNhbmRpZGF0ZSA9IHZhbHVlO1xuICAgIHJldHVybiBJcy5kZWZpbmVkKGNhbmRpZGF0ZSkgJiYgSXMuc3RyaW5nKGNhbmRpZGF0ZS51cmkpICYmIChjYW5kaWRhdGUudmVyc2lvbiA9PT0gbnVsbCB8fCBJcy5pbnRlZ2VyKGNhbmRpZGF0ZS52ZXJzaW9uKSk7XG4gIH1cbiAgT3B0aW9uYWxWZXJzaW9uZWRUZXh0RG9jdW1lbnRJZGVudGlmaWVyMi5pcyA9IGlzO1xufSkoT3B0aW9uYWxWZXJzaW9uZWRUZXh0RG9jdW1lbnRJZGVudGlmaWVyIHx8IChPcHRpb25hbFZlcnNpb25lZFRleHREb2N1bWVudElkZW50aWZpZXIgPSB7fSkpO1xudmFyIFRleHREb2N1bWVudEl0ZW07XG4oZnVuY3Rpb24oVGV4dERvY3VtZW50SXRlbTIpIHtcbiAgZnVuY3Rpb24gY3JlYXRlKHVyaSwgbGFuZ3VhZ2VJZCwgdmVyc2lvbiwgdGV4dCkge1xuICAgIHJldHVybiB7IHVyaSwgbGFuZ3VhZ2VJZCwgdmVyc2lvbiwgdGV4dCB9O1xuICB9XG4gIFRleHREb2N1bWVudEl0ZW0yLmNyZWF0ZSA9IGNyZWF0ZTtcbiAgZnVuY3Rpb24gaXModmFsdWUpIHtcbiAgICB2YXIgY2FuZGlkYXRlID0gdmFsdWU7XG4gICAgcmV0dXJuIElzLmRlZmluZWQoY2FuZGlkYXRlKSAmJiBJcy5zdHJpbmcoY2FuZGlkYXRlLnVyaSkgJiYgSXMuc3RyaW5nKGNhbmRpZGF0ZS5sYW5ndWFnZUlkKSAmJiBJcy5pbnRlZ2VyKGNhbmRpZGF0ZS52ZXJzaW9uKSAmJiBJcy5zdHJpbmcoY2FuZGlkYXRlLnRleHQpO1xuICB9XG4gIFRleHREb2N1bWVudEl0ZW0yLmlzID0gaXM7XG59KShUZXh0RG9jdW1lbnRJdGVtIHx8IChUZXh0RG9jdW1lbnRJdGVtID0ge30pKTtcbnZhciBNYXJrdXBLaW5kO1xuKGZ1bmN0aW9uKE1hcmt1cEtpbmQyKSB7XG4gIE1hcmt1cEtpbmQyLlBsYWluVGV4dCA9IFwicGxhaW50ZXh0XCI7XG4gIE1hcmt1cEtpbmQyLk1hcmtkb3duID0gXCJtYXJrZG93blwiO1xufSkoTWFya3VwS2luZCB8fCAoTWFya3VwS2luZCA9IHt9KSk7XG4oZnVuY3Rpb24oTWFya3VwS2luZDIpIHtcbiAgZnVuY3Rpb24gaXModmFsdWUpIHtcbiAgICB2YXIgY2FuZGlkYXRlID0gdmFsdWU7XG4gICAgcmV0dXJuIGNhbmRpZGF0ZSA9PT0gTWFya3VwS2luZDIuUGxhaW5UZXh0IHx8IGNhbmRpZGF0ZSA9PT0gTWFya3VwS2luZDIuTWFya2Rvd247XG4gIH1cbiAgTWFya3VwS2luZDIuaXMgPSBpcztcbn0pKE1hcmt1cEtpbmQgfHwgKE1hcmt1cEtpbmQgPSB7fSkpO1xudmFyIE1hcmt1cENvbnRlbnQ7XG4oZnVuY3Rpb24oTWFya3VwQ29udGVudDIpIHtcbiAgZnVuY3Rpb24gaXModmFsdWUpIHtcbiAgICB2YXIgY2FuZGlkYXRlID0gdmFsdWU7XG4gICAgcmV0dXJuIElzLm9iamVjdExpdGVyYWwodmFsdWUpICYmIE1hcmt1cEtpbmQuaXMoY2FuZGlkYXRlLmtpbmQpICYmIElzLnN0cmluZyhjYW5kaWRhdGUudmFsdWUpO1xuICB9XG4gIE1hcmt1cENvbnRlbnQyLmlzID0gaXM7XG59KShNYXJrdXBDb250ZW50IHx8IChNYXJrdXBDb250ZW50ID0ge30pKTtcbnZhciBDb21wbGV0aW9uSXRlbUtpbmQ7XG4oZnVuY3Rpb24oQ29tcGxldGlvbkl0ZW1LaW5kMikge1xuICBDb21wbGV0aW9uSXRlbUtpbmQyLlRleHQgPSAxO1xuICBDb21wbGV0aW9uSXRlbUtpbmQyLk1ldGhvZCA9IDI7XG4gIENvbXBsZXRpb25JdGVtS2luZDIuRnVuY3Rpb24gPSAzO1xuICBDb21wbGV0aW9uSXRlbUtpbmQyLkNvbnN0cnVjdG9yID0gNDtcbiAgQ29tcGxldGlvbkl0ZW1LaW5kMi5GaWVsZCA9IDU7XG4gIENvbXBsZXRpb25JdGVtS2luZDIuVmFyaWFibGUgPSA2O1xuICBDb21wbGV0aW9uSXRlbUtpbmQyLkNsYXNzID0gNztcbiAgQ29tcGxldGlvbkl0ZW1LaW5kMi5JbnRlcmZhY2UgPSA4O1xuICBDb21wbGV0aW9uSXRlbUtpbmQyLk1vZHVsZSA9IDk7XG4gIENvbXBsZXRpb25JdGVtS2luZDIuUHJvcGVydHkgPSAxMDtcbiAgQ29tcGxldGlvbkl0ZW1LaW5kMi5Vbml0ID0gMTE7XG4gIENvbXBsZXRpb25JdGVtS2luZDIuVmFsdWUgPSAxMjtcbiAgQ29tcGxldGlvbkl0ZW1LaW5kMi5FbnVtID0gMTM7XG4gIENvbXBsZXRpb25JdGVtS2luZDIuS2V5d29yZCA9IDE0O1xuICBDb21wbGV0aW9uSXRlbUtpbmQyLlNuaXBwZXQgPSAxNTtcbiAgQ29tcGxldGlvbkl0ZW1LaW5kMi5Db2xvciA9IDE2O1xuICBDb21wbGV0aW9uSXRlbUtpbmQyLkZpbGUgPSAxNztcbiAgQ29tcGxldGlvbkl0ZW1LaW5kMi5SZWZlcmVuY2UgPSAxODtcbiAgQ29tcGxldGlvbkl0ZW1LaW5kMi5Gb2xkZXIgPSAxOTtcbiAgQ29tcGxldGlvbkl0ZW1LaW5kMi5FbnVtTWVtYmVyID0gMjA7XG4gIENvbXBsZXRpb25JdGVtS2luZDIuQ29uc3RhbnQgPSAyMTtcbiAgQ29tcGxldGlvbkl0ZW1LaW5kMi5TdHJ1Y3QgPSAyMjtcbiAgQ29tcGxldGlvbkl0ZW1LaW5kMi5FdmVudCA9IDIzO1xuICBDb21wbGV0aW9uSXRlbUtpbmQyLk9wZXJhdG9yID0gMjQ7XG4gIENvbXBsZXRpb25JdGVtS2luZDIuVHlwZVBhcmFtZXRlciA9IDI1O1xufSkoQ29tcGxldGlvbkl0ZW1LaW5kIHx8IChDb21wbGV0aW9uSXRlbUtpbmQgPSB7fSkpO1xudmFyIEluc2VydFRleHRGb3JtYXQ7XG4oZnVuY3Rpb24oSW5zZXJ0VGV4dEZvcm1hdDIpIHtcbiAgSW5zZXJ0VGV4dEZvcm1hdDIuUGxhaW5UZXh0ID0gMTtcbiAgSW5zZXJ0VGV4dEZvcm1hdDIuU25pcHBldCA9IDI7XG59KShJbnNlcnRUZXh0Rm9ybWF0IHx8IChJbnNlcnRUZXh0Rm9ybWF0ID0ge30pKTtcbnZhciBDb21wbGV0aW9uSXRlbVRhZztcbihmdW5jdGlvbihDb21wbGV0aW9uSXRlbVRhZzIpIHtcbiAgQ29tcGxldGlvbkl0ZW1UYWcyLkRlcHJlY2F0ZWQgPSAxO1xufSkoQ29tcGxldGlvbkl0ZW1UYWcgfHwgKENvbXBsZXRpb25JdGVtVGFnID0ge30pKTtcbnZhciBJbnNlcnRSZXBsYWNlRWRpdDtcbihmdW5jdGlvbihJbnNlcnRSZXBsYWNlRWRpdDIpIHtcbiAgZnVuY3Rpb24gY3JlYXRlKG5ld1RleHQsIGluc2VydCwgcmVwbGFjZSkge1xuICAgIHJldHVybiB7IG5ld1RleHQsIGluc2VydCwgcmVwbGFjZSB9O1xuICB9XG4gIEluc2VydFJlcGxhY2VFZGl0Mi5jcmVhdGUgPSBjcmVhdGU7XG4gIGZ1bmN0aW9uIGlzKHZhbHVlKSB7XG4gICAgdmFyIGNhbmRpZGF0ZSA9IHZhbHVlO1xuICAgIHJldHVybiBjYW5kaWRhdGUgJiYgSXMuc3RyaW5nKGNhbmRpZGF0ZS5uZXdUZXh0KSAmJiBSYW5nZS5pcyhjYW5kaWRhdGUuaW5zZXJ0KSAmJiBSYW5nZS5pcyhjYW5kaWRhdGUucmVwbGFjZSk7XG4gIH1cbiAgSW5zZXJ0UmVwbGFjZUVkaXQyLmlzID0gaXM7XG59KShJbnNlcnRSZXBsYWNlRWRpdCB8fCAoSW5zZXJ0UmVwbGFjZUVkaXQgPSB7fSkpO1xudmFyIEluc2VydFRleHRNb2RlO1xuKGZ1bmN0aW9uKEluc2VydFRleHRNb2RlMikge1xuICBJbnNlcnRUZXh0TW9kZTIuYXNJcyA9IDE7XG4gIEluc2VydFRleHRNb2RlMi5hZGp1c3RJbmRlbnRhdGlvbiA9IDI7XG59KShJbnNlcnRUZXh0TW9kZSB8fCAoSW5zZXJ0VGV4dE1vZGUgPSB7fSkpO1xudmFyIENvbXBsZXRpb25JdGVtO1xuKGZ1bmN0aW9uKENvbXBsZXRpb25JdGVtMikge1xuICBmdW5jdGlvbiBjcmVhdGUobGFiZWwpIHtcbiAgICByZXR1cm4geyBsYWJlbCB9O1xuICB9XG4gIENvbXBsZXRpb25JdGVtMi5jcmVhdGUgPSBjcmVhdGU7XG59KShDb21wbGV0aW9uSXRlbSB8fCAoQ29tcGxldGlvbkl0ZW0gPSB7fSkpO1xudmFyIENvbXBsZXRpb25MaXN0O1xuKGZ1bmN0aW9uKENvbXBsZXRpb25MaXN0Mikge1xuICBmdW5jdGlvbiBjcmVhdGUoaXRlbXMsIGlzSW5jb21wbGV0ZSkge1xuICAgIHJldHVybiB7IGl0ZW1zOiBpdGVtcyA/IGl0ZW1zIDogW10sIGlzSW5jb21wbGV0ZTogISFpc0luY29tcGxldGUgfTtcbiAgfVxuICBDb21wbGV0aW9uTGlzdDIuY3JlYXRlID0gY3JlYXRlO1xufSkoQ29tcGxldGlvbkxpc3QgfHwgKENvbXBsZXRpb25MaXN0ID0ge30pKTtcbnZhciBNYXJrZWRTdHJpbmc7XG4oZnVuY3Rpb24oTWFya2VkU3RyaW5nMikge1xuICBmdW5jdGlvbiBmcm9tUGxhaW5UZXh0KHBsYWluVGV4dCkge1xuICAgIHJldHVybiBwbGFpblRleHQucmVwbGFjZSgvW1xcXFxgKl97fVtcXF0oKSMrXFwtLiFdL2csIFwiXFxcXCQmXCIpO1xuICB9XG4gIE1hcmtlZFN0cmluZzIuZnJvbVBsYWluVGV4dCA9IGZyb21QbGFpblRleHQ7XG4gIGZ1bmN0aW9uIGlzKHZhbHVlKSB7XG4gICAgdmFyIGNhbmRpZGF0ZSA9IHZhbHVlO1xuICAgIHJldHVybiBJcy5zdHJpbmcoY2FuZGlkYXRlKSB8fCBJcy5vYmplY3RMaXRlcmFsKGNhbmRpZGF0ZSkgJiYgSXMuc3RyaW5nKGNhbmRpZGF0ZS5sYW5ndWFnZSkgJiYgSXMuc3RyaW5nKGNhbmRpZGF0ZS52YWx1ZSk7XG4gIH1cbiAgTWFya2VkU3RyaW5nMi5pcyA9IGlzO1xufSkoTWFya2VkU3RyaW5nIHx8IChNYXJrZWRTdHJpbmcgPSB7fSkpO1xudmFyIEhvdmVyO1xuKGZ1bmN0aW9uKEhvdmVyMikge1xuICBmdW5jdGlvbiBpcyh2YWx1ZSkge1xuICAgIHZhciBjYW5kaWRhdGUgPSB2YWx1ZTtcbiAgICByZXR1cm4gISFjYW5kaWRhdGUgJiYgSXMub2JqZWN0TGl0ZXJhbChjYW5kaWRhdGUpICYmIChNYXJrdXBDb250ZW50LmlzKGNhbmRpZGF0ZS5jb250ZW50cykgfHwgTWFya2VkU3RyaW5nLmlzKGNhbmRpZGF0ZS5jb250ZW50cykgfHwgSXMudHlwZWRBcnJheShjYW5kaWRhdGUuY29udGVudHMsIE1hcmtlZFN0cmluZy5pcykpICYmICh2YWx1ZS5yYW5nZSA9PT0gdm9pZCAwIHx8IFJhbmdlLmlzKHZhbHVlLnJhbmdlKSk7XG4gIH1cbiAgSG92ZXIyLmlzID0gaXM7XG59KShIb3ZlciB8fCAoSG92ZXIgPSB7fSkpO1xudmFyIFBhcmFtZXRlckluZm9ybWF0aW9uO1xuKGZ1bmN0aW9uKFBhcmFtZXRlckluZm9ybWF0aW9uMikge1xuICBmdW5jdGlvbiBjcmVhdGUobGFiZWwsIGRvY3VtZW50YXRpb24pIHtcbiAgICByZXR1cm4gZG9jdW1lbnRhdGlvbiA/IHsgbGFiZWwsIGRvY3VtZW50YXRpb24gfSA6IHsgbGFiZWwgfTtcbiAgfVxuICBQYXJhbWV0ZXJJbmZvcm1hdGlvbjIuY3JlYXRlID0gY3JlYXRlO1xufSkoUGFyYW1ldGVySW5mb3JtYXRpb24gfHwgKFBhcmFtZXRlckluZm9ybWF0aW9uID0ge30pKTtcbnZhciBTaWduYXR1cmVJbmZvcm1hdGlvbjtcbihmdW5jdGlvbihTaWduYXR1cmVJbmZvcm1hdGlvbjIpIHtcbiAgZnVuY3Rpb24gY3JlYXRlKGxhYmVsLCBkb2N1bWVudGF0aW9uKSB7XG4gICAgdmFyIHBhcmFtZXRlcnMgPSBbXTtcbiAgICBmb3IgKHZhciBfaSA9IDI7IF9pIDwgYXJndW1lbnRzLmxlbmd0aDsgX2krKykge1xuICAgICAgcGFyYW1ldGVyc1tfaSAtIDJdID0gYXJndW1lbnRzW19pXTtcbiAgICB9XG4gICAgdmFyIHJlc3VsdCA9IHsgbGFiZWwgfTtcbiAgICBpZiAoSXMuZGVmaW5lZChkb2N1bWVudGF0aW9uKSkge1xuICAgICAgcmVzdWx0LmRvY3VtZW50YXRpb24gPSBkb2N1bWVudGF0aW9uO1xuICAgIH1cbiAgICBpZiAoSXMuZGVmaW5lZChwYXJhbWV0ZXJzKSkge1xuICAgICAgcmVzdWx0LnBhcmFtZXRlcnMgPSBwYXJhbWV0ZXJzO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXN1bHQucGFyYW1ldGVycyA9IFtdO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG4gIFNpZ25hdHVyZUluZm9ybWF0aW9uMi5jcmVhdGUgPSBjcmVhdGU7XG59KShTaWduYXR1cmVJbmZvcm1hdGlvbiB8fCAoU2lnbmF0dXJlSW5mb3JtYXRpb24gPSB7fSkpO1xudmFyIERvY3VtZW50SGlnaGxpZ2h0S2luZDtcbihmdW5jdGlvbihEb2N1bWVudEhpZ2hsaWdodEtpbmQyKSB7XG4gIERvY3VtZW50SGlnaGxpZ2h0S2luZDIuVGV4dCA9IDE7XG4gIERvY3VtZW50SGlnaGxpZ2h0S2luZDIuUmVhZCA9IDI7XG4gIERvY3VtZW50SGlnaGxpZ2h0S2luZDIuV3JpdGUgPSAzO1xufSkoRG9jdW1lbnRIaWdobGlnaHRLaW5kIHx8IChEb2N1bWVudEhpZ2hsaWdodEtpbmQgPSB7fSkpO1xudmFyIERvY3VtZW50SGlnaGxpZ2h0O1xuKGZ1bmN0aW9uKERvY3VtZW50SGlnaGxpZ2h0Mikge1xuICBmdW5jdGlvbiBjcmVhdGUocmFuZ2UsIGtpbmQpIHtcbiAgICB2YXIgcmVzdWx0ID0geyByYW5nZSB9O1xuICAgIGlmIChJcy5udW1iZXIoa2luZCkpIHtcbiAgICAgIHJlc3VsdC5raW5kID0ga2luZDtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuICBEb2N1bWVudEhpZ2hsaWdodDIuY3JlYXRlID0gY3JlYXRlO1xufSkoRG9jdW1lbnRIaWdobGlnaHQgfHwgKERvY3VtZW50SGlnaGxpZ2h0ID0ge30pKTtcbnZhciBTeW1ib2xLaW5kO1xuKGZ1bmN0aW9uKFN5bWJvbEtpbmQyKSB7XG4gIFN5bWJvbEtpbmQyLkZpbGUgPSAxO1xuICBTeW1ib2xLaW5kMi5Nb2R1bGUgPSAyO1xuICBTeW1ib2xLaW5kMi5OYW1lc3BhY2UgPSAzO1xuICBTeW1ib2xLaW5kMi5QYWNrYWdlID0gNDtcbiAgU3ltYm9sS2luZDIuQ2xhc3MgPSA1O1xuICBTeW1ib2xLaW5kMi5NZXRob2QgPSA2O1xuICBTeW1ib2xLaW5kMi5Qcm9wZXJ0eSA9IDc7XG4gIFN5bWJvbEtpbmQyLkZpZWxkID0gODtcbiAgU3ltYm9sS2luZDIuQ29uc3RydWN0b3IgPSA5O1xuICBTeW1ib2xLaW5kMi5FbnVtID0gMTA7XG4gIFN5bWJvbEtpbmQyLkludGVyZmFjZSA9IDExO1xuICBTeW1ib2xLaW5kMi5GdW5jdGlvbiA9IDEyO1xuICBTeW1ib2xLaW5kMi5WYXJpYWJsZSA9IDEzO1xuICBTeW1ib2xLaW5kMi5Db25zdGFudCA9IDE0O1xuICBTeW1ib2xLaW5kMi5TdHJpbmcgPSAxNTtcbiAgU3ltYm9sS2luZDIuTnVtYmVyID0gMTY7XG4gIFN5bWJvbEtpbmQyLkJvb2xlYW4gPSAxNztcbiAgU3ltYm9sS2luZDIuQXJyYXkgPSAxODtcbiAgU3ltYm9sS2luZDIuT2JqZWN0ID0gMTk7XG4gIFN5bWJvbEtpbmQyLktleSA9IDIwO1xuICBTeW1ib2xLaW5kMi5OdWxsID0gMjE7XG4gIFN5bWJvbEtpbmQyLkVudW1NZW1iZXIgPSAyMjtcbiAgU3ltYm9sS2luZDIuU3RydWN0ID0gMjM7XG4gIFN5bWJvbEtpbmQyLkV2ZW50ID0gMjQ7XG4gIFN5bWJvbEtpbmQyLk9wZXJhdG9yID0gMjU7XG4gIFN5bWJvbEtpbmQyLlR5cGVQYXJhbWV0ZXIgPSAyNjtcbn0pKFN5bWJvbEtpbmQgfHwgKFN5bWJvbEtpbmQgPSB7fSkpO1xudmFyIFN5bWJvbFRhZztcbihmdW5jdGlvbihTeW1ib2xUYWcyKSB7XG4gIFN5bWJvbFRhZzIuRGVwcmVjYXRlZCA9IDE7XG59KShTeW1ib2xUYWcgfHwgKFN5bWJvbFRhZyA9IHt9KSk7XG52YXIgU3ltYm9sSW5mb3JtYXRpb247XG4oZnVuY3Rpb24oU3ltYm9sSW5mb3JtYXRpb24yKSB7XG4gIGZ1bmN0aW9uIGNyZWF0ZShuYW1lLCBraW5kLCByYW5nZSwgdXJpLCBjb250YWluZXJOYW1lKSB7XG4gICAgdmFyIHJlc3VsdCA9IHtcbiAgICAgIG5hbWUsXG4gICAgICBraW5kLFxuICAgICAgbG9jYXRpb246IHsgdXJpLCByYW5nZSB9XG4gICAgfTtcbiAgICBpZiAoY29udGFpbmVyTmFtZSkge1xuICAgICAgcmVzdWx0LmNvbnRhaW5lck5hbWUgPSBjb250YWluZXJOYW1lO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG4gIFN5bWJvbEluZm9ybWF0aW9uMi5jcmVhdGUgPSBjcmVhdGU7XG59KShTeW1ib2xJbmZvcm1hdGlvbiB8fCAoU3ltYm9sSW5mb3JtYXRpb24gPSB7fSkpO1xudmFyIERvY3VtZW50U3ltYm9sO1xuKGZ1bmN0aW9uKERvY3VtZW50U3ltYm9sMikge1xuICBmdW5jdGlvbiBjcmVhdGUobmFtZSwgZGV0YWlsLCBraW5kLCByYW5nZSwgc2VsZWN0aW9uUmFuZ2UsIGNoaWxkcmVuKSB7XG4gICAgdmFyIHJlc3VsdCA9IHtcbiAgICAgIG5hbWUsXG4gICAgICBkZXRhaWwsXG4gICAgICBraW5kLFxuICAgICAgcmFuZ2UsXG4gICAgICBzZWxlY3Rpb25SYW5nZVxuICAgIH07XG4gICAgaWYgKGNoaWxkcmVuICE9PSB2b2lkIDApIHtcbiAgICAgIHJlc3VsdC5jaGlsZHJlbiA9IGNoaWxkcmVuO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG4gIERvY3VtZW50U3ltYm9sMi5jcmVhdGUgPSBjcmVhdGU7XG4gIGZ1bmN0aW9uIGlzKHZhbHVlKSB7XG4gICAgdmFyIGNhbmRpZGF0ZSA9IHZhbHVlO1xuICAgIHJldHVybiBjYW5kaWRhdGUgJiYgSXMuc3RyaW5nKGNhbmRpZGF0ZS5uYW1lKSAmJiBJcy5udW1iZXIoY2FuZGlkYXRlLmtpbmQpICYmIFJhbmdlLmlzKGNhbmRpZGF0ZS5yYW5nZSkgJiYgUmFuZ2UuaXMoY2FuZGlkYXRlLnNlbGVjdGlvblJhbmdlKSAmJiAoY2FuZGlkYXRlLmRldGFpbCA9PT0gdm9pZCAwIHx8IElzLnN0cmluZyhjYW5kaWRhdGUuZGV0YWlsKSkgJiYgKGNhbmRpZGF0ZS5kZXByZWNhdGVkID09PSB2b2lkIDAgfHwgSXMuYm9vbGVhbihjYW5kaWRhdGUuZGVwcmVjYXRlZCkpICYmIChjYW5kaWRhdGUuY2hpbGRyZW4gPT09IHZvaWQgMCB8fCBBcnJheS5pc0FycmF5KGNhbmRpZGF0ZS5jaGlsZHJlbikpICYmIChjYW5kaWRhdGUudGFncyA9PT0gdm9pZCAwIHx8IEFycmF5LmlzQXJyYXkoY2FuZGlkYXRlLnRhZ3MpKTtcbiAgfVxuICBEb2N1bWVudFN5bWJvbDIuaXMgPSBpcztcbn0pKERvY3VtZW50U3ltYm9sIHx8IChEb2N1bWVudFN5bWJvbCA9IHt9KSk7XG52YXIgQ29kZUFjdGlvbktpbmQ7XG4oZnVuY3Rpb24oQ29kZUFjdGlvbktpbmQyKSB7XG4gIENvZGVBY3Rpb25LaW5kMi5FbXB0eSA9IFwiXCI7XG4gIENvZGVBY3Rpb25LaW5kMi5RdWlja0ZpeCA9IFwicXVpY2tmaXhcIjtcbiAgQ29kZUFjdGlvbktpbmQyLlJlZmFjdG9yID0gXCJyZWZhY3RvclwiO1xuICBDb2RlQWN0aW9uS2luZDIuUmVmYWN0b3JFeHRyYWN0ID0gXCJyZWZhY3Rvci5leHRyYWN0XCI7XG4gIENvZGVBY3Rpb25LaW5kMi5SZWZhY3RvcklubGluZSA9IFwicmVmYWN0b3IuaW5saW5lXCI7XG4gIENvZGVBY3Rpb25LaW5kMi5SZWZhY3RvclJld3JpdGUgPSBcInJlZmFjdG9yLnJld3JpdGVcIjtcbiAgQ29kZUFjdGlvbktpbmQyLlNvdXJjZSA9IFwic291cmNlXCI7XG4gIENvZGVBY3Rpb25LaW5kMi5Tb3VyY2VPcmdhbml6ZUltcG9ydHMgPSBcInNvdXJjZS5vcmdhbml6ZUltcG9ydHNcIjtcbiAgQ29kZUFjdGlvbktpbmQyLlNvdXJjZUZpeEFsbCA9IFwic291cmNlLmZpeEFsbFwiO1xufSkoQ29kZUFjdGlvbktpbmQgfHwgKENvZGVBY3Rpb25LaW5kID0ge30pKTtcbnZhciBDb2RlQWN0aW9uQ29udGV4dDtcbihmdW5jdGlvbihDb2RlQWN0aW9uQ29udGV4dDIpIHtcbiAgZnVuY3Rpb24gY3JlYXRlKGRpYWdub3N0aWNzLCBvbmx5KSB7XG4gICAgdmFyIHJlc3VsdCA9IHsgZGlhZ25vc3RpY3MgfTtcbiAgICBpZiAob25seSAhPT0gdm9pZCAwICYmIG9ubHkgIT09IG51bGwpIHtcbiAgICAgIHJlc3VsdC5vbmx5ID0gb25seTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuICBDb2RlQWN0aW9uQ29udGV4dDIuY3JlYXRlID0gY3JlYXRlO1xuICBmdW5jdGlvbiBpcyh2YWx1ZSkge1xuICAgIHZhciBjYW5kaWRhdGUgPSB2YWx1ZTtcbiAgICByZXR1cm4gSXMuZGVmaW5lZChjYW5kaWRhdGUpICYmIElzLnR5cGVkQXJyYXkoY2FuZGlkYXRlLmRpYWdub3N0aWNzLCBEaWFnbm9zdGljLmlzKSAmJiAoY2FuZGlkYXRlLm9ubHkgPT09IHZvaWQgMCB8fCBJcy50eXBlZEFycmF5KGNhbmRpZGF0ZS5vbmx5LCBJcy5zdHJpbmcpKTtcbiAgfVxuICBDb2RlQWN0aW9uQ29udGV4dDIuaXMgPSBpcztcbn0pKENvZGVBY3Rpb25Db250ZXh0IHx8IChDb2RlQWN0aW9uQ29udGV4dCA9IHt9KSk7XG52YXIgQ29kZUFjdGlvbjtcbihmdW5jdGlvbihDb2RlQWN0aW9uMikge1xuICBmdW5jdGlvbiBjcmVhdGUodGl0bGUsIGtpbmRPckNvbW1hbmRPckVkaXQsIGtpbmQpIHtcbiAgICB2YXIgcmVzdWx0ID0geyB0aXRsZSB9O1xuICAgIHZhciBjaGVja0tpbmQgPSB0cnVlO1xuICAgIGlmICh0eXBlb2Yga2luZE9yQ29tbWFuZE9yRWRpdCA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgY2hlY2tLaW5kID0gZmFsc2U7XG4gICAgICByZXN1bHQua2luZCA9IGtpbmRPckNvbW1hbmRPckVkaXQ7XG4gICAgfSBlbHNlIGlmIChDb21tYW5kLmlzKGtpbmRPckNvbW1hbmRPckVkaXQpKSB7XG4gICAgICByZXN1bHQuY29tbWFuZCA9IGtpbmRPckNvbW1hbmRPckVkaXQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlc3VsdC5lZGl0ID0ga2luZE9yQ29tbWFuZE9yRWRpdDtcbiAgICB9XG4gICAgaWYgKGNoZWNrS2luZCAmJiBraW5kICE9PSB2b2lkIDApIHtcbiAgICAgIHJlc3VsdC5raW5kID0ga2luZDtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuICBDb2RlQWN0aW9uMi5jcmVhdGUgPSBjcmVhdGU7XG4gIGZ1bmN0aW9uIGlzKHZhbHVlKSB7XG4gICAgdmFyIGNhbmRpZGF0ZSA9IHZhbHVlO1xuICAgIHJldHVybiBjYW5kaWRhdGUgJiYgSXMuc3RyaW5nKGNhbmRpZGF0ZS50aXRsZSkgJiYgKGNhbmRpZGF0ZS5kaWFnbm9zdGljcyA9PT0gdm9pZCAwIHx8IElzLnR5cGVkQXJyYXkoY2FuZGlkYXRlLmRpYWdub3N0aWNzLCBEaWFnbm9zdGljLmlzKSkgJiYgKGNhbmRpZGF0ZS5raW5kID09PSB2b2lkIDAgfHwgSXMuc3RyaW5nKGNhbmRpZGF0ZS5raW5kKSkgJiYgKGNhbmRpZGF0ZS5lZGl0ICE9PSB2b2lkIDAgfHwgY2FuZGlkYXRlLmNvbW1hbmQgIT09IHZvaWQgMCkgJiYgKGNhbmRpZGF0ZS5jb21tYW5kID09PSB2b2lkIDAgfHwgQ29tbWFuZC5pcyhjYW5kaWRhdGUuY29tbWFuZCkpICYmIChjYW5kaWRhdGUuaXNQcmVmZXJyZWQgPT09IHZvaWQgMCB8fCBJcy5ib29sZWFuKGNhbmRpZGF0ZS5pc1ByZWZlcnJlZCkpICYmIChjYW5kaWRhdGUuZWRpdCA9PT0gdm9pZCAwIHx8IFdvcmtzcGFjZUVkaXQuaXMoY2FuZGlkYXRlLmVkaXQpKTtcbiAgfVxuICBDb2RlQWN0aW9uMi5pcyA9IGlzO1xufSkoQ29kZUFjdGlvbiB8fCAoQ29kZUFjdGlvbiA9IHt9KSk7XG52YXIgQ29kZUxlbnM7XG4oZnVuY3Rpb24oQ29kZUxlbnMyKSB7XG4gIGZ1bmN0aW9uIGNyZWF0ZShyYW5nZSwgZGF0YSkge1xuICAgIHZhciByZXN1bHQgPSB7IHJhbmdlIH07XG4gICAgaWYgKElzLmRlZmluZWQoZGF0YSkpIHtcbiAgICAgIHJlc3VsdC5kYXRhID0gZGF0YTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuICBDb2RlTGVuczIuY3JlYXRlID0gY3JlYXRlO1xuICBmdW5jdGlvbiBpcyh2YWx1ZSkge1xuICAgIHZhciBjYW5kaWRhdGUgPSB2YWx1ZTtcbiAgICByZXR1cm4gSXMuZGVmaW5lZChjYW5kaWRhdGUpICYmIFJhbmdlLmlzKGNhbmRpZGF0ZS5yYW5nZSkgJiYgKElzLnVuZGVmaW5lZChjYW5kaWRhdGUuY29tbWFuZCkgfHwgQ29tbWFuZC5pcyhjYW5kaWRhdGUuY29tbWFuZCkpO1xuICB9XG4gIENvZGVMZW5zMi5pcyA9IGlzO1xufSkoQ29kZUxlbnMgfHwgKENvZGVMZW5zID0ge30pKTtcbnZhciBGb3JtYXR0aW5nT3B0aW9ucztcbihmdW5jdGlvbihGb3JtYXR0aW5nT3B0aW9uczIpIHtcbiAgZnVuY3Rpb24gY3JlYXRlKHRhYlNpemUsIGluc2VydFNwYWNlcykge1xuICAgIHJldHVybiB7IHRhYlNpemUsIGluc2VydFNwYWNlcyB9O1xuICB9XG4gIEZvcm1hdHRpbmdPcHRpb25zMi5jcmVhdGUgPSBjcmVhdGU7XG4gIGZ1bmN0aW9uIGlzKHZhbHVlKSB7XG4gICAgdmFyIGNhbmRpZGF0ZSA9IHZhbHVlO1xuICAgIHJldHVybiBJcy5kZWZpbmVkKGNhbmRpZGF0ZSkgJiYgSXMudWludGVnZXIoY2FuZGlkYXRlLnRhYlNpemUpICYmIElzLmJvb2xlYW4oY2FuZGlkYXRlLmluc2VydFNwYWNlcyk7XG4gIH1cbiAgRm9ybWF0dGluZ09wdGlvbnMyLmlzID0gaXM7XG59KShGb3JtYXR0aW5nT3B0aW9ucyB8fCAoRm9ybWF0dGluZ09wdGlvbnMgPSB7fSkpO1xudmFyIERvY3VtZW50TGluaztcbihmdW5jdGlvbihEb2N1bWVudExpbmsyKSB7XG4gIGZ1bmN0aW9uIGNyZWF0ZShyYW5nZSwgdGFyZ2V0LCBkYXRhKSB7XG4gICAgcmV0dXJuIHsgcmFuZ2UsIHRhcmdldCwgZGF0YSB9O1xuICB9XG4gIERvY3VtZW50TGluazIuY3JlYXRlID0gY3JlYXRlO1xuICBmdW5jdGlvbiBpcyh2YWx1ZSkge1xuICAgIHZhciBjYW5kaWRhdGUgPSB2YWx1ZTtcbiAgICByZXR1cm4gSXMuZGVmaW5lZChjYW5kaWRhdGUpICYmIFJhbmdlLmlzKGNhbmRpZGF0ZS5yYW5nZSkgJiYgKElzLnVuZGVmaW5lZChjYW5kaWRhdGUudGFyZ2V0KSB8fCBJcy5zdHJpbmcoY2FuZGlkYXRlLnRhcmdldCkpO1xuICB9XG4gIERvY3VtZW50TGluazIuaXMgPSBpcztcbn0pKERvY3VtZW50TGluayB8fCAoRG9jdW1lbnRMaW5rID0ge30pKTtcbnZhciBTZWxlY3Rpb25SYW5nZTtcbihmdW5jdGlvbihTZWxlY3Rpb25SYW5nZTIpIHtcbiAgZnVuY3Rpb24gY3JlYXRlKHJhbmdlLCBwYXJlbnQpIHtcbiAgICByZXR1cm4geyByYW5nZSwgcGFyZW50IH07XG4gIH1cbiAgU2VsZWN0aW9uUmFuZ2UyLmNyZWF0ZSA9IGNyZWF0ZTtcbiAgZnVuY3Rpb24gaXModmFsdWUpIHtcbiAgICB2YXIgY2FuZGlkYXRlID0gdmFsdWU7XG4gICAgcmV0dXJuIGNhbmRpZGF0ZSAhPT0gdm9pZCAwICYmIFJhbmdlLmlzKGNhbmRpZGF0ZS5yYW5nZSkgJiYgKGNhbmRpZGF0ZS5wYXJlbnQgPT09IHZvaWQgMCB8fCBTZWxlY3Rpb25SYW5nZTIuaXMoY2FuZGlkYXRlLnBhcmVudCkpO1xuICB9XG4gIFNlbGVjdGlvblJhbmdlMi5pcyA9IGlzO1xufSkoU2VsZWN0aW9uUmFuZ2UgfHwgKFNlbGVjdGlvblJhbmdlID0ge30pKTtcbnZhciBUZXh0RG9jdW1lbnQ7XG4oZnVuY3Rpb24oVGV4dERvY3VtZW50Mikge1xuICBmdW5jdGlvbiBjcmVhdGUodXJpLCBsYW5ndWFnZUlkLCB2ZXJzaW9uLCBjb250ZW50KSB7XG4gICAgcmV0dXJuIG5ldyBGdWxsVGV4dERvY3VtZW50KHVyaSwgbGFuZ3VhZ2VJZCwgdmVyc2lvbiwgY29udGVudCk7XG4gIH1cbiAgVGV4dERvY3VtZW50Mi5jcmVhdGUgPSBjcmVhdGU7XG4gIGZ1bmN0aW9uIGlzKHZhbHVlKSB7XG4gICAgdmFyIGNhbmRpZGF0ZSA9IHZhbHVlO1xuICAgIHJldHVybiBJcy5kZWZpbmVkKGNhbmRpZGF0ZSkgJiYgSXMuc3RyaW5nKGNhbmRpZGF0ZS51cmkpICYmIChJcy51bmRlZmluZWQoY2FuZGlkYXRlLmxhbmd1YWdlSWQpIHx8IElzLnN0cmluZyhjYW5kaWRhdGUubGFuZ3VhZ2VJZCkpICYmIElzLnVpbnRlZ2VyKGNhbmRpZGF0ZS5saW5lQ291bnQpICYmIElzLmZ1bmMoY2FuZGlkYXRlLmdldFRleHQpICYmIElzLmZ1bmMoY2FuZGlkYXRlLnBvc2l0aW9uQXQpICYmIElzLmZ1bmMoY2FuZGlkYXRlLm9mZnNldEF0KSA/IHRydWUgOiBmYWxzZTtcbiAgfVxuICBUZXh0RG9jdW1lbnQyLmlzID0gaXM7XG4gIGZ1bmN0aW9uIGFwcGx5RWRpdHMoZG9jdW1lbnQsIGVkaXRzKSB7XG4gICAgdmFyIHRleHQgPSBkb2N1bWVudC5nZXRUZXh0KCk7XG4gICAgdmFyIHNvcnRlZEVkaXRzID0gbWVyZ2VTb3J0KGVkaXRzLCBmdW5jdGlvbihhLCBiKSB7XG4gICAgICB2YXIgZGlmZiA9IGEucmFuZ2Uuc3RhcnQubGluZSAtIGIucmFuZ2Uuc3RhcnQubGluZTtcbiAgICAgIGlmIChkaWZmID09PSAwKSB7XG4gICAgICAgIHJldHVybiBhLnJhbmdlLnN0YXJ0LmNoYXJhY3RlciAtIGIucmFuZ2Uuc3RhcnQuY2hhcmFjdGVyO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGRpZmY7XG4gICAgfSk7XG4gICAgdmFyIGxhc3RNb2RpZmllZE9mZnNldCA9IHRleHQubGVuZ3RoO1xuICAgIGZvciAodmFyIGkgPSBzb3J0ZWRFZGl0cy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgdmFyIGUgPSBzb3J0ZWRFZGl0c1tpXTtcbiAgICAgIHZhciBzdGFydE9mZnNldCA9IGRvY3VtZW50Lm9mZnNldEF0KGUucmFuZ2Uuc3RhcnQpO1xuICAgICAgdmFyIGVuZE9mZnNldCA9IGRvY3VtZW50Lm9mZnNldEF0KGUucmFuZ2UuZW5kKTtcbiAgICAgIGlmIChlbmRPZmZzZXQgPD0gbGFzdE1vZGlmaWVkT2Zmc2V0KSB7XG4gICAgICAgIHRleHQgPSB0ZXh0LnN1YnN0cmluZygwLCBzdGFydE9mZnNldCkgKyBlLm5ld1RleHQgKyB0ZXh0LnN1YnN0cmluZyhlbmRPZmZzZXQsIHRleHQubGVuZ3RoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIk92ZXJsYXBwaW5nIGVkaXRcIik7XG4gICAgICB9XG4gICAgICBsYXN0TW9kaWZpZWRPZmZzZXQgPSBzdGFydE9mZnNldDtcbiAgICB9XG4gICAgcmV0dXJuIHRleHQ7XG4gIH1cbiAgVGV4dERvY3VtZW50Mi5hcHBseUVkaXRzID0gYXBwbHlFZGl0cztcbiAgZnVuY3Rpb24gbWVyZ2VTb3J0KGRhdGEsIGNvbXBhcmUpIHtcbiAgICBpZiAoZGF0YS5sZW5ndGggPD0gMSkge1xuICAgICAgcmV0dXJuIGRhdGE7XG4gICAgfVxuICAgIHZhciBwID0gZGF0YS5sZW5ndGggLyAyIHwgMDtcbiAgICB2YXIgbGVmdCA9IGRhdGEuc2xpY2UoMCwgcCk7XG4gICAgdmFyIHJpZ2h0ID0gZGF0YS5zbGljZShwKTtcbiAgICBtZXJnZVNvcnQobGVmdCwgY29tcGFyZSk7XG4gICAgbWVyZ2VTb3J0KHJpZ2h0LCBjb21wYXJlKTtcbiAgICB2YXIgbGVmdElkeCA9IDA7XG4gICAgdmFyIHJpZ2h0SWR4ID0gMDtcbiAgICB2YXIgaSA9IDA7XG4gICAgd2hpbGUgKGxlZnRJZHggPCBsZWZ0Lmxlbmd0aCAmJiByaWdodElkeCA8IHJpZ2h0Lmxlbmd0aCkge1xuICAgICAgdmFyIHJldCA9IGNvbXBhcmUobGVmdFtsZWZ0SWR4XSwgcmlnaHRbcmlnaHRJZHhdKTtcbiAgICAgIGlmIChyZXQgPD0gMCkge1xuICAgICAgICBkYXRhW2krK10gPSBsZWZ0W2xlZnRJZHgrK107XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkYXRhW2krK10gPSByaWdodFtyaWdodElkeCsrXTtcbiAgICAgIH1cbiAgICB9XG4gICAgd2hpbGUgKGxlZnRJZHggPCBsZWZ0Lmxlbmd0aCkge1xuICAgICAgZGF0YVtpKytdID0gbGVmdFtsZWZ0SWR4KytdO1xuICAgIH1cbiAgICB3aGlsZSAocmlnaHRJZHggPCByaWdodC5sZW5ndGgpIHtcbiAgICAgIGRhdGFbaSsrXSA9IHJpZ2h0W3JpZ2h0SWR4KytdO1xuICAgIH1cbiAgICByZXR1cm4gZGF0YTtcbiAgfVxufSkoVGV4dERvY3VtZW50IHx8IChUZXh0RG9jdW1lbnQgPSB7fSkpO1xudmFyIEZ1bGxUZXh0RG9jdW1lbnQgPSBmdW5jdGlvbigpIHtcbiAgZnVuY3Rpb24gRnVsbFRleHREb2N1bWVudDIodXJpLCBsYW5ndWFnZUlkLCB2ZXJzaW9uLCBjb250ZW50KSB7XG4gICAgdGhpcy5fdXJpID0gdXJpO1xuICAgIHRoaXMuX2xhbmd1YWdlSWQgPSBsYW5ndWFnZUlkO1xuICAgIHRoaXMuX3ZlcnNpb24gPSB2ZXJzaW9uO1xuICAgIHRoaXMuX2NvbnRlbnQgPSBjb250ZW50O1xuICAgIHRoaXMuX2xpbmVPZmZzZXRzID0gdm9pZCAwO1xuICB9XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShGdWxsVGV4dERvY3VtZW50Mi5wcm90b3R5cGUsIFwidXJpXCIsIHtcbiAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHRoaXMuX3VyaTtcbiAgICB9LFxuICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICB9KTtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEZ1bGxUZXh0RG9jdW1lbnQyLnByb3RvdHlwZSwgXCJsYW5ndWFnZUlkXCIsIHtcbiAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHRoaXMuX2xhbmd1YWdlSWQ7XG4gICAgfSxcbiAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICBjb25maWd1cmFibGU6IHRydWVcbiAgfSk7XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShGdWxsVGV4dERvY3VtZW50Mi5wcm90b3R5cGUsIFwidmVyc2lvblwiLCB7XG4gICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB0aGlzLl92ZXJzaW9uO1xuICAgIH0sXG4gICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgY29uZmlndXJhYmxlOiB0cnVlXG4gIH0pO1xuICBGdWxsVGV4dERvY3VtZW50Mi5wcm90b3R5cGUuZ2V0VGV4dCA9IGZ1bmN0aW9uKHJhbmdlKSB7XG4gICAgaWYgKHJhbmdlKSB7XG4gICAgICB2YXIgc3RhcnQgPSB0aGlzLm9mZnNldEF0KHJhbmdlLnN0YXJ0KTtcbiAgICAgIHZhciBlbmQgPSB0aGlzLm9mZnNldEF0KHJhbmdlLmVuZCk7XG4gICAgICByZXR1cm4gdGhpcy5fY29udGVudC5zdWJzdHJpbmcoc3RhcnQsIGVuZCk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLl9jb250ZW50O1xuICB9O1xuICBGdWxsVGV4dERvY3VtZW50Mi5wcm90b3R5cGUudXBkYXRlID0gZnVuY3Rpb24oZXZlbnQsIHZlcnNpb24pIHtcbiAgICB0aGlzLl9jb250ZW50ID0gZXZlbnQudGV4dDtcbiAgICB0aGlzLl92ZXJzaW9uID0gdmVyc2lvbjtcbiAgICB0aGlzLl9saW5lT2Zmc2V0cyA9IHZvaWQgMDtcbiAgfTtcbiAgRnVsbFRleHREb2N1bWVudDIucHJvdG90eXBlLmdldExpbmVPZmZzZXRzID0gZnVuY3Rpb24oKSB7XG4gICAgaWYgKHRoaXMuX2xpbmVPZmZzZXRzID09PSB2b2lkIDApIHtcbiAgICAgIHZhciBsaW5lT2Zmc2V0cyA9IFtdO1xuICAgICAgdmFyIHRleHQgPSB0aGlzLl9jb250ZW50O1xuICAgICAgdmFyIGlzTGluZVN0YXJ0ID0gdHJ1ZTtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGV4dC5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAoaXNMaW5lU3RhcnQpIHtcbiAgICAgICAgICBsaW5lT2Zmc2V0cy5wdXNoKGkpO1xuICAgICAgICAgIGlzTGluZVN0YXJ0ID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGNoID0gdGV4dC5jaGFyQXQoaSk7XG4gICAgICAgIGlzTGluZVN0YXJ0ID0gY2ggPT09IFwiXFxyXCIgfHwgY2ggPT09IFwiXFxuXCI7XG4gICAgICAgIGlmIChjaCA9PT0gXCJcXHJcIiAmJiBpICsgMSA8IHRleHQubGVuZ3RoICYmIHRleHQuY2hhckF0KGkgKyAxKSA9PT0gXCJcXG5cIikge1xuICAgICAgICAgIGkrKztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKGlzTGluZVN0YXJ0ICYmIHRleHQubGVuZ3RoID4gMCkge1xuICAgICAgICBsaW5lT2Zmc2V0cy5wdXNoKHRleHQubGVuZ3RoKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuX2xpbmVPZmZzZXRzID0gbGluZU9mZnNldHM7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLl9saW5lT2Zmc2V0cztcbiAgfTtcbiAgRnVsbFRleHREb2N1bWVudDIucHJvdG90eXBlLnBvc2l0aW9uQXQgPSBmdW5jdGlvbihvZmZzZXQpIHtcbiAgICBvZmZzZXQgPSBNYXRoLm1heChNYXRoLm1pbihvZmZzZXQsIHRoaXMuX2NvbnRlbnQubGVuZ3RoKSwgMCk7XG4gICAgdmFyIGxpbmVPZmZzZXRzID0gdGhpcy5nZXRMaW5lT2Zmc2V0cygpO1xuICAgIHZhciBsb3cgPSAwLCBoaWdoID0gbGluZU9mZnNldHMubGVuZ3RoO1xuICAgIGlmIChoaWdoID09PSAwKSB7XG4gICAgICByZXR1cm4gUG9zaXRpb24uY3JlYXRlKDAsIG9mZnNldCk7XG4gICAgfVxuICAgIHdoaWxlIChsb3cgPCBoaWdoKSB7XG4gICAgICB2YXIgbWlkID0gTWF0aC5mbG9vcigobG93ICsgaGlnaCkgLyAyKTtcbiAgICAgIGlmIChsaW5lT2Zmc2V0c1ttaWRdID4gb2Zmc2V0KSB7XG4gICAgICAgIGhpZ2ggPSBtaWQ7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBsb3cgPSBtaWQgKyAxO1xuICAgICAgfVxuICAgIH1cbiAgICB2YXIgbGluZSA9IGxvdyAtIDE7XG4gICAgcmV0dXJuIFBvc2l0aW9uLmNyZWF0ZShsaW5lLCBvZmZzZXQgLSBsaW5lT2Zmc2V0c1tsaW5lXSk7XG4gIH07XG4gIEZ1bGxUZXh0RG9jdW1lbnQyLnByb3RvdHlwZS5vZmZzZXRBdCA9IGZ1bmN0aW9uKHBvc2l0aW9uKSB7XG4gICAgdmFyIGxpbmVPZmZzZXRzID0gdGhpcy5nZXRMaW5lT2Zmc2V0cygpO1xuICAgIGlmIChwb3NpdGlvbi5saW5lID49IGxpbmVPZmZzZXRzLmxlbmd0aCkge1xuICAgICAgcmV0dXJuIHRoaXMuX2NvbnRlbnQubGVuZ3RoO1xuICAgIH0gZWxzZSBpZiAocG9zaXRpb24ubGluZSA8IDApIHtcbiAgICAgIHJldHVybiAwO1xuICAgIH1cbiAgICB2YXIgbGluZU9mZnNldCA9IGxpbmVPZmZzZXRzW3Bvc2l0aW9uLmxpbmVdO1xuICAgIHZhciBuZXh0TGluZU9mZnNldCA9IHBvc2l0aW9uLmxpbmUgKyAxIDwgbGluZU9mZnNldHMubGVuZ3RoID8gbGluZU9mZnNldHNbcG9zaXRpb24ubGluZSArIDFdIDogdGhpcy5fY29udGVudC5sZW5ndGg7XG4gICAgcmV0dXJuIE1hdGgubWF4KE1hdGgubWluKGxpbmVPZmZzZXQgKyBwb3NpdGlvbi5jaGFyYWN0ZXIsIG5leHRMaW5lT2Zmc2V0KSwgbGluZU9mZnNldCk7XG4gIH07XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShGdWxsVGV4dERvY3VtZW50Mi5wcm90b3R5cGUsIFwibGluZUNvdW50XCIsIHtcbiAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHRoaXMuZ2V0TGluZU9mZnNldHMoKS5sZW5ndGg7XG4gICAgfSxcbiAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICBjb25maWd1cmFibGU6IHRydWVcbiAgfSk7XG4gIHJldHVybiBGdWxsVGV4dERvY3VtZW50Mjtcbn0oKTtcbnZhciBJcztcbihmdW5jdGlvbihJczIpIHtcbiAgdmFyIHRvU3RyaW5nID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZztcbiAgZnVuY3Rpb24gZGVmaW5lZCh2YWx1ZSkge1xuICAgIHJldHVybiB0eXBlb2YgdmFsdWUgIT09IFwidW5kZWZpbmVkXCI7XG4gIH1cbiAgSXMyLmRlZmluZWQgPSBkZWZpbmVkO1xuICBmdW5jdGlvbiB1bmRlZmluZWQyKHZhbHVlKSB7XG4gICAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gXCJ1bmRlZmluZWRcIjtcbiAgfVxuICBJczIudW5kZWZpbmVkID0gdW5kZWZpbmVkMjtcbiAgZnVuY3Rpb24gYm9vbGVhbih2YWx1ZSkge1xuICAgIHJldHVybiB2YWx1ZSA9PT0gdHJ1ZSB8fCB2YWx1ZSA9PT0gZmFsc2U7XG4gIH1cbiAgSXMyLmJvb2xlYW4gPSBib29sZWFuO1xuICBmdW5jdGlvbiBzdHJpbmcodmFsdWUpIHtcbiAgICByZXR1cm4gdG9TdHJpbmcuY2FsbCh2YWx1ZSkgPT09IFwiW29iamVjdCBTdHJpbmddXCI7XG4gIH1cbiAgSXMyLnN0cmluZyA9IHN0cmluZztcbiAgZnVuY3Rpb24gbnVtYmVyKHZhbHVlKSB7XG4gICAgcmV0dXJuIHRvU3RyaW5nLmNhbGwodmFsdWUpID09PSBcIltvYmplY3QgTnVtYmVyXVwiO1xuICB9XG4gIElzMi5udW1iZXIgPSBudW1iZXI7XG4gIGZ1bmN0aW9uIG51bWJlclJhbmdlKHZhbHVlLCBtaW4sIG1heCkge1xuICAgIHJldHVybiB0b1N0cmluZy5jYWxsKHZhbHVlKSA9PT0gXCJbb2JqZWN0IE51bWJlcl1cIiAmJiBtaW4gPD0gdmFsdWUgJiYgdmFsdWUgPD0gbWF4O1xuICB9XG4gIElzMi5udW1iZXJSYW5nZSA9IG51bWJlclJhbmdlO1xuICBmdW5jdGlvbiBpbnRlZ2VyMih2YWx1ZSkge1xuICAgIHJldHVybiB0b1N0cmluZy5jYWxsKHZhbHVlKSA9PT0gXCJbb2JqZWN0IE51bWJlcl1cIiAmJiAtMjE0NzQ4MzY0OCA8PSB2YWx1ZSAmJiB2YWx1ZSA8PSAyMTQ3NDgzNjQ3O1xuICB9XG4gIElzMi5pbnRlZ2VyID0gaW50ZWdlcjI7XG4gIGZ1bmN0aW9uIHVpbnRlZ2VyMih2YWx1ZSkge1xuICAgIHJldHVybiB0b1N0cmluZy5jYWxsKHZhbHVlKSA9PT0gXCJbb2JqZWN0IE51bWJlcl1cIiAmJiAwIDw9IHZhbHVlICYmIHZhbHVlIDw9IDIxNDc0ODM2NDc7XG4gIH1cbiAgSXMyLnVpbnRlZ2VyID0gdWludGVnZXIyO1xuICBmdW5jdGlvbiBmdW5jKHZhbHVlKSB7XG4gICAgcmV0dXJuIHRvU3RyaW5nLmNhbGwodmFsdWUpID09PSBcIltvYmplY3QgRnVuY3Rpb25dXCI7XG4gIH1cbiAgSXMyLmZ1bmMgPSBmdW5jO1xuICBmdW5jdGlvbiBvYmplY3RMaXRlcmFsKHZhbHVlKSB7XG4gICAgcmV0dXJuIHZhbHVlICE9PSBudWxsICYmIHR5cGVvZiB2YWx1ZSA9PT0gXCJvYmplY3RcIjtcbiAgfVxuICBJczIub2JqZWN0TGl0ZXJhbCA9IG9iamVjdExpdGVyYWw7XG4gIGZ1bmN0aW9uIHR5cGVkQXJyYXkodmFsdWUsIGNoZWNrKSB7XG4gICAgcmV0dXJuIEFycmF5LmlzQXJyYXkodmFsdWUpICYmIHZhbHVlLmV2ZXJ5KGNoZWNrKTtcbiAgfVxuICBJczIudHlwZWRBcnJheSA9IHR5cGVkQXJyYXk7XG59KShJcyB8fCAoSXMgPSB7fSkpO1xuXG4vLyBzcmMvbGFuZ3VhZ2UvY29tbW9uL2xzcExhbmd1YWdlRmVhdHVyZXMudHNcbnZhciBEaWFnbm9zdGljc0FkYXB0ZXIgPSBjbGFzcyB7XG4gIGNvbnN0cnVjdG9yKF9sYW5ndWFnZUlkLCBfd29ya2VyLCBjb25maWdDaGFuZ2VFdmVudCkge1xuICAgIHRoaXMuX2xhbmd1YWdlSWQgPSBfbGFuZ3VhZ2VJZDtcbiAgICB0aGlzLl93b3JrZXIgPSBfd29ya2VyO1xuICAgIGNvbnN0IG9uTW9kZWxBZGQgPSAobW9kZWwpID0+IHtcbiAgICAgIGxldCBtb2RlSWQgPSBtb2RlbC5nZXRMYW5ndWFnZUlkKCk7XG4gICAgICBpZiAobW9kZUlkICE9PSB0aGlzLl9sYW5ndWFnZUlkKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGxldCBoYW5kbGU7XG4gICAgICB0aGlzLl9saXN0ZW5lclttb2RlbC51cmkudG9TdHJpbmcoKV0gPSBtb2RlbC5vbkRpZENoYW5nZUNvbnRlbnQoKCkgPT4ge1xuICAgICAgICB3aW5kb3cuY2xlYXJUaW1lb3V0KGhhbmRsZSk7XG4gICAgICAgIGhhbmRsZSA9IHdpbmRvdy5zZXRUaW1lb3V0KCgpID0+IHRoaXMuX2RvVmFsaWRhdGUobW9kZWwudXJpLCBtb2RlSWQpLCA1MDApO1xuICAgICAgfSk7XG4gICAgICB0aGlzLl9kb1ZhbGlkYXRlKG1vZGVsLnVyaSwgbW9kZUlkKTtcbiAgICB9O1xuICAgIGNvbnN0IG9uTW9kZWxSZW1vdmVkID0gKG1vZGVsKSA9PiB7XG4gICAgICBtb25hY29fZWRpdG9yX2NvcmVfZXhwb3J0cy5lZGl0b3Iuc2V0TW9kZWxNYXJrZXJzKG1vZGVsLCB0aGlzLl9sYW5ndWFnZUlkLCBbXSk7XG4gICAgICBsZXQgdXJpU3RyID0gbW9kZWwudXJpLnRvU3RyaW5nKCk7XG4gICAgICBsZXQgbGlzdGVuZXIgPSB0aGlzLl9saXN0ZW5lclt1cmlTdHJdO1xuICAgICAgaWYgKGxpc3RlbmVyKSB7XG4gICAgICAgIGxpc3RlbmVyLmRpc3Bvc2UoKTtcbiAgICAgICAgZGVsZXRlIHRoaXMuX2xpc3RlbmVyW3VyaVN0cl07XG4gICAgICB9XG4gICAgfTtcbiAgICB0aGlzLl9kaXNwb3NhYmxlcy5wdXNoKG1vbmFjb19lZGl0b3JfY29yZV9leHBvcnRzLmVkaXRvci5vbkRpZENyZWF0ZU1vZGVsKG9uTW9kZWxBZGQpKTtcbiAgICB0aGlzLl9kaXNwb3NhYmxlcy5wdXNoKG1vbmFjb19lZGl0b3JfY29yZV9leHBvcnRzLmVkaXRvci5vbldpbGxEaXNwb3NlTW9kZWwob25Nb2RlbFJlbW92ZWQpKTtcbiAgICB0aGlzLl9kaXNwb3NhYmxlcy5wdXNoKG1vbmFjb19lZGl0b3JfY29yZV9leHBvcnRzLmVkaXRvci5vbkRpZENoYW5nZU1vZGVsTGFuZ3VhZ2UoKGV2ZW50KSA9PiB7XG4gICAgICBvbk1vZGVsUmVtb3ZlZChldmVudC5tb2RlbCk7XG4gICAgICBvbk1vZGVsQWRkKGV2ZW50Lm1vZGVsKTtcbiAgICB9KSk7XG4gICAgdGhpcy5fZGlzcG9zYWJsZXMucHVzaChjb25maWdDaGFuZ2VFdmVudCgoXykgPT4ge1xuICAgICAgbW9uYWNvX2VkaXRvcl9jb3JlX2V4cG9ydHMuZWRpdG9yLmdldE1vZGVscygpLmZvckVhY2goKG1vZGVsKSA9PiB7XG4gICAgICAgIGlmIChtb2RlbC5nZXRMYW5ndWFnZUlkKCkgPT09IHRoaXMuX2xhbmd1YWdlSWQpIHtcbiAgICAgICAgICBvbk1vZGVsUmVtb3ZlZChtb2RlbCk7XG4gICAgICAgICAgb25Nb2RlbEFkZChtb2RlbCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pKTtcbiAgICB0aGlzLl9kaXNwb3NhYmxlcy5wdXNoKHtcbiAgICAgIGRpc3Bvc2U6ICgpID0+IHtcbiAgICAgICAgbW9uYWNvX2VkaXRvcl9jb3JlX2V4cG9ydHMuZWRpdG9yLmdldE1vZGVscygpLmZvckVhY2gob25Nb2RlbFJlbW92ZWQpO1xuICAgICAgICBmb3IgKGxldCBrZXkgaW4gdGhpcy5fbGlzdGVuZXIpIHtcbiAgICAgICAgICB0aGlzLl9saXN0ZW5lcltrZXldLmRpc3Bvc2UoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICAgIG1vbmFjb19lZGl0b3JfY29yZV9leHBvcnRzLmVkaXRvci5nZXRNb2RlbHMoKS5mb3JFYWNoKG9uTW9kZWxBZGQpO1xuICB9XG4gIF9kaXNwb3NhYmxlcyA9IFtdO1xuICBfbGlzdGVuZXIgPSAvKiBAX19QVVJFX18gKi8gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgZGlzcG9zZSgpIHtcbiAgICB0aGlzLl9kaXNwb3NhYmxlcy5mb3JFYWNoKChkKSA9PiBkICYmIGQuZGlzcG9zZSgpKTtcbiAgICB0aGlzLl9kaXNwb3NhYmxlcy5sZW5ndGggPSAwO1xuICB9XG4gIF9kb1ZhbGlkYXRlKHJlc291cmNlLCBsYW5ndWFnZUlkKSB7XG4gICAgdGhpcy5fd29ya2VyKHJlc291cmNlKS50aGVuKCh3b3JrZXIpID0+IHtcbiAgICAgIHJldHVybiB3b3JrZXIuZG9WYWxpZGF0aW9uKHJlc291cmNlLnRvU3RyaW5nKCkpO1xuICAgIH0pLnRoZW4oKGRpYWdub3N0aWNzKSA9PiB7XG4gICAgICBjb25zdCBtYXJrZXJzID0gZGlhZ25vc3RpY3MubWFwKChkKSA9PiB0b0RpYWdub3N0aWNzKHJlc291cmNlLCBkKSk7XG4gICAgICBsZXQgbW9kZWwgPSBtb25hY29fZWRpdG9yX2NvcmVfZXhwb3J0cy5lZGl0b3IuZ2V0TW9kZWwocmVzb3VyY2UpO1xuICAgICAgaWYgKG1vZGVsICYmIG1vZGVsLmdldExhbmd1YWdlSWQoKSA9PT0gbGFuZ3VhZ2VJZCkge1xuICAgICAgICBtb25hY29fZWRpdG9yX2NvcmVfZXhwb3J0cy5lZGl0b3Iuc2V0TW9kZWxNYXJrZXJzKG1vZGVsLCBsYW5ndWFnZUlkLCBtYXJrZXJzKTtcbiAgICAgIH1cbiAgICB9KS50aGVuKHZvaWQgMCwgKGVycikgPT4ge1xuICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xuICAgIH0pO1xuICB9XG59O1xuZnVuY3Rpb24gdG9TZXZlcml0eShsc1NldmVyaXR5KSB7XG4gIHN3aXRjaCAobHNTZXZlcml0eSkge1xuICAgIGNhc2UgRGlhZ25vc3RpY1NldmVyaXR5LkVycm9yOlxuICAgICAgcmV0dXJuIG1vbmFjb19lZGl0b3JfY29yZV9leHBvcnRzLk1hcmtlclNldmVyaXR5LkVycm9yO1xuICAgIGNhc2UgRGlhZ25vc3RpY1NldmVyaXR5Lldhcm5pbmc6XG4gICAgICByZXR1cm4gbW9uYWNvX2VkaXRvcl9jb3JlX2V4cG9ydHMuTWFya2VyU2V2ZXJpdHkuV2FybmluZztcbiAgICBjYXNlIERpYWdub3N0aWNTZXZlcml0eS5JbmZvcm1hdGlvbjpcbiAgICAgIHJldHVybiBtb25hY29fZWRpdG9yX2NvcmVfZXhwb3J0cy5NYXJrZXJTZXZlcml0eS5JbmZvO1xuICAgIGNhc2UgRGlhZ25vc3RpY1NldmVyaXR5LkhpbnQ6XG4gICAgICByZXR1cm4gbW9uYWNvX2VkaXRvcl9jb3JlX2V4cG9ydHMuTWFya2VyU2V2ZXJpdHkuSGludDtcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIG1vbmFjb19lZGl0b3JfY29yZV9leHBvcnRzLk1hcmtlclNldmVyaXR5LkluZm87XG4gIH1cbn1cbmZ1bmN0aW9uIHRvRGlhZ25vc3RpY3MocmVzb3VyY2UsIGRpYWcpIHtcbiAgbGV0IGNvZGUgPSB0eXBlb2YgZGlhZy5jb2RlID09PSBcIm51bWJlclwiID8gU3RyaW5nKGRpYWcuY29kZSkgOiBkaWFnLmNvZGU7XG4gIHJldHVybiB7XG4gICAgc2V2ZXJpdHk6IHRvU2V2ZXJpdHkoZGlhZy5zZXZlcml0eSksXG4gICAgc3RhcnRMaW5lTnVtYmVyOiBkaWFnLnJhbmdlLnN0YXJ0LmxpbmUgKyAxLFxuICAgIHN0YXJ0Q29sdW1uOiBkaWFnLnJhbmdlLnN0YXJ0LmNoYXJhY3RlciArIDEsXG4gICAgZW5kTGluZU51bWJlcjogZGlhZy5yYW5nZS5lbmQubGluZSArIDEsXG4gICAgZW5kQ29sdW1uOiBkaWFnLnJhbmdlLmVuZC5jaGFyYWN0ZXIgKyAxLFxuICAgIG1lc3NhZ2U6IGRpYWcubWVzc2FnZSxcbiAgICBjb2RlLFxuICAgIHNvdXJjZTogZGlhZy5zb3VyY2VcbiAgfTtcbn1cbnZhciBDb21wbGV0aW9uQWRhcHRlciA9IGNsYXNzIHtcbiAgY29uc3RydWN0b3IoX3dvcmtlciwgX3RyaWdnZXJDaGFyYWN0ZXJzKSB7XG4gICAgdGhpcy5fd29ya2VyID0gX3dvcmtlcjtcbiAgICB0aGlzLl90cmlnZ2VyQ2hhcmFjdGVycyA9IF90cmlnZ2VyQ2hhcmFjdGVycztcbiAgfVxuICBnZXQgdHJpZ2dlckNoYXJhY3RlcnMoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3RyaWdnZXJDaGFyYWN0ZXJzO1xuICB9XG4gIHByb3ZpZGVDb21wbGV0aW9uSXRlbXMobW9kZWwsIHBvc2l0aW9uLCBjb250ZXh0LCB0b2tlbikge1xuICAgIGNvbnN0IHJlc291cmNlID0gbW9kZWwudXJpO1xuICAgIHJldHVybiB0aGlzLl93b3JrZXIocmVzb3VyY2UpLnRoZW4oKHdvcmtlcikgPT4ge1xuICAgICAgcmV0dXJuIHdvcmtlci5kb0NvbXBsZXRlKHJlc291cmNlLnRvU3RyaW5nKCksIGZyb21Qb3NpdGlvbihwb3NpdGlvbikpO1xuICAgIH0pLnRoZW4oKGluZm8pID0+IHtcbiAgICAgIGlmICghaW5mbykge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBjb25zdCB3b3JkSW5mbyA9IG1vZGVsLmdldFdvcmRVbnRpbFBvc2l0aW9uKHBvc2l0aW9uKTtcbiAgICAgIGNvbnN0IHdvcmRSYW5nZSA9IG5ldyBtb25hY29fZWRpdG9yX2NvcmVfZXhwb3J0cy5SYW5nZShwb3NpdGlvbi5saW5lTnVtYmVyLCB3b3JkSW5mby5zdGFydENvbHVtbiwgcG9zaXRpb24ubGluZU51bWJlciwgd29yZEluZm8uZW5kQ29sdW1uKTtcbiAgICAgIGNvbnN0IGl0ZW1zID0gaW5mby5pdGVtcy5tYXAoKGVudHJ5KSA9PiB7XG4gICAgICAgIGNvbnN0IGl0ZW0gPSB7XG4gICAgICAgICAgbGFiZWw6IGVudHJ5LmxhYmVsLFxuICAgICAgICAgIGluc2VydFRleHQ6IGVudHJ5Lmluc2VydFRleHQgfHwgZW50cnkubGFiZWwsXG4gICAgICAgICAgc29ydFRleHQ6IGVudHJ5LnNvcnRUZXh0LFxuICAgICAgICAgIGZpbHRlclRleHQ6IGVudHJ5LmZpbHRlclRleHQsXG4gICAgICAgICAgZG9jdW1lbnRhdGlvbjogZW50cnkuZG9jdW1lbnRhdGlvbixcbiAgICAgICAgICBkZXRhaWw6IGVudHJ5LmRldGFpbCxcbiAgICAgICAgICBjb21tYW5kOiB0b0NvbW1hbmQoZW50cnkuY29tbWFuZCksXG4gICAgICAgICAgcmFuZ2U6IHdvcmRSYW5nZSxcbiAgICAgICAgICBraW5kOiB0b0NvbXBsZXRpb25JdGVtS2luZChlbnRyeS5raW5kKVxuICAgICAgICB9O1xuICAgICAgICBpZiAoZW50cnkudGV4dEVkaXQpIHtcbiAgICAgICAgICBpZiAoaXNJbnNlcnRSZXBsYWNlRWRpdChlbnRyeS50ZXh0RWRpdCkpIHtcbiAgICAgICAgICAgIGl0ZW0ucmFuZ2UgPSB7XG4gICAgICAgICAgICAgIGluc2VydDogdG9SYW5nZShlbnRyeS50ZXh0RWRpdC5pbnNlcnQpLFxuICAgICAgICAgICAgICByZXBsYWNlOiB0b1JhbmdlKGVudHJ5LnRleHRFZGl0LnJlcGxhY2UpXG4gICAgICAgICAgICB9O1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpdGVtLnJhbmdlID0gdG9SYW5nZShlbnRyeS50ZXh0RWRpdC5yYW5nZSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGl0ZW0uaW5zZXJ0VGV4dCA9IGVudHJ5LnRleHRFZGl0Lm5ld1RleHQ7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGVudHJ5LmFkZGl0aW9uYWxUZXh0RWRpdHMpIHtcbiAgICAgICAgICBpdGVtLmFkZGl0aW9uYWxUZXh0RWRpdHMgPSBlbnRyeS5hZGRpdGlvbmFsVGV4dEVkaXRzLm1hcCh0b1RleHRFZGl0KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZW50cnkuaW5zZXJ0VGV4dEZvcm1hdCA9PT0gSW5zZXJ0VGV4dEZvcm1hdC5TbmlwcGV0KSB7XG4gICAgICAgICAgaXRlbS5pbnNlcnRUZXh0UnVsZXMgPSBtb25hY29fZWRpdG9yX2NvcmVfZXhwb3J0cy5sYW5ndWFnZXMuQ29tcGxldGlvbkl0ZW1JbnNlcnRUZXh0UnVsZS5JbnNlcnRBc1NuaXBwZXQ7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGl0ZW07XG4gICAgICB9KTtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGlzSW5jb21wbGV0ZTogaW5mby5pc0luY29tcGxldGUsXG4gICAgICAgIHN1Z2dlc3Rpb25zOiBpdGVtc1xuICAgICAgfTtcbiAgICB9KTtcbiAgfVxufTtcbmZ1bmN0aW9uIGZyb21Qb3NpdGlvbihwb3NpdGlvbikge1xuICBpZiAoIXBvc2l0aW9uKSB7XG4gICAgcmV0dXJuIHZvaWQgMDtcbiAgfVxuICByZXR1cm4geyBjaGFyYWN0ZXI6IHBvc2l0aW9uLmNvbHVtbiAtIDEsIGxpbmU6IHBvc2l0aW9uLmxpbmVOdW1iZXIgLSAxIH07XG59XG5mdW5jdGlvbiBmcm9tUmFuZ2UocmFuZ2UpIHtcbiAgaWYgKCFyYW5nZSkge1xuICAgIHJldHVybiB2b2lkIDA7XG4gIH1cbiAgcmV0dXJuIHtcbiAgICBzdGFydDoge1xuICAgICAgbGluZTogcmFuZ2Uuc3RhcnRMaW5lTnVtYmVyIC0gMSxcbiAgICAgIGNoYXJhY3RlcjogcmFuZ2Uuc3RhcnRDb2x1bW4gLSAxXG4gICAgfSxcbiAgICBlbmQ6IHsgbGluZTogcmFuZ2UuZW5kTGluZU51bWJlciAtIDEsIGNoYXJhY3RlcjogcmFuZ2UuZW5kQ29sdW1uIC0gMSB9XG4gIH07XG59XG5mdW5jdGlvbiB0b1JhbmdlKHJhbmdlKSB7XG4gIGlmICghcmFuZ2UpIHtcbiAgICByZXR1cm4gdm9pZCAwO1xuICB9XG4gIHJldHVybiBuZXcgbW9uYWNvX2VkaXRvcl9jb3JlX2V4cG9ydHMuUmFuZ2UocmFuZ2Uuc3RhcnQubGluZSArIDEsIHJhbmdlLnN0YXJ0LmNoYXJhY3RlciArIDEsIHJhbmdlLmVuZC5saW5lICsgMSwgcmFuZ2UuZW5kLmNoYXJhY3RlciArIDEpO1xufVxuZnVuY3Rpb24gaXNJbnNlcnRSZXBsYWNlRWRpdChlZGl0KSB7XG4gIHJldHVybiB0eXBlb2YgZWRpdC5pbnNlcnQgIT09IFwidW5kZWZpbmVkXCIgJiYgdHlwZW9mIGVkaXQucmVwbGFjZSAhPT0gXCJ1bmRlZmluZWRcIjtcbn1cbmZ1bmN0aW9uIHRvQ29tcGxldGlvbkl0ZW1LaW5kKGtpbmQpIHtcbiAgY29uc3QgbUl0ZW1LaW5kID0gbW9uYWNvX2VkaXRvcl9jb3JlX2V4cG9ydHMubGFuZ3VhZ2VzLkNvbXBsZXRpb25JdGVtS2luZDtcbiAgc3dpdGNoIChraW5kKSB7XG4gICAgY2FzZSBDb21wbGV0aW9uSXRlbUtpbmQuVGV4dDpcbiAgICAgIHJldHVybiBtSXRlbUtpbmQuVGV4dDtcbiAgICBjYXNlIENvbXBsZXRpb25JdGVtS2luZC5NZXRob2Q6XG4gICAgICByZXR1cm4gbUl0ZW1LaW5kLk1ldGhvZDtcbiAgICBjYXNlIENvbXBsZXRpb25JdGVtS2luZC5GdW5jdGlvbjpcbiAgICAgIHJldHVybiBtSXRlbUtpbmQuRnVuY3Rpb247XG4gICAgY2FzZSBDb21wbGV0aW9uSXRlbUtpbmQuQ29uc3RydWN0b3I6XG4gICAgICByZXR1cm4gbUl0ZW1LaW5kLkNvbnN0cnVjdG9yO1xuICAgIGNhc2UgQ29tcGxldGlvbkl0ZW1LaW5kLkZpZWxkOlxuICAgICAgcmV0dXJuIG1JdGVtS2luZC5GaWVsZDtcbiAgICBjYXNlIENvbXBsZXRpb25JdGVtS2luZC5WYXJpYWJsZTpcbiAgICAgIHJldHVybiBtSXRlbUtpbmQuVmFyaWFibGU7XG4gICAgY2FzZSBDb21wbGV0aW9uSXRlbUtpbmQuQ2xhc3M6XG4gICAgICByZXR1cm4gbUl0ZW1LaW5kLkNsYXNzO1xuICAgIGNhc2UgQ29tcGxldGlvbkl0ZW1LaW5kLkludGVyZmFjZTpcbiAgICAgIHJldHVybiBtSXRlbUtpbmQuSW50ZXJmYWNlO1xuICAgIGNhc2UgQ29tcGxldGlvbkl0ZW1LaW5kLk1vZHVsZTpcbiAgICAgIHJldHVybiBtSXRlbUtpbmQuTW9kdWxlO1xuICAgIGNhc2UgQ29tcGxldGlvbkl0ZW1LaW5kLlByb3BlcnR5OlxuICAgICAgcmV0dXJuIG1JdGVtS2luZC5Qcm9wZXJ0eTtcbiAgICBjYXNlIENvbXBsZXRpb25JdGVtS2luZC5Vbml0OlxuICAgICAgcmV0dXJuIG1JdGVtS2luZC5Vbml0O1xuICAgIGNhc2UgQ29tcGxldGlvbkl0ZW1LaW5kLlZhbHVlOlxuICAgICAgcmV0dXJuIG1JdGVtS2luZC5WYWx1ZTtcbiAgICBjYXNlIENvbXBsZXRpb25JdGVtS2luZC5FbnVtOlxuICAgICAgcmV0dXJuIG1JdGVtS2luZC5FbnVtO1xuICAgIGNhc2UgQ29tcGxldGlvbkl0ZW1LaW5kLktleXdvcmQ6XG4gICAgICByZXR1cm4gbUl0ZW1LaW5kLktleXdvcmQ7XG4gICAgY2FzZSBDb21wbGV0aW9uSXRlbUtpbmQuU25pcHBldDpcbiAgICAgIHJldHVybiBtSXRlbUtpbmQuU25pcHBldDtcbiAgICBjYXNlIENvbXBsZXRpb25JdGVtS2luZC5Db2xvcjpcbiAgICAgIHJldHVybiBtSXRlbUtpbmQuQ29sb3I7XG4gICAgY2FzZSBDb21wbGV0aW9uSXRlbUtpbmQuRmlsZTpcbiAgICAgIHJldHVybiBtSXRlbUtpbmQuRmlsZTtcbiAgICBjYXNlIENvbXBsZXRpb25JdGVtS2luZC5SZWZlcmVuY2U6XG4gICAgICByZXR1cm4gbUl0ZW1LaW5kLlJlZmVyZW5jZTtcbiAgfVxuICByZXR1cm4gbUl0ZW1LaW5kLlByb3BlcnR5O1xufVxuZnVuY3Rpb24gdG9UZXh0RWRpdCh0ZXh0RWRpdCkge1xuICBpZiAoIXRleHRFZGl0KSB7XG4gICAgcmV0dXJuIHZvaWQgMDtcbiAgfVxuICByZXR1cm4ge1xuICAgIHJhbmdlOiB0b1JhbmdlKHRleHRFZGl0LnJhbmdlKSxcbiAgICB0ZXh0OiB0ZXh0RWRpdC5uZXdUZXh0XG4gIH07XG59XG5mdW5jdGlvbiB0b0NvbW1hbmQoYykge1xuICByZXR1cm4gYyAmJiBjLmNvbW1hbmQgPT09IFwiZWRpdG9yLmFjdGlvbi50cmlnZ2VyU3VnZ2VzdFwiID8geyBpZDogYy5jb21tYW5kLCB0aXRsZTogYy50aXRsZSwgYXJndW1lbnRzOiBjLmFyZ3VtZW50cyB9IDogdm9pZCAwO1xufVxudmFyIEhvdmVyQWRhcHRlciA9IGNsYXNzIHtcbiAgY29uc3RydWN0b3IoX3dvcmtlcikge1xuICAgIHRoaXMuX3dvcmtlciA9IF93b3JrZXI7XG4gIH1cbiAgcHJvdmlkZUhvdmVyKG1vZGVsLCBwb3NpdGlvbiwgdG9rZW4pIHtcbiAgICBsZXQgcmVzb3VyY2UgPSBtb2RlbC51cmk7XG4gICAgcmV0dXJuIHRoaXMuX3dvcmtlcihyZXNvdXJjZSkudGhlbigod29ya2VyKSA9PiB7XG4gICAgICByZXR1cm4gd29ya2VyLmRvSG92ZXIocmVzb3VyY2UudG9TdHJpbmcoKSwgZnJvbVBvc2l0aW9uKHBvc2l0aW9uKSk7XG4gICAgfSkudGhlbigoaW5mbykgPT4ge1xuICAgICAgaWYgKCFpbmZvKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHJldHVybiB7XG4gICAgICAgIHJhbmdlOiB0b1JhbmdlKGluZm8ucmFuZ2UpLFxuICAgICAgICBjb250ZW50czogdG9NYXJrZWRTdHJpbmdBcnJheShpbmZvLmNvbnRlbnRzKVxuICAgICAgfTtcbiAgICB9KTtcbiAgfVxufTtcbmZ1bmN0aW9uIGlzTWFya3VwQ29udGVudCh0aGluZykge1xuICByZXR1cm4gdGhpbmcgJiYgdHlwZW9mIHRoaW5nID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiB0aGluZy5raW5kID09PSBcInN0cmluZ1wiO1xufVxuZnVuY3Rpb24gdG9NYXJrZG93blN0cmluZyhlbnRyeSkge1xuICBpZiAodHlwZW9mIGVudHJ5ID09PSBcInN0cmluZ1wiKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHZhbHVlOiBlbnRyeVxuICAgIH07XG4gIH1cbiAgaWYgKGlzTWFya3VwQ29udGVudChlbnRyeSkpIHtcbiAgICBpZiAoZW50cnkua2luZCA9PT0gXCJwbGFpbnRleHRcIikge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdmFsdWU6IGVudHJ5LnZhbHVlLnJlcGxhY2UoL1tcXFxcYCpfe31bXFxdKCkjK1xcLS4hXS9nLCBcIlxcXFwkJlwiKVxuICAgICAgfTtcbiAgICB9XG4gICAgcmV0dXJuIHtcbiAgICAgIHZhbHVlOiBlbnRyeS52YWx1ZVxuICAgIH07XG4gIH1cbiAgcmV0dXJuIHsgdmFsdWU6IFwiYGBgXCIgKyBlbnRyeS5sYW5ndWFnZSArIFwiXFxuXCIgKyBlbnRyeS52YWx1ZSArIFwiXFxuYGBgXFxuXCIgfTtcbn1cbmZ1bmN0aW9uIHRvTWFya2VkU3RyaW5nQXJyYXkoY29udGVudHMpIHtcbiAgaWYgKCFjb250ZW50cykge1xuICAgIHJldHVybiB2b2lkIDA7XG4gIH1cbiAgaWYgKEFycmF5LmlzQXJyYXkoY29udGVudHMpKSB7XG4gICAgcmV0dXJuIGNvbnRlbnRzLm1hcCh0b01hcmtkb3duU3RyaW5nKTtcbiAgfVxuICByZXR1cm4gW3RvTWFya2Rvd25TdHJpbmcoY29udGVudHMpXTtcbn1cbnZhciBEb2N1bWVudEhpZ2hsaWdodEFkYXB0ZXIgPSBjbGFzcyB7XG4gIGNvbnN0cnVjdG9yKF93b3JrZXIpIHtcbiAgICB0aGlzLl93b3JrZXIgPSBfd29ya2VyO1xuICB9XG4gIHByb3ZpZGVEb2N1bWVudEhpZ2hsaWdodHMobW9kZWwsIHBvc2l0aW9uLCB0b2tlbikge1xuICAgIGNvbnN0IHJlc291cmNlID0gbW9kZWwudXJpO1xuICAgIHJldHVybiB0aGlzLl93b3JrZXIocmVzb3VyY2UpLnRoZW4oKHdvcmtlcikgPT4gd29ya2VyLmZpbmREb2N1bWVudEhpZ2hsaWdodHMocmVzb3VyY2UudG9TdHJpbmcoKSwgZnJvbVBvc2l0aW9uKHBvc2l0aW9uKSkpLnRoZW4oKGVudHJpZXMpID0+IHtcbiAgICAgIGlmICghZW50cmllcykge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICByZXR1cm4gZW50cmllcy5tYXAoKGVudHJ5KSA9PiB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgcmFuZ2U6IHRvUmFuZ2UoZW50cnkucmFuZ2UpLFxuICAgICAgICAgIGtpbmQ6IHRvRG9jdW1lbnRIaWdobGlnaHRLaW5kKGVudHJ5LmtpbmQpXG4gICAgICAgIH07XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxufTtcbmZ1bmN0aW9uIHRvRG9jdW1lbnRIaWdobGlnaHRLaW5kKGtpbmQpIHtcbiAgc3dpdGNoIChraW5kKSB7XG4gICAgY2FzZSBEb2N1bWVudEhpZ2hsaWdodEtpbmQuUmVhZDpcbiAgICAgIHJldHVybiBtb25hY29fZWRpdG9yX2NvcmVfZXhwb3J0cy5sYW5ndWFnZXMuRG9jdW1lbnRIaWdobGlnaHRLaW5kLlJlYWQ7XG4gICAgY2FzZSBEb2N1bWVudEhpZ2hsaWdodEtpbmQuV3JpdGU6XG4gICAgICByZXR1cm4gbW9uYWNvX2VkaXRvcl9jb3JlX2V4cG9ydHMubGFuZ3VhZ2VzLkRvY3VtZW50SGlnaGxpZ2h0S2luZC5Xcml0ZTtcbiAgICBjYXNlIERvY3VtZW50SGlnaGxpZ2h0S2luZC5UZXh0OlxuICAgICAgcmV0dXJuIG1vbmFjb19lZGl0b3JfY29yZV9leHBvcnRzLmxhbmd1YWdlcy5Eb2N1bWVudEhpZ2hsaWdodEtpbmQuVGV4dDtcbiAgfVxuICByZXR1cm4gbW9uYWNvX2VkaXRvcl9jb3JlX2V4cG9ydHMubGFuZ3VhZ2VzLkRvY3VtZW50SGlnaGxpZ2h0S2luZC5UZXh0O1xufVxudmFyIERlZmluaXRpb25BZGFwdGVyID0gY2xhc3Mge1xuICBjb25zdHJ1Y3Rvcihfd29ya2VyKSB7XG4gICAgdGhpcy5fd29ya2VyID0gX3dvcmtlcjtcbiAgfVxuICBwcm92aWRlRGVmaW5pdGlvbihtb2RlbCwgcG9zaXRpb24sIHRva2VuKSB7XG4gICAgY29uc3QgcmVzb3VyY2UgPSBtb2RlbC51cmk7XG4gICAgcmV0dXJuIHRoaXMuX3dvcmtlcihyZXNvdXJjZSkudGhlbigod29ya2VyKSA9PiB7XG4gICAgICByZXR1cm4gd29ya2VyLmZpbmREZWZpbml0aW9uKHJlc291cmNlLnRvU3RyaW5nKCksIGZyb21Qb3NpdGlvbihwb3NpdGlvbikpO1xuICAgIH0pLnRoZW4oKGRlZmluaXRpb24pID0+IHtcbiAgICAgIGlmICghZGVmaW5pdGlvbikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICByZXR1cm4gW3RvTG9jYXRpb24oZGVmaW5pdGlvbildO1xuICAgIH0pO1xuICB9XG59O1xuZnVuY3Rpb24gdG9Mb2NhdGlvbihsb2NhdGlvbikge1xuICByZXR1cm4ge1xuICAgIHVyaTogbW9uYWNvX2VkaXRvcl9jb3JlX2V4cG9ydHMuVXJpLnBhcnNlKGxvY2F0aW9uLnVyaSksXG4gICAgcmFuZ2U6IHRvUmFuZ2UobG9jYXRpb24ucmFuZ2UpXG4gIH07XG59XG52YXIgUmVmZXJlbmNlQWRhcHRlciA9IGNsYXNzIHtcbiAgY29uc3RydWN0b3IoX3dvcmtlcikge1xuICAgIHRoaXMuX3dvcmtlciA9IF93b3JrZXI7XG4gIH1cbiAgcHJvdmlkZVJlZmVyZW5jZXMobW9kZWwsIHBvc2l0aW9uLCBjb250ZXh0LCB0b2tlbikge1xuICAgIGNvbnN0IHJlc291cmNlID0gbW9kZWwudXJpO1xuICAgIHJldHVybiB0aGlzLl93b3JrZXIocmVzb3VyY2UpLnRoZW4oKHdvcmtlcikgPT4ge1xuICAgICAgcmV0dXJuIHdvcmtlci5maW5kUmVmZXJlbmNlcyhyZXNvdXJjZS50b1N0cmluZygpLCBmcm9tUG9zaXRpb24ocG9zaXRpb24pKTtcbiAgICB9KS50aGVuKChlbnRyaWVzKSA9PiB7XG4gICAgICBpZiAoIWVudHJpZXMpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGVudHJpZXMubWFwKHRvTG9jYXRpb24pO1xuICAgIH0pO1xuICB9XG59O1xudmFyIFJlbmFtZUFkYXB0ZXIgPSBjbGFzcyB7XG4gIGNvbnN0cnVjdG9yKF93b3JrZXIpIHtcbiAgICB0aGlzLl93b3JrZXIgPSBfd29ya2VyO1xuICB9XG4gIHByb3ZpZGVSZW5hbWVFZGl0cyhtb2RlbCwgcG9zaXRpb24sIG5ld05hbWUsIHRva2VuKSB7XG4gICAgY29uc3QgcmVzb3VyY2UgPSBtb2RlbC51cmk7XG4gICAgcmV0dXJuIHRoaXMuX3dvcmtlcihyZXNvdXJjZSkudGhlbigod29ya2VyKSA9PiB7XG4gICAgICByZXR1cm4gd29ya2VyLmRvUmVuYW1lKHJlc291cmNlLnRvU3RyaW5nKCksIGZyb21Qb3NpdGlvbihwb3NpdGlvbiksIG5ld05hbWUpO1xuICAgIH0pLnRoZW4oKGVkaXQpID0+IHtcbiAgICAgIHJldHVybiB0b1dvcmtzcGFjZUVkaXQoZWRpdCk7XG4gICAgfSk7XG4gIH1cbn07XG5mdW5jdGlvbiB0b1dvcmtzcGFjZUVkaXQoZWRpdCkge1xuICBpZiAoIWVkaXQgfHwgIWVkaXQuY2hhbmdlcykge1xuICAgIHJldHVybiB2b2lkIDA7XG4gIH1cbiAgbGV0IHJlc291cmNlRWRpdHMgPSBbXTtcbiAgZm9yIChsZXQgdXJpIGluIGVkaXQuY2hhbmdlcykge1xuICAgIGNvbnN0IF91cmkgPSBtb25hY29fZWRpdG9yX2NvcmVfZXhwb3J0cy5VcmkucGFyc2UodXJpKTtcbiAgICBmb3IgKGxldCBlIG9mIGVkaXQuY2hhbmdlc1t1cmldKSB7XG4gICAgICByZXNvdXJjZUVkaXRzLnB1c2goe1xuICAgICAgICByZXNvdXJjZTogX3VyaSxcbiAgICAgICAgdmVyc2lvbklkOiB2b2lkIDAsXG4gICAgICAgIHRleHRFZGl0OiB7XG4gICAgICAgICAgcmFuZ2U6IHRvUmFuZ2UoZS5yYW5nZSksXG4gICAgICAgICAgdGV4dDogZS5uZXdUZXh0XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuICByZXR1cm4ge1xuICAgIGVkaXRzOiByZXNvdXJjZUVkaXRzXG4gIH07XG59XG52YXIgRG9jdW1lbnRTeW1ib2xBZGFwdGVyID0gY2xhc3Mge1xuICBjb25zdHJ1Y3Rvcihfd29ya2VyKSB7XG4gICAgdGhpcy5fd29ya2VyID0gX3dvcmtlcjtcbiAgfVxuICBwcm92aWRlRG9jdW1lbnRTeW1ib2xzKG1vZGVsLCB0b2tlbikge1xuICAgIGNvbnN0IHJlc291cmNlID0gbW9kZWwudXJpO1xuICAgIHJldHVybiB0aGlzLl93b3JrZXIocmVzb3VyY2UpLnRoZW4oKHdvcmtlcikgPT4gd29ya2VyLmZpbmREb2N1bWVudFN5bWJvbHMocmVzb3VyY2UudG9TdHJpbmcoKSkpLnRoZW4oKGl0ZW1zKSA9PiB7XG4gICAgICBpZiAoIWl0ZW1zKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHJldHVybiBpdGVtcy5tYXAoKGl0ZW0pID0+ICh7XG4gICAgICAgIG5hbWU6IGl0ZW0ubmFtZSxcbiAgICAgICAgZGV0YWlsOiBcIlwiLFxuICAgICAgICBjb250YWluZXJOYW1lOiBpdGVtLmNvbnRhaW5lck5hbWUsXG4gICAgICAgIGtpbmQ6IHRvU3ltYm9sS2luZChpdGVtLmtpbmQpLFxuICAgICAgICByYW5nZTogdG9SYW5nZShpdGVtLmxvY2F0aW9uLnJhbmdlKSxcbiAgICAgICAgc2VsZWN0aW9uUmFuZ2U6IHRvUmFuZ2UoaXRlbS5sb2NhdGlvbi5yYW5nZSksXG4gICAgICAgIHRhZ3M6IFtdXG4gICAgICB9KSk7XG4gICAgfSk7XG4gIH1cbn07XG5mdW5jdGlvbiB0b1N5bWJvbEtpbmQoa2luZCkge1xuICBsZXQgbUtpbmQgPSBtb25hY29fZWRpdG9yX2NvcmVfZXhwb3J0cy5sYW5ndWFnZXMuU3ltYm9sS2luZDtcbiAgc3dpdGNoIChraW5kKSB7XG4gICAgY2FzZSBTeW1ib2xLaW5kLkZpbGU6XG4gICAgICByZXR1cm4gbUtpbmQuQXJyYXk7XG4gICAgY2FzZSBTeW1ib2xLaW5kLk1vZHVsZTpcbiAgICAgIHJldHVybiBtS2luZC5Nb2R1bGU7XG4gICAgY2FzZSBTeW1ib2xLaW5kLk5hbWVzcGFjZTpcbiAgICAgIHJldHVybiBtS2luZC5OYW1lc3BhY2U7XG4gICAgY2FzZSBTeW1ib2xLaW5kLlBhY2thZ2U6XG4gICAgICByZXR1cm4gbUtpbmQuUGFja2FnZTtcbiAgICBjYXNlIFN5bWJvbEtpbmQuQ2xhc3M6XG4gICAgICByZXR1cm4gbUtpbmQuQ2xhc3M7XG4gICAgY2FzZSBTeW1ib2xLaW5kLk1ldGhvZDpcbiAgICAgIHJldHVybiBtS2luZC5NZXRob2Q7XG4gICAgY2FzZSBTeW1ib2xLaW5kLlByb3BlcnR5OlxuICAgICAgcmV0dXJuIG1LaW5kLlByb3BlcnR5O1xuICAgIGNhc2UgU3ltYm9sS2luZC5GaWVsZDpcbiAgICAgIHJldHVybiBtS2luZC5GaWVsZDtcbiAgICBjYXNlIFN5bWJvbEtpbmQuQ29uc3RydWN0b3I6XG4gICAgICByZXR1cm4gbUtpbmQuQ29uc3RydWN0b3I7XG4gICAgY2FzZSBTeW1ib2xLaW5kLkVudW06XG4gICAgICByZXR1cm4gbUtpbmQuRW51bTtcbiAgICBjYXNlIFN5bWJvbEtpbmQuSW50ZXJmYWNlOlxuICAgICAgcmV0dXJuIG1LaW5kLkludGVyZmFjZTtcbiAgICBjYXNlIFN5bWJvbEtpbmQuRnVuY3Rpb246XG4gICAgICByZXR1cm4gbUtpbmQuRnVuY3Rpb247XG4gICAgY2FzZSBTeW1ib2xLaW5kLlZhcmlhYmxlOlxuICAgICAgcmV0dXJuIG1LaW5kLlZhcmlhYmxlO1xuICAgIGNhc2UgU3ltYm9sS2luZC5Db25zdGFudDpcbiAgICAgIHJldHVybiBtS2luZC5Db25zdGFudDtcbiAgICBjYXNlIFN5bWJvbEtpbmQuU3RyaW5nOlxuICAgICAgcmV0dXJuIG1LaW5kLlN0cmluZztcbiAgICBjYXNlIFN5bWJvbEtpbmQuTnVtYmVyOlxuICAgICAgcmV0dXJuIG1LaW5kLk51bWJlcjtcbiAgICBjYXNlIFN5bWJvbEtpbmQuQm9vbGVhbjpcbiAgICAgIHJldHVybiBtS2luZC5Cb29sZWFuO1xuICAgIGNhc2UgU3ltYm9sS2luZC5BcnJheTpcbiAgICAgIHJldHVybiBtS2luZC5BcnJheTtcbiAgfVxuICByZXR1cm4gbUtpbmQuRnVuY3Rpb247XG59XG52YXIgRG9jdW1lbnRMaW5rQWRhcHRlciA9IGNsYXNzIHtcbiAgY29uc3RydWN0b3IoX3dvcmtlcikge1xuICAgIHRoaXMuX3dvcmtlciA9IF93b3JrZXI7XG4gIH1cbiAgcHJvdmlkZUxpbmtzKG1vZGVsLCB0b2tlbikge1xuICAgIGNvbnN0IHJlc291cmNlID0gbW9kZWwudXJpO1xuICAgIHJldHVybiB0aGlzLl93b3JrZXIocmVzb3VyY2UpLnRoZW4oKHdvcmtlcikgPT4gd29ya2VyLmZpbmREb2N1bWVudExpbmtzKHJlc291cmNlLnRvU3RyaW5nKCkpKS50aGVuKChpdGVtcykgPT4ge1xuICAgICAgaWYgKCFpdGVtcykge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICByZXR1cm4ge1xuICAgICAgICBsaW5rczogaXRlbXMubWFwKChpdGVtKSA9PiAoe1xuICAgICAgICAgIHJhbmdlOiB0b1JhbmdlKGl0ZW0ucmFuZ2UpLFxuICAgICAgICAgIHVybDogaXRlbS50YXJnZXRcbiAgICAgICAgfSkpXG4gICAgICB9O1xuICAgIH0pO1xuICB9XG59O1xudmFyIERvY3VtZW50Rm9ybWF0dGluZ0VkaXRQcm92aWRlciA9IGNsYXNzIHtcbiAgY29uc3RydWN0b3IoX3dvcmtlcikge1xuICAgIHRoaXMuX3dvcmtlciA9IF93b3JrZXI7XG4gIH1cbiAgcHJvdmlkZURvY3VtZW50Rm9ybWF0dGluZ0VkaXRzKG1vZGVsLCBvcHRpb25zLCB0b2tlbikge1xuICAgIGNvbnN0IHJlc291cmNlID0gbW9kZWwudXJpO1xuICAgIHJldHVybiB0aGlzLl93b3JrZXIocmVzb3VyY2UpLnRoZW4oKHdvcmtlcikgPT4ge1xuICAgICAgcmV0dXJuIHdvcmtlci5mb3JtYXQocmVzb3VyY2UudG9TdHJpbmcoKSwgbnVsbCwgZnJvbUZvcm1hdHRpbmdPcHRpb25zKG9wdGlvbnMpKS50aGVuKChlZGl0cykgPT4ge1xuICAgICAgICBpZiAoIWVkaXRzIHx8IGVkaXRzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZWRpdHMubWFwKHRvVGV4dEVkaXQpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cbn07XG52YXIgRG9jdW1lbnRSYW5nZUZvcm1hdHRpbmdFZGl0UHJvdmlkZXIgPSBjbGFzcyB7XG4gIGNvbnN0cnVjdG9yKF93b3JrZXIpIHtcbiAgICB0aGlzLl93b3JrZXIgPSBfd29ya2VyO1xuICB9XG4gIGNhbkZvcm1hdE11bHRpcGxlUmFuZ2VzID0gZmFsc2U7XG4gIHByb3ZpZGVEb2N1bWVudFJhbmdlRm9ybWF0dGluZ0VkaXRzKG1vZGVsLCByYW5nZSwgb3B0aW9ucywgdG9rZW4pIHtcbiAgICBjb25zdCByZXNvdXJjZSA9IG1vZGVsLnVyaTtcbiAgICByZXR1cm4gdGhpcy5fd29ya2VyKHJlc291cmNlKS50aGVuKCh3b3JrZXIpID0+IHtcbiAgICAgIHJldHVybiB3b3JrZXIuZm9ybWF0KHJlc291cmNlLnRvU3RyaW5nKCksIGZyb21SYW5nZShyYW5nZSksIGZyb21Gb3JtYXR0aW5nT3B0aW9ucyhvcHRpb25zKSkudGhlbigoZWRpdHMpID0+IHtcbiAgICAgICAgaWYgKCFlZGl0cyB8fCBlZGl0cy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGVkaXRzLm1hcCh0b1RleHRFZGl0KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG59O1xuZnVuY3Rpb24gZnJvbUZvcm1hdHRpbmdPcHRpb25zKG9wdGlvbnMpIHtcbiAgcmV0dXJuIHtcbiAgICB0YWJTaXplOiBvcHRpb25zLnRhYlNpemUsXG4gICAgaW5zZXJ0U3BhY2VzOiBvcHRpb25zLmluc2VydFNwYWNlc1xuICB9O1xufVxudmFyIERvY3VtZW50Q29sb3JBZGFwdGVyID0gY2xhc3Mge1xuICBjb25zdHJ1Y3Rvcihfd29ya2VyKSB7XG4gICAgdGhpcy5fd29ya2VyID0gX3dvcmtlcjtcbiAgfVxuICBwcm92aWRlRG9jdW1lbnRDb2xvcnMobW9kZWwsIHRva2VuKSB7XG4gICAgY29uc3QgcmVzb3VyY2UgPSBtb2RlbC51cmk7XG4gICAgcmV0dXJuIHRoaXMuX3dvcmtlcihyZXNvdXJjZSkudGhlbigod29ya2VyKSA9PiB3b3JrZXIuZmluZERvY3VtZW50Q29sb3JzKHJlc291cmNlLnRvU3RyaW5nKCkpKS50aGVuKChpbmZvcykgPT4ge1xuICAgICAgaWYgKCFpbmZvcykge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICByZXR1cm4gaW5mb3MubWFwKChpdGVtKSA9PiAoe1xuICAgICAgICBjb2xvcjogaXRlbS5jb2xvcixcbiAgICAgICAgcmFuZ2U6IHRvUmFuZ2UoaXRlbS5yYW5nZSlcbiAgICAgIH0pKTtcbiAgICB9KTtcbiAgfVxuICBwcm92aWRlQ29sb3JQcmVzZW50YXRpb25zKG1vZGVsLCBpbmZvLCB0b2tlbikge1xuICAgIGNvbnN0IHJlc291cmNlID0gbW9kZWwudXJpO1xuICAgIHJldHVybiB0aGlzLl93b3JrZXIocmVzb3VyY2UpLnRoZW4oKHdvcmtlcikgPT4gd29ya2VyLmdldENvbG9yUHJlc2VudGF0aW9ucyhyZXNvdXJjZS50b1N0cmluZygpLCBpbmZvLmNvbG9yLCBmcm9tUmFuZ2UoaW5mby5yYW5nZSkpKS50aGVuKChwcmVzZW50YXRpb25zKSA9PiB7XG4gICAgICBpZiAoIXByZXNlbnRhdGlvbnMpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHByZXNlbnRhdGlvbnMubWFwKChwcmVzZW50YXRpb24pID0+IHtcbiAgICAgICAgbGV0IGl0ZW0gPSB7XG4gICAgICAgICAgbGFiZWw6IHByZXNlbnRhdGlvbi5sYWJlbFxuICAgICAgICB9O1xuICAgICAgICBpZiAocHJlc2VudGF0aW9uLnRleHRFZGl0KSB7XG4gICAgICAgICAgaXRlbS50ZXh0RWRpdCA9IHRvVGV4dEVkaXQocHJlc2VudGF0aW9uLnRleHRFZGl0KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocHJlc2VudGF0aW9uLmFkZGl0aW9uYWxUZXh0RWRpdHMpIHtcbiAgICAgICAgICBpdGVtLmFkZGl0aW9uYWxUZXh0RWRpdHMgPSBwcmVzZW50YXRpb24uYWRkaXRpb25hbFRleHRFZGl0cy5tYXAodG9UZXh0RWRpdCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGl0ZW07XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxufTtcbnZhciBGb2xkaW5nUmFuZ2VBZGFwdGVyID0gY2xhc3Mge1xuICBjb25zdHJ1Y3Rvcihfd29ya2VyKSB7XG4gICAgdGhpcy5fd29ya2VyID0gX3dvcmtlcjtcbiAgfVxuICBwcm92aWRlRm9sZGluZ1Jhbmdlcyhtb2RlbCwgY29udGV4dCwgdG9rZW4pIHtcbiAgICBjb25zdCByZXNvdXJjZSA9IG1vZGVsLnVyaTtcbiAgICByZXR1cm4gdGhpcy5fd29ya2VyKHJlc291cmNlKS50aGVuKCh3b3JrZXIpID0+IHdvcmtlci5nZXRGb2xkaW5nUmFuZ2VzKHJlc291cmNlLnRvU3RyaW5nKCksIGNvbnRleHQpKS50aGVuKChyYW5nZXMpID0+IHtcbiAgICAgIGlmICghcmFuZ2VzKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHJldHVybiByYW5nZXMubWFwKChyYW5nZSkgPT4ge1xuICAgICAgICBjb25zdCByZXN1bHQgPSB7XG4gICAgICAgICAgc3RhcnQ6IHJhbmdlLnN0YXJ0TGluZSArIDEsXG4gICAgICAgICAgZW5kOiByYW5nZS5lbmRMaW5lICsgMVxuICAgICAgICB9O1xuICAgICAgICBpZiAodHlwZW9mIHJhbmdlLmtpbmQgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICByZXN1bHQua2luZCA9IHRvRm9sZGluZ1JhbmdlS2luZChyYW5nZS5raW5kKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cbn07XG5mdW5jdGlvbiB0b0ZvbGRpbmdSYW5nZUtpbmQoa2luZCkge1xuICBzd2l0Y2ggKGtpbmQpIHtcbiAgICBjYXNlIEZvbGRpbmdSYW5nZUtpbmQuQ29tbWVudDpcbiAgICAgIHJldHVybiBtb25hY29fZWRpdG9yX2NvcmVfZXhwb3J0cy5sYW5ndWFnZXMuRm9sZGluZ1JhbmdlS2luZC5Db21tZW50O1xuICAgIGNhc2UgRm9sZGluZ1JhbmdlS2luZC5JbXBvcnRzOlxuICAgICAgcmV0dXJuIG1vbmFjb19lZGl0b3JfY29yZV9leHBvcnRzLmxhbmd1YWdlcy5Gb2xkaW5nUmFuZ2VLaW5kLkltcG9ydHM7XG4gICAgY2FzZSBGb2xkaW5nUmFuZ2VLaW5kLlJlZ2lvbjpcbiAgICAgIHJldHVybiBtb25hY29fZWRpdG9yX2NvcmVfZXhwb3J0cy5sYW5ndWFnZXMuRm9sZGluZ1JhbmdlS2luZC5SZWdpb247XG4gIH1cbiAgcmV0dXJuIHZvaWQgMDtcbn1cbnZhciBTZWxlY3Rpb25SYW5nZUFkYXB0ZXIgPSBjbGFzcyB7XG4gIGNvbnN0cnVjdG9yKF93b3JrZXIpIHtcbiAgICB0aGlzLl93b3JrZXIgPSBfd29ya2VyO1xuICB9XG4gIHByb3ZpZGVTZWxlY3Rpb25SYW5nZXMobW9kZWwsIHBvc2l0aW9ucywgdG9rZW4pIHtcbiAgICBjb25zdCByZXNvdXJjZSA9IG1vZGVsLnVyaTtcbiAgICByZXR1cm4gdGhpcy5fd29ya2VyKHJlc291cmNlKS50aGVuKCh3b3JrZXIpID0+IHdvcmtlci5nZXRTZWxlY3Rpb25SYW5nZXMocmVzb3VyY2UudG9TdHJpbmcoKSwgcG9zaXRpb25zLm1hcChmcm9tUG9zaXRpb24pKSkudGhlbigoc2VsZWN0aW9uUmFuZ2VzKSA9PiB7XG4gICAgICBpZiAoIXNlbGVjdGlvblJhbmdlcykge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICByZXR1cm4gc2VsZWN0aW9uUmFuZ2VzLm1hcCgoc2VsZWN0aW9uUmFuZ2UpID0+IHtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gW107XG4gICAgICAgIHdoaWxlIChzZWxlY3Rpb25SYW5nZSkge1xuICAgICAgICAgIHJlc3VsdC5wdXNoKHsgcmFuZ2U6IHRvUmFuZ2Uoc2VsZWN0aW9uUmFuZ2UucmFuZ2UpIH0pO1xuICAgICAgICAgIHNlbGVjdGlvblJhbmdlID0gc2VsZWN0aW9uUmFuZ2UucGFyZW50O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxufTtcblxuLy8gbm9kZV9tb2R1bGVzL2pzb25jLXBhcnNlci9saWIvZXNtL2ltcGwvc2Nhbm5lci5qc1xuZnVuY3Rpb24gY3JlYXRlU2Nhbm5lcih0ZXh0LCBpZ25vcmVUcml2aWEpIHtcbiAgaWYgKGlnbm9yZVRyaXZpYSA9PT0gdm9pZCAwKSB7XG4gICAgaWdub3JlVHJpdmlhID0gZmFsc2U7XG4gIH1cbiAgdmFyIGxlbiA9IHRleHQubGVuZ3RoO1xuICB2YXIgcG9zID0gMCwgdmFsdWUgPSBcIlwiLCB0b2tlbk9mZnNldCA9IDAsIHRva2VuID0gMTYsIGxpbmVOdW1iZXIgPSAwLCBsaW5lU3RhcnRPZmZzZXQgPSAwLCB0b2tlbkxpbmVTdGFydE9mZnNldCA9IDAsIHByZXZUb2tlbkxpbmVTdGFydE9mZnNldCA9IDAsIHNjYW5FcnJvciA9IDA7XG4gIGZ1bmN0aW9uIHNjYW5IZXhEaWdpdHMoY291bnQsIGV4YWN0KSB7XG4gICAgdmFyIGRpZ2l0cyA9IDA7XG4gICAgdmFyIHZhbHVlMiA9IDA7XG4gICAgd2hpbGUgKGRpZ2l0cyA8IGNvdW50IHx8ICFleGFjdCkge1xuICAgICAgdmFyIGNoID0gdGV4dC5jaGFyQ29kZUF0KHBvcyk7XG4gICAgICBpZiAoY2ggPj0gNDggJiYgY2ggPD0gNTcpIHtcbiAgICAgICAgdmFsdWUyID0gdmFsdWUyICogMTYgKyBjaCAtIDQ4O1xuICAgICAgfSBlbHNlIGlmIChjaCA+PSA2NSAmJiBjaCA8PSA3MCkge1xuICAgICAgICB2YWx1ZTIgPSB2YWx1ZTIgKiAxNiArIGNoIC0gNjUgKyAxMDtcbiAgICAgIH0gZWxzZSBpZiAoY2ggPj0gOTcgJiYgY2ggPD0gMTAyKSB7XG4gICAgICAgIHZhbHVlMiA9IHZhbHVlMiAqIDE2ICsgY2ggLSA5NyArIDEwO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBwb3MrKztcbiAgICAgIGRpZ2l0cysrO1xuICAgIH1cbiAgICBpZiAoZGlnaXRzIDwgY291bnQpIHtcbiAgICAgIHZhbHVlMiA9IC0xO1xuICAgIH1cbiAgICByZXR1cm4gdmFsdWUyO1xuICB9XG4gIGZ1bmN0aW9uIHNldFBvc2l0aW9uKG5ld1Bvc2l0aW9uKSB7XG4gICAgcG9zID0gbmV3UG9zaXRpb247XG4gICAgdmFsdWUgPSBcIlwiO1xuICAgIHRva2VuT2Zmc2V0ID0gMDtcbiAgICB0b2tlbiA9IDE2O1xuICAgIHNjYW5FcnJvciA9IDA7XG4gIH1cbiAgZnVuY3Rpb24gc2Nhbk51bWJlcigpIHtcbiAgICB2YXIgc3RhcnQgPSBwb3M7XG4gICAgaWYgKHRleHQuY2hhckNvZGVBdChwb3MpID09PSA0OCkge1xuICAgICAgcG9zKys7XG4gICAgfSBlbHNlIHtcbiAgICAgIHBvcysrO1xuICAgICAgd2hpbGUgKHBvcyA8IHRleHQubGVuZ3RoICYmIGlzRGlnaXQodGV4dC5jaGFyQ29kZUF0KHBvcykpKSB7XG4gICAgICAgIHBvcysrO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAocG9zIDwgdGV4dC5sZW5ndGggJiYgdGV4dC5jaGFyQ29kZUF0KHBvcykgPT09IDQ2KSB7XG4gICAgICBwb3MrKztcbiAgICAgIGlmIChwb3MgPCB0ZXh0Lmxlbmd0aCAmJiBpc0RpZ2l0KHRleHQuY2hhckNvZGVBdChwb3MpKSkge1xuICAgICAgICBwb3MrKztcbiAgICAgICAgd2hpbGUgKHBvcyA8IHRleHQubGVuZ3RoICYmIGlzRGlnaXQodGV4dC5jaGFyQ29kZUF0KHBvcykpKSB7XG4gICAgICAgICAgcG9zKys7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNjYW5FcnJvciA9IDM7XG4gICAgICAgIHJldHVybiB0ZXh0LnN1YnN0cmluZyhzdGFydCwgcG9zKTtcbiAgICAgIH1cbiAgICB9XG4gICAgdmFyIGVuZCA9IHBvcztcbiAgICBpZiAocG9zIDwgdGV4dC5sZW5ndGggJiYgKHRleHQuY2hhckNvZGVBdChwb3MpID09PSA2OSB8fCB0ZXh0LmNoYXJDb2RlQXQocG9zKSA9PT0gMTAxKSkge1xuICAgICAgcG9zKys7XG4gICAgICBpZiAocG9zIDwgdGV4dC5sZW5ndGggJiYgdGV4dC5jaGFyQ29kZUF0KHBvcykgPT09IDQzIHx8IHRleHQuY2hhckNvZGVBdChwb3MpID09PSA0NSkge1xuICAgICAgICBwb3MrKztcbiAgICAgIH1cbiAgICAgIGlmIChwb3MgPCB0ZXh0Lmxlbmd0aCAmJiBpc0RpZ2l0KHRleHQuY2hhckNvZGVBdChwb3MpKSkge1xuICAgICAgICBwb3MrKztcbiAgICAgICAgd2hpbGUgKHBvcyA8IHRleHQubGVuZ3RoICYmIGlzRGlnaXQodGV4dC5jaGFyQ29kZUF0KHBvcykpKSB7XG4gICAgICAgICAgcG9zKys7XG4gICAgICAgIH1cbiAgICAgICAgZW5kID0gcG9zO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2NhbkVycm9yID0gMztcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRleHQuc3Vic3RyaW5nKHN0YXJ0LCBlbmQpO1xuICB9XG4gIGZ1bmN0aW9uIHNjYW5TdHJpbmcoKSB7XG4gICAgdmFyIHJlc3VsdCA9IFwiXCIsIHN0YXJ0ID0gcG9zO1xuICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICBpZiAocG9zID49IGxlbikge1xuICAgICAgICByZXN1bHQgKz0gdGV4dC5zdWJzdHJpbmcoc3RhcnQsIHBvcyk7XG4gICAgICAgIHNjYW5FcnJvciA9IDI7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgdmFyIGNoID0gdGV4dC5jaGFyQ29kZUF0KHBvcyk7XG4gICAgICBpZiAoY2ggPT09IDM0KSB7XG4gICAgICAgIHJlc3VsdCArPSB0ZXh0LnN1YnN0cmluZyhzdGFydCwgcG9zKTtcbiAgICAgICAgcG9zKys7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgaWYgKGNoID09PSA5Mikge1xuICAgICAgICByZXN1bHQgKz0gdGV4dC5zdWJzdHJpbmcoc3RhcnQsIHBvcyk7XG4gICAgICAgIHBvcysrO1xuICAgICAgICBpZiAocG9zID49IGxlbikge1xuICAgICAgICAgIHNjYW5FcnJvciA9IDI7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGNoMiA9IHRleHQuY2hhckNvZGVBdChwb3MrKyk7XG4gICAgICAgIHN3aXRjaCAoY2gyKSB7XG4gICAgICAgICAgY2FzZSAzNDpcbiAgICAgICAgICAgIHJlc3VsdCArPSAnXCInO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSA5MjpcbiAgICAgICAgICAgIHJlc3VsdCArPSBcIlxcXFxcIjtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgNDc6XG4gICAgICAgICAgICByZXN1bHQgKz0gXCIvXCI7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlIDk4OlxuICAgICAgICAgICAgcmVzdWx0ICs9IFwiXFxiXCI7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlIDEwMjpcbiAgICAgICAgICAgIHJlc3VsdCArPSBcIlxcZlwiO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAxMTA6XG4gICAgICAgICAgICByZXN1bHQgKz0gXCJcXG5cIjtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgMTE0OlxuICAgICAgICAgICAgcmVzdWx0ICs9IFwiXFxyXCI7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlIDExNjpcbiAgICAgICAgICAgIHJlc3VsdCArPSBcIlx0XCI7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlIDExNzpcbiAgICAgICAgICAgIHZhciBjaDMgPSBzY2FuSGV4RGlnaXRzKDQsIHRydWUpO1xuICAgICAgICAgICAgaWYgKGNoMyA+PSAwKSB7XG4gICAgICAgICAgICAgIHJlc3VsdCArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGNoMyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBzY2FuRXJyb3IgPSA0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHNjYW5FcnJvciA9IDU7XG4gICAgICAgIH1cbiAgICAgICAgc3RhcnQgPSBwb3M7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgaWYgKGNoID49IDAgJiYgY2ggPD0gMzEpIHtcbiAgICAgICAgaWYgKGlzTGluZUJyZWFrKGNoKSkge1xuICAgICAgICAgIHJlc3VsdCArPSB0ZXh0LnN1YnN0cmluZyhzdGFydCwgcG9zKTtcbiAgICAgICAgICBzY2FuRXJyb3IgPSAyO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHNjYW5FcnJvciA9IDY7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHBvcysrO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG4gIGZ1bmN0aW9uIHNjYW5OZXh0KCkge1xuICAgIHZhbHVlID0gXCJcIjtcbiAgICBzY2FuRXJyb3IgPSAwO1xuICAgIHRva2VuT2Zmc2V0ID0gcG9zO1xuICAgIGxpbmVTdGFydE9mZnNldCA9IGxpbmVOdW1iZXI7XG4gICAgcHJldlRva2VuTGluZVN0YXJ0T2Zmc2V0ID0gdG9rZW5MaW5lU3RhcnRPZmZzZXQ7XG4gICAgaWYgKHBvcyA+PSBsZW4pIHtcbiAgICAgIHRva2VuT2Zmc2V0ID0gbGVuO1xuICAgICAgcmV0dXJuIHRva2VuID0gMTc7XG4gICAgfVxuICAgIHZhciBjb2RlID0gdGV4dC5jaGFyQ29kZUF0KHBvcyk7XG4gICAgaWYgKGlzV2hpdGVTcGFjZShjb2RlKSkge1xuICAgICAgZG8ge1xuICAgICAgICBwb3MrKztcbiAgICAgICAgdmFsdWUgKz0gU3RyaW5nLmZyb21DaGFyQ29kZShjb2RlKTtcbiAgICAgICAgY29kZSA9IHRleHQuY2hhckNvZGVBdChwb3MpO1xuICAgICAgfSB3aGlsZSAoaXNXaGl0ZVNwYWNlKGNvZGUpKTtcbiAgICAgIHJldHVybiB0b2tlbiA9IDE1O1xuICAgIH1cbiAgICBpZiAoaXNMaW5lQnJlYWsoY29kZSkpIHtcbiAgICAgIHBvcysrO1xuICAgICAgdmFsdWUgKz0gU3RyaW5nLmZyb21DaGFyQ29kZShjb2RlKTtcbiAgICAgIGlmIChjb2RlID09PSAxMyAmJiB0ZXh0LmNoYXJDb2RlQXQocG9zKSA9PT0gMTApIHtcbiAgICAgICAgcG9zKys7XG4gICAgICAgIHZhbHVlICs9IFwiXFxuXCI7XG4gICAgICB9XG4gICAgICBsaW5lTnVtYmVyKys7XG4gICAgICB0b2tlbkxpbmVTdGFydE9mZnNldCA9IHBvcztcbiAgICAgIHJldHVybiB0b2tlbiA9IDE0O1xuICAgIH1cbiAgICBzd2l0Y2ggKGNvZGUpIHtcbiAgICAgIGNhc2UgMTIzOlxuICAgICAgICBwb3MrKztcbiAgICAgICAgcmV0dXJuIHRva2VuID0gMTtcbiAgICAgIGNhc2UgMTI1OlxuICAgICAgICBwb3MrKztcbiAgICAgICAgcmV0dXJuIHRva2VuID0gMjtcbiAgICAgIGNhc2UgOTE6XG4gICAgICAgIHBvcysrO1xuICAgICAgICByZXR1cm4gdG9rZW4gPSAzO1xuICAgICAgY2FzZSA5MzpcbiAgICAgICAgcG9zKys7XG4gICAgICAgIHJldHVybiB0b2tlbiA9IDQ7XG4gICAgICBjYXNlIDU4OlxuICAgICAgICBwb3MrKztcbiAgICAgICAgcmV0dXJuIHRva2VuID0gNjtcbiAgICAgIGNhc2UgNDQ6XG4gICAgICAgIHBvcysrO1xuICAgICAgICByZXR1cm4gdG9rZW4gPSA1O1xuICAgICAgY2FzZSAzNDpcbiAgICAgICAgcG9zKys7XG4gICAgICAgIHZhbHVlID0gc2NhblN0cmluZygpO1xuICAgICAgICByZXR1cm4gdG9rZW4gPSAxMDtcbiAgICAgIGNhc2UgNDc6XG4gICAgICAgIHZhciBzdGFydCA9IHBvcyAtIDE7XG4gICAgICAgIGlmICh0ZXh0LmNoYXJDb2RlQXQocG9zICsgMSkgPT09IDQ3KSB7XG4gICAgICAgICAgcG9zICs9IDI7XG4gICAgICAgICAgd2hpbGUgKHBvcyA8IGxlbikge1xuICAgICAgICAgICAgaWYgKGlzTGluZUJyZWFrKHRleHQuY2hhckNvZGVBdChwb3MpKSkge1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHBvcysrO1xuICAgICAgICAgIH1cbiAgICAgICAgICB2YWx1ZSA9IHRleHQuc3Vic3RyaW5nKHN0YXJ0LCBwb3MpO1xuICAgICAgICAgIHJldHVybiB0b2tlbiA9IDEyO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0ZXh0LmNoYXJDb2RlQXQocG9zICsgMSkgPT09IDQyKSB7XG4gICAgICAgICAgcG9zICs9IDI7XG4gICAgICAgICAgdmFyIHNhZmVMZW5ndGggPSBsZW4gLSAxO1xuICAgICAgICAgIHZhciBjb21tZW50Q2xvc2VkID0gZmFsc2U7XG4gICAgICAgICAgd2hpbGUgKHBvcyA8IHNhZmVMZW5ndGgpIHtcbiAgICAgICAgICAgIHZhciBjaCA9IHRleHQuY2hhckNvZGVBdChwb3MpO1xuICAgICAgICAgICAgaWYgKGNoID09PSA0MiAmJiB0ZXh0LmNoYXJDb2RlQXQocG9zICsgMSkgPT09IDQ3KSB7XG4gICAgICAgICAgICAgIHBvcyArPSAyO1xuICAgICAgICAgICAgICBjb21tZW50Q2xvc2VkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBwb3MrKztcbiAgICAgICAgICAgIGlmIChpc0xpbmVCcmVhayhjaCkpIHtcbiAgICAgICAgICAgICAgaWYgKGNoID09PSAxMyAmJiB0ZXh0LmNoYXJDb2RlQXQocG9zKSA9PT0gMTApIHtcbiAgICAgICAgICAgICAgICBwb3MrKztcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBsaW5lTnVtYmVyKys7XG4gICAgICAgICAgICAgIHRva2VuTGluZVN0YXJ0T2Zmc2V0ID0gcG9zO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoIWNvbW1lbnRDbG9zZWQpIHtcbiAgICAgICAgICAgIHBvcysrO1xuICAgICAgICAgICAgc2NhbkVycm9yID0gMTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdmFsdWUgPSB0ZXh0LnN1YnN0cmluZyhzdGFydCwgcG9zKTtcbiAgICAgICAgICByZXR1cm4gdG9rZW4gPSAxMztcbiAgICAgICAgfVxuICAgICAgICB2YWx1ZSArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGNvZGUpO1xuICAgICAgICBwb3MrKztcbiAgICAgICAgcmV0dXJuIHRva2VuID0gMTY7XG4gICAgICBjYXNlIDQ1OlxuICAgICAgICB2YWx1ZSArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGNvZGUpO1xuICAgICAgICBwb3MrKztcbiAgICAgICAgaWYgKHBvcyA9PT0gbGVuIHx8ICFpc0RpZ2l0KHRleHQuY2hhckNvZGVBdChwb3MpKSkge1xuICAgICAgICAgIHJldHVybiB0b2tlbiA9IDE2O1xuICAgICAgICB9XG4gICAgICBjYXNlIDQ4OlxuICAgICAgY2FzZSA0OTpcbiAgICAgIGNhc2UgNTA6XG4gICAgICBjYXNlIDUxOlxuICAgICAgY2FzZSA1MjpcbiAgICAgIGNhc2UgNTM6XG4gICAgICBjYXNlIDU0OlxuICAgICAgY2FzZSA1NTpcbiAgICAgIGNhc2UgNTY6XG4gICAgICBjYXNlIDU3OlxuICAgICAgICB2YWx1ZSArPSBzY2FuTnVtYmVyKCk7XG4gICAgICAgIHJldHVybiB0b2tlbiA9IDExO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgd2hpbGUgKHBvcyA8IGxlbiAmJiBpc1Vua25vd25Db250ZW50Q2hhcmFjdGVyKGNvZGUpKSB7XG4gICAgICAgICAgcG9zKys7XG4gICAgICAgICAgY29kZSA9IHRleHQuY2hhckNvZGVBdChwb3MpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0b2tlbk9mZnNldCAhPT0gcG9zKSB7XG4gICAgICAgICAgdmFsdWUgPSB0ZXh0LnN1YnN0cmluZyh0b2tlbk9mZnNldCwgcG9zKTtcbiAgICAgICAgICBzd2l0Y2ggKHZhbHVlKSB7XG4gICAgICAgICAgICBjYXNlIFwidHJ1ZVwiOlxuICAgICAgICAgICAgICByZXR1cm4gdG9rZW4gPSA4O1xuICAgICAgICAgICAgY2FzZSBcImZhbHNlXCI6XG4gICAgICAgICAgICAgIHJldHVybiB0b2tlbiA9IDk7XG4gICAgICAgICAgICBjYXNlIFwibnVsbFwiOlxuICAgICAgICAgICAgICByZXR1cm4gdG9rZW4gPSA3O1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gdG9rZW4gPSAxNjtcbiAgICAgICAgfVxuICAgICAgICB2YWx1ZSArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGNvZGUpO1xuICAgICAgICBwb3MrKztcbiAgICAgICAgcmV0dXJuIHRva2VuID0gMTY7XG4gICAgfVxuICB9XG4gIGZ1bmN0aW9uIGlzVW5rbm93bkNvbnRlbnRDaGFyYWN0ZXIoY29kZSkge1xuICAgIGlmIChpc1doaXRlU3BhY2UoY29kZSkgfHwgaXNMaW5lQnJlYWsoY29kZSkpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgc3dpdGNoIChjb2RlKSB7XG4gICAgICBjYXNlIDEyNTpcbiAgICAgIGNhc2UgOTM6XG4gICAgICBjYXNlIDEyMzpcbiAgICAgIGNhc2UgOTE6XG4gICAgICBjYXNlIDM0OlxuICAgICAgY2FzZSA1ODpcbiAgICAgIGNhc2UgNDQ6XG4gICAgICBjYXNlIDQ3OlxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIGZ1bmN0aW9uIHNjYW5OZXh0Tm9uVHJpdmlhKCkge1xuICAgIHZhciByZXN1bHQ7XG4gICAgZG8ge1xuICAgICAgcmVzdWx0ID0gc2Nhbk5leHQoKTtcbiAgICB9IHdoaWxlIChyZXN1bHQgPj0gMTIgJiYgcmVzdWx0IDw9IDE1KTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG4gIHJldHVybiB7XG4gICAgc2V0UG9zaXRpb24sXG4gICAgZ2V0UG9zaXRpb246IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHBvcztcbiAgICB9LFxuICAgIHNjYW46IGlnbm9yZVRyaXZpYSA/IHNjYW5OZXh0Tm9uVHJpdmlhIDogc2Nhbk5leHQsXG4gICAgZ2V0VG9rZW46IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHRva2VuO1xuICAgIH0sXG4gICAgZ2V0VG9rZW5WYWx1ZTogZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gdmFsdWU7XG4gICAgfSxcbiAgICBnZXRUb2tlbk9mZnNldDogZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gdG9rZW5PZmZzZXQ7XG4gICAgfSxcbiAgICBnZXRUb2tlbkxlbmd0aDogZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gcG9zIC0gdG9rZW5PZmZzZXQ7XG4gICAgfSxcbiAgICBnZXRUb2tlblN0YXJ0TGluZTogZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gbGluZVN0YXJ0T2Zmc2V0O1xuICAgIH0sXG4gICAgZ2V0VG9rZW5TdGFydENoYXJhY3RlcjogZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gdG9rZW5PZmZzZXQgLSBwcmV2VG9rZW5MaW5lU3RhcnRPZmZzZXQ7XG4gICAgfSxcbiAgICBnZXRUb2tlbkVycm9yOiBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBzY2FuRXJyb3I7XG4gICAgfVxuICB9O1xufVxuZnVuY3Rpb24gaXNXaGl0ZVNwYWNlKGNoKSB7XG4gIHJldHVybiBjaCA9PT0gMzIgfHwgY2ggPT09IDkgfHwgY2ggPT09IDExIHx8IGNoID09PSAxMiB8fCBjaCA9PT0gMTYwIHx8IGNoID09PSA1NzYwIHx8IGNoID49IDgxOTIgJiYgY2ggPD0gODIwMyB8fCBjaCA9PT0gODIzOSB8fCBjaCA9PT0gODI4NyB8fCBjaCA9PT0gMTIyODggfHwgY2ggPT09IDY1Mjc5O1xufVxuZnVuY3Rpb24gaXNMaW5lQnJlYWsoY2gpIHtcbiAgcmV0dXJuIGNoID09PSAxMCB8fCBjaCA9PT0gMTMgfHwgY2ggPT09IDgyMzIgfHwgY2ggPT09IDgyMzM7XG59XG5mdW5jdGlvbiBpc0RpZ2l0KGNoKSB7XG4gIHJldHVybiBjaCA+PSA0OCAmJiBjaCA8PSA1Nztcbn1cblxuLy8gbm9kZV9tb2R1bGVzL2pzb25jLXBhcnNlci9saWIvZXNtL2ltcGwvcGFyc2VyLmpzXG52YXIgUGFyc2VPcHRpb25zO1xuKGZ1bmN0aW9uKFBhcnNlT3B0aW9uczIpIHtcbiAgUGFyc2VPcHRpb25zMi5ERUZBVUxUID0ge1xuICAgIGFsbG93VHJhaWxpbmdDb21tYTogZmFsc2VcbiAgfTtcbn0pKFBhcnNlT3B0aW9ucyB8fCAoUGFyc2VPcHRpb25zID0ge30pKTtcblxuLy8gbm9kZV9tb2R1bGVzL2pzb25jLXBhcnNlci9saWIvZXNtL21haW4uanNcbnZhciBjcmVhdGVTY2FubmVyMiA9IGNyZWF0ZVNjYW5uZXI7XG5cbi8vIHNyYy9sYW5ndWFnZS9qc29uL3Rva2VuaXphdGlvbi50c1xuZnVuY3Rpb24gY3JlYXRlVG9rZW5pemF0aW9uU3VwcG9ydChzdXBwb3J0Q29tbWVudHMpIHtcbiAgcmV0dXJuIHtcbiAgICBnZXRJbml0aWFsU3RhdGU6ICgpID0+IG5ldyBKU09OU3RhdGUobnVsbCwgbnVsbCwgZmFsc2UsIG51bGwpLFxuICAgIHRva2VuaXplOiAobGluZSwgc3RhdGUpID0+IHRva2VuaXplKHN1cHBvcnRDb21tZW50cywgbGluZSwgc3RhdGUpXG4gIH07XG59XG52YXIgVE9LRU5fREVMSU1fT0JKRUNUID0gXCJkZWxpbWl0ZXIuYnJhY2tldC5qc29uXCI7XG52YXIgVE9LRU5fREVMSU1fQVJSQVkgPSBcImRlbGltaXRlci5hcnJheS5qc29uXCI7XG52YXIgVE9LRU5fREVMSU1fQ09MT04gPSBcImRlbGltaXRlci5jb2xvbi5qc29uXCI7XG52YXIgVE9LRU5fREVMSU1fQ09NTUEgPSBcImRlbGltaXRlci5jb21tYS5qc29uXCI7XG52YXIgVE9LRU5fVkFMVUVfQk9PTEVBTiA9IFwia2V5d29yZC5qc29uXCI7XG52YXIgVE9LRU5fVkFMVUVfTlVMTCA9IFwia2V5d29yZC5qc29uXCI7XG52YXIgVE9LRU5fVkFMVUVfU1RSSU5HID0gXCJzdHJpbmcudmFsdWUuanNvblwiO1xudmFyIFRPS0VOX1ZBTFVFX05VTUJFUiA9IFwibnVtYmVyLmpzb25cIjtcbnZhciBUT0tFTl9QUk9QRVJUWV9OQU1FID0gXCJzdHJpbmcua2V5Lmpzb25cIjtcbnZhciBUT0tFTl9DT01NRU5UX0JMT0NLID0gXCJjb21tZW50LmJsb2NrLmpzb25cIjtcbnZhciBUT0tFTl9DT01NRU5UX0xJTkUgPSBcImNvbW1lbnQubGluZS5qc29uXCI7XG52YXIgUGFyZW50c1N0YWNrID0gY2xhc3Mge1xuICBjb25zdHJ1Y3RvcihwYXJlbnQsIHR5cGUpIHtcbiAgICB0aGlzLnBhcmVudCA9IHBhcmVudDtcbiAgICB0aGlzLnR5cGUgPSB0eXBlO1xuICB9XG4gIHN0YXRpYyBwb3AocGFyZW50cykge1xuICAgIGlmIChwYXJlbnRzKSB7XG4gICAgICByZXR1cm4gcGFyZW50cy5wYXJlbnQ7XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9XG4gIHN0YXRpYyBwdXNoKHBhcmVudHMsIHR5cGUpIHtcbiAgICByZXR1cm4gbmV3IFBhcmVudHNTdGFjayhwYXJlbnRzLCB0eXBlKTtcbiAgfVxuICBzdGF0aWMgZXF1YWxzKGEsIGIpIHtcbiAgICBpZiAoIWEgJiYgIWIpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBpZiAoIWEgfHwgIWIpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgd2hpbGUgKGEgJiYgYikge1xuICAgICAgaWYgKGEgPT09IGIpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgICBpZiAoYS50eXBlICE9PSBiLnR5cGUpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgYSA9IGEucGFyZW50O1xuICAgICAgYiA9IGIucGFyZW50O1xuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxufTtcbnZhciBKU09OU3RhdGUgPSBjbGFzcyB7XG4gIF9zdGF0ZTtcbiAgc2NhbkVycm9yO1xuICBsYXN0V2FzQ29sb247XG4gIHBhcmVudHM7XG4gIGNvbnN0cnVjdG9yKHN0YXRlLCBzY2FuRXJyb3IsIGxhc3RXYXNDb2xvbiwgcGFyZW50cykge1xuICAgIHRoaXMuX3N0YXRlID0gc3RhdGU7XG4gICAgdGhpcy5zY2FuRXJyb3IgPSBzY2FuRXJyb3I7XG4gICAgdGhpcy5sYXN0V2FzQ29sb24gPSBsYXN0V2FzQ29sb247XG4gICAgdGhpcy5wYXJlbnRzID0gcGFyZW50cztcbiAgfVxuICBjbG9uZSgpIHtcbiAgICByZXR1cm4gbmV3IEpTT05TdGF0ZSh0aGlzLl9zdGF0ZSwgdGhpcy5zY2FuRXJyb3IsIHRoaXMubGFzdFdhc0NvbG9uLCB0aGlzLnBhcmVudHMpO1xuICB9XG4gIGVxdWFscyhvdGhlcikge1xuICAgIGlmIChvdGhlciA9PT0gdGhpcykge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIGlmICghb3RoZXIgfHwgIShvdGhlciBpbnN0YW5jZW9mIEpTT05TdGF0ZSkpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuc2NhbkVycm9yID09PSBvdGhlci5zY2FuRXJyb3IgJiYgdGhpcy5sYXN0V2FzQ29sb24gPT09IG90aGVyLmxhc3RXYXNDb2xvbiAmJiBQYXJlbnRzU3RhY2suZXF1YWxzKHRoaXMucGFyZW50cywgb3RoZXIucGFyZW50cyk7XG4gIH1cbiAgZ2V0U3RhdGVEYXRhKCkge1xuICAgIHJldHVybiB0aGlzLl9zdGF0ZTtcbiAgfVxuICBzZXRTdGF0ZURhdGEoc3RhdGUpIHtcbiAgICB0aGlzLl9zdGF0ZSA9IHN0YXRlO1xuICB9XG59O1xuZnVuY3Rpb24gdG9rZW5pemUoY29tbWVudHMsIGxpbmUsIHN0YXRlLCBvZmZzZXREZWx0YSA9IDApIHtcbiAgbGV0IG51bWJlck9mSW5zZXJ0ZWRDaGFyYWN0ZXJzID0gMDtcbiAgbGV0IGFkanVzdE9mZnNldCA9IGZhbHNlO1xuICBzd2l0Y2ggKHN0YXRlLnNjYW5FcnJvcikge1xuICAgIGNhc2UgMiAvKiBVbmV4cGVjdGVkRW5kT2ZTdHJpbmcgKi86XG4gICAgICBsaW5lID0gJ1wiJyArIGxpbmU7XG4gICAgICBudW1iZXJPZkluc2VydGVkQ2hhcmFjdGVycyA9IDE7XG4gICAgICBicmVhaztcbiAgICBjYXNlIDEgLyogVW5leHBlY3RlZEVuZE9mQ29tbWVudCAqLzpcbiAgICAgIGxpbmUgPSBcIi8qXCIgKyBsaW5lO1xuICAgICAgbnVtYmVyT2ZJbnNlcnRlZENoYXJhY3RlcnMgPSAyO1xuICAgICAgYnJlYWs7XG4gIH1cbiAgY29uc3Qgc2Nhbm5lciA9IGNyZWF0ZVNjYW5uZXIyKGxpbmUpO1xuICBsZXQgbGFzdFdhc0NvbG9uID0gc3RhdGUubGFzdFdhc0NvbG9uO1xuICBsZXQgcGFyZW50cyA9IHN0YXRlLnBhcmVudHM7XG4gIGNvbnN0IHJldCA9IHtcbiAgICB0b2tlbnM6IFtdLFxuICAgIGVuZFN0YXRlOiBzdGF0ZS5jbG9uZSgpXG4gIH07XG4gIHdoaWxlICh0cnVlKSB7XG4gICAgbGV0IG9mZnNldCA9IG9mZnNldERlbHRhICsgc2Nhbm5lci5nZXRQb3NpdGlvbigpO1xuICAgIGxldCB0eXBlID0gXCJcIjtcbiAgICBjb25zdCBraW5kID0gc2Nhbm5lci5zY2FuKCk7XG4gICAgaWYgKGtpbmQgPT09IDE3IC8qIEVPRiAqLykge1xuICAgICAgYnJlYWs7XG4gICAgfVxuICAgIGlmIChvZmZzZXQgPT09IG9mZnNldERlbHRhICsgc2Nhbm5lci5nZXRQb3NpdGlvbigpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJTY2FubmVyIGRpZCBub3QgYWR2YW5jZSwgbmV4dCAzIGNoYXJhY3RlcnMgYXJlOiBcIiArIGxpbmUuc3Vic3RyKHNjYW5uZXIuZ2V0UG9zaXRpb24oKSwgMykpO1xuICAgIH1cbiAgICBpZiAoYWRqdXN0T2Zmc2V0KSB7XG4gICAgICBvZmZzZXQgLT0gbnVtYmVyT2ZJbnNlcnRlZENoYXJhY3RlcnM7XG4gICAgfVxuICAgIGFkanVzdE9mZnNldCA9IG51bWJlck9mSW5zZXJ0ZWRDaGFyYWN0ZXJzID4gMDtcbiAgICBzd2l0Y2ggKGtpbmQpIHtcbiAgICAgIGNhc2UgMSAvKiBPcGVuQnJhY2VUb2tlbiAqLzpcbiAgICAgICAgcGFyZW50cyA9IFBhcmVudHNTdGFjay5wdXNoKHBhcmVudHMsIDAgLyogT2JqZWN0ICovKTtcbiAgICAgICAgdHlwZSA9IFRPS0VOX0RFTElNX09CSkVDVDtcbiAgICAgICAgbGFzdFdhc0NvbG9uID0gZmFsc2U7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAyIC8qIENsb3NlQnJhY2VUb2tlbiAqLzpcbiAgICAgICAgcGFyZW50cyA9IFBhcmVudHNTdGFjay5wb3AocGFyZW50cyk7XG4gICAgICAgIHR5cGUgPSBUT0tFTl9ERUxJTV9PQkpFQ1Q7XG4gICAgICAgIGxhc3RXYXNDb2xvbiA9IGZhbHNlO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMyAvKiBPcGVuQnJhY2tldFRva2VuICovOlxuICAgICAgICBwYXJlbnRzID0gUGFyZW50c1N0YWNrLnB1c2gocGFyZW50cywgMSAvKiBBcnJheSAqLyk7XG4gICAgICAgIHR5cGUgPSBUT0tFTl9ERUxJTV9BUlJBWTtcbiAgICAgICAgbGFzdFdhc0NvbG9uID0gZmFsc2U7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSA0IC8qIENsb3NlQnJhY2tldFRva2VuICovOlxuICAgICAgICBwYXJlbnRzID0gUGFyZW50c1N0YWNrLnBvcChwYXJlbnRzKTtcbiAgICAgICAgdHlwZSA9IFRPS0VOX0RFTElNX0FSUkFZO1xuICAgICAgICBsYXN0V2FzQ29sb24gPSBmYWxzZTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDYgLyogQ29sb25Ub2tlbiAqLzpcbiAgICAgICAgdHlwZSA9IFRPS0VOX0RFTElNX0NPTE9OO1xuICAgICAgICBsYXN0V2FzQ29sb24gPSB0cnVlO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgNSAvKiBDb21tYVRva2VuICovOlxuICAgICAgICB0eXBlID0gVE9LRU5fREVMSU1fQ09NTUE7XG4gICAgICAgIGxhc3RXYXNDb2xvbiA9IGZhbHNlO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgOCAvKiBUcnVlS2V5d29yZCAqLzpcbiAgICAgIGNhc2UgOSAvKiBGYWxzZUtleXdvcmQgKi86XG4gICAgICAgIHR5cGUgPSBUT0tFTl9WQUxVRV9CT09MRUFOO1xuICAgICAgICBsYXN0V2FzQ29sb24gPSBmYWxzZTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDcgLyogTnVsbEtleXdvcmQgKi86XG4gICAgICAgIHR5cGUgPSBUT0tFTl9WQUxVRV9OVUxMO1xuICAgICAgICBsYXN0V2FzQ29sb24gPSBmYWxzZTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDEwIC8qIFN0cmluZ0xpdGVyYWwgKi86XG4gICAgICAgIGNvbnN0IGN1cnJlbnRQYXJlbnQgPSBwYXJlbnRzID8gcGFyZW50cy50eXBlIDogMCAvKiBPYmplY3QgKi87XG4gICAgICAgIGNvbnN0IGluQXJyYXkgPSBjdXJyZW50UGFyZW50ID09PSAxIC8qIEFycmF5ICovO1xuICAgICAgICB0eXBlID0gbGFzdFdhc0NvbG9uIHx8IGluQXJyYXkgPyBUT0tFTl9WQUxVRV9TVFJJTkcgOiBUT0tFTl9QUk9QRVJUWV9OQU1FO1xuICAgICAgICBsYXN0V2FzQ29sb24gPSBmYWxzZTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDExIC8qIE51bWVyaWNMaXRlcmFsICovOlxuICAgICAgICB0eXBlID0gVE9LRU5fVkFMVUVfTlVNQkVSO1xuICAgICAgICBsYXN0V2FzQ29sb24gPSBmYWxzZTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICAgIGlmIChjb21tZW50cykge1xuICAgICAgc3dpdGNoIChraW5kKSB7XG4gICAgICAgIGNhc2UgMTIgLyogTGluZUNvbW1lbnRUcml2aWEgKi86XG4gICAgICAgICAgdHlwZSA9IFRPS0VOX0NPTU1FTlRfTElORTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAxMyAvKiBCbG9ja0NvbW1lbnRUcml2aWEgKi86XG4gICAgICAgICAgdHlwZSA9IFRPS0VOX0NPTU1FTlRfQkxPQ0s7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICAgIHJldC5lbmRTdGF0ZSA9IG5ldyBKU09OU3RhdGUoc3RhdGUuZ2V0U3RhdGVEYXRhKCksIHNjYW5uZXIuZ2V0VG9rZW5FcnJvcigpLCBsYXN0V2FzQ29sb24sIHBhcmVudHMpO1xuICAgIHJldC50b2tlbnMucHVzaCh7XG4gICAgICBzdGFydEluZGV4OiBvZmZzZXQsXG4gICAgICBzY29wZXM6IHR5cGVcbiAgICB9KTtcbiAgfVxuICByZXR1cm4gcmV0O1xufVxuXG4vLyBzcmMvbGFuZ3VhZ2UvanNvbi9qc29uTW9kZS50c1xudmFyIEpTT05EaWFnbm9zdGljc0FkYXB0ZXIgPSBjbGFzcyBleHRlbmRzIERpYWdub3N0aWNzQWRhcHRlciB7XG4gIGNvbnN0cnVjdG9yKGxhbmd1YWdlSWQsIHdvcmtlciwgZGVmYXVsdHMpIHtcbiAgICBzdXBlcihsYW5ndWFnZUlkLCB3b3JrZXIsIGRlZmF1bHRzLm9uRGlkQ2hhbmdlKTtcbiAgICB0aGlzLl9kaXNwb3NhYmxlcy5wdXNoKG1vbmFjb19lZGl0b3JfY29yZV9leHBvcnRzLmVkaXRvci5vbldpbGxEaXNwb3NlTW9kZWwoKG1vZGVsKSA9PiB7XG4gICAgICB0aGlzLl9yZXNldFNjaGVtYShtb2RlbC51cmkpO1xuICAgIH0pKTtcbiAgICB0aGlzLl9kaXNwb3NhYmxlcy5wdXNoKG1vbmFjb19lZGl0b3JfY29yZV9leHBvcnRzLmVkaXRvci5vbkRpZENoYW5nZU1vZGVsTGFuZ3VhZ2UoKGV2ZW50KSA9PiB7XG4gICAgICB0aGlzLl9yZXNldFNjaGVtYShldmVudC5tb2RlbC51cmkpO1xuICAgIH0pKTtcbiAgfVxuICBfcmVzZXRTY2hlbWEocmVzb3VyY2UpIHtcbiAgICB0aGlzLl93b3JrZXIoKS50aGVuKCh3b3JrZXIpID0+IHtcbiAgICAgIHdvcmtlci5yZXNldFNjaGVtYShyZXNvdXJjZS50b1N0cmluZygpKTtcbiAgICB9KTtcbiAgfVxufTtcbmZ1bmN0aW9uIHNldHVwTW9kZShkZWZhdWx0cykge1xuICBjb25zdCBkaXNwb3NhYmxlcyA9IFtdO1xuICBjb25zdCBwcm92aWRlcnMgPSBbXTtcbiAgY29uc3QgY2xpZW50ID0gbmV3IFdvcmtlck1hbmFnZXIoZGVmYXVsdHMpO1xuICBkaXNwb3NhYmxlcy5wdXNoKGNsaWVudCk7XG4gIGNvbnN0IHdvcmtlciA9ICguLi51cmlzKSA9PiB7XG4gICAgcmV0dXJuIGNsaWVudC5nZXRMYW5ndWFnZVNlcnZpY2VXb3JrZXIoLi4udXJpcyk7XG4gIH07XG4gIGZ1bmN0aW9uIHJlZ2lzdGVyUHJvdmlkZXJzKCkge1xuICAgIGNvbnN0IHsgbGFuZ3VhZ2VJZCwgbW9kZUNvbmZpZ3VyYXRpb246IG1vZGVDb25maWd1cmF0aW9uMiB9ID0gZGVmYXVsdHM7XG4gICAgZGlzcG9zZUFsbChwcm92aWRlcnMpO1xuICAgIGlmIChtb2RlQ29uZmlndXJhdGlvbjIuZG9jdW1lbnRGb3JtYXR0aW5nRWRpdHMpIHtcbiAgICAgIHByb3ZpZGVycy5wdXNoKG1vbmFjb19lZGl0b3JfY29yZV9leHBvcnRzLmxhbmd1YWdlcy5yZWdpc3RlckRvY3VtZW50Rm9ybWF0dGluZ0VkaXRQcm92aWRlcihsYW5ndWFnZUlkLCBuZXcgRG9jdW1lbnRGb3JtYXR0aW5nRWRpdFByb3ZpZGVyKHdvcmtlcikpKTtcbiAgICB9XG4gICAgaWYgKG1vZGVDb25maWd1cmF0aW9uMi5kb2N1bWVudFJhbmdlRm9ybWF0dGluZ0VkaXRzKSB7XG4gICAgICBwcm92aWRlcnMucHVzaChtb25hY29fZWRpdG9yX2NvcmVfZXhwb3J0cy5sYW5ndWFnZXMucmVnaXN0ZXJEb2N1bWVudFJhbmdlRm9ybWF0dGluZ0VkaXRQcm92aWRlcihsYW5ndWFnZUlkLCBuZXcgRG9jdW1lbnRSYW5nZUZvcm1hdHRpbmdFZGl0UHJvdmlkZXIod29ya2VyKSkpO1xuICAgIH1cbiAgICBpZiAobW9kZUNvbmZpZ3VyYXRpb24yLmNvbXBsZXRpb25JdGVtcykge1xuICAgICAgcHJvdmlkZXJzLnB1c2gobW9uYWNvX2VkaXRvcl9jb3JlX2V4cG9ydHMubGFuZ3VhZ2VzLnJlZ2lzdGVyQ29tcGxldGlvbkl0ZW1Qcm92aWRlcihsYW5ndWFnZUlkLCBuZXcgQ29tcGxldGlvbkFkYXB0ZXIod29ya2VyLCBbXCIgXCIsIFwiOlwiLCAnXCInXSkpKTtcbiAgICB9XG4gICAgaWYgKG1vZGVDb25maWd1cmF0aW9uMi5ob3ZlcnMpIHtcbiAgICAgIHByb3ZpZGVycy5wdXNoKG1vbmFjb19lZGl0b3JfY29yZV9leHBvcnRzLmxhbmd1YWdlcy5yZWdpc3RlckhvdmVyUHJvdmlkZXIobGFuZ3VhZ2VJZCwgbmV3IEhvdmVyQWRhcHRlcih3b3JrZXIpKSk7XG4gICAgfVxuICAgIGlmIChtb2RlQ29uZmlndXJhdGlvbjIuZG9jdW1lbnRTeW1ib2xzKSB7XG4gICAgICBwcm92aWRlcnMucHVzaChtb25hY29fZWRpdG9yX2NvcmVfZXhwb3J0cy5sYW5ndWFnZXMucmVnaXN0ZXJEb2N1bWVudFN5bWJvbFByb3ZpZGVyKGxhbmd1YWdlSWQsIG5ldyBEb2N1bWVudFN5bWJvbEFkYXB0ZXIod29ya2VyKSkpO1xuICAgIH1cbiAgICBpZiAobW9kZUNvbmZpZ3VyYXRpb24yLnRva2Vucykge1xuICAgICAgcHJvdmlkZXJzLnB1c2gobW9uYWNvX2VkaXRvcl9jb3JlX2V4cG9ydHMubGFuZ3VhZ2VzLnNldFRva2Vuc1Byb3ZpZGVyKGxhbmd1YWdlSWQsIGNyZWF0ZVRva2VuaXphdGlvblN1cHBvcnQodHJ1ZSkpKTtcbiAgICB9XG4gICAgaWYgKG1vZGVDb25maWd1cmF0aW9uMi5jb2xvcnMpIHtcbiAgICAgIHByb3ZpZGVycy5wdXNoKG1vbmFjb19lZGl0b3JfY29yZV9leHBvcnRzLmxhbmd1YWdlcy5yZWdpc3RlckNvbG9yUHJvdmlkZXIobGFuZ3VhZ2VJZCwgbmV3IERvY3VtZW50Q29sb3JBZGFwdGVyKHdvcmtlcikpKTtcbiAgICB9XG4gICAgaWYgKG1vZGVDb25maWd1cmF0aW9uMi5mb2xkaW5nUmFuZ2VzKSB7XG4gICAgICBwcm92aWRlcnMucHVzaChtb25hY29fZWRpdG9yX2NvcmVfZXhwb3J0cy5sYW5ndWFnZXMucmVnaXN0ZXJGb2xkaW5nUmFuZ2VQcm92aWRlcihsYW5ndWFnZUlkLCBuZXcgRm9sZGluZ1JhbmdlQWRhcHRlcih3b3JrZXIpKSk7XG4gICAgfVxuICAgIGlmIChtb2RlQ29uZmlndXJhdGlvbjIuZGlhZ25vc3RpY3MpIHtcbiAgICAgIHByb3ZpZGVycy5wdXNoKG5ldyBKU09ORGlhZ25vc3RpY3NBZGFwdGVyKGxhbmd1YWdlSWQsIHdvcmtlciwgZGVmYXVsdHMpKTtcbiAgICB9XG4gICAgaWYgKG1vZGVDb25maWd1cmF0aW9uMi5zZWxlY3Rpb25SYW5nZXMpIHtcbiAgICAgIHByb3ZpZGVycy5wdXNoKG1vbmFjb19lZGl0b3JfY29yZV9leHBvcnRzLmxhbmd1YWdlcy5yZWdpc3RlclNlbGVjdGlvblJhbmdlUHJvdmlkZXIobGFuZ3VhZ2VJZCwgbmV3IFNlbGVjdGlvblJhbmdlQWRhcHRlcih3b3JrZXIpKSk7XG4gICAgfVxuICB9XG4gIHJlZ2lzdGVyUHJvdmlkZXJzKCk7XG4gIGRpc3Bvc2FibGVzLnB1c2gobW9uYWNvX2VkaXRvcl9jb3JlX2V4cG9ydHMubGFuZ3VhZ2VzLnNldExhbmd1YWdlQ29uZmlndXJhdGlvbihkZWZhdWx0cy5sYW5ndWFnZUlkLCByaWNoRWRpdENvbmZpZ3VyYXRpb24pKTtcbiAgbGV0IG1vZGVDb25maWd1cmF0aW9uID0gZGVmYXVsdHMubW9kZUNvbmZpZ3VyYXRpb247XG4gIGRlZmF1bHRzLm9uRGlkQ2hhbmdlKChuZXdEZWZhdWx0cykgPT4ge1xuICAgIGlmIChuZXdEZWZhdWx0cy5tb2RlQ29uZmlndXJhdGlvbiAhPT0gbW9kZUNvbmZpZ3VyYXRpb24pIHtcbiAgICAgIG1vZGVDb25maWd1cmF0aW9uID0gbmV3RGVmYXVsdHMubW9kZUNvbmZpZ3VyYXRpb247XG4gICAgICByZWdpc3RlclByb3ZpZGVycygpO1xuICAgIH1cbiAgfSk7XG4gIGRpc3Bvc2FibGVzLnB1c2goYXNEaXNwb3NhYmxlKHByb3ZpZGVycykpO1xuICByZXR1cm4gYXNEaXNwb3NhYmxlKGRpc3Bvc2FibGVzKTtcbn1cbmZ1bmN0aW9uIGFzRGlzcG9zYWJsZShkaXNwb3NhYmxlcykge1xuICByZXR1cm4geyBkaXNwb3NlOiAoKSA9PiBkaXNwb3NlQWxsKGRpc3Bvc2FibGVzKSB9O1xufVxuZnVuY3Rpb24gZGlzcG9zZUFsbChkaXNwb3NhYmxlcykge1xuICB3aGlsZSAoZGlzcG9zYWJsZXMubGVuZ3RoKSB7XG4gICAgZGlzcG9zYWJsZXMucG9wKCkuZGlzcG9zZSgpO1xuICB9XG59XG52YXIgcmljaEVkaXRDb25maWd1cmF0aW9uID0ge1xuICB3b3JkUGF0dGVybjogLygtP1xcZCpcXC5cXGRcXHcqKXwoW15cXFtcXHtcXF1cXH1cXDpcXFwiXFwsXFxzXSspL2csXG4gIGNvbW1lbnRzOiB7XG4gICAgbGluZUNvbW1lbnQ6IFwiLy9cIixcbiAgICBibG9ja0NvbW1lbnQ6IFtcIi8qXCIsIFwiKi9cIl1cbiAgfSxcbiAgYnJhY2tldHM6IFtcbiAgICBbXCJ7XCIsIFwifVwiXSxcbiAgICBbXCJbXCIsIFwiXVwiXVxuICBdLFxuICBhdXRvQ2xvc2luZ1BhaXJzOiBbXG4gICAgeyBvcGVuOiBcIntcIiwgY2xvc2U6IFwifVwiLCBub3RJbjogW1wic3RyaW5nXCJdIH0sXG4gICAgeyBvcGVuOiBcIltcIiwgY2xvc2U6IFwiXVwiLCBub3RJbjogW1wic3RyaW5nXCJdIH0sXG4gICAgeyBvcGVuOiAnXCInLCBjbG9zZTogJ1wiJywgbm90SW46IFtcInN0cmluZ1wiXSB9XG4gIF1cbn07XG5leHBvcnQge1xuICBDb21wbGV0aW9uQWRhcHRlcixcbiAgRGVmaW5pdGlvbkFkYXB0ZXIsXG4gIERpYWdub3N0aWNzQWRhcHRlcixcbiAgRG9jdW1lbnRDb2xvckFkYXB0ZXIsXG4gIERvY3VtZW50Rm9ybWF0dGluZ0VkaXRQcm92aWRlcixcbiAgRG9jdW1lbnRIaWdobGlnaHRBZGFwdGVyLFxuICBEb2N1bWVudExpbmtBZGFwdGVyLFxuICBEb2N1bWVudFJhbmdlRm9ybWF0dGluZ0VkaXRQcm92aWRlcixcbiAgRG9jdW1lbnRTeW1ib2xBZGFwdGVyLFxuICBGb2xkaW5nUmFuZ2VBZGFwdGVyLFxuICBIb3ZlckFkYXB0ZXIsXG4gIFJlZmVyZW5jZUFkYXB0ZXIsXG4gIFJlbmFtZUFkYXB0ZXIsXG4gIFNlbGVjdGlvblJhbmdlQWRhcHRlcixcbiAgV29ya2VyTWFuYWdlcixcbiAgZnJvbVBvc2l0aW9uLFxuICBmcm9tUmFuZ2UsXG4gIHNldHVwTW9kZSxcbiAgdG9SYW5nZSxc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
