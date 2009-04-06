function node(points, children, renderer)
{
	this.points = points;
	this.children = children;
	this.renderer = (renderer) ? renderer : new nullRenderer();

	this.raster = null; // points in screen space

	this.render = function(camera,canvas,parentStack)
	{
		if(!parentStack) 
			parentStack = [this];
		else
			parentStack.push(this);

		var renderChildren = true;
		if(this.points)
		{
			renderChildren = false;
			renderChildren = renderer.draw(camera,canvas,parentStack);
		}

		if(renderChildren)
			for(var i in children)
				children[i].render(camera,canvas,parentStack)
		
		parentStack.pop();
	}
}

function nullRenderer()
{
	this.draw = function() {};	
}

function transformPointRenderer(painter)
{
	this.painter = painter;

	this.draw = function(camera, canvas, stack)
	{
		var n = stack[stack.length-1];
		var children = false;	

		n.raster = camera.transform(n.points);
		n.clipped = camera.clip(n.raster) // , n.clipped);

		painter.reset();
		for(var i = 0; i < n.clipped.length; ++i)
			if(n.clipped[i])
			{
				children = true;
				painter.paint(n.raster.e(i+1,1),n.raster.e(i+1,2),arguments);
			}
		return children;
	}
}

function svgPointPainter(pointQueue)
{
	this.pq = pointQueue;

	this.reset = function()
	{
		pq.undraw();
	}
	

	this.paint = function(x,y,args)
	{
		var p = pq.pop();
		p.setAttribute("cx", x);
		p.setAttribute("cy", y);
	}
}

function BoundedNode(children)
{
	this.children = children;

}

function pointQueue(create,clear)
{
	this.queue = [];
	this.pos = 0;
	this.create = create;
	this.clear = clear;

	this.pop = function()
	{
		if(!this.queue[this.pos]) this.queue[this.pos] = this.create();
		return this.queue[this.pos++];
	}

	this.undraw = function(clear)
	{
		var c = (clear) ? clear : this.clear;
		this.pos = 0;
		while(this.queue[this.pos])
			c(this.queue[this.pos++]);
		this.pos = 0;
	}

	this.length= function()
	{
		return this.pos;
	}
}

function svgClone(el,canvas)
{
	return function () 
	{
		return canvas.appendChild(el.cloneNode(true));
	}
}

function svgReset(p)
{
	p.cx = -1;
	p.cy = -1;
}

function constellationNode(constellationData,renderer)
{
	solars = [];
	for(var i in constellationData)
	{
		var solar = constellationData[i];
		solars.push([solar[4],solar[5],solar[6],1]);
	}
	var points = $M(solars);	

	var n = new node(points,null,renderer);
	n.data = constellationData; // replicate

	return n;
}


var point = document.getElementById("p");
var canvas = document.getElementById("view1");

pq = new pointQueue(svgClone(point,canvas),svgReset);
pointPainter = new svgPointPainter(pq);
renderer = new transformPointRenderer(pointPainter);


