// components/answer/index.js
Component({
  /**
   * QuestionsArray：Array Object
   * QuestionsArray[index]:{}
   * QuestionsArray[index].question:String 问题
   * QuestionsArray[index].options：[] 选项
   * QuestionsArray[index].rightoptions：该问题的正确选项
   */
  properties: {
    QuestionsArray: {
      type: Array,
      value: [
        {
          question: '1.深大南区天桥什么时候开通？',
          options: ['A．　没有开通', 'B．　２０１３年', 'C．　２０１８年', 'D．　２０２１年'],
          rightoptions: ['0']
        },
        {
          question: '2.文山湖有几只鹅？',
          options: ['A．　1', 'B．　2', 'C．　3', 'D．　以上均是错误选项'],
          rightoptions: ['3']
        },
        {
          question: '3.南区天桥都没有你6出自哪个典故？',
          options: ['A．　迟迟不开通', 'B．　忙着打官司', 'C．　天桥是6字形', 'D．　以上均为正确答案'],
          rightoptions: ['3']
        }
      ]
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    limitTime: 30,
    current: 0,
    SelectedResult: [],
    isshow: true,
    index: 0
  },
  lifetimes: {
    attached () {
      this.CheckTimeOut().then(res => {
        let nums = 0 ;
        this.data.SelectedResult.forEach(item => {
          if(item.result) nums++
        })
        this.setData({
          isshow: false,
          nums
        })
        console.log(param);
      })
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    CheckTimeOut () {
      let timer = null
      return new Promise((resolve, reject) => {
        timer = setInterval(() => {
          const { limitTime } = this.data
          if (limitTime <= 1) {
            clearInterval(timer)
            resolve('计时结束')
          }
          this.setData({
            limitTime: limitTime - 1
          })
        }, 1000)
      })
    },
    SelectAnswer (e) {
      // 存储答题结果
      const NewReslutArr = this.data.SelectedResult
      // 拿到含有用户选择的答案和题目的下标
      const str = e.target.dataset.options
      // 拿到问题对应的正确答案
      const questions = this.properties.QuestionsArray
      // 解析字符串得到用户选择的答案和该题目对应的下标
      const { selected, index } = this.Getparams(str)
      if (selected && index) {
        // 判断答题是否正确
        const result = questions[index].rightoptions[0] == selected ? 'true' : 'false'
        // 第一次回答无需判断是否已经答过直接添加
        if (NewReslutArr.length == 0) NewReslutArr.push({ result, QuestionsIndex: index })
        // 判断该题目是否重复作答
        else {
          const indexarr = NewReslutArr.map(item => item.QuestionsIndex)
          const num = indexarr.indexOf(index)
          // 该题目未作答过
          if (num == -1) {
            NewReslutArr.push({ result, QuestionsIndex: index })
          }
          // 题目作答过，更改用户答案为最新选择的
          else {
            NewReslutArr[num].result = result
          }
        }
        // 答题结果
        this.setData({
          SelectedResult: [].concat(NewReslutArr)
        })
      }
      this.setData({
        current: this.data.current + 1
      })
      if (this.data.current > this.properties.QuestionsArray.length - 1) {
        let nums = 0 ;
        this.data.SelectedResult.forEach(item => {
          if(item.result) nums++
        })
        this.setData({
          current: 0,
          isshow: false,
          nums
        })
        
        console.log(this.data.SelectedResult);
      }
    },
    Getparams (str) {
      const obj = {}
      str.replace(/\??(\w+)=(\w+)&?/g, function (match, p1, p2) {
        if (!obj[p1]) {
          obj[p1] = p2
        }
      })
      return obj
    },
    onChangeCurrent (e) {
      this.setData({
        index: e.detail.current,
        current: e.detail.current
      })
    }
  }
})
