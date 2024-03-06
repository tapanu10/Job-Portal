 const testPostController= (req,res)=>{
  const{name}=req.body;
  res.status(200).send(`your Name is ${name}`);
};

module.exports=testPostController;
