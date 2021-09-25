// components/tabMain/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    themeColorArr: [],
    activeColor: []
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onGetThemeColorEvent(e) {
      const {
        detail
      } = e
      const {
        themeColorArr
      } = this.data
      if (!detail.rgba1) {
        const index = themeColorArr.findIndex(item => item.current === detail.current)
        console.log(index);
        this.setData({
          activeColor: [themeColorArr[index].rgba1, themeColorArr[index].rgba2]
        })
        return
      }
      themeColorArr.push(detail)
      this.setData({
        themeColorArr: themeColorArr,
        activeColor: [detail.rgba1, detail.rgba2]
      })
    },
    onClickComponentBtn(e) {
      const {
        index
      } = e.target.dataset
      switch (index) {
        case '0':
          wx.navigateTo({
            url: '../showTag/index',
          })
          break;
        case '1':
          wx.navigateTo({
            url: '../question/index',
          })
          break;
        case '2':
          wx.navigateTo({
            url: '../showTag/index',
          })
          break;
      }
    }
  }
})