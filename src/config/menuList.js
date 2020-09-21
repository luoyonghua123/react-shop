const menuList=[
  {
    title:'首页',
    key:'/home',
  },
  {
    title: '商品',
    key: '/products',
    children:[
      {
        title: '分类管理',
        key: '/category',
      },
      {
        title: '商品管理',
        key: '/product',
      },
    ]
  },
  {
    title: '用户管理',
    key: '/user',
  },
  {
    title: '角色管理',
    key: '/role',
  },
]
 


export default menuList