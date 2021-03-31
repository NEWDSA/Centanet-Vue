
<template>
  <div class="container">
    <div :class="isshow ? 'panelshow':'panelhide' ">
      <el-form :inline="true" size="medium" label-width="40px">
        <el-row :gutter="2" type="flex" justify="center">
          <el-col :span="4">
            <el-form-item label="名称">
              <el-input />
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="日期">
              <el-date-picker v-model="value1" type="date" placeholder="选择日期" />
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="测试">
              <el-select v-model="value" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="测试">
              <el-input />
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="测试">
              <el-input />
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="测试">
              <el-input />
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 隐藏区域显示 -->
        <el-row v-show="isshow">
          <el-col :span="4">
            <el-form-item label="名称">
              <el-input />
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="日期">
              <el-date-picker v-model="value1" type="date" placeholder="选择日期" />
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="测试">
              <el-select v-model="value" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="测试">
              <el-input />
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="测试">
              <el-input />
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="测试">
              <el-input />
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 查询及筛选项 -->
        <el-row>
          <div class="l_offsets">
            <el-col :span="4" :offset="5">
              <el-button>重置</el-button>
              <el-button type="danger">查询</el-button>
              <el-button @click="changeShow">
                展开
                <i :class="isshow ? 'el-icon-caret-bottom' : 'el-icon-caret-top'" />
              </el-button>
            </el-col>
          </div>
        </el-row>
      </el-form>
    </div>
    <!-- table显示区域 -->
    <div class="table_area">
      <div class="operate">
        <el-button size="mini" type="danger" class="el-icon-plus" @click="resetDateFilter">分块新增</el-button>
        <el-button size="mini" type="danger" class="el-icon-plus" @click="clearFilter">弹窗新增</el-button>
        <el-button size="mini" @click="resetDateFilter">批量删除</el-button>
        <el-button size="mini" @click="clearFilter">批量导入</el-button>
      </div>
      <el-table
        :data="tableData"
        style="width: 100%"
        max-height="300"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column
          fixed
          prop="date"
          label="日期"
          width="180"
        />
        <el-table-column
          prop="name"
          label="姓名"
          width="180"
        />
        <el-table-column
          prop="address"
          label="地址"
        />
        <el-table-column
          prop="address"
          label="地址"
        />
        <el-table-column
          prop="address"
          label="地址"
        />
        <el-table-column
          prop="address"
          label="地址"
        />
        <el-table-column
          prop="address"
          label="地址"
        />
        <el-table-column
          prop="address"
          label="地址"
        />
        <el-table-column
          prop="address"
          label="地址"
        />
        <el-table-column
          prop="address"
          label="地址"
        />
        <el-table-column
          prop="address"
          label="地址"
        />
        <el-table-column
          prop="address"
          label="地址"
        />
        <el-table-column
          prop="address"
          label="地址"
        />
        <el-table-column
          prop="address"
          label="地址"
        />
        <el-table-column
          prop="address"
          label="地址"
        />
        <el-table-column
          prop="address"
          label="地址"
        />
        <el-table-column
          prop="address"
          label="地址"
        />
        <el-table-column
          prop="address"
          label="地址"
        />
        <el-table-column
          prop="address"
          label="地址"
        />
        <el-table-column fixed="right" label="操作" width="120">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="edit">编辑</el-button>
            <el-button
              type="text"
              size="small"
              @click.native.prevent="deleteRow(scope.$index, tableData)"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagenation">
        <el-pagination
          :current-page="currentPage4"
          :page-sizes="[100, 200, 300, 400]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="400"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      options: [
        {
          value: '选项1',
          label: '黄金糕'
        },
        {
          value: '选项2',
          label: '双皮奶'
        },
        {
          value: '选项3',
          label: '蚵仔煎'
        },
        {
          value: '选项4',
          label: '龙须面'
        },
        {
          value: '选项5',
          label: '北京烤鸭'
        }
      ],
      value: '',
      isshow: false,
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }]
    }
  },
  methods: {
    // 显示隐藏项
    changeShow() {
      this.isshow = !this.isshow
    },
    // 删除行数据
    deleteRow(index, rows) {
      rows.splice(index, 1)
    },
    // 打开编辑项
    edit() {
      this.$router.push('edit')
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  position: relative;
  width: 100%;
  height: 100%;
  padding: 23px;
  background: #eeeeee;
  box-sizing: border-box;
  border: 1px solid yellow;
  .l_offsets{
    display: flex;
    justify-content: flex-end;
    padding-right: 28px;
    width: 100%;
  }
  .panelhide {
    width: 100%;
    height: 130px;
    box-sizing: border-box;
    background: #ffffff;
    border: 1px solid #bbbbbb;
    padding-top: 20px;
  }
  .panelshow {
    width: 100%;
    height: 200px;
    box-sizing: border-box;
    background: #ffffff;
    border: 1px solid #bbbbbb;
    padding-top: 20px;
  }
  .table_area{
    position: relative;
    top: 23px;
    width: 100%;
    bottom: 23px;
    height: 100%;
    background: #ffffff;
    .operate{
      position: relative;
      top: 25px;
      left: 10px;
      height: 65px;
    }
    .pagenation{
      position: relative;
      top: 37px;
      float: right;
    }
  }
}
</style>

