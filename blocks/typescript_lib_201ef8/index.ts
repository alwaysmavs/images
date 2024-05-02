import type { VocanaSDK } from "@vocana/sdk";
import { readFileSync, writeFileSync } from "fs";
import {
  losslessCompressPng,
} from "@napi-rs/image";

type Context = VocanaSDK<Inputs, Outputs>;
type Inputs = Readonly<{ image_address: string, image_name: string, folder: string }>;
type Outputs = Readonly<{ min_image_address: string }>;

export default async function(inputs: Inputs, context: Context) {
  const address = `${inputs.folder}/${inputs.image_name}_mini.png`;
  let PNG = readFileSync(inputs.image_address);
  writeFileSync(address, await losslessCompressPng(PNG));
  void context.output(address, "min_image_address", true);
};