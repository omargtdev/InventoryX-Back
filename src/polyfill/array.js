const loadArrayExtensions = () => {
	if(!Array.prototype.any){
		Array.prototype.any = function() {
			return this.length > 0;
		}
	}
}

export default loadArrayExtensions;
