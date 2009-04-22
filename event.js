function resizeHandler(child)
{
	return function(e)
	{
		child.setAttribute("height", e.target.innerHeight-30);
		child.setAttribute("width", e.target.innerWidth-30);
	}
}
