var FastArray = function(maxX, maxY, maxZ)
{
    this.maxX = maxX;
    this.maxY = maxY;
    this.maxZ = maxZ;
    
    this.storage = [];
};

FastArray.prototype.set = function(value)
{
    var ID = value.id;
    
    var x = Math.floor(ID / (this.maxY * this.maxZ));
    
    if(this.storage[x] == undefined)
    {
        this.storage[x] = [];
    }
    
    var y = Math.floor((ID / this.maxZ) % this.maxY);
    
    if(this.storage[x][y] == undefined)
    {
        this.storage[x][y] = [];
    }
        
    var z = ID % this.maxZ;
    
    this.storage[x][y][z] = value;
};

FastArray.prototype.get = function(ID)
{    
    return this.storage[Math.floor(ID / (this.maxY * this.maxZ))][Math.floor((ID / this.maxZ) % this.maxY)][ID % this.maxZ];
};