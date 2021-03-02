<template>
  <div class="content">
    <div class="md-layout md-gutter">
      <div class="md-layout-item">
        <div class="container-layout">
          <md-card>
            <md-card-header :data-background-color="dataBackgroundColor">
              <h4 class="title">Доступно дней</h4>
            </md-card-header>
            <md-card-content>
              <div class="days">9</div>
            </md-card-content>
          </md-card>
          <md-card>
            <md-card-header :data-background-color="dataBackgroundColor">
              <h4 class="title">Официальный отпуск</h4>
            </md-card-header>
            <md-card-content>
              <div class="timeline">
                <div class="timeline-block">
                  <md-icon>date_range</md-icon><span>20 июля 2212</span>
                </div>
                <div class="timeline-connection"><hr></div>
                <div class="timeline-block">
                  <span><md-icon>date_range</md-icon>29 июля 2212</span>
                </div>
              </div>
            </md-card-content>
          </md-card>
          <md-card>
            <md-card-header :data-background-color="dataBackgroundColor">
              <h4 class="title">Линейный руководитель</h4>
            </md-card-header>
            <md-card-content>
              <div class="cheif">
                <span>Петров Петр Петрович</span>
              </div>
            </md-card-content>
          </md-card>
          <div class="end-column-two">
            <md-card>
              <md-card-header :data-background-color="dataBackgroundColor">
                <h4 class="title">История отпусков</h4>
              </md-card-header>
              <md-card-content>
                <div class="history-list">
                  История пуста
                </div>
              </md-card-content>
            </md-card>
          </div>
          <md-card>
            <md-card-header :data-background-color="dataBackgroundColor">
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
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container-layout {
  display: grid;
  grid-template-columns: 4fr 4fr 7fr;
  grid-gap: 1rem;
}

.form-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.end-column-two {
  grid-column-end: span 2;
}

.days {
  font-size: 5rem;
  text-align: center;
  padding: 2rem 0;
}

.cheif {
  font-size: 1.5rem;
}

.timeline {
  display: grid;
  grid-template-columns: 4fr 3fr 4fr;
  column-gap: 0.5rem;
  align-items: center;
  text-align: center;
}

</style>

<script>
export default {
  name: "Vacation",
  data() {
    return {
      dataBackgroundColor: "green",
      form: {
        fromDate: "",
        toDate: "",
        reason: ""
      },

      sending: false,
      error: ""
    };
  }
};
</script>
