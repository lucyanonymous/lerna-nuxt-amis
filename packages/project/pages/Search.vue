<template>
  <AMISContainer>
    <AMISRenderer
      :schema="schema"
      :locals="locals"
      :props="props"
      @ready="ready"
    />
  </AMISContainer>
</template>

<script>
import AMISContainer from '../components/AMISContainer';
import AMISRenderer from '../components/AMISRenderer';

const schema = {
  type: "form",
  name: "theform",
  mode: "horizontal",
  title: "${siteName} Mixed Demo", // siteName 是 AMISRenderer 中 context 定义的
  body: [
    {
      label: "Name",
      type: "input-text",
      name: "name",
    },
    {
      label: "Email",
      type: "input-email",
      required: true,
      placeholder: "请输入邮箱地址",
      name: "email",
    },
  ],
  actions: [
    {
      type: "submit",
      label: "Sumibt",
      primary: true,
    },
    {
      type: "button",
      label: "页面跳转",
      actionType: "link",
      url: "/table?page=2&perPage=10",
    },
    {
      type: "button",
      label: "调用外部",
      onEvent: {
        click: {
          actions: [
            {
              actionType: "broadcast",
              args: {
                eventName: "event-1",
              },
            },
          ],
        },
      },
    },
  ],
};

export default {
  name: 'AMISSearch',
  components: {
    AMISRenderer,
    AMISContainer,
  },
  data: () => ({
    instance: null,
    schema: schema,
    locals: {
      // 传递初始值
      name: "Your Name",
    },
    props: {
      // https://aisuda.bce.baidu.com/amis/zh-CN/docs/extend/ui-library#%E7%9B%91%E5%90%AC%E5%B9%BF%E6%92%AD%E4%BA%8B%E4%BB%B6
      onBroadcast: (type, rawEvent, data) => {
        alert(type);
        console.log(type, rawEvent, data);
      },

      onFinished: (values) => {
        alert("提交成功" + JSON.stringify(values, null, 2));
      },
    },
    isClient: false,
  }),

  methods: {
    ready({ instance }) {
      this.instance = instance;
    },
    reset() {
      this.locals = {
        name: "Reset Name",
      };
    },
    submit() {
      this.instance?.getComponentByName("theform").doAction({
        actionType: "submit",
      });
    },
  },

  mounted() {
    this.isClient = true;
  }
};
</script>

<style scoped>

</style>
