const product = require("../Models/ProductModel");
const createProductController = async (req, res) => {
  try {
    let photo = null;
    if (req.file) {
      photo = req.file.filename;
    }

    const { name, description, price, category, shipping, quantity } = req.body;

    const newProduct = await product.create({
      name,
      price,
      description,
      category,
      shipping,
      photo,
      quantity,
    });

    if (newProduct) {
      return res.status(200).json({ message: "product created", newProduct });
    }
    return res.status(400).json({ message: "failed in creation of product" });
  } catch (error) {
    console.log(error.message);
  }
};

const getsingleProductController = async (req, res) => {
  try {
    const { ProductId } = req.params;

    const singleProduct = await product
      .findById(ProductId)
      .populate("category");

    if (singleProduct) {
      const productWithImage = singleProduct.toObject();

      productWithImage.photo = `${req.protocol}://${req.get("host")}/uploads/${singleProduct.photo}`;
      return res.status(200).json({message: "Getting single product",getProduct: productWithImage,});
    }

  
    return res.status(400).json({ message: "product not found" });
  } catch (error) {
    console.log(error.message);
  }
};

const getAllProductsController = async (req, res) => {
  try {
    const Products = await product.find({}).populate("category");

    // for (i = 0; i < Products.length; i++) {
    //   let productWithImage = Products[i].toObject();

    //   productWithImage.photo = `${req.protocol}://${req.get("host")}/uploads/${
    //     Products[i].photo
    //   }`;
    // }

    
    if (Products.length > 0) {
      const productsWithImages = Products.map(product => {
        const productWithImage = product.toObject();
        // Assuming the photo filenames are stored in the "photo" property of each product
        productWithImage.photo = `${req.protocol}://${req.get('host')}/uploads/${product.photo}`;
        return productWithImage;
      })
      
      if (productsWithImages) {
        return res
        .status(200)
        .json({ message: "getting all products", productsWithImages });
      }
    }
    return res.status(400).json({ message: "no products found" });
  } catch (error) {
    console.log(error.message);
  }
};

const deleteProductController = async (req, res) => {
  try {
    const { ProductId } = req.params;

    const deleteProduct = await product.findByIdAndDelete(ProductId);

    if (deleteProduct) {
      return res.status(200).json({ message: "prdocut deleted" });
    }
    return res.status(400).json({ message: "failed in deletion of product" });
  } catch (error) {
    console.log(error.message);
  }
};

const updateProductController = async (req, res) => {
  try {
    const { ProductId } = req.params;
    const { name, description, price, quantity, category } = req.body;
    // let photo=null

    // if(req.file){
    //     photo=req.file.filename
    // }
    const updateProduct = await product.findByIdAndUpdate(
      ProductId,
      {
        name,
        description,
        price,
        quantity,
        category,
      },
      { new: true }
    );

    if (updateProduct) {
      return res
        .status(200)
        .json({ message: "product updaed sucessfully", updateProduct });
    }
    return res.status(400).json({ message: "failed in updation of product" });
  } catch (error) {
    console.log(error.message);
  }
};

// return product by query sortBy limit order

const productListController = async (req, res) => {
  try {
    let order = req.query.order ? req.query.porder : "asc";
    let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
    let limit = req.query.limit ? req.query.limit : 5;

    const Products = await product
      .find()
      .populate("category")
      .sort([[sortBy, order]])
      .limit(limit);

    // for (i = 0; i < Products.length; i++) {
    //   let productWithImage = Products[i].toObject();

    //   productWithImage.photo = `${req.protocol}://${req.get("host")}/uploads/${
    //     Products[i].photo
    //   }`;
    // }



    if (Products.length > 0) {
      const productsWithImages = Products.map(product => {
        const productWithImage = product.toObject();
        // Assuming the photo filenames are stored in the "photo" property of each product
        productWithImage.photo = `${req.protocol}://${req.get('host')}/uploads/${product.photo}`;
        return productWithImage;
      })
      
      if (Products) {
        return res
        .status(200)
        .json({ message: "getting all products", productsWithImages });
      }
    }
      return res.status(400).json({ message: "no products found" });
  } catch (error) {
    console.log(error.message);
  }
};

const getRelatedProductsController = async (req, res) => {
  try {
    const { ProductId } = req.params;
    let limit=req.query.limit?req.query.limt:5
    const baseProduct = await product.findById(ProductId).populate("category");

    // const Products = await product.find({ category: baseProduct.category}).limit(limit).select("-ProductId");

    const Products=await product.find({_id:{$ne:ProductId},category:baseProduct.category}).limit(limit).populate("category")
    // for (i = 0; i < Products.length; i++) {
    //   let productWithImage = Products[i].toObject();

    //   productWithImage.photo = `${req.protocol}://${req.get("host")}/uploads/${
    //     Products[i].photo
    //   }`;
    // }

    if (Products.length > 0) {
      const productsWithImages = Products.map(product => {
        const productWithImage = product.toObject();
        // Assuming the photo filenames are stored in the "photo" property of each product
        productWithImage.photo = `${req.protocol}://${req.get('host')}/uploads/${product.photo}`;
        return productWithImage;
      })
      
      if (Products) {
        return res
        .status(200)
        .json({ message: "getting all products", productsWithImages });
      }
    }
    return res.status(400).json({ message: "no products found" });
  } catch (error) {
    console.log(error.message);
  }
};

const getCategoriesOfProductController=async(req,res)=>{
    try {
        const Categories=await product.distinct("category")

        if(Categories){
            return res.status(200).json({message:"getting all categories",Categories})
        }
        return res.status(400).json({message:"no categoriesfound"})
    } catch (error) {
        console.log(error.message)
    }
}

const SearchProductsController=async(req,res)=>{
    try {

        // let order=req.query.order?req.query.order:"desc"
        // let sortBy=req.query.sortBy?req.query.sortBy:"_id"
        // let limit=req.query.limit?req.query.limit:100
        
        
        // let findArgs={}

        // for(let key in req.body.filters){
        //     if(req.body.filters[key].length>0){
        //         findArgs[key]={
        //             $gte:req.body.filters[key][0],
        //             $lte:req.body.filters[key][1]
        //         }
                
        //     }else{
        //         findArgs[key]=req.body.filters[key]
        //     }
        // }

      
const {category,price,search}=req.body

console.log("price",price,"category",category)



const categoryFilter = category ? { category: { $in: category } } : {};
const priceFilter = price ? { price: { $gte: price[0], $lte: price[1] } } : {};


let filter={}

if(category.length>0){
  filter.category={$in:category}
}

if(price.length>0){
  filter.price = { $gte: price[0], $lte: price[1] };
}


if(search!==""){
  filter.$or = [
    { name: { $regex: search, $options: 'i' } },
    { description: { $regex: search, $options: 'i' } },
  ];
}
        const Products=await product.find(
          // {

          filter

          // ...categoryFilter,
          // ...priceFilter
          // price: { $gte: price[0]?price[0]:0, $lte: price[1]?price[1]:1000 }
        // }
        ).populate("category")
        // const Products=await product.find(findArgs).populate("category")
        // .limit(limit).sort([[sortBy,order]])

        
    // for (i = 0; i < Products.length; i++) {
    //   let productWithImage = Products[i].toObject();

    //   productWithImage.photo = `${req.protocol}://${req.get("host")}/uploads/${
    //     Products[i].photo
    //   }`;
    // }
    
    if (Products.length > 0) {
      const productsWithImages = Products.map(product => {
        const productWithImage = product.toObject();
        // Assuming the photo filenames are stored in the "photo" property of each product
        productWithImage.photo = `${req.protocol}://${req.get('host')}/uploads/${product.photo}`;
        return productWithImage;
      })
      
      
      if (Products) {
        return res
        .status(200)
        .json({ message: "getting all products", productsWithImages });
      }
    }
      return res.status(400).json({ message: "no products found" });
    } catch (error) {
        console.log(error.message)
    }
}




module.exports = {
  createProductController,
  getsingleProductController,
  getAllProductsController,
  deleteProductController,
  updateProductController,
  productListController,
  getRelatedProductsController,
  getCategoriesOfProductController,
  SearchProductsController
};
