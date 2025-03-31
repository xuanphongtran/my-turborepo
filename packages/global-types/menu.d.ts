export type Menu = {
  menu_id: number
  menu_parent_id: number
  menu_name: string
  menu_icon: string
  menu_custom_link?: string
  menu_element_keyword?: string
  menu_type: string
  menu_position: string
  menu_new_tab: string
  menu_order: number
  parent_keyword?: string
  menu_element_keyword_replace: string
  children: Array<Menu>
}
