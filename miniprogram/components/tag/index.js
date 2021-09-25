// components/tag/index.js
Component({
  /**
   * 组件的属性列表
   * @tagList
   * Array
   * 
   */
  properties: {
    tagList: {
      type: Array,
      value: ['闲置','求助','兼职','干饭']
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    value: '  说点...',
    tag: [],
    forceCancel: false,
    currentIndex: -1
  },

  /**
   * 组件的方法列表
   */
  methods: {
    ongetTagTitleEvent (e) {
      const { tag } = this.data
      tag.push(e.detail.title)
      this.setData({
        tag: [].concat(tag)
      })
      console.log(this.data.tag)
    },
    onbindfocusEvent (e) {
      this.setData({
        currentIndex: -2
      })
      if (this.data.value === '  说点...') this.setData({ value: '' })
    },
    onbindblur (e) {
      if (!this.data.value.trim()) return
      this.triggerEvent('onSelectedTagEvent', { title: this.data.value.slice(0, 5), type: 'custom' })
    },
    onClickSelectTag (e) {
      const { index } = e.currentTarget.dataset
      this.setData({
        currentIndex: index
      })
      this.triggerEvent('onSelectedTagEvent', { title: this.properties.tagList[index] })
    }
  }
})
