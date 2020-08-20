<template>
  <div class="content">
      <div class="button" @click="handleClick">点击更改 flowData 示例</div>
      <FlowChart :flowData="flowData" :nodeWidth="320" :nodeHeight="180" :showFooter="true" :showContextmenu="true">
        <template v-slot:operator>
          <div class="operator-button">
            Click Save
          </div>
        </template>
        <template v-slot:node-name="scopedProps">
          {{ scopedProps.node.node_info.node_name }}
        </template>
        <template v-slot:node-content="scopedProps">
          {{ scopedProps.node.node_info.node_name }}
        </template>
        <template v-slot:top-right>
          <div class="operator" @click="handleEdit"><img src="./icon/edit.svg"></div>
          <div class="operator"><img src="./icon/del.svg"></div>
        </template>
        <template v-slot:bottom-left>
          😀
        </template>
        <template v-slot:bottom-right>
          <div class="operator"><img src="./icon/setting.svg"></div>
        </template>
      </FlowChart>
      <p><a href="https://github.com/forijk/vue-flow-chart" target="_blank">README</a></p>
      <p><strong>vue-flow-chart-better</strong> by forijk</p>
    </div>
</template>
<script>
export default {
  data() {
    return {
      flowData: [
        [
          {
            node_info: {
              node_name: "根节点根节点根节点根节点根节点根节点根节点根节点",
              node_uuid: "0",
            },
            node_relations: {
              relations: ["1", "2"],
            },
          },
        ],
        [
          {
            node_info: {
              node_name: "二级节点1二级节点1二级节点1二级节点1二级节点1二级节点1二级节点1二级节点1二级节点1二级节点1二级节点1二级节点1二级节点1二级节点1二级节点1二级节点1二级节点1二级节点1二级节点1二级节点1",
              node_uuid: "1",
            },
            node_relations: {
              relations: ["3"],
            },
          },
          {
            node_info: {
              node_name: "二级节点2",
              node_uuid: "2",
            },
            node_relations: {
              relations: ["4", "5"],
            },
          },
        ],
        [
          {
            node_info: {
              node_name: "三级节点1",
              node_uuid: "3",
            },
            node_relations: {
              relations: [],
            },
          },
          {
            node_info: {
              node_name: "三级节点2",
              node_uuid: "4",
            },
            node_relations: {
              relations: [],
            },
          },
          {
            node_info: {
              node_name: "三级节点3",
              node_uuid: "5",
            },
            node_relations: {
              relations: [],
            },
          },
        ],
      ],
    };
  },
  methods: {
    handleEdit() {
      console.log(this.flowData)
    },
    handleClick() {
      // 操作 flowData 示例
      if (this.flowData.length === 3 && this.flowData[2].length > 1) {
        this.flowData[2].splice(this.flowData[2].length - 1, 1)
        this.flowData[1][1].node_relations.relations.splice(this.flowData[1][1].node_relations.relations.length - 1, 1)
      }
      
    }
  }
};
</script>
<style scoped>
.content {
  height: 700px;
  width: 1200px;
  position: absolute;
  left: 50%;
  top: 40%;
  transform: translate(-50%, -40%);
}
.button {
  cursor: pointer;
  color: #409EFF;
  margin-bottom: 20px;
}
.operator {
  display: inline-block;
  margin-left: 4px;
  cursor: pointer;
}
.operator-button {
  color: #fff;
  background-color: #1890ff;
  border-color: #1890ff;
  text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.12);
  box-shadow: 0 2px 0 rgba(0, 0, 0, 0.045);
  display: inline-block;
  font-weight: 400;
  text-align: center;
  border: 1px solid transparent;
  cursor: pointer;
  height: 32px;
  line-height: 32px;
  user-select: none;
  padding: 0 15px;
  font-size: 14px;
  border-radius: 4px;
}
</style>