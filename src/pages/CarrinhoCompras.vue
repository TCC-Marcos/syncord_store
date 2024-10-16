<template>
  <div class="q-pa-md">
    <q-stepper
      v-model="step"
      flat
      ref="stepper"
      color="primary"
      animated
    >
      <q-step
        :name="1"
        title="Carrinho de Compra"
        icon="person"
        :done="step > 1"
      >
        <div class="row justify-center q-gutter-md">
          <div class="col-md-7 col-lg-8 produtos">
            <div class="row q-pa-md q-gutter-sm" v-for="produto in cart" :key="produto.id">
              <div class="col-md-2 col-lg-1" >
                <q-img class="" :src="`/img/${produto.id}.jpg`" style=""/>
              </div>
              <div class="col-5">
                <div class="q-ma-sm column">
                  <strong  class="text-subtitle2 descricao">{{ produto.descricao }}</strong>
                  <p>Preço </p>
                </div>
              </div>
              <div class="col-3">
                  <div class="row justify-center">
                    <q-btn class="" flat icon="chevron_left"/>
                    <q-input borderless class="q-ml-sm" v-model="produto.quantidade" style="max-width: 20px;"/>
                    <q-btn class="" flat icon="chevron_right"/>
                  </div>
                  <div class="row justify-center">
                  </div>
              </div>
              <div class="col-md-1 col-lg-2" >
                <div class="row justify-end">
                  <strong class="q-mt-sm">{{ (produto.preco*produto.quantidade).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'}) }}</strong>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-4 col-lg-3">

          </div>
        </div>
      </q-step>

      <q-step
        :name="2"
        title="Identificação"
        icon="person"
        :done="step > 2"
      >
        An ad group contains one or more ads which target a shared set of keywords.
      </q-step>

      <q-step
        :name="3"
        title="Pagamento"
        icon="credit_card"
        :done="step > 3"
      >
        This step won't show up because it is disabled.
      </q-step>

      <q-step
        :name="4"
        title="Concluido"
        icon="check"
      >
        Try out different ad text to see what brings in the most customers, and learn how to
        enhance your ads using features like ad extensions. If you run into any problems with
        your ads, find out how to tell if they're running and how to resolve approval issues.
      </q-step>

      <template v-slot:navigation>
        <q-stepper-navigation>
          <q-btn @click="$refs.stepper.next()" color="primary" :label="step === 4 ? 'Finish' : 'Continue'" />
          <q-btn v-if="step > 1" flat color="primary" @click="$refs.stepper.previous()" label="Voltar" class="q-ml-sm" />
        </q-stepper-navigation>
      </template>
    </q-stepper>
  </div>
</template>
<script>
import { ref } from 'vue'
import { useCart } from 'src/composables/UseCart'
export default {
  setup () {
    const { cart } = useCart()
    return {
      step: ref(1),
      cart
    }
  }
}
</script>
<style lang="sass" scoped>
.produtos
  background-color: #F2F2F2
  border-radius: 0.5em
.descricao
  display: -webkit-box
  -webkit-box-orient: vertical
  -webkit-line-clamp: 2 /* Número de linhas que você quer exibir */
  overflow: hidden
  text-overflow: ellipsis
  height: 3em /* Ajuste de acordo com o número de linhas */
</style>
