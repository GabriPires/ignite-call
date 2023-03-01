import { Button, Text, TextArea, TextInput } from '@ignite-ui/react'
import { CalendarBlank, Clock } from 'phosphor-react'
import { ConfirmForm, FormActions, FormHeader } from './styles'

export const ConfirmStep = () => {
  const handleConfirmScheduling = () => {}
  return (
    <ConfirmForm as={'form'} onSubmit={handleConfirmScheduling}>
      <FormHeader>
        <Text>
          <CalendarBlank />
          01 de março de 2023
        </Text>
        <Text>
          <Clock />
          10:00h
        </Text>
      </FormHeader>

      <label>
        <Text size={'sm'}>Nome completo</Text>
        <TextInput placeholder={'Seu nome'} />
      </label>

      <label>
        <Text size={'sm'}>Endereço de e-mail</Text>
        <TextInput type={'email'} placeholder={'johndoe@example.com'} />
      </label>

      <label>
        <Text size={'sm'}>Obervações</Text>
        <TextArea />
      </label>

      <FormActions>
        <Button type={'button'} variant={'tertiary'}>
          Cancelar
        </Button>
        <Button type={'submit'}>Confirmar</Button>
      </FormActions>
    </ConfirmForm>
  )
}
