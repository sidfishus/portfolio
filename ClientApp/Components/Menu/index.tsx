
import * as React from "react";
import { IRoutedCompProps } from "../../routes";
import { Menu, Container, Dropdown } from "semantic-ui-react";

export interface IDemoMenuProps extends IRoutedCompProps {
    activeMenuId: eMenuId;
};

export enum eMenuId {
    home=1,
    textParse=2,
    portfolioStart=3,
    portfolioDPA=3,
    portfolioHAndS=4,
    portfolioEnd=5,
};

interface IDemoMenuItemProps {
    active: boolean;
    onClick?: ()=>void;
};

export const DemoMenu: React.SFC<IDemoMenuProps> = (props) => {

    const { activeMenuId, history } = props;

    return (

        <Container>
            <Menu>
                <DemoMenuItem active={activeMenuId===eMenuId.home} onClick={()=> history.push("/home")}>
                    Home</DemoMenuItem>
                <DemoMenuItem active={activeMenuId===eMenuId.textParse} onClick={()=> history.push("/textparse")}>
                    Text Parse Demo</DemoMenuItem>
                <Dropdown text="Portfolio" item>
                    <Dropdown.Menu>
                        <DemoMenuDropdownItem active={activeMenuId===eMenuId.portfolioDPA}
                            onClick={()=> history.push("/portfolio/dpa")}>Distributed SPA</DemoMenuDropdownItem>
                        <DemoMenuDropdownItem active={activeMenuId===eMenuId.portfolioHAndS}
                            onClick={()=> history.push("/portfolio/hands")}>Health and Safety System</DemoMenuDropdownItem>
                    </Dropdown.Menu>
                </Dropdown>
                <img src="/img/logo.png" height="36" style={{position: "absolute", right: "10%", marginRight: 50}} />
            </Menu>
        </Container>
    );
};

const DemoMenuItem: React.SFC<IDemoMenuItemProps> = (props) => {

    const { children, active, onClick } = props;
    
    return (
        <Menu.Item
            active={active}
            onClick={onClick}
        >
            {children}
        </Menu.Item>
    );
};

const DemoMenuDropdownItem: React.SFC<IDemoMenuItemProps> = (props) => {

    const { children, active, onClick } = props;
    
    return (
        <Dropdown.Item
            active={active}
            onClick={onClick}
        >
            {children}
        </Dropdown.Item>
    );
};