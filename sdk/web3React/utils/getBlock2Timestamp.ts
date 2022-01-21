import { BlockTag } from "@ethersproject/providers";
import { simpleRpcProvider } from "..";

export async function getBlock2Timestamp(
  block: BlockTag | string | Promise<BlockTag | string>
) {
  const { timestamp } = await simpleRpcProvider.getBlock(block);

  return timestamp;
}
