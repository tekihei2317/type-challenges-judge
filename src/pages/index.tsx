import { Container } from '@chakra-ui/react'
import { DefaultLayout } from '../components/DefaultLayout'

export const IndexPage = () => {
  return (
    <DefaultLayout>
      <Container maxW={'container.xl'}>トップページ</Container>
    </DefaultLayout>
  )
}
