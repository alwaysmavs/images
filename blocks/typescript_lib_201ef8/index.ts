import type { VocanaSDK } from "@vocana/sdk";
import { readFileSync, writeFileSync } from "fs";
import {
  losslessCompressPng,
  compressJpeg,
  pngQuantize,
  Transformer,
  ResizeFilterType,
  ChromaSubsampling,
} from "@napi-rs/image";

type FormatType = {PNG: "png", JPEG: "jpg"};
type Context = VocanaSDK<Inputs, Outputs>;
type Inputs = Readonly<{ image_address: string, image_name: string, format: FormatType, folder: string }>;
type Outputs = Readonly<{ min_image_address: string }>;

export default async function(inputs: Inputs, context: Context) {
  const address = `${inputs.folder}/${inputs.image_name}_mini.${inputs.format}`;
  let PNG = readFileSync(inputs.image_address);
  writeFileSync(address, await losslessCompressPng(PNG));
  void context.output(address, "min_image_address", true);
};