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

// get-couses
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