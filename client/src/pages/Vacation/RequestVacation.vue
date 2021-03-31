<template>
  <md-card>
    <md-card-header>
      <h4 class="title">Запросить отпуск</h4>
    </md-card-header>
    <md-card-content>
      <div class="form-layout">
        <div class="md-layout-item">
          <label>Начало</label>
          <md-field>
            <md-input
              type="date"
              name="fromDate"
              id="fromDate"
              v-model="form.fromDate"
              :disabled="sending"
            ></md-input>
          </md-field>
        </div>

        <div class="md-layout-item">
          <label>Конец</label>
          <md-field>
            <md-input
              type="date"
              name="toDate"
              id="toDate"
              v-model="form.toDate"
              :disabled="sending"
            ></md-input>
          </md-field>
        </div>

        <div class="md-layout-item end-column-two">
          <md-field>
            <label>Причина (не обязательно)</label>
            <md-textarea v-model="form.reason" md-autogrow></md-textarea>
          </md-field>
        </div>

        <div class="md-layout-item end-column-two">
          <md-button>Отправить</md-button>
        </div>
      </div>
    </md-card-content>
  </md-card>
</template>

<style lang="scss" scoped>
</style>

<script>
export default {
  name: "RequestVacation",
  data() {
    return {
      form: {
        fromDate: "",
        toDate: "",
        reason: ""
      },

      sending: false,
      error: ""
    }
  }
};
</script>
