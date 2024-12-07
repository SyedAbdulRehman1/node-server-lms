"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadVideoToMux = void 0;
const mux_node_1 = __importDefault(require("@mux/mux-node"));
const client_1 = require("@prisma/client");
const { MUX_TOKEN_ID, MUX_TOKEN_SECRET } = process.env;
const mux = new mux_node_1.default({
    tokenId: MUX_TOKEN_ID,
    tokenSecret: MUX_TOKEN_SECRET,
});
const video = mux.video; // For easier video operations
const prisma = new client_1.PrismaClient();
/**
 * Uploads a video to Mux and saves metadata to the database.
 */
const uploadVideoToMux = (videoUrl, chapterId) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    try {
        const asset = yield video.assets.create({
            input: [{ url: videoUrl }],
            playback_policy: ["public"],
            test: false,
        });
        // const muxData = await prisma.muxData.create({
        //   data: {
        //     chapterId: chapterId,
        //     assetId: asset.id,
        //     playbackId: asset.playback_ids?.[0]?.id,
        //   },
        // });
        const muxData = yield prisma.muxData.upsert({
            where: { chapterId },
            update: {
                assetId: asset.id,
                playbackId: (_b = (_a = asset.playback_ids) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.id,
            },
            create: {
                chapterId,
                assetId: asset.id,
                playbackId: (_d = (_c = asset.playback_ids) === null || _c === void 0 ? void 0 : _c[0]) === null || _d === void 0 ? void 0 : _d.id,
            },
        });
        return muxData;
    }
    catch (error) {
        throw new Error(`Error uploading to Mux: ${error.message}`);
    }
});
exports.uploadVideoToMux = uploadVideoToMux;
