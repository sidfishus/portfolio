
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
    portfolioTextParse=5,
    portfolioScriptableTemplate=6,
    portfolioMisc=7,
    // Keep this as the last portfolio item + 1
    portfolioEnd=8,
    skillsMatrix=8,
    aboutMe=9,
    frivolousBeginnings=10,
    education=11,
    career=12,
    currentAndFuture=13,
    programmingDiscussion=14,
};

interface IDemoMenuItemProps {
    active: boolean;
    onClick?: ()=>void;
};

export const DemoMenu: React.FunctionComponent<IDemoMenuProps> = (props) => {

    const { activeMenuId, history, mediaMatching } = props;

    if(!mediaMatching) return <br/>;

    return (

        <>
            <br/>
            <Container>
                <Menu>
                    <DemoMenuItem active={activeMenuId===eMenuId.home} onClick={()=> history.push("/home")}>
                        Home</DemoMenuItem>
                    <DemoMenuItem active={activeMenuId===eMenuId.aboutMe} onClick={()=> history.push("/aboutme")}>
                        About Me</DemoMenuItem>
                    <Dropdown text="History" item>
                        <Dropdown.Menu>
                            <DemoMenuDropdownItem active={activeMenuId===eMenuId.frivolousBeginnings}
                                onClick={()=> history.push("/history/frivolousbeginnings")}>Frivolous Beginnings</DemoMenuDropdownItem>
                            <DemoMenuDropdownItem active={activeMenuId===eMenuId.education}
                                onClick={()=> history.push("/history/education")}>Education</DemoMenuDropdownItem>
                            <DemoMenuDropdownItem active={activeMenuId===eMenuId.career}
                                onClick={()=> history.push("/history/career")}>Career</DemoMenuDropdownItem>
                            <DemoMenuDropdownItem active={activeMenuId===eMenuId.currentAndFuture}
                                onClick={()=> history.push("/history/currentandfuture")}>Current and Future</DemoMenuDropdownItem>
                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown text="Portfolio" item>
                        <Dropdown.Menu>
                            <DemoMenuDropdownItem active={activeMenuId===eMenuId.portfolioDPA}
                                onClick={()=> history.push("/portfolio/dpa")}>Distributed SPA</DemoMenuDropdownItem>
                            <DemoMenuDropdownItem active={activeMenuId===eMenuId.portfolioHAndS}
                                onClick={()=> history.push("/portfolio/hands")}>Health and Safety System</DemoMenuDropdownItem>
                            <DemoMenuDropdownItem active={activeMenuId===eMenuId.portfolioTextParse}
                                onClick={()=> history.push("/portfolio/textparse")}>Text Parse</DemoMenuDropdownItem>
                            <DemoMenuDropdownItem active={activeMenuId===eMenuId.portfolioScriptableTemplate}
                                onClick={()=> history.push("/portfolio/scriptabletemplate")}>Scriptable Template</DemoMenuDropdownItem>
                            <DemoMenuDropdownItem active={activeMenuId===eMenuId.portfolioMisc}
                                onClick={()=> history.push("/portfolio/misc")}>Miscellenaous</DemoMenuDropdownItem>
                        </Dropdown.Menu>
                    </Dropdown>
                    <DemoMenuItem active={activeMenuId===eMenuId.skillsMatrix} onClick={()=> history.push("/skillsmatrix")}>
                        Skills Matrix</DemoMenuItem>
                    <DemoMenuItem active={activeMenuId===eMenuId.programmingDiscussion} onClick={()=> history.push("/programmingdiscussion")}>
                        Programming Discussion</DemoMenuItem>
                    <DemoMenuItem active={activeMenuId===eMenuId.textParse} onClick={()=> history.push("/textparse")}>
                        Text Parse Demo</DemoMenuItem>
                    
                    <img src="/img/logo.png" height="36" style={{position: "absolute", right: "10%", marginRight: 50}} />
                </Menu>
            </Container>
            <br/>
        </>
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