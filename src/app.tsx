import React, { useEffect, useState, useCallback } from 'react'
import { Container, VStack, HStack, H1 } from '@northlight/ui'
import { ExcelDropzone, ExcelRow } from './components/excel-dropzone.jsx'
import { UserScores } from './types'
import {
  addUserScore,
  addUserScores,
  processInitialUserScores,
  getRankings,
} from './services/userScoreService'
import RankingList from './components/RankingList.jsx'
import UserScoresList from './components/UserScoresList.jsx'
import ScoreForm from './components/ScoreForm.js'

const App: React.FC = () => {
  const [userScores, setUserScores] = useState<Record<string, UserScores>>({})
  const [selectedUser, setSelectedUser] = useState<string | null>(null)

  useEffect(() => {
    setUserScores(processInitialUserScores())
  }, [])

  const addScore = useCallback(
    ({ name, score }: { name: string; score: number }) => {
      setUserScores((prevScores) => addUserScore(prevScores, name, score))
    },
    [],
  )

  function handleSheetData(data: ExcelRow[]) {
    setUserScores((prevScores) => addUserScores(prevScores, data))
  }

  return (
    <Container maxW="6xl" padding="4">
      <H1 marginBottom="4">Mediatool exercise</H1>
      <HStack spacing={10} align="flex-start">
        <VStack align="left">
          <ScoreForm addScore={addScore} />
          <ExcelDropzone
            onSheetDrop={handleSheetData}
            label="Import excel file here"
          />
        </VStack>
        <VStack align="left">
          <RankingList
            rankings={getRankings(userScores)}
            onUserClick={setSelectedUser}
          />
          {selectedUser && userScores[selectedUser] && (
            <UserScoresList
              name={selectedUser}
              scores={userScores[selectedUser].scores ?? []}
            />
          )}
        </VStack>
      </HStack>
    </Container>
  )
}

export default App
