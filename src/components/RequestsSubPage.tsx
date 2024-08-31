import {
  Button,
  ConfigProvider,
  Divider,
  Switch,
  Table,
  TableColumnsType,
  TableProps,
  Tag,
  Tooltip,
} from "antd";
import React, { useRef, useEffect, useContext, useState } from "react";
import {
  SortDescendingOutlined,
  UserAddOutlined,
  UserDeleteOutlined,
  EditOutlined,
  ExpandOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import { Input } from "antd";
import type { SearchProps } from "antd/es/input/Search";
import { InputRef } from "antd/es/input";
import { LiaUserTieSolid } from "react-icons/lia";
import { AppContext } from "../context/Context";
import Flag from "react-world-flags";
import { Link } from "react-router-dom";
import { MdDone } from "react-icons/md";
import { serverUrl } from "../server";
import axios from "axios";
import { get } from "http";

type TableRowSelection<T extends object = object> =
  TableProps<T>["rowSelection"];

interface MappedSuggestion {
  _id: string;
  createdBy: string;
  resortName: string;
  countryCode: string;
  createdAt: string;
  status: number;
}

const RequestsSubPage: React.FC<{}> = (props) => {
  const context = useContext(AppContext);
  const onSearch: SearchProps["onSearch"] = (value, _e) => {
    console.log(value);
  };
  const searchInputRef = useRef<InputRef | null>(null);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [resortRequests, setResortRequests] = useState<MappedSuggestion[]>([]);
  const [loading, setLoading] = useState(false);

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
    getResortRequests();
  }, []);

  const getResortRequests = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${serverUrl}/api/request`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const mappedResortRequests = response.data.map((request: any) => {
        return {
          _id: request._id,
          createdBy: request.createdBy.username,
          resortName: request.resort.name,
          countryCode: request.resort.countryCode,
          createdAt: new Date(request.createdAt).toDateString(),
          status: request.isApproved,
        };
      });
      setResortRequests(mappedResortRequests);
      // TODO: Thid practice is not recommended, should set the state in the context instead of making 2 calls
      context?.getResortRequests();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

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
            <Flag code={countryCode} className="h-4 w-7 me-1" />
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
      render: (isApproved: number) => {
        let color = "gold";
        let status = "Pending";
        if (isApproved === 1) {
          color = "green";
          status = "Approved";
        } else if (isApproved === 2) {
          color = "red";
          status = "Rejected";
        } else if (isApproved === 3) {
          color = "purple";
          status = "Deleted";
        }
        return (
          <div>
            <Tag color={color}>{status}</Tag>
          </div>
        );
      },
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (item, obj) => {
        return (
          <div className="flex gap-1">
            <ConfigProvider
              theme={{
                components: {
                  Button: {
                    defaultBg: "#009900",
                    defaultColor: "#fff",
                    defaultActiveBg: "#006600",
                    defaultActiveColor: "#fff",
                    defaultHoverBg: "#008000",
                    defaultHoverColor: "#fff",
                    defaultBorderColor: "#009900",
                    colorBorder: "#009900",
                    defaultActiveBorderColor: "#006600",
                    defaultHoverBorderColor: "#008000",
                  },
                },
              }}
            >
              <Tooltip title="Approve suggestion">
                <Button
                  icon={<MdDone />}
                  disabled={obj.status > 0}
                  onClick={() => handleApprove(obj._id)}
                />
              </Tooltip>
            </ConfigProvider>
            <Link to={`/admin/request/edit/${obj._id}`}>
              <Button
                type="text"
                icon={<EditOutlined />}
                disabled={obj.status > 0}
              />
            </Link>
            <Tooltip title="Preview">
              <Link to={`/admin/request/preview/${obj._id}`}>
                <Button type="text" icon={<ExpandOutlined />} />
              </Link>
            </Tooltip>
          </div>
        );
      },
    },
  ];

  const handleApprove = async (id: string) => {
    setLoading(true);
    try {
      const response = await fetch(`${serverUrl}/api/request/approve/${id}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        getResortRequests();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

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
          <Tooltip title="Refresh">
            <Button
              type="text"
              size="large"
              icon={<SyncOutlined />}
              onClick={getResortRequests}
            />
          </Tooltip>
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
          dataSource={resortRequests}
          scroll={{ y: "60vh" }}
          pagination={{ pageSize: 10 }}
          size="small"
          rowSelection={rowSelection}
          rowKey={(record) => record._id}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default RequestsSubPage;
