import Mux from "@mux/mux-node";
import { PrismaClient } from "@prisma/client";

const { MUX_TOKEN_ID, MUX_TOKEN_SECRET } = process.env;

const mux = new Mux({
  tokenId: MUX_TOKEN_ID,
  tokenSecret: MUX_TOKEN_SECRET,
});

const video = mux.video; // For easier video operations
const prisma = new PrismaClient();

/**
 * Uploads a video to Mux and saves metadata to the database.
 */
export const uploadVideoToMux = async (
  videoUrl: string,
  chapterId: string
): Promise<any> => {
  try {
    const asset = await video.assets.create({
      input: [{ url: videoUrl }],
      playback_policy: ["public"],
      test: false,
    });

    const muxData = await prisma.muxData.create({
      data: {
        chapterId: chapterId,
        assetId: asset.id,
        playbackId: asset.playback_ids?.[0]?.id,
      },
    });

    return muxData;
  } catch (error: any) {
    throw new Error(`Error uploading to Mux: ${error.message}`);
  }
};
