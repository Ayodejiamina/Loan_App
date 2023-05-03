exports.index = (req,res)=>{
    res.render('index.ejs',{title:"Home"})
}

exports.dashboard = (req, res) =>{
    res.render('user-dashboard',{title:'dashboard'})
}