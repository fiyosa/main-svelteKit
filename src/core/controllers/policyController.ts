import {
  roleListRepository,
  permissionListRepository,
  permissionStoreRepository,
  permissionDestroyRepository,
} from '../repositories/policy'

/**
 * @openapi
 * /policy/role:
 *   get:
 *     tags: [Policy]
 *     summary: List roles with permissions
 *     description: Mengembalikan daftar semua roles beserta permissions-nya.
 *     security: [{ cookieAuth: [] }]
 *     responses:
 *       '200':
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: { type: string, example: Role retrieved successfully }
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id: { type: number, example: 1 }
 *                       name: { type: string, example: admin }
 *                       notes: { type: string, nullable: true }
 *                       created_at: { type: string, format: date-time }
 *                       updated_at: { type: string, format: date-time }
 *                       deleted_at: { type: string, format: date-time, nullable: true }
 *                       permissions:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             id: { type: number, example: 1 }
 *                             name: { type: string, example: create-user }
 *                             notes: { type: string, nullable: true }
 *                             created_at: { type: string, format: date-time }
 *                             updated_at: { type: string, format: date-time }
 *                             deleted_at: { type: string, format: date-time, nullable: true }
 */
export const roleList = roleListRepository

/**
 * @openapi
 * /policy/permission:
 *   get:
 *     tags: [Policy]
 *     summary: List permissions
 *     description: Mengembalikan daftar semua permissions.
 *     security: [{ cookieAuth: [] }]
 *     responses:
 *       '200':
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: { type: string, example: Permission retrieved successfully }
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id: { type: number, example: 1 }
 *                       name: { type: string, example: create-user }
 *                       notes: { type: string, nullable: true }
 *                       created_at: { type: string, format: date-time }
 *                       updated_at: { type: string, format: date-time }
 *                       deleted_at: { type: string, format: date-time, nullable: true }
 *   post:
 *     tags: [Policy]
 *     summary: Create permission
 *     description: Menambahkan permission baru.
 *     security: [{ cookieAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               name: { type: string, example: create-user }
 *               notes: { type: string, example: Can create new users }
 *             required: [name]
 *     responses:
 *       '200': { description: Permission saved successfully }
 *       '400': { description: Validation error or duplicate name }
 * /policy/permission/{id}:
 *   delete:
 *     tags: [Policy]
 *     summary: Delete permission
 *     description: Menghapus permission (soft delete).
 *     security: [{ cookieAuth: [] }]
 *     parameters:
 *       - { in: path, name: id, required: true, schema: { type: string }, description: Permission ID (hash) }
 *     responses:
 *       '200': { description: Permission deleted successfully }
 *       '404': { description: Permission not found }
 */
export const permission = {
  list: permissionListRepository,
  store: permissionStoreRepository,
  destroy: permissionDestroyRepository,
}
