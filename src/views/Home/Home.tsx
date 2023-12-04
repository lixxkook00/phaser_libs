import { useState } from "react";
import { InputAdornment, TextField } from "@mui/material";
import { AppView } from "components"
import { Search as SearchIcon } from '@mui/icons-material';
import LLCodeBlock from "components/common/LLCodeBlock"
import CODE from "data"

export default function Home() {

  const [searchQuery, setSearchQuery] = useState('');

  const filteredCode = CODE.filter(item => {
    return item.title.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <AppView className="mb-20">
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
