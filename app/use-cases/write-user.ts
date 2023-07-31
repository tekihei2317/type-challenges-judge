import { User } from '../model'

/**
 * create or update user record
 */
export const writeUser = async (db: D1Database, user: User) => {
  const userInDb = await db
    .prepare('select * from user where userId = ?')
    .bind(user.userId)
    .first<User>()
  if (userInDb === null) {
    await db
      .prepare('insert into User (userId, screenName) values (?, ?)')
      .bind(user.userId, user.screenName)
      .run()
  }

  return user
}
