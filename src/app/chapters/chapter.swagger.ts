// ### Get Chapter by Course ID and Chapter ID

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *
 * tags:
 *   - name: Chapters
 *     description: Operations related to chapters
 *
 * /chapters/{courseId}/chapters/{chapterId}:
 *   get:
 *     summary: Get a specific chapter by course ID and chapter ID
 *     description: Fetch the details of a specific chapter using course ID and chapter ID. Requires a valid JWT token.
 *     tags: [Chapters]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: courseId
 *         required: true
 *         schema:
 *           type: string
 *           default: "676b10464230fbc9720cf7ed" # Default value for courseId
 *       - in: path
 *         name: chapterId
 *         required: true
 *         schema:
 *           type: string
 *           default: "676d1aabf1f3420988b583b7" # Default value for chapterId
 *
 *     responses:
 *       200:
 *         description: Successfully fetched the chapter
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 title:
 *                   type: string
 *                 description:
 *                   type: string
 *                 videoUrl:
 *                   type: string
 *                 position:
 *                   type: integer
 *                 isPublished:
 *                   type: boolean
 *                 isFree:
 *                   type: boolean
 *                 courseId:
 *                   type: string
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *       404:
 *         description: Chapter not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
// ### Get a Chapter
/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 * 
 * tags:
 *   - name: Chapters
 *     description: Operations related to course chapters
 * 
 * /{courseId}/chapters/{chapterId}:
 *   get:
 *     summary: Get details of a specific chapter by ID
 *     description: Fetch details of a chapter within a course using courseId and chapterId.
 *     tags: [Chapters]
 *     parameters:
 *       - in: path
 *         name: courseId
 *         required: true
 *         description: The unique ID of the course.
 *         schema:
 *           type: string
 *           default: "676b10464230fbc9720cf7ed" # Default value for courseId

 *       - in: path
 *         name: chapterId
 *         required: true
 *         description: The unique ID of the chapter.
 *         schema:
 *           type: string
 *           default: "676d1aabf1f3420988b583b7" # Default value for chapterId
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully fetched the chapter details.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: object
 *                   properties:
 *                     chapter:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                           example: "676d1aabf1f3420988b583b7"
 *                         title:
 *                           type: string
 *                           example: "What is Security ?"
 *                         description:
 *                           type: string
 *                           example: "<p><span style=\"background-color: rgb(16, 18, 24); color: rgb(236, 236, 236);\">Cyber security is&nbsp;</span><strong style=\"background-color: rgb(52, 69, 127); color: rgb(255, 255, 255);\">the application of technologies, processes, and controls to protect systems, networks, programs, devices and data from cyber attacks</strong><span style=\"background-color: rgb(16, 18, 24); color: rgb(236, 236, 236);\">. It aims to reduce the risk of cyber attacks and protect against the unauthorised exploitation of systems, networks, and technologies.</span></p>"
 *                         videoUrl:
 *                           type: string
 *                           example: "https://utfs.io/f/hyr6cBzJvRV8Kd7BAKn7hdPWr9gCaqMFDQBNofeZ5sIlTpt4"
 *                         position:
 *                           type: integer
 *                           example: 1
 *                         isPublished:
 *                           type: boolean
 *                           example: true
 *                         isFree:
 *                           type: boolean
 *                           example: true
 *                         courseId:
 *                           type: string
 *                           example: "676b10464230fbc9720cf7ed"
 *                         createdAt:
 *                           type: string
 *                           format: date-time
 *                           example: "2024-12-26T08:58:19.968Z"
 *                         updatedAt:
 *                           type: string
 *                           format: date-time
 *                           example: "2024-12-26T08:59:10.048Z"
 *                     muxData:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                           example: "676d1ac8f1f3420988b583b8"
 *                         assetId:
 *                           type: string
 *                           example: "eudaNX5OfEWTPNEzy76LQe3lSScXF2sVUoCGLJ1pCW8"
 *                         playbackId:
 *                           type: string
 *                           example: "c8uvsA6EA9mT8HaShnnEoDlBoQgejut8b1sLyIVJgpo"
 *                         chapterId:
 *                           type: string
 *                           example: "676d1aabf1f3420988b583b7"
 *                 isComplete:
 *                   type: boolean
 *                   example: true
 *                 completionText:
 *                   type: string
 *                   example: "(3/3)"
 *       404:
 *         description: Chapter not found or invalid input.
 *       500:
 *         description: Internal Server Error.
 */

// ### Fetch Chapter Data with Query Parameters

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *
 * tags:
 *   - name: Chapters
 *     description: Operations related to course chapters
 *
 * /chapters/get-chapter:
 *   get:
 *     summary: Get chapter data by course and chapter ID
 *     description: Fetch chapter details, including video URL, course information, progress, and more, using the courseId and chapterId query parameters.
 *     tags: [Chapters]
 *     parameters:
 *       - in: query
 *         name: courseId
 *         required: true
 *         description: The unique ID of the course.
 *         schema:
 *           type: string
 *           default: "676b10464230fbc9720cf7ed" # Default value for courseId
 *       - in: query
 *         name: chapterId
 *         required: true
 *         description: The unique ID of the chapter.
 *         schema:
 *           type: string
 *           default: "676d1aabf1f3420988b583b7" # Default value for chapterId
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully fetched chapter data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 chapter:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: 676d1aabf1f3420988b583b7
 *                     title:
 *                       type: string
 *                       example: "What is Security ?"
 *                     description:
 *                       type: string
 *                       example: "<p><span style=\"background-color: rgb(16, 18, 24); color: rgb(236, 236, 236);\">Cyber security is&nbsp;</span><strong style=\"background-color: rgb(52, 69, 127); color: rgb(255, 255, 255);\">the application of technologies, processes, and controls to protect systems, networks, programs, devices and data from cyber attacks</strong><span style=\"background-color: rgb(16, 18, 24); color: rgb(236, 236, 236);\">. It aims to reduce the risk of cyber attacks and protect against the unauthorised exploitation of systems, networks, and technologies.</span></p>"
 *                     videoUrl:
 *                       type: string
 *                       example: "https://utfs.io/f/hyr6cBzJvRV8Kd7BAKn7hdPWr9gCaqMFDQBNofeZ5sIlTpt4"
 *                     position:
 *                       type: integer
 *                       example: 1
 *                     isPublished:
 *                       type: boolean
 *                       example: true
 *                     isFree:
 *                       type: boolean
 *                       example: true
 *                     courseId:
 *                       type: string
 *                       example: "676b10464230fbc9720cf7ed"
 *                 course:
 *                   type: object
 *                   properties:
 *                     price:
 *                       type: integer
 *                       example: 15
 *                 muxData:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "676d1ac8f1f3420988b583b8"
 *                     assetId:
 *                       type: string
 *                       example: "eudaNX5OfEWTPNEzy76LQe3lSScXF2sVUoCGLJ1pCW8"
 *                     playbackId:
 *                       type: string
 *                       example: "c8uvsA6EA9mT8HaShnnEoDlBoQgejut8b1sLyIVJgpo"
 *                 attachments:
 *                   type: array
 *                   items:
 *                     type: object
 *                 nextChapter:
 *                   type: object
 *                   nullable: true
 *                 userProgress:
 *                   type: object
 *                   nullable: true
 *                 purchase:
 *                   type: object
 *                   nullable: true
 *       400:
 *         description: Invalid query parameters
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 message:
 *                   type: string
 *                   example: Invalid query parameters
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 message:
 *                   type: string
 *                   example: Internal server error message
 */
