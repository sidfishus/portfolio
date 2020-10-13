
import * as React from "react";
import { IRoutedCompProps } from "../../routes";
import { Menu, Container, Dropdown } from "semantic-ui-react";
import { eScreenResolution } from "../Client App";

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

enum eMenuType {
    menuTypeNone=0,
    menuTypeVertical=1,
    menuTypeHorizontal=2
};

export const DemoMenu: React.FunctionComponent<IDemoMenuProps> = (props) => {

    const { activeMenuId, history, mediaMatching } = props;

    const menuType: eMenuType = ((!mediaMatching)?eMenuType.menuTypeNone:(
        (mediaMatching.FirstMatching() === eScreenResolution.THINNER_THAN_LAPTOP)?
            eMenuType.menuTypeVertical:
            eMenuType.menuTypeHorizontal
        )
    );

    //sidtodo whoops - can't use useMemo due to the active menu???
    //sidtodo no :/
    const jsx=React.useMemo(()=>GenerateMenu(menuType),[menuType]);

    return jsx;
};

const MenuVerticle: React.FunctionComponent<{children: any}> = (props) => {

    //sidtodo fluid???
    return (
        <>
            <br />
            <Container>
                <Menu verticle fluid>{props.children}</Menu>
            </Container>
            <br />
        </>
    );
}

const MenuHorizontal: React.FunctionComponent<{}> = (props) => {
    return (
        <>
            <br />
            <Container>
                <Menu>{props.children}</Menu>
            </Container>
            <br />
        </>
    );
}

interface IMenuItemProps {
    children: React.ReactNode;
    active: boolean;
    onClick?: ()=>void;
};

const MenuItemAll = (props: IMenuItemProps): JSX.Element => {

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

interface ISubMenuHeaderProps {
    text: string;
};

const SubMenuHeaderVerticle: React.FunctionComponent<ISubMenuHeaderProps> = (props) => {

    const { children, text} = props;

    return (
        <Menu.Item>
            {text}
            <Menu.Menu>
                {children}
            </Menu.Menu>
        </Menu.Item>
    );
};

const SubMenuHeaderHorizontal: React.FunctionComponent<ISubMenuHeaderProps> = (props) => {

    const { children, text} = props;

    return (
        <Dropdown text={text} item>
            <Dropdown.Menu>
                {children}
            </Dropdown.Menu>
        </Dropdown>
    );
};

interface IResponsiveControls {
    MenuHeader: React.FunctionComponent<{}>;
    MenuItem: (props: IMenuItemProps)=>JSX.Element;
    SubMenuHeader: React.FunctionComponent<ISubMenuHeaderProps>;
    SubMenuItem: React.FunctionComponent<ISubMenuItemProps>;
};

const ResponsiveControls = (verticle: boolean): IResponsiveControls => {
    if(verticle) {
        return {
            MenuHeader: MenuVerticle,
            SubMenuHeader: SubMenuHeaderVerticle,
            SubMenuItem: SubMenuItemVerticle,
            MenuItem: MenuItemAll
        };
    }

    return {
        MenuHeader: MenuHorizontal,
        SubMenuHeader: SubMenuHeaderHorizontal,
        SubMenuItem: SubMenuItemHorizontal,
        MenuItem: MenuItemAll
    };
};

interface ISubMenuItemProps {
    active: boolean;
    onClick?: ()=>void;
};

const SubMenuItemHorizontal: React.FunctionComponent<ISubMenuItemProps> = (props) => {

    const { active, onClick, children} = props;

    return (
        <Dropdown.Item
            active={active}
            onClick={onClick}
        >
            {children}
        </Dropdown.Item>
    );
};

//sidtodo this is the same as DemoMenuItem
const SubMenuItemVerticle: React.FunctionComponent<ISubMenuItemProps> = (props) => {

    const { active, onClick, children} = props;

    return (
        <Menu.Item
            active={active}
            onClick={onClick}
        >
            {children}
        </Menu.Item>
    );
};

const GenerateMenu = (menuType: eMenuType): JSX.Element => {

    const { SubMenuHeader, SubMenuItem, MenuHeader, MenuItem } = ResponsiveControls(verticle);

    return (

        <>
            <Menu vertical>
                {MenuItem({
                    active: (activeMenuId===eMenuId.home),
                    onClick: ()=> history.push("/home"),
                    children: <>Home</>
                })}
                {MenuItem({
                    active: (activeMenuId===eMenuId.aboutMe),
                    onClick: ()=> history.push("/aboutme"),
                    children: <>About Me</>
                })}
                {/* <MenuItem active={activeMenuId===eMenuId.home} onClick={()=> history.push("/home")}>
                    Home</MenuItem>
                <MenuItem active={activeMenuId===eMenuId.aboutMe} onClick={()=> history.push("/aboutme")}>
                    About Me</MenuItem>
                <SubMenuHeader text="History">
                    <SubMenuItem active={activeMenuId===eMenuId.frivolousBeginnings}
                        onClick={()=> history.push("/history/frivolousbeginnings")}>Frivolous Beginnings</SubMenuItem>
                    <SubMenuItem active={activeMenuId===eMenuId.education}
                        onClick={()=> history.push("/history/education")}>Education</SubMenuItem>
                    <SubMenuItem active={activeMenuId===eMenuId.career}
                        onClick={()=> history.push("/history/career")}>Career</SubMenuItem>
                    <SubMenuItem active={activeMenuId===eMenuId.currentAndFuture}
                        onClick={()=> history.push("/history/currentandfuture")}>Current and Future</SubMenuItem>
                </SubMenuHeader>
                <SubMenuHeader text="Portfolio">
                    <SubMenuItem active={activeMenuId===eMenuId.portfolioDPA}
                        onClick={()=> history.push("/portfolio/dpa")}>Distributed SPA</SubMenuItem>
                    <SubMenuItem active={activeMenuId===eMenuId.portfolioHAndS}
                        onClick={()=> history.push("/portfolio/hands")}>Health and Safety System</SubMenuItem>
                    <SubMenuItem active={activeMenuId===eMenuId.portfolioTextParse}
                        onClick={()=> history.push("/portfolio/textparse")}>Text Parse</SubMenuItem>
                    <SubMenuItem active={activeMenuId===eMenuId.portfolioScriptableTemplate}
                        onClick={()=> history.push("/portfolio/scriptabletemplate")}>Scriptable Template</SubMenuItem>
                    <SubMenuItem active={activeMenuId===eMenuId.portfolioMisc}
                        onClick={()=> history.push("/portfolio/misc")}>Miscellenaous</SubMenuItem>
                </SubMenuHeader>
                <MenuItem active={activeMenuId===eMenuId.skillsMatrix} onClick={()=> history.push("/skillsmatrix")}>
                    Skills Matrix</MenuItem>
                <MenuItem active={activeMenuId===eMenuId.programmingDiscussion} onClick={()=> history.push("/programmingdiscussion")}>
                    Programming Discussion</MenuItem>
                <MenuItem active={activeMenuId===eMenuId.textParse} onClick={()=> history.push("/textparse")}>
                    Text Parse Demo</MenuItem> */}
                
                <img src="/img/logo.png" height="36" style={{position: "absolute", right: "10%", marginRight: 50}} />
            </Menu>
        </>
    );
};