/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 * tags:
 *   - name: Courses
 *     description: Operations related to courses
 *
 * /courses:
 *   post:
 *     summary: Create a new course
 *     description: Creates a new course. Only accessible by users with the `TEACHER` role.
 *     operationId: createCourse
 *     tags:
 *       - Courses
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - price
 *               - imageUrl
 *               - isPublished
 *               - categoryId
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the course
 *                 example: "Introduction to Programming"
 *               description:
 *                 type: string
 *                 description: A description of the course content
 *                 example: "A beginner-friendly course on programming basics."
 *               price:
 *                 type: number
 *                 description: The price of the course
 *                 example: 40
 *               imageUrl:
 *                 type: string
 *                 description: The image URL for the course
 *                 example: "/assets/images/courses/course1.jpg"
 *               isPublished:
 *                 type: boolean
 *                 description: Whether the course is published or not
 *                 example: true
 *               categoryId:
 *                 type: string
 *                 description: The ID of the course category
 *                 example: "1234567890abcdef"
 *     responses:
 *       '201':
 *         description: Course created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 categoryId:
 *                   type: string
 *                   description: The ID of the category for the course
 *                   example: "1234567890abcdef"
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   description: The timestamp when the course was created
 *                   example: "2024-12-25T12:34:56Z"
 *                 description:
 *                   type: string
 *                   description: The description of the course
 *                   example: "A beginner-friendly course on programming basics."
 *                 id:
 *                   type: string
 *                   description: The unique identifier of the course
 *                   example: "abc123def456"
 *                 imageUrl:
 *                   type: string
 *                   description: The URL for the course image
 *                   example: "/assets/images/courses/course1.jpg"
 *                 isPublished:
 *                   type: boolean
 *                   description: Whether the course is published or not
 *                   example: true
 *                 price:
 *                   type: number
 *                   description: The price of the course
 *                   example: 40
 *                 title:
 *                   type: string
 *                   description: The title of the course
 *                   example: "Introduction to Programming"
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                   description: The timestamp when the course was last updated
 *                   example: "2024-12-25T12:34:56Z"
 *                 userId:
 *                   type: string
 *                   description: The user ID of the course creator
 *                   example: "teacher123"
 *                 message:
 *                   type: string
 *                   description: Success message
 *                   example: "Course created successfully"
 *       '400':
 *         description: Bad Request – Validation failed (e.g., Prisma validation error)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 400
 *                 message:
 *                   type: string
 *                   example: "Prisma validation error"
 *                 error:
 *                   type: string
 *                   example: "Validation failed for course title."
 *       '401':
 *         description: Unauthorized – User is not authenticated or not a `TEACHER`
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Unauthorized"
 *       '500':
 *         description: Internal Server Error – Failed to create course
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: "Failed to create course"
 *                 error:
 *                   type: string
 *                   example: "Internal server error message"
 */

// get-courses
/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 * tags:
 *   - name: Courses
 *     description: Courses related operations
 *
 * /courses:
 *   get:
 *     summary: Get all courses for a user
 *     description: Fetch all courses for the logged-in user. Requires a valid JWT token.
 *     tags: [Courses]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: A list of courses for the user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 courses:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       title:
 *                         type: string
 *                       description:
 *                         type: string
 *                       price:
 *                         type: number
 *                       imageUrl:
 *                         type: string
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *       401:
 *         description: Unauthorized. No valid JWT token provided.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Unauthorized
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Internal Server Error
 */

// get-single-courses

/**
 * @swagger
  * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 * /courses/{courseId}:
 *   get:
 *     summary: Get details of a specific course
 *     description: Retrieves the details of a course for an authenticated user.
 *     parameters:
 *       - in: path
 *         name: courseId
 *         required: true
 *         description: The ID of the course to fetch.
 *         schema:
 *           type: string  
 *           default: "67540fa1a7fb2bb95e96083e"  
 *     tags: [Courses]    
 *     security:
 *       - BearerAuth: []  # Authentication via Bearer token (JWT)
 *     responses:
 *       200:
 *         description: Successfully retrieved the course details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 attachments:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: ["/path/to/file1", "/path/to/file2"]
 *                 categoryId:
 *                   type: string
 *                   example: "1234"
 *                 chapters:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: "chapter123"
 *                       title:
 *                         type: string
 *                         example: "Chapter 1"
 *                       description:
 *                         type: string
 *                         example: "<p>This is a course chapter description.</p>"
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   example: "2024-12-25T12:34:56Z"
 *                 description:
 *                   type: string
 *                   example: "Detailed course description here"
 *                 id:
 *                   type: string
 *                   example: "course123"
 *                 imageUrl:
 *                   type: string
 *                   example: "/assets/images/courses/course123/image.jpg"
 *                 isPublished:
 *                   type: boolean
 *                   example: true
 *                 price:
 *                   type: number
 *                   example: 100
 *                 title:
 *                   type: string
 *                   example: "Course Title"
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                   example: "2024-12-26T12:34:56Z"
 *                 userId:
 *                   type: string
 *                   example: "user123"
 *       400:
 *         description: Missing courseId in the request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Missing courseId"
 *       401:
 *         description: Unauthorized, invalid or missing JWT token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Unauthorized"
 *       404:
 *         description: Course not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Course not found"
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal Server Error"

 */

// get-course-with-progress
/**
 * @swagger
 * /courses/course-with-progress/{courseId}:
 *   get:
 *     summary: Get Course with Progress
 *     description: Fetch a course along with its progress for the logged-in user. Requires a valid JWT token.
 *     tags:
 *       - Courses
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: courseId
 *         required: true
 *         description: The ID of the course to fetch.
 *         schema:
 *           type: string
 *           default: "67540fa1a7fb2bb95e96083e"  # Example default course ID
 *     responses:
 *       200:
 *         description: Successfully fetched course and progress details.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 course:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     userId:
 *                       type: string
 *                     title:
 *                       type: string
 *                     description:
 *                       type: string
 *                     imageUrl:
 *                       type: string
 *                     price:
 *                       type: number
 *                     isPublished:
 *                       type: boolean
 *                     categoryId:
 *                       type: string
 *                       nullable: true
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                     chapters:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                           title:
 *                             type: string
 *                           description:
 *                             type: string
 *                           videoUrl:
 *                             type: string
 *                           position:
 *                             type: number
 *                           isPublished:
 *                             type: boolean
 *                           isFree:
 *                             type: boolean
 *                           courseId:
 *                             type: string
 *                           createdAt:
 *                             type: string
 *                             format: date-time
 *                           updatedAt:
 *                             type: string
 *                             format: date-time
 *                           userProgress:
 *                             type: array
 *                             items:
 *                               type: object
 *                 progressCount:
 *                   type: number
 *       401:
 *         description: Unauthorized. Token missing or invalid.
 *       500:
 *         description: Internal Server Error.
 */

// ### Get Unique Course

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
 *   - name: Courses
 *     description: Operations related to courses
 *
 * /courses/courseUnique/{courseId}:
 *   get:
 *     summary: Get a unique course by ID
 *     description: Fetch details of a specific course using its ID. Requires a valid JWT token.
 *     tags: [Courses]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: courseId
 *         in: path
 *         required: true
 *         description: ID of the course to retrieve
 *         schema:
 *           type: string
 *           example: 67540fa1a7fb2bb95e96083e
 *     responses:
 *       200:
 *         description: Successfully fetched the course details
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
 *                     id:
 *                       type: string
 *                       example: 67540fa1a7fb2bb95e96083e
 *                     userId:
 *                       type: string
 *                       example: 673cf053ce278ad391863cba
 *                     title:
 *                       type: string
 *                       example: Cloud computing
 *                     description:
 *                       type: string
 *                       example: >
 *                         With a focus on flexibility and accessibility, our system supports a range of educational needs...
 *                     imageUrl:
 *                       type: string
 *                       example: https://res.cloudinary.com/example/image/upload/v1234567890/courses/example.jpg
 *                     price:
 *                       type: number
 *                       example: 1
 *                     isPublished:
 *                       type: boolean
 *                       example: true
 *                     categoryId:
 *                       type: string
 *                       nullable: true
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: 2024-12-07T09:04:33.644Z
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: 2024-12-22T09:33:10.470Z
 *                     chapters:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                             example: 6755d5d34bef97e9fd17e74d
 *                           title:
 *                             type: string
 *                             example: Introduction to cloud computing
 *                           description:
 *                             type: string
 *                             example: "<p><strong>description</strong></p>"
 *                           videoUrl:
 *                             type: string
 *                             example: https://utfs.io/f/hyr6cBzJvRV8JpwGYmvGSBi4xfuegNpTWwnYHl1stFmIkZdc
 *                           position:
 *                             type: integer
 *                             example: 1
 *                           isPublished:
 *                             type: boolean
 *                             example: true
 *                           isFree:
 *                             type: boolean
 *                             example: true
 *                           courseId:
 *                             type: string
 *                             example: 67540fa1a7fb2bb95e96083e
 *                           createdAt:
 *                             type: string
 *                             format: date-time
 *                             example: 2024-12-08T17:22:27.442Z
 *                           updatedAt:
 *                             type: string
 *                             format: date-time
 *                             example: 2024-12-09T19:18:39.040Z
 *       401:
 *         description: Unauthorized - User is not authenticated
 *       400:
 *         description: Bad Request - Missing courseId
 *       500:
 *         description: Internal Server Error
 */
