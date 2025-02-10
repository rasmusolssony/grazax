import { UserScores, Ranking } from '../types.js'
import users from '../data/users.js'
import scores from '../data/scores.js'
import { ExcelRow } from '../components/excel-dropzone.jsx'

export const processInitialUserScores = (): Record<string, UserScores> => {
  // Create a temporary map to help map users and scores
  const tempMap: Record<number, { name: string; scores: number[] }> = {}

  // Add users
  users.forEach(({ _id, name }) => {
    if (!tempMap[_id]) {
      tempMap[_id] = { name: name, scores: [] }
    }
  })

  // Add scores
  scores.forEach(({ userId, score }) => {
    // Make sure user id exists
    if (!tempMap[userId]) {
      console.error(`User with id: ${userId} doesn't exist`)
      return
    }
    tempMap[userId].scores.push(score)
  })
  // Create a map with user scores
  const userScoresMap: Record<string, UserScores> = {}
  Object.values(tempMap).forEach(({ name, scores }) => {
    userScoresMap[name] = { scores: scores, bestScore: Math.max(...scores) }
  })
  return userScoresMap
}

// Add user scores and returns a sorted list based on the users best score
export const addUserScore = (
  userScoresMap: Record<string, UserScores>,
  name: string,
  score: number,
): Record<string, UserScores> => {
  const result = { ...userScoresMap }
  // Check if the user already exists
  if (result[name]) {
    // Update existing user
    result[name].scores.push(score)
    result[name].bestScore = Math.max(result[name].bestScore, score)
  } else {
    // Add a new user if not found
    result[name] = {
      bestScore: score,
      scores: [score],
    }
  }
  return result
}

export const addUserScores = (
  userScoresMap: Record<string, UserScores>,
  data: ExcelRow[],
): Record<string, UserScores> => {
  const result = { ...userScoresMap }

  // Process all rows of data
  data.forEach(({ name, score }) => {
    if (result[name]) {
      // Update existing user
      result[name] = {
        scores: [...result[name].scores, score],
        bestScore: Math.max(result[name].bestScore, score),
      }
    } else {
      // Add new user if not found
      result[name] = {
        bestScore: score,
        scores: [score],
      }
    }
  })

  return result
}

// Sort list of user scores based on best score
export const getRankings = (
  userScoresMap: Record<string, UserScores>,
): Ranking[] => {
  return Object.keys(userScoresMap)
    .map((name) => ({ name: name, score: userScoresMap[name].bestScore }))
    .sort((a, b) => b.score - a.score)
}
