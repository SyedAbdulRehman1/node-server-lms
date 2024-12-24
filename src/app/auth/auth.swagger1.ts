/**
 * @swagger
 * /auth/user:
 *   get:
 *     summary: Get user by ID111
 *     tags: [Users2]
 *     parameters:
 *       - in: path
 *         name: id
 *         name1: id
 *         required: true
 *         schema:
 *           type: string
 *           default: "673cf1fdce278ad391863cbf"
 *         description: User ID
 *     responses:
 *       200:
 *         description: User data retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     name:
 *                       type: string
 *                     email:
 *                       type: string
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
