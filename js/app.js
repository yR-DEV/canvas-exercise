function Shape(x, y, width, height, color) {
  this.x = x || 0;
  this.y = y || 0;
  this.width = width || 1;
  this.height = height || 1;
  this.color = color;
}

//drawing the shape with the given context
Shape.prototype.draw = function(context) {
  context.fillStyle = this.color;
  context.fillRect(this.x, this.y, this.width, this.height);
};

//determining whether or not the point is inside of the shapes boundaries
Shape.prototype.contains = function(mouseX, mouseY) {
  //just making sure that the mouse location is within the shape
  //this code is very similar to the collision detection function I wrote in my game
  //but instead of checking the boundaries of 2 objects I only have to search for one which is awesome
  return (this.x <= mouseX) && (this.x + this.width >= mouseX) && (this.y <= mouseY) && (this.y + this.height >= mouseY);
}

function theCanvasFn(theCanvas) {
  //random var declaration
  var paddingLeft, paddingTop, borderLeft, borderTop;

  //just in case I want to havemultiple canvases layered on top of eachother
  this.canvas = theCanvas;
  this.height = height;
  this.width = width;
  this.context = theCanvas.getContext("2d");

  //need an array for the shapes, In my game I made a function called pools
  //that held arrays of objects
  this.shapes = [];
  //keeping track of when the user is draggin an objects
  this.userDragging = false;
  //the object in the shapes array that is currently selected
  this.selection = null;
  //these interact with the mouse move events below
  this.draggingX = 0;
  this.draggingY = 0;

  //when an event is fired on the canvas, the context of 'this' right here
  //is going to refer to this canvas function! In order to continue to refer to the canvas
  //and its state in the following events I need to reference it.
  var canvasState = this;

  //draggingggggg! :D
  theCanvas.addEventListener("mousedown", function(para) {
    var userMouse = canvasState.getMouse(para);
    var mouseX = userMouse.x;
    var mouseY = userMouse.y;
    var shapes = canvasState.shapes;
    //length of the shapes array, will be used int he loop
    var length = shapes.length;
    //this for loop will start at the objects number and move down
    for(var i = length - 1; i >= 0; i--) {
      var theSelection = shapes[i];
      //the shape moves more smoothly accross the screen when we keep track of
      //exactly where it was clicked
      canvasState.draggingX = mouseX - theSelection.x;
      canvasState.draggingY = mouseY - theSelection.y;
      canvasState.userDragging = true;
      canvasState.selection = theSelection;
      canvasState.valid = false;
      /////will finish this function I just want to create
      //the draw and add shape functions quickly after I push to github repo
    }
  })
}
