const express=require('express');
const mongoose=require('mongoose');
const User=require('./Schema/user')
const cors=require('cors')
const port=8080;
const app=express();
app.use(cors({credentials:true,origin:'http://localhost:3000'}))
app.use(express.json());


//connecting the mongodb
//mongodb+srv://user:user@cluster0.dfab5lc.mongodb.net/?retryWrites=true&w=majority
mongoose.connect('mongodb+srv://user:user@cluster0.dfab5lc.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });


//the routes
app.post('/newuser',async(req,res)=>{
  const {name,email,phone,address}=req.body;
  try{
    const existingUser=await User.findOne({email:email});
if(existingUser){
  res.status(400).json("User already exists");
}else{
  const userDet=await User.create({
    name:name,
    email:email,
    phone:phone,
    address:address
  })
  res.json(userDet)
}
  }catch(error){
res.status(400).json(error);
console.log(error)
  }
});


//all users
app.get('/alluser', async(req,res)=>{
  const allUser=await User.find().sort({ _id: -1 });
  res.json(allUser)
  console.log(allUser)
})


// deleting a user
app.delete('/delete/:id', async (req, res) => {
  const userId = req.params.id;

  try {
    // Check if the user exists in the database
    const existingUser = await User.findById(userId);
    if (!existingUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    // If the user exists, delete the user from the database
    await User.findByIdAndDelete(userId);
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting the user', error });
  }
});



//updating a user

app.put('/edit/:id', async (req, res) => {
  const { name, email, phone, address } = req.body;
  const userId = req.params.id;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, email, phone, address },
      { new: true }
    );

    if (updatedUser) {
      res.json(updatedUser);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(400).json({ error: 'Error updating user' });
  }
});





// app.get('/home',(req,res)=>{
// res.send("Welcome to the home page")
// })




//listening the server
app.listen(port,()=>{
    console.log(`Server is live at ${port}  port`)
})