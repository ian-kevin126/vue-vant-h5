<!-- home -->
<template>
  <div class="app">
    <full-calendar
      ref="fullCalendar"
      :config="config"
      :events="events"
      @event-selected="eventClick"
      @day-click="dayClick"
    >
    </full-calendar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      config: {
        firstDay: '0', // 以周日为每周的第一天
        // weekends:true ,  //是否在日历中显示周末
        locale: 'zh-cn', // 语言
        defaultView: 'month', // 默认按月显示
        height: 'auto', // 高度自适应
        fixedWeekCount: false, // 是否固定显示6周
        allDaySlot: false, //
        header: {
          left: 'prev,next,today', //
          center: 'title', //
          right: 'dayGridMonth,timeGridWeek,timeGridDay' //
        }
      },
      events: [
        {
          id: 1, //
          title: '出差', //
          start: '2020-09-02', //
          end: '2020-09-05' //
        },
        {
          id: 2, //
          title: '春游', //
          start: '2020-09-08'
        }
      ],
      eventColor: 'red'
    }
  },

  computed: {},
  methods: {
    eventClick(event) {
      console.log('---------eventClick-------------------')
      console.log('eventClick event', event)
      console.log('----------eventClick------------------')
    },
    dayClick(date, jsEvent, view) {
      console.log('---------dayClick-------------------')
      console.log('dayClick date', date)
      console.log('dayClick jsEvent', jsEvent)
      console.log('dayClick view', view)
      console.log('---------dayClick-------------------')
    }
  },
  created() {},
  mounted() {}
}
</script>
<style lang="scss" scoped></style>
