export interface User {
  _id: number
  name: string
}

export interface Score {
  userId: number
  score: number
}

export interface UserScores {
  bestScore: number
  scores: number[]
}

export interface Ranking {
  name: string
  score: number
}
