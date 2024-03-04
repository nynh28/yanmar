import { LIST_MENU_ALL } from "./Menu";
import { get } from "lodash";

export function checkAuthen(permission, pathName) {
  let isAuth = false;

  if (
    [
      "updateProfile",
      "changePassword",
      "notification",
      "notification/information",
    ].includes(pathName)
  )
    return true;

  if (permission.length > 0) {
    const findSubMenu = (subMenu) => {
      let resultData = "";
      subMenu.find((item) => {
        if (get(item, "subMenu")) {
          let findSub = findSubMenu(item.subMenu);
          if (findSub !== "") resultData = findSub;
        } else {
          if (item.url === pathName) resultData = item;
          if (get(item, "urlChildren")) {
            if (item.urlChildren.includes(pathName)) resultData = item;
          }
        }
      });
      return resultData;
    };

    let foundMenu = "";
    LIST_MENU_ALL.find((item) => {
      if (get(item, "subMenu")) {
        let findSub = findSubMenu(item.subMenu);
        if (findSub !== "") foundMenu = findSub;
      } else {
        if (item.url === pathName) foundMenu = item;
        if (get(item, "urlChildren")) {
          if (item.urlChildren.includes(pathName)) foundMenu = item;
        }
      }
    });

    if (foundMenu !== "") {
      let menuId = foundMenu.id;
      let canAccess = permission.find((item) => {
        return item.menuId === menuId;
      });
      if (canAccess) isAuth = true;
    }
  } else {
    isAuth = true;
  }

  return isAuth;
  // return true;
}
