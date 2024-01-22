import React, { useState } from "react";
import "./App.css";

type LongestCommonPrefixProps = {
  onCalculate: (inputStrings: string[]) => void;
};

const LongestCommonPrefixComponent: React.FC<LongestCommonPrefixProps> = ({
  onCalculate,
}) => {
  const [inputStrings, setInputStrings] = useState<string[]>([]);
  var [valueInput, setValueInput] = useState<string[]>([]);

  const handleInputChange = (e: any) => {
    const inputValue = e.target.value;
    setValueInput(inputValue.replace(/[^a-z,\s]/g, ""));
    const stringsArray = inputValue
      .replace(/[^a-z,\s]/g, "")
      .split(/\s*,\s*/)
      .map((str: any) => str.trim());
    setInputStrings(stringsArray);
  };

  const handleCalculate = () => {
    onCalculate(inputStrings);
  };

  return (
    <div className="contant">
      <div className="card">
        <div className="card-header">
          <h2>ค้นหาคำนำหน้าทวนทำนองยาวที่สุด</h2>
        </div>
        <div className="card-body">
          <div className="input-g">
            <label>กรอกข้อมูล (คั่นด้วย comma):</label>
            <input
              className="ip-t"
              type="text"
              value={valueInput}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <button onClick={handleCalculate}>คำนวณ</button>
      </div>
    </div>
  );
};

function App() {
  const [commonPrefix, setCommonPrefix] = useState<string | undefined>(
    undefined
  );

  const handleCalculate = (inputStrings: string[]): void => {
    const result = longestCommonPrefix(inputStrings);
    setCommonPrefix(result);
  };

  const longestCommonPrefix = (strs: string[]): string => {
    if (strs.length === 0) {
      return "There is no common prefix among the input strings.";
    }

    strs.sort();

    const firstStr = strs[0];
    const lastStr = strs[strs.length - 1];
    let commonPrefix = "";
    for (let i = 0; i < firstStr.length; i++) {
      if (firstStr[i] === lastStr[i]) {
        commonPrefix += firstStr[i];
      } else {
        break;
      }
    }
    commonPrefix === ""
      ? (commonPrefix = "There is no common prefix among the input strings.")
      : (commonPrefix = commonPrefix);

    return commonPrefix;
  };

  return (
    <div>
      <LongestCommonPrefixComponent onCalculate={handleCalculate} />
      {commonPrefix !== undefined && (
        <p className="sol">ผลลัพธ์: {commonPrefix}</p>
      )}
    </div>
  );
}

export default App;
