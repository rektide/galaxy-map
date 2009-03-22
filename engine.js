AM_STANDALONE=0;

if(!this.$V && this.load && AM_STANDALONE) load("sylvester.js");
if(!AM_STANDALONE) print = function() {};
print("");

// 3d transform matrix build functions

// http://www.cs.kuleuven.ac.be/cwis/research/graphics/INFOTEC/viewing-in-3d/node4.html
// http://www.dgp.toronto.edu/~ah/csc418/fall_2001/notes/viewing.html
function gluLookAt(eX,eY,eZ,cX,cY,cZ,uX,uY,uZ)
{
	var e = $V([eX,eY,eZ]);
	var up = (arguments.length>6) ? $V([uX,uY,uZ]).toUnitVector() : arguments.callee.defaultUp;

	if(window.gluLookAtDiv)
	{
		console.log("detouring to write gluLookAt");
		gluLookAtDiv.ex.value=eX;
		gluLookAtDiv.ey.value=eY;
		gluLookAtDiv.ez.value=eZ;
		gluLookAtDiv.cx.value=cX;
		gluLookAtDiv.cy.value=cY;
		gluLookAtDiv.cz.value=cZ;
		gluLookAtDiv.ux.value=up.e(1);
		gluLookAtDiv.uy.value=up.e(2);
		gluLookAtDiv.uz.value=up.e(3);
	}


	var k = $V([eX-cX,eY-cY,eZ-cZ]).toUnitVector();
	var i = up.cross(k);
	var j = k.cross(i);

	return $M([
		[i.e(1), i.e(2), i.e(3), -i.dot(e)],
		[j.e(1), j.e(2), j.e(3), -j.dot(e)],
		[k.e(1), k.e(2), k.e(3), -k.dot(e)],
		[0, 0, 0, 1]
	]);
}
gluLookAt.defaultUp=$V([0,0,1]); // y up FREAKS, looking down

function gluLookCenter(x,y,z)
{
	return gluLookAt(x,y,z,0,0,0);
}

// http://www.dgp.toronto.edu/~ah/csc418/fall_2001/notes/ogl_vvol.html
function glFrustum(l,r,b,t,n,f)
{
	var rml= r-l;
	var rpl= r+l;
	var tmb= t-b;
	var tpb= t+b;
	var fmn= f-n;
	var fpn= f+n;
	var n2= 2*n;

	if(window.console && console.log) console.log("[2n:"+n2+"][rml,rpl:"+rml+","+rpl+"][tmb,tpb:"+tmb+","+tpb+"][fmn,fpn:"+fmn+","+fpn+"]");
	return $M([
		[n2/rml, 0, rpl/rml, 0],
		[0, n2/tmb, tpb/tmb, 0],
		[0, 0, -fpn/fmn, -n2*f/fmn],
		[0, 0, -1, 0]
	]);

}

function gluPerspective(fov,aspect,n,f)
{
	var t= Math.tan(fov*0.5)*n;
	return glFrustum(-aspect*t,aspect*t,-t,t,n,f);
}


function camera(view,perspective,clip)
{
	this.view = view;
	this.perspective = perspective;
	this.clipping = clip;

	this.recalc= function()
	{
		if(!perspective.rank) perspective = Matrix.Diagonal(perspective.elements);
		this.matrix= perspective.x(view);
	}
	this.recalc();

	this.transform= function(l)
	{
		var results = l.x(this.view).x(this.perspective);

		if(window.pipelineDiv)
		{
			console.log("detouring to write our present pipeline");
			pipelineDiv.pointsM.innerHTML = l.inspect();
			pipelineDiv.viewM.innerHTML = this.view.inspect();
			pipelineDiv.perspectiveM.innerHTML = this.perspective.inspect();
			pipelineDiv.resultsM.innerHTML = results.inspect();
		}

		return results;
	}

	this.clip = function(l,m)
	{
		if(!m) m = [];
		for(var i = 0; i < l.cols(); ++i)
		{
			if(this.clipping) 
			{
				var p = l.col(i).elements;
				m[i] = this.clipping[0] <= p[0] && this.clipping[1] >= p[0] &&
				       this.clipping[2] <= p[1] && this.clipping[3] >= p[1]; 
			}
			else
				m[i] = true;
		}
		return m;
	}
}

