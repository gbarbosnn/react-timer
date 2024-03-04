import { Play } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'

import {
  CouuntdownContainer,
  FormContainer,
  HomeContainer,
  MinutesAmountInput,
  Separator,
  StartCoundownButton,
  TaskInput,
} from './styles'

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informa a tarefa'),
  minutsAmount: zod.number().int().min(5).max(60),
})

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

export function Home() {
  const { register, handleSubmit, watch } = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutsAmount: 5,
    },
  })

  const task = watch('task')
  const isSubimitDisabled = !task

  function handleCreateNewCycle(data: NewCycleFormData) {
    console.log(data)
  }

  return (
    <HomeContainer>
      <form action="" onSubmit={handleSubmit(handleCreateNewCycle)}>
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <TaskInput
            type="text"
            placeholder="Dê um nome para o seu projeto"
            list="task-suggestions"
            {...register('task')}
          />

          <datalist id="task-suggestions">
            <option value="Projeto1"></option>
          </datalist>

          <label htmlFor="minutsAmount">durante:</label>
          <MinutesAmountInput
            type="number"
            placeholder="00"
            step={5}
            min={5}
            max={60}
            {...(register('minutsAmount'), { valueAsNumber: true })}
          />

          <span>minutos.</span>
        </FormContainer>

        <CouuntdownContainer>
          <span>0</span>
          <span>0</span>
          <Separator>:</Separator>
          <span>0</span>
          <span>0</span>
        </CouuntdownContainer>

        <StartCoundownButton disabled={isSubimitDisabled} type="submit">
          <Play size={24} />
          Começar
        </StartCoundownButton>
      </form>
    </HomeContainer>
  )
}
