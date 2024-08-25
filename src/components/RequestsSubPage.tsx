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
import React, { useRef, useEffect, useContext, useState } from "react";
import {
  SortDescendingOutlined,
  UserAddOutlined,
  UserDeleteOutlined,
  EditOutlined,
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
import { Link } from "react-router-dom";

type TableRowSelection<T extends object = object> =
  TableProps<T>["rowSelection"];

interface MappedSuggestion {
  _id: string;
  createdBy: string;
  resortName: string;
  countryCode: string;
  createdAt: string;
  status: string;
}

const RequestsSubPage: React.FC<{}> = (props) => {
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
    // eslint-disable-next-line
  }, []);

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection: TableRowSelection<MappedSuggestion> = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const columns: TableColumnsType<MappedSuggestion> = [
    {
      title: "Created By",
      dataIndex: "createdBy",
    },
    {
      title: "Name of Resort",
      dataIndex: "resortName",
    },
    {
      title: "Country",
      dataIndex: "countryCode",
      render: (countryCode: string) => {
        return (
          <div className="flex items-center">
            <Flag code={countryCode} className="h-4 w-7 me-1"/>
            {countryCode}
          </div>
        );
      },
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (status: string) => {
        return (
          <div>
            <Tag
              color={status === "Pending" ? "orange" : "green"}
              className="text-white"
            >
              {status}
            </Tag>
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
            <Typography.Link>
              <Link to="/">Edit</Link>
            </Typography.Link>
            <Divider type="vertical" className="bg-gray-600" />
            <Typography.Link>
              <span className="text-red-400">Delete</span>
            </Typography.Link>
          </div>
        );
      },
    },
  ];

  const dataSource: MappedSuggestion[] = [
    {
      _id: "1",
      createdBy: "John Doe",
      resortName: "Resort 1",
      countryCode: "US",
      createdAt: "2021-10-10",
      status: "Pending",
    },
    {
      _id: "2",
      createdBy: "Jane Doe",
      resortName: "Resort 2",
      countryCode: "CA",
      createdAt: "2021-10-10",
      status: "Approved",
    },
  ];

  return (
    <div className="h-[100%] py-14">
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
          dataSource={dataSource}
          scroll={{ y: "60vh" }}
          pagination={{ pageSize: 10 }}
          size="small"
          rowSelection={rowSelection}
          rowKey={(record) => record._id}
        />
      </div>
    </div>
  );
};

export default RequestsSubPage;
