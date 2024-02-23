const dotenv = require("dotenv")
const { OAuth2Client } = require('google-auth-library');
const mongoose = require("mongoose");
const cors = require("cors");
const express = require("express");
const jwd=require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const { Storage } = require("@google-cloud/storage");
const UUID = require("uuid-v4");
const formidable = require("formidable-serverless");
const url = require('url');


const app = express();
app.use(  cors({
  origin: ["http://localhost:3000", "https://agroshield.netlify.app"],
})
)
app.use(express.json());
app.use(express.json({ limit: "50mb", extended: true }));
app.use(express.urlencoded({ extended: false, limit: "50mb" }));


const ObjectId = require('mongodb').ObjectId;
const ChannelModel = require("./Data")
const finalcrop = require('./Finalcrop');



mongoose.set('strictQuery', false);

dotenv.config({path:'./config.env'});
const DB=process.env.DATABASE;
const PORT=process.env.PORT;
const KEY=process.env.KEY;
const ID=process.env.ID;

mongoose.connect(DB,{
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    family: 4
})
.then(()=>
{
    app.listen(PORT,()=>{
        console.log("connection is successfull");
    })
}
)
.catch((error)=>console.log(error));




require("dotenv").config();

var admin = require("firebase-admin");


const adminJsonContents = JSON.parse(process.env.GOOGLECLOUD);

var serviceAccount = adminJsonContents;




admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

// const userRef = admin.firestore().collection("users");

const storage = new Storage({
  credentials: adminJsonContents,
});









app.post("/userinput",(req,res)=>{
    const {authorization} = req.headers;
    if(!authorization){
        return res.status(401).json({error:"Authorization token required"});
    }
    else{
    const {cropName, diseaseName, solution,UserName,type,image} = req.body;
      // implement schema model
    const model = new finalcrop()
    model.cropName = cropName
    model.Disease = diseaseName
    model.solution = solution
    model.UserName = UserName
    model.type = type
    model.image = image


    model.save(async (err,data)=>{
        if(err){
            console.log(err);
        }else{
            // console.log(data);
            
            res.status(200).send({'answer': model})
        }
    })
}

})

const client = new OAuth2Client(ID);

app.post("/token", async (req, res) => {
    const { tokenold } = req.body;
  
    const ticket = await client.verifyIdToken({
      idToken: tokenold,
      audience: ID,
    });
    const payload = ticket.getPayload();
    const email = payload.email;
    const check = await ChannelModel.findOne({ email: email });
    if (!check) {
      // create new account in database
      const name = payload.name;
      const email = payload.email;
  
      const detail = new ChannelModel();
      detail.name = name;
      detail.email = email;
      detail.withgoogle = true;
      detail.isAdmin=false
      detail.save(async (err, data) => {
        if (err) {
          console.log(err);
        } else {
          // send response once database operation is complete
          const token = jwd.sign({
            email: data.email,
            name: data.name,
            isAdmin:data.isAdmin,
            _id:data._id,
          }, KEY);
          res.json({ status: "signed in successfully", user: token });
        }
      });
    } else {
      const token = jwd.sign({
        email: check.email,
        name: check.name,
        isAdmin:check.isAdmin,
        _id:check._id,
      }, KEY);
      res.json({ status: "signed in successfully", user: token });
    }
  });



app.post("/signup",async (req,res)=>{
    const {name,email,password} = req.body;
    const newpassword= await bcrypt.hash(password,10);

    const detail = new ChannelModel()
    detail.name = name
    detail.email = email
    detail.password = newpassword
    detail.isAdmin=false


    detail.save(async (err,data)=>{
        if(err){
            console.log(err);
        }else{
            // console.log(data);
            const token = jwd.sign({
                email: data.email,
                name: data.name,
                _id:data._id,
                isAdmin:data.isAdmin,
              }, KEY);
              res.json({ status: "signed in successfully", user: token });
        }
    })

})




app.post("/login", async (req,res)=>{
    const {email,password} = req.body;

    const check = await ChannelModel.findOne({email:email});

    if(!check){
        return  {status:"Please check email and password",user:null}
    }

    if(check.password){
    const ispasswordvalid= await bcrypt.compare(password,check.password);
    if(ispasswordvalid){
        const token=jwd.sign({
            email:check.email,
            password:check.password,
            name:check.name,
            isAdmin:check.isAdmin,
            _id:check._id
        },KEY)
        res.json({status:"signed in successfully",user:token})
    }
    else{   
        res.json({status:"Please check email and password",user:null})
    }
}

     if(check.withgoogle){
        const token=jwd.sign({
            email:check.email,
            _id:check._id,
            name:check.name,
            isAdmin:check.isAdmin
        },KEY)
        res.json({status:"signed in successfully",user:token})
    }

})


const middleware=(req,res,next)=>{
    const {authorization} = req.headers;
    if(!authorization){
        res.send({"error":"authorization is required"})
        return
    }
    const token = authorization.split(' ')[1]
    try{
        const {_id} = jwd.verify(token,KEY)
        next()
    }
    catch(err){
        res.send({"error":"token is required"})
    }
    
}




app.get("/userinput", middleware, async (req, res) => {
    const { cropName } = req.query;
    if (cropName) {
      const data1 = await finalcrop.aggregate([
        {
          $match: {
            cropName: { $regex: new RegExp(`^${cropName}`, "i") },
          },
        },
      ]);
      res.send(data1);
    }
  else{
    res.json({"error":"please provide data"})
  }
  });

app.delete('/delete/:id',middleware,async (req,res)=>{
  const id=req.params.id;
  const isValidObjectId = ObjectId.isValid(id);
  if (!isValidObjectId) {
    return res.status(400).send('Invalid ObjectId');
  }
  
  const del = await finalcrop.findByIdAndDelete(id);

  res.json({success:"deleted successfully"});
    
})

app.put('/edit/:id',middleware,async (req,res)=>{
  const id=req.params.id;
  const isValidObjectId = ObjectId.isValid(id);
  if (!isValidObjectId) {
    return res.status(400).send('Invalid ObjectId');
  }
  else{
    const data = await finalcrop.findOneAndUpdate(
      { _id: id },
      {
        $set: req.body,
      }
    );
    res.send(data);
    }
});

app.get('/getuserdata',middleware,async (req,res)=>{
  const data = await ChannelModel.find();
  res.json(data);
})


app.put("/image/:id",middleware, async (req, res) => {
    const {image} = req.body;
    const id=req.params.id;
    const isValidObjectId = ObjectId.isValid(id);
    if (!isValidObjectId) {
      return res.status(400).send('Invalid ObjectId');
    }
    else{
    const data = await finalcrop.findByIdAndUpdate(id,{image:image},{new:true});
    res.send(data);
    }
  });


  app.get('/data/:id',middleware, async(req,res)=>{
    const id = req.params.id;
    const data= await finalcrop.find({_id:id});
    res.json({"data":data});
  })


  app.post('/comment/:id',middleware, async (req,res)=>{
        const {comment}= req.body;
        const id=req.params.id;
        const isValidObjectId = ObjectId.isValid(id);
        try{
            if(isValidObjectId){
                const data = await finalcrop.findByIdAndUpdate(id,{
                    $push:{
                      comment:{
                        data:comment,
                        user:id,
                        }
                    }
                },{new:true});
                res.send(data);
            }
        }catch(err){
            console.log(err)
        }
        if (!isValidObjectId) {
          return res.status(400).send('Invalid ObjectId');
        }
        

  })


  app.post('/createlink', async (req, res) => {
    const form = new formidable.IncomingForm({ multiples: true });
  
  
  
    try {
      form.parse(req, async (err, fields, files) => {
        let uuid = UUID();
        var downLoadPath =
          'https://firebasestorage.googleapis.com/v0/b/agroshield-4560f.appspot.com/o/';
  
        let imageUrl;
        // const docID = userRef.doc().id;
        
  
        if (err) {
          return res.status(400).json({
            message: 'There was an error parsing the files',
            data: {},
            error: err,
          });
        }
  
        function isValidUrl(url) {
          const regex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
          return regex.test(url);
        }
  
        const bucket = storage.bucket('gs://agroshield-4560f.appspot.com');
  
        // Check if profileImage field is present in the form data
        if (files.cropImage && files.cropImage.size > 0) {
          const cropImage = files.cropImage;
          const imageResponse = await bucket.upload(cropImage.path, {
            destination: `users/${cropImage.name}`,
            resumable: true,
            metadata: {
              metadata: {
                firebaseStorageDownloadTokens: uuid,
              },
            },
          });

          
  
          imageUrl =
            downLoadPath +
            encodeURIComponent(imageResponse[0].name) +
            '?alt=media&token=' +
            uuid;
  
            res.json({ "imageUrl": imageUrl });
        }
  
        else if (fields.imageUrl && isValidUrl(fields.imageUrl) ) {
          // Download image from provided URL
          const https = require('https');
          const fs = require('fs');
          
          async function saveImage(url, path, callback) {
            const fullUrl = url;
            const localPath = fs.createWriteStream(path);
            
          
            const request = https.get(fullUrl,  function(res) {
              res.pipe(localPath);
              localPath.on('finish',  function() {
                localPath.close(function() {
                  callback(null);
                });
              });
            });
          
            request.on('error', function(err) {
              console.error(err);
              callback(err);
            });
          }
          

              const fileName = url.parse(fields.imageUrl).pathname.split('/').pop();
              const fileExtension = fileName.split('.').pop();
              console.log(fileExtension);
        
          console.log(fileExtension)
          await saveImage(
            `${fields.imageUrl}`,
            `./images/crop.${fileExtension}`,
            async function(err) {
              if (err) {
                console.error('Failed to save image:', err);
              } else {
                console.log('Image saved successfully.');

                
                const imageResponse = await bucket.upload(`./images/crop.${fileExtension}`, {
                  destination: `users/${Date.now()}.${fileExtension}`,
                  resumable: true,
                  metadata: {
                    metadata: {
                      firebaseStorageDownloadTokens: uuid,
                    },
                  },
                });

                imageUrl =
                  downLoadPath +
                  encodeURIComponent(imageResponse[0].name) +
                  '?alt=media&token=' +
                  uuid;

                res.json({ "imageUrl": imageUrl });
                
                  fs.unlinkSync(`./images/crop.${fileExtension}`);
                
              

              }
            }
          );
        }
  
  
     
        
        
         else {
          console.log('No image URL provided');
        }
        
  
        
      });
    } catch (err) {
      res.send({
        message: 'Something went wrong',
        data: {},
        error: err,
      });
    }
  });
 