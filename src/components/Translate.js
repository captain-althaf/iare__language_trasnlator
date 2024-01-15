import React, { useState, useEffect } from "react";
import { Form, TextArea} from "semantic-ui-react";
import axios from "axios";
import "../Translator.css";


export default function Translate() {
  const [inputText, setInputText] = useState("");
  const [resultText, setResultText] = useState("");
  const [selectedLanguageKey, setLanguageKey] = useState("");
  const [languagesList, setLanguagesList] = useState([]);


  const languageKey = async(e) => {
    // setLanguageKey(e.target.value);
    try {
      const responseOne = await axios.post(`https://libretranslate.de/detect`, {
        q: inputText,
      });

      let data = {
        q: inputText,
        source: responseOne.data[0].language,
        target: e.target.value,
      };

      const response = await axios.post(
        `https://libretranslate.de/translate`,
        data
      );
      setResultText(response.data.translatedText);
    } catch (error) {
      console.error("Error translating text:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://libretranslate.de/languages`);
        setLanguagesList(response.data);
      } catch (error) {
        console.error("Error fetching languages:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{display:"flex",justifyContent:"center"}}>
    <div className="translator-container">
      <div className="app-header">
        <h2 className="header">Translator</h2>
      </div>

      <div className="app-body">
        <Form>
          <Form.Field
            control={TextArea}
            placeholder="Type Text to Translate.."
            onChange={(e) => setInputText(e.target.value)}
          />

          <select className="language-select" onChange={languageKey}>
            <option>Please Select Language..</option>
            {languagesList.map((language) => (
              <option key={language.code} value={language.code}>
                {language.name}
              </option>
            ))}
          </select>

          <Form.Field
            control={TextArea}
            placeholder="Your Result Translation.."
            value={resultText}
          />

         
        </Form>
      </div>
    </div>
    </div>
  );
}
