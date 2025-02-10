import React from 'react'
import { Box, H3, P } from '@northlight/ui'
import { Ranking } from '../types.js'

interface RankingListProps {
  rankings: Ranking[]
  onUserClick: (name: string) => void
}

const RankingList: React.FC<RankingListProps> = ({ rankings, onUserClick }) => {
  return (
    <Box>
      <H3>Rankings</H3>
      {rankings.map((user) => (
        <P
          key={user.name}
          onClick={() => onUserClick(user.name)}
          sx={{ cursor: 'pointer' }}
        >
          <span style={{ fontWeight: 'bold' }}>{user.name + ': '}</span>
          <span>{user.score}</span>
        </P>
      ))}
      <P>Click on a user's name to see their scores</P>
    </Box>
  )
}

export default RankingList
