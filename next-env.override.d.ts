declare module "*.svg" {
  const content: import("../dist/client/image").StaticImageData;

  export default content;
}
