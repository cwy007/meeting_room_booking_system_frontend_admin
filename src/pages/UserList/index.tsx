import { useState, useEffect, useCallback } from "react";
import { Form, Input, Button, Table, Tag, Space, Image, Avatar, App } from "antd";
import { SearchOutlined, UserOutlined } from "@ant-design/icons";
import type { TableProps } from "antd";
import type { User, UserListParams } from "./types";
import { getUserList, freezeUser, unfreezeUser } from "./services";

function UserList() {
  const { message, modal } = App.useApp();
  const [form] = Form.useForm<UserListParams>();
  const [data, setData] = useState<User[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(
    async (currentPage: number, currentPageSize: number, filters?: UserListParams) => {
      setLoading(true);
      try {
        const params = { page: currentPage, pageSize: currentPageSize, ...filters };
        const res = await getUserList(params);
        setData(res.data.list);
        setTotal(res.data.totalCount);
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  useEffect(() => {
    fetchData(1, pageSize);
  }, [fetchData, pageSize]);

  const onSearch = () => {
    setPage(1);
    fetchData(1, pageSize, form.getFieldsValue());
  };

  const onReset = () => {
    form.resetFields();
    setPage(1);
    fetchData(1, pageSize);
  };

  const onPageChange = (newPage: number, newPageSize: number) => {
    setPage(newPage);
    setPageSize(newPageSize);
    fetchData(newPage, newPageSize, form.getFieldsValue());
  };

  const handleToggleFreeze = (record: User) => {
    const action = record.isFrozen ? "解冻" : "冻结";
    modal.confirm({
      title: `确认${action}`,
      content: `确定要${action}用户「${record.username}」吗？`,
      okText: "确认",
      cancelText: "取消",
      onOk: async () => {
        const fn = record.isFrozen ? unfreezeUser : freezeUser;
        await fn(record.id);
        message.success(`${action}成功`);
        fetchData(page, pageSize, form.getFieldsValue());
      },
    });
  };

  const columns: TableProps<User>["columns"] = [
    {
      title: "头像",
      dataIndex: "headPic",
      width: 72,
      render: (src: string) =>
        src ? (
          <Image
            width={40}
            height={40}
            src={`http://localhost:3000/${src}`}
            style={{ borderRadius: "50%", objectFit: "cover" }}
          />
        ) : (
          <Avatar icon={<UserOutlined />} />
        ),
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
    {
      title: "操作",
      key: "action",
      render: (_: unknown, record: User) => (
        <Button size="small" danger={!record.isFrozen} onClick={() => handleToggleFreeze(record)}>
          {record.isFrozen ? "解冻" : "冻结"}
        </Button>
      ),
    },
  ];

  // const [boom, setBoom] = useState(false);
  // if (boom) throw new Error("测试错误边界");

  return (
    <div>
      <Form
        form={form}
        layout="inline"
        style={{ marginBottom: 16, display: "flex", flexWrap: "wrap", gap: 16 }}
      >
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
            {/* <Button danger onClick={() => setBoom(true)}>
              触发错误边界 errorElement
            </Button> */}
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
          pageSize,
          pageSizeOptions: [5, 10, 20, 50],
          showSizeChanger: true,
          total,
          showTotal: (t) => `共 ${t} 条`,
          onChange: onPageChange,
        }}
      />
    </div>
  );
}

export default UserList;
