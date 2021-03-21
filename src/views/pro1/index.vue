<template>
  <div class="three-content" id="three-dom"></div>
</template>
<script>
import ThreeMap from "./ThreeMap.js";
import { ThreeData } from "./ThreeData.js";
export default {
  name: "index",
  created() {},
  mounted() {
    // co
    let props={domID:"three-dom"}
        this.map = new ThreeMap(props,ThreeData);
        this.map.init();
  },
  data() {
    return {};
  },
  methods: {
    set: function() {
      (this.equipmentList = []), //告警的
        (this.equipmentList1 = []), //解除告警的
        (this.dialogVisible = true);
    },
    sure: function() {
      let back = [];
      for (let i = 0; i < this.equipment.length; i++) {
        for (let j = 0; j < this.equipmentList.length; j++) {
          if (this.equipmentList[j] == this.equipment[i].id) {
            let obj = JSON.parse(JSON.stringify(this.equipment[i]));
            obj.isalarm = true;
            obj.level = this.alarm[i];
            obj.alarmInfo = "温度过高告警";
            back.push(obj);
          }
        }
        for (let m = 0; m < this.equipmentList1.length; m++) {
          if (this.equipmentList1[m] == this.equipment[i].id) {
            back.push(this.equipment[i]);
          }
        }
      }
      console.log(back);
      this.map.updateAlarmStatus(back);
      this.dialogVisible = false;
    },
  },
  components: {},
};
</script>
<style lang="less" scoped></style>
