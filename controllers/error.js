exports.error404 = (req,res)=>{
    res.render('errors/error404',{title:'error404'})
}
exports.error500 = (req,res)=>{
    res.status(500).render('errors/error500',{title:'500'})
}