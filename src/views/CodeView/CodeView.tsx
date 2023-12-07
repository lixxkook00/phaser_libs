import { FunctionComponent, useState } from "react";
import { InputAdornment, TextField } from "@mui/material";
import { AppView } from "components"
import { Search as SearchIcon } from '@mui/icons-material';
import LLCodeBlock from "components/common/LLCodeBlock"
import CODE from "data"

interface Props {
  type : string | '';
}

const CodeView: FunctionComponent<Props> = ({type}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCode = CODE.filter(item => {
    if (!type) {
      // Skip type check if type is an empty string
      return item.title.toLowerCase().includes(searchQuery.toLowerCase());
    }
    return item.type === type && item.title.toLowerCase().includes(searchQuery.toLowerCase());
  });
  

  return (
    <AppView className="mb-20 min-w-[800px]">
      <TextField
        // label="Search"
        variant="outlined"
        placeholder="Search..."
        fullWidth
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        className="mb-2 mt-4"
      />

      {
        filteredCode.map((item, index) => {
          return (
            <LLCodeBlock 
              key={index}
              title={item.title}
              code={item.code}
            />
          )
        })
      }
    </AppView>
  )
}

export default CodeView;