var express    = require('express'),
bodyParser     = require('body-parser'),
mongoose       = require('mongoose'),
app            = express();

// APP CONFIG
mongoose.connect("mongodb://localhost/restful_blog_app",{ useNewUrlParser: true, useUnifiedTopology: true});
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));

// title
// image
// body
// created  ---> date

// MONGOOSE/MODEL CONFIG
var blogSchema = new mongoose.Schema({
  title : String,
  image : String ,
  body : String,
  created : {type : Date, default: Date.now} //remember it is an object
});
var Blog = mongoose.model("Blog", blogSchema);



// RESTFUL ROUTES
app.get('/', function(req, res){
  res.redirect('blogs');
});

// INDEX ROUTE
app.get('/blogs', function(req, res){
  Blog.find({}, function(err, blogs){
    if(err){
      console.log('ERROR!');
    } else {
      res.render('index', {blogs : blogs});
    }
  });
});

// NEW ROUTE
app.get("/blogs/new", function(req, res){
  res.render('new');
});

// CREATE ROUTE
app.post('/blogs', function(req, res){
     //create blog
     Blog.create(req.body.blog, function(err, newBlog){
          if(err){
               res.render('new');
          } else {
               //then, redirect to the index page
               res.redirect('/blogs');
          }
     });
});

// SHOW ROUTE
app.get('/blogs/:id', function(req, res){
     Blog.findById(req.params.id, function(err, foundBlog){
          if(err){
               res.redirect('/blogs');
          } else {
               res.render('show', {blog: foundBlog});
          }
     });
});

//EDIT ROUTE
app.get('/blogs/:id/edit', function(req,res){
     Blog.findById(req.params.id, function(err, foundBlog){
          if(err){
               res.redirect('/blogs');
          } else {
               res.render('edit', {blog: foundBlog});
          }
     });
});

//UPDATE ROUTE
app.put('/blogs/:id', function(req, res){
     res.send('UPDATE ROUTE');
});

app.listen(3000, function(){
  console.log('Server is running');
});
