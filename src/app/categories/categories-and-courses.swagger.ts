/**
 * @swagger
 * components:  
 *   securitySchemes:  
 *     BearerAuth:  
 *       type: http  
 *       scheme: bearer  
 *       bearerFormat: JWT  # Optional: JWT format
 *       description: "Enter your JWT token here. You can use the 'Authorize' button to add the token= eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3M2NmMDUzY2UyNzhhZDM5MTg2M2NiYSIsIm5hbWUiOiJUZWFjaGVyIiwiZW1haWxWZXJpZmllZCI6dHJ1ZSwiZW1haWwiOiJ0ZXN0QGdtYWlsLmNvbSIsInVzZXJUeXBlIjoiVEVBQ0hFUiIsInJvbGUiOiJURUFDSEVSIiwiaWF0IjoxNzM1NzY0NzY4LCJleHAiOjE3MzYzNjk1Njh9.IKCGA-vdA0hJiaNsnb4glq2SirEGIFjAGWweh6mWqQE

 *  
 * security:  
 *   - BearerAuth: []  # Apply BearerAuth globally (for all routes) 
* /categories-and-courses:
 *   get:
 *     summary: Get categories and courses for the logged-in user
 *     description: Retrieves a list of categories and courses based on the user's ID, with optional filtering by title and category ID. 
*     tags:
 *       - Categories and Courses
 *     responses:
 *       200:
 *         description: Successfully retrieved categories and courses
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
 *                         description: The unique ID of the course
 *                       userId:
 *                         type: string
 *                         description: The user ID associated with the course
 *                       title:
 *                         type: string
 *                         description: The title of the course
 *                       description:
 *                         type: string
 *                         description: A description of the course
 *                       imageUrl:
 *                         type: string
 *                         description: URL for the image associated with the course
 *                       price:
 *                         type: number
 *                         format: float
 *                         description: The price of the course
 *                       isPublished:
 *                         type: boolean
 *                         description: Whether the course is published
 *                       categoryId:
 *                         type: string
 *                         description: The category ID of the course
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         description: When the course was created
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                         description: When the course was last updated
 *                       progress:
 *                         type: number
 *                         description: The progress of the course
 *                       chapters:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             id:
 *                               type: string
 *                               description: The unique ID of the chapter
 *                             title:
 *                               type: string
 *                               description: The title of the chapter
 *                             description:
 *                               type: string
 *                               description: The description of the chapter
 *                             videoUrl:
 *                               type: string
 *                               description: The video URL for the chapter
 *                             position:
 *                               type: integer
 *                               description: The position of the chapter
 *                             isPublished:
 *                               type: boolean
 *                               description: Whether the chapter is published
 *                             isFree:
 *                               type: boolean
 *                               description: Whether the chapter is free
 *                             courseId:
 *                               type: string
 *                               description: The ID of the course to which the chapter belongs
 *                             createdAt:
 *                               type: string
 *                               format: date-time
 *                               description: When the chapter was created
 *                             updatedAt:
 *                               type: string
 *                               format: date-time
 *                               description: When the chapter was last updated
 *                 coursesInProgress:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         description: The unique ID of the course
 *                       userId:
 *                         type: string
 *                         description: The user ID associated with the course
 *                       title:
 *                         type: string
 *                         description: The title of the course
 *                       description:
 *                         type: string
 *                         description: A description of the course
 *                       imageUrl:
 *                         type: string
 *                         description: URL for the image associated with the course
 *                       price:
 *                         type: number
 *                         format: float
 *                         description: The price of the course
 *                       isPublished:
 *                         type: boolean
 *                         description: Whether the course is published
 *                       categoryId:
 *                         type: string
 *                         description: The category ID of the course
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         description: When the course was created
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                         description: When the course was last updated
 *                       progress:
 *                         type: number
 *                         description: The progress of the course
 *                       chapters:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             id:
 *                               type: string
 *                               description: The unique ID of the chapter
 *                             title:
 *                               type: string
 *                               description: The title of the chapter
 *                             description:
 *                               type: string
 *                               description: The description of the chapter
 *                             videoUrl:
 *                               type: string
 *                               description: The video URL for the chapter
 *                             position:
 *                               type: integer
 *                               description: The position of the chapter
 *                             isPublished:
 *                               type: boolean
 *                               description: Whether the chapter is published
 *                             isFree:
 *                               type: boolean
 *                               description: Whether the chapter is free
 *                             courseId:
 *                               type: string
 *                               description: The ID of the course to which the chapter belongs
 *                             createdAt:
 *                               type: string
 *                               format: date-time
 *                               description: When the chapter was created
 *                             updatedAt:
 *                               type: string
 *                               format: date-time
 *                               description: When the chapter was last updated
 *       401:
 *         description: Unauthorized. No user ID found.
 *       500:
 *         description: Internal server error

 */
