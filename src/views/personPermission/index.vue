<script setup lang="ts">
import { ref, reactive } from "vue";
import { addUser, updateUser, delUser, getList, addTags } from "@/api/crud";

const columns = [
  {
    title: "名字",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "描述",
    dataIndex: "desc",
    key: "desc",
  },
  {
    title: "id",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "标签",
    dataIndex: "tags",
    key: "tags",
  },
  {
    title: "操作",
    key: "action",
  },
];
//搜索框
const search = reactive({
  keyWord: "",
});
//表单
const form = reactive({
  name: "",
  desc: "",
  id: 0,
});
//清空数据
const resetForm = reactive({ ...form });
//表格数据
const tableData = ref([]);
const pagination = ref({
  showSizeChanger: true,
  total: 0,
  current: 1,
  pageSize: 10,
  showTotal: (total: number) => `总 ${total} 条`,
});

//弹框开关
const dialogVisible = ref<boolean>(false);
const openDialog = () => {
  dialogVisible.value = true;
  Object.assign(form, resetForm);
};
//初始化表格数据
const init = async () => {
  const list = await getList({ ...search, ...pagination.value });
  tableData.value = list.data?.data;
  pagination.value.total = list.data?.total;
};
init();
const changeSize = (page: {
  current: number;
  pageSize: number;
  total: number;
}) => {
  ({
    current: pagination.value.current,
    pageSize: pagination.value.pageSize,
    total: pagination.value.total,
  } = page);
  // search.page = page;
  init();
};
//保存 和修改 表格数据
const save = async () => {
  if (form.id) {
    await updateUser(form);
  } else {
    await addUser(form);
  }
  close();
  init();
};
//删除表格数据
const deleteRow = async (row: any) => {
  await delUser({ id: row.id });
  init();
};
//获取 详情
const edit = (row: any) => {
  dialogVisible.value = true;
  Object.assign(form, row);
};
//关闭弹框
const close = () => {
  dialogVisible.value = false;
};
const isShowTag = ref(false);
let tagRow = reactive<{ id: string }>({ id: "" });
const tags = ref([]);
const addTag = (row: any) => {
  isShowTag.value = true;
  tagRow = row;
};
const saveTag = async () => {
  console.log("saveTag", tags, tagRow);
  const res = await addTags({
    tags: tags.value,
    userId: tagRow.id,
  });
  isShowTag.value = false;
  tags.value = [];
};
</script>

<template>
  <div>
    <a-space>
      <a-input placeholder="请输入" v-model:value="search.keyWord" />
      <a-button type="primary" @click="init">搜索</a-button>
      <a-button @click="openDialog">添加</a-button>
    </a-space>
  </div>
  <div style="margin-top: 20px">
    <a-table
      :dataSource="tableData"
      :columns="columns"
      :pagination="pagination"
      @change="changeSize"
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'tags'">
          <span>
            <a-tag v-for="tag in record.tags" :key="tag.id">
              {{ tag.name }}
            </a-tag>
          </span>
        </template>
        <template v-if="column.key === 'action'">
          <span>
            <a @click="edit(record)">编辑</a>
            <a-divider type="vertical" />
            <a @click="deleteRow(record)">删除</a>
            <a-divider type="vertical" />
            <a @click="addTag(record)">添加tag</a>
          </span>
        </template>
      </template>
    </a-table>
  </div>
  <a-modal v-model:open="dialogVisible" title="添加" @ok="save">
    <template #footer>
      <a-button key="back" @click="close">取消</a-button>
      <a-button key="submit" type="primary" @click="save">添加</a-button>
    </template>
    <div>
      <a-form :model="form" autocomplete="off">
        <a-form-item
          label="名字"
          name="name"
          :rules="[{ required: true, message: '请输入名字' }]"
        >
          <a-input v-model:value="form.name" />
        </a-form-item>

        <a-form-item
          label="描述"
          name="desc"
          :rules="[{ required: true, message: '请输入描述' }]"
        >
          <a-input v-model:value="form.desc" />
        </a-form-item>
      </a-form>
    </div>
  </a-modal>

  <a-modal v-model:open="isShowTag" title="添加tag" @ok="saveTag">
    <a-select
      ref="select"
      v-model:value="tags"
      style="width: 100%"
      mode="multiple"
    >
      <a-select-option value="jack">Jack</a-select-option>
      <a-select-option value="lucy">Lucy</a-select-option>
      <a-select-option value="Yiminghe">yiminghe</a-select-option>
    </a-select>
    <template #footer>
      <a-button key="submit" type="primary" @click="saveTag">添加</a-button>
    </template>
  </a-modal>
</template>

<style scoped></style>
