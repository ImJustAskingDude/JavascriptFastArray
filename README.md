FastArray (obvious solution, that took me 10 days to figure out, ugh)

(This implementation is only good for set IDs, but now that I'm trying to use it, I think You could just as well create a version, that is sequntial, by either having an object with many arrays, or an array of arrays like in this implementation, and write some functions to support iterating over it, so that normal contiguous arrays are faster than normal versions as well.)

JSperf -- look at Map V2 Search Read -- the first test is slowed down by normal array access ...
http://jsperf.com/map-check-v2/5

I was not very satisified with read/write speeds of a pure array in JS on either FF or CH, 
so I made a better version of it. FastArray can hold up to 1 Billion elements, for optimal performance, to be
able to put more elements in it, You would have to provide another dimension ( otherwise, the performance 
will go to complete trash ).

For maxX, maxY and maxZ you can provide values up to a 1000, anything higher than that will lead to shitty performance, I could probably enforce that, but I do not need that, so that is Your resposibility.

Even though the implementation is DEADBEEF simple, the road to figuring it out was not, and I don't know, it may be that I am dumb, and just could not find a implementation like this, or maybe no one bothered to post it because it is this simple, or maybe no one needs this, whatever the case, I am going to post it here and link to this "project" on SO, where I first asked about array performance, and where the higher-ups ( or anyone else, I guess ) were not able to answer my question and marked it closed.

To not be a complete ass, I am going to list every source I used to learn more about arrays in JS ( as well as maps in C++, hash tables, and what not, because that was the original implementation, I may even post different implemenration I wrote, for educational purposes, I guess, even though there's nothing special there ).

As You can see in the resources, 
I wanted to try splines to map out the data, 
Fourier Transformations which was an idea so abstract, that I did not really want to touch it, 
I wanted to have a hash function, to map every value to an index ( the current solution is, kind of, using that ), 
I tried finding a pattern in bit layout of every value, 
I used an array of "jumps/leaps" to mark the beginning of a data set ( which was actually pretty fast ),
but it all just lead to current solution, I guess.

This solution came to me, when I tested which indexes in an array are fast to access, and as You can see in http://jsperf.com/array-of-arrays-with-high-indexes/2 , both FF and CH optimize access to first 1000 indexes, after that the array access is AMAZINGLY slow, compared to that.


The list (in no particular order, cause I do not remember):

- http://pumpkinprogrammer.com/2014/06/21/c-tutorial-intro-to-hash-tables/

- http://www.algolist.net/Data_structures/Hash_table/Simple_example

- http://codereview.stackexchange.com/questions/27013/how-can-i-speed-up-access-to-an-unordered-map

- http://mathworld.wolfram.com/FourierSeries.html

- http://www.cs.mtu.edu/~shene/COURSES/cs3621/NOTES/spline/B-spline/bspline-basis.html

- http://www.stat.ucla.edu/~cocteau/stat204/readings/wold.pdf

- https://en.wikipedia.org/wiki/Spline_(mathematics)

- https://en.wikipedia.org/wiki/B-spline

- http://www.psych.mcgill.ca/misc/fda/ex-basis-b1.html

- http://people.cs.clemson.edu/~dhouse/courses/405/notes/splines.pdf

- http://www.geos.ed.ac.uk/~yliu23/docs/lect_spline.pdf

- http://www.lce.hut.fi/teaching/S-114.1100/lect_6.pdf

- https://en.wikipedia.org/wiki/Perfect_hash_function

- https://en.wikipedia.org/wiki/Hash_function

- https://en.wikipedia.org/wiki/Hash_table

- http://stackoverflow.com/questions/1204553/are-there-any-good-libraries-for-solving-cubic-splines-in-c

- http://www.alglib.net/interpolation/spline3.php

- https://en.wikipedia.org/w/index.php?title=Spline_%28mathematics%29&oldid=288288033#Algorithm_for_computing_natural_cubic_splines

- http://ibiblio.org/e-notes/Splines/Intro.htm

- http://ibiblio.org/e-notes/Splines/bezier.html

- http://www.burtleburtle.net/bob/hash/doobs.html

- http://www.burtleburtle.net/bob/c/lookup3.c

- http://www.drdobbs.com/architecture-and-design/generating-perfect-hash-functions/184404506

- https://www.gnu.org/software/gperf/manual/gperf.html

- http://cmph.sourceforge.net/concepts.html

- http://stevehanov.ca/blog/index.php?id=119

- http://courses.cs.vt.edu/~cs3114/Fall09/wmcquain/Notes/T17.PerfectHashFunctions.pdf

- http://www.cs.cmu.edu/~avrim/451f09/lectures/lect0929.pdf

- http://www.cs.wustl.edu/~schmidt/PDF/gperf.pdf

- http://www.cs.mtu.edu/~shene/COURSES/cs3621/NOTES/spline/bspline-property.html

- http://paulbourke.net/miscellaneous/interpolation/

- http://pomax.github.io/bezierinfo/

- http://geometrie.foretnik.net/?id=lectures&lang=en

- http://stackoverflow.com/questions/7054272/how-to-draw-smooth-curve-through-n-points-using-javascript-html5-canvas

- http://www.partow.net/programming/hashfunctions/index.html

- http://www.azillionmonkeys.com/qed/hash.html

- http://www.eternallyconfuzzled.com/tuts/algorithms/jsw_tut_hashing.aspx

- http://programmers.stackexchange.com/questions/49550/which-hashing-algorithm-is-best-for-uniqueness-and-speed

- http://www.cse.yorku.ca/~oz/hash.html

- http://www.cs.cmu.edu/~adamchik/15-121/lectures/Hashing/hashing.html

- https://en.wikipedia.org/wiki/Coordinate_system

- https://en.wikipedia.org/wiki/Polar_coordinate_system

- http://stackoverflow.com/questions/1981628/check-if-a-binary-number-has-a-0-or-a-1-at-a-specific-position

- http://jsperf.com/map-something-something-check/3/edit

- http://graphics.stanford.edu/~seander/bithacks.html#OperationCounting

- http://stackoverflow.com/questions/17095324/fastest-way-to-determine-if-an-integer-is-between-two-integers-inclusive-with

- http://stackoverflow.com/questions/32899054/javascript-array-performance?noredirect=1#comment53705362_32899054

- https://github.com/sq/JSIL/wiki/JavaScript-Performance-For-Madmen

- http://jsperf.com/append-string-vs-join-array/40

- http://jsperf.com/deeply-nested-property-fetches/3

- http://jsperf.com/code-duplication-is-faster/6

- http://jsperf.com/property-overhead

- http://jsperf.com/variable-access-performance/2

- http://jsperf.com/emscripten-sum/5

- http://jsperf.com/array-of-arrays-with-high-indexes/2

- http://jsperf.com/returning-multiple-values-2/9

- https://javascriptweblog.wordpress.com/2010/07/12/understanding-javascript-arrays/

- http://jsperf.com/mysterious-arrays/2

- http://jsperf.com/map-check-v2/5

Many thanks to all of the listed resources' creators, it would probably take me way longer to figure out this obvious solution, than it did. Thanks.
