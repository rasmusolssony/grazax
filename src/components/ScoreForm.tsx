import React from 'react'
import {
  Form,
  HStack,
  VStack,
  TextField,
  Button,
  Box,
  H3,
} from '@northlight/ui'

interface ScoreFormProps {
  addScore: (user: { name: string; score: number }) => void
}

const ScoreForm: React.FC<ScoreFormProps> = ({ addScore }) => {
  const initialValues = { name: '', score: '' }

  const validation = (values: any) => {
    const errors: any = {}
    if (isNaN(parseInt(values.score, 10))) {
      errors.score = {
        message: 'Score must be a number',
      }
    }
    return errors
  }

  return (
    <Form
      initialValues={initialValues}
      onSubmit={(values, methods) => {
        try {
          addScore({ name: values.name, score: parseInt(values.score, 10) })
          methods.reset()
        } catch (error: any) {
          methods.setError('score', { message: error.message })
        }
      }}
      formSettings={{
        mode: 'onSubmit',
      }}
      validate={validation}
    >
      <Box>
        <H3>Add Score</H3>
        <VStack alignItems="flex-start">
          <HStack alignItems="flex-start" w="300px">
            <TextField name="name" label="Name" isRequired={true} />
            <TextField name="score" label="Score" isRequired={true} />
          </HStack>
          <Button type="submit" variant="success">
            Submit
          </Button>
        </VStack>
      </Box>
    </Form>
  )
}

export default ScoreForm
