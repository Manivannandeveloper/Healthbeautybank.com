import React, { SyntheticEvent, useEffect } from "react";
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

export interface DropDownListItem {
  id: string;
  name: string;
  color: string;
  count: number;
  href: string;
  type: string;
  thumbnail: string;
  categoryId:number;
}

export interface LeftMenuProps {
    className?: string;
    lists: ListBoxItemType[];
    subLists: any[];
    getCategory: (item: any[]) => void;
    getSubCategory: (item: any[]) => void;
  }

const AppMenu: React.FC <LeftMenuProps> = ({
    className = "",
    lists,
    getCategory,
    getSubCategory,
  }) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [currentCate, setCurrentCate] = React.useState<any>('');
  const [catArray, setCatArray] = React.useState<any>([]);
  const [subCatArray, setSubCatArray] = React.useState<any>([]);

  function handleClick(e:any) {
    if(e.target !== undefined && e.target.tagName === "INPUT" && e.target.attributes['type'].value === "checkbox"){              
        
    } else {
        setCurrentCate(e.currentTarget.textContent);
        setOpen(!open);
    }
  }

  function handleChange(e:SyntheticEvent) {
    debugger;
  }

  function handleCategory(e:any, id:number) {
    let target = e.target;
    let checkedCat = catArray;
    if(!!target){
      let check = target.checked;
      if(check){
        checkedCat.push(id);
      }else{
        const index = checkedCat.indexOf(id);
        if (index > -1) {
          checkedCat.splice(index, 1);
        }
      }
    }
    getCategory(checkedCat);
  }

  const handleSubCategory = (e:any, id:number) => {
    let target = e.target;
    let checkedCat = subCatArray;
    if(!!target){
      let check = target.checked;
      if(check){
        checkedCat.push(id);
      }else{
        const index = checkedCat.indexOf(id);
        if (index > -1) {
          checkedCat.splice(index, 1);
        }
      }
    }
    getSubCategory(checkedCat);
  }


  const menuListData = lists;


  return (
    <div className="menu-list">
    <List component="nav" disablePadding>
        {menuListData.map((item: any, index: number) => (
            
            <React.Fragment  key={index.toString()+'menu'}>                
                <ListItem button onClick={(e:SyntheticEvent) => handleClick(e)} >
                    <Checkbox onChange={(e) => {handleCategory(e, item.id)}}/>
                    <ListItemText primary={item.name} />
                    {item.subCateg !== undefined && item.subCateg.length !== 0 && 
                        <>
                        {open && item.name === currentCate  ? <IconExpandLess /> : <IconExpandMore />}
                        </>
                    }
                </ListItem>
                
                {item.subCateg !== undefined && item.subCateg.length !== 0 && item.name === currentCate &&
                    <Collapse in={open} timeout="auto" unmountOnExit key={index.toString()+'menu'}>
                        {item.subCateg.map((data: any, index: number) => {
                            return(
                                <React.Fragment key={index.toString()+'data2'}>
                                    <Divider />
                                    <List component="div" disablePadding>
                                    <ListItem button>
                                    <Checkbox className="pl-2" onChange={(e) => {handleSubCategory(e, data.id)}}/>
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
