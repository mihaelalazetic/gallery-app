import ReactFlagsSelect from "react-flags-select";
import { useTranslation } from "react-i18next";
const langMap: { [key: string]: string } = {
  MK: "mk",
  GB: "en",
};

const LanguageChanger = () => {
  /**
   * ======================================================================
   * STATES, VARIABLES START
   * ======================================================================
   */
  const { i18n } = useTranslation();
  /**
   * ======================================================================
   * STATES, VARIABLES END
   * ======================================================================
   */
  //========================================================================================
  /**
   * ======================================================================
   * FUNCTIONS START
   * ======================================================================
   */
  const currentLanguage =
    Object.keys(langMap).find((key) => langMap[key] === i18n.language) || "GB";

  const handleLanguageChange = (code: string) => {
    const language = langMap[code] || "en";
    i18n.changeLanguage(language);
  };
  /**
   * ======================================================================
   * FUNCTIONS END
   * ======================================================================
   */
  return (
    <ReactFlagsSelect
      selected={currentLanguage}
      onSelect={handleLanguageChange}
      countries={["MK", "GB"]}
      customLabels={{
        MK: "",
        GB: "",
      }}
      showOptionLabel={false}
      placeholder=""
      showSelectedLabel={false}
      className="languageSelect"
    />
  );
};

export default LanguageChanger;
