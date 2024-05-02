import type { VocanaSDK } from "@vocana/sdk";

type Context = VocanaSDK<Inputs, Outputs>;
type Inputs = Readonly<{ image_source: string }>;
type Outputs = Readonly<{ image_address: string }>;

export default async function(inputs: Inputs, context: Context) {
  void context.output(inputs.image_source, "image_address", true);
};