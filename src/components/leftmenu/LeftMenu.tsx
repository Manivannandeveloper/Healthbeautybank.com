import React, { SyntheticEvent } from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import Collapse from "@material-ui/core/Collapse";

import IconExpandLess from "@material-ui/icons/ExpandLess";
import IconExpandMore from "@material-ui/icons/ExpandMore";
import { ListBoxItemType } from "components/NcListBox/NcListBox";
import { CLIENT_RENEG_LIMIT } from "tls";
import { Checkbox } from "@material-ui/core";

export interface LeftMenuProps {
    className?: string;
    lists: ListBoxItemType[];
    subLists: any[]
  }

const AppMenu: React.FC <LeftMenuProps> = ({
    className = "",
    lists
  }) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [currentCate, setCurrentCate] = React.useState<any>('');

  function handleClick(e:any) {
    if(e.target !== undefined && e.target.tagName === "INPUT"&& e.target.attributes['type'].value){              
        
    } else {
        setCurrentCate(e.currentTarget.textContent);
        setOpen(!open);
    }
  }

  function handleChange(e:SyntheticEvent) {
    
  }

//   const menuListData = lists;

  const menuListData = [
    {
        color: "indigo",
        count: 0, 
        href: "#",
        id: 0,
        name: "Data 1",
        thumbnail: "https://images.unsplash.com/photo-1536329583941-14287ec6fc4e?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGRlc2lnbnxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        type: "Article",
        subCateg: [{
            categoryId: 3,
            categoryName: "Yoga",
            color: "indigo",
            count: "0",
            href: "#",
            id: 3,
            name: "Test Yoga",
            thumbnail: "https://images.unsplash.com/photo-1536329583941-14287ec6fc4e?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGRlc2lnbnxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
        }]
    },
    {
        color: "indigo",
        count: 0, 
        href: "#",
        id: 0,
        name: "Aasdasdll",
        thumbnail: "https://images.unsplash.com/photo-1536329583941-14287ec6fc4e?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGRlc2lnbnxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        type: "Article",
        subCateg: []
    }, {
        color: "indigo",
        count: 0, 
        href: "#",
        id: 0,
        name: "All",
        thumbnail: "https://images.unsplash.com/photo-1536329583941-14287ec6fc4e?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGRlc2lnbnxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        type: "Article",
        subCateg: [{
            categoryId: 3,
            categoryName: "Yoga",
            color: "indigo",
            count: "0",
            href: "#",
            id: 3,
            name: "Test Yoga",
            thumbnail: "https://images.unsplash.com/photo-1536329583941-14287ec6fc4e?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGRlc2lnbnxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"

        }, {
            categoryId: 5,
            categoryName: "Beauty",
            color: "indigo",
            count: "0",
            href: "#",
            id: 2,
            name: "Hair oil",
            thumbnail: "https://images.unsplash.com/photo-1536329583941-14287ec6fc4e?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGRlc2lnbnxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
        }]
  }]

  return (
    <div className="menu-list">
    <List component="nav" disablePadding>
        {menuListData.map((item: any, index: number) => (
            
            <React.Fragment  key={index.toString()+'menu'}>                
                <ListItem button onClick={(e:SyntheticEvent) => handleClick(e)} >
                    <Checkbox onChange={(e:SyntheticEvent) => {handleChange(e)}}/>
                    <ListItemText primary={item.name} />
                    {item.subCateg !== undefined && item.subCateg.length !== 0 && 
                        <>
                        {open && item.name === currentCate  ? <IconExpandLess /> : <IconExpandMore />}
                        </>
                    }
                </ListItem>
                
                {item.subCateg !== undefined && item.subCateg.length !== 0 && item.name === currentCate &&
                    <Collapse in={open} timeout="auto" unmountOnExit >
                        {item.subCateg.map((data: any, index: number) => {
                            return(
                                <React.Fragment key={index.toString()+'data2'}>
                                    <Divider />
                                    <List component="div" disablePadding>
                                    <ListItem button>
                                    <Checkbox className="pl-2" onChange={(e:SyntheticEvent) => {handleChange(e)}}/>
                                        <ListItemText inset primary={data.name} />
                                    </ListItem>
                                    </List>                
                                </React.Fragment>
                            );
                        })}
                    </Collapse> 
                }                                              
            </ React.Fragment>
        ))}
    </List>
    </div>
  );
};

const drawerWidth = 240;

const useStyles = makeStyles((theme) =>
  createStyles({
    appMenu: {
      width: "100%"
    },
    navList: {
      width: drawerWidth
    },
    menuItem: {
      width: drawerWidth
    },
    menuItemIcon: {
      color: "#97c05c"
    }
  })
);

export default AppMenu;
