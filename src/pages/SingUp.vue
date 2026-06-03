<template>
  <div class="window-height window-width flex flex-center bg-grey-2 q-pa-md">

    <q-card class="q-pa-md shadow-3 my-card" bordered>

      <q-card-section class="text-center">
        <q-avatar size="70px" color="primary" text-color="white" class="q-mb-sm shadow-2">
          <q-icon name="person_add" />
        </q-avatar>
        <div class="text-h5 text-weight-bolder text-primary">Criar Conta</div>
        <div class="text-subtitle2 text-grey-6">Preencha os dados abaixo para se cadastrar</div>
      </q-card-section>

      <q-card-section>
        <q-form
        @submit.prevent="onSubmit"
        @reset="onReset"
        class="q-gutter-md">

          <div class="row q-col-gutter-md">

            <div class="col-12 col-sm-6">
              <q-input outlined v-model="nome" label="Nome completo *" color="primary">
                <template v-slot:prepend><q-icon name="person" color="primary" /></template>
              </q-input>
            </div>

            <div class="col-12 col-sm-6">
              <q-input outlined v-model="cpf" mask="###.###.###-##" label="CPF *" color="primary" lazy-rules :rules="[ validarCPF ]">
                <template v-slot:prepend><q-icon name="badge" color="primary" /></template>
              </q-input>
            </div>

            <div class="col-12 col-sm-6">
              <!-- <q-input outlined v-model="dtNascimento" mask="##/##/####" label="Data de nascimento" color="primary">
                <template v-slot:prepend><q-icon name="event" color="primary" /></template>
              </q-input> -->
              <q-input
                outlined
                v-model="dtNascimento"
                label="Data de Nascimento"
                mask="##/##/####"
                color="primary"
                lazy-rules
                :rules="[val => !!val || 'Campo obrigatório']"
              >
                <template v-slot:prepend>
                  <q-icon name="event" color="primary" class="cursor-pointer">
                    <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                        <q-date v-model="dtNascimento" mask="DD/MM/YYYY">
                          <div class="row items-center justify-end">
                            <q-btn v-close-popup label="Fechar" color="primary" flat />
                          </div>
                        </q-date>
                      </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
            </div>

            <div class="col-12 col-sm-6">
              <q-input outlined v-model="telefone" mask="(##) #####-####" label="Telefone" color="primary">
                <template v-slot:prepend><q-icon name="phone" color="primary" /></template>
              </q-input>
            </div>

            <div class="col-12 col-sm-12">
              <q-input outlined v-model="email" label="E-mail *" color="primary" type="email">
                <template v-slot:prepend><q-icon name="email" color="primary" /></template>
              </q-input>
            </div>

             <div class="col-12 col-sm-12">
              <q-input outlined v-model="discordId" label="ID do Discord" color="primary" type="text">
                <template v-slot:prepend><q-icon name="discord" color="primary" /></template>
              </q-input>
            </div>

            <div class="col-12 col-sm-6">
              <q-input
                outlined
                v-model="password"
                label="Senha *"
                :type="isPwd ? 'password' : 'text'"
                color="primary"
              >
                <template v-slot:prepend><q-icon name="lock" color="primary" /></template>
                <template v-slot:append>
                  <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer text-grey-6" @click="isPwd = !isPwd" />
                </template>
              </q-input>
            </div>

            <div class="col-12 col-sm-6">
              <q-input
                outlined
                v-model="passwordConfirmar"
                label="Confirmar senha *"
                :type="isPwdConfirm ? 'password' : 'text'"
                color="primary"
              >
                <template v-slot:prepend><q-icon name="lock" color="primary" /></template>
                <template v-slot:append>
                  <q-icon :name="isPwdConfirm ? 'visibility_off' : 'visibility'" class="cursor-pointer text-grey-6" @click="isPwdConfirm = !isPwdConfirm" />
                </template>
              </q-input>
            </div>

          </div>

          <div class="q-mt-xl">
            <q-btn
              unelevated
              size="lg"
              color="primary"
              class="full-width text-weight-bold"
              label="Finalizar Cadastro"
              type="submit"
            />
          </div>

          <div class="text-center q-mt-md">
            <span class="text-grey-8">Já tem uma conta?</span>
            <q-btn
              flat
              color="primary"
              label="Entrar"
              class="q-ml-sm text-weight-bold"
              :to="{ name: 'singIn' }"
            />
          </div>

        </q-form>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import usuariosService from 'src/services/usuarios'
import { ref } from 'vue'
import { useQuasar } from 'quasar'

export default {
  setup () {
    const { post } = usuariosService()
    const $q = useQuasar()

    // Campos do formulário
    const nome = ref(null)
    const cpf = ref(null)
    const dtNascimento = ref(null)
    const genero = ref(null)
    const telefone = ref(null)
    const email = ref(null)
    const discordId = ref(null)
    const password = ref(null)
    const passwordConfirmar = ref(null)

    // Controle de visibilidade das senhas
    const isPwd = ref(true)
    const isPwdConfirm = ref(true)

    function validarCPF (val) {
      if (!val) return 'Campo obrigatório'

      const cpfLimpo = val.replace(/\D/g, '')

      if (cpfLimpo.length !== 11) return 'CPF inválido'
      if (/^(\d)\1{10}$/.test(cpfLimpo)) return 'CPF inválido'

      let soma = 0
      let resto

      // Primeiro dígito
      for (let i = 1; i <= 9; i++) {
        soma += parseInt(cpfLimpo.substring(i - 1, i)) * (11 - i)
      }

      resto = (soma * 10) % 11
      if (resto === 10 || resto === 11) resto = 0

      if (resto !== parseInt(cpfLimpo.substring(9, 10))) {
        return 'CPF inválido'
      }

      // Segundo dígito
      soma = 0

      for (let i = 1; i <= 10; i++) {
        soma += parseInt(cpfLimpo.substring(i - 1, i)) * (12 - i)
      }

      resto = (soma * 10) % 11
      if (resto === 10 || resto === 11) resto = 0

      if (resto !== parseInt(cpfLimpo.substring(10, 11))) {
        return 'CPF inválido'
      }

      return true
    }

    function onlyDigits (str) {
      return String(str || '').replace(/\D+/g, '')
    }

    function formatDateToIsoDateOnly (value) {
      if (!value) return null

      const [day, month, year] = value.split('/')

      if (!day || !month || !year) return value

      return `${year}-${month}-${day}`
    }

    const cadastroUsuarios = async () => {
      try {
        const usuario = {
          nome: nome.value,
          cpf: onlyDigits(cpf.value),
          dataNascimento: formatDateToIsoDateOnly(dtNascimento.value),
          telefone: onlyDigits(telefone.value),
          email: email.value,
          discordId: discordId.value,
          senha: password.value
        }

        await post(usuario)

        $q.notify({
          message: 'Usuário cadastrado com sucesso!',
          color: 'positive'
        })

        onReset()
      } catch (error) {
        console.error(error)

        $q.notify({
          message: 'Erro ao cadastrar usuário',
          color: 'negative'
        })
      }
    }

    const onSubmit = async () => {
      if (password.value !== passwordConfirmar.value) {
        $q.notify({
          message: 'As senhas não são iguais',
          color: 'negative'
        })
        return
      }

      await cadastroUsuarios()
    }

    const onReset = () => {
      nome.value = null
      cpf.value = null
      dtNascimento.value = null
      genero.value = null
      telefone.value = null
      email.value = null
      discordId.value = null
      password.value = null
      passwordConfirmar.value = null
    }

    return {
      nome,
      cpf,
      dtNascimento,
      genero,
      telefone,
      email,
      discordId,
      password,
      passwordConfirmar,
      isPwd,
      isPwdConfirm,
      validarCPF,
      cadastroUsuarios,
      onSubmit,
      onReset
    }
  }
}
</script>

<style lang="sass" scoped>
/* O card de cadastro precisa ser um pouco mais largo que o de login para caber as duas colunas confortavelmente */
.my-card
  width: 100%
  max-width: 750px
  border-radius: 16px
  background-color: #ffffff
</style>
