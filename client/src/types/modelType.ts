export interface userInterface {
  _id: string | null
  accessToken: string | null
  refreshToken: string | null
}

export interface postInterface {
  _id: string
  title: string
  content: string
  userId: {
    _id?: string
    password?: string
    username: string
    createdAt: string
    updatedAt: string
  }
  createdAt: Date
  updatedAt: Date
}
