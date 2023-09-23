import { useMenuContext } from "../context/MenuContext/MenuProvider"

export const FilterMenu = (category) => {
    const [{menuItems}, dispatch] = useMenuContext();
    return menuItems?.filter((item) => item.category.toLowerCase() === category.toLowerCase())
}

// export const GetMenuById = (id) => {
//     const [{menuItems}, dispatch] = useMenuContext()
//     return menuItems?.find((item) => item.id === id)
// }