var conf = {
  wordPattern: /(#?-?\d*\.\d\w*%?)|([@$#!.:]?[\w-?]+%?)|[@#!.]/g,
  comments: {
    blockComment: ["/*", "*/"],
    lineComment: "//"
  },
  brackets: [
    ["{", "}"],
    ["[", "]"],
    ["(", ")"]
  ],
  autoClosingPairs: [
    { open: "{", close: "}", notIn: ["string", "comment"] },
    { open: "[", close: "]", notIn: ["string", "comment"] },
    { open: "(", close: ")", notIn: ["string", "comment"] },
    { open: '"', close: '"', notIn: ["string", "comment"] },
    { open: "'", close: "'", notIn: ["string", "comment"] }
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
      start: new RegExp("^\\s*\\/\\*\\s*#region\\b\\s*(.*?)\\s*\\*\\/"),
      end: new RegExp("^\\s*\\/\\*\\s*#endregion\\b.*\\*\\/")
    }
  }
};
var language = {
  defaultToken: "",
  tokenPostfix: ".scss",
  ws: "[ 	\n\r\f]*",
  identifier: "-?-?([a-zA-Z]|(\\\\(([0-9a-fA-F]{1,6}\\s?)|[^[0-9a-fA-F])))([\\w\\-]|(\\\\(([0-9a-fA-F]{1,6}\\s?)|[^[0-9a-fA-F])))*",
  brackets: [
    { open: "{", close: "}", token: "delimiter.curly" },
    { open: "[", close: "]", token: "delimiter.bracket" },
    { open: "(", close: ")", token: "delimiter.parenthesis" },
    { open: "<", close: ">", token: "delimiter.angle" }
  ],
  tokenizer: {
    root: [{ include: "@selector" }],
    selector: [
      { include: "@comments" },
      { include: "@import" },
      { include: "@variabledeclaration" },
      { include: "@warndebug" },
      ["[@](include)", { token: "keyword", next: "@includedeclaration" }],
      [
        "[@](keyframes|-webkit-keyframes|-moz-keyframes|-o-keyframes)",
        { token: "keyword", next: "@keyframedeclaration" }
      ],
      ["[@](page|content|font-face|-moz-document)", { token: "keyword" }],
      ["[@](charset|namespace)", { token: "keyword", next: "@declarationbody" }],
      ["[@](function)", { token: "keyword", next: "@functiondeclaration" }],
      ["[@](mixin)", { token: "keyword", next: "@mixindeclaration" }],
      ["url(\\-prefix)?\\(", { token: "meta", next: "@urldeclaration" }],
      { include: "@controlstatement" },
      { include: "@selectorname" },
      ["[&\\*]", "tag"],
      ["[>\\+,]", "delimiter"],
      ["\\[", { token: "delimiter.bracket", next: "@selectorattribute" }],
      ["{", { token: "delimiter.curly", next: "@selectorbody" }]
    ],
    selectorbody: [
      ["[*_]?@identifier@ws:(?=(\\s|\\d|[^{;}]*[;}]))", "attribute.name", "@rulevalue"],
      { include: "@selector" },
      ["[@](extend)", { token: "keyword", next: "@extendbody" }],
      ["[@](return)", { token: "keyword", next: "@declarationbody" }],
      ["}", { token: "delimiter.curly", next: "@pop" }]
    ],
    selectorname: [
      ["#{", { token: "meta", next: "@variableinterpolation" }],
      ["(\\.|#(?=[^{])|%|(@identifier)|:)+", "tag"]
    ],
    selectorattribute: [{ include: "@term" }, ["]", { token: "delimiter.bracket", next: "@pop" }]],
    term: [
      { include: "@comments" },
      ["url(\\-prefix)?\\(", { token: "meta", next: "@urldeclaration" }],
      { include: "@functioninvocation" },
      { include: "@numbers" },
      { include: "@strings" },
      { include: "@variablereference" },
      ["(and\\b|or\\b|not\\b)", "operator"],
      { include: "@name" },
      ["([<>=\\+\\-\\*\\/\\^\\|\\~,])", "operator"],
      [",", "delimiter"],
      ["!default", "literal"],
      ["\\(", { token: "delimiter.parenthesis", next: "@parenthizedterm" }]
    ],
    rulevalue: [
      { include: "@term" },
      ["!important", "literal"],
      [";", "delimiter", "@pop"],
      ["{", { token: "delimiter.curly", switchTo: "@nestedproperty" }],
      ["(?=})", { token: "", next: "@pop" }]
    ],
    nestedproperty: [
      ["[*_]?@identifier@ws:", "attribute.name", "@rulevalue"],
      { include: "@comments" },
      ["}", { token: "delimiter.curly", next: "@pop" }]
    ],
    warndebug: [["[@](warn|debug)", { token: "keyword", next: "@declarationbody" }]],
    import: [["[@](import)", { token: "keyword", next: "@declarationbody" }]],
    variabledeclaration: [
      ["\\$@identifier@ws:", "variable.decl", "@declarationbody"]
    ],
    urldeclaration: [
      { include: "@strings" },
      ["[^)\r\n]+", "string"],
      ["\\)", { token: "meta", next: "@pop" }]
    ],
    parenthizedterm: [
      { include: "@term" },
      ["\\)", { token: "delimiter.parenthesis", next: "@pop" }]
    ],
    declarationbody: [
      { include: "@term" },
      [";", "delimiter", "@pop"],
      ["(?=})", { token: "", next: "@pop" }]
    ],
    extendbody: [
      { include: "@selectorname" },
      ["!optional", "literal"],
      [";", "delimiter", "@pop"],
      ["(?=})", { token: "", next: "@pop" }]
    ],
    variablereference: [
      ["\\$@identifier", "variable.ref"],
      ["\\.\\.\\.", "operator"],
      ["#{", { token: "meta", next: "@variableinterpolation" }]
    ],
    variableinterpolation: [
      { include: "@variablereference" },
      ["}", { token: "meta", next: "@pop" }]
    ],
    comments: [
      ["\\/\\*", "comment", "@comment"],
      ["\\/\\/+.*", "comment"]
    ],
    comment: [
      ["\\*\\/", "comment", "@pop"],
      [".", "comment"]
    ],
    name: [["@identifier", "attribute.value"]],
    numbers: [
      ["(\\d*\\.)?\\d+([eE][\\-+]?\\d+)?", { token: "number", next: "@units" }],
      ["#[0-9a-fA-F_]+(?!\\w)", "number.hex"]
    ],
    units: [
      [
        "(em|ex|ch|rem|fr|vmin|vmax|vw|vh|vm|cm|mm|in|px|pt|pc|deg|grad|rad|turn|s|ms|Hz|kHz|%)?",
        "number",
        "@pop"
      ]
    ],
    functiondeclaration: [
      ["@identifier@ws\\(", { token: "meta", next: "@parameterdeclaration" }],
      ["{", { token: "delimiter.curly", switchTo: "@functionbody" }]
    ],
    mixindeclaration: [
      ["@identifier@ws\\(", { token: "meta", next: "@parameterdeclaration" }],
      ["@identifier", "meta"],
      ["{", { token: "delimiter.curly", switchTo: "@selectorbody" }]
    ],
    parameterdeclaration: [
      ["\\$@identifier@ws:", "variable.decl"],
      ["\\.\\.\\.", "operator"],
      [",", "delimiter"],
      { include: "@term" },
      ["\\)", { token: "meta", next: "@pop" }]
    ],
    includedeclaration: [
      { include: "@functioninvocation" },
      ["@identifier", "meta"],
      [";", "delimiter", "@pop"],
      ["(?=})", { token: "", next: "@pop" }],
      ["{", { token: "delimiter.curly", switchTo: "@selectorbody" }]
    ],
    keyframedeclaration: [
      ["@identifier", "meta"],
      ["{", { token: "delimiter.curly", switchTo: "@keyframebody" }]
    ],
    keyframebody: [
      { include: "@term" },
      ["{", { token: "delimiter.curly", next: "@selectorbody" }],
      ["}", { token: "delimiter.curly", next: "@pop" }]
    ],
    controlstatement: [
      [
        "[@](if|else|for|while|each|media)",
        { token: "keyword.flow", next: "@controlstatementdeclaration" }
      ]
    ],
    controlstatementdeclaration: [
      ["(in|from|through|if|to)\\b", { token: "keyword.flow" }],
      { include: "@term" },
      ["{", { token: "delimiter.curly", switchTo: "@selectorbody" }]
    ],
    functionbody: [
      ["[@](return)", { token: "keyword" }],
      { include: "@variabledeclaration" },
      { include: "@term" },
      { include: "@controlstatement" },
      [";", "delimiter"],
      ["}", { token: "delimiter.curly", next: "@pop" }]
    ],
    functioninvocation: [["@identifier\\(", { token: "meta", next: "@functionarguments" }]],
    functionarguments: [
      ["\\$@identifier@ws:", "attribute.name"],
      ["[,]", "delimiter"],
      { include: "@term" },
      ["\\)", { token: "meta", next: "@pop" }]
    ],
    strings: [
      ['~?"', { token: "string.delimiter", next: "@stringenddoublequote" }],
      ["~?'", { token: "string.delimiter", next: "@stringendquote" }]
    ],
    stringenddoublequote: [
      ["\\\\.", "string"],
      ['"', { token: "string.delimiter", next: "@pop" }],
      [".", "string"]
    ],
    stringendquote: [
      ["\\\\.", "string"],
      ["'", { token: "string.delimiter", next: "@pop" }],
      [".", "string"]
    ]
  }
};
export {
  conf,
  language
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2Nzcy5qcyIsInNvdXJjZXMiOlsiLi4vLi4vbm9kZV9tb2R1bGVzL21vbmFjby1lZGl0b3IvZXNtL3ZzL2Jhc2ljLWxhbmd1YWdlcy9zY3NzL3Njc3MuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyohLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogVmVyc2lvbjogMC40NS4wKDVlNWFmMDEzZjhkMjk1NTU1YTcyMTBkZjBkNWYyY2VhMGJmNWRkNTYpXG4gKiBSZWxlYXNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2VcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9taWNyb3NvZnQvbW9uYWNvLWVkaXRvci9ibG9iL21haW4vTElDRU5TRS50eHRcbiAqLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG4vLyBzcmMvYmFzaWMtbGFuZ3VhZ2VzL3Njc3Mvc2Nzcy50c1xudmFyIGNvbmYgPSB7XG4gIHdvcmRQYXR0ZXJuOiAvKCM/LT9cXGQqXFwuXFxkXFx3KiU/KXwoW0AkIyEuOl0/W1xcdy0/XSslPyl8W0AjIS5dL2csXG4gIGNvbW1lbnRzOiB7XG4gICAgYmxvY2tDb21tZW50OiBbXCIvKlwiLCBcIiovXCJdLFxuICAgIGxpbmVDb21tZW50OiBcIi8vXCJcbiAgfSxcbiAgYnJhY2tldHM6IFtcbiAgICBbXCJ7XCIsIFwifVwiXSxcbiAgICBbXCJbXCIsIFwiXVwiXSxcbiAgICBbXCIoXCIsIFwiKVwiXVxuICBdLFxuICBhdXRvQ2xvc2luZ1BhaXJzOiBbXG4gICAgeyBvcGVuOiBcIntcIiwgY2xvc2U6IFwifVwiLCBub3RJbjogW1wic3RyaW5nXCIsIFwiY29tbWVudFwiXSB9LFxuICAgIHsgb3BlbjogXCJbXCIsIGNsb3NlOiBcIl1cIiwgbm90SW46IFtcInN0cmluZ1wiLCBcImNvbW1lbnRcIl0gfSxcbiAgICB7IG9wZW46IFwiKFwiLCBjbG9zZTogXCIpXCIsIG5vdEluOiBbXCJzdHJpbmdcIiwgXCJjb21tZW50XCJdIH0sXG4gICAgeyBvcGVuOiAnXCInLCBjbG9zZTogJ1wiJywgbm90SW46IFtcInN0cmluZ1wiLCBcImNvbW1lbnRcIl0gfSxcbiAgICB7IG9wZW46IFwiJ1wiLCBjbG9zZTogXCInXCIsIG5vdEluOiBbXCJzdHJpbmdcIiwgXCJjb21tZW50XCJdIH1cbiAgXSxcbiAgc3Vycm91bmRpbmdQYWlyczogW1xuICAgIHsgb3BlbjogXCJ7XCIsIGNsb3NlOiBcIn1cIiB9LFxuICAgIHsgb3BlbjogXCJbXCIsIGNsb3NlOiBcIl1cIiB9LFxuICAgIHsgb3BlbjogXCIoXCIsIGNsb3NlOiBcIilcIiB9LFxuICAgIHsgb3BlbjogJ1wiJywgY2xvc2U6ICdcIicgfSxcbiAgICB7IG9wZW46IFwiJ1wiLCBjbG9zZTogXCInXCIgfVxuICBdLFxuICBmb2xkaW5nOiB7XG4gICAgbWFya2Vyczoge1xuICAgICAgc3RhcnQ6IG5ldyBSZWdFeHAoXCJeXFxcXHMqXFxcXC9cXFxcKlxcXFxzKiNyZWdpb25cXFxcYlxcXFxzKiguKj8pXFxcXHMqXFxcXCpcXFxcL1wiKSxcbiAgICAgIGVuZDogbmV3IFJlZ0V4cChcIl5cXFxccypcXFxcL1xcXFwqXFxcXHMqI2VuZHJlZ2lvblxcXFxiLipcXFxcKlxcXFwvXCIpXG4gICAgfVxuICB9XG59O1xudmFyIGxhbmd1YWdlID0ge1xuICBkZWZhdWx0VG9rZW46IFwiXCIsXG4gIHRva2VuUG9zdGZpeDogXCIuc2Nzc1wiLFxuICB3czogXCJbIFx0XFxuXFxyXFxmXSpcIixcbiAgaWRlbnRpZmllcjogXCItPy0/KFthLXpBLVpdfChcXFxcXFxcXCgoWzAtOWEtZkEtRl17MSw2fVxcXFxzPyl8W15bMC05YS1mQS1GXSkpKShbXFxcXHdcXFxcLV18KFxcXFxcXFxcKChbMC05YS1mQS1GXXsxLDZ9XFxcXHM/KXxbXlswLTlhLWZBLUZdKSkpKlwiLFxuICBicmFja2V0czogW1xuICAgIHsgb3BlbjogXCJ7XCIsIGNsb3NlOiBcIn1cIiwgdG9rZW46IFwiZGVsaW1pdGVyLmN1cmx5XCIgfSxcbiAgICB7IG9wZW46IFwiW1wiLCBjbG9zZTogXCJdXCIsIHRva2VuOiBcImRlbGltaXRlci5icmFja2V0XCIgfSxcbiAgICB7IG9wZW46IFwiKFwiLCBjbG9zZTogXCIpXCIsIHRva2VuOiBcImRlbGltaXRlci5wYXJlbnRoZXNpc1wiIH0sXG4gICAgeyBvcGVuOiBcIjxcIiwgY2xvc2U6IFwiPlwiLCB0b2tlbjogXCJkZWxpbWl0ZXIuYW5nbGVcIiB9XG4gIF0sXG4gIHRva2VuaXplcjoge1xuICAgIHJvb3Q6IFt7IGluY2x1ZGU6IFwiQHNlbGVjdG9yXCIgfV0sXG4gICAgc2VsZWN0b3I6IFtcbiAgICAgIHsgaW5jbHVkZTogXCJAY29tbWVudHNcIiB9LFxuICAgICAgeyBpbmNsdWRlOiBcIkBpbXBvcnRcIiB9LFxuICAgICAgeyBpbmNsdWRlOiBcIkB2YXJpYWJsZWRlY2xhcmF0aW9uXCIgfSxcbiAgICAgIHsgaW5jbHVkZTogXCJAd2FybmRlYnVnXCIgfSxcbiAgICAgIFtcIltAXShpbmNsdWRlKVwiLCB7IHRva2VuOiBcImtleXdvcmRcIiwgbmV4dDogXCJAaW5jbHVkZWRlY2xhcmF0aW9uXCIgfV0sXG4gICAgICBbXG4gICAgICAgIFwiW0BdKGtleWZyYW1lc3wtd2Via2l0LWtleWZyYW1lc3wtbW96LWtleWZyYW1lc3wtby1rZXlmcmFtZXMpXCIsXG4gICAgICAgIHsgdG9rZW46IFwia2V5d29yZFwiLCBuZXh0OiBcIkBrZXlmcmFtZWRlY2xhcmF0aW9uXCIgfVxuICAgICAgXSxcbiAgICAgIFtcIltAXShwYWdlfGNvbnRlbnR8Zm9udC1mYWNlfC1tb3otZG9jdW1lbnQpXCIsIHsgdG9rZW46IFwia2V5d29yZFwiIH1dLFxuICAgICAgW1wiW0BdKGNoYXJzZXR8bmFtZXNwYWNlKVwiLCB7IHRva2VuOiBcImtleXdvcmRcIiwgbmV4dDogXCJAZGVjbGFyYXRpb25ib2R5XCIgfV0sXG4gICAgICBbXCJbQF0oZnVuY3Rpb24pXCIsIHsgdG9rZW46IFwia2V5d29yZFwiLCBuZXh0OiBcIkBmdW5jdGlvbmRlY2xhcmF0aW9uXCIgfV0sXG4gICAgICBbXCJbQF0obWl4aW4pXCIsIHsgdG9rZW46IFwia2V5d29yZFwiLCBuZXh0OiBcIkBtaXhpbmRlY2xhcmF0aW9uXCIgfV0sXG4gICAgICBbXCJ1cmwoXFxcXC1wcmVmaXgpP1xcXFwoXCIsIHsgdG9rZW46IFwibWV0YVwiLCBuZXh0OiBcIkB1cmxkZWNsYXJhdGlvblwiIH1dLFxuICAgICAgeyBpbmNsdWRlOiBcIkBjb250cm9sc3RhdGVtZW50XCIgfSxcbiAgICAgIHsgaW5jbHVkZTogXCJAc2VsZWN0b3JuYW1lXCIgfSxcbiAgICAgIFtcIlsmXFxcXCpdXCIsIFwidGFnXCJdLFxuICAgICAgW1wiWz5cXFxcKyxdXCIsIFwiZGVsaW1pdGVyXCJdLFxuICAgICAgW1wiXFxcXFtcIiwgeyB0b2tlbjogXCJkZWxpbWl0ZXIuYnJhY2tldFwiLCBuZXh0OiBcIkBzZWxlY3RvcmF0dHJpYnV0ZVwiIH1dLFxuICAgICAgW1wie1wiLCB7IHRva2VuOiBcImRlbGltaXRlci5jdXJseVwiLCBuZXh0OiBcIkBzZWxlY3RvcmJvZHlcIiB9XVxuICAgIF0sXG4gICAgc2VsZWN0b3Jib2R5OiBbXG4gICAgICBbXCJbKl9dP0BpZGVudGlmaWVyQHdzOig/PShcXFxcc3xcXFxcZHxbXns7fV0qWzt9XSkpXCIsIFwiYXR0cmlidXRlLm5hbWVcIiwgXCJAcnVsZXZhbHVlXCJdLFxuICAgICAgeyBpbmNsdWRlOiBcIkBzZWxlY3RvclwiIH0sXG4gICAgICBbXCJbQF0oZXh0ZW5kKVwiLCB7IHRva2VuOiBcImtleXdvcmRcIiwgbmV4dDogXCJAZXh0ZW5kYm9keVwiIH1dLFxuICAgICAgW1wiW0BdKHJldHVybilcIiwgeyB0b2tlbjogXCJrZXl3b3JkXCIsIG5leHQ6IFwiQGRlY2xhcmF0aW9uYm9keVwiIH1dLFxuICAgICAgW1wifVwiLCB7IHRva2VuOiBcImRlbGltaXRlci5jdXJseVwiLCBuZXh0OiBcIkBwb3BcIiB9XVxuICAgIF0sXG4gICAgc2VsZWN0b3JuYW1lOiBbXG4gICAgICBbXCIje1wiLCB7IHRva2VuOiBcIm1ldGFcIiwgbmV4dDogXCJAdmFyaWFibGVpbnRlcnBvbGF0aW9uXCIgfV0sXG4gICAgICBbXCIoXFxcXC58Iyg/PVtee10pfCV8KEBpZGVudGlmaWVyKXw6KStcIiwgXCJ0YWdcIl1cbiAgICBdLFxuICAgIHNlbGVjdG9yYXR0cmlidXRlOiBbeyBpbmNsdWRlOiBcIkB0ZXJtXCIgfSwgW1wiXVwiLCB7IHRva2VuOiBcImRlbGltaXRlci5icmFja2V0XCIsIG5leHQ6IFwiQHBvcFwiIH1dXSxcbiAgICB0ZXJtOiBbXG4gICAgICB7IGluY2x1ZGU6IFwiQGNvbW1lbnRzXCIgfSxcbiAgICAgIFtcInVybChcXFxcLXByZWZpeCk/XFxcXChcIiwgeyB0b2tlbjogXCJtZXRhXCIsIG5leHQ6IFwiQHVybGRlY2xhcmF0aW9uXCIgfV0sXG4gICAgICB7IGluY2x1ZGU6IFwiQGZ1bmN0aW9uaW52b2NhdGlvblwiIH0sXG4gICAgICB7IGluY2x1ZGU6IFwiQG51bWJlcnNcIiB9LFxuICAgICAgeyBpbmNsdWRlOiBcIkBzdHJpbmdzXCIgfSxcbiAgICAgIHsgaW5jbHVkZTogXCJAdmFyaWFibGVyZWZlcmVuY2VcIiB9LFxuICAgICAgW1wiKGFuZFxcXFxifG9yXFxcXGJ8bm90XFxcXGIpXCIsIFwib3BlcmF0b3JcIl0sXG4gICAgICB7IGluY2x1ZGU6IFwiQG5hbWVcIiB9LFxuICAgICAgW1wiKFs8Pj1cXFxcK1xcXFwtXFxcXCpcXFxcL1xcXFxeXFxcXHxcXFxcfixdKVwiLCBcIm9wZXJhdG9yXCJdLFxuICAgICAgW1wiLFwiLCBcImRlbGltaXRlclwiXSxcbiAgICAgIFtcIiFkZWZhdWx0XCIsIFwibGl0ZXJhbFwiXSxcbiAgICAgIFtcIlxcXFwoXCIsIHsgdG9rZW46IFwiZGVsaW1pdGVyLnBhcmVudGhlc2lzXCIsIG5leHQ6IFwiQHBhcmVudGhpemVkdGVybVwiIH1dXG4gICAgXSxcbiAgICBydWxldmFsdWU6IFtcbiAgICAgIHsgaW5jbHVkZTogXCJAdGVybVwiIH0sXG4gICAgICBbXCIhaW1wb3J0YW50XCIsIFwibGl0ZXJhbFwiXSxcbiAgICAgIFtcIjtcIiwgXCJkZWxpbWl0ZXJcIiwgXCJAcG9wXCJdLFxuICAgICAgW1wie1wiLCB7IHRva2VuOiBcImRlbGltaXRlci5jdXJseVwiLCBzd2l0Y2hUbzogXCJAbmVzdGVkcHJvcGVydHlcIiB9XSxcbiAgICAgIFtcIig/PX0pXCIsIHsgdG9rZW46IFwiXCIsIG5leHQ6IFwiQHBvcFwiIH1dXG4gICAgXSxcbiAgICBuZXN0ZWRwcm9wZXJ0eTogW1xuICAgICAgW1wiWypfXT9AaWRlbnRpZmllckB3czpcIiwgXCJhdHRyaWJ1dGUubmFtZVwiLCBcIkBydWxldmFsdWVcIl0sXG4gICAgICB7IGluY2x1ZGU6IFwiQGNvbW1lbnRzXCIgfSxcbiAgICAgIFtcIn1cIiwgeyB0b2tlbjogXCJkZWxpbWl0ZXIuY3VybHlcIiwgbmV4dDogXCJAcG9wXCIgfV1cbiAgICBdLFxuICAgIHdhcm5kZWJ1ZzogW1tcIltAXSh3YXJufGRlYnVnKVwiLCB7IHRva2VuOiBcImtleXdvcmRcIiwgbmV4dDogXCJAZGVjbGFyYXRpb25ib2R5XCIgfV1dLFxuICAgIGltcG9ydDogW1tcIltAXShpbXBvcnQpXCIsIHsgdG9rZW46IFwia2V5d29yZFwiLCBuZXh0OiBcIkBkZWNsYXJhdGlvbmJvZHlcIiB9XV0sXG4gICAgdmFyaWFibGVkZWNsYXJhdGlvbjogW1xuICAgICAgW1wiXFxcXCRAaWRlbnRpZmllckB3czpcIiwgXCJ2YXJpYWJsZS5kZWNsXCIsIFwiQGRlY2xhcmF0aW9uYm9keVwiXVxuICAgIF0sXG4gICAgdXJsZGVjbGFyYXRpb246IFtcbiAgICAgIHsgaW5jbHVkZTogXCJAc3RyaW5nc1wiIH0sXG4gICAgICBbXCJbXilcXHJcXG5dK1wiLCBcInN0cmluZ1wiXSxcbiAgICAgIFtcIlxcXFwpXCIsIHsgdG9rZW46IFwibWV0YVwiLCBuZXh0OiBcIkBwb3BcIiB9XVxuICAgIF0sXG4gICAgcGFyZW50aGl6ZWR0ZXJtOiBbXG4gICAgICB7IGluY2x1ZGU6IFwiQHRlcm1cIiB9LFxuICAgICAgW1wiXFxcXClcIiwgeyB0b2tlbjogXCJkZWxpbWl0ZXIucGFyZW50aGVzaXNcIiwgbmV4dDogXCJAcG9wXCIgfV1cbiAgICBdLFxuICAgIGRlY2xhcmF0aW9uYm9keTogW1xuICAgICAgeyBpbmNsdWRlOiBcIkB0ZXJtXCIgfSxcbiAgICAgIFtcIjtcIiwgXCJkZWxpbWl0ZXJcIiwgXCJAcG9wXCJdLFxuICAgICAgW1wiKD89fSlcIiwgeyB0b2tlbjogXCJcIiwgbmV4dDogXCJAcG9wXCIgfV1cbiAgICBdLFxuICAgIGV4dGVuZGJvZHk6IFtcbiAgICAgIHsgaW5jbHVkZTogXCJAc2VsZWN0b3JuYW1lXCIgfSxcbiAgICAgIFtcIiFvcHRpb25hbFwiLCBcImxpdGVyYWxcIl0sXG4gICAgICBbXCI7XCIsIFwiZGVsaW1pdGVyXCIsIFwiQHBvcFwiXSxcbiAgICAgIFtcIig/PX0pXCIsIHsgdG9rZW46IFwiXCIsIG5leHQ6IFwiQHBvcFwiIH1dXG4gICAgXSxcbiAgICB2YXJpYWJsZXJlZmVyZW5jZTogW1xuICAgICAgW1wiXFxcXCRAaWRlbnRpZmllclwiLCBcInZhcmlhYmxlLnJlZlwiXSxcbiAgICAgIFtcIlxcXFwuXFxcXC5cXFxcLlwiLCBcIm9wZXJhdG9yXCJdLFxuICAgICAgW1wiI3tcIiwgeyB0b2tlbjogXCJtZXRhXCIsIG5leHQ6IFwiQHZhcmlhYmxlaW50ZXJwb2xhdGlvblwiIH1dXG4gICAgXSxcbiAgICB2YXJpYWJsZWludGVycG9sYXRpb246IFtcbiAgICAgIHsgaW5jbHVkZTogXCJAdmFyaWFibGVyZWZlcmVuY2VcIiB9LFxuICAgICAgW1wifVwiLCB7IHRva2VuOiBcIm1ldGFcIiwgbmV4dDogXCJAcG9wXCIgfV1cbiAgICBdLFxuICAgIGNvbW1lbnRzOiBbXG4gICAgICBbXCJcXFxcL1xcXFwqXCIsIFwiY29tbWVudFwiLCBcIkBjb21tZW50XCJdLFxuICAgICAgW1wiXFxcXC9cXFxcLysuKlwiLCBcImNvbW1lbnRcIl1cbiAgICBdLFxuICAgIGNvbW1lbnQ6IFtcbiAgICAgIFtcIlxcXFwqXFxcXC9cIiwgXCJjb21tZW50XCIsIFwiQHBvcFwiXSxcbiAgICAgIFtcIi5cIiwgXCJjb21tZW50XCJdXG4gICAgXSxcbiAgICBuYW1lOiBbW1wiQGlkZW50aWZpZXJcIiwgXCJhdHRyaWJ1dGUudmFsdWVcIl1dLFxuICAgIG51bWJlcnM6IFtcbiAgICAgIFtcIihcXFxcZCpcXFxcLik/XFxcXGQrKFtlRV1bXFxcXC0rXT9cXFxcZCspP1wiLCB7IHRva2VuOiBcIm51bWJlclwiLCBuZXh0OiBcIkB1bml0c1wiIH1dLFxuICAgICAgW1wiI1swLTlhLWZBLUZfXSsoPyFcXFxcdylcIiwgXCJudW1iZXIuaGV4XCJdXG4gICAgXSxcbiAgICB1bml0czogW1xuICAgICAgW1xuICAgICAgICBcIihlbXxleHxjaHxyZW18ZnJ8dm1pbnx2bWF4fHZ3fHZofHZtfGNtfG1tfGlufHB4fHB0fHBjfGRlZ3xncmFkfHJhZHx0dXJufHN8bXN8SHp8a0h6fCUpP1wiLFxuICAgICAgICBcIm51bWJlclwiLFxuICAgICAgICBcIkBwb3BcIlxuICAgICAgXVxuICAgIF0sXG4gICAgZnVuY3Rpb25kZWNsYXJhdGlvbjogW1xuICAgICAgW1wiQGlkZW50aWZpZXJAd3NcXFxcKFwiLCB7IHRva2VuOiBcIm1ldGFcIiwgbmV4dDogXCJAcGFyYW1ldGVyZGVjbGFyYXRpb25cIiB9XSxcbiAgICAgIFtcIntcIiwgeyB0b2tlbjogXCJkZWxpbWl0ZXIuY3VybHlcIiwgc3dpdGNoVG86IFwiQGZ1bmN0aW9uYm9keVwiIH1dXG4gICAgXSxcbiAgICBtaXhpbmRlY2xhcmF0aW9uOiBbXG4gICAgICBbXCJAaWRlbnRpZmllckB3c1xcXFwoXCIsIHsgdG9rZW46IFwibWV0YVwiLCBuZXh0OiBcIkBwYXJhbWV0ZXJkZWNsYXJhdGlvblwiIH1dLFxuICAgICAgW1wiQGlkZW50aWZpZXJcIiwgXCJtZXRhXCJdLFxuICAgICAgW1wie1wiLCB7IHRva2VuOiBcImRlbGltaXRlci5jdXJseVwiLCBzd2l0Y2hUbzogXCJAc2VsZWN0b3Jib2R5XCIgfV1cbiAgICBdLFxuICAgIHBhcmFtZXRlcmRlY2xhcmF0aW9uOiBbXG4gICAgICBbXCJcXFxcJEBpZGVudGlmaWVyQHdzOlwiLCBcInZhcmlhYmxlLmRlY2xcIl0sXG4gICAgICBbXCJcXFxcLlxcXFwuXFxcXC5cIiwgXCJvcGVyYXRvclwiXSxcbiAgICAgIFtcIixcIiwgXCJkZWxpbWl0ZXJcIl0sXG4gICAgICB7IGluY2x1ZGU6IFwiQHRlcm1cIiB9LFxuICAgICAgW1wiXFxcXClcIiwgeyB0b2tlbjogXCJtZXRhXCIsIG5leHQ6IFwiQHBvcFwiIH1dXG4gICAgXSxcbiAgICBpbmNsdWRlZGVjbGFyYXRpb246IFtcbiAgICAgIHsgaW5jbHVkZTogXCJAZnVuY3Rpb25pbnZvY2F0aW9uXCIgfSxcbiAgICAgIFtcIkBpZGVudGlmaWVyXCIsIFwibWV0YVwiXSxcbiAgICAgIFtcIjtcIiwgXCJkZWxpbWl0ZXJcIiwgXCJAcG9wXCJdLFxuICAgICAgW1wiKD89fSlcIiwgeyB0b2tlbjogXCJcIiwgbmV4dDogXCJAcG9wXCIgfV0sXG4gICAgICBbXCJ7XCIsIHsgdG9rZW46IFwiZGVsaW1pdGVyLmN1cmx5XCIsIHN3aXRjaFRvOiBcIkBzZWxlY3RvcmJvZHlcIiB9XVxuICAgIF0sXG4gICAga2V5ZnJhbWVkZWNsYXJhdGlvbjogW1xuICAgICAgW1wiQGlkZW50aWZpZXJcIiwgXCJtZXRhXCJdLFxuICAgICAgW1wie1wiLCB7IHRva2VuOiBcImRlbGltaXRlci5jdXJseVwiLCBzd2l0Y2hUbzogXCJAa2V5ZnJhbWVib2R5XCIgfV1cbiAgICBdLFxuICAgIGtleWZyYW1lYm9keTogW1xuICAgICAgeyBpbmNsdWRlOiBcIkB0ZXJtXCIgfSxcbiAgICAgIFtcIntcIiwgeyB0b2tlbjogXCJkZWxpbWl0ZXIuY3VybHlcIiwgbmV4dDogXCJAc2VsZWN0b3Jib2R5XCIgfV0sXG4gICAgICBbXCJ9XCIsIHsgdG9rZW46IFwiZGVsaW1pdGVyLmN1cmx5XCIsIG5leHQ6IFwiQHBvcFwiIH1dXG4gICAgXSxcbiAgICBjb250cm9sc3RhdGVtZW50OiBbXG4gICAgICBbXG4gICAgICAgIFwiW0BdKGlmfGVsc2V8Zm9yfHdoaWxlfGVhY2h8bWVkaWEpXCIsXG4gICAgICAgIHsgdG9rZW46IFwia2V5d29yZC5mbG93XCIsIG5leHQ6IFwiQGNvbnRyb2xzdGF0ZW1lbnRkZWNsYXJhdGlvblwiIH1cbiAgICAgIF1cbiAgICBdLFxuICAgIGNvbnRyb2xzdGF0ZW1lbnRkZWNsYXJhdGlvbjogW1xuICAgICAgW1wiKGlufGZyb218dGhyb3VnaHxpZnx0bylcXFxcYlwiLCB7IHRva2VuOiBcImtleXdvcmQuZmxvd1wiIH1dLFxuICAgICAgeyBpbmNsdWRlOiBcIkB0ZXJtXCIgfSxcbiAgICAgIFtcIntcIiwgeyB0b2tlbjogXCJkZWxpbWl0ZXIuY3VybHlcIiwgc3dpdGNoVG86IFwiQHNlbGVjdG9yYm9keVwiIH1dXG4gICAgXSxcbiAgICBmdW5jdGlvbmJvZHk6IFtcbiAgICAgIFtcIltAXShyZXR1cm4pXCIsIHsgdG9rZW46IFwia2V5d29yZFwiIH1dLFxuICAgICAgeyBpbmNsdWRlOiBcIkB2YXJpYWJsZWRlY2xhcmF0aW9uXCIgfSxcbiAgICAgIHsgaW5jbHVkZTogXCJAdGVybVwiIH0sXG4gICAgICB7IGluY2x1ZGU6IFwiQGNvbnRyb2xzdGF0ZW1lbnRcIiB9LFxuICAgICAgW1wiO1wiLCBcImRlbGltaXRlclwiXSxcbiAgICAgIFtcIn1cIiwgeyB0b2tlbjogXCJkZWxpbWl0ZXIuY3VybHlcIiwgbmV4dDogXCJAcG9wXCIgfV1cbiAgICBdLFxuICAgIGZ1bmN0aW9uaW52b2NhdGlvbjogW1tcIkBpZGVudGlmaWVyXFxcXChcIiwgeyB0b2tlbjogXCJtZXRhXCIsIG5leHQ6IFwiQGZ1bmN0aW9uYXJndW1lbnRzXCIgfV1dLFxuICAgIGZ1bmN0aW9uYXJndW1lbnRzOiBbXG4gICAgICBbXCJcXFxcJEBpZGVudGlmaWVyQHdzOlwiLCBcImF0dHJpYnV0ZS5uYW1lXCJdLFxuICAgICAgW1wiWyxdXCIsIFwiZGVsaW1pdGVyXCJdLFxuICAgICAgeyBpbmNsdWRlOiBcIkB0ZXJtXCIgfSxcbiAgICAgIFtcIlxcXFwpXCIsIHsgdG9rZW46IFwibWV0YVwiLCBuZXh0OiBcIkBwb3BcIiB9XVxuICAgIF0sXG4gICAgc3RyaW5nczogW1xuICAgICAgWyd+P1wiJywgeyB0b2tlbjogXCJzdHJpbmcuZGVsaW1pdGVyXCIsIG5leHQ6IFwiQHN0cmluZ2VuZGRvdWJsZXF1b3RlXCIgfV0sXG4gICAgICBbXCJ+PydcIiwgeyB0b2tlbjogXCJzdHJpbmcuZGVsaW1pdGVyXCIsIG5leHQ6IFwiQHN0cmluZ2VuZHF1b3RlXCIgfV1cbiAgICBdLFxuICAgIHN0cmluZ2VuZGRvdWJsZXF1b3RlOiBbXG4gICAgICBbXCJcXFxcXFxcXC5cIiwgXCJzdHJpbmdcIl0sXG4gICAgICBbJ1wiJywgeyB0b2tlbjogXCJzdHJpbmcuZGVsaW1pdGVyXCIsIG5leHQ6IFwiQHBvcFwiIH1dLFxuICAgICAgW1wiLlwiLCBcInN0cmluZ1wiXVxuICAgIF0sXG4gICAgc3RyaW5nZW5kcXVvdGU6IFtcbiAgICAgIFtcIlxcXFxcXFxcLlwiLCBcInN0cmluZ1wiXSxcbiAgICAgIFtcIidcIiwgeyB0b2tlbjogXCJzdHJpbmcuZGVsaW1pdGVyXCIsIG5leHQ6IFwiQHBvcFwiIH1dLFxuICAgICAgW1wiLlwiLCBcInN0cmluZ1wiXVxuICAgIF1cbiAgfVxufTtcbmV4cG9ydCB7XG4gIGNvbmYsXG4gIGxhbmd1YWdlXG59O1xuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQVFHLElBQUMsT0FBTztBQUFBLEVBQ1QsYUFBYTtBQUFBLEVBQ2IsVUFBVTtBQUFBLElBQ1IsY0FBYyxDQUFDLE1BQU0sSUFBSTtBQUFBLElBQ3pCLGFBQWE7QUFBQSxFQUNqQjtBQUFBLEVBQ0UsVUFBVTtBQUFBLElBQ1IsQ0FBQyxLQUFLLEdBQUc7QUFBQSxJQUNULENBQUMsS0FBSyxHQUFHO0FBQUEsSUFDVCxDQUFDLEtBQUssR0FBRztBQUFBLEVBQ2I7QUFBQSxFQUNFLGtCQUFrQjtBQUFBLElBQ2hCLEVBQUUsTUFBTSxLQUFLLE9BQU8sS0FBSyxPQUFPLENBQUMsVUFBVSxTQUFTLEVBQUM7QUFBQSxJQUNyRCxFQUFFLE1BQU0sS0FBSyxPQUFPLEtBQUssT0FBTyxDQUFDLFVBQVUsU0FBUyxFQUFDO0FBQUEsSUFDckQsRUFBRSxNQUFNLEtBQUssT0FBTyxLQUFLLE9BQU8sQ0FBQyxVQUFVLFNBQVMsRUFBQztBQUFBLElBQ3JELEVBQUUsTUFBTSxLQUFLLE9BQU8sS0FBSyxPQUFPLENBQUMsVUFBVSxTQUFTLEVBQUM7QUFBQSxJQUNyRCxFQUFFLE1BQU0sS0FBSyxPQUFPLEtBQUssT0FBTyxDQUFDLFVBQVUsU0FBUyxFQUFDO0FBQUEsRUFDekQ7QUFBQSxFQUNFLGtCQUFrQjtBQUFBLElBQ2hCLEVBQUUsTUFBTSxLQUFLLE9BQU8sSUFBRztBQUFBLElBQ3ZCLEVBQUUsTUFBTSxLQUFLLE9BQU8sSUFBRztBQUFBLElBQ3ZCLEVBQUUsTUFBTSxLQUFLLE9BQU8sSUFBRztBQUFBLElBQ3ZCLEVBQUUsTUFBTSxLQUFLLE9BQU8sSUFBRztBQUFBLElBQ3ZCLEVBQUUsTUFBTSxLQUFLLE9BQU8sSUFBRztBQUFBLEVBQzNCO0FBQUEsRUFDRSxTQUFTO0FBQUEsSUFDUCxTQUFTO0FBQUEsTUFDUCxPQUFPLElBQUksT0FBTyw4Q0FBOEM7QUFBQSxNQUNoRSxLQUFLLElBQUksT0FBTyxzQ0FBc0M7QUFBQSxJQUM1RDtBQUFBLEVBQ0E7QUFDQTtBQUNHLElBQUMsV0FBVztBQUFBLEVBQ2IsY0FBYztBQUFBLEVBQ2QsY0FBYztBQUFBLEVBQ2QsSUFBSTtBQUFBLEVBQ0osWUFBWTtBQUFBLEVBQ1osVUFBVTtBQUFBLElBQ1IsRUFBRSxNQUFNLEtBQUssT0FBTyxLQUFLLE9BQU8sa0JBQWlCO0FBQUEsSUFDakQsRUFBRSxNQUFNLEtBQUssT0FBTyxLQUFLLE9BQU8sb0JBQW1CO0FBQUEsSUFDbkQsRUFBRSxNQUFNLEtBQUssT0FBTyxLQUFLLE9BQU8sd0JBQXVCO0FBQUEsSUFDdkQsRUFBRSxNQUFNLEtBQUssT0FBTyxLQUFLLE9BQU8sa0JBQWlCO0FBQUEsRUFDckQ7QUFBQSxFQUNFLFdBQVc7QUFBQSxJQUNULE1BQU0sQ0FBQyxFQUFFLFNBQVMsYUFBYTtBQUFBLElBQy9CLFVBQVU7QUFBQSxNQUNSLEVBQUUsU0FBUyxZQUFXO0FBQUEsTUFDdEIsRUFBRSxTQUFTLFVBQVM7QUFBQSxNQUNwQixFQUFFLFNBQVMsdUJBQXNCO0FBQUEsTUFDakMsRUFBRSxTQUFTLGFBQVk7QUFBQSxNQUN2QixDQUFDLGdCQUFnQixFQUFFLE9BQU8sV0FBVyxNQUFNLHNCQUFxQixDQUFFO0FBQUEsTUFDbEU7QUFBQSxRQUNFO0FBQUEsUUFDQSxFQUFFLE9BQU8sV0FBVyxNQUFNLHVCQUFzQjtBQUFBLE1BQ3hEO0FBQUEsTUFDTSxDQUFDLDZDQUE2QyxFQUFFLE9BQU8sV0FBVztBQUFBLE1BQ2xFLENBQUMsMEJBQTBCLEVBQUUsT0FBTyxXQUFXLE1BQU0sbUJBQWtCLENBQUU7QUFBQSxNQUN6RSxDQUFDLGlCQUFpQixFQUFFLE9BQU8sV0FBVyxNQUFNLHVCQUFzQixDQUFFO0FBQUEsTUFDcEUsQ0FBQyxjQUFjLEVBQUUsT0FBTyxXQUFXLE1BQU0sb0JBQW1CLENBQUU7QUFBQSxNQUM5RCxDQUFDLHNCQUFzQixFQUFFLE9BQU8sUUFBUSxNQUFNLGtCQUFpQixDQUFFO0FBQUEsTUFDakUsRUFBRSxTQUFTLG9CQUFtQjtBQUFBLE1BQzlCLEVBQUUsU0FBUyxnQkFBZTtBQUFBLE1BQzFCLENBQUMsVUFBVSxLQUFLO0FBQUEsTUFDaEIsQ0FBQyxXQUFXLFdBQVc7QUFBQSxNQUN2QixDQUFDLE9BQU8sRUFBRSxPQUFPLHFCQUFxQixNQUFNLHFCQUFvQixDQUFFO0FBQUEsTUFDbEUsQ0FBQyxLQUFLLEVBQUUsT0FBTyxtQkFBbUIsTUFBTSxnQkFBZSxDQUFFO0FBQUEsSUFDL0Q7QUFBQSxJQUNJLGNBQWM7QUFBQSxNQUNaLENBQUMsaURBQWlELGtCQUFrQixZQUFZO0FBQUEsTUFDaEYsRUFBRSxTQUFTLFlBQVc7QUFBQSxNQUN0QixDQUFDLGVBQWUsRUFBRSxPQUFPLFdBQVcsTUFBTSxjQUFhLENBQUU7QUFBQSxNQUN6RCxDQUFDLGVBQWUsRUFBRSxPQUFPLFdBQVcsTUFBTSxtQkFBa0IsQ0FBRTtBQUFBLE1BQzlELENBQUMsS0FBSyxFQUFFLE9BQU8sbUJBQW1CLE1BQU0sT0FBTSxDQUFFO0FBQUEsSUFDdEQ7QUFBQSxJQUNJLGNBQWM7QUFBQSxNQUNaLENBQUMsTUFBTSxFQUFFLE9BQU8sUUFBUSxNQUFNLHlCQUF3QixDQUFFO0FBQUEsTUFDeEQsQ0FBQyxzQ0FBc0MsS0FBSztBQUFBLElBQ2xEO0FBQUEsSUFDSSxtQkFBbUIsQ0FBQyxFQUFFLFNBQVMsUUFBTyxHQUFJLENBQUMsS0FBSyxFQUFFLE9BQU8scUJBQXFCLE1BQU0sT0FBTSxDQUFFLENBQUM7QUFBQSxJQUM3RixNQUFNO0FBQUEsTUFDSixFQUFFLFNBQVMsWUFBVztBQUFBLE1BQ3RCLENBQUMsc0JBQXNCLEVBQUUsT0FBTyxRQUFRLE1BQU0sa0JBQWlCLENBQUU7QUFBQSxNQUNqRSxFQUFFLFNBQVMsc0JBQXFCO0FBQUEsTUFDaEMsRUFBRSxTQUFTLFdBQVU7QUFBQSxNQUNyQixFQUFFLFNBQVMsV0FBVTtBQUFBLE1BQ3JCLEVBQUUsU0FBUyxxQkFBb0I7QUFBQSxNQUMvQixDQUFDLHlCQUF5QixVQUFVO0FBQUEsTUFDcEMsRUFBRSxTQUFTLFFBQU87QUFBQSxNQUNsQixDQUFDLGlDQUFpQyxVQUFVO0FBQUEsTUFDNUMsQ0FBQyxLQUFLLFdBQVc7QUFBQSxNQUNqQixDQUFDLFlBQVksU0FBUztBQUFBLE1BQ3RCLENBQUMsT0FBTyxFQUFFLE9BQU8seUJBQXlCLE1BQU0sbUJBQWtCLENBQUU7QUFBQSxJQUMxRTtBQUFBLElBQ0ksV0FBVztBQUFBLE1BQ1QsRUFBRSxTQUFTLFFBQU87QUFBQSxNQUNsQixDQUFDLGNBQWMsU0FBUztBQUFBLE1BQ3hCLENBQUMsS0FBSyxhQUFhLE1BQU07QUFBQSxNQUN6QixDQUFDLEtBQUssRUFBRSxPQUFPLG1CQUFtQixVQUFVLGtCQUFpQixDQUFFO0FBQUEsTUFDL0QsQ0FBQyxTQUFTLEVBQUUsT0FBTyxJQUFJLE1BQU0sT0FBTSxDQUFFO0FBQUEsSUFDM0M7QUFBQSxJQUNJLGdCQUFnQjtBQUFBLE1BQ2QsQ0FBQyx3QkFBd0Isa0JBQWtCLFlBQVk7QUFBQSxNQUN2RCxFQUFFLFNBQVMsWUFBVztBQUFBLE1BQ3RCLENBQUMsS0FBSyxFQUFFLE9BQU8sbUJBQW1CLE1BQU0sT0FBTSxDQUFFO0FBQUEsSUFDdEQ7QUFBQSxJQUNJLFdBQVcsQ0FBQyxDQUFDLG1CQUFtQixFQUFFLE9BQU8sV0FBVyxNQUFNLG1CQUFrQixDQUFFLENBQUM7QUFBQSxJQUMvRSxRQUFRLENBQUMsQ0FBQyxlQUFlLEVBQUUsT0FBTyxXQUFXLE1BQU0sbUJBQWtCLENBQUUsQ0FBQztBQUFBLElBQ3hFLHFCQUFxQjtBQUFBLE1BQ25CLENBQUMsc0JBQXNCLGlCQUFpQixrQkFBa0I7QUFBQSxJQUNoRTtBQUFBLElBQ0ksZ0JBQWdCO0FBQUEsTUFDZCxFQUFFLFNBQVMsV0FBVTtBQUFBLE1BQ3JCLENBQUMsYUFBYSxRQUFRO0FBQUEsTUFDdEIsQ0FBQyxPQUFPLEVBQUUsT0FBTyxRQUFRLE1BQU0sT0FBTSxDQUFFO0FBQUEsSUFDN0M7QUFBQSxJQUNJLGlCQUFpQjtBQUFBLE1BQ2YsRUFBRSxTQUFTLFFBQU87QUFBQSxNQUNsQixDQUFDLE9BQU8sRUFBRSxPQUFPLHlCQUF5QixNQUFNLE9BQU0sQ0FBRTtBQUFBLElBQzlEO0FBQUEsSUFDSSxpQkFBaUI7QUFBQSxNQUNmLEVBQUUsU0FBUyxRQUFPO0FBQUEsTUFDbEIsQ0FBQyxLQUFLLGFBQWEsTUFBTTtBQUFBLE1BQ3pCLENBQUMsU0FBUyxFQUFFLE9BQU8sSUFBSSxNQUFNLE9BQU0sQ0FBRTtBQUFBLElBQzNDO0FBQUEsSUFDSSxZQUFZO0FBQUEsTUFDVixFQUFFLFNBQVMsZ0JBQWU7QUFBQSxNQUMxQixDQUFDLGFBQWEsU0FBUztBQUFBLE1BQ3ZCLENBQUMsS0FBSyxhQUFhLE1BQU07QUFBQSxNQUN6QixDQUFDLFNBQVMsRUFBRSxPQUFPLElBQUksTUFBTSxPQUFNLENBQUU7QUFBQSxJQUMzQztBQUFBLElBQ0ksbUJBQW1CO0FBQUEsTUFDakIsQ0FBQyxrQkFBa0IsY0FBYztBQUFBLE1BQ2pDLENBQUMsYUFBYSxVQUFVO0FBQUEsTUFDeEIsQ0FBQyxNQUFNLEVBQUUsT0FBTyxRQUFRLE1BQU0seUJBQXdCLENBQUU7QUFBQSxJQUM5RDtBQUFBLElBQ0ksdUJBQXVCO0FBQUEsTUFDckIsRUFBRSxTQUFTLHFCQUFvQjtBQUFBLE1BQy9CLENBQUMsS0FBSyxFQUFFLE9BQU8sUUFBUSxNQUFNLE9BQU0sQ0FBRTtBQUFBLElBQzNDO0FBQUEsSUFDSSxVQUFVO0FBQUEsTUFDUixDQUFDLFVBQVUsV0FBVyxVQUFVO0FBQUEsTUFDaEMsQ0FBQyxhQUFhLFNBQVM7QUFBQSxJQUM3QjtBQUFBLElBQ0ksU0FBUztBQUFBLE1BQ1AsQ0FBQyxVQUFVLFdBQVcsTUFBTTtBQUFBLE1BQzVCLENBQUMsS0FBSyxTQUFTO0FBQUEsSUFDckI7QUFBQSxJQUNJLE1BQU0sQ0FBQyxDQUFDLGVBQWUsaUJBQWlCLENBQUM7QUFBQSxJQUN6QyxTQUFTO0FBQUEsTUFDUCxDQUFDLG9DQUFvQyxFQUFFLE9BQU8sVUFBVSxNQUFNLFNBQVEsQ0FBRTtBQUFBLE1BQ3hFLENBQUMseUJBQXlCLFlBQVk7QUFBQSxJQUM1QztBQUFBLElBQ0ksT0FBTztBQUFBLE1BQ0w7QUFBQSxRQUNFO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxNQUNSO0FBQUEsSUFDQTtBQUFBLElBQ0kscUJBQXFCO0FBQUEsTUFDbkIsQ0FBQyxxQkFBcUIsRUFBRSxPQUFPLFFBQVEsTUFBTSx3QkFBdUIsQ0FBRTtBQUFBLE1BQ3RFLENBQUMsS0FBSyxFQUFFLE9BQU8sbUJBQW1CLFVBQVUsZ0JBQWUsQ0FBRTtBQUFBLElBQ25FO0FBQUEsSUFDSSxrQkFBa0I7QUFBQSxNQUNoQixDQUFDLHFCQUFxQixFQUFFLE9BQU8sUUFBUSxNQUFNLHdCQUF1QixDQUFFO0FBQUEsTUFDdEUsQ0FBQyxlQUFlLE1BQU07QUFBQSxNQUN0QixDQUFDLEtBQUssRUFBRSxPQUFPLG1CQUFtQixVQUFVLGdCQUFlLENBQUU7QUFBQSxJQUNuRTtBQUFBLElBQ0ksc0JBQXNCO0FBQUEsTUFDcEIsQ0FBQyxzQkFBc0IsZUFBZTtBQUFBLE1BQ3RDLENBQUMsYUFBYSxVQUFVO0FBQUEsTUFDeEIsQ0FBQyxLQUFLLFdBQVc7QUFBQSxNQUNqQixFQUFFLFNBQVMsUUFBTztBQUFBLE1BQ2xCLENBQUMsT0FBTyxFQUFFLE9BQU8sUUFBUSxNQUFNLE9BQU0sQ0FBRTtBQUFBLElBQzdDO0FBQUEsSUFDSSxvQkFBb0I7QUFBQSxNQUNsQixFQUFFLFNBQVMsc0JBQXFCO0FBQUEsTUFDaEMsQ0FBQyxlQUFlLE1BQU07QUFBQSxNQUN0QixDQUFDLEtBQUssYUFBYSxNQUFNO0FBQUEsTUFDekIsQ0FBQyxTQUFTLEVBQUUsT0FBTyxJQUFJLE1BQU0sT0FBTSxDQUFFO0FBQUEsTUFDckMsQ0FBQyxLQUFLLEVBQUUsT0FBTyxtQkFBbUIsVUFBVSxnQkFBZSxDQUFFO0FBQUEsSUFDbkU7QUFBQSxJQUNJLHFCQUFxQjtBQUFBLE1BQ25CLENBQUMsZUFBZSxNQUFNO0FBQUEsTUFDdEIsQ0FBQyxLQUFLLEVBQUUsT0FBTyxtQkFBbUIsVUFBVSxnQkFBZSxDQUFFO0FBQUEsSUFDbkU7QUFBQSxJQUNJLGNBQWM7QUFBQSxNQUNaLEVBQUUsU0FBUyxRQUFPO0FBQUEsTUFDbEIsQ0FBQyxLQUFLLEVBQUUsT0FBTyxtQkFBbUIsTUFBTSxnQkFBZSxDQUFFO0FBQUEsTUFDekQsQ0FBQyxLQUFLLEVBQUUsT0FBTyxtQkFBbUIsTUFBTSxPQUFNLENBQUU7QUFBQSxJQUN0RDtBQUFBLElBQ0ksa0JBQWtCO0FBQUEsTUFDaEI7QUFBQSxRQUNFO0FBQUEsUUFDQSxFQUFFLE9BQU8sZ0JBQWdCLE1BQU0sK0JBQThCO0FBQUEsTUFDckU7QUFBQSxJQUNBO0FBQUEsSUFDSSw2QkFBNkI7QUFBQSxNQUMzQixDQUFDLDhCQUE4QixFQUFFLE9BQU8sZ0JBQWdCO0FBQUEsTUFDeEQsRUFBRSxTQUFTLFFBQU87QUFBQSxNQUNsQixDQUFDLEtBQUssRUFBRSxPQUFPLG1CQUFtQixVQUFVLGdCQUFlLENBQUU7QUFBQSxJQUNuRTtBQUFBLElBQ0ksY0FBYztBQUFBLE1BQ1osQ0FBQyxlQUFlLEVBQUUsT0FBTyxXQUFXO0FBQUEsTUFDcEMsRUFBRSxTQUFTLHVCQUFzQjtBQUFBLE1BQ2pDLEVBQUUsU0FBUyxRQUFPO0FBQUEsTUFDbEIsRUFBRSxTQUFTLG9CQUFtQjtBQUFBLE1BQzlCLENBQUMsS0FBSyxXQUFXO0FBQUEsTUFDakIsQ0FBQyxLQUFLLEVBQUUsT0FBTyxtQkFBbUIsTUFBTSxPQUFNLENBQUU7QUFBQSxJQUN0RDtBQUFBLElBQ0ksb0JBQW9CLENBQUMsQ0FBQyxrQkFBa0IsRUFBRSxPQUFPLFFBQVEsTUFBTSxxQkFBb0IsQ0FBRSxDQUFDO0FBQUEsSUFDdEYsbUJBQW1CO0FBQUEsTUFDakIsQ0FBQyxzQkFBc0IsZ0JBQWdCO0FBQUEsTUFDdkMsQ0FBQyxPQUFPLFdBQVc7QUFBQSxNQUNuQixFQUFFLFNBQVMsUUFBTztBQUFBLE1BQ2xCLENBQUMsT0FBTyxFQUFFLE9BQU8sUUFBUSxNQUFNLE9BQU0sQ0FBRTtBQUFBLElBQzdDO0FBQUEsSUFDSSxTQUFTO0FBQUEsTUFDUCxDQUFDLE9BQU8sRUFBRSxPQUFPLG9CQUFvQixNQUFNLHdCQUF1QixDQUFFO0FBQUEsTUFDcEUsQ0FBQyxPQUFPLEVBQUUsT0FBTyxvQkFBb0IsTUFBTSxrQkFBaUIsQ0FBRTtBQUFBLElBQ3BFO0FBQUEsSUFDSSxzQkFBc0I7QUFBQSxNQUNwQixDQUFDLFNBQVMsUUFBUTtBQUFBLE1BQ2xCLENBQUMsS0FBSyxFQUFFLE9BQU8sb0JBQW9CLE1BQU0sT0FBTSxDQUFFO0FBQUEsTUFDakQsQ0FBQyxLQUFLLFFBQVE7QUFBQSxJQUNwQjtBQUFBLElBQ0ksZ0JBQWdCO0FBQUEsTUFDZCxDQUFDLFNBQVMsUUFBUTtBQUFBLE1BQ2xCLENBQUMsS0FBSyxFQUFFLE9BQU8sb0JBQW9CLE1BQU0sT0FBTSxDQUFFO0FBQUEsTUFDakQsQ0FBQyxLQUFLLFFBQVE7QUFBQSxJQUNwQjtBQUFBLEVBQ0E7QUFDQTsiLCJ4X2dvb2dsZV9pZ25vcmVMaXN0IjpbMF19
