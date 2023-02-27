import { api } from '@/lib/axios'
import { BuildNextAuthOptions } from '@/pages/api/auth/[...nextauth].api'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Avatar,
  Button,
  Heading,
  MultiStep,
  Text,
  TextArea,
} from '@ignite-ui/react'
import { GetServerSideProps } from 'next'
import { getServerSession } from 'next-auth'
import { useSession } from 'next-auth/react'
import { ArrowRight } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Container, Header } from '../styles'
import { FormAnnotation, ProfileBox } from './styles'

const updateProfileFormSchema = z.object({
  bio: z.string(),
})

type UpdateProfileFormData = z.infer<typeof updateProfileFormSchema>

const UpdateProfile = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<UpdateProfileFormData>({
    resolver: zodResolver(updateProfileFormSchema),
  })

  const session = useSession()

  const handleUpdateProfile = async (data: UpdateProfileFormData) => {
    console.log(data)
    await api.put('/users/profile', {
      bio: data.bio,
    })
  }

  return (
    <Container>
      <Header>
        <Heading as={'strong'}>Bem-vindo ao Ignite Call!</Heading>
        <Text>
          Precisamos de algumas informações para criar seu perfil! Ah, você pode
          editar essas informações depois.
        </Text>

        <MultiStep size={4} currentStep={4} />
      </Header>

      <ProfileBox as={'form'} onSubmit={handleSubmit(handleUpdateProfile)}>
        <label>
          <Text size={'sm'}>Foto de perfil</Text>
          <Avatar
            src={session.data?.user.avatar_url}
            referrerPolicy={'no-referrer'}
            alt={session.data?.user.name}
          />
        </label>

        <label>
          <Text size={'sm'}>Sobre você</Text>
          <TextArea {...register('bio')} />
          <FormAnnotation size={'sm'}>
            Fale um pouco sobre você. Isto será exibido em sua página pessoal.
          </FormAnnotation>
        </label>

        <Button type={'submit'} disabled={isSubmitting}>
          Finalizar <ArrowRight />
        </Button>
      </ProfileBox>
    </Container>
  )
}

export default UpdateProfile

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getServerSession(
    req,
    res,
    BuildNextAuthOptions(req, res),
  )

  return {
    props: { session },
  }
}
