import axios from 'axios';
import router from 'umi/router'

const userinfo = JSON.parse(localStorage.getItem('userinfo')) || {
    token: '',
    role: '',
    username: '',
    balance: 0
}

function login(payload) {
    console.log(payload);
    return axios.post('/api/login', payload).then(({data}) => ({

        code: data.code,
        userinfo: data.data
    }))
}

export default {
    namespaces: 'user',
    state: userinfo,
    effects: {
        * login({payload}, {call, put}) {
            try {
                const {code, userinfo} = yield call(login, payload);
                //成功
                localStorage.setItem('userinfo', JSON.stringify(userinfo));
                yield put({type: 'init', payload: userinfo});
                //重定向
                router.push('/');
            } catch (err) {
                console.log(err);
            }

        }
    },
    reducers: {
        init(state, action) {
            return action.payload
        }
    }
}