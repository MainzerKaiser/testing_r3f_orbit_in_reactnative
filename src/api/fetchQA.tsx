import * as XLSX from 'xlsx';
import RNFetchBlob from 'rn-fetch-blob';
import { decode } from 'base64-arraybuffer'; // Import base64 decoder

type SheetName = string;
type Index = number;
type FileName = string;

export interface XLSXData {
    questions: { question: string; difficulty: string }[];
    letter4: string[][];
    letter5: string[][];
    letter6: string[][];
  }
  

export const fetchAndParseXLSX = async (fileName: FileName): Promise<XLSXData> => {
try {
    const response = await RNFetchBlob.fs.readFile(
    RNFetchBlob.fs.asset(fileName),
    'base64'
    );

    // Convert base64 string to binary data (ArrayBuffer)
    const binaryData = decode(response);

    // Convert ArrayBuffer to Uint8Array
    const uint8Array = new Uint8Array(binaryData);

    // Convert Uint8Array to binary string
    const data = Array.from(uint8Array).map((x: number) => String.fromCharCode(x)).join("");

    // Parse the binary string as XLSX
    const workbook = XLSX.read(data, { type: 'binary' });

    const parsedData: XLSXData = {
    questions: [],
    letter4: [],
    letter5: [],
    letter6: []
    };

    workbook.SheetNames.forEach((sheetName: SheetName, index: Index) => {
    const worksheet = workbook.Sheets[sheetName];
    const parsedSheetData = XLSX.utils.sheet_to_json(worksheet);

    if (index === 0) {
        parsedData.questions = parsedSheetData.map((row: any) => ({
        question: row['Question'],
        difficulty: row['Difficulty']
        }));
    } else {
        const letter = sheetName.charAt(0);
        const letterIndex = parseInt(letter) - 4;

        parsedSheetData.forEach((row: any) => {
        const question = row['Question'];
        const difficulty = parsedData.questions[parsedData.questions.length - 1]?.difficulty || ''; // Get difficulty based on the last question

        if (letter === '4') {
            parsedData.letter4.push([question, difficulty]);
        } else if (letter === '5') {
            parsedData.letter5.push([question, difficulty]);
        } else if (letter === '6') {
            parsedData.letter6.push([question, difficulty]);
        }
        });
    }
    });

    return parsedData;
} catch (error) {
    console.error('Error fetching or parsing XLSX:', error);
    throw error;
}
};