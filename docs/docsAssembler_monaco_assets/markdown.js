var conf = {
  comments: {
    blockComment: ["<!--", "-->"]
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
    { open: "<", close: ">", notIn: ["string"] }
  ],
  surroundingPairs: [
    { open: "(", close: ")" },
    { open: "[", close: "]" },
    { open: "`", close: "`" }
  ],
  folding: {
    markers: {
      start: new RegExp("^\\s*<!--\\s*#?region\\b.*-->"),
      end: new RegExp("^\\s*<!--\\s*#?endregion\\b.*-->")
    }
  }
};
var language = {
  defaultToken: "",
  tokenPostfix: ".md",
  control: /[\\`*_\[\]{}()#+\-\.!]/,
  noncontrol: /[^\\`*_\[\]{}()#+\-\.!]/,
  escapes: /\\(?:@control)/,
  jsescapes: /\\(?:[btnfr\\"']|[0-7][0-7]?|[0-3][0-7]{2})/,
  empty: [
    "area",
    "base",
    "basefont",
    "br",
    "col",
    "frame",
    "hr",
    "img",
    "input",
    "isindex",
    "link",
    "meta",
    "param"
  ],
  tokenizer: {
    root: [
      [/^\s*\|/, "@rematch", "@table_header"],
      [/^(\s{0,3})(#+)((?:[^\\#]|@escapes)+)((?:#+)?)/, ["white", "keyword", "keyword", "keyword"]],
      [/^\s*(=+|\-+)\s*$/, "keyword"],
      [/^\s*((\*[ ]?)+)\s*$/, "meta.separator"],
      [/^\s*>+/, "comment"],
      [/^\s*([\*\-+:]|\d+\.)\s/, "keyword"],
      [/^(\t|[ ]{4})[^ ].*$/, "string"],
      [/^\s*~~~\s*((?:\w|[\/\-#])+)?\s*$/, { token: "string", next: "@codeblock" }],
      [
        /^\s*```\s*((?:\w|[\/\-#])+).*$/,
        { token: "string", next: "@codeblockgh", nextEmbedded: "$1" }
      ],
      [/^\s*```\s*$/, { token: "string", next: "@codeblock" }],
      { include: "@linecontent" }
    ],
    table_header: [
      { include: "@table_common" },
      [/[^\|]+/, "keyword.table.header"]
    ],
    table_body: [{ include: "@table_common" }, { include: "@linecontent" }],
    table_common: [
      [/\s*[\-:]+\s*/, { token: "keyword", switchTo: "table_body" }],
      [/^\s*\|/, "keyword.table.left"],
      [/^\s*[^\|]/, "@rematch", "@pop"],
      [/^\s*$/, "@rematch", "@pop"],
      [
        /\|/,
        {
          cases: {
            "@eos": "keyword.table.right",
            "@default": "keyword.table.middle"
          }
        }
      ]
    ],
    codeblock: [
      [/^\s*~~~\s*$/, { token: "string", next: "@pop" }],
      [/^\s*```\s*$/, { token: "string", next: "@pop" }],
      [/.*$/, "variable.source"]
    ],
    codeblockgh: [
      [/```\s*$/, { token: "string", next: "@pop", nextEmbedded: "@pop" }],
      [/[^`]+/, "variable.source"]
    ],
    linecontent: [
      [/&\w+;/, "string.escape"],
      [/@escapes/, "escape"],
      [/\b__([^\\_]|@escapes|_(?!_))+__\b/, "strong"],
      [/\*\*([^\\*]|@escapes|\*(?!\*))+\*\*/, "strong"],
      [/\b_[^_]+_\b/, "emphasis"],
      [/\*([^\\*]|@escapes)+\*/, "emphasis"],
      [/`([^\\`]|@escapes)+`/, "variable"],
      [/\{+[^}]+\}+/, "string.target"],
      [/(!?\[)((?:[^\]\\]|@escapes)*)(\]\([^\)]+\))/, ["string.link", "", "string.link"]],
      [/(!?\[)((?:[^\]\\]|@escapes)*)(\])/, "string.link"],
      { include: "html" }
    ],
    html: [
      [/<(\w+)\/>/, "tag"],
      [
        /<(\w+)(\-|\w)*/,
        {
          cases: {
            "@empty": { token: "tag", next: "@tag.$1" },
            "@default": { token: "tag", next: "@tag.$1" }
          }
        }
      ],
      [/<\/(\w+)(\-|\w)*\s*>/, { token: "tag" }],
      [/<!--/, "comment", "@comment"]
    ],
    comment: [
      [/[^<\-]+/, "comment.content"],
      [/-->/, "comment", "@pop"],
      [/<!--/, "comment.content.invalid"],
      [/[<\-]/, "comment.content"]
    ],
    tag: [
      [/[ \t\r\n]+/, "white"],
      [
        /(type)(\s*=\s*)(")([^"]+)(")/,
        [
          "attribute.name.html",
          "delimiter.html",
          "string.html",
          { token: "string.html", switchTo: "@tag.$S2.$4" },
          "string.html"
        ]
      ],
      [
        /(type)(\s*=\s*)(')([^']+)(')/,
        [
          "attribute.name.html",
          "delimiter.html",
          "string.html",
          { token: "string.html", switchTo: "@tag.$S2.$4" },
          "string.html"
        ]
      ],
      [/(\w+)(\s*=\s*)("[^"]*"|'[^']*')/, ["attribute.name.html", "delimiter.html", "string.html"]],
      [/\w+/, "attribute.name.html"],
      [/\/>/, "tag", "@pop"],
      [
        />/,
        {
          cases: {
            "$S2==style": {
              token: "tag",
              switchTo: "embeddedStyle",
              nextEmbedded: "text/css"
            },
            "$S2==script": {
              cases: {
                $S3: {
                  token: "tag",
                  switchTo: "embeddedScript",
                  nextEmbedded: "$S3"
                },
                "@default": {
                  token: "tag",
                  switchTo: "embeddedScript",
                  nextEmbedded: "text/javascript"
                }
              }
            },
            "@default": { token: "tag", next: "@pop" }
          }
        }
      ]
    ],
    embeddedStyle: [
      [/[^<]+/, ""],
      [/<\/style\s*>/, { token: "@rematch", next: "@pop", nextEmbedded: "@pop" }],
      [/</, ""]
    ],
    embeddedScript: [
      [/[^<]+/, ""],
      [/<\/script\s*>/, { token: "@rematch", next: "@pop", nextEmbedded: "@pop" }],
      [/</, ""]
    ]
  }
};
export {
  conf,
  language
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFya2Rvd24uanMiLCJzb3VyY2VzIjpbIi4uLy4uL25vZGVfbW9kdWxlcy9tb25hY28tZWRpdG9yL2VzbS92cy9iYXNpYy1sYW5ndWFnZXMvbWFya2Rvd24vbWFya2Rvd24uanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyohLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogVmVyc2lvbjogMC40NS4wKDVlNWFmMDEzZjhkMjk1NTU1YTcyMTBkZjBkNWYyY2VhMGJmNWRkNTYpXG4gKiBSZWxlYXNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2VcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9taWNyb3NvZnQvbW9uYWNvLWVkaXRvci9ibG9iL21haW4vTElDRU5TRS50eHRcbiAqLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG4vLyBzcmMvYmFzaWMtbGFuZ3VhZ2VzL21hcmtkb3duL21hcmtkb3duLnRzXG52YXIgY29uZiA9IHtcbiAgY29tbWVudHM6IHtcbiAgICBibG9ja0NvbW1lbnQ6IFtcIjwhLS1cIiwgXCItLT5cIl1cbiAgfSxcbiAgYnJhY2tldHM6IFtcbiAgICBbXCJ7XCIsIFwifVwiXSxcbiAgICBbXCJbXCIsIFwiXVwiXSxcbiAgICBbXCIoXCIsIFwiKVwiXVxuICBdLFxuICBhdXRvQ2xvc2luZ1BhaXJzOiBbXG4gICAgeyBvcGVuOiBcIntcIiwgY2xvc2U6IFwifVwiIH0sXG4gICAgeyBvcGVuOiBcIltcIiwgY2xvc2U6IFwiXVwiIH0sXG4gICAgeyBvcGVuOiBcIihcIiwgY2xvc2U6IFwiKVwiIH0sXG4gICAgeyBvcGVuOiBcIjxcIiwgY2xvc2U6IFwiPlwiLCBub3RJbjogW1wic3RyaW5nXCJdIH1cbiAgXSxcbiAgc3Vycm91bmRpbmdQYWlyczogW1xuICAgIHsgb3BlbjogXCIoXCIsIGNsb3NlOiBcIilcIiB9LFxuICAgIHsgb3BlbjogXCJbXCIsIGNsb3NlOiBcIl1cIiB9LFxuICAgIHsgb3BlbjogXCJgXCIsIGNsb3NlOiBcImBcIiB9XG4gIF0sXG4gIGZvbGRpbmc6IHtcbiAgICBtYXJrZXJzOiB7XG4gICAgICBzdGFydDogbmV3IFJlZ0V4cChcIl5cXFxccyo8IS0tXFxcXHMqIz9yZWdpb25cXFxcYi4qLS0+XCIpLFxuICAgICAgZW5kOiBuZXcgUmVnRXhwKFwiXlxcXFxzKjwhLS1cXFxccyojP2VuZHJlZ2lvblxcXFxiLiotLT5cIilcbiAgICB9XG4gIH1cbn07XG52YXIgbGFuZ3VhZ2UgPSB7XG4gIGRlZmF1bHRUb2tlbjogXCJcIixcbiAgdG9rZW5Qb3N0Zml4OiBcIi5tZFwiLFxuICBjb250cm9sOiAvW1xcXFxgKl9cXFtcXF17fSgpIytcXC1cXC4hXS8sXG4gIG5vbmNvbnRyb2w6IC9bXlxcXFxgKl9cXFtcXF17fSgpIytcXC1cXC4hXS8sXG4gIGVzY2FwZXM6IC9cXFxcKD86QGNvbnRyb2wpLyxcbiAganNlc2NhcGVzOiAvXFxcXCg/OltidG5mclxcXFxcIiddfFswLTddWzAtN10/fFswLTNdWzAtN117Mn0pLyxcbiAgZW1wdHk6IFtcbiAgICBcImFyZWFcIixcbiAgICBcImJhc2VcIixcbiAgICBcImJhc2Vmb250XCIsXG4gICAgXCJiclwiLFxuICAgIFwiY29sXCIsXG4gICAgXCJmcmFtZVwiLFxuICAgIFwiaHJcIixcbiAgICBcImltZ1wiLFxuICAgIFwiaW5wdXRcIixcbiAgICBcImlzaW5kZXhcIixcbiAgICBcImxpbmtcIixcbiAgICBcIm1ldGFcIixcbiAgICBcInBhcmFtXCJcbiAgXSxcbiAgdG9rZW5pemVyOiB7XG4gICAgcm9vdDogW1xuICAgICAgWy9eXFxzKlxcfC8sIFwiQHJlbWF0Y2hcIiwgXCJAdGFibGVfaGVhZGVyXCJdLFxuICAgICAgWy9eKFxcc3swLDN9KSgjKykoKD86W15cXFxcI118QGVzY2FwZXMpKykoKD86IyspPykvLCBbXCJ3aGl0ZVwiLCBcImtleXdvcmRcIiwgXCJrZXl3b3JkXCIsIFwia2V5d29yZFwiXV0sXG4gICAgICBbL15cXHMqKD0rfFxcLSspXFxzKiQvLCBcImtleXdvcmRcIl0sXG4gICAgICBbL15cXHMqKChcXCpbIF0/KSspXFxzKiQvLCBcIm1ldGEuc2VwYXJhdG9yXCJdLFxuICAgICAgWy9eXFxzKj4rLywgXCJjb21tZW50XCJdLFxuICAgICAgWy9eXFxzKihbXFwqXFwtKzpdfFxcZCtcXC4pXFxzLywgXCJrZXl3b3JkXCJdLFxuICAgICAgWy9eKFxcdHxbIF17NH0pW14gXS4qJC8sIFwic3RyaW5nXCJdLFxuICAgICAgWy9eXFxzKn5+flxccyooKD86XFx3fFtcXC9cXC0jXSkrKT9cXHMqJC8sIHsgdG9rZW46IFwic3RyaW5nXCIsIG5leHQ6IFwiQGNvZGVibG9ja1wiIH1dLFxuICAgICAgW1xuICAgICAgICAvXlxccypgYGBcXHMqKCg/Olxcd3xbXFwvXFwtI10pKykuKiQvLFxuICAgICAgICB7IHRva2VuOiBcInN0cmluZ1wiLCBuZXh0OiBcIkBjb2RlYmxvY2tnaFwiLCBuZXh0RW1iZWRkZWQ6IFwiJDFcIiB9XG4gICAgICBdLFxuICAgICAgWy9eXFxzKmBgYFxccyokLywgeyB0b2tlbjogXCJzdHJpbmdcIiwgbmV4dDogXCJAY29kZWJsb2NrXCIgfV0sXG4gICAgICB7IGluY2x1ZGU6IFwiQGxpbmVjb250ZW50XCIgfVxuICAgIF0sXG4gICAgdGFibGVfaGVhZGVyOiBbXG4gICAgICB7IGluY2x1ZGU6IFwiQHRhYmxlX2NvbW1vblwiIH0sXG4gICAgICBbL1teXFx8XSsvLCBcImtleXdvcmQudGFibGUuaGVhZGVyXCJdXG4gICAgXSxcbiAgICB0YWJsZV9ib2R5OiBbeyBpbmNsdWRlOiBcIkB0YWJsZV9jb21tb25cIiB9LCB7IGluY2x1ZGU6IFwiQGxpbmVjb250ZW50XCIgfV0sXG4gICAgdGFibGVfY29tbW9uOiBbXG4gICAgICBbL1xccypbXFwtOl0rXFxzKi8sIHsgdG9rZW46IFwia2V5d29yZFwiLCBzd2l0Y2hUbzogXCJ0YWJsZV9ib2R5XCIgfV0sXG4gICAgICBbL15cXHMqXFx8LywgXCJrZXl3b3JkLnRhYmxlLmxlZnRcIl0sXG4gICAgICBbL15cXHMqW15cXHxdLywgXCJAcmVtYXRjaFwiLCBcIkBwb3BcIl0sXG4gICAgICBbL15cXHMqJC8sIFwiQHJlbWF0Y2hcIiwgXCJAcG9wXCJdLFxuICAgICAgW1xuICAgICAgICAvXFx8LyxcbiAgICAgICAge1xuICAgICAgICAgIGNhc2VzOiB7XG4gICAgICAgICAgICBcIkBlb3NcIjogXCJrZXl3b3JkLnRhYmxlLnJpZ2h0XCIsXG4gICAgICAgICAgICBcIkBkZWZhdWx0XCI6IFwia2V5d29yZC50YWJsZS5taWRkbGVcIlxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgXVxuICAgIF0sXG4gICAgY29kZWJsb2NrOiBbXG4gICAgICBbL15cXHMqfn5+XFxzKiQvLCB7IHRva2VuOiBcInN0cmluZ1wiLCBuZXh0OiBcIkBwb3BcIiB9XSxcbiAgICAgIFsvXlxccypgYGBcXHMqJC8sIHsgdG9rZW46IFwic3RyaW5nXCIsIG5leHQ6IFwiQHBvcFwiIH1dLFxuICAgICAgWy8uKiQvLCBcInZhcmlhYmxlLnNvdXJjZVwiXVxuICAgIF0sXG4gICAgY29kZWJsb2NrZ2g6IFtcbiAgICAgIFsvYGBgXFxzKiQvLCB7IHRva2VuOiBcInN0cmluZ1wiLCBuZXh0OiBcIkBwb3BcIiwgbmV4dEVtYmVkZGVkOiBcIkBwb3BcIiB9XSxcbiAgICAgIFsvW15gXSsvLCBcInZhcmlhYmxlLnNvdXJjZVwiXVxuICAgIF0sXG4gICAgbGluZWNvbnRlbnQ6IFtcbiAgICAgIFsvJlxcdys7LywgXCJzdHJpbmcuZXNjYXBlXCJdLFxuICAgICAgWy9AZXNjYXBlcy8sIFwiZXNjYXBlXCJdLFxuICAgICAgWy9cXGJfXyhbXlxcXFxfXXxAZXNjYXBlc3xfKD8hXykpK19fXFxiLywgXCJzdHJvbmdcIl0sXG4gICAgICBbL1xcKlxcKihbXlxcXFwqXXxAZXNjYXBlc3xcXCooPyFcXCopKStcXCpcXCovLCBcInN0cm9uZ1wiXSxcbiAgICAgIFsvXFxiX1teX10rX1xcYi8sIFwiZW1waGFzaXNcIl0sXG4gICAgICBbL1xcKihbXlxcXFwqXXxAZXNjYXBlcykrXFwqLywgXCJlbXBoYXNpc1wiXSxcbiAgICAgIFsvYChbXlxcXFxgXXxAZXNjYXBlcykrYC8sIFwidmFyaWFibGVcIl0sXG4gICAgICBbL1xceytbXn1dK1xcfSsvLCBcInN0cmluZy50YXJnZXRcIl0sXG4gICAgICBbLyghP1xcWykoKD86W15cXF1cXFxcXXxAZXNjYXBlcykqKShcXF1cXChbXlxcKV0rXFwpKS8sIFtcInN0cmluZy5saW5rXCIsIFwiXCIsIFwic3RyaW5nLmxpbmtcIl1dLFxuICAgICAgWy8oIT9cXFspKCg/OlteXFxdXFxcXF18QGVzY2FwZXMpKikoXFxdKS8sIFwic3RyaW5nLmxpbmtcIl0sXG4gICAgICB7IGluY2x1ZGU6IFwiaHRtbFwiIH1cbiAgICBdLFxuICAgIGh0bWw6IFtcbiAgICAgIFsvPChcXHcrKVxcLz4vLCBcInRhZ1wiXSxcbiAgICAgIFtcbiAgICAgICAgLzwoXFx3KykoXFwtfFxcdykqLyxcbiAgICAgICAge1xuICAgICAgICAgIGNhc2VzOiB7XG4gICAgICAgICAgICBcIkBlbXB0eVwiOiB7IHRva2VuOiBcInRhZ1wiLCBuZXh0OiBcIkB0YWcuJDFcIiB9LFxuICAgICAgICAgICAgXCJAZGVmYXVsdFwiOiB7IHRva2VuOiBcInRhZ1wiLCBuZXh0OiBcIkB0YWcuJDFcIiB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICBdLFxuICAgICAgWy88XFwvKFxcdyspKFxcLXxcXHcpKlxccyo+LywgeyB0b2tlbjogXCJ0YWdcIiB9XSxcbiAgICAgIFsvPCEtLS8sIFwiY29tbWVudFwiLCBcIkBjb21tZW50XCJdXG4gICAgXSxcbiAgICBjb21tZW50OiBbXG4gICAgICBbL1tePFxcLV0rLywgXCJjb21tZW50LmNvbnRlbnRcIl0sXG4gICAgICBbLy0tPi8sIFwiY29tbWVudFwiLCBcIkBwb3BcIl0sXG4gICAgICBbLzwhLS0vLCBcImNvbW1lbnQuY29udGVudC5pbnZhbGlkXCJdLFxuICAgICAgWy9bPFxcLV0vLCBcImNvbW1lbnQuY29udGVudFwiXVxuICAgIF0sXG4gICAgdGFnOiBbXG4gICAgICBbL1sgXFx0XFxyXFxuXSsvLCBcIndoaXRlXCJdLFxuICAgICAgW1xuICAgICAgICAvKHR5cGUpKFxccyo9XFxzKikoXCIpKFteXCJdKykoXCIpLyxcbiAgICAgICAgW1xuICAgICAgICAgIFwiYXR0cmlidXRlLm5hbWUuaHRtbFwiLFxuICAgICAgICAgIFwiZGVsaW1pdGVyLmh0bWxcIixcbiAgICAgICAgICBcInN0cmluZy5odG1sXCIsXG4gICAgICAgICAgeyB0b2tlbjogXCJzdHJpbmcuaHRtbFwiLCBzd2l0Y2hUbzogXCJAdGFnLiRTMi4kNFwiIH0sXG4gICAgICAgICAgXCJzdHJpbmcuaHRtbFwiXG4gICAgICAgIF1cbiAgICAgIF0sXG4gICAgICBbXG4gICAgICAgIC8odHlwZSkoXFxzKj1cXHMqKSgnKShbXiddKykoJykvLFxuICAgICAgICBbXG4gICAgICAgICAgXCJhdHRyaWJ1dGUubmFtZS5odG1sXCIsXG4gICAgICAgICAgXCJkZWxpbWl0ZXIuaHRtbFwiLFxuICAgICAgICAgIFwic3RyaW5nLmh0bWxcIixcbiAgICAgICAgICB7IHRva2VuOiBcInN0cmluZy5odG1sXCIsIHN3aXRjaFRvOiBcIkB0YWcuJFMyLiQ0XCIgfSxcbiAgICAgICAgICBcInN0cmluZy5odG1sXCJcbiAgICAgICAgXVxuICAgICAgXSxcbiAgICAgIFsvKFxcdyspKFxccyo9XFxzKikoXCJbXlwiXSpcInwnW14nXSonKS8sIFtcImF0dHJpYnV0ZS5uYW1lLmh0bWxcIiwgXCJkZWxpbWl0ZXIuaHRtbFwiLCBcInN0cmluZy5odG1sXCJdXSxcbiAgICAgIFsvXFx3Ky8sIFwiYXR0cmlidXRlLm5hbWUuaHRtbFwiXSxcbiAgICAgIFsvXFwvPi8sIFwidGFnXCIsIFwiQHBvcFwiXSxcbiAgICAgIFtcbiAgICAgICAgLz4vLFxuICAgICAgICB7XG4gICAgICAgICAgY2FzZXM6IHtcbiAgICAgICAgICAgIFwiJFMyPT1zdHlsZVwiOiB7XG4gICAgICAgICAgICAgIHRva2VuOiBcInRhZ1wiLFxuICAgICAgICAgICAgICBzd2l0Y2hUbzogXCJlbWJlZGRlZFN0eWxlXCIsXG4gICAgICAgICAgICAgIG5leHRFbWJlZGRlZDogXCJ0ZXh0L2Nzc1wiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCIkUzI9PXNjcmlwdFwiOiB7XG4gICAgICAgICAgICAgIGNhc2VzOiB7XG4gICAgICAgICAgICAgICAgJFMzOiB7XG4gICAgICAgICAgICAgICAgICB0b2tlbjogXCJ0YWdcIixcbiAgICAgICAgICAgICAgICAgIHN3aXRjaFRvOiBcImVtYmVkZGVkU2NyaXB0XCIsXG4gICAgICAgICAgICAgICAgICBuZXh0RW1iZWRkZWQ6IFwiJFMzXCJcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIFwiQGRlZmF1bHRcIjoge1xuICAgICAgICAgICAgICAgICAgdG9rZW46IFwidGFnXCIsXG4gICAgICAgICAgICAgICAgICBzd2l0Y2hUbzogXCJlbWJlZGRlZFNjcmlwdFwiLFxuICAgICAgICAgICAgICAgICAgbmV4dEVtYmVkZGVkOiBcInRleHQvamF2YXNjcmlwdFwiXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJAZGVmYXVsdFwiOiB7IHRva2VuOiBcInRhZ1wiLCBuZXh0OiBcIkBwb3BcIiB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICBdXG4gICAgXSxcbiAgICBlbWJlZGRlZFN0eWxlOiBbXG4gICAgICBbL1tePF0rLywgXCJcIl0sXG4gICAgICBbLzxcXC9zdHlsZVxccyo+LywgeyB0b2tlbjogXCJAcmVtYXRjaFwiLCBuZXh0OiBcIkBwb3BcIiwgbmV4dEVtYmVkZGVkOiBcIkBwb3BcIiB9XSxcbiAgICAgIFsvPC8sIFwiXCJdXG4gICAgXSxcbiAgICBlbWJlZGRlZFNjcmlwdDogW1xuICAgICAgWy9bXjxdKy8sIFwiXCJdLFxuICAgICAgWy88XFwvc2NyaXB0XFxzKj4vLCB7IHRva2VuOiBcIkByZW1hdGNoXCIsIG5leHQ6IFwiQHBvcFwiLCBuZXh0RW1iZWRkZWQ6IFwiQHBvcFwiIH1dLFxuICAgICAgWy88LywgXCJcIl1cbiAgICBdXG4gIH1cbn07XG5leHBvcnQge1xuICBjb25mLFxuICBsYW5ndWFnZVxufTtcbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFRRyxJQUFDLE9BQU87QUFBQSxFQUNULFVBQVU7QUFBQSxJQUNSLGNBQWMsQ0FBQyxRQUFRLEtBQUs7QUFBQSxFQUNoQztBQUFBLEVBQ0UsVUFBVTtBQUFBLElBQ1IsQ0FBQyxLQUFLLEdBQUc7QUFBQSxJQUNULENBQUMsS0FBSyxHQUFHO0FBQUEsSUFDVCxDQUFDLEtBQUssR0FBRztBQUFBLEVBQ2I7QUFBQSxFQUNFLGtCQUFrQjtBQUFBLElBQ2hCLEVBQUUsTUFBTSxLQUFLLE9BQU8sSUFBRztBQUFBLElBQ3ZCLEVBQUUsTUFBTSxLQUFLLE9BQU8sSUFBRztBQUFBLElBQ3ZCLEVBQUUsTUFBTSxLQUFLLE9BQU8sSUFBRztBQUFBLElBQ3ZCLEVBQUUsTUFBTSxLQUFLLE9BQU8sS0FBSyxPQUFPLENBQUMsUUFBUSxFQUFDO0FBQUEsRUFDOUM7QUFBQSxFQUNFLGtCQUFrQjtBQUFBLElBQ2hCLEVBQUUsTUFBTSxLQUFLLE9BQU8sSUFBRztBQUFBLElBQ3ZCLEVBQUUsTUFBTSxLQUFLLE9BQU8sSUFBRztBQUFBLElBQ3ZCLEVBQUUsTUFBTSxLQUFLLE9BQU8sSUFBRztBQUFBLEVBQzNCO0FBQUEsRUFDRSxTQUFTO0FBQUEsSUFDUCxTQUFTO0FBQUEsTUFDUCxPQUFPLElBQUksT0FBTywrQkFBK0I7QUFBQSxNQUNq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
