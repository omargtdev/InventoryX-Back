const loadObjectExtensions = () => {
    if(!Object.prototype.hasProperties){
        Object.hasProperties = function(object) {
            if(typeof object !== "object")
                return false;
            return Object.keys(object).length > 0;
        }
    }
}

export default loadObjectExtensions;