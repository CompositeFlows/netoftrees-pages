/*!-----------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Version: 0.45.0(5e5af013f8d295555a7210df0d5f2cea0bf5dd56)
 * Released under the MIT license
 * https://github.com/microsoft/monaco-editor/blob/main/LICENSE.txt
 *-----------------------------------------------------------------------------*/
var conf = {
  wordPattern: /(unary_[@~!#%^&*()\-=+\\|:<>\/?]+)|([a-zA-Z_$][\w$]*?_=)|(`[^`]+`)|([a-zA-Z_$][\w$]*)/g,
  comments: {
    lineComment: "//",
    blockComment: ["/*", "*/"]
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
    { open: '"', close: '"' },
    { open: "'", close: "'" }
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
      start: new RegExp("^\\s*//\\s*(?:(?:#?region\\b)|(?:<editor-fold\\b))"),
      end: new RegExp("^\\s*//\\s*(?:(?:#?endregion\\b)|(?:</editor-fold>))")
    }
  }
};
var language = {
  tokenPostfix: ".scala",
  keywords: [
    "asInstanceOf",
    "catch",
    "class",
    "classOf",
    "def",
    "do",
    "else",
    "extends",
    "finally",
    "for",
    "foreach",
    "forSome",
    "if",
    "import",
    "isInstanceOf",
    "macro",
    "match",
    "new",
    "object",
    "package",
    "return",
    "throw",
    "trait",
    "try",
    "type",
    "until",
    "val",
    "var",
    "while",
    "with",
    "yield",
    "given",
    "enum",
    "then"
  ],
  softKeywords: ["as", "export", "extension", "end", "derives", "on"],
  constants: ["true", "false", "null", "this", "super"],
  modifiers: [
    "abstract",
    "final",
    "implicit",
    "lazy",
    "override",
    "private",
    "protected",
    "sealed"
  ],
  softModifiers: ["inline", "opaque", "open", "transparent", "using"],
  name: /(?:[a-z_$][\w$]*|`[^`]+`)/,
  type: /(?:[A-Z][\w$]*)/,
  symbols: /[=><!~?:&|+\-*\/^\\%@#]+/,
  digits: /\d+(_+\d+)*/,
  hexdigits: /[[0-9a-fA-F]+(_+[0-9a-fA-F]+)*/,
  escapes: /\\(?:[btnfr\\"']|x[0-9A-Fa-f]{1,4}|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/,
  fstring_conv: /[bBhHsScCdoxXeEfgGaAt]|[Tn](?:[HIklMSLNpzZsQ]|[BbhAaCYyjmde]|[RTrDFC])/,
  tokenizer: {
    root: [
      [/\braw"""/, { token: "string.quote", bracket: "@open", next: "@rawstringt" }],
      [/\braw"/, { token: "string.quote", bracket: "@open", next: "@rawstring" }],
      [/\bs"""/, { token: "string.quote", bracket: "@open", next: "@sstringt" }],
      [/\bs"/, { token: "string.quote", bracket: "@open", next: "@sstring" }],
      [/\bf""""/, { token: "string.quote", bracket: "@open", next: "@fstringt" }],
      [/\bf"/, { token: "string.quote", bracket: "@open", next: "@fstring" }],
      [/"""/, { token: "string.quote", bracket: "@open", next: "@stringt" }],
      [/"/, { token: "string.quote", bracket: "@open", next: "@string" }],
      [/(@digits)[eE]([\-+]?(@digits))?[fFdD]?/, "number.float", "@allowMethod"],
      [/(@digits)\.(@digits)([eE][\-+]?(@digits))?[fFdD]?/, "number.float", "@allowMethod"],
      [/0[xX](@hexdigits)[Ll]?/, "number.hex", "@allowMethod"],
      [/(@digits)[fFdD]/, "number.float", "@allowMethod"],
      [/(@digits)[lL]?/, "number", "@allowMethod"],
      [/\b_\*/, "key"],
      [/\b(_)\b/, "keyword", "@allowMethod"],
      [/\bimport\b/, "keyword", "@import"],
      [/\b(case)([ \t]+)(class)\b/, ["keyword.modifier", "white", "keyword"]],
      [/\bcase\b/, "keyword", "@case"],
      [/\bva[lr]\b/, "keyword", "@vardef"],
      [
        /\b(def)([ \t]+)((?:unary_)?@symbols|@name(?:_=)|@name)/,
        ["keyword", "white", "identifier"]
      ],
      [/@name(?=[ \t]*:(?!:))/, "variable"],
      [/(\.)(@name|@symbols)/, ["operator", { token: "@rematch", next: "@allowMethod" }]],
      [/([{(])(\s*)(@name(?=\s*=>))/, ["@brackets", "white", "variable"]],
      [
        /@name/,
        {
          cases: {
            "@keywords": "keyword",
            "@softKeywords": "keyword",
            "@modifiers": "keyword.modifier",
            "@softModifiers": "keyword.modifier",
            "@constants": {
              token: "constant",
              next: "@allowMethod"
            },
            "@default": {
              token: "identifier",
              next: "@allowMethod"
            }
          }
        }
      ],
      [/@type/, "type", "@allowMethod"],
      { include: "@whitespace" },
      [/@[a-zA-Z_$][\w$]*(?:\.[a-zA-Z_$][\w$]*)*/, "annotation"],
      [/[{(]/, "@brackets"],
      [/[})]/, "@brackets", "@allowMethod"],
      [/\[/, "operator.square"],
      [/](?!\s*(?:va[rl]|def|type)\b)/, "operator.square", "@allowMethod"],
      [/]/, "operator.square"],
      [/([=-]>|<-|>:|<:|:>|<%)(?=[\s\w()[\]{},\."'`])/, "keyword"],
      [/@symbols/, "operator"],
      [/[;,\.]/, "delimiter"],
      [/'[a-zA-Z$][\w$]*(?!')/, "attribute.name"],
      [/'[^\\']'/, "string", "@allowMethod"],
      [/(')(@escapes)(')/, ["string", "string.escape", { token: "string", next: "@allowMethod" }]],
      [/'/, "string.invalid"]
    ],
    import: [
      [/;/, "delimiter", "@pop"],
      [/^|$/, "", "@pop"],
      [/[ \t]+/, "white"],
      [/[\n\r]+/, "white", "@pop"],
      [/\/\*/, "comment", "@comment"],
      [/@name|@type/, "type"],
      [/[(){}]/, "@brackets"],
      [/[[\]]/, "operator.square"],
      [/[\.,]/, "delimiter"]
    ],
    allowMethod: [
      [/^|$/, "", "@pop"],
      [/[ \t]+/, "white"],
      [/[\n\r]+/, "white", "@pop"],
      [/\/\*/, "comment", "@comment"],
      [/(?==>[\s\w([{])/, "keyword", "@pop"],
      [
        /(@name|@symbols)(?=[ \t]*[[({"'`]|[ \t]+(?:[+-]?\.?\d|\w))/,
        {
          cases: {
            "@keywords": { token: "keyword", next: "@pop" },
            "->|<-|>:|<:|<%": { token: "keyword", next: "@pop" },
            "@default": { token: "@rematch", next: "@pop" }
          }
        }
      ],
      ["", "", "@pop"]
    ],
    comment: [
      [/[^\/*]+/, "comment"],
      [/\/\*/, "comment", "@push"],
      [/\*\//, "comment", "@pop"],
      [/[\/*]/, "comment"]
    ],
    case: [
      [/\b_\*/, "key"],
      [/\b(_|true|false|null|this|super)\b/, "keyword", "@allowMethod"],
      [/\bif\b|=>/, "keyword", "@pop"],
      [/`[^`]+`/, "identifier", "@allowMethod"],
      [/@name/, "variable", "@allowMethod"],
      [/:::?|\||@(?![a-z_$])/, "keyword"],
      { include: "@root" }
    ],
    vardef: [
      [/\b_\*/, "key"],
      [/\b(_|true|false|null|this|super)\b/, "keyword"],
      [/@name/, "variable"],
      [/:::?|\||@(?![a-z_$])/, "keyword"],
      [/=|:(?!:)/, "operator", "@pop"],
      [/$/, "white", "@pop"],
      { include: "@root" }
    ],
    string: [
      [/[^\\"\n\r]+/, "string"],
      [/@escapes/, "string.escape"],
      [/\\./, "string.escape.invalid"],
      [
        /"/,
        {
          token: "string.quote",
          bracket: "@close",
          switchTo: "@allowMethod"
        }
      ]
    ],
    stringt: [
      [/[^\\"\n\r]+/, "string"],
      [/@escapes/, "string.escape"],
      [/\\./, "string.escape.invalid"],
      [/"(?=""")/, "string"],
      [
        /"""/,
        {
          token: "string.quote",
          bracket: "@close",
          switchTo: "@allowMethod"
        }
      ],
      [/"/, "string"]
    ],
    fstring: [
      [/@escapes/, "string.escape"],
      [
        /"/,
        {
          token: "string.quote",
          bracket: "@close",
          switchTo: "@allowMethod"
        }
      ],
      [/\$\$/, "string"],
      [/(\$)([a-z_]\w*)/, ["operator", "identifier"]],
      [/\$\{/, "operator", "@interp"],
      [/%%/, "string"],
      [
        /(%)([\-#+ 0,(])(\d+|\.\d+|\d+\.\d+)(@fstring_conv)/,
        ["metatag", "keyword.modifier", "number", "metatag"]
      ],
      [/(%)(\d+|\.\d+|\d+\.\d+)(@fstring_conv)/, ["metatag", "number", "metatag"]],
      [/(%)([\-#+ 0,(])(@fstring_conv)/, ["metatag", "keyword.modifier", "metatag"]],
      [/(%)(@fstring_conv)/, ["metatag", "metatag"]],
      [/./, "string"]
    ],
    fstringt: [
      [/@escapes/, "string.escape"],
      [/"(?=""")/, "string"],
      [
        /"""/,
        {
          token: "string.quote",
          bracket: "@close",
          switchTo: "@allowMethod"
        }
      ],
      [/\$\$/, "string"],
      [/(\$)([a-z_]\w*)/, ["operator", "identifier"]],
      [/\$\{/, "operator", "@interp"],
      [/%%/, "string"],
      [
        /(%)([\-#+ 0,(])(\d+|\.\d+|\d+\.\d+)(@fstring_conv)/,
        ["metatag", "keyword.modifier", "number", "metatag"]
      ],
      [/(%)(\d+|\.\d+|\d+\.\d+)(@fstring_conv)/, ["metatag", "number", "metatag"]],
      [/(%)([\-#+ 0,(])(@fstring_conv)/, ["metatag", "keyword.modifier", "metatag"]],
      [/(%)(@fstring_conv)/, ["metatag", "metatag"]],
      [/./, "string"]
    ],
    sstring: [
      [/@escapes/, "string.escape"],
      [
        /"/,
        {
          token: "string.quote",
          bracket: "@close",
          switchTo: "@allowMethod"
        }
      ],
      [/\$\$/, "string"],
      [/(\$)([a-z_]\w*)/, ["operator", "identifier"]],
      [/\$\{/, "operator", "@interp"],
      [/./, "string"]
    ],
    sstringt: [
      [/@escapes/, "string.escape"],
      [/"(?=""")/, "string"],
      [
        /"""/,
        {
          token: "string.quote",
          bracket: "@close",
          switchTo: "@allowMethod"
        }
      ],
      [/\$\$/, "string"],
      [/(\$)([a-z_]\w*)/, ["operator", "identifier"]],
      [/\$\{/, "operator", "@interp"],
      [/./, "string"]
    ],
    interp: [[/{/, "operator", "@push"], [/}/, "operator", "@pop"], { include: "@root" }],
    rawstring: [
      [/[^"]/, "string"],
      [
        /"/,
        {
          token: "string.quote",
          bracket: "@close",
          switchTo: "@allowMethod"
        }
      ]
    ],
    rawstringt: [
      [/[^"]/, "string"],
      [/"(?=""")/, "string"],
      [
        /"""/,
        {
          token: "string.quote",
          bracket: "@close",
          switchTo: "@allowMethod"
        }
      ],
      [/"/, "string"]
    ],
    whitespace: [
      [/[ \t\r\n]+/, "white"],
      [/\/\*/, "comment", "@comment"],
      [/\/\/.*$/, "comment"]
    ]
  }
};
export {
  conf,
  language
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NhbGEuanMiLCJzb3VyY2VzIjpbIi4uLy4uL25vZGVfbW9kdWxlcy9tb25hY28tZWRpdG9yL2VzbS92cy9iYXNpYy1sYW5ndWFnZXMvc2NhbGEvc2NhbGEuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyohLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogVmVyc2lvbjogMC40NS4wKDVlNWFmMDEzZjhkMjk1NTU1YTcyMTBkZjBkNWYyY2VhMGJmNWRkNTYpXG4gKiBSZWxlYXNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2VcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9taWNyb3NvZnQvbW9uYWNvLWVkaXRvci9ibG9iL21haW4vTElDRU5TRS50eHRcbiAqLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG4vLyBzcmMvYmFzaWMtbGFuZ3VhZ2VzL3NjYWxhL3NjYWxhLnRzXG52YXIgY29uZiA9IHtcbiAgd29yZFBhdHRlcm46IC8odW5hcnlfW0B+ISMlXiYqKClcXC09K1xcXFx8Ojw+XFwvP10rKXwoW2EtekEtWl8kXVtcXHckXSo/Xz0pfChgW15gXStgKXwoW2EtekEtWl8kXVtcXHckXSopL2csXG4gIGNvbW1lbnRzOiB7XG4gICAgbGluZUNvbW1lbnQ6IFwiLy9cIixcbiAgICBibG9ja0NvbW1lbnQ6IFtcIi8qXCIsIFwiKi9cIl1cbiAgfSxcbiAgYnJhY2tldHM6IFtcbiAgICBbXCJ7XCIsIFwifVwiXSxcbiAgICBbXCJbXCIsIFwiXVwiXSxcbiAgICBbXCIoXCIsIFwiKVwiXVxuICBdLFxuICBhdXRvQ2xvc2luZ1BhaXJzOiBbXG4gICAgeyBvcGVuOiBcIntcIiwgY2xvc2U6IFwifVwiIH0sXG4gICAgeyBvcGVuOiBcIltcIiwgY2xvc2U6IFwiXVwiIH0sXG4gICAgeyBvcGVuOiBcIihcIiwgY2xvc2U6IFwiKVwiIH0sXG4gICAgeyBvcGVuOiAnXCInLCBjbG9zZTogJ1wiJyB9LFxuICAgIHsgb3BlbjogXCInXCIsIGNsb3NlOiBcIidcIiB9XG4gIF0sXG4gIHN1cnJvdW5kaW5nUGFpcnM6IFtcbiAgICB7IG9wZW46IFwie1wiLCBjbG9zZTogXCJ9XCIgfSxcbiAgICB7IG9wZW46IFwiW1wiLCBjbG9zZTogXCJdXCIgfSxcbiAgICB7IG9wZW46IFwiKFwiLCBjbG9zZTogXCIpXCIgfSxcbiAgICB7IG9wZW46ICdcIicsIGNsb3NlOiAnXCInIH0sXG4gICAgeyBvcGVuOiBcIidcIiwgY2xvc2U6IFwiJ1wiIH1cbiAgXSxcbiAgZm9sZGluZzoge1xuICAgIG1hcmtlcnM6IHtcbiAgICAgIHN0YXJ0OiBuZXcgUmVnRXhwKFwiXlxcXFxzKi8vXFxcXHMqKD86KD86Iz9yZWdpb25cXFxcYil8KD86PGVkaXRvci1mb2xkXFxcXGIpKVwiKSxcbiAgICAgIGVuZDogbmV3IFJlZ0V4cChcIl5cXFxccyovL1xcXFxzKig/Oig/OiM/ZW5kcmVnaW9uXFxcXGIpfCg/OjwvZWRpdG9yLWZvbGQ+KSlcIilcbiAgICB9XG4gIH1cbn07XG52YXIgbGFuZ3VhZ2UgPSB7XG4gIHRva2VuUG9zdGZpeDogXCIuc2NhbGFcIixcbiAga2V5d29yZHM6IFtcbiAgICBcImFzSW5zdGFuY2VPZlwiLFxuICAgIFwiY2F0Y2hcIixcbiAgICBcImNsYXNzXCIsXG4gICAgXCJjbGFzc09mXCIsXG4gICAgXCJkZWZcIixcbiAgICBcImRvXCIsXG4gICAgXCJlbHNlXCIsXG4gICAgXCJleHRlbmRzXCIsXG4gICAgXCJmaW5hbGx5XCIsXG4gICAgXCJmb3JcIixcbiAgICBcImZvcmVhY2hcIixcbiAgICBcImZvclNvbWVcIixcbiAgICBcImlmXCIsXG4gICAgXCJpbXBvcnRcIixcbiAgICBcImlzSW5zdGFuY2VPZlwiLFxuICAgIFwibWFjcm9cIixcbiAgICBcIm1hdGNoXCIsXG4gICAgXCJuZXdcIixcbiAgICBcIm9iamVjdFwiLFxuICAgIFwicGFja2FnZVwiLFxuICAgIFwicmV0dXJuXCIsXG4gICAgXCJ0aHJvd1wiLFxuICAgIFwidHJhaXRcIixcbiAgICBcInRyeVwiLFxuICAgIFwidHlwZVwiLFxuICAgIFwidW50aWxcIixcbiAgICBcInZhbFwiLFxuICAgIFwidmFyXCIsXG4gICAgXCJ3aGlsZVwiLFxuICAgIFwid2l0aFwiLFxuICAgIFwieWllbGRcIixcbiAgICBcImdpdmVuXCIsXG4gICAgXCJlbnVtXCIsXG4gICAgXCJ0aGVuXCJcbiAgXSxcbiAgc29mdEtleXdvcmRzOiBbXCJhc1wiLCBcImV4cG9ydFwiLCBcImV4dGVuc2lvblwiLCBcImVuZFwiLCBcImRlcml2ZXNcIiwgXCJvblwiXSxcbiAgY29uc3RhbnRzOiBbXCJ0cnVlXCIsIFwiZmFsc2VcIiwgXCJudWxsXCIsIFwidGhpc1wiLCBcInN1cGVyXCJdLFxuICBtb2RpZmllcnM6IFtcbiAgICBcImFic3RyYWN0XCIsXG4gICAgXCJmaW5hbFwiLFxuICAgIFwiaW1wbGljaXRcIixcbiAgICBcImxhenlcIixcbiAgICBcIm92ZXJyaWRlXCIsXG4gICAgXCJwcml2YXRlXCIsXG4gICAgXCJwcm90ZWN0ZWRcIixcbiAgICBcInNlYWxlZFwiXG4gIF0sXG4gIHNvZnRNb2RpZmllcnM6IFtcImlubGluZVwiLCBcIm9wYXF1ZVwiLCBcIm9wZW5cIiwgXCJ0cmFuc3BhcmVudFwiLCBcInVzaW5nXCJdLFxuICBuYW1lOiAvKD86W2Etel8kXVtcXHckXSp8YFteYF0rYCkvLFxuICB0eXBlOiAvKD86W0EtWl1bXFx3JF0qKS8sXG4gIHN5bWJvbHM6IC9bPT48IX4/OiZ8K1xcLSpcXC9eXFxcXCVAI10rLyxcbiAgZGlnaXRzOiAvXFxkKyhfK1xcZCspKi8sXG4gIGhleGRpZ2l0czogL1tbMC05YS1mQS1GXSsoXytbMC05YS1mQS1GXSspKi8sXG4gIGVzY2FwZXM6IC9cXFxcKD86W2J0bmZyXFxcXFwiJ118eFswLTlBLUZhLWZdezEsNH18dVswLTlBLUZhLWZdezR9fFVbMC05QS1GYS1mXXs4fSkvLFxuICBmc3RyaW5nX2NvbnY6IC9bYkJoSHNTY0Nkb3hYZUVmZ0dhQXRdfFtUbl0oPzpbSElrbE1TTE5welpzUV18W0JiaEFhQ1l5am1kZV18W1JUckRGQ10pLyxcbiAgdG9rZW5pemVyOiB7XG4gICAgcm9vdDogW1xuICAgICAgWy9cXGJyYXdcIlwiXCIvLCB7IHRva2VuOiBcInN0cmluZy5xdW90ZVwiLCBicmFja2V0OiBcIkBvcGVuXCIsIG5leHQ6IFwiQHJhd3N0cmluZ3RcIiB9XSxcbiAgICAgIFsvXFxicmF3XCIvLCB7IHRva2VuOiBcInN0cmluZy5xdW90ZVwiLCBicmFja2V0OiBcIkBvcGVuXCIsIG5leHQ6IFwiQHJhd3N0cmluZ1wiIH1dLFxuICAgICAgWy9cXGJzXCJcIlwiLywgeyB0b2tlbjogXCJzdHJpbmcucXVvdGVcIiwgYnJhY2tldDogXCJAb3BlblwiLCBuZXh0OiBcIkBzc3RyaW5ndFwiIH1dLFxuICAgICAgWy9cXGJzXCIvLCB7IHRva2VuOiBcInN0cmluZy5xdW90ZVwiLCBicmFja2V0OiBcIkBvcGVuXCIsIG5leHQ6IFwiQHNzdHJpbmdcIiB9XSxcbiAgICAgIFsvXFxiZlwiXCJcIlwiLywgeyB0b2tlbjogXCJzdHJpbmcucXVvdGVcIiwgYnJhY2tldDogXCJAb3BlblwiLCBuZXh0OiBcIkBmc3RyaW5ndFwiIH1dLFxuICAgICAgWy9cXGJmXCIvLCB7IHRva2VuOiBcInN0cmluZy5xdW90ZVwiLCBicmFja2V0OiBcIkBvcGVuXCIsIG5leHQ6IFwiQGZzdHJpbmdcIiB9XSxcbiAgICAgIFsvXCJcIlwiLywgeyB0b2tlbjogXCJzdHJpbmcucXVvdGVcIiwgYnJhY2tldDogXCJAb3BlblwiLCBuZXh0OiBcIkBzdHJpbmd0XCIgfV0sXG4gICAgICBbL1wiLywgeyB0b2tlbjogXCJzdHJpbmcucXVvdGVcIiwgYnJhY2tldDogXCJAb3BlblwiLCBuZXh0OiBcIkBzdHJpbmdcIiB9XSxcbiAgICAgIFsvKEBkaWdpdHMpW2VFXShbXFwtK10/KEBkaWdpdHMpKT9bZkZkRF0/LywgXCJudW1iZXIuZmxvYXRcIiwgXCJAYWxsb3dNZXRob2RcIl0sXG4gICAgICBbLyhAZGlnaXRzKVxcLihAZGlnaXRzKShbZUVdW1xcLStdPyhAZGlnaXRzKSk/W2ZGZERdPy8sIFwibnVtYmVyLmZsb2F0XCIsIFwiQGFsbG93TWV0aG9kXCJdLFxuICAgICAgWy8wW3hYXShAaGV4ZGlnaXRzKVtMbF0/LywgXCJudW1iZXIuaGV4XCIsIFwiQGFsbG93TWV0aG9kXCJdLFxuICAgICAgWy8oQGRpZ2l0cylbZkZkRF0vLCBcIm51bWJlci5mbG9hdFwiLCBcIkBhbGxvd01ldGhvZFwiXSxcbiAgICAgIFsvKEBkaWdpdHMpW2xMXT8vLCBcIm51bWJlclwiLCBcIkBhbGxvd01ldGhvZFwiXSxcbiAgICAgIFsvXFxiX1xcKi8sIFwia2V5XCJdLFxuICAgICAgWy9cXGIoXylcXGIvLCBcImtleXdvcmRcIiwgXCJAYWxsb3dNZXRob2RcIl0sXG4gICAgICBbL1xcYmltcG9ydFxcYi8sIFwia2V5d29yZFwiLCBcIkBpbXBvcnRcIl0sXG4gICAgICBbL1xcYihjYXNlKShbIFxcdF0rKShjbGFzcylcXGIvLCBbXCJrZXl3b3JkLm1vZGlmaWVyXCIsIFwid2hpdGVcIiwgXCJrZXl3b3JkXCJdXSxcbiAgICAgIFsvXFxiY2FzZVxcYi8sIFwia2V5d29yZFwiLCBcIkBjYXNlXCJdLFxuICAgICAgWy9cXGJ2YVtscl1cXGIvLCBcImtleXdvcmRcIiwgXCJAdmFyZGVmXCJdLFxuICAgICAgW1xuICAgICAgICAvXFxiKGRlZikoWyBcXHRdKykoKD86dW5hcnlfKT9Ac3ltYm9sc3xAbmFtZSg/Ol89KXxAbmFtZSkvLFxuICAgICAgICBbXCJrZXl3b3JkXCIsIFwid2hpdGVcIiwgXCJpZGVudGlmaWVyXCJdXG4gICAgICBdLFxuICAgICAgWy9AbmFtZSg/PVsgXFx0XSo6KD8hOikpLywgXCJ2YXJpYWJsZVwiXSxcbiAgICAgIFsvKFxcLikoQG5hbWV8QHN5bWJvbHMpLywgW1wib3BlcmF0b3JcIiwgeyB0b2tlbjogXCJAcmVtYXRjaFwiLCBuZXh0OiBcIkBhbGxvd01ldGhvZFwiIH1dXSxcbiAgICAgIFsvKFt7KF0pKFxccyopKEBuYW1lKD89XFxzKj0+KSkvLCBbXCJAYnJhY2tldHNcIiwgXCJ3aGl0ZVwiLCBcInZhcmlhYmxlXCJdXSxcbiAgICAgIFtcbiAgICAgICAgL0BuYW1lLyxcbiAgICAgICAge1xuICAgICAgICAgIGNhc2VzOiB7XG4gICAgICAgICAgICBcIkBrZXl3b3Jkc1wiOiBcImtleXdvcmRcIixcbiAgICAgICAgICAgIFwiQHNvZnRLZXl3b3Jkc1wiOiBcImtleXdvcmRcIixcbiAgICAgICAgICAgIFwiQG1vZGlmaWVyc1wiOiBcImtleXdvcmQubW9kaWZpZXJcIixcbiAgICAgICAgICAgIFwiQHNvZnRNb2RpZmllcnNcIjogXCJrZXl3b3JkLm1vZGlmaWVyXCIsXG4gICAgICAgICAgICBcIkBjb25zdGFudHNcIjoge1xuICAgICAgICAgICAgICB0b2tlbjogXCJjb25zdGFudFwiLFxuICAgICAgICAgICAgICBuZXh0OiBcIkBhbGxvd01ldGhvZFwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJAZGVmYXVsdFwiOiB7XG4gICAgICAgICAgICAgIHRva2VuOiBcImlkZW50aWZpZXJcIixcbiAgICAgICAgICAgICAgbmV4dDogXCJAYWxsb3dNZXRob2RcIlxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgXSxcbiAgICAgIFsvQHR5cGUvLCBcInR5cGVcIiwgXCJAYWxsb3dNZXRob2RcIl0sXG4gICAgICB7IGluY2x1ZGU6IFwiQHdoaXRlc3BhY2VcIiB9LFxuICAgICAgWy9AW2EtekEtWl8kXVtcXHckXSooPzpcXC5bYS16QS1aXyRdW1xcdyRdKikqLywgXCJhbm5vdGF0aW9uXCJdLFxuICAgICAgWy9beyhdLywgXCJAYnJhY2tldHNcIl0sXG4gICAgICBbL1t9KV0vLCBcIkBicmFja2V0c1wiLCBcIkBhbGxvd01ldGhvZFwiXSxcbiAgICAgIFsvXFxbLywgXCJvcGVyYXRvci5zcXVhcmVcIl0sXG4gICAgICBbL10oPyFcXHMqKD86dmFbcmxdfGRlZnx0eXBlKVxcYikvLCBcIm9wZXJhdG9yLnNxdWFyZVwiLCBcIkBhbGxvd01ldGhvZFwiXSxcbiAgICAgIFsvXS8sIFwib3BlcmF0b3Iuc3F1YXJlXCJdLFxuICAgICAgWy8oWz0tXT58PC18Pjp8PDp8Oj58PCUpKD89W1xcc1xcdygpW1xcXXt9LFxcLlwiJ2BdKS8sIFwia2V5d29yZFwiXSxcbiAgICAgIFsvQHN5bWJvbHMvLCBcIm9wZXJhdG9yXCJdLFxuICAgICAgWy9bOyxcXC5dLywgXCJkZWxpbWl0ZXJcIl0sXG4gICAgICBbLydbYS16QS1aJF1bXFx3JF0qKD8hJykvLCBcImF0dHJpYnV0ZS5uYW1lXCJdLFxuICAgICAgWy8nW15cXFxcJ10nLywgXCJzdHJpbmdcIiwgXCJAYWxsb3dNZXRob2RcIl0sXG4gICAgICBbLygnKShAZXNjYXBlcykoJykvLCBbXCJzdHJpbmdcIiwgXCJzdHJpbmcuZXNjYXBlXCIsIHsgdG9rZW46IFwic3RyaW5nXCIsIG5leHQ6IFwiQGFsbG93TWV0aG9kXCIgfV1dLFxuICAgICAgWy8nLywgXCJzdHJpbmcuaW52YWxpZFwiXVxuICAgIF0sXG4gICAgaW1wb3J0OiBbXG4gICAgICBbLzsvLCBcImRlbGltaXRlclwiLCBcIkBwb3BcIl0sXG4gICAgICBbL158JC8sIFwiXCIsIFwiQHBvcFwiXSxcbiAgICAgIFsvWyBcXHRdKy8sIFwid2hpdGVcIl0sXG4gICAgICBbL1tcXG5cXHJdKy8sIFwid2hpdGVcIiwgXCJAcG9wXCJdLFxuICAgICAgWy9cXC9cXCovLCBcImNvbW1lbnRcIiwgXCJAY29tbWVudFwiXSxcbiAgICAgIFsvQG5hbWV8QHR5cGUvLCBcInR5cGVcIl0sXG4gICAgICBbL1soKXt9XS8sIFwiQGJyYWNrZXRzXCJdLFxuICAgICAgWy9bW1xcXV0vLCBcIm9wZXJhdG9yLnNxdWFyZVwiXSxcbiAgICAgIFsvW1xcLixdLywgXCJkZWxpbWl0ZXJcIl1cbiAgICBdLFxuICAgIGFsbG93TWV0aG9kOiBbXG4gICAgICBbL158JC8sIFwiXCIsIFwiQHBvcFwiXSxcbiAgICAgIFsvWyBcXHRdKy8sIFwid2hpdGVcIl0sXG4gICAgICBbL1tcXG5cXHJdKy8sIFwid2hpdGVcIiwgXCJAcG9wXCJdLFxuICAgICAgWy9cXC9cXCovLCBcImNvbW1lbnRcIiwgXCJAY29tbWVudFwiXSxcbiAgICAgIFsvKD89PT5bXFxzXFx3KFt7XSkvLCBcImtleXdvcmRcIiwgXCJAcG9wXCJdLFxuICAgICAgW1xuICAgICAgICAvKEBuYW1lfEBzeW1ib2xzKSg/PVsgXFx0XSpbWyh7XCInYF18WyBcXHRdKyg/OlsrLV0/XFwuP1xcZHxcXHcpKS8sXG4gICAgICAgIHtcbiAgICAgICAgICBjYXNlczoge1xuICAgICAgICAgICAgXCJAa2V5d29yZHNcIjogeyB0b2tlbjogXCJrZXl3b3JkXCIsIG5leHQ6IFwiQHBvcFwiIH0sXG4gICAgICAgICAgICBcIi0+fDwtfD46fDw6fDwlXCI6IHsgdG9rZW46IFwia2V5d29yZFwiLCBuZXh0OiBcIkBwb3BcIiB9LFxuICAgICAgICAgICAgXCJAZGVmYXVsdFwiOiB7IHRva2VuOiBcIkByZW1hdGNoXCIsIG5leHQ6IFwiQHBvcFwiIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIF0sXG4gICAgICBbXCJcIiwgXCJcIiwgXCJAcG9wXCJdXG4gICAgXSxcbiAgICBjb21tZW50OiBbXG4gICAgICBbL1teXFwvKl0rLywgXCJjb21tZW50XCJdLFxuICAgICAgWy9cXC9cXCovLCBcImNvbW1lbnRcIiwgXCJAcHVzaFwiXSxcbiAgICAgIFsvXFwqXFwvLywgXCJjb21tZW50XCIsIFwiQHBvcFwiXSxcbiAgICAgIFsvW1xcLypdLywgXCJjb21tZW50XCJdXG4gICAgXSxcbiAgICBjYXNlOiBbXG4gICAgICBbL1xcYl9cXCovLCBcImtleVwiXSxcbiAgICAgIFsvXFxiKF98dHJ1ZXxmYWxzZXxudWxsfHRoaXN8c3VwZXIpXFxiLywgXCJrZXl3b3JkXCIsIFwiQGFsbG93TWV0aG9kXCJdLFxuICAgICAgWy9cXGJpZlxcYnw9Pi8sIFwia2V5d29yZFwiLCBcIkBwb3BcIl0sXG4gICAgICBbL2BbXmBdK2AvLCBcImlkZW50aWZpZXJcIiwgXCJAYWxsb3dNZXRob2RcIl0sXG4gICAgICBbL0BuYW1lLywgXCJ2YXJpYWJsZVwiLCBcIkBhbGxvd01ldGhvZFwiXSxcbiAgICAgIFsvOjo6P3xcXHx8QCg/IVthLXpfJF0pLywgXCJrZXl3b3JkXCJdLFxuICAgICAgeyBpbmNsdWRlOiBcIkByb290XCIgfVxuICAgIF0sXG4gICAgdmFyZGVmOiBbXG4gICAgICBbL1xcYl9cXCovLCBcImtleVwiXSxcbiAgICAgIFsvXFxiKF98dHJ1ZXxmYWxzZXxudWxsfHRoaXN8c3VwZXIpXFxiLywgXCJrZXl3b3JkXCJdLFxuICAgICAgWy9AbmFtZS8sIFwidmFyaWFibGVcIl0sXG4gICAgICBbLzo6Oj98XFx8fEAoPyFbYS16XyRdKS8sIFwia2V5d29yZFwiXSxcbiAgICAgIFsvPXw6KD8hOikvLCBcIm9wZXJhdG9yXCIsIFwiQHBvcFwiXSxcbiAgICAgIFsvJC8sIFwid2hpdGVcIiwgXCJAcG9wXCJdLFxuICAgICAgeyBpbmNsdWRlOiBcIkByb290XCIgfVxuICAgIF0sXG4gICAgc3RyaW5nOiBbXG4gICAgICBbL1teXFxcXFwiXFxuXFxyXSsvLCBcInN0cmluZ1wiXSxcbiAgICAgIFsvQGVzY2FwZXMvLCBcInN0cmluZy5lc2NhcGVcIl0sXG4gICAgICBbL1xcXFwuLywgXCJzdHJpbmcuZXNjYXBlLmludmFsaWRcIl0sXG4gICAgICBbXG4gICAgICAgIC9cIi8sXG4gICAgICAgIHtcbiAgICAgICAgICB0b2tlbjogXCJzdHJpbmcucXVvdGVcIixcbiAgICAgICAgICBicmFja2V0OiBcIkBjbG9zZVwiLFxuICAgICAgICAgIHN3aXRjaFRvOiBcIkBhbGxvd01ldGhvZFwiXG4gICAgICAgIH1cbiAgICAgIF1cbiAgICBdLFxuICAgIHN0cmluZ3Q6IFtcbiAgICAgIFsvW15cXFxcXCJcXG5cXHJdKy8sIFwic3RyaW5nXCJdLFxuICAgICAgWy9AZXNjYXBlcy8sIFwic3RyaW5nLmVzY2FwZVwiXSxcbiAgICAgIFsvXFxcXC4vLCBcInN0cmluZy5lc2NhcGUuaW52YWxpZFwiXSxcbiAgICAgIFsvXCIoPz1cIlwiXCIpLywgXCJzdHJpbmdcIl0sXG4gICAgICBbXG4gICAgICAgIC9cIlwiXCIvLFxuICAgICAgICB7XG4gICAgICAgICAgdG9rZW46IFwic3RyaW5nLnF1b3RlXCIsXG4gICAgICAgICAgYnJhY2tldDogXCJAY2xvc2VcIixcbiAgICAgICAgICBzd2l0Y2hUbzogXCJAYWxsb3dNZXRob2RcIlxuICAgICAgICB9XG4gICAgICBdLFxuICAgICAgWy9cIi8sIFwic3RyaW5nXCJdXG4gICAgXSxcbiAgICBmc3RyaW5nOiBbXG4gICAgICBbL0Blc2NhcGVzLywgXCJzdHJpbmcuZXNjYXBlXCJdLFxuICAgICAgW1xuICAgICAgICAvXCIvLFxuICAgICAgICB7XG4gICAgICAgICAgdG9rZW46IFwic3RyaW5nLnF1b3RlXCIsXG4gICAgICAgICAgYnJhY2tldDogXCJAY2xvc2VcIixcbiAgICAgICAgICBzd2l0Y2hUbzogXCJAYWxsb3dNZXRob2RcIlxuICAgICAgICB9XG4gICAgICBdLFxuICAgICAgWy9cXCRcXCQvLCBcInN0cmluZ1wiXSxcbiAgICAgIFsvKFxcJCkoW2Etel9dXFx3KikvLCBbXCJvcGVyYXRvclwiLCBcImlkZW50aWZpZXJcIl1dLFxuICAgICAgWy9cXCRcXHsvLCBcIm9wZXJhdG9yXCIsIFwiQGludGVycFwiXSxcbiAgICAgIFsvJSUvLCBcInN0cmluZ1wiXSxcbiAgICAgIFtcbiAgICAgICAgLyglKShbXFwtIysgMCwoXSkoXFxkK3xcXC5cXGQrfFxcZCtcXC5cXGQrKShAZnN0cmluZ19jb252KS8sXG4gICAgICAgIFtcIm1ldGF0YWdcIiwgXCJrZXl3b3JkLm1vZGlmaWVyXCIsIFwibnVtYmVyXCIsIFwibWV0YXRhZ1wiXVxuICAgICAgXSxcbiAgICAgIFsvKCUpKFxcZCt8XFwuXFxkK3xcXGQrXFwuXFxkKykoQGZzdHJpbmdfY29udikvLCBbXCJtZXRhdGFnXCIsIFwibnVtYmVyXCIsIFwibWV0YXRhZ1wiXV0sXG4gICAgICBbLyglKShbXFwtIysgMCwoXSkoQGZzdHJpbmdfY29udikvLCBbXCJtZXRhdGFnXCIsIFwia2V5d29yZC5tb2RpZmllclwiLCBcIm1ldGF0YWdcIl1dLFxuICAgICAgWy8oJSkoQGZzdHJpbmdfY29udikvLCBbXCJtZXRhdGFnXCIsIFwibWV0YXRhZ1wiXV0sXG4gICAgICBbLy4vLCBcInN0cmluZ1wiXVxuICAgIF0sXG4gICAgZnN0cmluZ3Q6IFtcbiAgICAgIFsvQGVzY2FwZXMvLCBcInN0cmluZy5lc2NhcGVcIl0sXG4gICAgICBbL1wiKD89XCJcIlwiKS8sIFwic3RyaW5nXCJdLFxuICAgICAgW1xuICAgICAgICAvXCJcIlwiLyxcbiAgICAgICAge1xuICAgICAgICAgIHRva2VuOiBcInN0cmluZy5xdW90ZVwiLFxuICAgICAgICAgIGJyYWNrZXQ6IFwiQGNsb3NlXCIsXG4gICAgICAgICAgc3dpdGNoVG86IFwiQGFsbG93TWV0aG9kXCJcbiAgICAgICAgfVxuICAgICAgXSxcbiAgICAgIFsvXFwkXFwkLywgXCJzdHJpbmdcIl0sXG4gICAgICBbLyhcXCQpKFthLXpfXVxcdyopLywgW1wib3BlcmF0b3JcIiwgXCJpZGVudGlmaWVyXCJdXSxcbiAgICAgIFsvXFwkXFx7LywgXCJvcGVyYXRvclwiLCBcIkBpbnRlcnBcIl0sXG4gICAgICBbLyUlLywgXCJzdHJpbmdcIl0sXG4gICAgICBbXG4gICAgICAgIC8oJSkoW1xcLSMrIDAsKF0pKFxcZCt8XFwuXFxkK3xcXGQrXFwuXFxkKykoQGZzdHJpbmdfY29udikvLFxuICAgICAgICBbXCJtZXRhdGFnXCIsIFwia2V5d29yZC5tb2RpZmllclwiLCBcIm51bWJlclwiLCBcIm1ldGF0YWdcIl1cbiAgICAgIF0sXG4gICAgICBbLyglKShcXGQrfFxcLlxcZCt8XFxkK1xcLlxcZCspKEBmc3RyaW5nX2NvbnYpLywgW1wibWV0YXRhZ1wiLCBcIm51bWJlclwiLCBcIm1ldGF0YWdcIl1dLFxuICAgICAgWy8oJSkoW1xcLSMrIDAsKF0pKEBmc3RyaW5nX2NvbnYpLywgW1wibWV0YXRhZ1wiLCBcImtleXdvcmQubW9kaWZpZXJcIiwgXCJtZXRhdGFnXCJdXSxcbiAgICAgIFsvKCUpKEBmc3RyaW5nX2NvbnYpLywgW1wibWV0YXRhZ1wiLCBcIm1ldGF0YWdcIl1dLFxuICAgICAgWy8uLywgXCJzdHJpbmdcIl1cbiAgICBdLFxuICAgIHNzdHJpbmc6IFtcbiAgICAgIFsvQGVzY2FwZXMvLCBcInN0cmluZy5lc2NhcGVcIl0sXG4gICAgICBbXG4gICAgICAgIC9cIi8sXG4gICAgICAgIHtcbiAgICAgICAgICB0b2tlbjogXCJzdHJpbmcucXVvdGVcIixcbiAgICAgICAgICBicmFja2V0OiBcIkBjbG9zZVwiLFxuICAgICAgICAgIHN3aXRjaFRvOiBcIkBhbGxvd01ldGhvZFwiXG4gICAgICAgIH1cbiAgICAgIF0sXG4gICAgICBbL1xcJFxcJC8sIFwic3RyaW5nXCJdLFxuICAgICAgWy8oXFwkKShbYS16X11cXHcqKS8sIFtcIm9wZXJhdG9yXCIsIFwiaWRlbnRpZmllclwiXV0sXG4gICAgICBbL1xcJFxcey8sIFwib3BlcmF0b3JcIiwgXCJAaW50ZXJwXCJdLFxuICAgICAgWy8uLywgXCJzdHJpbmdcIl1cbiAgICBdLFxuICAgIHNzdHJpbmd0OiBbXG4gICAgICBbL0Blc2NhcGVzLywgXCJzdHJpbmcuZXNjYXBlXCJdLFxuICAgICAgWy9cIig/PVwiXCJcIikvLCBcInN0cmluZ1wiXSxcbiAgICAgIFtcbiAgICAgICAgL1wiXCJcIi8sXG4gICAgICAgIHtcbiAgICAgICAgICB0b2tlbjogXCJzdHJpbmcucXVvdGVcIixcbiAgICAgICAgICBicmFja2V0OiBcIkBjbG9zZVwiLFxuICAgICAgICAgIHN3aXRjaFRvOiBcIkBhbGxvd01ldGhvZFwiXG4gICAgICAgIH1cbiAgICAgIF0sXG4gICAgICBbL1xcJFxcJC8sIFwic3RyaW5nXCJdLFxuICAgICAgWy8oXFwkKShbYS16X11cXHcqKS8sIFtcIm9wZXJhdG9yXCIsIFwiaWRlbnRpZmllclwiXV0sXG4gICAgICBbL1xcJFxcey8sIFwib3BlcmF0b3JcIiwgXCJAaW50ZXJwXCJdLFxuICAgICAgWy8uLywgXCJzdHJpbmdcIl1cbiAgICBdLFxuICAgIGludGVycDogW1svey8sIFwib3BlcmF0b3JcIiwgXCJAcHVzaFwiXSwgWy99LywgXCJvcGVyYXRvclwiLCBcIkBwb3BcIl0sIHsgaW5jbHVkZTogXCJAcm9vdFwiIH1dLFxuICAgIHJhd3N0cmluZzogW1xuICAgICAgWy9bXlwiXS8sIFwic3RyaW5nXCJdLFxuICAgICAgW1xuICAgICAgICAvXCIvLFxuICAgICAgICB7XG4gICAgICAgICAgdG9rZW46IFwic3RyaW5nLnF1b3RlXCIsXG4gICAgICAgICAgYnJhY2tldDogXCJAY2xvc2VcIixcbiAgICAgICAgICBzd2l0Y2hUbzogXCJAYWxsb3dNZXRob2RcIlxuICAgICAgICB9XG4gICAgICBdXG4gICAgXSxcbiAgICByYXdzdHJpbmd0OiBbXG4gICAgICBbL1teXCJdLywgXCJzdHJpbmdcIl0sXG4gICAgICBbL1wiKD89XCJcIlwiKS8sIFwic3RyaW5nXCJdLFxuICAgICAgW1xuICAgICAgICAvXCJcIlwiLyxcbiAgICAgICAge1xuICAgICAgICAgIHRva2VuOiBcInN0cmluZy5xdW90ZVwiLFxuICAgICAgICAgIGJyYWNrZXQ6IFwiQGNsb3NlXCIsXG4gICAgICAgICAgc3dpdGNoVG86IFwiQGFsbG93TWV0aG9kXCJcbiAgICAgICAgfVxuICAgICAgXSxcbiAgICAgIFsvXCIvLCBcInN0cmluZ1wiXVxuICAgIF0sXG4gICAgd2hpdGVzcGFjZTogW1xuICAgICAgWy9bIFxcdFxcclxcbl0rLywgXCJ3aGl0ZVwiXSxcbiAgICAgIFsvXFwvXFwqLywgXCJjb21tZW50XCIsIFwiQGNvbW1lbnRcIl0sXG4gICAgICBbL1xcL1xcLy4qJC8sIFwiY29tbWVudFwiXVxuICAgIF1cbiAgfVxufTtcbmV4cG9ydCB7XG4gIGNvbmYsXG4gIGxhbmd1YWdlXG59O1xuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQVFHLElBQUMsT0FBTztBQUFBLEVBQ1QsYUFBYTtBQUFBLEVBQ2IsVUFBVTtBQUFBLElBQ1IsYUFBYTtBQUFBLElBQ2IsY0FBYyxDQUFDLE1BQU0sSUFBSTtBQUFBLEVBQzFCO0FBQUEsRUFDRCxVQUFVO0FBQUEsSUFDUixDQUFDLEtBQUssR0FBRztBQUFBLElBQ1QsQ0FBQyxLQUFLLEdBQUc7QUFBQSxJQUNULENBQUMsS0FBSyxHQUFHO0FBQUEsRUFDVjtBQUFBLEVBQ0Qsa0JBQWtCO0FBQUEsSUFDaEIsRUFBRSxNQUFNLEtBQUssT0FBTyxJQUFLO0FBQUEsSUFDekIsRUFBRSxNQUFNLEtBQUssT0FBTyxJQUFLO0FBQUEsSUFDekIsRUFBRSxNQUFNLEtBQUssT0FBTyxJQUFLO0FBQUEsSUFDekIsRUFBRSxNQUFNLEtBQUssT0FBTyxJQUFLO0FBQUEsSUFDekIsRUFBRSxNQUFNLEtBQUssT0FBTyxJQUFLO0FBQUEsRUFDMUI7QUFBQSxFQUNELGtCQUFrQjtBQUFBLElBQ2hCLEVBQUUsTUFBTSxLQUFLLE9BQU8sSUFBSztBQUFBLElBQ3pCLEVBQUUsTUFBTSxLQUFLLE9BQU8sSUFBSztBQUFBLElBQ3pCLEVBQUUsTUFBTSxLQUFLLE9BQU8sSUFBSztBQUFBLElBQ3pCLEVBQUUsTUFBTSxLQUFLLE9BQU8sSUFBSztBQUFBLElBQ3pCLEVBQUUsTUFBTSxLQUFLLE9BQU8sSUFBSztBQUFBLEVBQzFCO0FBQUEsRUFDRCxTQUFTO0FBQUEsSUFDUCxTQUFTO0FBQUEsTUFDUCxPQUFPLElBQUksT0FBTyxvREFBb0Q7QUFBQSxNQUN0RSxLQUFLLElBQUksT0FBTyxzREFBc0Q7QUFB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QUNFO0FBQUEsUUFDQTtBQUFBLFVBQ0UsT0FBTztBQUFBLFVBQ1AsU0FBUztBQUFBLFVBQ1QsVUFBVTtBQUFBLFFBQ1g7QUFBQSxNQUNGO0FBQUEsTUFDRCxDQUFDLFFBQVEsUUFBUTtBQUFBLE1BQ2pCLENBQUMsbUJBQW1CLENBQUMsWUFBWSxZQUFZLENBQUM7QUFBQSxNQUM5QyxDQUFDLFFBQVEsWUFBWSxTQUFTO0FBQUEsTUFDOUIsQ0FBQyxLQUFLLFFBQVE7QUFBQSxJQUNmO0FBQUEsSUFDRCxVQUFVO0FBQUEsTUFDUixDQUFDLFlBQVksZUFBZTtBQUFBLE1BQzVCLENBQUMsWUFBWSxRQUFRO0FBQUEsTUFDckI7QUFBQSxRQUNFO0FBQUEsUUFDQTtBQUFBLFVBQ0UsT0FBTztBQUFBLFVBQ1AsU0FBUztBQUFBLFVBQ1QsVUFBVTtBQUFBLFFBQ1g7QUFBQSxNQUNGO0FBQUEsTUFDRCxDQUFDLFFBQVEsUUFBUTtBQUFBLE1BQ2pCLENBQUMsbUJBQW1CLENBQUMsWUFBWSxZQUFZLENBQUM7QUFBQSxNQUM5QyxDQUFDLFFBQVEsWUFBWSxTQUFTO0FBQUEsTUFDOUIsQ0FBQyxLQUFLLFFBQVE7QUFBQSxJQUNmO0FBQUEsSUFDRCxRQUFRLENBQUMsQ0FBQyxLQUFLLFlBQVksT0FBTyxHQUFHLENBQUMsS0FBSyxZQUFZLE1BQU0sR0FBRyxFQUFFLFNBQVMsUUFBTyxDQUFFO0FBQUEsSUFDcEYsV0FBVztBQUFBLE1BQ1QsQ0FBQyxRQUFRLFFBQVE7QUFBQSxNQUNqQjtBQUFBLFFBQ0U7QUFBQSxRQUNBO0FBQUEsVUFDRSxPQUFPO0FBQUEsVUFDUCxTQUFTO0FBQUEsVUFDVCxVQUFVO0FBQUEsUUFDWDtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsSUFDRCxZQUFZO0FBQUEsTUFDVixDQUFDLFFBQVEsUUFBUTtBQUFBLE1BQ2pCLENBQUMsWUFBWSxRQUFRO0FBQUEsTUFDckI7QUFBQSxRQUNFO0FBQUEsUUFDQTtBQUFBLFVBQ0UsT0FBTztBQUFBLFVBQ1AsU0FBUztBQUFBLFVBQ1QsVUFBVTtBQUFBLFFBQ1g7QUFBQSxNQUNGO0FBQUEsTUFDRCxDQUFDLEtBQUssUUFBUTtBQUFBLElBQ2Y7QUFBQSxJQUNELFlBQVk7QUFBQSxNQUNWLENBQUMsY0FBYyxPQUFPO0FBQUEsTUFDdEIsQ0FBQyxRQUFRLFdBQVcsVUFBVTtBQUFBLE1BQzlCLENBQUMsV0FBVyxTQUFTO0FBQUEsSUFDdEI7QUFBQSxFQUNGO0FBQ0g7IiwieF9nb29nbGVfaWdub3JlTGlzdCI6WzBdfQ==
