import { choice } from "@typesafe-ai/sdk";

export const questions = {
  kind: choice("What kind of text was pasted", {
    stacktrace: "An error message, exception or stack trace from a program",
    code: "Source code, a config file or a shell command",
    text: "Natural language prose, notes or anything else",
  }),
  language: choice("The programming language or runtime this text comes from", {
    javascript: "JavaScript or Node.js",
    typescript: "TypeScript, including .ts or .tsx files",
    python: "Python",
    go: "Go",
    rust: "Rust",
    java: "Java or another JVM language",
    cpp: "C or C++",
    ruby: "Ruby",
    php: "PHP",
    shell: "A shell command or script",
    css: "CSS",
    html: "HTML",
    other: "Another language, or not code at all",
  }),
  cause: choice("If this is an error, the most likely root cause", {
    null_reference: "Reading a property of null, undefined, None or nil",
    type_mismatch: "Calling or using a value as the wrong type",
    network: "A connection, DNS or socket failure",
    auth: "Missing or rejected credentials or permissions",
    not_found: "A missing file, module, route or record",
    syntax: "Invalid syntax or a parse error",
    timeout: "An operation took too long",
    other: "Something else, or not an error",
  }),
};
