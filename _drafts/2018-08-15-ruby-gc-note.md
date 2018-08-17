---
layout: post
title:  "Ruby GC"
date:   2018-7-29 00:11:33 +0700
bigimg: /img/chrome-min.jpg
share-img: /img/chrome-min.jpg
tags: [programming]
---

### GC trong Ruby 2.0
- `GC.stat` có nhiều nhiều keyword ko có docs
count: the number of times a GC ran (both full GC and lazy sweep are included)

heap_used: the number of heaps that have more than 0 slots used in them. The larger this number, the slower your GC will be.

heap_length: the total number of heaps allocated in memory. For example 1648 means - about 25.75MB is allocated to Ruby heaps. (1648 * (2 << 13)).to_f / (2 << 19)

heap_increment: Is the number of extra heaps to be allocated, next time Ruby grows the number of heaps (as it does after it runs a GC and discovers it does not have enough free space), this number is updated each GC run to be 1.8 * heap_used. In later versions of Ruby this multiplier is configurable.

heap_live_num: This is the running number objects in Ruby heaps, it will change every time you call GC.stat

heap_free_num: This is a slightly confusing number, it changes after a GC runs, it will let you know how many objects were left in the heaps after the GC finished running. So, in this example we had 102447 slots empty after the last GC. (it also increased when objects are recycled internally - which can happen between GCs)

heap_final_num: Is the count of objects that were not finalized during the last GC

total_allocated_object: The running total of allocated objects from the beginning of the process. This number will change every time you allocate objects. Note: in a corner case this value may overflow.

total_freed_object: The number of objects that were freed by the GC from the beginning of the process.



### References:
- [https://samsaffron.com/archive/2013/11/22/demystifying-the-ruby-gc](https://samsaffron.com/archive/2013/11/22/demystifying-the-ruby-gc)
- [https://ruby-doc.org/core-2.4.0/GC.html](https://ruby-doc.org/core-2.4.0/GC.html)