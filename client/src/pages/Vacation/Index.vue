<template>
  <div class="content">
    <div class="md-layout md-gutter">
      <div class="md-layout-item">
        <div class="container-layout">

          <available-days />

          <official-vacation />

          <chief />

          <div class="end-column-two">
            <vacation-history />
          </div>

          <request-vacation />

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AvailableDays from './AvailableDays';
import OfficialVacation from './OfficialVacation';
import Chief from './Chief';
import VacationHistory from './VacationHistory';
import RequestVacation from './RequestVacation';

export default {
  name: "Vacation",
  components: {
    AvailableDays,
    OfficialVacation,
    Chief,
    VacationHistory,
    RequestVacation,
  },
  data() {
    return {
    };
  }
};
</script>

<style lang="scss">
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
