import { Button, Input, Select, Upload } from "antd";
import React, { useContext, useState } from "react";
import Flag from "react-world-flags";
import { serverUrl } from "../server";
import { AppContext } from "../context/Context";
import type { GetProp, UploadFile, UploadProps } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { RcFile } from "antd/es/upload";

interface Country {
  value: string;
  label: {
    value: string;
    label: string;
  };
}
const AddResortForm: React.FC<{ countries?: Country[] }> = (props) => {
  const context = useContext(AppContext);
  const [nameValue, setNameValue] = useState<string | undefined>();
  const [countryValue, setCountryValue] = useState<any | undefined>();

  const onChange = (value: string, option: any) => {
    setCountryValue(option.label);
  };
  const handleNameChange = (e: any) => {
    setNameValue(e.target.value);
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    context?.setLoading(true);
    const newBody = {
      name: nameValue,
      countryCode: countryValue.value,
    };
    try {
      const response = await fetch(serverUrl + "/api/resorts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(newBody),
      });
      const data = await response.json();
      console.log(data);
      // Create a 2 second delay with promise to simulate the server response time
      await new Promise((resolve) => setTimeout(resolve, 2000));
      context?.setLoading(false);
      context?.toggleOpen(false);
    } catch (error) {
      context?.setLoading(false);
      console.error(error);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit} className="flex p-6 flex-col space-y-4">
        <div className="flex flex-col">
          <Input
            placeholder="Resort Name"
            allowClear
            onChange={handleNameChange}
            style={{ fontSize: "16px" }}
          />
        </div>
        <Select
          className="w-[100%]"
          showSearch
          allowClear={true}
          placeholder="Filter by country"
          dropdownStyle={{ pointerEvents: "auto" }}
          value={countryValue}
          onChange={onChange}
          options={props.countries}
          maxTagCount="responsive"
          size="large"
          labelRender={(label: any) => (
            <div className="flex items-center">
              <Flag
                code={label.value}
                style={{ height: "16px", marginRight: "0.5rem" }}
              />
              {label.label}
            </div>
          )}
          optionRender={(option: any) => (
            <div className="flex items-center">
              <Flag
                code={option.label.value}
                style={{ height: "16px", marginRight: "0.5rem" }}
              />
              {option.value}
            </div>
          )}
        />
        <Button
          className="bg-blue-500 text-white p-2 rounded"
          type="primary"
          htmlType="submit"
          loading={context?.loading}
        >
          Add Resort
        </Button>
      </form>
    </div>
  );
};

export default AddResortForm;
