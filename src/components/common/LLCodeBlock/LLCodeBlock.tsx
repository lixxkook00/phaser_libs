import { Button, StackProps, Typography } from "@mui/material";
import { FunctionComponent, useState } from "react";
import { CodeBlock } from "react-code-blocks";
import LLCodeBlockTheme from "./LLCodeBlockTheme";
import { formatCode } from "../../../utils";
import copy from "copy-to-clipboard";
import { toast } from "react-toastify";

interface Props extends StackProps {
    theme?: any;
    title?: string;
    code?: string;
    type?: string;
    showLineNumbers?: boolean;
}

const codeDefault = `
    // add code for this template
`;

const LLCodeBlock: FunctionComponent<Props> = ({
    theme = LLCodeBlockTheme,
    code = codeDefault,
    title = 'None',
    type = 'javascript',
    showLineNumbers = true,
}) => {

const [isExpand, setExpand] = useState(false);

const toggleHeight = () => {
    setExpand(!isExpand);
};

const handleCopy = () => {
    copy(code);
    toast.success(
        `Coppied ${title}`, 
        {
            position: 'bottom-right',
            autoClose: 500,
        }
    )
}

return (
    <div className="relative mb-2">
        <Typography variant="h5" mt={2} mb={1}>
            {title}
        </Typography>

        <div onClick={handleCopy} className={`${isExpand ? 'max-h-none' : 'max-h-36'} relative overflow-hidden border border-slate-600 rounded-lg hover:border-green-700 hover:cursor-copy`}>
            <CodeBlock
                text={formatCode(code)}
                language={type}
                showLineNumbers={showLineNumbers}
                theme={theme}
            />
        </div>


        <div className="flex justify-center">
            <Button onClick={toggleHeight} variant="outlined" className="mt-6">{isExpand ? 'View less' : 'View more'}</Button>
        </div>
    </div>
);
};

export default LLCodeBlock;