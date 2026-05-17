import { useState, useEffect, useCallback } from "react";
import { Form, Input, Button, Table, Tag, Space, Avatar } from "antd";
import { SearchOutlined, UserOutlined } from "@ant-design/icons";
import type { TableProps } from "antd";
import type { User, UserListParams } from "./types";
import { getUserList } from "./services";

const PAGE_SIZE = 10;

function UserList() {
  const [form] = Form.useForm<UserListParams>();
  const [data, setData] = useState<User[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(async (currentPage: number, filters?: UserListParams) => {
    setLoading(true);
    try {
      const params = { page: currentPage, pageSize: PAGE_SIZE, ...filters };
      const res = await getUserList(params);
      setData(res.data.list);
      setTotal(res.data.totalCount);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData(1);
  }, [fetchData]);

  const onSearch = () => {
    setPage(1);
    fetchData(1, form.getFieldsValue());
  };

  const onReset = () => {
    form.resetFields();
    setPage(1);
    fetchData(1);
  };

  const onPageChange = (newPage: number) => {
    setPage(newPage);
    fetchData(newPage, form.getFieldsValue());
  };

  const columns: TableProps<User>["columns"] = [
    {
      title: "头像",
      dataIndex: "headPic",
      width: 72,
      render: (src: string) => (src ? <Avatar src={src} /> : <Avatar icon={<UserOutlined />} />),
    },
    { title: "用户名", dataIndex: "username" },
    { title: "昵称", dataIndex: "nickName" },
    { title: "邮箱", dataIndex: "email" },
    { title: "手机号", dataIndex: "phoneNumber" },
    {
      title: "状态",
      dataIndex: "isFrozen",
      render: (isFrozen: boolean) =>
        isFrozen ? <Tag color="error">已冻结</Tag> : <Tag color="success">正常</Tag>,
    },
    {
      title: "注册时间",
      dataIndex: "createTime",
      render: (val: string) => new Date(val).toLocaleDateString("zh-CN"),
    },
  ];

  return (
    <div>
      <Form form={form} layout="inline" style={{ marginBottom: 16 }}>
        <Form.Item name="username" label="用户名">
          <Input placeholder="请输入用户名" allowClear />
        </Form.Item>
        <Form.Item name="nickName" label="昵称">
          <Input placeholder="请输入昵称" allowClear />
        </Form.Item>
        <Form.Item name="email" label="邮箱">
          <Input placeholder="请输入邮箱" allowClear />
        </Form.Item>
        <Form.Item>
          <Space>
            <Button type="primary" icon={<SearchOutlined />} onClick={onSearch}>
              搜索
            </Button>
            <Button onClick={onReset}>重置</Button>
          </Space>
        </Form.Item>
      </Form>

      <Table<User>
        rowKey="id"
        columns={columns}
        dataSource={data}
        loading={loading}
        pagination={{
          current: page,
          pageSize: PAGE_SIZE,
          total,
          showTotal: (t) => `共 ${t} 条`,
          onChange: onPageChange,
        }}
      />
    </div>
  );
}

export default UserList;
