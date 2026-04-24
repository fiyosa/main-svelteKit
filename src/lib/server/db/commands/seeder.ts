import { db } from './db-cli'
import * as schema from '../schema'
import bcrypt from 'bcryptjs'

async function main() {
  console.log('⏳ Seeding started...')

  try {
    // Hash password for security
    const hashedPassword = await bcrypt.hash('password123', 10)

    // Define users data in a JSON array
    const usersToSeed = Array.from({ length: 20 }, (_, i) => ({
      username: `user${i + 1}`,
      email: `user${i + 1}@example.com`,
      firstName: `Fullname ${i + 1}`,
      lastName: `Surname ${i + 1}`,
    }))

    console.log('👥 Seeding 20 users from JSON data...')

    for (const userData of usersToSeed) {
      const [newUser] = await db
        .insert(schema.users)
        .values({
          username: userData.username,
          email: userData.email,
          password: hashedPassword,
        })
        .returning()

      // Insert details for each user
      await db.insert(schema.user_details).values({
        user_id: newUser.id,
        name: userData.firstName,
        lastName: userData.lastName,
      })
    }

    console.log('✅ 20 Users and their details seeded successfully')
    console.log('🚀 Seeding finished successfully!')
  } catch (error) {
    console.error('❌ Seeding failed:', error)
    process.exit(1)
  }

  process.exit(0)
}

main()
