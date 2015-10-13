var log2 = Math.log(2);

var File = function(id, size)
{
  this.id = id;
  this.size = size;
};

var FastArray = function(threshold)
{
    this.map = [];
    this.leaps = [];
    this.threshold = threshold;
};

FastArray.prototype.addLeap = function(index, leap)
{
    this.leaps[index] = leap;
};

FastArray.prototype.addFirstValue = function(length, ID, value)
{
    this.addLeap(length, ID);
        
    var index = this.hash(0);

    var bucket = [];
    bucket[index] = [value];

    this.map[length] = bucket;
};

FastArray.prototype.addNextValue = function(length, ID, value)
{
    var last = this.leaps[length - 1];
    var position = length - 1;

    ID -= last;

    var index = this.hash(ID);

    var bucket = this.map[position][index];

    if(bucket == undefined)
    {
        this.map[position][index] = [value];
    }
    else
    {
        bucket[bucket.length] = value;
    }
};

FastArray.prototype.insert = function(value)
{
    var ID = value.id;
        
    var length = this.leaps.length;
    
    if(!length || this.leaps[length - 1] + this.threshold < ID)
    {
        this.addFirstValue(length, ID, value);
    }
    else
    {
        this.addNextValue(length, ID, value);
    }    
};

FastArray.prototype.get = function(value)
{
    var ID = value.id;
    
    var valpos = this.helper(ID);
    ID -= valpos[0];
    
    var bucket = this.map[valpos[1]][this.hash(ID)];
    var length = bucket.length;
    
    var position = 0;
    
    while(position < length)
    {
        var slot = bucket[position];
        
        if(slot.id == value.id)
        {
            return slot;
        }
        
        position++;
    }
    
    return 0;
};

FastArray.prototype.getLeapFromID = function(ID)
{
    var length = this.leaps.length;
    var position = 0;
    
    while(position < length)
    {
        var leap = this.leaps[position];
        
        if(ID >= leap && ID <= leap + this.threshold)
        {
            return [leap, position];
        }
        
        position++;
    }
    
    return [-1, -1];
};

FastArray.prototype.helper = function(ID)
{
    var length = this.leaps.length;
    var position = 0;
    
    while(position < length)
    {
        var leap = this.leaps[position];
        
        if(ID >= leap && ID <= leap + this.threshold)
        {
            return [leap, position];
        }
        
        position++;
    }
    
    return [-1, -1];
};

FastArray.prototype.hash = function(ID)
{        
    var ones = 0;
    var onesLength = 0;
    
    var zeroes = 0;
    var zeroesLength = 0;
    
    var position = 0;
    var length = Math.floor(Math.log(ID)/log2) + 1;
    
    while( position < length )
    {
        if((ID >> position) & 1)
        {
            ones += position + (onesLength * 10);
               
            onesLength++;
        }
        else
        {
            zeroes += position + (zeroesLength * 10);
               
            zeroesLength++;
        }
            
        position++;
    }
    
    return ID & Math.min(ones, zeroes);
};

/*FastArray.prototype.hash = function(ID)
{        
    var ones = 0;
    var onesLength = 0;
    
    var zeroes = 0;
    var zeroesLength = 0;
    
    var position = 0;
    var length = Math.floor(Math.log(ID)/log2) + 1;
    
    while( position < length )
    {
        if((ID >> position) & 1)
        {
            ones += position + (onesLength * 10);
               
            onesLength++;
        }
        else
        {
            zeroes += position + (zeroesLength * 10);
               
            zeroesLength++;
        }
            
        position++;
    }
    
    return ID & Math.min(ones, zeroes);
};*/

function getRandomInt(min, max) 
{
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateFilesFromArray(array, count)
{
    var result = [];

    var i = 0;

    while( i < count )
    {      
        result.push(new File(array[i], getRandomInt(1, 9999999999)));

        i++;
    }

    return result;
}

function mapFromArray(array)
{
    var map = new Map();
    
    var i = 0;
    var length = array.length;
    
    while(i < length)
    {
        map.set(array[i].id, [array[i].id, array[i].size]);
        
        i++;
    }
    
    return map;
}

function fastArrayFromArray(array, threshold)
{
    var fastArray = new FastArray(threshold);
    
    var length = array.length;
    var position = 0;
    
    while(position < length)
    {        
        fastArray.insert(array[position]);
        
        position++;
    }
    
    return fastArray;
}

function searchPlainArray(array, file)
{
    var ID = file.id;
    
    var length = array.length;
    var iteration = 0;
    
    while(iteration < length)
    {
        var slot = array[iteration];

        if(slot.id == ID)
        {
            return slot;
        }
        
        iteration++;
    }
    
    return null;
}

function midpoint(val1, val2)
{
    return Math.round((val1 + val2)/2);
}

function binarySearchPlainArray(array, file)
{
    var ID = file.id;
    
    var imin = 0;
    var imax = array.length;
    
    while(imin <= imax)
    {
        var imid = Math.round((imin + imax)/2);
        
        var slot = array[imid];
        
        if(slot.id == ID)
        {
            return slot;
        }
        else if(slot.id < ID)
        {
            imin = imid + 1;
        }
        else
        {
            imax = imid - 1;
        }
    }
    
    return -1;
}

function testPlainArray(plainArray, searchSet)
{
    var result = [];
    
    var length = searchSet.length;
    var iteration = 0;
    
    while(iteration < length)
    {
        result.push(searchPlainArray(plainArray, searchSet[iteration]));
        iteration++;
    }
    
    return result;
}

function testBinaryPlainArray(plainArray, searchSet)
{
    var result = [];
    
    var length = searchSet.length;
    var iteration = 0;
    
    while(iteration < length)
    {
        result.push(binarySearchPlainArray(plainArray, searchSet[iteration]));
        iteration++;
    }
    
    return result;    
}

function testFastArray(fastArray, searchSet)
{
    var result = [];
    
    var length = searchSet.length;
    var iteration = 0;
    
    while(iteration < length)
    {
        result.push(fastArray.get(searchSet[iteration]));
        iteration++;
    }
    
    return result;   
}

/*function getSliceFromArray(array, count)
{
    var result = [];
    
    var iteration = 0;
    
    while(iteration < count)
    {
        result[result.length] = array[iteration];
        iteration++;
    }
    
    return result;
}

console.log(getSliceFromArray(sample, 4000).join(','));*/

function setupSearchSetFromPlainArray(array, count)
{
    var result = [];
    
    var iteration = 0;
    
    while(iteration < count)
    {
        result.push(array[getRandomInt(0, array.length)]);
        iteration++;
    }
    
    return result;
}

var filesPlainArray = generateFilesFromArray(sample, 4000);
var filesFastArray = fastArrayFromArray(filesPlainArray, 10000);

var searchSet = setupSearchSetFromPlainArray(filesPlainArray, 100);

/*console.log(testPlainArray(filesPlainArray, searchSet));
console.log(testBinaryPlainArray(filesPlainArray, searchSet));
console.log(testFastArray(filesFastArray, searchSet));*/