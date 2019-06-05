import axios from 'axios';

// api
function getGoods(){
  return axios.get('/api/goods').then(({data})=>{
    const courseData=data.result;
    return {
      courses:courseData.data,
      tags:courseData.tags
    }
  })
}

export default {
  namespace: "goods",
  state: {
    courses:{},//课程
    tags:[]//分类
  },
  effects: {
    *getList(action, {call, put}){           
      const payload = yield call(getGoods)
      yield put({ type: 'initGoods', payload: payload})
    }
  },
  reducers: {
    initGoods(state,{payload}){
      return payload
    }
  }
};
