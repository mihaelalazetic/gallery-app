// src/components/LanguageSwitcher.tsx

import { DownOutlined } from "@ant-design/icons";
import { Select } from "antd";
import ReactCountryFlag from "react-country-flag";
import { useTranslation } from "react-i18next";

const LANGS = [
  { code: "en", name: "English", countryCode: "GB" },
  { code: "mk", name: "Македонски", countryCode: "MK" },
];

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  // default to 'en' if nothing else
  const current = LANGS.find((l) => l.code === i18n.language)?.code || "en";

  const handleChange = (val: string) => {
    i18n.changeLanguage(val);
  };

  return (
    <Select
      value={current}
      onChange={handleChange}
      suffixIcon={<DownOutlined />}
      dropdownMatchSelectWidth={false}
      style={{
        // width: 120,
        border: "none",
        background: "transparent",
        color: "inherit",
      }}
    >
      {LANGS.map(({ code, name, countryCode }) => (
        <Select.Option key={code} value={code}>
          <span>
            <ReactCountryFlag
              countryCode={countryCode}
              svg
              style={{ width: "1.2em", height: "1.2em" }}
            />
          </span>
          {/* {name} */}
        </Select.Option>
      ))}
    </Select>
  );
}
