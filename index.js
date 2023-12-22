const express = require('express');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app =express();
require('dotenv').config()

const cors = require('cors');



const port =process.env.PORT || 5000;
//middleware

app.use(cors({origin:[ 'http://localhost:5173',
]}));
app.use(express.json());

    



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.rns2r0a.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {

      
    const taskCollection=client.db('TaskPlannerDb').collection('Alltasks');
    
    app.post('/alltask', async(req,res)=>{
      const user =req.body;
      const result =await taskCollection.insertOne(user);
      res.send(result);
    })

    app.get('/alltask',async(req,res)=>{
      const email=req.query.email;
      const query ={ email: email};
      const result =await taskCollection.find(query).toArray();
      res.send(result);
  })

  app.delete('/alltask/:id', async(req,res) =>  {
    const id=req.params.id;
      const query ={ _id: new ObjectId(id)};
      const result = await taskCollection.deleteOne(query);
      res.send(result);
  })

  app.get('/updateTask/:id',  async (req, res) => {
    const id  = req.params.id;
    const query = { _id: new ObjectId(id) }
  
  const result = await taskCollection.findOne(query);
    res.send(result);
    
  })

  app.patch('/updateTask/:id', async (req, res) => {
    const item = req.body;
    const id = req.params.id;
    const filter = { _id: new ObjectId(id) }
    const updatedDoc = {
      $set: {
        title: item.title,
        desc :item.desc,
        selectedDate:item.updatedDate,
        priority:item.priority

      }
    }
  
    const result = await taskCollection.updateOne(filter, updatedDoc)
    res.send(result);
  })

  } finally {
 
  }
}
run().catch(console.dir);




app.get('/', (req, res) => {
  res.send('hello world')
})

app.listen(port, () => {
    console.log(`task management is Running on port ${port}`);
  });
