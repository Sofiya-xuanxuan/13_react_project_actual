export default {
    'post /api/login'(req,res){
        const {username,password}=req.body;
        if(username=='kaikeba'&&password=='123') {
            return res.json({
               code:0,
               data:{
                   token:'kaikebasgood',
                   role:'admin',
                   balance:1000,
                   username:'kaikeba'
               }
            })
        }
        if(username=='sofiya'&&password=='123') {
            return res.json({
                code:0,
                data:{
                    token:'kaikebasgood',
                    role:'user',
                    balance:1000,
                    username:'sofiya'
                }
            })
        }
        return res.status(401).json({
            code:-1,
            msg:'密码错误'
        })
    }
}