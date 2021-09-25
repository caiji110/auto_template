// components/tabBar/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    tabBarInfo: {
      type: Array,
      value: [
        {
          name: '首页',
          activeImg: '../../asset/images/home_acitve.png',
          unActiveImg: '../../asset/images/home_unactive.png'
        },
        {
          name: '发布',
          activeImg: '../../asset/images/add_active.png',
          unActiveImg: '../../asset/images/add_unactive.png'
        },
        {
          name: '我的',
          activeImg: '../../asset/images/my_active.png',
          unActiveImg: '../../asset/images/my_unactive.png'
        },
      ]
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    currentIndex: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onClickTabBarBtn (e) {
      const { index } = e.target.dataset
      this.setData({
        currentIndex: index
      })
      this.triggerEvent("tabBarChangeEvent", { index })
    }
  }
})
