import React, { useMemo } from 'react'
import { Box, H3, P } from '@northlight/ui'

interface UserScoresListProps {
  name: string
  scores: number[]
}

const UserScoresList: React.FC<UserScoresListProps> = ({ name, scores }) => {
  const sortedScores = useMemo(
    () => [...scores].sort((a, b) => b - a),
    [scores],
  )

  return (
    <Box>
      <H3>{name}'s Scores</H3>
      {sortedScores.map((score, index) => (
        <P key={index}> {score} </P>
      ))}
    </Box>
  )
}

export default UserScoresList
