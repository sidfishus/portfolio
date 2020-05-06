
import * as React from "react";
import { IRoutedCompProps } from "../../routes";
import { Menu, Container, MenuItemProps } from "semantic-ui-react";

export interface IDemoMenuProps extends IRoutedCompProps {
    activeMenuId: eMenuId;
};

export enum eMenuId {
    home=1,
    textParse=2,
    portfolio=3
};

interface IDemoMenuItemProps {
    activeMenuId: eMenuId;
    menuId: eMenuId;
    url: string;
    history: any; // I do not know the type for this..
};

export const DemoMenu: React.SFC<IDemoMenuProps> = (props) => {

    const { activeMenuId, history } = props;

    return (

        <Container>
            <Menu>
                <DemoMenuItem activeMenuId={activeMenuId} menuId={eMenuId.home} url="./home"
                    history={history}>Home</DemoMenuItem>
                <DemoMenuItem activeMenuId={activeMenuId} menuId={eMenuId.textParse} url="./textparse"
                    history={history}>Text Parse Demo</DemoMenuItem>
                <DemoMenuItem activeMenuId={activeMenuId} menuId={eMenuId.portfolio} url="./portfolio"
                    history={history}>Portfolio</DemoMenuItem>
                <img src="./img/logo.png" height="36" style={{position: "absolute", right: "10%", marginRight: 50}} />
            </Menu>
        </Container>
    );
};

const DemoMenuItem: React.SFC<IDemoMenuItemProps> = (props) => {

    const { children, activeMenuId, menuId, history, url } = props;

    const isActive=(activeMenuId===menuId);
    
    return (
        <Menu.Item
            active={isActive}
            onClick={() => history.push(url)}
        >
            {children}
        </Menu.Item>
    );
};