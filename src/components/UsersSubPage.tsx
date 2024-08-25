import {
  Avatar,
  Button,
  ConfigProvider,
  Divider,
  Switch,
  Table,
  TableColumnsType,
  TableProps,
  Tag,
  Tooltip,
  Typography,
} from "antd";
import React, { useRef, useEffect, useState, useContext } from "react";
import {
  SortDescendingOutlined,
  EditOutlined,
  UserAddOutlined,
  UserDeleteOutlined,
} from "@ant-design/icons";
import { Input } from "antd";
import type { SearchProps } from "antd/es/input/Search";
import { InputRef } from "antd/es/input";
import { IoIosTrendingDown, IoIosTrendingUp } from "react-icons/io";
import { AppContext } from "../context/Context";
import { User } from "../models/models";
import { serverUrl } from "../server";
import { LiaUserTieSolid } from "react-icons/lia";
import { useNavigate } from "react-router-dom";

interface MappedUser {
  _id: string;
  username: string;
  email: string;
  role: string;
  age: number | null;
}

type TableRowSelection<T extends object = object> =
  TableProps<T>["rowSelection"];

const columns: TableColumnsType<MappedUser> = [
  {
    title: "User name",
    dataIndex: "username",
    render: (user: string) => {
      return (
        <div>
          <Avatar
            src={`${serverUrl}/api/images/resortscovers/banskocover.jpg`}
            size={"small"}
          />
          <span className="ms-2">{user}</span>
        </div>
      );
    },
  },
  {
    title: "Age",
    dataIndex: "age",
    render: (age: number) => {
      return (
        <div>
          {age ? (
            <Typography.Text>{age}</Typography.Text>
          ) : (
            <Typography.Text type="secondary">-</Typography.Text>
          )}
        </div>
      );
    },
  },
  {
    title: "Email",
    dataIndex: "email",
    render: (email: string) => {
      return (
        <div>
          {email ? (
            <Typography.Link>{email}</Typography.Link>
          ) : (
            <Typography.Text type="secondary">-</Typography.Text>
          )}
        </div>
      );
    },
  },
  {
    title: "Role",
    dataIndex: "role",
    render: (role: string) => {
      return (
        <div>
          {role === "Admin" ? (
            <Tag color="red">Admin</Tag>
          ) : (
            <Tag color="blue">User</Tag>
          )}
        </div>
      );
    },
  },
  {
    title: "Actions",
    dataIndex: "actions",
    render: () => {
      return (
        <div>
          <Typography.Link>Edit</Typography.Link>
          <Divider type="vertical" className="bg-gray-600" />
          <Typography.Link>
            <span className="text-red-400">Delete</span>
          </Typography.Link>
          <Divider type="vertical" className="bg-gray-600" />
          <Typography.Link>Set as Admin</Typography.Link>
        </div>
      );
    },
  },
];

const UsersSubPage: React.FC<{}> = (props) => {
  const context = useContext(AppContext);
  const nav = useNavigate();
  const searchInputRef = useRef<InputRef | null>(null);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [mappedUsers, setMappedUsers] = useState<MappedUser[]>([]);

  const onSearch: SearchProps["onSearch"] = (value, _e) => {
    console.log(value);
  };

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection: TableRowSelection<MappedUser> = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === "k") {
        event.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    if (!context?.allUsers || context?.allUsers.length === 0) {
      context?.getAllUsers();
    } else {
      const mappedUsers = context.allUsers.map((user: User) => {
        return {
          _id: user._id,
          username: user.username,
          email: user.email,
          role: user.role,
          age: user.dob
            ? new Date().getFullYear() - new Date(user.dob).getFullYear()
            : null,
        };
      });
      setMappedUsers(mappedUsers);
    }
    // eslint-disable-next-line
  }, [context?.allUsers]);

  return (
    <div className="h-[100%] py-14">
      <div className="h-[20%] grid grid-rows-1 grid-cols-3 py-2 gap-4">
        <div className="bg-white rounded-xl flex flex-col items-center p-4">
          <h2 className="text-3xl font-bold font-poppins text-teal-950">
            Users
          </h2>
          <p className="text-xl flex font-light font-poppins text-gray-500 mt-3">
            <b className="font-bold me-1">854</b> Total Users
          </p>
          <p className="text-sm flex font-light font-poppins text-gray-500">
            +258
            <Divider type="vertical" className="bg-red-800 h-[100%]" />
            <span className="text-green-500 flex items-center">
              <IoIosTrendingUp className="me-1" />
              18% growth
            </span>
          </p>
        </div>
        <div className="bg-white rounded-xl flex flex-col items-center p-4">
          <h2 className="text-3xl font-bold font-poppins text-teal-950">
            Resorts
          </h2>
          <p className="text-xl flex font-light font-poppins text-gray-500 mt-3">
            <b className="font-bold me-1">1,345</b> Total Resorts
          </p>
          <p className="text-sm flex font-light font-poppins text-gray-500">
            +134
            <Divider type="vertical" className="bg-red-800 h-[100%]" />
            <span className="text-red-500 flex items-center">
              <IoIosTrendingDown className="me-1" />
              -3% decrease
            </span>
          </p>
        </div>
        <div className="bg-white rounded-xl flex flex-col items-center p-4">
          <h2 className="text-3xl font-bold font-poppins text-teal-950">
            Requests
          </h2>
          <p className="text-xl flex font-light font-poppins text-gray-500 mt-3">
            <b className="font-bold me-1">122</b> Total Requests
          </p>
          <p className="text-sm flex font-light font-poppins text-gray-500">
            +30
            <Divider type="vertical" className="bg-red-800 h-[100%]" />
            <span className="text-green-500 flex items-center">
              <IoIosTrendingUp className="me-1" />
              13% growth
            </span>
          </p>
        </div>
      </div>
      <div className="flex justify-between">
        <div className="flex w-[100%]">
          <Input.Search
            placeholder="Press ⌘K to search users"
            onSearch={onSearch}
            style={{ width: "50%" }}
            size="middle"
            ref={searchInputRef}
          />
        </div>
        <div
          className={`grid grid-flow-col rounded-lg items-center bg-white shadow-md transition-opacity duration-300 ${
            selectedRowKeys.length > 0 ? "opacity-[100%]" : "opacity-0"
          }`}
        >
          <div className="col-span-1">
            <Tooltip title="Edit user">
              <Button
                type="text"
                size="large"
                className="text-blue-500"
                icon={<EditOutlined />}
              />
            </Tooltip>
          </div>
          <Divider className="bg-gray-300 h-[50%] mx-1" type="vertical" />
          <div className="col-span-1">
            <Tooltip title="Delete user">
              <Button
                type="text"
                size="large"
                className="text-red-500"
                icon={<UserDeleteOutlined />}
              />
            </Tooltip>
          </div>
          <Divider className="bg-gray-300 h-[50%] mx-1" type="vertical" />
          <div className="col-span-1">
            <Tooltip title="Add new user">
              <Button
                type="text"
                size="large"
                className="text-blue-500"
                icon={<LiaUserTieSolid size={23} />}
              />
            </Tooltip>
          </div>
        </div>
        <div className="flex justify-end">
          <Tooltip title="Add new user">
            <Button type="text" size="large" icon={<UserAddOutlined />} />
          </Tooltip>
          <Tooltip title="Display as list or blocks">
            <div className="flex items-center align-middle">
              <ConfigProvider
                theme={{
                  token: {
                    colorPrimary: "#14b8a6",
                  },
                }}
              >
                <Switch
                  checkedChildren="List"
                  unCheckedChildren="Blocks"
                  defaultChecked={false}
                />
              </ConfigProvider>
            </div>
          </Tooltip>
          <Tooltip title="Sort by date">
            <Button
              type="text"
              size="large"
              icon={<SortDescendingOutlined />}
            ></Button>
          </Tooltip>
        </div>
      </div>
      <div className="bg-white shadow-xl rounded-xl px-4 py-3 mt-2">
        <Table
          columns={columns}
          dataSource={mappedUsers}
          scroll={{ y: "45vh" }}
          pagination={{ pageSize: 10 }}
          rowSelection={rowSelection}
          rowKey={(record) => record._id}
          onRow={(record) => {
            return {
              onClick: () => {
                nav(`/admin/edit-user/${record._id}`);
              },
            };
          }}
        />
      </div>
    </div>
  );
};

export default UsersSubPage;
