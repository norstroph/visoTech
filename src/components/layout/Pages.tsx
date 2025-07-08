

import { Box } from '@mui/material';

import type {ReactNode} from "react";




const Pages = ({children, title}: { children: ReactNode, title: string }) => {

    return (
        <Box>

                    <title>{title}</title>
                {children}
        </Box>

    );
};


export default Pages;
