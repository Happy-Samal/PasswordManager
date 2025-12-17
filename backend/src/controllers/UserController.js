import userSer from '../services/UserService.js'
const frontendUrl = new URL(process.env.FRONTEND_URL); // To get Full URL
const frontendDomain = frontendUrl.hostname; // Extract the domain part only


const signup = async (req,res)=>{
     try {
      const { username, email, password } = req.body;
      const result = await userSer.signup(username, email, password);
      return res.status(201).json(result);
    } catch (err) {
      return res.status(500).json({
            success: false,
            message: 'Internal Server Error!'
        });
    }
}

const login = async(req,res)=>{
    try {
      const {email, password } = req.body;
      const result = await userSer.login(email, password);
     if(result.token){
       return res.status(200).cookie('PassOPT', result.token, {
         httpOnly: true,
         secure:true,
         maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
         sameSite: 'None' ,
         domain: frontendDomain, // add for working on same domain 
         path: '/',  // add for set cokie on path
            
        }).json({
          success: true,
          message: 'Login Successfully!',
          redirectUrl: '/user/data'
        });
      }else{
        return res.status(200).json(result);
      }
    } catch (err) {
      return res.status(500).json({
            success: false,
            message: 'Internal Server Error!'
        });
    }

}

// logout
const logout = async (req, res) => {
  try{
      res.status(200).clearCookie('PassOPT', {
        httpOnly: true, 
        secure: true,  
        sameSite: 'None',
        domain: frontendDomain,
        path: '/',
    }).json({
        success: true,
        message: "Logout Successfully!",
        redirectUrl: '/'
    });
  } catch (err) {
      return res.status(500).json({
            success: false,
            message: 'Internal Server Error!'
        });
    }
};


// check user login or not
const isLogin = async(req,res)=>{
    try{
       const  result = await userSer.isLogin(req.userId);
       return res.status(200).json(result);
    }catch(err){
      return res.status(500).json({
        success:false,
        message:"Internal Server Error!"
      })
    }
}

export {signup, login,logout, isLogin};
