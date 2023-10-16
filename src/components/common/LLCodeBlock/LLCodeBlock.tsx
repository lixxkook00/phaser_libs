import { StackProps, Typography } from "@mui/material";
import { FunctionComponent } from "react";
import { CodeBlock } from "react-code-blocks";
import LLCodeBlockTheme from "./LLCodeBlockTheme";
import { formatCode } from "../../../utils";
import copy from "copy-to-clipboard";

interface Props extends StackProps {
    theme?: any;
    title?: string;
    code?: string;
    type?: string;
    showLineNumbers?: boolean;
}

const codeDefault = `
    // add code for this template
`

const LLCodeBlock: FunctionComponent<Props> = ({
    theme = LLCodeBlockTheme,
    code = codeDefault,
    title = 'None',
    type = 'javascript',
    showLineNumbers = true,
}) => {

    return (
        <div onClick={() => copy(code)} className="flex">
            <Typography variant="h5" mt={4} mb={1}>
                {title}
            </Typography>

            <CodeBlock
                text={formatCode(code)}
                language={type}
                showLineNumbers={showLineNumbers}
                theme={theme}
            />
        </div>
    )
}

export default LLCodeBlock;
