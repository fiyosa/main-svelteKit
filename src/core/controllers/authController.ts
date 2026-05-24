import { loginRepository, logoutRepository, userRepository } from '../repositories/auth'

/**
 * @openapi
 * /auth/login:
 *   post:
 *     tags: [Auth]
 *     summary: Login user
 *     parameters:
 *       - { in: header, name: X-Forwarded-For, schema: { type: string }, description: Client IP Address }
 *       - { in: header, name: User-Agent, schema: { type: string }, description: Client Browser/Platform info }
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               username: { type: string, example: user1 }
 *               password: { type: string, example: password123 }
 *             required: [username, password]
 *     responses:
 *       '200': { description: Login successful }
 *       '400': { description: Validation error or invalid credentials }
 */
export const login = loginRepository

/**
 * @openapi
 * /auth/logout:
 *   delete:
 *     tags: [Auth]
 *     summary: Logout user
 *     security: [{ cookieAuth: [] }]
 *     responses:
 *       '200': { description: Logout successful }
 */
export const logout = logoutRepository

/**
 * @openapi
 * /auth/user:
 *   get:
 *     tags: [Auth]
 *     summary: Get current user
 *     security: [{ cookieAuth: [] }]
 *     responses:
 *       '200': { description: User retrieved successfully }
 *       '401': { description: Unauthorized }
 */
export const user = userRepository
