
import { createContext, useState, ReactNode } from "react";

interface FontContextProps {
  fontFile: File | null;
  setFontFile: (file: File | null) => void;
  fontName: string;
  fontMetrics: any;
  setFontMetrics: (metrics: any) => void;
}

export const FontContext = createContext<FontContextProps>({
  fontFile: null,
  setFontFile: () => {},
  fontName: "",
  fontMetrics: null,
  setFontMetrics: () => {},
});

interface FontProviderProps {
  children: ReactNode;
}

export const FontProvider = ({ children }: FontProviderProps) => {
  const [fontFile, setFontFile] = useState<File | null>(null);
  const [fontMetrics, setFontMetrics] = useState<any>(null);

  // Extract font name from file if available
  const fontName = fontFile ? fontFile.name.split('.')[0] : "";

  return (
    <FontContext.Provider
      value={{
        fontFile,
        setFontFile,
        fontName,
        fontMetrics,
        setFontMetrics,
      }}
    >
      {children}
    </FontContext.Provider>
  );
};
