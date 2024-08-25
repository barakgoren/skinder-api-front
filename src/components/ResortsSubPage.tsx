import {
  Avatar,
  Button,
  ConfigProvider,
  Divider,
  Switch,
  Table,
  TableColumnsType,
  TableProps,
  Tooltip,
  Typography,
} from "antd";
import React, { useRef, useEffect, useContext, useState } from "react";
import {
  SortDescendingOutlined,
  UserAddOutlined,
  UserDeleteOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { Input } from "antd";
import type { SearchProps } from "antd/es/input/Search";
import { InputRef } from "antd/es/input";
import { LiaUserTieSolid } from "react-icons/lia";
import { AppContext } from "../context/Context";
import { Resort, User } from "../models/models";
import { serverUrl } from "../server";
import Flag from "react-world-flags";
import { FaSkiing } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

type TableRowSelection<T extends object = object> =
  TableProps<T>["rowSelection"];

const ResortsSubPage: React.FC<{}> = (props) => {
  const nav = useNavigate();
  const context = useContext(AppContext);
  const onSearch: SearchProps["onSearch"] = (value, _e) => {
    console.log(value);
  };
  const searchInputRef = useRef<InputRef | null>(null);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

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
    if (context?.resorts.length === 0) {
      console.log("Fetching resorts");
      context?.getAllResorts();
    }
    // eslint-disable-next-line
  }, [context?.resorts]);

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection: TableRowSelection<Resort> = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const handleDelete = async (id: string) => {
    context?.setLoading(true);
    try {
      const response = await axios.delete(`${serverUrl}/api/resorts/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log(response.data);
      // Promise to simulate a delay
      await new Promise((resolve) => setTimeout(resolve, 2000));
      if (response.status === 200) {
        context?.getAllResorts();
      }
    } catch (error) {
      console.error(error);
    } finally {
      context?.setLoading(false);
    }
  };

  const columns: TableColumnsType<Resort> = [
    {
      title: "Name",
      dataIndex: "name",
      render: (name: string, resort: Resort) => {
        return (
          <div className="flex items-center ">
            {resort.iconImage ? (
              <div className="h-7 w-7">
                <img
                  src={`${serverUrl}/api/images/resortsIcons/${resort.iconImage}`}
                  alt="logo"
                  className="w-[100%] h-[100%] object-contain"
                />
              </div>
            ) : (
              <div className="h-7 w-7">
                <FaSkiing size={23} />
              </div>
            )}
            <span className="ms-2">{name}</span>
          </div>
        );
      },
    },
    {
      title: "Country",
      dataIndex: "countryCode",
      render: (countryCode: string) => {
        return (
          <div className="flex items-center">
            <Flag code={countryCode} className="w-7 h-4" />
            <div className="ml-2">{countryCode}</div>
          </div>
        );
      },
    },
    {
      title: "Created By",
      dataIndex: "createdBy",
      render: (createdBy: User) => {
        return (
          <div>
            <Avatar
              src={`${serverUrl}/api/images/resortscovers/banskocover.jpg`}
              size={"small"}
            />
            <span className="ms-2">{createdBy.username}</span>
          </div>
        );
      },
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (item, resort) => {
        return (
          <div>
            <Button
              type="text"
              icon={<EditOutlined />}
              onClick={() => nav(`/admin/resorts/edit/${resort._id}`)}
            />
            <Divider type="vertical" className="bg-gray-300" />
            <Button
              type="text"
              icon={<DeleteOutlined />}
              onClick={() => {
                handleDelete(resort._id);
              }}
            />
          </div>
        );
      },
    },
  ];

  return (
    <div className="h-[100%] py-14">
      <Typography.Title level={2} className="font-poppins font-thin">
        Resorts({context?.resorts.length})
      </Typography.Title>
      <div className="flex justify-between">
        <div className="flex w-[100%]">
          <Input.Search
            placeholder="Press ⌘K to search users"
            onSearch={onSearch}
            style={{ width: "70%" }}
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
          dataSource={context?.resorts}
          scroll={{ y: "60vh" }}
          pagination={{ pageSize: 10 }}
          size="small"
          rowSelection={rowSelection}
          loading={context?.loading}
          rowKey={(record) => record._id}
        />
      </div>
    </div>
  );
};

export default ResortsSubPage;
