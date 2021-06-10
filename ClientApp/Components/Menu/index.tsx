
import * as React from "react";
import { IRoutedCompProps } from "../../routes";
import { Menu, Dropdown, Icon, Image } from "semantic-ui-react";
import { eScreenResolution } from "../Client App";
import { ContainerDemo } from "../Presentation";
import { Link } from "react-router-dom";

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
    menuTypeVertical=1,
    menuTypeHorizontal=2
};

export const DemoMenu: React.FunctionComponent<IDemoMenuProps> = (props) => {

    const { activeMenuId, history, mediaMatching } = props;

    const [verticalOpenState,SetVerticalOpenState] = React.useState<boolean>(false);

    if(!mediaMatching) {
        return (
            <br />
        );
    }

    const menuType: eMenuType =
        ((mediaMatching.FirstMatching() < eScreenResolution.LargeMonitor)?
            eMenuType.menuTypeVertical:
            eMenuType.menuTypeHorizontal
        );

    const { SubMenuHeader, SubMenuItem, MenuHeader, MenuItem } = ResponsiveControls(menuType);

    return (
        <>
            {MenuHeader({
                verticalOpenState: verticalOpenState,
                SetVerticalOpenState: SetVerticalOpenState,
                children: [
                    MenuItem({
                        activeMenuId: activeMenuId,
                        menuId: eMenuId.home,
                        onClick: ()=> history.push("/home"),
                        children: <>Home</>,
                        key: "home"
                    }),

                    MenuItem({
                        activeMenuId: activeMenuId,
                        menuId: eMenuId.aboutMe,
                        onClick: ()=> history.push("/aboutme"),
                        children: <>About Me</>,
                        key: "aboutme"
                    }),

                    SubMenuHeader({
                        text: "History",
                        children: [
                            SubMenuItem({
                                activeMenuId: activeMenuId,
                                menuId: eMenuId.frivolousBeginnings,
                                children: <>Frivolous Beginnings</>,
                                onClick: ()=> history.push("/history/frivolousbeginnings"),
                                key: "frivolousbeginnings"
                            }),

                            SubMenuItem({
                                activeMenuId: activeMenuId,
                                menuId: eMenuId.education,
                                children: <>Education</>,
                                onClick: ()=> history.push("/history/education"),
                                key: "education"
                            }),

                            SubMenuItem({
                                activeMenuId: activeMenuId,
                                menuId: eMenuId.career,
                                children: <>Career</>,
                                onClick: ()=> history.push("/history/career"),
                                key: "career"
                            }),

                            SubMenuItem({
                                activeMenuId: activeMenuId,
                                menuId: eMenuId.currentAndFuture,
                                children: <>Current and Future</>,
                                onClick: ()=> history.push("/history/currentandfuture"),
                                key: "currentandfuture"
                            })
                        ]
                    }),

                    SubMenuHeader({
                        text: "Portfolio",
                        children: [
                            SubMenuItem({
                                activeMenuId: activeMenuId,
                                menuId: eMenuId.portfolioDPA,
                                children: <>Distributed SPA</>,
                                onClick: ()=> history.push("/portfolio/dpa"),
                                key: "dpa"
                            }),

                            SubMenuItem({
                                activeMenuId: activeMenuId,
                                menuId: eMenuId.portfolioHAndS,
                                children: <>Health and Safety System</>,
                                onClick: ()=> history.push("/portfolio/hands"),
                                key: "hands"
                            }),

                            SubMenuItem({
                                activeMenuId: activeMenuId,
                                menuId: eMenuId.portfolioTextParse,
                                children: <>Text Parse</>,
                                onClick: ()=> history.push("/portfolio/textparse"),
                                key: "textparse"
                            }),

                            SubMenuItem({
                                activeMenuId: activeMenuId,
                                menuId: eMenuId.portfolioScriptableTemplate,
                                children: <>Scriptable Template</>,
                                onClick: ()=> history.push("/portfolio/scriptabletemplate"),
                                key: "scriptabletemplate"
                            }),

                            SubMenuItem({
                                activeMenuId: activeMenuId,
                                menuId: eMenuId.portfolioMisc,
                                children: <>Miscellenaous</>,
                                onClick: ()=> history.push("/portfolio/misc"),
                                key: "misc"
                            })
                        ]
                    }),

                    MenuItem({
                        activeMenuId: activeMenuId,
                        menuId: eMenuId.skillsMatrix,
                        onClick: ()=> history.push("/skillsmatrix"),
                        children: <>Skills Matrix</>,
                        key: "skillsmatrix"
                    }),

                    MenuItem({
                        activeMenuId: activeMenuId,
                        menuId: eMenuId.programmingDiscussion,
                        onClick: ()=> history.push("/programmingdiscussion"),
                        children: <>Programming Discussion</>,
                        key: "programmingdiscussion"
                    }),

                    MenuItem({
                        activeMenuId: activeMenuId,
                        menuId: eMenuId.textParse,
                        onClick: ()=> history.push("/textparse"),
                        children: <>Text Parse Demo</>,
                        key: "textparsedemo"
                    })
                ]
            })}
        </>
    );
};

// These have to be functions instead of components because otherwise the menu will not render properly
interface IResponsiveControls {
    MenuHeader: (props: IMenuHeaderProps) => JSX.Element;
    MenuItem: (props: IMenuItemProps) => JSX.Element;
    SubMenuHeader: (props: ISubMenuHeaderProps) => JSX.Element;
    SubMenuItem: (props: ISubMenuItemProps) => JSX.Element;
};

const ResponsiveControls = (menuType: eMenuType): IResponsiveControls => {
    if(menuType === eMenuType.menuTypeVertical) {
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

interface IMenuHeaderProps {
    children: JSX.Element[];
    verticalOpenState: boolean;
    SetVerticalOpenState: React.Dispatch<React.SetStateAction<boolean>>;
};

const MenuVerticle = (props: IMenuHeaderProps): JSX.Element => {

    const { verticalOpenState, SetVerticalOpenState} = props;

    // Do not ask me why, but using 'vertical' as a prop here DOES NOT WORK :/
    // You have to specify it as a class directly as per below for it to propogate through to the rendered HTML.
    return (
        <>
            <ContainerDemo>
                <Menu secondary>
                    <Menu.Item fitted>
                        <Icon
                            name="bars"
                            link
                            size="big"
                            onClick={()=>SetVerticalOpenState(curState => !curState)}
                        />
                    </Menu.Item>
                    
                    <Menu.Item position="right">
                        <Logo style={{marginRight: "-8px"}} />
                    </Menu.Item>
                </Menu>
            </ContainerDemo>

            {verticalOpenState &&
                <>
                    <ContainerDemo>
                        <Menu fluid className="vertical">{props.children}</Menu>
                    </ContainerDemo>
                    <br/>
                </>
            }
        </>
    );
}

interface ILogoProps {
    style?: object;
};

const Logo: React.FunctionComponent<ILogoProps> = (props)  => {

    const style = ((props.style)?props.style:{});

    return (
        <>
            <span style={{fontSize: 26}}>
                <b>Chris Siddall</b>
            </span>
            <span style={{fontSize: 16, color: "#2185d0", marginTop: "3px", ...style}}>
                &nbsp;Portfolio
            </span>
        </>
    );
};

const MenuHorizontal = (props: IMenuHeaderProps): JSX.Element => {

    const children = [
        ...props.children,

        <Menu.Item className="no-left-border-demo" key="logo" position="right">
            <Logo />
        </Menu.Item>
    ];

    return (
        <>
            <br />
            <ContainerDemo>
                <Menu>{children}</Menu>
            </ContainerDemo>
            <br />
        </>
    );
}

interface IMenuItemProps {
    children: JSX.Element;
    menuId: eMenuId;
    activeMenuId: eMenuId;
    onClick?: ()=>void;
    key: string;
};

const MenuItemAll = (props: IMenuItemProps): JSX.Element => {

    const { key, children, menuId, activeMenuId } = props;

    const active=(menuId === activeMenuId);

    const onClick=((active)?null:props.onClick);
    
    return (
        <Menu.Item
            active={active}
            onClick={onClick}
            key={key}
        >
            {children}
        </Menu.Item>
    );
};

interface ISubMenuHeaderProps {
    text: string;
    children: JSX.Element[];
};

const SubMenuHeaderVerticle = (props: ISubMenuHeaderProps): JSX.Element => {

    const { children, text} = props;

    return (
        <Menu.Item key={text}>
            {text}
            <Menu.Menu>
                {children}
            </Menu.Menu>
        </Menu.Item>
    );
};

const SubMenuHeaderHorizontal = (props: ISubMenuHeaderProps): JSX.Element => {

    const { children, text} = props;

    return (
        <Dropdown text={text} item key={text}>
            <Dropdown.Menu>
                {children}
            </Dropdown.Menu>
        </Dropdown>
    );
};

interface ISubMenuItemProps {
    menuId: eMenuId;
    activeMenuId: eMenuId;
    onClick?: ()=>void;
    children: JSX.Element;
    key: string;
};

const SubMenuItemHorizontal = (props: ISubMenuItemProps): JSX.Element => {

    const { menuId, activeMenuId, children, key} = props;

    const active=(menuId === activeMenuId);

    const onClick=((active)?null:props.onClick);

    return (
        <Dropdown.Item
            active={active}
            onClick={onClick}
            key={key}
        >
            {children}
        </Dropdown.Item>
    );
};

const SubMenuItemVerticle = (props: ISubMenuItemProps): JSX.Element => {

    const { menuId, activeMenuId, children, key} = props;

    const active=(menuId === activeMenuId);

    const onClick=((active)?null:props.onClick);

    return (
        <Menu.Item
            active={active}
            onClick={onClick}
            key={key}
        >
            {children}
        </Menu.Item>
    );
};