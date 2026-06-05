<script setup lang="ts">
import { ref, onMounted, h } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { Search, Plus, Edit, Delete } from "@element-plus/icons-vue";
import { PureTableBar } from "@/components/RePureTableBar";
import { getUserList, deleteUser, type UserInfo } from "@/api/system";

defineOptions({ name: "SystemUser" });

const loading = ref(true);
const tableData = ref<UserInfo[]>([]);

// 表格列配置
const columns: TableColumnList = [
  {
    label: "ID",
    prop: "id",
    width: 80
  },
  {
    label: "用户名",
    prop: "username",
    minWidth: 120
  },
  {
    label: "手机号",
    prop: "mobile",
    minWidth: 120
  },
  {
    label: "城市",
    prop: "city",
    minWidth: 120
  },
  {
    label: "允许登录",
    prop: "isAllowLogin",
    width: 100,
    align: "center",
    cellRenderer: ({ row }: { row: UserInfo }) =>
      h("span", row.isAllowLogin === 1 ? "是" : "否")
  },
  {
    label: "操作",
    width: 160,
    fixed: "right",
    slot: "operation"
  }
];

// 获取用户列表
const fetchData = async () => {
  loading.value = true;
  try {
    const { data } = await getUserList();
    tableData.value = data || [];
  } catch (error) {
    console.error("获取用户列表失败:", error);
    ElMessage.error("获取用户列表失败");
  } finally {
    loading.value = false;
  }
};

// 搜索
const handleSearch = () => {
  fetchData();
};

// 新增用户
const handleAdd = () => {
  ElMessage.info("新增用户功能开发中");
};

// 编辑用户
const handleEdit = (row: UserInfo) => {
  ElMessage.info(`编辑用户: ${row.username}`);
};

// 删除用户
const handleDelete = async (row: UserInfo) => {
  try {
    await ElMessageBox.confirm(
      `确定要删除用户 "${row.username}" 吗？`,
      "提示",
      {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }
    );
    const { code, message } = await deleteUser(row.id);
    if (code === 1) {
      ElMessage.success(message || "删除成功");
      fetchData();
    } else {
      ElMessage.error(message || "删除失败");
    }
  } catch (error) {
    if (error !== "cancel") {
      console.error("删除用户失败:", error);
      ElMessage.error("删除用户失败");
    }
  }
};

// 刷新
const handleRefresh = () => {
  fetchData();
};

onMounted(() => {
  fetchData();
});
</script>

<template>
  <div class="p-4">
    <PureTableBar title="用户列表" :columns="columns" @refresh="handleRefresh">
      <template #buttons>
        <el-button type="primary" @click="handleSearch">
          <el-icon class="mr-1"><Search /></el-icon>
          搜索
        </el-button>
        <el-button type="primary" @click="handleAdd">
          <el-icon class="mr-1"><Plus /></el-icon>
          新增
        </el-button>
      </template>
      <template #default="{ size, dynamicColumns }">
        <pure-table
          row-key="id"
          :size="size"
          :loading="loading"
          :columns="dynamicColumns"
          :data="tableData"
        >
          <template #operation="{ row }">
            <el-button link type="primary" :size="size" @click="handleEdit(row)">
              <el-icon class="mr-1"><Edit /></el-icon>
              编辑
            </el-button>
            <el-button
              link
              type="danger"
              :size="size"
              @click="handleDelete(row)"
            >
              <el-icon class="mr-1"><Delete /></el-icon>
              删除
            </el-button>
          </template>
        </pure-table>
      </template>
    </PureTableBar>
  </div>
</template>
