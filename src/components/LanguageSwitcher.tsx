import { Select } from "antd";
import { useTranslation } from "react-i18next";

const { Option } = Select;

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const handleChange = (value: string) => {
    i18n.changeLanguage(value);
  };

  return (
    <Select
      defaultValue={i18n.language}
      onChange={handleChange}
      bordered={false}
    >
      <Option value="en">🇬🇧</Option>
      <Option value="mk">🇲🇰</Option>
    </Select>
  );
};

export default LanguageSwitcher;
