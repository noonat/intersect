// The examples import katex's stylesheet so that esbuild emits it alongside
// the bundle. TypeScript doesn't know what a stylesheet is, so tell it.
declare module "*.css";
