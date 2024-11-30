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
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkPurchase = void 0;
const purchases_service_1 = require("./purchases.service");
const purchasesService = new purchases_service_1.PurchasesService();
const checkPurchase = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user;
    const userId1 = userId === null || userId === void 0 ? void 0 : userId.id;
    const courseId = req.query.courseId;
    console.log(courseId, "393388");
    console.log(userId1, "userId1");
    if (!userId1) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }
    if (!courseId) {
        res.status(400).json({ message: "Missing courseId" });
        return;
    }
    try {
        const purchase = yield purchasesService.checkUserPurchase(courseId, userId1);
        // if (!purchase) {
        //   res.status(404).json({ message: "Purchase not found" });
        //   return;
        // }
        // Return the purchase details
        // return { purchase: purchase || [] };
        res.json({ purchase: purchase || [] });
    }
    catch (error) {
        console.error("Error fetching purchase:", error);
        res.status(500).json({ message: "Internal Server Error" }); // Return 500 if something goes wrong
    }
});
exports.checkPurchase = checkPurchase;
