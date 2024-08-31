import React, { useEffect, useState, useContext } from "react";
import { AutoComplete, Button, Divider, Select } from "antd";
import { FilterFilled } from "@ant-design/icons";
import Flag from "react-world-flags";
import { AppContext } from "../context/Context";
import "react-spring-bottom-sheet/dist/style.css";
import { serverUrl } from "../server";
import { FaSkiing } from "react-icons/fa";

interface Country {
  value: string;
  label: {
    value: string;
    label: string;
  };
}

const Search: React.FC = () => {
  const context = useContext(AppContext);
  const [countryValue, setCountryValue] = useState<string[] | undefined>();
  const [countryList, setCountryList] = useState<Country[]>([]);
  const [resortsNames, setResortsNames] = useState<any>([]);
  const [filteredResortsNames, setFilteredResortsNames] = useState<any>([]);

  const onChangeName = (value: string) => {
    context?.setFilterParams({ ...context.filterParams, name: value });
    setFilteredResortsNames(
      resortsNames.filter((name: any) =>
        name.value.toLowerCase().includes(value.toLowerCase())
      )
    );
  };

  const onChangeCountry = (value: string[], option: any) => {
    const countryCodes = option.map((opt: any) => opt.label.value);
    context?.setFilterParams({
      ...context.filterParams,
      countries: countryCodes,
    });
  };

  useEffect(() => {
    fetchCountries();
    const names = context?.resorts.map((resort) => {
      return { value: resort.name, label: resort.name };
    });
    setResortsNames(names);
    setFilteredResortsNames(names);
  }, [context?.resorts]);

  const fetchCountries = async () => {
    try {
      const response = await fetch(
        "https://restcountries.com/v3.1/all?fields=name,cca2"
      );
      const data = await response.json();
      const countries = data.map((country: any) => {
        return {
          value: country.name.common,
          label: {
            value: country.cca2,
            label: country.name.common,
          },
        };
      });
      setCountryList(countries);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <div className="flex md:h-8 items-center flex-wrap">
        <div className="flex-grow md:max-w-[45%] w-[100%] mb-1 md:mb-0">
          <AutoComplete
            size="large"
            options={context?.resorts}
            style={{ width: "100%" }}
            placeholder="Search by resort name"
            onSearch={onChangeName}
            optionRender={(option: any) => (
              <div className="flex items-center">
                {option.data.logo ? (
                  <img
                    src={`${serverUrl}/api/images/resortsIcons/${option.data.logo}`}
                    alt={option.data.name}
                    className="w-8 h-8 rounded me-2 object-scale-down"
                  />
                ) : (
                  <FaSkiing className="w-6 h-6 text-xl me-2" />
                )}
                {option.data.name}
              </div>
            )}
          />
        </div>
        {window.innerWidth > 768 && (
          <Divider type="vertical" className="bg-gray-400 h-[85%]" />
        )}
        <div className="flex-grow">
          <Select
            size="large"
            className="w-[100%]"
            showSearch
            mode="tags"
            allowClear={true}
            placeholder="Filter by country"
            value={countryValue}
            onChange={onChangeCountry}
            options={countryList}
            maxTagCount="responsive"
            labelRender={(label: any) => (
              <div className="flex items-center">
                <Flag
                  code={label.label.value}
                  style={{ height: "16px", marginRight: "0.5rem" }}
                />
                {label.value}
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
        </div>
        <Button type="text" icon={<FilterFilled />} />
      </div>
    </div>
  );
};

export default Search;
