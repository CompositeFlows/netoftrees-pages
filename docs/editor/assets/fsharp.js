/*!-----------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Version: 0.45.0(5e5af013f8d295555a7210df0d5f2cea0bf5dd56)
 * Released under the MIT license
 * https://github.com/microsoft/monaco-editor/blob/main/LICENSE.txt
 *-----------------------------------------------------------------------------*/
var conf = {
  comments: {
    lineComment: "//",
    blockComment: ["(*", "*)"]
  },
  brackets: [
    ["{", "}"],
    ["[", "]"],
    ["(", ")"]
  ],
  autoClosingPairs: [
    { open: "{", close: "}" },
    { open: "[", close: "]" },
    { open: "(", close: ")" },
    { open: '"', close: '"' }
  ],
  surroundingPairs: [
    { open: "{", close: "}" },
    { open: "[", close: "]" },
    { open: "(", close: ")" },
    { open: '"', close: '"' },
    { open: "'", close: "'" }
  ],
  folding: {
    markers: {
      start: new RegExp("^\\s*//\\s*#region\\b|^\\s*\\(\\*\\s*#region(.*)\\*\\)"),
      end: new RegExp("^\\s*//\\s*#endregion\\b|^\\s*\\(\\*\\s*#endregion\\s*\\*\\)")
    }
  }
};
var language = {
  defaultToken: "",
  tokenPostfix: ".fs",
  keywords: [
    "abstract",
    "and",
    "atomic",
    "as",
    "assert",
    "asr",
    "base",
    "begin",
    "break",
    "checked",
    "component",
    "const",
    "constraint",
    "constructor",
    "continue",
    "class",
    "default",
    "delegate",
    "do",
    "done",
    "downcast",
    "downto",
    "elif",
    "else",
    "end",
    "exception",
    "eager",
    "event",
    "external",
    "extern",
    "false",
    "finally",
    "for",
    "fun",
    "function",
    "fixed",
    "functor",
    "global",
    "if",
    "in",
    "include",
    "inherit",
    "inline",
    "interface",
    "internal",
    "land",
    "lor",
    "lsl",
    "lsr",
    "lxor",
    "lazy",
    "let",
    "match",
    "member",
    "mod",
    "module",
    "mutable",
    "namespace",
    "method",
    "mixin",
    "new",
    "not",
    "null",
    "of",
    "open",
    "or",
    "object",
    "override",
    "private",
    "parallel",
    "process",
    "protected",
    "pure",
    "public",
    "rec",
    "return",
    "static",
    "sealed",
    "struct",
    "sig",
    "then",
    "to",
    "true",
    "tailcall",
    "trait",
    "try",
    "type",
    "upcast",
    "use",
    "val",
    "void",
    "virtual",
    "volatile",
    "when",
    "while",
    "with",
    "yield"
  ],
  symbols: /[=><!~?:&|+\-*\^%;\.,\/]+/,
  escapes: /\\(?:[abfnrtv\\"']|x[0-9A-Fa-f]{1,4}|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/,
  integersuffix: /[uU]?[yslnLI]?/,
  floatsuffix: /[fFmM]?/,
  tokenizer: {
    root: [
      [
        /[a-zA-Z_]\w*/,
        {
          cases: {
            "@keywords": { token: "keyword.$0" },
            "@default": "identifier"
          }
        }
      ],
      { include: "@whitespace" },
      [/\[<.*>\]/, "annotation"],
      [/^#(if|else|endif)/, "keyword"],
      [/[{}()\[\]]/, "@brackets"],
      [/[<>](?!@symbols)/, "@brackets"],
      [/@symbols/, "delimiter"],
      [/\d*\d+[eE]([\-+]?\d+)?(@floatsuffix)/, "number.float"],
      [/\d*\.\d+([eE][\-+]?\d+)?(@floatsuffix)/, "number.float"],
      [/0x[0-9a-fA-F]+LF/, "number.float"],
      [/0x[0-9a-fA-F]+(@integersuffix)/, "number.hex"],
      [/0b[0-1]+(@integersuffix)/, "number.bin"],
      [/\d+(@integersuffix)/, "number"],
      [/[;,.]/, "delimiter"],
      [/"([^"\\]|\\.)*$/, "string.invalid"],
      [/"""/, "string", '@string."""'],
      [/"/, "string", '@string."'],
      [/\@"/, { token: "string.quote", next: "@litstring" }],
      [/'[^\\']'B?/, "string"],
      [/(')(@escapes)(')/, ["string", "string.escape", "string"]],
      [/'/, "string.invalid"]
    ],
    whitespace: [
      [/[ \t\r\n]+/, ""],
      [/\(\*(?!\))/, "comment", "@comment"],
      [/\/\/.*$/, "comment"]
    ],
    comment: [
      [/[^*(]+/, "comment"],
      [/\*\)/, "comment", "@pop"],
      [/\*/, "comment"],
      [/\(\*\)/, "comment"],
      [/\(/, "comment"]
    ],
    string: [
      [/[^\\"]+/, "string"],
      [/@escapes/, "string.escape"],
      [/\\./, "string.escape.invalid"],
      [
        /("""|"B?)/,
        {
          cases: {
            "$#==$S2": { token: "string", next: "@pop" },
            "@default": "string"
          }
        }
      ]
    ],
    litstring: [
      [/[^"]+/, "string"],
      [/""/, "string.escape"],
      [/"/, { token: "string.quote", next: "@pop" }]
    ]
  }
};
export {
  conf,
  language
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnNoYXJwLmpzIiwic291cmNlcyI6WyIuLi8uLi9ub2RlX21vZHVsZXMvbW9uYWNvLWVkaXRvci9lc20vdnMvYmFzaWMtbGFuZ3VhZ2VzL2ZzaGFycC9mc2hhcnAuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyohLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogVmVyc2lvbjogMC40NS4wKDVlNWFmMDEzZjhkMjk1NTU1YTcyMTBkZjBkNWYyY2VhMGJmNWRkNTYpXG4gKiBSZWxlYXNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2VcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9taWNyb3NvZnQvbW9uYWNvLWVkaXRvci9ibG9iL21haW4vTElDRU5TRS50eHRcbiAqLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG4vLyBzcmMvYmFzaWMtbGFuZ3VhZ2VzL2ZzaGFycC9mc2hhcnAudHNcbnZhciBjb25mID0ge1xuICBjb21tZW50czoge1xuICAgIGxpbmVDb21tZW50OiBcIi8vXCIsXG4gICAgYmxvY2tDb21tZW50OiBbXCIoKlwiLCBcIiopXCJdXG4gIH0sXG4gIGJyYWNrZXRzOiBbXG4gICAgW1wie1wiLCBcIn1cIl0sXG4gICAgW1wiW1wiLCBcIl1cIl0sXG4gICAgW1wiKFwiLCBcIilcIl1cbiAgXSxcbiAgYXV0b0Nsb3NpbmdQYWlyczogW1xuICAgIHsgb3BlbjogXCJ7XCIsIGNsb3NlOiBcIn1cIiB9LFxuICAgIHsgb3BlbjogXCJbXCIsIGNsb3NlOiBcIl1cIiB9LFxuICAgIHsgb3BlbjogXCIoXCIsIGNsb3NlOiBcIilcIiB9LFxuICAgIHsgb3BlbjogJ1wiJywgY2xvc2U6ICdcIicgfVxuICBdLFxuICBzdXJyb3VuZGluZ1BhaXJzOiBbXG4gICAgeyBvcGVuOiBcIntcIiwgY2xvc2U6IFwifVwiIH0sXG4gICAgeyBvcGVuOiBcIltcIiwgY2xvc2U6IFwiXVwiIH0sXG4gICAgeyBvcGVuOiBcIihcIiwgY2xvc2U6IFwiKVwiIH0sXG4gICAgeyBvcGVuOiAnXCInLCBjbG9zZTogJ1wiJyB9LFxuICAgIHsgb3BlbjogXCInXCIsIGNsb3NlOiBcIidcIiB9XG4gIF0sXG4gIGZvbGRpbmc6IHtcbiAgICBtYXJrZXJzOiB7XG4gICAgICBzdGFydDogbmV3IFJlZ0V4cChcIl5cXFxccyovL1xcXFxzKiNyZWdpb25cXFxcYnxeXFxcXHMqXFxcXChcXFxcKlxcXFxzKiNyZWdpb24oLiopXFxcXCpcXFxcKVwiKSxcbiAgICAgIGVuZDogbmV3IFJlZ0V4cChcIl5cXFxccyovL1xcXFxzKiNlbmRyZWdpb25cXFxcYnxeXFxcXHMqXFxcXChcXFxcKlxcXFxzKiNlbmRyZWdpb25cXFxccypcXFxcKlxcXFwpXCIpXG4gICAgfVxuICB9XG59O1xudmFyIGxhbmd1YWdlID0ge1xuICBkZWZhdWx0VG9rZW46IFwiXCIsXG4gIHRva2VuUG9zdGZpeDogXCIuZnNcIixcbiAga2V5d29yZHM6IFtcbiAgICBcImFic3RyYWN0XCIsXG4gICAgXCJhbmRcIixcbiAgICBcImF0b21pY1wiLFxuICAgIFwiYXNcIixcbiAgICBcImFzc2VydFwiLFxuICAgIFwiYXNyXCIsXG4gICAgXCJiYXNlXCIsXG4gICAgXCJiZWdpblwiLFxuICAgIFwiYnJlYWtcIixcbiAgICBcImNoZWNrZWRcIixcbiAgICBcImNvbXBvbmVudFwiLFxuICAgIFwiY29uc3RcIixcbiAgICBcImNvbnN0cmFpbnRcIixcbiAgICBcImNvbnN0cnVjdG9yXCIsXG4gICAgXCJjb250aW51ZVwiLFxuICAgIFwiY2xhc3NcIixcbiAgICBcImRlZmF1bHRcIixcbiAgICBcImRlbGVnYXRlXCIsXG4gICAgXCJkb1wiLFxuICAgIFwiZG9uZVwiLFxuICAgIFwiZG93bmNhc3RcIixcbiAgICBcImRvd250b1wiLFxuICAgIFwiZWxpZlwiLFxuICAgIFwiZWxzZVwiLFxuICAgIFwiZW5kXCIsXG4gICAgXCJleGNlcHRpb25cIixcbiAgICBcImVhZ2VyXCIsXG4gICAgXCJldmVudFwiLFxuICAgIFwiZXh0ZXJuYWxcIixcbiAgICBcImV4dGVyblwiLFxuICAgIFwiZmFsc2VcIixcbiAgICBcImZpbmFsbHlcIixcbiAgICBcImZvclwiLFxuICAgIFwiZnVuXCIsXG4gICAgXCJmdW5jdGlvblwiLFxuICAgIFwiZml4ZWRcIixcbiAgICBcImZ1bmN0b3JcIixcbiAgICBcImdsb2JhbFwiLFxuICAgIFwiaWZcIixcbiAgICBcImluXCIsXG4gICAgXCJpbmNsdWRlXCIsXG4gICAgXCJpbmhlcml0XCIsXG4gICAgXCJpbmxpbmVcIixcbiAgICBcImludGVyZmFjZVwiLFxuICAgIFwiaW50ZXJuYWxcIixcbiAgICBcImxhbmRcIixcbiAgICBcImxvclwiLFxuICAgIFwibHNsXCIsXG4gICAgXCJsc3JcIixcbiAgICBcImx4b3JcIixcbiAgICBcImxhenlcIixcbiAgICBcImxldFwiLFxuICAgIFwibWF0Y2hcIixcbiAgICBcIm1lbWJlclwiLFxuICAgIFwibW9kXCIsXG4gICAgXCJtb2R1bGVcIixcbiAgICBcIm11dGFibGVcIixcbiAgICBcIm5hbWVzcGFjZVwiLFxuICAgIFwibWV0aG9kXCIsXG4gICAgXCJtaXhpblwiLFxuICAgIFwibmV3XCIsXG4gICAgXCJub3RcIixcbiAgICBcIm51bGxcIixcbiAgICBcIm9mXCIsXG4gICAgXCJvcGVuXCIsXG4gICAgXCJvclwiLFxuICAgIFwib2JqZWN0XCIsXG4gICAgXCJvdmVycmlkZVwiLFxuICAgIFwicHJpdmF0ZVwiLFxuICAgIFwicGFyYWxsZWxcIixcbiAgICBcInByb2Nlc3NcIixcbiAgICBcInByb3RlY3RlZFwiLFxuICAgIFwicHVyZVwiLFxuICAgIFwicHVibGljXCIsXG4gICAgXCJyZWNcIixcbiAgICBcInJldHVyblwiLFxuICAgIFwic3RhdGljXCIsXG4gICAgXCJzZWFsZWRcIixcbiAgICBcInN0cnVjdFwiLFxuICAgIFwic2lnXCIsXG4gICAgXCJ0aGVuXCIsXG4gICAgXCJ0b1wiLFxuICAgIFwidHJ1ZVwiLFxuICAgIFwidGFpbGNhbGxcIixcbiAgICBcInRyYWl0XCIsXG4gICAgXCJ0cnlcIixcbiAgICBcInR5cGVcIixcbiAgICBcInVwY2FzdFwiLFxuICAgIFwidXNlXCIsXG4gICAgXCJ2YWxcIixcbiAgICBcInZvaWRcIixcbiAgICBcInZpcnR1YWxcIixcbiAgICBcInZvbGF0aWxlXCIsXG4gICAgXCJ3aGVuXCIsXG4gICAgXCJ3aGlsZVwiLFxuICAgIFwid2l0aFwiLFxuICAgIFwieWllbGRcIlxuICBdLFxuICBzeW1ib2xzOiAvWz0+PCF+PzomfCtcXC0qXFxeJTtcXC4sXFwvXSsvLFxuICBlc2NhcGVzOiAvXFxcXCg/OlthYmZucnR2XFxcXFwiJ118eFswLTlBLUZhLWZdezEsNH18dVswLTlBLUZhLWZdezR9fFVbMC05QS1GYS1mXXs4fSkvLFxuICBpbnRlZ2Vyc3VmZml4OiAvW3VVXT9beXNsbkxJXT8vLFxuICBmbG9hdHN1ZmZpeDogL1tmRm1NXT8vLFxuICB0b2tlbml6ZXI6IHtcbiAgICByb290OiBbXG4gICAgICBbXG4gICAgICAgIC9bYS16QS1aX11cXHcqLyxcbiAgICAgICAge1xuICAgICAgICAgIGNhc2VzOiB7XG4gICAgICAgICAgICBcIkBrZXl3b3Jkc1wiOiB7IHRva2VuOiBcImtleXdvcmQuJDBcIiB9LFxuICAgICAgICAgICAgXCJAZGVmYXVsdFwiOiBcImlkZW50aWZpZXJcIlxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgXSxcbiAgICAgIHsgaW5jbHVkZTogXCJAd2hpdGVzcGFjZVwiIH0sXG4gICAgICBbL1xcWzwuKj5cXF0vLCBcImFubm90YXRpb25cIl0sXG4gICAgICBbL14jKGlmfGVsc2V8ZW5kaWYpLywgXCJrZXl3b3JkXCJdLFxuICAgICAgWy9be30oKVxcW1xcXV0vLCBcIkBicmFja2V0c1wiXSxcbiAgICAgIFsvWzw+XSg/IUBzeW1ib2xzKS8sIFwiQGJyYWNrZXRzXCJdLFxuICAgICAgWy9Ac3ltYm9scy8sIFwiZGVsaW1pdGVyXCJdLFxuICAgICAgWy9cXGQqXFxkK1tlRV0oW1xcLStdP1xcZCspPyhAZmxvYXRzdWZmaXgpLywgXCJudW1iZXIuZmxvYXRcIl0sXG4gICAgICBbL1xcZCpcXC5cXGQrKFtlRV1bXFwtK10/XFxkKyk/KEBmbG9hdHN1ZmZpeCkvLCBcIm51bWJlci5mbG9hdFwiXSxcbiAgICAgIFsvMHhbMC05YS1mQS1GXStMRi8sIFwibnVtYmVyLmZsb2F0XCJdLFxuICAgICAgWy8weFswLTlhLWZBLUZdKyhAaW50ZWdlcnN1ZmZpeCkvLCBcIm51bWJlci5oZXhcIl0sXG4gICAgICBbLzBiWzAtMV0rKEBpbnRlZ2Vyc3VmZml4KS8sIFwibnVtYmVyLmJpblwiXSxcbiAgICAgIFsvXFxkKyhAaW50ZWdlcnN1ZmZpeCkvLCBcIm51bWJlclwiXSxcbiAgICAgIFsvWzssLl0vLCBcImRlbGltaXRlclwiXSxcbiAgICAgIFsvXCIoW15cIlxcXFxdfFxcXFwuKSokLywgXCJzdHJpbmcuaW52YWxpZFwiXSxcbiAgICAgIFsvXCJcIlwiLywgXCJzdHJpbmdcIiwgJ0BzdHJpbmcuXCJcIlwiJ10sXG4gICAgICBbL1wiLywgXCJzdHJpbmdcIiwgJ0BzdHJpbmcuXCInXSxcbiAgICAgIFsvXFxAXCIvLCB7IHRva2VuOiBcInN0cmluZy5xdW90ZVwiLCBuZXh0OiBcIkBsaXRzdHJpbmdcIiB9XSxcbiAgICAgIFsvJ1teXFxcXCddJ0I/LywgXCJzdHJpbmdcIl0sXG4gICAgICBbLygnKShAZXNjYXBlcykoJykvLCBbXCJzdHJpbmdcIiwgXCJzdHJpbmcuZXNjYXBlXCIsIFwic3RyaW5nXCJdXSxcbiAgICAgIFsvJy8sIFwic3RyaW5nLmludmFsaWRcIl1cbiAgICBdLFxuICAgIHdoaXRlc3BhY2U6IFtcbiAgICAgIFsvWyBcXHRcXHJcXG5dKy8sIFwiXCJdLFxuICAgICAgWy9cXChcXCooPyFcXCkpLywgXCJjb21tZW50XCIsIFwiQGNvbW1lbnRcIl0sXG4gICAgICBbL1xcL1xcLy4qJC8sIFwiY29tbWVudFwiXVxuICAgIF0sXG4gICAgY29tbWVudDogW1xuICAgICAgWy9bXiooXSsvLCBcImNvbW1lbnRcIl0sXG4gICAgICBbL1xcKlxcKS8sIFwiY29tbWVudFwiLCBcIkBwb3BcIl0sXG4gICAgICBbL1xcKi8sIFwiY29tbWVudFwiXSxcbiAgICAgIFsvXFwoXFwqXFwpLywgXCJjb21tZW50XCJdLFxuICAgICAgWy9cXCgvLCBcImNvbW1lbnRcIl1cbiAgICBdLFxuICAgIHN0cmluZzogW1xuICAgICAgWy9bXlxcXFxcIl0rLywgXCJzdHJpbmdcIl0sXG4gICAgICBbL0Blc2NhcGVzLywgXCJzdHJpbmcuZXNjYXBlXCJdLFxuICAgICAgWy9cXFxcLi8sIFwic3RyaW5nLmVzY2FwZS5pbnZhbGlkXCJdLFxuICAgICAgW1xuICAgICAgICAvKFwiXCJcInxcIkI/KS8sXG4gICAgICAgIHtcbiAgICAgICAgICBjYXNlczoge1xuICAgICAgICAgICAgXCIkIz09JFMyXCI6IHsgdG9rZW46IFwic3RyaW5nXCIsIG5leHQ6IFwiQHBvcFwiIH0sXG4gICAgICAgICAgICBcIkBkZWZhdWx0XCI6IFwic3RyaW5nXCJcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIF1cbiAgICBdLFxuICAgIGxpdHN0cmluZzogW1xuICAgICAgWy9bXlwiXSsvLCBcInN0cmluZ1wiXSxcbiAgICAgIFsvXCJcIi8sIFwic3RyaW5nLmVzY2FwZVwiXSxcbiAgICAgIFsvXCIvLCB7IHRva2VuOiBcInN0cmluZy5xdW90ZVwiLCBuZXh0OiBcIkBwb3BcIiB9XVxuICAgIF1cbiAgfVxufTtcbmV4cG9ydCB7XG4gIGNvbmYsXG4gIGxhbmd1YWdlXG59O1xuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQVFHLElBQUMsT0FBTztBQUFBLEVBQ1QsVUFBVTtBQUFBLElBQ1IsYUFBYTtBQUFBLElBQ2IsY0FBYyxDQUFDLE1BQU0sSUFBSTtBQUFBLEVBQzFCO0FBQUEsRUFDRCxVQUFVO0FBQUEsSUFDUixDQUFDLEtBQUssR0FBRztBQUFBLElBQ1QsQ0FBQyxLQUFLLEdBQUc7QUFBQSxJQUNULENBQUMsS0FBSyxHQUFHO0FBQUEsRUFDVjtBQUFBLEVBQ0Qsa0JBQWtCO0FBQUEsSUFDaEIsRUFBRSxNQUFNLEtBQUssT0FBTyxJQUFLO0FBQUEsSUFDekIsRUFBRSxNQUFNLEtBQUssT0FBTyxJQUFLO0FBQUEsSUFDekIsRUFBRSxNQUFNLEtBQUssT0FBTyxJQUFLO0FBQUEsSUFDekIsRUFBRSxNQUFNLEtBQUssT0FBTyxJQUFLO0FBQUEsRUFDMUI7QUFBQSxFQUNELGtCQUFrQjtBQUFBLElBQ2hCLEVBQUUsTUFBTSxLQUFLLE9BQU8sSUFBSztBQUFBLElBQ3pCLEVBQUUsTUFBTSxLQUFLLE9BQU8sSUFBSztBQUFBLElBQ3pCLEVBQUUsTUFBTSxLQUFLLE9BQU8sSUFBSztBQUFBLElBQ3pCLEVBQUUsTUFBTSxLQUFLLE9BQU8sSUFBSztBQUFBLElBQ3pCLEVBQUUsTUFBTSxLQUFLLE9BQU8sSUFBSztBQUFBLEVBQzFCO0FBQUEsRUFDRCxTQUFTO0FBQUEsSUFDUCxTQUFTO0FBQUEsTUFDUCxPQUFPLElBQUksT0FBTyx3REFBd0Q7QUFBQSxNQUMxRSxLQUFLLElBQUksT0FBTyw4REFBOEQ7QUFBQSxJQUMvRTtBQUFBLEVBQ0Y7QUFDSDtBQUNHLElBQUMsV0FBVztBQUFBLEVBQ2IsY0FBYztBQUFBLEVBQ2QsY0FBYztBQUFBLEVBQ2QsVUFBVTtBQUFBLElBQ1I7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxFQUNEO0FBQUEsRUFDRCxTQUFTO0FBQUEsRUFDVCxTQUFTO0FBQUEsRUFDVCxlQUFlO0FBQUEsRUFDZixhQUFhO0FBQUEsRUFDYixXQUFXO0FBQUEsSUFDVCxNQUFNO0FBQUEsTUFDSjtBQUFBLFFBQ0U7QUFBQSxRQUNBO0FBQUEsVUFDRSxPQUFPO0FBQUEsWUFDTCxhQUFhLEVBQUUsT0FBTyxhQUFjO0FBQUEsWUFDcEMsWUFBWTtBQUFBLFVBQ2I7QUFBQSxRQUNGO0FBQUEsTUFDRjtBQUFBLE1BQ0QsRUFBRSxTQUFTLGNBQWU7QUFBQSxNQUMxQixDQUFDLFlBQVksWUFBWTtBQUFBLE1BQ3pCLENBQUMscUJBQXFCLFNBQVM7QUFBQSxNQUMvQixDQUFDLGNBQWMsV0FBVztBQUFBLE1BQzFCLENBQUMsb0JBQW9CLFdBQVc7QUFBQSxNQUNoQyxDQUFDLFlBQVksV0FBVztBQUFBLE1BQ3hCLENBQUMsd0NBQXdDLGNBQWM7QUFBQSxNQUN2RCxDQUFDLDBDQUEwQyxjQUFjO0FBQUEsTUFDekQsQ0FBQyxvQkFBb0IsY0FBYztBQUFBLE1BQ25DLENBQUMsa0NBQWtDLFlBQVk7QUFBQSxNQUMvQyxDQUFDLDRCQUE0QixZQUFZO0FBQUEsTUFDekMsQ0FBQyx1QkFBdUIsUUFBUTtBQUFBLE1BQ2hDLENBQUMsU0FBUyxXQUFXO0FBQUEsTUFDckIsQ0FBQyxtQkFBbUIsZ0JBQWdCO0FBQUEsTUFDcEMsQ0FBQyxPQUFPLFVBQVUsYUFBYTtBQUFBLE1BQy9CLENBQUMsS0FBSyxVQUFVLFdBQVc7QUFBQSxNQUMzQixDQUFDLE9BQU8sRUFBRSxPQUFPLGdCQUFnQixNQUFNLGFBQVksQ0FBRTtBQUFBLE1BQ3JELENBQUMsY0FBYyxRQUFRO0FBQUEsTUFDdkIsQ0FBQyxvQkFBb0IsQ0FBQyxVQUFVLGlCQUFpQixRQUFRLENBQUM7QUFBQSxNQUMxRCxDQUFDLEtBQUssZ0JBQWdCO0FBQUEsSUFDdkI7QUFBQSxJQUNELFlBQVk7QUFBQSxNQUNWLENBQUMsY0FBYyxFQUFFO0FBQUEsTUFDakIsQ0FBQyxjQUFjLFdBQVcsVUFBVTtBQUFBLE1BQ3BDLENBQUMsV0FBVyxTQUFTO0FBQUEsSUFDdEI7QUFBQSxJQUNELFNBQVM7QUFBQSxNQUNQLENBQUMsVUFBVSxTQUFTO0FBQUEsTUFDcEIsQ0FBQyxRQUFRLFdBQVcsTUFBTTtBQUFBLE1BQzFCLENBQUMsTUFBTSxTQUFTO0FBQUEsTUFDaEIsQ0FBQyxVQUFVLFNBQVM7QUFBQSxNQUNwQixDQUFDLE1BQU0sU0FBUztBQUFBLElBQ2pCO0FBQUEsSUFDRCxRQUFRO0FBQUEsTUFDTixDQUFDLFdBQVcsUUFBUTtBQUFBLE1BQ3BCLENBQUMsWUFBWSxlQUFlO0FBQUEsTUFDNUIsQ0FBQyxPQUFPLHVCQUF1QjtBQUFBLE1BQy9CO0FBQUEsUUFDRTtBQUFBLFFBQ0E7QUFBQSxVQUNFLE9BQU87QUFBQSxZQUNMLFdBQVcsRUFBRSxPQUFPLFVBQVUsTUFBTSxPQUFRO0FBQUEsWUFDNUMsWUFBWTtBQUFBLFVBQ2I7QUFBQSxRQUNGO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxJQUNELFdBQVc7QUFBQSxNQUNULENBQUMsU0FBUyxRQUFRO0FBQUEsTUFDbEIsQ0FBQyxNQUFNLGVBQWU7QUFBQSxNQUN0QixDQUFDLEtBQUssRUFBRSxPQUFPLGdCQUFnQixNQUFNLE9BQU0sQ0FBRTtBQUFBLElBQzlDO0FBQUEsRUFDRjtBQUNIOyIsInhfZ29vZ2xlX2lnbm9yZUxpc3QiOlswXX0=
