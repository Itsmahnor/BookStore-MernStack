import express from 'express'
const router=express.Router();
import { Book } from '../Model/model.js';
import mongoose from 'mongoose';

// post
router.post("/",async (req,res)=>{
  console.log(req.body); 
try{
  if(!req.body.title || !req.body.author || !req.body.publishYear){
    return res.status(400).send({message:'send all required fields: title,autor,publishYear'})
  }
  const newBook = {
     title:req.body.title,
     author:req.body.author,
     publishYear:req.body.publishYear,
  };

  const book=await Book.create(newBook);
  
return res.status(201).send(book)
}catch(err){
  res.status(500).send({message:err.message})
}
})
// get all
router.get("/",async(req,res)=>{
const value=await Book.find({});
return res.send(value)
})
// get by id
router.get("/:id",async(req,res)=>{
  const id=req.params.id;
  const Value=await Book.findById(id);
 try{
      return res.status(202).send(Value);
    }
  
  catch(err){
    return res.status(404).send({message:"Error"})
  }

})

// update
router.patch("/:id", async (req, res) => {
  try {
    const id = req.params.id;

    // Validate if the ID is a valid MongoDB ObjectId
 

    const updatedData = req.body;

    // Find and update the book
    const updatedBook = await Book.findByIdAndUpdate(id, updatedData, { new: true });

    if (!updatedBook) {
      return res.status(404).send({ message: "Book not found" });
    }

    // Send the updated book as a response
    res.status(200).send({ message: "Book updated successfully", data: updatedBook });
  } catch (err) {
    console.error("Error updating book:", err.message);
    res.status(500).send({ message: "Server Error", error: err.message });
  }
});
// delete
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;

  

    const updatedData = req.body;

    // Find and update the book
    const updatedBook = await Book.findByIdAndDelete(id, updatedData, { new: true });

    if (!updatedBook) {
      return res.status(404).send({ message: "Book not found" });
    }

    // Send the updated book as a response
    res.status(200).send({ message: "Book deleted successfully", data: updatedBook });
  } catch (err) {
    console.error("Error updating book:", err.message);
    res.status(500).send({ message: "Server Error", error: err.message });
  }
});

export default router;