import React from 'react'
const Icon = (props) => {
  let {
    iconName,
    color,
    width = 20,
    marginRight = 5,
    marginLeft,
    marginTop
  } = props

  const IconChooser = () => {
    let icon = null
    switch (iconName) {
      case "MenuIcon":
        // icon = <MenuIcon style={{ color, width, marginLeft, marginRight, marginTop }} aria-hidden="true" />
        break;

    }
    return icon
  }

  return <>{IconChooser()}</>

}

export default Icon