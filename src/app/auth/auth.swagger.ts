/**
 * @swagger
 * /register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Invalid input
 */

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Login a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: test@gmail.com
 *               password:
 *                 type: string
 *                 example: Hello123
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       400:
 *         description: Missing email or password
 *       401:
 *         description: Invalid credentials
 */

/**
 * @swagger
 * components:  
 *   securitySchemes:  
 *     BearerAuth:  
 *       type: http  
 *       scheme: bearer  
 *       bearerFormat: JWT  # Optional: JWT format
 *       description: "Enter your JWT token here. You can use the 'Authorize' button to add the token.eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3M2NmMDUzY2UyNzhhZDM5MTg2M2NiYSIsIm5hbWUiOiJUZWFjaGVyIiwiZW1haWxWZXJpZmllZCI6dHJ1ZSwiZW1haWwiOiJ0ZXN0QGdtYWlsLmNvbSIsInVzZXJUeXBlIjoiVEVBQ0hFUiIsInJvbGUiOiJURUFDSEVSIiwiaWF0IjoxNzM1NzY0NzY4LCJleHAiOjE3MzYzNjk1Njh9.IKCGA-vdA0hJiaNsnb4glq2SirEGIFjAGWweh6mWqQE"  

 *  
 * security:  
 *   - BearerAuth: []  # Apply BearerAuth globally (for all routes)
 *  

 * /auth/user/{id}:
 *   get:
 *     summary: Get user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
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

/**
 * @swagger
 * /activate/{token}:
 *   get:
 *     summary: Activate user account
 *     tags: [Auth]
 *     parameters:
 *       - in: path
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *         description: Activation token
 *     responses:
 *       200:
 *         description: Account activated successfully
 *       400:
 *         description: Token is required
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /auth/user/:
 *   put:
 *     summary: Update user information
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 description: User ID
 *               oldPassword:
 *                 type: string
 *               newPassword:
 *                 type: string
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               image:
 *                 type: string
 *     responses:
 *       200:
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     name:
 *                       type: string
 *                     email:
 *                       type: string
 *       400:
 *         description: User ID is required
 *       500:
 *         description: Failed to update user
 */
