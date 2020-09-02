import { amber, grey, pink, purple, red } from '@material-ui/core/colors';

import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
    palette: {
        primary: purple,
        secondary: pink,
        active: amber,
        inactive: red,
        titleButton: grey
    }
});
export default theme;
