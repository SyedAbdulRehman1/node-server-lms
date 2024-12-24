/**
 * @swagger
 * /dashboard/courses:
 *   get:
 *     summary: Retrieve the dashboard courses for the authenticated user
 *     tags: [Dashboard]
 *     security:
 *       - BearerAuth: []  # This applies JWT-based authentication
 *     responses:
 *       200:
 *         description: Successfully retrieved the dashboard courses
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 completedCourses:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: "67364382a6afd21192ae46f7"
 *                       userId:
 *                         type: string
 *                         example: "6736423334ee750a90d67ba7"
 *                       title:
 *                         type: string
 *                         example: "test"
 *                       description:
 *                         type: string
 *                         example: "desc"
 *                       imageUrl:
 *                         type: string
 *                         example: "/assets/images/courses/67364382a6afd21192ae46f7/1731609488026-WhatsApp Image 2024-10-05 at 11.26.14 PM.jpeg"
 *                       price:
 *                         type: integer
 *                         example: 40
 *                       isPublished:
 *                         type: boolean
 *                         example: true
 *                       categoryId:
 *                         type: string
 *                         example: "string"
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2024-11-14T18:37:54.343Z"
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2024-11-14T18:39:56.238Z"
 *                       progress:
 *                         type: integer
 *                         example: 100
 *                       chapters:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             id:
 *                               type: string
 *                               example: "673643a1a6afd21192ae46f8"
 *                             title:
 *                               type: string
 *                               example: "course"
 *                             description:
 *                               type: string
 *                               example: "<p>test</p>"
 *                             videoUrl:
 *                               type: string
 *                               example: "https://utfs.io/f/hyr6cBzJvRV8opUjPUbBW6FqykjK1p4dvVtn85Xs7fCaeUDZ"
 *                             position:
 *                               type: integer
 *                               example: 1
 *                             isPublished:
 *                               type: boolean
 *                               example: true
 *                             isFree:
 *                               type: boolean
 *                               example: true
 *                             courseId:
 *                               type: string
 *                               example: "67364382a6afd21192ae46f7"
 *                             createdAt:
 *                               type: string
 *                               format: date-time
 *                               example: "2024-11-14T18:38:25.278Z"
 *                             updatedAt:
 *                               type: string
 *                               format: date-time
 *                               example: "2024-11-14T18:39:41.515Z"
 *                 coursesInProgress:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: "674f66ffeee2e21440255b1d"
 *                       userId:
 *                         type: string
 *                         example: "673cf053ce278ad391863cba"
 *                       title:
 *                         type: string
 *                         example: "Artificial Intelligance"
 *                       description:
 *                         type: string
 *                         example: "desc"
 *                       imageUrl:
 *                         type: string
 *                         example: "https://res.cloudinary.com/dnh9irhkf/image/upload/v1733257082/courses/1733257014937-Google-Groups.png.jpg"
 *                       price:
 *                         type: integer
 *                         example: 20
 *                       isPublished:
 *                         type: boolean
 *                         example: true
 *                       categoryId:
 *                         type: string
 *                         example: "string"
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2024-12-03T20:15:59.917Z"
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2024-12-09T07:29:30.386Z"
 *                       progress:
 *                         type: integer
 *                         example: 0
 *                       chapters:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             id:
 *                               type: string
 *                               example: "674f671eeee2e21440255b1e"
 *                             title:
 *                               type: string
 *                               example: "chapt1"
 *                             description:
 *                               type: string
 *                               example: "<p>desc</p>"
 *                             videoUrl:
 *                               type: string
 *                               example: "https://utfs.io/f/hyr6cBzJvRV8Jq9SPRvGSBi4xfuegNpTWwnYHl1stFmIkZdc"
 *                             position:
 *                               type: integer
 *                               example: 1
 *                             isPublished:
 *                               type: boolean
 *                               example: true
 *                             isFree:
 *                               type: boolean
 *                               example: true
 *                             courseId:
 *                               type: string
 *                               example: "674f66ffeee2e21440255b1d"
 *                             createdAt:
 *                               type: string
 *                               format: date-time
 *                               example: "2024-12-03T20:16:30.767Z"
 *                             updatedAt:
 *                               type: string
 *                               format: date-time
 *                               example: "2024-12-07T09:03:02.460Z"
 */
