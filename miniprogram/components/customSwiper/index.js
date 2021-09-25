// components/customSwiper/index.js
Component({
  /**
   * 组件的属性列表
   * @swiperImgArr [{url: String}]图片的路径
   * swiperConfig： {  } 轮播图的默认配置
   * swiperConfig.isGetThemeColor: boolean 是否获得主题色
   *  bindonGetThemeColorEvent
   *  可获得该组件向外传递当前图片的主题色 
   */
  properties: {
    swiperImgArr: {
      type: Array,
      value:  [
        { url: '../../asset/swiperImg/1.webp' },
        { url: '../../asset/swiperImg/2.webp' },
        { url: '../../asset/swiperImg/3.webp' }
      ]
    },
    swiperConfig: {
      type: Object,
      value: {
        duration: 300,
        circular: false,
        indicatorActiveColor: '#000000',
        indicatorDots: true,
        indicatorColor: 'rgba(0, 0, 0, .3)',
        marginTop: '20',
        marginBottom: '20',
        isGetThemeColor: true
      }
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    current: 0,
    currentArr: [], //记录转过的图片，如果已经转过就没必要再次计算其主题色。
  },
  lifetimes: {
  async ready () {
    this.getImgColor()
  }},
  /**
   * 组件的方法列表
   */
  methods: {
    onChangeCurrent (e) {
      this.setData({
        current: e.detail.current
      })
      this.getImgColor()
    },
    async getImgColor () {
      if (!this.properties.swiperConfig.isGetThemeColor) return
      const { currentArr, current } = this.data
      if (currentArr.findIndex(item => item===current)!== -1) {
        this.triggerEvent('onGetThemeColorEvent', { current })
        return
      }
      const canvas = wx.createOffscreenCanvas({type:'2d',width:335,height:130});
      const context = canvas.getContext("2d");
      const image = canvas.createImage();
      const that = this
      await new Promise(resolve => {
        image.onload = resolve
        image.src = that.properties.swiperImgArr[that.data.current].url // 要加载的图片 url
      })
      context.clearRect(0, 0, 335, 130)
      context.drawImage(image, 0, 0, 335, 130)
    
      // 获取画完后的数据
      const imgData = context.getImageData(0, 0, 335, 130)
      let colorList = this.getCountsArr(imgData.data)
      let arr = []
      for(let key in colorList){
        arr.push({
          color:`rgba(${key})`,
          counts:colorList[key]
        })
      }
      arr.sort((a,b)  =>  b.counts-a.counts)
      currentArr.push(current)
      this.setData({
        rgba1:arr[0].color,
        rgba2:arr[arr.length-1].color,
        currentArr: currentArr
      })
      this.triggerEvent("onGetThemeColorEvent",{ current, rgba1: arr[0].color, rgba2: arr[arr.length-1].color })
    },
    getCountsArr (arr) {
      let originData = arr;
      let rgba =[];
      let colorList =[];
      for(let i=0;i<originData.length;i=i+4){
        rgba[0] =originData[i]
        rgba[1] =originData[i+1]
        rgba[2] =originData[i+2]
        rgba[3] =originData[i+3]
      
        if (rgba.indexOf(undefined) !== -1 || originData[i + 3] === 0) {
          continue;
        }
        let rgbaStr = rgba.join(",");
        
        if(rgbaStr in colorList){
          ++colorList[rgbaStr]
        }
        else{
          colorList[rgbaStr]=1
        }
      }
      return colorList
    },
  }
})
